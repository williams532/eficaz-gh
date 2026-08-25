export default {
  async fetch(request, env, ctx) {
    return new Response("EFICAZ G&H", {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    });
  },
};
