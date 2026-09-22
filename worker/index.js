export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({
        success: true,
        message: "Smart Pro API is working",
      });
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json(
        {
          success: false,
          message: "API route not found",
        },
        {
          status: 404,
        },
      );
    }

    return env.ASSETS.fetch(request);
  },
};
