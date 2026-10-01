import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { disciplines, perspectives } from "./content";
import { Arrow, Hero, Mark } from "./Hero";
import { mountMotion } from "./motion";

gsap.registerPlugin(useGSAP);

export function App() {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [article, setArticle] = useState(0);
  const [brief, setBrief] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const selected = disciplines[active] ?? disciplines[0];
  const note = perspectives[article] ?? perspectives[0];
  useGSAP(
    () => {
      if (!root.current) return;
      return mountMotion(root.current);
    },
    { scope: root },
  );

  const openNote = (index: number) => {
    setArticle(index);
    dialog.current?.showModal();
  };
  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopyStatus("Brief copied.");
    } catch {
      setCopyStatus("Copy unavailable in this browser. Select the brief text or download it.");
    }
  };
  const downloadBrief = () => {
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "common-ground-project-brief.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="cg" ref={root}>
      <a className="cg-skip" href="#main">
        Skip to content
      </a>
      <Hero />
      <main id="main">
        <section className="cg-about cg-section" id="about">
          <p className="cg-eyebrow" data-reveal>
            <span>01 / THE GROUP</span>
            <span>STRONGER, TOGETHER.</span>
          </p>
          <div className="cg-about-grid">
            <div className="cg-mini-art" aria-hidden="true">
              <Mark />
              <span>
                Common ground.
                <br />
                Extraordinary possibility.
              </span>
            </div>
            <div>
              <h2 className="cg-statement">
                {"The most important things happen when different worlds come together."
                  .split(" ")
                  .map((word) => (
                    <span className="cg-statement-word" key={word}>
                      {word}{" "}
                    </span>
                  ))}
              </h2>
              <p className="cg-about-copy" data-reveal>
                At the intersection of public affairs, policy, communications, membership and
                events, Common Ground brings people and ideas into the same conversation. Different
                expertise. A shared direction.
              </p>
            </div>
          </div>
        </section>
        <section className="cg-expertise cg-section" id="expertise">
          <p className="cg-eyebrow" data-reveal>
            <span>02 / OUR EXPERTISE</span>
            <span>FIVE PERSPECTIVES. ONE GROUP.</span>
          </p>
          <div className="cg-section-heading" data-reveal>
            <h2>
              Connected thinking.
              <br />
              <em>Meaningful change.</em>
            </h2>
            <p>
              See the bigger picture.
              <br />
              Find the right way forward.
            </p>
          </div>
          <div className="cg-explorer">
            <div className="cg-services">
              {disciplines.map((d, i) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  aria-controls="discipline-panel"
                >
                  <span className="cg-service-index">0{i + 1}</span>
                  <span>{d.name}</span>
                  <Arrow diagonal />
                </button>
              ))}
            </div>
            <div className="cg-service-detail" id="discipline-panel" aria-live="polite">
              <div className={`cg-service-symbol cg-service-symbol-${active}`} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <p className="cg-kicker">
                0{active + 1} / {selected.name.toUpperCase()}
              </p>
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
              <ul>
                {selected.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a className="cg-text-link" href="#conversation">
                Start a conversation <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section className="cg-perspectives cg-section" id="perspectives">
          <p className="cg-eyebrow" data-reveal>
            <span>03 / PERSPECTIVES</span>
            <span>IDEAS WORTH EXPLORING.</span>
          </p>
          <div className="cg-section-heading" data-reveal>
            <h2>
              A little perspective
              <br />
              <em>goes a long way.</em>
            </h2>
            <p>
              Illustrative thinking from
              <br />a connected point of view.
            </p>
          </div>
          <div className="cg-article-grid">
            {perspectives.map((p, i) => (
              <article key={p.title} data-reveal>
                <button type="button" className="cg-article-button" onClick={() => openNote(i)}>
                  <div className="cg-article-image">
                    <img
                      src={`/images/${p.image}.webp`}
                      width="1100"
                      height="760"
                      loading="lazy"
                      alt={
                        i === 0
                          ? "The Palace of Westminster seen across the Thames"
                          : "An audience gathered for a conference presentation"
                      }
                    />
                    <span className="cg-article-arrow">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <p className="cg-article-meta">
                    {p.category} <span>CONCEPT NOTE / 0{i + 1}</span>
                  </p>
                  <h3>{p.title}</h3>
                  <span className="cg-read">
                    Read perspective <span aria-hidden="true">↗</span>
                  </span>
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className="cg-conversation cg-section" id="conversation">
          <p className="cg-eyebrow">
            <span>04 / LET’S TALK</span>
            <span>EVERY GOOD IDEA STARTS SOMEWHERE.</span>
          </p>
          <div className="cg-conversation-grid">
            <div data-reveal>
              <h2>
                What could
                <br />
                we move
                <br />
                <em>forward?</em>
              </h2>
              <p>
                Start with an ambition.
                <br />
                We’ll start with a conversation.
              </p>
              <div className="cg-large-mark" aria-hidden="true">
                <Mark />
              </div>
            </div>
            <div className="cg-brief" data-reveal>
              <p className="cg-kicker">YOUR NEXT CONVERSATION</p>
              <h3>Put your idea into words.</h3>
              <p className="cg-demo-note">
                Try the local brief builder. No personal details, no submission — just a starting
                point you can keep.
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget);
                  const field = event.currentTarget.elements.namedItem(
                    "ambition",
                  ) as HTMLTextAreaElement;
                  if (String(data.get("ambition")).trim().length < 12) {
                    field.setCustomValidity(
                      "Please describe your ambition in at least 12 characters.",
                    );
                    field.reportValidity();
                    return;
                  }
                  setBrief(
                    `COMMON GROUND\nIndependent concept: project discussion brief\n\nArea: ${data.get("area")}\nAmbition: ${String(data.get("ambition")).trim()}\nTiming: ${data.get("timing")}\n\nPrepared locally. This brief has not been sent.`,
                  );
                  setCopyStatus("");
                }}
              >
                <label htmlFor="area">Where would you like to start?</label>
                <select id="area" name="area">
                  {disciplines.map((d) => (
                    <option key={d.id}>{d.name}</option>
                  ))}
                  <option>Let’s explore together</option>
                </select>
                <label htmlFor="ambition">What would you like to move forward?</label>
                <textarea
                  id="ambition"
                  name="ambition"
                  required
                  minLength={12}
                  maxLength={600}
                  onInput={(event) => event.currentTarget.setCustomValidity("")}
                  rows={3}
                  placeholder="A conversation, a campaign, a community…"
                />
                <label htmlFor="timing">When are you thinking?</label>
                <select id="timing" name="timing">
                  <option>Just exploring</option>
                  <option>In the next three months</option>
                  <option>Later this year</option>
                </select>
                <button type="submit" className="cg-solid-button">
                  Create my brief <Arrow />
                </button>
              </form>
              {brief && (
                <div className="cg-brief-result">
                  <h4>Your conversation starter</h4>
                  <pre>{brief}</pre>
                  <div className="cg-result-actions">
                    <button type="button" onClick={copyBrief}>
                      Copy brief
                    </button>
                    <button type="button" onClick={downloadBrief}>
                      Download .txt
                    </button>
                  </div>
                  <p role="status">{copyStatus || "Your brief is ready. Nothing has been sent."}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="cg-footer">
        <div className="cg-footer-top">
          <a className="cg-brand" href="#top">
            <Mark />
            <span>
              common
              <br />
              ground
            </span>
          </a>
          <p>
            Different perspectives.
            <br />
            Shared progress.
          </p>
          <a className="cg-text-link" href="#top">
            Back to the beginning <span aria-hidden="true">↑</span>
          </a>
        </div>
        <div className="cg-footer-word" aria-hidden="true">
          Common ground.
        </div>
        <div className="cg-footer-bottom">
          <p>
            Independent design concept by William King.
            <br />
            Fictional brand. Independent portfolio work.
          </p>
          <div>
            <a href="/hero.html">Standalone hero ↗</a>
            <a href="https://github.com/WilliamHenryKing/16-common-ground">
              Source & integration ↗
            </a>
            <button
              type="button"
              onClick={() => {
                setArticle(-1);
                dialog.current?.showModal();
              }}
            >
              Credits & concept
            </button>
          </div>
          <span>© 2026 / CONCEPT 01</span>
        </div>
      </footer>
      <dialog
        className="cg-dialog"
        aria-label="Common Ground concept details"
        ref={dialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") dialog.current?.close();
        }}
      >
        <div className="cg-dialog-inner">
          <form method="dialog">
            <button className="cg-close" type="submit" aria-label="Close dialog">
              Close ×
            </button>
          </form>
          {article < 0 ? (
            <>
              <p className="cg-kicker">ABOUT THIS CONCEPT</p>
              <h2>
                A new perspective
                <br />
                for Common Ground.
              </h2>
              <p>
                This independent portfolio demonstration responds to a public animated-hero brief.
                Common Ground is a fictional brand, with original identity, copy and artwork. This
                is a portfolio demonstration, not a commissioned client website.
              </p>
              <p>
                Original SVG artwork and development by William King. Manrope by the Manrope Project
                Authors, SIL Open Font License 1.1.
              </p>
              <p>
                London photograph by{" "}
                <a href="https://unsplash.com/photos/the-houses-of-parliament-and-big-ben-in-london-v3nbIVKiETU">
                  Maik Winnecke
                </a>
                . Conference photograph by{" "}
                <a href="https://unsplash.com/photos/speaker-presenting-to-a-large-audience-in-an-auditorium-qzO9a6oQ8AM">
                  Marwen Larafa
                </a>
                . Both under the <a href="https://unsplash.com/license">Unsplash License</a>. The
                images do not represent commissioned work or endorsement.
              </p>
              <p>
                This demo has no analytics, account system or form backend. Your brief stays in this
                page unless you copy or download it.
              </p>
            </>
          ) : (
            <>
              <p className="cg-kicker">{note.category} / CONCEPT NOTE</p>
              <h2>{note.title}</h2>
              <p className="cg-dialog-intro">{note.intro}</p>
              {note.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {/* biome-ignore lint/a11y/useValidAnchor: This remains real anchor navigation after dismissing the modal. */}
              <a
                className="cg-text-link"
                href="#conversation"
                onClick={() => dialog.current?.close()}
              >
                Make it a conversation <Arrow />
              </a>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
