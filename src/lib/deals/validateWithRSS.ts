import Parser from "rss-parser";
import type { DealsByOrigin, ScoredDeal } from "@/lib/deals/scoreAndFilter";

const RSS_FEED_URLS = [
  "https://www.secretflying.com/feed/",
  "https://theflightdeal.com/feed/",
  "https://www.airfarewatchdog.com/blog/feed/",
] as const;

async function fetchFeedStrings(url: string): Promise<string[]> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(url);
    const strings: string[] = [];
    for (const item of feed.items) {
      if (typeof item.title === "string" && item.title.trim() !== "") {
        strings.push(item.title);
      }
      const description =
        typeof item.contentSnippet === "string" && item.contentSnippet.trim() !== ""
          ? item.contentSnippet
          : typeof item.content === "string" && item.content.trim() !== ""
            ? item.content
            : typeof item.summary === "string"
              ? item.summary
              : "";
      if (description.trim() !== "") {
        strings.push(description);
      }
    }
    return strings;
  } catch (error: unknown) {
    console.error("[validateWithRSS] RSS fetch/parse failed:", url, error);
    return [];
  }
}

function rssMatchesDeal(combinedLower: string, deal: ScoredDeal): boolean {
  const destCode = deal.hubFare.destination.trim();
  const destCity = deal.hubFare.destinationCity.trim();
  const originCity = deal.hubFare.hub.originCity.trim();

  const needles = [destCode, destCity, originCity].filter((s) => s.length > 0);
  for (const needle of needles) {
    if (combinedLower.includes(needle.toLowerCase())) {
      return true;
    }
  }
  return false;
}

export async function validateWithRSS(deals: DealsByOrigin): Promise<DealsByOrigin> {
  const results = await Promise.allSettled(RSS_FEED_URLS.map((url) => fetchFeedStrings(url)));

  const combinedChunks: string[] = [];
  for (let i = 0; i < results.length; i++) {
    const settled = results[i];
    if (settled.status === "fulfilled") {
      combinedChunks.push(...settled.value);
    } else {
      console.error("[validateWithRSS] Feed promise rejected:", RSS_FEED_URLS[i], settled.reason);
    }
  }

  const combinedLower = combinedChunks.join(" ").toLowerCase();

  const updated: DealsByOrigin = {};
  for (const [origin, originDeals] of Object.entries(deals)) {
    updated[origin] = originDeals.map((deal) => ({
      ...deal,
      rssConfirmed: rssMatchesDeal(combinedLower, deal),
    }));
  }

  return updated;
}
