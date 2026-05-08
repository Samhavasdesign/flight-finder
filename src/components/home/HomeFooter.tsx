import styles from "./HomeFooter.module.css";

function PlaneGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M21.5 11.2 14.2 9.1 9.6 3.6a.9.9 0 0 0-1.4.1l-.5.8a.9.9 0 0 0 .1 1.1l3.4 3.9-4 1.1-1.7-1.5a.7.7 0 0 0-.9-.1l-.5.4a.7.7 0 0 0-.2.9L5.3 13l-1 2.1a.7.7 0 0 0 .9.9l2.1-1 3.7 1.4a.7.7 0 0 0 .9-.2l.4-.5a.7.7 0 0 0-.1-.9l-1.5-1.7 1.1-4 3.9 3.4a.9.9 0 0 0 1.1.1l.8-.5a.9.9 0 0 0 .1-1.4l-.1-.2 3.5-1a.9.9 0 0 0 0-1.7z" />
    </svg>
  );
}

const COLS = [
  { h: "Explore", items: ["All destinations", "Deals", "Cheap weekends", "Price alerts"] },
  { h: "Company", items: ["About", "Careers", "Press", "Contact"] },
  { h: "Help", items: ["Support", "Booking FAQ", "Privacy", "Terms"] },
] as const;

export function HomeFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <div className={styles.logo}>
            <PlaneGlyph />
            <span>FlightFinder</span>
          </div>
          <p className={styles.blurb}>
            The cheapest flights, everywhere. FlightFinder compares fares across many providers and
            helps you find where your budget goes furthest.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.h} className={styles.col}>
            <div className={styles.colTitle}>{c.h}</div>
            {c.items.map((item) => (
              <a key={item} href="#" className={styles.link}>
                {item}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} FlightFinder</span>
        <span>Made for travelers, not ads.</span>
      </div>
    </footer>
  );
}
