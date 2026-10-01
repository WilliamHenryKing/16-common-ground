import { disciplines } from "./content";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Mark() {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path
        d="M34 10a17 17 0 1 0 0 24M34 17a8 8 0 1 0 0 10"
        stroke="currentColor"
        strokeWidth="5"
      />
    </svg>
  );
}

export function Hero({ standalone = false }: { standalone?: boolean }) {
  const link = (id: string) => `${standalone ? "/" : ""}#${id}`;
  return (
    <section className="cg-hero" id="top" aria-label="Introducing Common Ground">
      <header className="cg-header">
        <a className="cg-brand" href={link("top")} aria-label="Common Ground home">
          <Mark />
          <span>
            common
            <br />
            ground
          </span>
        </a>
        <nav className="cg-desktop-nav" aria-label="Main navigation">
          <a href={link("about")}>The group</a>
          <a href={link("expertise")}>Our expertise</a>
          <a href={link("perspectives")}>Perspectives</a>
        </nav>
        <a className="cg-contact" href={link("conversation")}>
          Let’s talk <Arrow diagonal />
        </a>
        <details className="cg-mobile-nav">
          <summary>
            Menu <span aria-hidden="true">+</span>
          </summary>
          <nav aria-label="Mobile navigation">
            <a href={link("about")}>The group</a>
            <a href={link("expertise")}>Our expertise</a>
            <a href={link("perspectives")}>Perspectives</a>
            <a href={link("conversation")}>Let’s talk</a>
          </nav>
        </details>
      </header>
      <div className="cg-hero-grid">
        <div className="cg-hero-copy">
          <p className="cg-kicker cg-arrival">
            <span /> INDEPENDENT MINDS. COLLECTIVE IMPACT.
          </p>
          <h1>
            <span className="cg-mask">
              <span className="cg-title-line">Different</span>
            </span>
            <span className="cg-mask">
              <span className="cg-title-line">perspectives.</span>
            </span>
            <span className="cg-mask cg-serif">
              <span className="cg-title-line">Shared progress.</span>
            </span>
          </h1>
          <div className="cg-hero-bottom cg-arrival">
            <p>
              Connecting people, policy and possibility.
              <br />A group built to move things forward.
            </p>
            <a
              className="cg-round-link"
              href={link("expertise")}
              aria-label="Explore our expertise"
            >
              <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="cg-art" aria-hidden="true">
          <span className="cg-cross cg-cross-top">+</span>
          <span className="cg-cross cg-cross-bottom">+</span>
          <svg aria-hidden="true" className="cg-orbit" viewBox="0 0 680 680" fill="none">
            <defs>
              <clipPath id="cg-aperture">
                <circle cx="340" cy="340" r="172" />
              </clipPath>
            </defs>
            <circle
              cx="340"
              cy="340"
              r="306"
              stroke="currentColor"
              strokeOpacity=".17"
              strokeDasharray="2 6"
            />
            <g className="cg-photo" clipPath="url(#cg-aperture)">
              <image
                href="/images/london.webp"
                x="150"
                y="98"
                width="410"
                height="485"
                preserveAspectRatio="xMidYMid slice"
                style={{ filter: "grayscale(1)" }}
              />
              <circle cx="340" cy="340" r="172" fill="#a3977c" opacity=".12" />
            </g>
            {[0, 1, 2, 3, 4].map((i) => (
              <g
                className={`cg-blade cg-blade-${i}`}
                key={i}
                style={{ transformOrigin: "340px 340px" }}
                transform={`rotate(${i * 72} 340 340)`}
              >
                <path
                  d="M350 55 A285 285 0 0 1 609 247 L525 276 A198 198 0 0 0 347 142 Z"
                  fill={["#b93626", "#c7b8dd", "#b93626", "#d4cebd", "#b93626"][i]}
                />
                <path
                  d="M350 74 A266 266 0 0 1 591 253M349 90 A250 250 0 0 1 576 258M348 106 A234 234 0 0 1 561 263M348 122 A218 218 0 0 1 546 269"
                  stroke={i === 1 ? "#9581b0" : "#f1efe8"}
                  strokeWidth="1"
                  strokeOpacity=".55"
                />
              </g>
            ))}
            <path
              className="cg-orbit"
              d="M40 340H168M512 340h128M340 40v128M340 512v128"
              stroke="currentColor"
              strokeOpacity=".3"
              strokeWidth=".8"
            />
            <circle
              cx="340"
              cy="340"
              r="183"
              stroke="currentColor"
              strokeOpacity=".25"
              strokeWidth=".75"
            />
          </svg>
          <div className="cg-art-label cg-label-one">01 / PUBLIC AFFAIRS</div>
          <div className="cg-art-label cg-label-two">02 / POLICY</div>
          <div className="cg-art-label cg-label-three">03 / COMMUNICATIONS</div>
          <div className="cg-art-label cg-label-four">04 / MEMBERSHIP</div>
          <div className="cg-art-label cg-label-five">05 / EVENTS</div>
          <span className="cg-art-caption">THE POWER OF COMING TOGETHER</span>
        </div>
      </div>
      <div className="cg-hero-foot">
        <a href={link("about")} className="cg-scroll">
          SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
        </a>
        <span className="cg-concept">COMMON GROUND — CONCEPT 01</span>
        <div className="cg-motion-controls">
          <button type="button" data-replay>
            Replay intro <span aria-hidden="true">↻</span>
          </button>
          <button type="button" data-motion aria-pressed="false">
            Motion on <span aria-hidden="true">Ⅱ</span>
          </button>
        </div>
      </div>
      <nav className="cg-discipline-strip" aria-label="Five connected disciplines">
        {disciplines.map((d, i) => (
          <a href={link("expertise")} key={d.id}>
            <span>0{i + 1}</span>
            {d.name}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </section>
  );
}
