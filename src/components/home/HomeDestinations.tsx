"use client";

import { useMemo, useState } from "react";
import styles from "./HomeDestinations.module.css";
import { MARKETING_DESTINATIONS } from "./destinationData";

const FILTERS = ["All", "Under $300", "Beach", "City", "Weekend"] as const;

export function HomeDestinations() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible = useMemo(() => {
    if (filter === "Under $300") return MARKETING_DESTINATIONS.filter((d) => d.price < 300);
    return MARKETING_DESTINATIONS;
  }, [filter]);

  return (
    <section className={styles.section} aria-labelledby="destinations-heading">
      <div className={styles.headerRow}>
        <div className={styles.titleRow}>
          <div>
            <span className={styles.eyebrow}>Fly somewhere cheap</span>
            <h2 id="destinations-heading" className={styles.title}>
              Where your dollar goes furthest
            </h2>
          </div>
          <button type="button" className={styles.seeAll}>
            See all destinations →
          </button>
        </div>
        <div className={styles.filters}>
          {FILTERS.map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                type="button"
                className={on ? styles.filterBtnActive : styles.filterBtn}
                onClick={() => setFilter(f)}
                aria-pressed={on}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.grid}>
        {visible.map((d) => (
          <article key={d.city} className={styles.card}>
            <div className={styles.imageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.img} alt="" className={styles.image} />
              {d.tag === "Cheapest" ? (
                <span className={styles.tagDefault}>{d.tag}</span>
              ) : d.tag ? (
                <span className={styles.tagSuccess}>{d.tag}</span>
              ) : null}
            </div>
            <div className={styles.cardBody}>
              <div className={styles.row}>
                <div style={{ minWidth: 0 }}>
                  <div className={styles.city}>{d.city}</div>
                  <div className={styles.country}>{d.country}</div>
                </div>
                <div className={styles.priceCol}>
                  <div className={styles.fromLabel}>from</div>
                  <div className={styles.price}>${d.price}</div>
                </div>
              </div>
              <div className={styles.meta}>
                {d.from} · {d.nights} · round-trip
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
