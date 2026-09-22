const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "no-store",
    },
  });
};

const getFormValue = (formData, key) => {
  return String(formData.get(key) ?? "").trim();
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === "/api/health") {
      return jsonResponse({
        success: true,
        message: "Smart Pro API is working",
      });
    }

    // Contact form
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return jsonResponse(
          {
            success: false,
            message: "Method not allowed",
          },
          405,
        );
      }

      try {
        const formData = await request.formData();

        // Turnstile
        const turnstileToken = getFormValue(formData, "cf-turnstile-response");

        if (!turnstileToken) {
          return jsonResponse(
            {
              success: false,
              message: "Security verification is required",
            },
            400,
          );
        }

        const turnstileFormData = new FormData();

        turnstileFormData.append("secret", env.TURNSTILE_SECRET_KEY);

        turnstileFormData.append("response", turnstileToken);

        const clientIp = request.headers.get("CF-Connecting-IP");

        if (clientIp) {
          turnstileFormData.append("remoteip", clientIp);
        }

        const turnstileResponse = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            body: turnstileFormData,
          },
        );

        if (!turnstileResponse.ok) {
          return jsonResponse(
            {
              success: false,
              message: "Security verification failed",
            },
            502,
          );
        }

        const turnstileResult = await turnstileResponse.json();

        if (!turnstileResult.success) {
          return jsonResponse(
            {
              success: false,
              message: "Security verification failed",
            },
            403,
          );
        }

        // Form fields
        const name = getFormValue(formData, "name");
        const email = getFormValue(formData, "email");
        const phone = getFormValue(formData, "phone");
        const company = getFormValue(formData, "company");
        const service = getFormValue(formData, "service");
        const message = getFormValue(formData, "message");

        if (!name || !email || !message) {
          return jsonResponse(
            {
              success: false,
              message: "Missing required fields",
            },
            422,
          );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          return jsonResponse(
            {
              success: false,
              message: "Invalid email address",
            },
            422,
          );
        }

        if (
          name.length > 100 ||
          email.length > 254 ||
          phone.length > 30 ||
          company.length > 150 ||
          service.length > 100 ||
          message.length > 5000
        ) {
          return jsonResponse(
            {
              success: false,
              message: "Form data is too long",
            },
            422,
          );
        }

        return jsonResponse({
          success: true,
          message: "Contact form data received successfully",
          received: {
            name,
            email,
            phone,
            company,
            service,
            message,
          },
        });
      } catch (error) {
        console.error("Contact API error:", error);

        return jsonResponse(
          {
            success: false,
            message: "Invalid request",
          },
          400,
        );
      }
    }
    // Unknown API route
    if (url.pathname.startsWith("/api/")) {
      return jsonResponse(
        {
          success: false,
          message: "API route not found",
        },
        404,
      );
    }

    // React / static assets
    return env.ASSETS.fetch(request);
  },
};
