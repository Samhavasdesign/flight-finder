import styles from "./HomeFooter.module.css";

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
