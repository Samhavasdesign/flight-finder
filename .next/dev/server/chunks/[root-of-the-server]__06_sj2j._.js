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
        origin: "MIA",
        destination: "LIS",
        continent: "Europe"
    },
    {
        origin: "MIA",
        destination: "MAD",
        continent: "Europe"
    },
    {
        origin: "MIA",
        destination: "LHR",
        continent: "Europe"
    },
    {
        origin: "MIA",
        destination: "EZE",
        continent: "South America"
    },
    {
        origin: "MIA",
        destination: "BOG",
        continent: "South America"
    },
    {
        origin: "MIA",
        destination: "GRU",
        continent: "South America"
    },
    {
        origin: "MIA",
        destination: "BKK",
        continent: "Asia"
    },
    {
        origin: "MIA",
        destination: "KUL",
        continent: "Asia"
    },
    {
        origin: "MIA",
        destination: "NRT",
        continent: "Asia"
    }
];
const FULL_HUBS = [
    ...MVP_HUBS,
    {
        origin: "MIA",
        destination: "DXB",
        continent: "Middle East"
    },
    {
        origin: "MIA",
        destination: "DOH",
        continent: "Middle East"
    },
    {
        origin: "MIA",
        destination: "IST",
        continent: "Middle East"
    },
    {
        origin: "MIA",
        destination: "AUH",
        continent: "Middle East"
    },
    {
        origin: "MIA",
        destination: "NBO",
        continent: "Africa"
    },
    {
        origin: "MIA",
        destination: "JNB",
        continent: "Africa"
    },
    {
        origin: "MIA",
        destination: "CMN",
        continent: "Africa"
    },
    {
        origin: "MIA",
        destination: "ADD",
        continent: "Africa"
    },
    {
        origin: "MIA",
        destination: "SYD",
        continent: "Oceania"
    },
    {
        origin: "MIA",
        destination: "AKL",
        continent: "Oceania"
    },
    {
        origin: "MIA",
        destination: "MEL",
        continent: "Oceania"
    },
    {
        origin: "MIA",
        destination: "BNE",
        continent: "Oceania"
    }
];
function getHubs() {
    return process.env.DEALS_PHASE === "mvp" ? MVP_HUBS : FULL_HUBS;
}
}),
"[project]/Flight-app/flight-finder/src/lib/deals/fetchFares.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchFaresForHubs",
    ()=>fetchFaresForHubs
]);
function isRecord(value) {
    return typeof value === "object" && value !== null;
}
function readString(obj, key) {
    const value = obj[key];
    return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}
function extractHubDestinationCode(hub) {
    if (!isRecord(hub)) return null;
    const directKeys = [
        "destination",
        "destinationCode",
        "airportCode",
        "code"
    ];
    for (const key of directKeys){
        const code = readString(hub, key);
        if (code) return code.toUpperCase();
    }
    const destination = hub["destination"];
    if (isRecord(destination)) {
        const nestedCode = readString(destination, "code");
        if (nestedCode) return nestedCode.toUpperCase();
    }
    return null;
}
function normalizeSearchResponse(data) {
    if (Array.isArray(data)) return data;
    return Array.isArray(data.results) ? data.results : [];
}
async function fetchFaresForHubs(hubs, departureDate, returnDate) {
    try {
        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:3001") || "http://localhost:3001";
        const response = await fetch(`${baseUrl}/api/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                origin: "MIA",
                departureDate,
                returnDate,
                tripType: "round-trip"
            })
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch fares (${response.status})`);
        }
        const data = await response.json();
        const results = normalizeSearchResponse(data);
        const faresByAirport = new Map();
        for (const result of results){
            const code = result.airportCode.trim().toUpperCase();
            const current = faresByAirport.get(code);
            if (!current || result.price < current.price) {
                faresByAirport.set(code, result);
            }
        }
        const hubFares = [];
        for (const hub of hubs){
            const destinationCode = extractHubDestinationCode(hub);
            if (!destinationCode) continue;
            const match = faresByAirport.get(destinationCode);
            if (!match) continue;
            if (!match.returnDate) continue;
            hubFares.push({
                hub,
                price: match.price,
                airline: match.airline,
                stops: match.stops,
                departureDate: match.departureDate,
                returnDate: match.returnDate
            });
        }
        return hubFares;
    } catch (error) {
        console.error("Failed to fetch fares for hubs:", error);
        return [];
    }
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
    const threshold = conservativeMode ? 0.35 : 0.25;
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
        ...new Set(hubFares.map((fare)=>fare.hub.destination.toUpperCase()))
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
    const dealsByContinent = {};
    for (const hubFare of hubFares){
        const scoreResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$dealScore$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scoreFare"])(hubFare.price, hubFare.hub.destination, history);
        if (!scoreResult.isGenuineDeal) continue;
        const continent = hubFare.hub.continent;
        const existing = dealsByContinent[continent];
        if (!existing || scoreResult.score > existing.scoreResult.score) {
            dealsByContinent[continent] = {
                hubFare,
                scoreResult
            };
        }
    }
    return dealsByContinent;
}
}),
"[project]/Flight-app/flight-finder/src/app/api/deals/test/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$hubs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/lib/hubs.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$fetchFares$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/lib/deals/fetchFares.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$scoreAndFilter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/lib/deals/scoreAndFilter.ts [app-route] (ecmascript)");
;
;
;
;
function formatIsoDate(date) {
    return date.toISOString().slice(0, 10);
}
async function GET() {
    const today = new Date();
    const departure = new Date(today);
    departure.setDate(departure.getDate() + 21);
    const returning = new Date(departure);
    returning.setDate(returning.getDate() + 10);
    const departureDate = formatIsoDate(departure);
    const returnDate = formatIsoDate(returning);
    const hubs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$hubs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHubs"])();
    const hubFares = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$fetchFares$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchFaresForHubs"])(hubs, departureDate, returnDate);
    const deals = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$deals$2f$scoreAndFilter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["scoreAndFilter"])(hubFares);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        hubs,
        fares: hubFares,
        deals
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06_sj2j._.js.map