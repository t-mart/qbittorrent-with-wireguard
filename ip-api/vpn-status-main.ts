import { handleError } from "./lib/error-handler";
import { fetchIp } from "./lib/fetch-ip";
import { type IPResponse } from "./lib/types";

const PORT: number = parseInt(process.env.PORT || "5008"); // Port this service listens on

const VPN_IP_FETCHER_URL = process.env.VPN_IP_FETCHER_URL;

async function fetchVpnIp(): Promise<string> {
  const response = await fetch(VPN_IP_FETCHER_URL!);
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

if (!VPN_IP_FETCHER_URL) {
  throw new Error("VPN_IP_FETCHER_URL environment variable is not set");
} else {
  Bun.serve({
    port: PORT,
    routes: {
      "/compare-ip": async () => {
        const homeIP = await fetchIp();
        const vpnIP = await fetchVpnIp();
        return Response.json({ homeIP, vpnIP, isVPNTunneling: homeIP !== vpnIP });
      }
    },
    error: handleError,
  });

  console.log(`Home IP Fetcher listening on port ${PORT}`);
}