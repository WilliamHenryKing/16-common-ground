# Verification — Common Ground

Naming refinement, 1 October 2026: Common Ground now owns the wordmarks, metadata, accessible names, brief exports and concept copy. All 47 browser checks were rerun successfully; README screenshots and the social preview were regenerated from the renamed build.

1 October 2026. Solo implementation and visual self-review. Full automated results: [browser-report.json](browser-report.json). Desktop Chrome 154.0.8037.58; Playwright 1.63.0; axe-core 4.13.0. All named checks in the report pass, with no browser runtime errors and no detected WCAG A/AA violations in the recorded full-page, phone and modal states.

Strict TypeScript, Biome recommended lint and production build pass. The browser journey covers 1920×1080, 1440×900, 768×1024, 390×844, 320×740 and 844×390; no horizontal overflow was detected. All five expertise selections, modal Escape/focus restoration, both editorial notes, empty/whitespace brief rejection, clipboard, text download, mobile navigation, keyboard selection, motion toggle, live OS preference changes, standalone hero and no-JavaScript reading were exercised.

## Visual review

Inspected desktop, tablet and phone hero frames, arrival samples around 0.3/1.0/3.3 seconds, purpose section, expertise explorer, article spread, modal and brief/footer. The review found and fixed oversized desktop hero spacing, one low-contrast brief note, weak dialog naming, mobile menu dismissal and whitespace-only input acceptance. The media-query change test was also corrected to wait for the browser's asynchronous change event.

The final composition has a legible editorial hierarchy, deliberate vermilion/lilac balance and a clear relationship between the five forms and five disciplines. Mobile retains the complete graphic rather than simply cropping the desktop canvas. The secondary sections have a quieter pace, with a strong colour shift at the brief.

Implementer self-assessment, on the 1–5 scale: identity 4; typography/hierarchy 4; colour 4; graphic/photographic composition 4; motion purpose 4; mobile composition 4; usable interactions 4. These are subjective self-scores, not independent or client approval.

## Loading and limits

Production JavaScript: approximately 120.6 KB gzip for the complete homepage; the standalone hero needs approximately 45.7 KB gzip and excludes React. Hero CSS is about 2.2 KB gzip. The locally hosted Manrope font is 24,836 bytes; hero photograph 160,680 bytes. The second 171,888-byte photograph is lazy-loaded below the fold. The site uses no WebGL/video runtime, external font host, analytics or backend. All byte totals are actual emitted/source sizes, not performance promises.

Physical phones, Safari, Firefox and assistive-technology sessions were not tested. Browser emulation is layout/interaction evidence; sampled motion states are not uninterrupted viewing. The brand is provisional, and real client assets/platform integration remain outside this independent concept. Live source, HTTP, byte-identity and browser verification are recorded separately in RELEASE.md.
