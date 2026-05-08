import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

type SeedRow = {
  airport_code: string;
  price: number;
};

/** Typical roundtrip baselines (summer 2026) from major European origins — intra-Europe and key long-haul hubs. */
const SEED_ROWS: SeedRow[] = [
  // Intra-European (budget carriers, major cities)
  { airport_code: "MAD", price: 120 },
  { airport_code: "LIS", price: 130 },
  { airport_code: "LHR", price: 110 },
  { airport_code: "CDG", price: 115 },
  { airport_code: "AMS", price: 120 },
  { airport_code: "FCO", price: 110 },
  { airport_code: "BCN", price: 115 },
  { airport_code: "DUB", price: 105 },
  { airport_code: "VIE", price: 110 },
  { airport_code: "ZRH", price: 140 },
  { airport_code: "CPH", price: 120 },
  { airport_code: "ARN", price: 130 },
  { airport_code: "HEL", price: 135 },
  { airport_code: "WAW", price: 95 },
  { airport_code: "PRG", price: 100 },
  { airport_code: "BUD", price: 90 },
  { airport_code: "ATH", price: 120 },
  { airport_code: "IST", price: 130 },
  { airport_code: "SOF", price: 100 },
  { airport_code: "DBV", price: 130 },
  { airport_code: "OTP", price: 95 },
  { airport_code: "KRK", price: 95 },

  // North America (from Europe)
  { airport_code: "JFK", price: 550 },
  { airport_code: "EWR", price: 560 },
  { airport_code: "MIA", price: 620 },
  { airport_code: "LAX", price: 700 },
  { airport_code: "YYZ", price: 580 },
  { airport_code: "YUL", price: 560 },
  { airport_code: "ORD", price: 600 },
  { airport_code: "BOS", price: 540 },

  // Latin America (from Europe)
  { airport_code: "GRU", price: 750 },
  { airport_code: "EZE", price: 800 },
  { airport_code: "BOG", price: 680 },
  { airport_code: "LIM", price: 720 },
  { airport_code: "SCL", price: 760 },
  { airport_code: "GIG", price: 730 },
  { airport_code: "MEX", price: 680 },
  { airport_code: "UIO", price: 720 },

  // Asia (from Europe)
  { airport_code: "BKK", price: 650 },
  { airport_code: "KUL", price: 620 },
  { airport_code: "SIN", price: 680 },
  { airport_code: "NRT", price: 780 },
  { airport_code: "HND", price: 780 },
  { airport_code: "HKG", price: 720 },
  { airport_code: "ICN", price: 740 },
  { airport_code: "PVG", price: 700 },
  { airport_code: "PEK", price: 720 },
  { airport_code: "DEL", price: 580 },
  { airport_code: "BOM", price: 600 },
  { airport_code: "SGN", price: 640 },
  { airport_code: "MNL", price: 660 },
  { airport_code: "CGK", price: 700 },

  // Middle East (from Europe); CAI also listed under Africa — single row uses Middle East figure
  { airport_code: "DXB", price: 380 },
  { airport_code: "DOH", price: 360 },
  { airport_code: "AUH", price: 390 },
  { airport_code: "AMM", price: 320 },
  { airport_code: "BEY", price: 350 },
  { airport_code: "CAI", price: 350 },

  // Africa (from Europe)
  { airport_code: "NBO", price: 680 },
  { airport_code: "JNB", price: 720 },
  { airport_code: "CPT", price: 750 },
  { airport_code: "CMN", price: 300 },
  { airport_code: "ADD", price: 650 },
  { airport_code: "LOS", price: 680 },
  { airport_code: "RAK", price: 280 },
  { airport_code: "ALG", price: 350 },
  { airport_code: "TUN", price: 280 },

  // Oceania (from Europe)
  { airport_code: "SYD", price: 1100 },
  { airport_code: "MEL", price: 1080 },
  { airport_code: "AKL", price: 1150 },
  { airport_code: "BNE", price: 1090 },

  // Central Asia / Other
  { airport_code: "TAS", price: 680 },
  { airport_code: "NQZ", price: 650 },
  { airport_code: "ALA", price: 600 },
  { airport_code: "IKA", price: 580 },
  { airport_code: "GYD", price: 500 },
  { airport_code: "LED", price: 400 },
  { airport_code: "SVO", price: 450 },
];

export async function main(): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment.");
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    let inserted = 0;
    for (const row of SEED_ROWS) {
      const payload = {
        airport_code: row.airport_code,
        price: row.price,
        source: "seed" as const,
        recorded_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("fare_history").insert(payload);
      if (error) {
        throw error;
      }

      inserted += 1;
      console.log(`[seed] Seeded ${row.airport_code} at $${row.price}`);
    }

    console.log(`[seed] Complete — ${inserted} rows inserted`);
  } catch (error: unknown) {
    console.error("Seed failed:", error);
    throw error;
  }
}

main().catch(() => {
  process.exit(1);
});
