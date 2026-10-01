# Release record

Published and verified 1 October 2026, about 12:23 SAST.

- Website: https://16-common-ground.williamking.workers.dev
- Standalone hero: https://16-common-ground.williamking.workers.dev/hero.html
- Public source: https://github.com/WilliamHenryKing/16-common-ground
- Deployed application commit: `71a73fad0e6f60f81c3803c11f61caae0c171443`.
- Cloudflare version: `b2ecce47-3c29-43ea-9e07-4012d1fdceae`.

All fifteen public output files were fetched and SHA-256 compared against the local production build. Homepage and standalone hero return 200; an unknown route returns the authored 404. Clean-context desktop and phone browser loads show the correct title, no overflow and no runtime errors. [Full live receipt](live-report.json).

The first immediate check preceded edge propagation and received a transient mismatch for the 404 file. A subsequent complete check matched every file. No content was accepted on the strength of upload output alone.

Cold browser resource transfer was about 318 KB excluding the HTML response in both recorded desktop/phone sessions. First contentful paint was 504 ms desktop and 256 ms phone viewport on this machine/network. These are two observed Chrome runs, not mobile hardware benchmarks or a universal speed guarantee.

Later commits that add this receipt and documentation do not change the deployed application revision above. No GitHub Actions workflow is configured; local checks and live verification are the release evidence, not remote CI.
