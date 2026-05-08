export type MarketingDestination = {
  city: string;
  country: string;
  from: string;
  price: number;
  nights: string;
  img: string;
  tag?: "Trending" | "Cheapest";
};

export const MARKETING_DESTINATIONS: MarketingDestination[] = [
  {
    city: "Tokyo",
    country: "Japan",
    from: "JFK",
    price: 412,
    nights: "7 nights",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80&auto=format&fit=crop",
    tag: "Trending",
  },
  {
    city: "Lisbon",
    country: "Portugal",
    from: "BOS",
    price: 298,
    nights: "5 nights",
    img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80&auto=format&fit=crop",
  },
  {
    city: "Mexico City",
    country: "Mexico",
    from: "LAX",
    price: 189,
    nights: "4 nights",
    img: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=900&q=80&auto=format&fit=crop",
    tag: "Cheapest",
  },
  {
    city: "Reykjavik",
    country: "Iceland",
    from: "JFK",
    price: 340,
    nights: "6 nights",
    img: "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=900&q=80&auto=format&fit=crop",
  },
  {
    city: "Istanbul",
    country: "Türkiye",
    from: "JFK",
    price: 389,
    nights: "5 nights",
    img: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=900&q=80&auto=format&fit=crop",
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    from: "MIA",
    price: 425,
    nights: "8 nights",
    img: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=900&q=80&auto=format&fit=crop",
  },
  {
    city: "Cape Town",
    country: "South Africa",
    from: "JFK",
    price: 589,
    nights: "9 nights",
    img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=900&q=80&auto=format&fit=crop",
  },
  {
    city: "Bali",
    country: "Indonesia",
    from: "LAX",
    price: 615,
    nights: "10 nights",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80&auto=format&fit=crop",
  },
];
