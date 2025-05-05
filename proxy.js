export default {
    async fetch(request) {
      const url = new URL(request.url);
      url.hostname = "api.mangadex.org";
      url.protocol = "https:";
  
      const proxyUrl = url.href.replace(request.headers.get("host"), "api.mangadex.org");
  
      const newRequest = new Request(proxyUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
  
      const response = await fetch(newRequest);
      const newHeaders = new Headers(response.headers);
      newHeaders.set("Access-Control-Allow-Origin", "*");
      newHeaders.set("Access-Control-Allow-Headers", "*");
  
      return new Response(await response.body, {
        status: response.status,
        headers: newHeaders,
      });
    }
  }
  