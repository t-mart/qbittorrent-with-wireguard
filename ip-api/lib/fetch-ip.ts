// This simple Bun server runs on the default Docker network.
// Its purpose is to fetch the public IP via the host's direct internet connection.

const API_URL: string = "https://api.ipify.org?format=json";

interface IpifyResponse {
  ip: string;
}

export async function fetchIp(): Promise<string> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Response not ok: ${response.status} ${response.statusText}`);
  }
  let data: IpifyResponse;
  try {
    data = await response.json() as IpifyResponse;
  } catch (error) {
    throw new TypeError(`Failed to parse JSON: ${error}, ${response.text()}`);
  }
  if (!data.ip) {
    throw new TypeError(`Invalid response: ${JSON.stringify(data)}`);
  }
  return data.ip;
}
