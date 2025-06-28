## GitHub Copilot Chat

- Extension Version: 0.28.1 (prod)
- VS Code: vscode/1.101.1
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.207.73.85 (23 ms)
- DNS ipv6 Lookup: Error (45 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (2 ms)
- Electron fetch (configured): HTTP 200 (58 ms)
- Node.js https: HTTP 200 (301 ms)
- Node.js fetch: HTTP 200 (479 ms)
- Helix fetch: HTTP 200 (316 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.114.21 (13 ms)
- DNS ipv6 Lookup: Error (14 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): HTTP 200 (289 ms)
- Node.js https: HTTP 200 (907 ms)
- Node.js fetch: HTTP 200 (883 ms)
- Helix fetch: HTTP 200 (992 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).