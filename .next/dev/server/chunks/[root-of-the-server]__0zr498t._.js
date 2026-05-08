module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Flight-app/flight-finder/src/lib/hubs.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FULL_HUBS",
    ()=>FULL_HUBS,
    "MVP_HUBS",
    ()=>MVP_HUBS,
    "getHubs",
    ()=>getHubs
]);
const MVP_HUBS = [
    {
        origin: "LHR",
        originCity: "London",
        originContinent: "Europe"
    },
    {
        origin: "CDG",
        originCity: "Paris",
        originContinent: "Europe"
    },
    {
        origin: "AMS",
        originCity: "Amsterdam",
        originContinent: "Europe"
    },
    {
        origin: "FCO",
        originCity: "Rome",
        originContinent: "Europe"
    },
    {
        origin: "MAD",
        originCity: "Madrid",
        originContinent: "Europe"
    },
    {
        origin: "LIS",
        originCity: "Lisbon",
        originContinent: "Europe"
    },
    {
        origin: "BCN",
        originCity: "Barcelona",
        originContinent: "Europe"
    },
    {
        origin: "DUB",
        originCity: "Dublin",
        originContinent: "Europe"
    },
    {
        origin: "VIE",
        originCity: "Vienna",
        originContinent: "Europe"
    },
    {
        origin: "ZRH",
        originCity: "Zurich",
        originContinent: "Europe"
    },
    {
        origin: "CPH",
        originCity: "Copenhagen",
        originContinent: "Europe"
    },
    {
        origin: "ARN",
        originCity: "Stockholm",
        originContinent: "Europe"
    },
    {
        origin: "HEL",
        originCity: "Helsinki",
        originContinent: "Europe"
    },
    {
        origin: "WAW",
        originCity: "Warsaw",
        originContinent: "Europe"
    },
    {
        origin: "PRG",
        originCity: "Prague",
        originContinent: "Europe"
    },
    {
        origin: "BUD",
        originCity: "Budapest",
        originContinent: "Europe"
    },
    {
        origin: "ATH",
        originCity: "Athens",
        originContinent: "Europe"
    },
    {
        origin: "IST",
        originCity: "Istanbul",
        originContinent: "Europe"
    }
];
const FULL_HUBS = MVP_HUBS;
function getHubs() {
    return process.env.DEALS_PHASE === "mvp" ? MVP_HUBS : FULL_HUBS;
}
}),
"[project]/Flight-app/flight-finder/src/lib/deals/fetchFares.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchDealSurfFaresForHubs",
    ()=>fetchDealSurfFaresForHubs,
    "fetchFaresForHubs",
    ()=>fetchFaresForHubs
]);
function normalizeSearchResponse(data) {
    if (Array.isArray(data)) return data;
    return Array.isArray(data.results) ? data.results : [];
}
function formatIsoDate(date) {
    return date.toISOString().slice(0, 10);
}
/** Keep one row per origin→destination IATA code: lowest price (ties → earlier outbound date). */ function collapseCheapestPerDestination(fares) {
    const byRoute = new Map();
    for (const fare of fares){
        const dest = fare.destination.trim().toUpperCase();
        const key = `${fare.hub.origin}|${dest}`;
        const prev = byRoute.get(key);
        if (!prev) {
            byRoute.set(key, fare);
            continue;
        }
        if (fare.price < prev.price) {
            byRoute.set(key, fare);
            continue;
        }
        if (fare.price === prev.price && fare.departureDate < prev.departureDate) {
            byRoute.set(key, fare);
        }
    }
    return [
        ...byRoute.values()
    ];
}
async function fetchDealSurfFaresForHubs(hubs, referenceDate) {
    const waves = [
        {
            depPlusDays: 37,
            tripDays: 4
        },
        {
            depPlusDays: 75,
            tripDays: 7
        },
        {
            depPlusDays: 120,
            tripDays: 14
        }
    ];
    const batches = await Promise.all(waves.map(({ depPlusDays, tripDays })=>{
        const departure = new Date(referenceDate);
        departure.setDate(departure.getDate() + depPlusDays);
        const returning = new Date(departure);
        returning.setDate(returning.getDate() + tripDays);
        return fetchFaresForHubs(hubs, formatIsoDate(departure), formatIsoDate(returning));
    }));
    return collapseCheapestPerDestination(batches.flat());
}
async function fetchFaresForHubs(hubs, departureDate, returnDate) {
    const baseUrl = ("TURBOPACK compile-time value", "http://localhost:3001") || "http://localhost:3001";
    const results = await Promise.allSettled(hubs.map(async (hub)=>{
        try {
            // Flexible dates ±5d around anchor so search explores nearby departures; returns cheapest per destination below.
            const response = await fetch(`${baseUrl}/api/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    origin: hub.origin,
                    departureDate,
                    returnDate,
                    tripType: "round-trip",
                    flexibleDates: true,
                    dateFlexDays: 5
                })
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch fares (${response.status})`);
            }
            const data = await response.json();
            const searchResults = normalizeSearchResponse(data);
            const mapped = searchResults.map((result)=>({
                    hub,
                    destination: result.airportCode,
                    destinationCity: result.destination,
                    destinationContinent: result.continent?.trim() ?? "",
                    price: result.price,
                    airline: result.airline,
                    stops: result.stops,
                    departureDate: result.departureDate,
                    returnDate: result.returnDate ?? ""
                }));
            return collapseCheapestPerDestination(mapped);
        } catch (error) {
            console.error(`[fetchFares] Failed for origin: ${hub.origin}`, error);
            throw error;
        }
    }));
    const allFares = [];
    for (const result of results){
        if (result.status === "fulfilled") {
            allFares.push(...result.value);
        }
    }
    return allFares;
}
}),
"[project]/Flight-app/flight-finder/src/lib/dealScore.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scoreFare",
    ()=>scoreFare
]);
function scoreFare(price, airportCode, history) {
    const normalizedAirportCode = airportCode.trim().toUpperCase();
    const routeHistory = history.filter((record)=>record.airportCode.trim().toUpperCase() === normalizedAirportCode);
    if (routeHistory.length === 0) {
        return {
            score: 0,
            isGenuineDeal: false,
            dominantSignal: "none",
            label: "Insufficient data",
            conservativeMode: true
        };
    }
    const nonSeedCount = routeHistory.filter((record)=>record.source !== "seed").length;
    const conservativeMode = nonSeedCount < 7;
    const baselinePrice = routeHistory.reduce((sum, record)=>sum + record.price, 0) / routeHistory.length;
    if (!Number.isFinite(baselinePrice) || baselinePrice <= 0) {
        return {
            score: 0,
            isGenuineDeal: false,
            dominantSignal: "none",
            label: "Insufficient data",
            conservativeMode
        };
    }
    const priceDelta = (baselinePrice - price) / baselinePrice;
    const threshold = conservativeMode ? 0.05 : 0.05;
    let score = 0;
    if (priceDelta >= threshold) {
        const maxDelta = 0.5;
        const normalizedProgress = Math.min((priceDelta - threshold) / (maxDelta - threshold), 1);
        score = Math.round(65 + normalizedProgress * 35);
    }
    const dominantSignal = score > 0 ? "historical_delta" : "none";
    const label = score > 0 ? `Usually $${Math.round(baselinePrice)} — currently $${Math.round(price)}${conservativeMode ? " (early data — treat as indicative)" : ""}` : "Not a deal at current pricing";
    return {
        score,
        isGenuineDeal: score >= 65,
        dominantSignal,
        label,
        conservativeMode
    };
}
}),
"[project]/Flight-app/flight-finder/src/lib/deals/scoreAndFilter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scoreAndFilter",
    ()=>scoreAndFilter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$dealScore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/lib/dealScore.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
;
const MAX_DEALS_PER_ORIGIN = 5;
function finalizeDealsForOrigin(deals) {
    const nonstop = deals.filter((d)=>d.hubFare.stops === 0).sort((a, b)=>a.hubFare.price - b.hubFare.price);
    const connecting = deals.filter((d)=>d.hubFare.stops !== 0).sort((a, b)=>a.hubFare.price - b.hubFare.price);
    const ordered = [
        ...nonstop,
        ...connecting
    ].slice(0, MAX_DEALS_PER_ORIGIN);
    return ordered.map((d)=>({
            hubFare: d.hubFare,
            scoreResult: d.scoreResult,
            isFeatured: d.hubFare.stops === 0 && d.hubFare.price < 150,
            rssConfirmed: false
        }));
}
async function scoreAndFilter(hubFares) {
    if (hubFares.length === 0) return {};
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
        console.error("Supabase env vars are missing: SUPABASE_URL and SUPABASE_ANON_KEY");
        return {};
    }
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
    const airportCodes = [
        ...new Set(hubFares.map((fare)=>fare.destination.toUpperCase()))
    ];
    const { data, error } = await supabase.from("fare_history").select("airport_code, price, source, recorded_at").in("airport_code", airportCodes);
    if (error) {
        console.error("Failed to fetch fare history:", error);
        return {};
    }
    const rows = Array.isArray(data) ? data : [];
    const history = rows.map((row)=>({
            airportCode: row.airport_code,
            price: row.price,
            source: row.source,
            recordedAt: row.recorded_at
        }));
    const pendingByOrigin = {};
    for (const hubFare of hubFares){
        const scoreResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$dealScore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scoreFare"])(hubFare.price, hubFare.destination, history);
        if (!scoreResult.isGenuineDeal) continue;
        const origin = hubFare.hub.origin;
        const pending = {
            hubFare,
            scoreResult
        };
        const existing = pendingByOrigin[origin];
        if (existing) {
            existing.push(pending);
        } else {
            pendingByOrigin[origin] = [
                pending
            ];
        }
    }
    const dealsByOrigin = {};
    for (const [origin, pendingList] of Object.entries(pendingByOrigin)){
        const finalized = finalizeDealsForOrigin(pendingList);
        if (finalized.length > 0) {
            dealsByOrigin[origin] = finalized;
        }
    }
    return dealsByOrigin;
}
}),
"[project]/Flight-app/flight-finder/src/lib/deals/deduplicate.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deduplicateDeals",
    ()=>deduplicateDeals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
async function deduplicateDeals(deals) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Dedup skipped: missing SUPABASE_URL or SUPABASE_ANON_KEY");
        return deals;
    }
    const airportCodes = Object.values(deals).flatMap((originDeals)=>originDeals.map((deal)=>deal.hubFare.destination.trim().toUpperCase())).filter((code)=>code.length > 0);
    if (airportCodes.length === 0) return deals;
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
    const cutoffIso = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase.from("dedup_index").select("airport_code, last_surfaced_at").in("airport_code", airportCodes).gte("last_surfaced_at", cutoffIso);
    if (error) {
        console.error("Dedup query failed:", error);
        return deals;
    }
    const recentRows = Array.isArray(data) ? data : [];
    const recentCodes = new Set(recentRows.map((row)=>row.airport_code.trim().toUpperCase()));
    const filtered = {};
    for (const [origin, originDeals] of Object.entries(deals)){
        const keptDeals = originDeals.filter((deal)=>{
            const airportCode = deal.hubFare.destination.trim().toUpperCase();
            return !recentCodes.has(airportCode);
        });
        if (keptDeals.length > 0) {
            filtered[origin] = keptDeals;
        }
    }
    return filtered;
}
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[project]/Flight-app/flight-finder/src/lib/deals/validateWithRSS.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validateWithRSS",
    ()=>validateWithRSS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$rss$2d$parser$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/rss-parser/index.js [app-route] (ecmascript)");
;
const RSS_FEED_URLS = [
    "https://www.secretflying.com/feed/",
    "https://theflightdeal.com/feed/",
    "https://www.airfarewatchdog.com/blog/feed/"
];
async function fetchFeedStrings(url) {
    try {
        const parser = new __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$rss$2d$parser$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]();
        const feed = await parser.parseURL(url);
        const strings = [];
        for (const item of feed.items){
            if (typeof item.title === "string" && item.title.trim() !== "") {
                strings.push(item.title);
            }
            const description = typeof item.contentSnippet === "string" && item.contentSnippet.trim() !== "" ? item.contentSnippet : typeof item.content === "string" && item.content.trim() !== "" ? item.content : typeof item.summary === "string" ? item.summary : "";
            if (description.trim() !== "") {
                strings.push(description);
            }
        }
        return strings;
    } catch (error) {
        console.error("[validateWithRSS] RSS fetch/parse failed:", url, error);
        return [];
    }
}
function rssMatchesDeal(combinedLower, deal) {
    const destCode = deal.hubFare.destination.trim();
    const destCity = deal.hubFare.destinationCity.trim();
    const originCity = deal.hubFare.hub.originCity.trim();
    const needles = [
        destCode,
        destCity,
        originCity
    ].filter((s)=>s.length > 0);
    for (const needle of needles){
        if (combinedLower.includes(needle.toLowerCase())) {
            return true;
        }
    }
    return false;
}
async function validateWithRSS(deals) {
    const results = await Promise.allSettled(RSS_FEED_URLS.map((url)=>fetchFeedStrings(url)));
    const combinedChunks = [];
    for(let i = 0; i < results.length; i++){
        const settled = results[i];
        if (settled.status === "fulfilled") {
            combinedChunks.push(...settled.value);
        } else {
            console.error("[validateWithRSS] Feed promise rejected:", RSS_FEED_URLS[i], settled.reason);
        }
    }
    const combinedLower = combinedChunks.join(" ").toLowerCase();
    const updated = {};
    for (const [origin, originDeals] of Object.entries(deals)){
        updated[origin] = originDeals.map((deal)=>({
                ...deal,
                rssConfirmed: rssMatchesDeal(combinedLower, deal)
            }));
    }
    return updated;
}
}),
"[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DealsDigest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$body$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/@react-email/body/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$container$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/@react-email/container/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$head$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/@react-email/head/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$html$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/@react-email/html/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$preview$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/@react-email/preview/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$section$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/@react-email/section/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/@react-email/text/dist/index.mjs [app-route] (ecmascript)");
;
;
function isEuropeContinent(label) {
    return label.trim().toLowerCase() === "europe";
}
function selectTopDealsToday(allDeals) {
    return [
        ...allDeals
    ].filter((d)=>d.hubFare.stops === 0 && d.scoreResult.score >= 75).sort((a, b)=>a.hubFare.price - b.hubFare.price).slice(0, 5);
}
function selectIntraEuropeTop(allDeals) {
    return [
        ...allDeals
    ].filter((d)=>isEuropeContinent(d.hubFare.hub.originContinent) && isEuropeContinent(d.hubFare.destinationContinent)).sort((a, b)=>a.hubFare.price - b.hubFare.price).slice(0, 10);
}
function selectOutsideEuropeTop(allDeals) {
    return [
        ...allDeals
    ].filter((d)=>isEuropeContinent(d.hubFare.hub.originContinent) && d.hubFare.destinationContinent.trim() !== "" && !isEuropeContinent(d.hubFare.destinationContinent)).sort((a, b)=>a.hubFare.price - b.hubFare.price).slice(0, 10);
}
function DigestDealCard({ deal, index }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$section$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Section"], {
        style: {
            borderLeft: "3px solid #4ade80",
            paddingLeft: "12px",
            marginTop: index === 0 ? "0" : "14px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                style: {
                    margin: "0 0 6px 0",
                    color: "#ffffff",
                    fontSize: "24px",
                    fontWeight: "700"
                },
                children: `${deal.hubFare.hub.originCity} → ${deal.hubFare.destinationCity} — $${Math.round(deal.hubFare.price)}`
            }, void 0, false, {
                fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                style: {
                    margin: "0 0 4px 0",
                    color: "#888",
                    fontSize: "12px",
                    letterSpacing: "0.02em"
                },
                children: [
                    "Airport codes ",
                    deal.hubFare.hub.origin,
                    " → ",
                    deal.hubFare.destination
                ]
            }, void 0, true, {
                fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                style: {
                    margin: "0 0 8px 0",
                    color: "#aaa",
                    fontSize: "14px"
                },
                children: deal.hubFare.airline
            }, void 0, false, {
                fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                style: {
                    margin: "0 0 10px 0",
                    color: "#aaa",
                    fontSize: "13px"
                },
                children: [
                    deal.hubFare.departureDate,
                    " to ",
                    deal.hubFare.returnDate
                ]
            }, void 0, true, {
                fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                style: {
                    margin: "0 0 8px 0",
                    lineHeight: "1.5"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: "inline-block",
                            backgroundColor: "#1a1a1a",
                            color: "#4ade80",
                            padding: "4px 10px",
                            borderRadius: "4px",
                            fontSize: "12px"
                        },
                        children: [
                            "Deal Score: ",
                            deal.scoreResult.score,
                            "/100"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    deal.rssConfirmed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: "inline-block",
                            marginLeft: "8px",
                            padding: "2px 6px",
                            fontSize: "9px",
                            fontWeight: "600",
                            letterSpacing: "0.02em",
                            color: "#86efac",
                            backgroundColor: "#1a1a1a",
                            borderRadius: "3px",
                            border: "1px solid #166534",
                            verticalAlign: "middle"
                        },
                        children: "✓ Confirmed deal"
                    }, void 0, false, {
                        fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                style: {
                    margin: "12px 0 0 0",
                    color: "#e8e4dc",
                    fontSize: "14px",
                    fontStyle: "italic"
                },
                children: deal.scoreResult.label
            }, void 0, false, {
                fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
function HighlightSection({ title, subtitle, deals, cardKeyPrefix }) {
    if (deals.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$section$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Section"], {
        style: {
            backgroundColor: "#111111",
            borderRadius: "8px",
            padding: "16px",
            margin: "0 0 24px 0"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                style: {
                    margin: "0 0 8px 0",
                    color: "#4ade80",
                    fontSize: "24px",
                    fontWeight: "700"
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                style: {
                    margin: "0 0 16px 0",
                    fontSize: "13px",
                    color: "#888"
                },
                children: subtitle
            }, void 0, false, {
                fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            deals.map((deal, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(DigestDealCard, {
                    deal: deal,
                    index: index
                }, `${cardKeyPrefix}-${deal.hubFare.hub.origin}-${deal.hubFare.destination}-${deal.hubFare.departureDate}-${index}`, false, {
                    fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
function DealsDigest({ deals, generatedAt }) {
    const flatDeals = Object.values(deals).flat();
    const topDealsToday = selectTopDealsToday(flatDeals);
    const intraEuropeDeals = selectIntraEuropeTop(flatDeals);
    const outsideEuropeDeals = selectOutsideEuropeTop(flatDeals);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$html$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Html"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$head$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Head"], {}, void 0, false, {
                fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$preview$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Preview"], {
                children: "Best Escapes This Week"
            }, void 0, false, {
                fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$body$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Body"], {
                style: {
                    backgroundColor: "#0a0a0a",
                    margin: "0",
                    padding: "40px",
                    color: "#e8e4dc",
                    fontFamily: "Arial, sans-serif"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$container$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Container"], {
                    style: {
                        maxWidth: "640px",
                        margin: "0 auto",
                        backgroundColor: "#0a0a0a"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                            style: {
                                margin: "0 0 8px 0",
                                color: "#4ade80",
                                fontSize: "28px",
                                fontWeight: "700"
                            },
                            children: "✈ Best Escapes This Week"
                        }, void 0, false, {
                            fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                            style: {
                                margin: "0 0 24px 0",
                                fontSize: "14px",
                                color: "#888"
                            },
                            children: [
                                "Surfaced automatically from major European hubs · ",
                                generatedAt
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this),
                        topDealsToday.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$section$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Section"], {
                            style: {
                                backgroundColor: "#111111",
                                borderRadius: "8px",
                                padding: "16px",
                                margin: "0 0 24px 0"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                                    style: {
                                        margin: "0 0 8px 0",
                                        color: "#4ade80",
                                        fontSize: "24px",
                                        fontWeight: "700"
                                    },
                                    children: "🔥 Top Deals Today"
                                }, void 0, false, {
                                    fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                                    lineNumber: 259,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                                    style: {
                                        margin: "0 0 16px 0",
                                        fontSize: "13px",
                                        color: "#888"
                                    },
                                    children: "Best nonstop fares across all European hubs right now"
                                }, void 0, false, {
                                    fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this),
                                topDealsToday.map((deal, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(DigestDealCard, {
                                        deal: deal,
                                        index: index
                                    }, `top-${deal.hubFare.hub.origin}-${deal.hubFare.destination}-${deal.hubFare.departureDate}-${index}`, false, {
                                        fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                                        lineNumber: 280,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                            lineNumber: 251,
                            columnNumber: 13
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$section$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Section"], {
                            style: {
                                margin: "8px 0 24px 0",
                                borderTop: "1px solid #222"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                            lineNumber: 289,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(HighlightSection, {
                            title: "Within Europe",
                            subtitle: "Top 10 genuine deals flying between European hubs (by price)",
                            deals: intraEuropeDeals,
                            cardKeyPrefix: "intra"
                        }, void 0, false, {
                            fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                            lineNumber: 291,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(HighlightSection, {
                            title: "Beyond Europe",
                            subtitle: "Top 10 genuine long-haul picks from European hubs (by price)",
                            deals: outsideEuropeDeals,
                            cardKeyPrefix: "outside"
                        }, void 0, false, {
                            fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                            lineNumber: 298,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"], {
                            style: {
                                margin: "40px 0 0 0",
                                fontSize: "12px",
                                color: "#444"
                            },
                            children: "Flight Deal Alerts · Built by Sam"
                        }, void 0, false, {
                            fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                            lineNumber: 305,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx",
        lineNumber: 211,
        columnNumber: 5
    }, this);
}
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/Flight-app/flight-finder/src/lib/deals/sendDigest.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "sendDigest",
    ()=>sendDigest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/resend/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$emails$2f$DealsDigest$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/emails/DealsDigest.tsx [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$components$2f$node_modules$2f40$react$2d$email$2f$render$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/@react-email/components/node_modules/@react-email/render/dist/node/index.mjs [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$components$2f$node_modules$2f40$react$2d$email$2f$render$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$components$2f$node_modules$2f40$react$2d$email$2f$render$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function formatGeneratedAt(date) {
    const datePart = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "Europe/Paris"
    }).format(date);
    const timeParts = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Europe/Paris",
        timeZoneName: "short"
    }).formatToParts(date);
    const hour = timeParts.find((part)=>part.type === "hour")?.value ?? "";
    const minute = timeParts.find((part)=>part.type === "minute")?.value ?? "00";
    const dayPeriodRaw = timeParts.find((part)=>part.type === "dayPeriod")?.value ?? "";
    const zone = timeParts.find((part)=>part.type === "timeZoneName")?.value ?? "";
    const dayPeriod = dayPeriodRaw.toLowerCase();
    return `${datePart} · ${hour}:${minute}${dayPeriod} ${zone}`;
}
async function sendDigest(deals) {
    if (!process.env.RESEND_API_KEY) {
        console.log("[sendDigest] Missing RESEND_API_KEY");
        return;
    }
    if (Object.keys(deals).length === 0) {
        console.log("[sendDigest] No deals to send");
        return;
    }
    try {
        const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
        const generatedAt = formatGeneratedAt(new Date());
        const html = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f40$react$2d$email$2f$components$2f$node_modules$2f40$react$2d$email$2f$render$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["render"])(/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$emails$2f$DealsDigest$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], {
            deals,
            generatedAt
        }));
        await resend.emails.send({
            from: "Flight Deals <onboarding@resend.dev>",
            to: process.env.DEALS_DIGEST_EMAIL ?? "",
            subject: `✈ Best Escapes This Week — ${Object.keys(deals).length} deals found`,
            html
        });
        console.log("[sendDigest] Email sent successfully");
    } catch (error) {
        console.error("[sendDigest] Failed to send:", error);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Flight-app/flight-finder/src/app/api/deals/test/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$hubs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/lib/hubs.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$fetchFares$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/lib/deals/fetchFares.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$scoreAndFilter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/lib/deals/scoreAndFilter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$deduplicate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/lib/deals/deduplicate.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$validateWithRSS$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/lib/deals/validateWithRSS.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$sendDigest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/lib/deals/sendDigest.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$sendDigest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$sendDigest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
async function GET() {
    const today = new Date();
    const hubs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$hubs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHubs"])();
    const hubFares = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$fetchFares$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchDealSurfFaresForHubs"])(hubs, today);
    const deals = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$scoreAndFilter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scoreAndFilter"])(hubFares);
    let deduplicatedDeals = deals;
    try {
        deduplicatedDeals = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$deduplicate$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deduplicateDeals"])(deals);
    } catch (error) {
        console.error("[test] Failed to deduplicate deals:", error);
    }
    let rssValidatedDeals = deduplicatedDeals;
    try {
        rssValidatedDeals = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$validateWithRSS$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateWithRSS"])(deduplicatedDeals);
    } catch (error) {
        console.error("[test] Failed to validate deals with RSS:", error);
    }
    console.log("[test] Calling sendDigest with deals:" + JSON.stringify(rssValidatedDeals));
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$sendDigest$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendDigest"])(rssValidatedDeals);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        hubs,
        fares: hubFares,
        deals: rssValidatedDeals
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0zr498t._.js.map