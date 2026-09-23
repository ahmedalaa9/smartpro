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

const escapeHtml = (value = "") => {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[char];
  });
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    /*
     * ---------------------------------------------------------
     * Health check
     * ---------------------------------------------------------
     */
    if (url.pathname === "/api/health") {
      return jsonResponse({
        success: true,
        message: "Smart Pro API is working",
      });
    }

    /*
     * ---------------------------------------------------------
     * Contact Form API
     * ---------------------------------------------------------
     */
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

        /*
         * ---------------------------------------------------------
         * Turnstile token
         * ---------------------------------------------------------
         */
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

        /*
         * ---------------------------------------------------------
         * Check required Worker secrets
         * ---------------------------------------------------------
         */
        if (!env.TURNSTILE_SECRET_KEY) {
          console.error("TURNSTILE_SECRET_KEY is missing from Worker runtime");

          return jsonResponse(
            {
              success: false,
              message: "Server configuration error",
            },
            500,
          );
        }

        if (!env.RESEND_API_KEY) {
          console.error("RESEND_API_KEY is missing from Worker runtime");

          return jsonResponse(
            {
              success: false,
              message: "Server configuration error",
            },
            500,
          );
        }

        if (!env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL) {
          console.error(
            "Contact email variables are missing from Worker runtime",
          );

          return jsonResponse(
            {
              success: false,
              message: "Server configuration error",
            },
            500,
          );
        }

        /*
         * ---------------------------------------------------------
         * Verify Turnstile
         * ---------------------------------------------------------
         */
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
          console.error(
            "Turnstile Siteverify HTTP error:",
            turnstileResponse.status,
          );

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
          console.error(
            "Turnstile verification failed:",
            turnstileResult["error-codes"],
          );

          return jsonResponse(
            {
              success: false,
              message: "Security verification failed",
            },
            403,
          );
        }

        /*
         * ---------------------------------------------------------
         * Read form fields
         * ---------------------------------------------------------
         */
        const name = getFormValue(formData, "name");

        const email = getFormValue(formData, "email");

        const phone = getFormValue(formData, "phone");

        const company = getFormValue(formData, "company");

        const service = getFormValue(formData, "service");

        const message = getFormValue(formData, "message");

        /*
         * ---------------------------------------------------------
         * Required fields validation
         * ---------------------------------------------------------
         */
        if (!name || !email || !message) {
          return jsonResponse(
            {
              success: false,
              message: "Missing required fields",
            },
            422,
          );
        }

        /*
         * ---------------------------------------------------------
         * Email validation
         * ---------------------------------------------------------
         */
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

        /*
         * ---------------------------------------------------------
         * Length limits
         * ---------------------------------------------------------
         */
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

        /*
         * ---------------------------------------------------------
         * Escape user content before inserting into HTML
         * ---------------------------------------------------------
         */
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone);
        const safeCompany = escapeHtml(company);
        const safeService = escapeHtml(service);

        const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

        /*
         * ---------------------------------------------------------
         * HTML email
         * ---------------------------------------------------------
         */
        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <body
              style="
                margin: 0;
                padding: 0;
                background: #f5f5f5;
                font-family: Arial, Helvetica, sans-serif;
                color: #222222;
              "
            >
              <div
                style="
                  max-width: 650px;
                  margin: 30px auto;
                  background: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  border: 1px solid #eeeeee;
                "
              >
                <div
                  style="
                    background: #1f2937;
                    color: #ffffff;
                    padding: 24px 30px;
                  "
                >
                  <h2
                    style="
                      margin: 0;
                      font-size: 22px;
                    "
                  >
                    New Contact Form Message
                  </h2>

                  <p
                    style="
                      margin: 8px 0 0;
                      color: #d1d5db;
                      font-size: 14px;
                    "
                  >
                    Smart Pro Website
                  </p>
                </div>

                <div
                  style="
                    padding: 30px;
                  "
                >
                  <table
                    style="
                      width: 100%;
                      border-collapse: collapse;
                    "
                  >
                    <tr>
                      <td
                        style="
                          padding: 10px 0;
                          font-weight: bold;
                          width: 130px;
                        "
                      >
                        Name:
                      </td>

                      <td
                        style="
                          padding: 10px 0;
                        "
                      >
                        ${safeName}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding: 10px 0;
                          font-weight: bold;
                        "
                      >
                        Email:
                      </td>

                      <td
                        style="
                          padding: 10px 0;
                        "
                      >
                        ${safeEmail}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding: 10px 0;
                          font-weight: bold;
                        "
                      >
                        Phone:
                      </td>

                      <td
                        style="
                          padding: 10px 0;
                        "
                      >
                        ${safePhone || "-"}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding: 10px 0;
                          font-weight: bold;
                        "
                      >
                        Company:
                      </td>

                      <td
                        style="
                          padding: 10px 0;
                        "
                      >
                        ${safeCompany || "-"}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding: 10px 0;
                          font-weight: bold;
                        "
                      >
                        Service:
                      </td>

                      <td
                        style="
                          padding: 10px 0;
                        "
                      >
                        ${safeService || "-"}
                      </td>
                    </tr>
                  </table>

                  <div
                    style="
                      margin-top: 25px;
                      border-top: 1px solid #eeeeee;
                      padding-top: 20px;
                    "
                  >
                    <strong>
                      Message:
                    </strong>

                    <div
                      style="
                        margin-top: 10px;
                        line-height: 1.7;
                        background: #f9fafb;
                        border-radius: 8px;
                        padding: 16px;
                      "
                    >
                      ${safeMessage}
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `;

        /*
         * ---------------------------------------------------------
         * Plain-text fallback
         * ---------------------------------------------------------
         */
        const emailText = `
New Contact Form Message
Smart Pro Website

Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Company: ${company || "-"}
Service: ${service || "-"}

Message:
${message}
        `.trim();

        /*
         * ---------------------------------------------------------
         * Send with Resend
         * ---------------------------------------------------------
         */
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",

          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,

            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            from: `Smart Pro Website <${env.CONTACT_FROM_EMAIL}>`,

            to: [env.CONTACT_TO_EMAIL],

            reply_to: email,

            subject: "New Contact Form Message - Smart Pro",

            html: emailHtml,

            text: emailText,
          }),
        });

        /*
         * ---------------------------------------------------------
         * Resend error handling
         * ---------------------------------------------------------
         */
        if (!resendResponse.ok) {
          const resendError = await resendResponse.text();

          console.error(
            "Resend API error:",
            resendResponse.status,
            resendError,
          );

          return jsonResponse(
            {
              success: false,
              message: "Unable to send your message right now",
            },
            502,
          );
        }

        const resendResult = await resendResponse.json();

        console.log("Contact email sent:", resendResult.id);

        /*
         * ---------------------------------------------------------
         * Success
         * ---------------------------------------------------------
         */
        return jsonResponse({
          success: true,
          message: "Message sent successfully",
        });
      } catch (error) {
        console.error("Contact API error:", error);

        return jsonResponse(
          {
            success: false,
            message: "Something went wrong. Please try again.",
          },
          500,
        );
      }
    }

    /*
     * ---------------------------------------------------------
     * Unknown API routes
     * ---------------------------------------------------------
     */
    if (url.pathname.startsWith("/api/")) {
      return jsonResponse(
        {
          success: false,
          message: "API route not found",
        },
        404,
      );
    }

    /*
     * ---------------------------------------------------------
     * React / Static Assets
     * ---------------------------------------------------------
     */
    return env.ASSETS.fetch(request);
  },
};
