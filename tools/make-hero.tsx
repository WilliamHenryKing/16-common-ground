import { writeFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { Hero } from "../src/Hero";

writeFileSync(
  "hero.html",
  `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Common Ground: standalone animated hero concept."><title>Common Ground — standalone hero</title><link rel="icon" href="/favicon.svg"><link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin></head><body style="margin:0"><main class="cg cg-standalone">${renderToStaticMarkup(<Hero standalone />)}</main><script type="module" src="/src/embed.ts"></script></body></html>`,
);
