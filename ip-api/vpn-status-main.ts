import { handleError } from "./lib/error-handler";
import { getIP } from "./lib/fetch-ip";
import { type IPResponse } from "./lib/types";

const INTERNAL_PORT: number = parseInt(process.env.PORT || "5008"); // Port this service listens on

const HOME_IP_FETCHER_URL = process.env.HOME_IP_FETCHER_URL || "http://home-ip-fetcher:5007/ip";

async function fetchHomeIP(): Promise<string> {
  const response = await fetch(HOME_IP_FETCHER_URL);
  if (!response.ok) {
    throw new Error(`Response not ok: ${response.status} ${response.statusText}`);
  }
  let data: IPResponse;
  try {
    data = await response.json() as IPResponse;
  } catch (error) {
    throw new TypeError(`Failed to parse JSON: ${error}, ${response.text()}`);
  }
  if (!data.ip) {
    throw new TypeError(`Invalid response: ${JSON.stringify(data)}`);
  }
  return data.ip;
}


Bun.serve({
  port: INTERNAL_PORT,
  routes: {
    "/compare-ip": async () => {
      const vpnIP = await getIP();
      const homeIP = await fetchHomeIP();
      return Response.json({ vpnIP, homeIP, isVPNTunneling: vpnIP !== homeIP });
    }
  },
  error: handleError,
});

console.log(`Home IP Fetcher listening on port ${INTERNAL_PORT}`);
