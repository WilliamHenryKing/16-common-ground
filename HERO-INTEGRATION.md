# Integrating the Common Ground hero

This independent concept demonstrates the supplied Chamber Group brief. Replace the provisional identity and copy with approved brand assets before use on a real corporate website. No client approval or affiliation is implied.

## Fastest preview

Open `/hero.html` in the deployed site. It is real, prerendered HTML enhanced by a small JavaScript entry; React is not shipped in this hero entry. The navigation links point into the full demo homepage. It has its own mobile navigation, replay and motion control.

## Add to an existing HTML or CMS template

1. Run `bun install --frozen-lockfile` and `bun run build`.
2. Copy the `.cg-hero` section from `dist/hero.html` into a wrapper with `class="cg"`. Use only one hero per page (the SVG clip-path ID is unique to this component).
3. Copy the stylesheet and module-script references from the generated HTML, along with all files they import from `dist/assets/`. Include `public/fonts/manrope-latin.woff2`, its OFL notice, and `public/images/london.webp` at the paths referenced by CSS/HTML, or update those paths for your CMS.
4. Load the hero module after the markup. The script searches for the `.cg` wrapper and calls `mountMotion(root, false)`. Only `.cg` descendants are styled and animated. It does not control scrolling or require a global framework instance.
5. Replace the links with real page/section destinations. The full demo uses `/#about`, `/#expertise`, `/#perspectives` and `/#conversation`.

For source integration, import `mountMotion` from `src/motion.ts` and `src/hero.css`; call the returned cleanup function when your CMS/page router removes the hero. The only runtime animation library is GSAP 3.15.0 (including ScrollTrigger in the shared motion module). The separate entry does not import React or the homepage forms.

## React integration

Render `Hero` from `src/Hero.tsx`, import `src/hero.css`, and call `mountMotion` inside a scoped `useGSAP` lifecycle, returning its cleanup. `src/App.tsx` is the complete working example. `standalone` changes navigation links to homepage anchors. For a different brand, edit `src/content.ts` and Hero markup; do not overlay the text with canvas or image assets.

## Responsive behaviour and motion

The desktop composition is a two-column layout. Below 761 CSS px it becomes an authored vertical layout, with a native details menu. The finite arrival lasts about three seconds and settles; replay is optional. CSS defaults are readable, so missing JavaScript never hides the hero.

OS `prefers-reduced-motion` disables motion and replay. The visible motion button can also disable it for this page session. Preference changes are handled while the page is open. Timelines, ScrollTriggers and event handlers are removed by cleanup. No autoplay video, WebGL, scroll hijacking or external font/CDN request is required.

## Brand and content handoff

Palette variables are at the top of `src/hero.css`. Five SVG sectors represent the five service areas, and the central photograph can be replaced independently. Keep the focus contrast and static/reduced-motion composition when changing colours or fonts. Supply your own properly licensed photography and keep the third-party notices for assets you retain.

The local brief builder in the full homepage has no backend and is not part of the standalone hero. For a real website, connect your approved contact route rather than presenting this demo interaction as an enquiry submission.
