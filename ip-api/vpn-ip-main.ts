import { handleError } from "./lib/error-handler";
import { fetchIp } from "./lib/fetch-ip";
import { type IPResponse } from "./lib/types";

const PORT: number = parseInt(process.env.PORT || "5007"); // Port this service listens on

Bun.serve({
  port: PORT,
  routes: {
    "/ip": async () => {
      console.log("Fetching IP for request...");
      const ip = await fetchIp();
      return Response.json({ ip } satisfies IPResponse);
    }
  },
  error: handleError,
});

console.log(`VPN IP Fetcher listening on port ${PORT}`);
