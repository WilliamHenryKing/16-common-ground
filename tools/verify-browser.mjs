import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.argv[2] || "http://127.0.0.1:4626";
const out = "output/playwright";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { base, browser: browser.version(), checks: [], errors: [], measurements: {} };
const check = (name, condition) => {
  report.checks.push({ name, passed: !!condition });
  if (!condition) throw new Error(name);
};
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
page.on("pageerror", (error) => report.errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") report.errors.push(message.text());
});
const shot = (name) => page.screenshot({ path: `${out}/${name}.png` });
const axe = async (name) => {
  await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
  const result = await page.evaluate(async () =>
    (
      await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      })
    ).violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target) })),
  );
  report[name] = result;
  check(`${name}: no WCAG A/AA violations`, result.length === 0);
};
try {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(3400);
  check(
    "page title and headline",
    (await page.title()).includes("Common Ground") && (await page.locator("h1").count()) === 1,
  );
  await shot("hero-desktop");
  await page.getByRole("button", { name: /Replay intro/ }).click();
  await page.waitForTimeout(300);
  await shot("intro-0300ms");
  await page.waitForTimeout(700);
  await shot("intro-1000ms");
  await page.waitForTimeout(2300);
  await shot("intro-settled");
  for (const [width, height] of [
    [1920, 1080],
    [1440, 900],
    [768, 1024],
    [390, 844],
    [320, 740],
    [844, 390],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(3400);
    check(
      `no horizontal overflow ${width}x${height}`,
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
    );
    check(`hero readable ${width}x${height}`, await page.locator("h1").isVisible());
    await shot(`hero-${width}x${height}`);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(3400);
  await page.getByRole("button", { name: "Disable animation" }).click();
  check(
    "motion stops and preserves readable content",
    (await page.locator(".cg").getAttribute("data-motion")) === "off" &&
      (await page.locator("h1").isVisible()),
  );
  check("replay disabled while motion is off", await page.locator("[data-replay]").isDisabled());
  for (const [i, name] of [
    "Public affairs",
    "Policy",
    "Communications",
    "Membership",
    "Events",
  ].entries()) {
    const button = page.locator(".cg-services").getByRole("button", { name: new RegExp(name) });
    await button.click();
    check(`select ${name}`, (await button.getAttribute("aria-pressed")) === "true");
    check(
      `panel updates ${name}`,
      (await page.locator("#discipline-panel .cg-kicker").textContent()).includes(`0${i + 1}`),
    );
  }
  await shot("expertise-events");
  await page.locator("#about").scrollIntoViewIfNeeded();
  await shot("about");
  await page.locator("#perspectives").scrollIntoViewIfNeeded();
  await shot("perspectives");
  await page.locator(".cg-article-button").first().click();
  check("editorial note opens", await page.locator("dialog").isVisible());
  await shot("editorial-note");
  await axe("dialogAccessibility");
  await page.keyboard.press("Escape");
  check(
    "Escape closes and restores focus",
    !(await page.locator("dialog").isVisible()) &&
      (await page
        .locator(".cg-article-button")
        .first()
        .evaluate((el) => el === document.activeElement)),
  );
  await page.locator(".cg-article-button").nth(1).click();
  check(
    "second note distinct",
    (await page.locator("dialog h2").textContent()).includes("Bring people"),
  );
  await page.getByRole("button", { name: "Close dialog" }).click();
  await page.locator("#conversation").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Create my brief" }).click();
  check(
    "empty brief blocked",
    await page.locator("#ambition").evaluate((el) => !el.validity.valid),
  );
  await page.locator("#ambition").fill("               ");
  await page.getByRole("button", { name: "Create my brief" }).click();
  check(
    "whitespace brief blocked",
    await page.locator("#ambition").evaluate((el) => !el.validity.valid),
  );
  await page.locator("#area").selectOption({ label: "Events" });
  await page
    .locator("#ambition")
    .fill("Bring the sector together for a focused policy roundtable.");
  await page.locator("#timing").selectOption({ label: "In the next three months" });
  await page.getByRole("button", { name: "Create my brief" }).click();
  check(
    "brief contains chosen values",
    (await page.locator(".cg-brief-result pre").textContent()).includes("Area: Events"),
  );
  await page.getByRole("button", { name: "Copy brief" }).click();
  await page.waitForFunction(
    () => document.querySelector('[role="status"]')?.textContent === "Brief copied.",
  );
  check(
    "clipboard contains brief",
    (await page.evaluate(() => navigator.clipboard.readText())).includes("Area: Events"),
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download .txt" }).click();
  const download = await downloadPromise;
  check(
    "download has meaningful filename",
    download.suggestedFilename() === "common-ground-project-brief.txt",
  );
  await shot("brief-result");
  await axe("pageAccessibility");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.locator(".cg-mobile-nav summary").click();
  check("phone menu opens", (await page.locator(".cg-mobile-nav").getAttribute("open")) !== null);
  await shot("phone-menu");
  await page.locator(".cg-mobile-nav nav").getByRole("link", { name: "Our expertise" }).click();
  check("phone menu anchor navigates", page.url().endsWith("#expertise"));
  check(
    "phone menu closes after navigation",
    (await page.locator(".cg-mobile-nav").getAttribute("open")) === null,
  );
  await page
    .locator(".cg-services")
    .getByRole("button", { name: /Policy/ })
    .focus();
  await page.keyboard.press("Enter");
  check(
    "keyboard selects discipline",
    (await page.locator("#discipline-panel .cg-kicker").textContent()).includes("POLICY"),
  );
  await axe("phoneAccessibility");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "networkidle" });
  check(
    "OS reduced motion is respected",
    (await page.locator(".cg").getAttribute("data-motion")) === "off",
  );
  check("system preference prevents replay", await page.locator("[data-replay]").isDisabled());
  await shot("reduced-motion-phone");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForFunction(
    () => document.querySelector(".cg")?.getAttribute("data-motion") === "on",
  );
  check(
    "live preference change is respected",
    (await page.locator(".cg").getAttribute("data-motion")) === "on",
  );
  await page.goto(`${base}/hero.html`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3400);
  check("standalone hero loads", await page.locator("h1").isVisible());
  check("standalone has no homepage body", (await page.locator("#expertise").count()) === 0);
  await shot("standalone-phone");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(3400);
  await shot("standalone-desktop");
  report.measurements.standaloneResources = await page.evaluate(() =>
    performance.getEntriesByType("resource").map((r) => ({
      name: r.name,
      encodedBodySize: r.encodedBodySize,
      transferSize: r.transferSize,
    })),
  );
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await nojs.newPage();
  await staticPage.goto(base);
  check(
    "prerendered no-JavaScript content",
    (await staticPage.locator("h1").isVisible()) &&
      (await staticPage.locator("#about h2").isVisible()),
  );
  await nojs.close();
  check("no browser runtime errors", report.errors.length === 0);
} catch (error) {
  report.failure = error.message;
  await shot("failure");
  process.exitCode = 1;
} finally {
  await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}
