import styles from "./HomeHowItWorks.module.css";

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className={styles.step}>
      <div className={styles.badge}>{n}</div>
      <div>
        <div className={styles.stepTitle}>{title}</div>
        <div className={styles.stepBody}>{body}</div>
      </div>
    </div>
  );
}

export function HomeHowItWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-heading">
      <div className={styles.intro}>
        <span className={styles.eyebrow}>How it works</span>
        <h2 id="how-heading" className={styles.title}>
          Book in three quiet steps
        </h2>
        <p className={styles.lede}>
          No ads, no up-sells, no hidden fees. Just the cheapest fare for your route.
        </p>
      </div>
      <div className={styles.grid}>
        <Step
          n="1"
          title="Tell us where"
          body="Type a city, airport, or pick a region. Flex your dates by ±3 days to find the real cheapest day."
        />
        <Step
          n="2"
          title="Compare destinations"
          body="We scan fares across providers so you can see where your budget goes furthest."
        />
        <Step
          n="3"
          title="Book direct"
          body="We show live prices; you book with the airline or partner. No FlightFinder markup at checkout."
        />
      </div>
    </section>
  );
}
