import { config } from "dotenv";
import { FirecrawlAppV1 as FirecrawlApp } from "@mendable/firecrawl-js";

config({ path: ".env.local" });

const SKYSCANNER_URL =
  "https://www.skyscanner.com/transport/flights/lhr/anywhere/202607/202608/";

async function main(): Promise<void> {
  try {
    const apiKey = process.env.FIRECRAWL_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      throw new Error("FIRECRAWL_API_KEY is not set");
    }

    const client = new FirecrawlApp({ apiKey });
    const result = await client.scrapeUrl(SKYSCANNER_URL, {
      formats: ["markdown"],
    });

    if (result.success === false) {
      throw new Error(result.error);
    }

    const markdown = result.markdown ?? "";
    console.log(markdown.slice(0, 500));
  } catch (error: unknown) {
    console.error("[testFirecrawl]", error);
    process.exitCode = 1;
  }
}

void main();
