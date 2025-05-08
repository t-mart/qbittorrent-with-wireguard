import { handleError } from "./lib/error-handler";
import { getIP } from "./lib/fetch-ip";
import { type IPResponse } from "./lib/types";

const INTERNAL_PORT: number = parseInt(process.env.PORT || "5007"); // Port this service listens on

Bun.serve({
  port: INTERNAL_PORT,
  routes: {
    "/ip": async () => {
      console.log("Fetching IP for request...");
      const ip = await getIP();
      return Response.json({ ip } satisfies IPResponse);
    }
  },
  error: handleError,
});

console.log(`Home IP Fetcher listening on port ${INTERNAL_PORT}`);
