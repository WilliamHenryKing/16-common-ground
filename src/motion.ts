import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function mountMotion(root: HTMLElement, fullPage = true) {
  let manualOff = false;
  let media = gsap.matchMedia();
  let intro: gsap.core.Timeline | undefined;
  const motion = root.querySelector<HTMLButtonElement>("[data-motion]");
  const replay = root.querySelector<HTMLButtonElement>("[data-replay]");
  const system = window.matchMedia("(prefers-reduced-motion: reduce)");
  const render = () => {
    media.revert();
    media = gsap.matchMedia();
    const disabled = manualOff || system.matches;
    root.dataset.motion = disabled ? "off" : "on";
    if (motion) {
      motion.innerHTML = disabled
        ? 'Motion off <span aria-hidden="true">▷</span>'
        : 'Motion on <span aria-hidden="true">Ⅱ</span>';
      motion.setAttribute("aria-pressed", String(disabled));
      motion.setAttribute(
        "aria-label",
        system.matches
          ? "Motion off: system reduced motion preference"
          : disabled
            ? "Enable animation"
            : "Disable animation",
      );
      motion.disabled = system.matches;
    }
    if (replay) replay.disabled = disabled;
    if (disabled) return;
    media.add(
      { desktop: "(min-width: 900px)", mobile: "(max-width: 899px)" },
      (context) => {
        intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(
            ".cg-title-line",
            { yPercent: 112, rotation: 2, duration: 1.2, stagger: 0.15 },
            0.08,
          )
          .from(
            ".cg-blade",
            {
              rotation: "-=78",
              scale: 0.65,
              opacity: 0,
              duration: 1.8,
              stagger: 0.09,
              svgOrigin: "340 340",
            },
            0.15,
          )
          .from(".cg-photo", { opacity: 0, scale: 0.8, svgOrigin: "340 340", duration: 1.7 }, 0.5)
          .from(".cg-arrival", { y: 20, opacity: 0, stagger: 0.14, duration: 0.9 }, 0.8)
          .from(
            ".cg-art-label, .cg-art-caption",
            { y: 8, opacity: 0, duration: 0.7, stagger: 0.1 },
            1.45,
          )
          .from(
            ".cg-discipline-strip a",
            { y: 20, opacity: 0, duration: 0.7, stagger: 0.07 },
            1.65,
          );
        if (fullPage) {
          if (context.conditions?.desktop)
            gsap.to(".cg-chamber", {
              rotation: 16,
              y: 60,
              ease: "none",
              scrollTrigger: {
                trigger: ".cg-hero-grid",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
          for (const element of root.querySelectorAll("[data-reveal]"))
            gsap.from(element, {
              y: 36,
              opacity: 0,
              duration: 0.9,
              scrollTrigger: { trigger: element, start: "top 90%", once: true },
            });
          gsap.from(".cg-statement-word", {
            color: "#bab9b0",
            stagger: 0.16,
            ease: "none",
            scrollTrigger: {
              trigger: ".cg-about",
              start: "top 78%",
              end: "bottom 62%",
              scrub: 0.5,
            },
          });
          gsap.from(".cg-large-mark", {
            rotation: -70,
            scale: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: ".cg-conversation",
              start: "top bottom",
              end: "center center",
              scrub: 1,
            },
          });
        }
      },
      root,
    );
  };
  const toggle = () => {
    manualOff = !manualOff;
    render();
  };
  const restart = () => intro?.restart();
  const visibility = () => {
    if (intro && intro.progress() < 1) intro.paused(document.hidden);
  };
  const closeMenu = (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest(".cg-mobile-nav a")) {
      root.querySelector(".cg-mobile-nav")?.removeAttribute("open");
    }
  };
  root.addEventListener("click", closeMenu);
  motion?.addEventListener("click", toggle);
  replay?.addEventListener("click", restart);
  system.addEventListener("change", render);
  document.addEventListener("visibilitychange", visibility);
  render();
  return () => {
    root.removeEventListener("click", closeMenu);
    media.revert();
    motion?.removeEventListener("click", toggle);
    replay?.removeEventListener("click", restart);
    system.removeEventListener("change", render);
    document.removeEventListener("visibilitychange", visibility);
  };
}
