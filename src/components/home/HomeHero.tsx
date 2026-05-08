"use client";

import { useState, type ReactNode } from "react";
import styles from "./HomeHero.module.css";
import {
  HERO_IMAGES,
  HERO_LABELS,
  POPULAR_ROUTES,
  type HeroImageKey,
} from "./heroMedia";

function PlaneGlyph({ size = 22, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      className={styles.logoIcon}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden
    >
      <path d="M21.5 11.2 14.2 9.1 9.6 3.6a.9.9 0 0 0-1.4.1l-.5.8a.9.9 0 0 0 .1 1.1l3.4 3.9-4 1.1-1.7-1.5a.7.7 0 0 0-.9-.1l-.5.4a.7.7 0 0 0-.2.9L5.3 13l-1 2.1a.7.7 0 0 0 .9.9l2.1-1 3.7 1.4a.7.7 0 0 0 .9-.2l.4-.5a.7.7 0 0 0-.1-.9l-1.5-1.7 1.1-4 3.9 3.4a.9.9 0 0 0 1.1.1l.8-.5a.9.9 0 0 0 .1-1.4l-.1-.2 3.5-1a.9.9 0 0 0 0-1.7z" />
    </svg>
  );
}

function GlobeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
    </svg>
  );
}

function FlightsIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return <PlaneGlyph size={size} color={color} />;
}

function StaysIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 18V8h7v6h11v4" />
      <path d="M6 14h1" />
      <path d="M3 22v-4h18v4" />
    </svg>
  );
}

function CarsIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 13.5 5 8h14l2 5.5V19h-3v-2H6v2H3z" />
      <circle cx="7" cy="16" r="1.4" />
      <circle cx="17" cy="16" r="1.4" />
    </svg>
  );
}

type CategoryId = "flights" | "stays" | "cars";

const CATEGORY_ITEMS: {
  id: CategoryId;
  label: string;
  Icon: typeof FlightsIcon;
}[] = [
  { id: "flights", label: "Flights", Icon: FlightsIcon },
  { id: "stays", label: "Stays", Icon: StaysIcon },
  { id: "cars", label: "Cars", Icon: CarsIcon },
];

export type HomeHeroProps = {
  children: ReactNode;
  heroTitle?: string;
};

export function HomeHero({ children, heroTitle = "Where can I fly?" }: HomeHeroProps) {
  const [heroKey, setHeroKey] = useState<HeroImageKey>("mountains");
  const [category, setCategory] = useState<CategoryId>("flights");

  const heroSrc = HERO_IMAGES[heroKey];
  const heroLabel = HERO_LABELS[heroKey];

  const scrollToSearch = () => {
    document.getElementById("flight-search")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("origin")?.focus();
  };

  return (
    <section className={styles.hero} aria-label="Search flights">
      {/* eslint-disable-next-line @next/next/no-img-element -- large hero Unsplash URLs */}
      <img src={heroSrc} alt="" className={styles.heroImage} />
      <div className={styles.scrim} aria-hidden />

      <header className={styles.header}>
        <div className={styles.logo}>
          <PlaneGlyph size={22} color="#fff" />
          <span>FlightFinder</span>
        </div>

        <nav className={styles.chipNav} aria-label="Product category">
          {CATEGORY_ITEMS.map(({ id, label, Icon }) => {
            const on = category === id;
            return (
              <button
                key={id}
                type="button"
                className={on ? styles.chipBtnActive : styles.chipBtn}
                onClick={() => setCategory(id)}
                aria-pressed={on}
              >
                <Icon size={16} color={on ? "#1e1e1e" : "#fff"} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className={styles.navActions}>
          <button type="button" className={styles.navBtn} aria-label="Language and currency">
            <GlobeIcon size={16} /> EN · USD
          </button>
          <button type="button" className={styles.navBtn}>
            My trips
          </button>
          <button type="button" className={styles.signIn}>
            Sign in
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.headlineBlock}>
          <span className={styles.eyebrow}>The cheapest flights, anywhere</span>
          <h1 className={styles.title}>{heroTitle}</h1>
          <p className={styles.subtitle}>Find the cheapest flights from anywhere in the world.</p>
        </div>

        <div id="flight-search" className={styles.searchAnchor}>
          <div className={styles.heroSearchWidth}>{children}</div>
        </div>

        <div className={styles.popularRow}>
          <span className={styles.popularLabel}>Popular:</span>
          {POPULAR_ROUTES.map((label) => (
            <button key={label} type="button" className={styles.popularChip} onClick={scrollToSearch}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.heroFooter}>
        <span className={styles.heroCredit}>{heroLabel}</span>
        <div className={styles.dotRow}>
          {(Object.keys(HERO_IMAGES) as HeroImageKey[]).map((k) => (
            <button
              key={k}
              type="button"
              className={heroKey === k ? styles.dotActive : styles.dot}
              onClick={() => setHeroKey(k)}
              aria-label={`Show ${k} hero image`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
