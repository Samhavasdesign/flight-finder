export const HERO_IMAGES = {
  mountains:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2400&q=80&auto=format&fit=crop",
  tropical:
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=2400&q=80&auto=format&fit=crop",
  city: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=2400&q=80&auto=format&fit=crop",
  desert:
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=2400&q=80&auto=format&fit=crop",
} as const;

export type HeroImageKey = keyof typeof HERO_IMAGES;

export const HERO_LABELS: Record<HeroImageKey, string> = {
  mountains: "◉ Hallstatt, Austria",
  tropical: "◉ Maldives",
  city: "◉ Tokyo, Japan",
  desert: "◉ Wadi Rum, Jordan",
};

export const POPULAR_ROUTES = [
  "JFK → LAX",
  "SFO → Tokyo",
  "LHR → JFK",
  "Anywhere under $400",
] as const;
