# qBittorrent with WireGuard

Docker compose setup for qBittorrent with WireGuard and a bespoke IP address monitor.

- qBittorrent from `lscr.io/linuxserver/qbittorrent`
- WireGuard from `ghcr.io/linuxserver/wireguard`
- VPN IP address monitor:
  - `home-ip` reports the public IP address of the host machine
  - `vpn-status` pulls the home IP and the VPN IP address from the WireGuard container and compares them
  - served with Bun HTTP servers

