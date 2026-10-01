# Release record

Naming refinement published and verified 1 October 2026, about 13:57 SAST. The current release uses the fictional Common Ground identity throughout the website, metadata, exports and rendered media.

- Website: https://16-common-ground.williamking.workers.dev
- Standalone hero: https://16-common-ground.williamking.workers.dev/hero.html
- Public source: https://github.com/WilliamHenryKing/16-common-ground
- Deployed application commit: `ffc92bf34ab654b06404cd9a540d7d9c3a718dc2`.
- Cloudflare version: `e8447904-9919-4453-b14a-8c60a32b66ce`.

All fifteen public output files were fetched and SHA-256 compared against the local production build. Homepage and standalone hero return 200; an unknown route returns the authored 404. Clean-context desktop and phone browser loads show the correct title, no overflow and no runtime errors. [Full live receipt](live-report.json).

All 47 browser checks passed again after the naming refinement, with zero detected WCAG A/AA violations in the three recorded states. README screenshots and the social preview were regenerated and visually inspected.

Cold browser resource transfer was about 318 KB excluding the HTML response in both recorded desktop/phone sessions. First contentful paint was 512 ms desktop and 232 ms phone viewport on this machine/network. These are two observed Chrome runs, not mobile hardware benchmarks or a universal speed guarantee.

Later commits that add this receipt and documentation do not change the deployed application revision above. No GitHub Actions workflow is configured; local checks and live verification are the release evidence, not remote CI.
