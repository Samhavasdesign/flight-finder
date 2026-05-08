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
"[project]/Flight-app/flight-finder/src/lib/asyncPool.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Run async work with limited concurrency (no extra dependencies). */ __turbopack_context__.s([
    "asyncPool",
    ()=>asyncPool
]);
async function asyncPool(items, concurrency, iterator) {
    const results = new Array(items.length);
    let nextIndex = 0;
    async function worker() {
        while(true){
            const i = nextIndex++;
            if (i >= items.length) return;
            results[i] = await iterator(items[i], i);
        }
    }
    const n = Math.max(1, Math.min(concurrency, items.length));
    await Promise.all(Array.from({
        length: n
    }, ()=>worker()));
    return results;
}
}),
"[project]/Flight-app/flight-finder/src/data/airports.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "airports",
    ()=>airports
]);
const airports = [
    // ── South Africa ──────────────────────────────────────────────────────────
    {
        code: "CPT",
        name: "Cape Town International",
        city: "Cape Town",
        country: "South Africa"
    },
    {
        code: "JNB",
        name: "O. R. Tambo International",
        city: "Johannesburg",
        country: "South Africa"
    },
    {
        code: "DUR",
        name: "King Shaka International",
        city: "Durban",
        country: "South Africa"
    },
    {
        code: "GRJ",
        name: "George Airport",
        city: "George",
        country: "South Africa"
    },
    {
        code: "BFN",
        name: "Bram Fischer International",
        city: "Bloemfontein",
        country: "South Africa"
    },
    {
        code: "PLZ",
        name: "Chief Dawid Stuurman International",
        city: "Gqeberha",
        country: "South Africa"
    },
    {
        code: "ELS",
        name: "King Phalo Airport",
        city: "East London",
        country: "South Africa"
    },
    {
        code: "HLA",
        name: "Lanseria International",
        city: "Johannesburg",
        country: "South Africa"
    },
    {
        code: "MQP",
        name: "Kruger Mpumalanga International",
        city: "Nelspruit",
        country: "South Africa"
    },
    {
        code: "UTN",
        name: "Pierre Van Ryneveld Airport",
        city: "Upington",
        country: "South Africa"
    },
    // ── North Africa ──────────────────────────────────────────────────────────
    {
        code: "CAI",
        name: "Cairo International",
        city: "Cairo",
        country: "Egypt"
    },
    {
        code: "HBE",
        name: "Borg El Arab International",
        city: "Alexandria",
        country: "Egypt"
    },
    {
        code: "HRG",
        name: "Hurghada International",
        city: "Hurghada",
        country: "Egypt"
    },
    {
        code: "SSH",
        name: "Sharm el-Sheikh International",
        city: "Sharm el-Sheikh",
        country: "Egypt"
    },
    {
        code: "LXR",
        name: "Luxor International",
        city: "Luxor",
        country: "Egypt"
    },
    {
        code: "ASW",
        name: "Aswan International",
        city: "Aswan",
        country: "Egypt"
    },
    {
        code: "CMN",
        name: "Mohammed V International",
        city: "Casablanca",
        country: "Morocco"
    },
    {
        code: "RAK",
        name: "Marrakech Menara",
        city: "Marrakech",
        country: "Morocco"
    },
    {
        code: "AGA",
        name: "Al Massira Airport",
        city: "Agadir",
        country: "Morocco"
    },
    {
        code: "FEZ",
        name: "Fès–Saïss Airport",
        city: "Fez",
        country: "Morocco"
    },
    {
        code: "TNG",
        name: "Ibn Batouta Airport",
        city: "Tangier",
        country: "Morocco"
    },
    {
        code: "OZZ",
        name: "Ouarzazate Airport",
        city: "Ouarzazate",
        country: "Morocco"
    },
    {
        code: "ALG",
        name: "Houari Boumediene Airport",
        city: "Algiers",
        country: "Algeria"
    },
    {
        code: "ORN",
        name: "Ahmed Ben Bella Airport",
        city: "Oran",
        country: "Algeria"
    },
    {
        code: "CZL",
        name: "Mohamed Boudiaf International",
        city: "Constantine",
        country: "Algeria"
    },
    {
        code: "TUN",
        name: "Tunis-Carthage International",
        city: "Tunis",
        country: "Tunisia"
    },
    {
        code: "SFA",
        name: "Sfax-Thyna Airport",
        city: "Sfax",
        country: "Tunisia"
    },
    {
        code: "MIR",
        name: "Habib Bourguiba International",
        city: "Monastir",
        country: "Tunisia"
    },
    {
        code: "TOE",
        name: "Tozeur-Nefta International",
        city: "Tozeur",
        country: "Tunisia"
    },
    {
        code: "MJI",
        name: "Mitiga International Airport",
        city: "Tripoli",
        country: "Libya"
    },
    {
        code: "KRT",
        name: "Khartoum International",
        city: "Khartoum",
        country: "Sudan"
    },
    {
        code: "NDB",
        name: "Nouadhibou International",
        city: "Nouadhibou",
        country: "Mauritania"
    },
    {
        code: "NKC",
        name: "Nouakchott-Oumtounsy International",
        city: "Nouakchott",
        country: "Mauritania"
    },
    {
        code: "SID",
        name: "Amílcar Cabral International",
        city: "Sal",
        country: "Cape Verde"
    },
    {
        code: "RAI",
        name: "Nelson Mandela International",
        city: "Praia",
        country: "Cape Verde"
    },
    // ── West Africa ───────────────────────────────────────────────────────────
    {
        code: "LOS",
        name: "Murtala Muhammed International",
        city: "Lagos",
        country: "Nigeria"
    },
    {
        code: "ABV",
        name: "Nnamdi Azikiwe International",
        city: "Abuja",
        country: "Nigeria"
    },
    {
        code: "KAN",
        name: "Mallam Aminu Kano International",
        city: "Kano",
        country: "Nigeria"
    },
    {
        code: "PHC",
        name: "Port Harcourt International",
        city: "Port Harcourt",
        country: "Nigeria"
    },
    {
        code: "ENU",
        name: "Akanu Ibiam International",
        city: "Enugu",
        country: "Nigeria"
    },
    {
        code: "ACC",
        name: "Kotoka International",
        city: "Accra",
        country: "Ghana"
    },
    {
        code: "KMS",
        name: "Kumasi Airport",
        city: "Kumasi",
        country: "Ghana"
    },
    {
        code: "ABJ",
        name: "Félix-Houphouët-Boigny International",
        city: "Abidjan",
        country: "Côte d'Ivoire"
    },
    {
        code: "BYK",
        name: "Bouaké Félix Houphouët-Boigny",
        city: "Bouaké",
        country: "Côte d'Ivoire"
    },
    {
        code: "DKR",
        name: "Blaise Diagne International",
        city: "Dakar",
        country: "Senegal"
    },
    {
        code: "ZIG",
        name: "Ziguinchor Airport",
        city: "Ziguinchor",
        country: "Senegal"
    },
    {
        code: "BKO",
        name: "Bamako–Sénou International",
        city: "Bamako",
        country: "Mali"
    },
    {
        code: "OUA",
        name: "Ouagadougou Airport",
        city: "Ouagadougou",
        country: "Burkina Faso"
    },
    {
        code: "BOY",
        name: "Bobo-Dioulasso Airport",
        city: "Bobo-Dioulasso",
        country: "Burkina Faso"
    },
    {
        code: "CKY",
        name: "Conakry International Airport",
        city: "Conakry",
        country: "Guinea"
    },
    {
        code: "FNA",
        name: "Lungi International Airport",
        city: "Freetown",
        country: "Sierra Leone"
    },
    {
        code: "ROB",
        name: "Roberts International Airport",
        city: "Monrovia",
        country: "Liberia"
    },
    {
        code: "BJL",
        name: "Banjul International Airport",
        city: "Banjul",
        country: "Gambia"
    },
    {
        code: "OXB",
        name: "Osvaldo Vieira International",
        city: "Bissau",
        country: "Guinea-Bissau"
    },
    {
        code: "LFW",
        name: "Lomé-Tokoin Airport",
        city: "Lomé",
        country: "Togo"
    },
    {
        code: "COO",
        name: "Cadjehoun Airport",
        city: "Cotonou",
        country: "Benin"
    },
    {
        code: "NIM",
        name: "Diori Hamani International",
        city: "Niamey",
        country: "Niger"
    },
    {
        code: "NDJ",
        name: "Hassan Djamous International",
        city: "N'Djamena",
        country: "Chad"
    },
    // ── Central Africa ────────────────────────────────────────────────────────
    {
        code: "DLA",
        name: "Douala International Airport",
        city: "Douala",
        country: "Cameroon"
    },
    {
        code: "NSI",
        name: "Yaoundé Nsimalen International",
        city: "Yaoundé",
        country: "Cameroon"
    },
    {
        code: "LBV",
        name: "Léon-Mba International Airport",
        city: "Libreville",
        country: "Gabon"
    },
    {
        code: "POG",
        name: "Port-Gentil Airport",
        city: "Port-Gentil",
        country: "Gabon"
    },
    {
        code: "BZV",
        name: "Maya-Maya Airport",
        city: "Brazzaville",
        country: "Republic of Congo"
    },
    {
        code: "FIH",
        name: "N'djili International Airport",
        city: "Kinshasa",
        country: "DR Congo"
    },
    {
        code: "FBM",
        name: "Lubumbashi International Airport",
        city: "Lubumbashi",
        country: "DR Congo"
    },
    {
        code: "LAD",
        name: "Quatro de Fevereiro Airport",
        city: "Luanda",
        country: "Angola"
    },
    {
        code: "VPY",
        name: "Chimoio Airport",
        city: "Chimoio",
        country: "Mozambique"
    },
    {
        code: "SSG",
        name: "Malabo International Airport",
        city: "Malabo",
        country: "Equatorial Guinea"
    },
    {
        code: "SXF",
        name: "São Tomé International Airport",
        city: "São Tomé",
        country: "São Tomé and Príncipe"
    },
    // ── East Africa ───────────────────────────────────────────────────────────
    {
        code: "NBO",
        name: "Jomo Kenyatta International",
        city: "Nairobi",
        country: "Kenya"
    },
    {
        code: "MBA",
        name: "Moi International Airport",
        city: "Mombasa",
        country: "Kenya"
    },
    {
        code: "KIS",
        name: "Kisumu International Airport",
        city: "Kisumu",
        country: "Kenya"
    },
    {
        code: "DAR",
        name: "Julius Nyerere International",
        city: "Dar es Salaam",
        country: "Tanzania"
    },
    {
        code: "ZNZ",
        name: "Abeid Amani Karume International",
        city: "Zanzibar",
        country: "Tanzania"
    },
    {
        code: "JRO",
        name: "Kilimanjaro International Airport",
        city: "Kilimanjaro",
        country: "Tanzania"
    },
    {
        code: "MWZ",
        name: "Mwanza Airport",
        city: "Mwanza",
        country: "Tanzania"
    },
    {
        code: "EBB",
        name: "Entebbe International Airport",
        city: "Entebbe",
        country: "Uganda"
    },
    {
        code: "KGL",
        name: "Kigali International Airport",
        city: "Kigali",
        country: "Rwanda"
    },
    {
        code: "BJM",
        name: "Bujumbura International Airport",
        city: "Bujumbura",
        country: "Burundi"
    },
    {
        code: "ADD",
        name: "Bole International Airport",
        city: "Addis Ababa",
        country: "Ethiopia"
    },
    {
        code: "DIR",
        name: "Aba Tenna D. Yilma International",
        city: "Dire Dawa",
        country: "Ethiopia"
    },
    {
        code: "MQX",
        name: "Alula Aba Nega Airport",
        city: "Mekele",
        country: "Ethiopia"
    },
    {
        code: "JIB",
        name: "Ambouli International Airport",
        city: "Djibouti",
        country: "Djibouti"
    },
    {
        code: "HGA",
        name: "Egal International Airport",
        city: "Hargeisa",
        country: "Somalia"
    },
    {
        code: "MGQ",
        name: "Aden Adde International Airport",
        city: "Mogadishu",
        country: "Somalia"
    },
    {
        code: "ASM",
        name: "Asmara International Airport",
        city: "Asmara",
        country: "Eritrea"
    },
    // ── Southern Africa ───────────────────────────────────────────────────────
    {
        code: "HRE",
        name: "Harare International Airport",
        city: "Harare",
        country: "Zimbabwe"
    },
    {
        code: "VFA",
        name: "Victoria Falls International",
        city: "Victoria Falls",
        country: "Zimbabwe"
    },
    {
        code: "BUQ",
        name: "Joshua Mqabuko Nkomo International",
        city: "Bulawayo",
        country: "Zimbabwe"
    },
    {
        code: "LUN",
        name: "Kenneth Kaunda International",
        city: "Lusaka",
        country: "Zambia"
    },
    {
        code: "LVI",
        name: "Harry Mwanga Nkumbula International",
        city: "Livingstone",
        country: "Zambia"
    },
    {
        code: "NLA",
        name: "Simon Mwansa Kapwepwe International",
        city: "Ndola",
        country: "Zambia"
    },
    {
        code: "LLW",
        name: "Lilongwe International Airport",
        city: "Lilongwe",
        country: "Malawi"
    },
    {
        code: "BLZ",
        name: "Chileka International Airport",
        city: "Blantyre",
        country: "Malawi"
    },
    {
        code: "MPM",
        name: "Maputo International Airport",
        city: "Maputo",
        country: "Mozambique"
    },
    {
        code: "BEW",
        name: "Beira International Airport",
        city: "Beira",
        country: "Mozambique"
    },
    {
        code: "WDH",
        name: "Hosea Kutako International",
        city: "Windhoek",
        country: "Namibia"
    },
    {
        code: "WVB",
        name: "Walvis Bay Airport",
        city: "Walvis Bay",
        country: "Namibia"
    },
    {
        code: "GBE",
        name: "Sir Seretse Khama International",
        city: "Gaborone",
        country: "Botswana"
    },
    {
        code: "MTS",
        name: "Matsapha International Airport",
        city: "Manzini",
        country: "Eswatini"
    },
    {
        code: "MSU",
        name: "Moshoeshoe I International",
        city: "Maseru",
        country: "Lesotho"
    },
    {
        code: "TNR",
        name: "Ivato International Airport",
        city: "Antananarivo",
        country: "Madagascar"
    },
    {
        code: "MJN",
        name: "Amborovy Airport",
        city: "Mahajanga",
        country: "Madagascar"
    },
    {
        code: "MRU",
        name: "Sir Seewoosagur Ramgoolam International",
        city: "Mauritius",
        country: "Mauritius"
    },
    {
        code: "SEZ",
        name: "Seychelles International Airport",
        city: "Mahé",
        country: "Seychelles"
    },
    {
        code: "RUN",
        name: "Roland Garros Airport",
        city: "Saint-Denis",
        country: "Réunion"
    },
    {
        code: "DZA",
        name: "Dzaoudzi-Pamandzi International",
        city: "Mamoudzou",
        country: "Mayotte"
    },
    // ── Europe – UK & Ireland ─────────────────────────────────────────────────
    {
        code: "LHR",
        name: "Heathrow",
        city: "London",
        country: "United Kingdom"
    },
    {
        code: "LGW",
        name: "Gatwick",
        city: "London",
        country: "United Kingdom"
    },
    {
        code: "STN",
        name: "Stansted",
        city: "London",
        country: "United Kingdom"
    },
    {
        code: "LTN",
        name: "Luton Airport",
        city: "London",
        country: "United Kingdom"
    },
    {
        code: "MAN",
        name: "Manchester Airport",
        city: "Manchester",
        country: "United Kingdom"
    },
    {
        code: "BHX",
        name: "Birmingham Airport",
        city: "Birmingham",
        country: "United Kingdom"
    },
    {
        code: "EDI",
        name: "Edinburgh Airport",
        city: "Edinburgh",
        country: "United Kingdom"
    },
    {
        code: "GLA",
        name: "Glasgow Airport",
        city: "Glasgow",
        country: "United Kingdom"
    },
    {
        code: "BFS",
        name: "Belfast International",
        city: "Belfast",
        country: "United Kingdom"
    },
    {
        code: "DUB",
        name: "Dublin Airport",
        city: "Dublin",
        country: "Ireland"
    },
    {
        code: "ORK",
        name: "Cork Airport",
        city: "Cork",
        country: "Ireland"
    },
    // ── Europe – France ───────────────────────────────────────────────────────
    {
        code: "CDG",
        name: "Charles de Gaulle",
        city: "Paris",
        country: "France"
    },
    {
        code: "ORY",
        name: "Orly Airport",
        city: "Paris",
        country: "France"
    },
    {
        code: "NCE",
        name: "Nice Côte d'Azur",
        city: "Nice",
        country: "France"
    },
    {
        code: "MRS",
        name: "Marseille Provence",
        city: "Marseille",
        country: "France"
    },
    {
        code: "LYS",
        name: "Lyon-Saint Exupéry",
        city: "Lyon",
        country: "France"
    },
    {
        code: "TLS",
        name: "Toulouse-Blagnac",
        city: "Toulouse",
        country: "France"
    },
    {
        code: "BOD",
        name: "Bordeaux-Mérignac",
        city: "Bordeaux",
        country: "France"
    },
    {
        code: "NTE",
        name: "Nantes Atlantique",
        city: "Nantes",
        country: "France"
    },
    {
        code: "LIL",
        name: "Lille-Lesquin Airport",
        city: "Lille",
        country: "France"
    },
    {
        code: "SXB",
        name: "Strasbourg Airport",
        city: "Strasbourg",
        country: "France"
    },
    // ── Europe – Germany ──────────────────────────────────────────────────────
    {
        code: "FRA",
        name: "Frankfurt Airport",
        city: "Frankfurt",
        country: "Germany"
    },
    {
        code: "MUC",
        name: "Munich Airport",
        city: "Munich",
        country: "Germany"
    },
    {
        code: "BER",
        name: "Brandenburg Airport",
        city: "Berlin",
        country: "Germany"
    },
    {
        code: "DUS",
        name: "Düsseldorf Airport",
        city: "Düsseldorf",
        country: "Germany"
    },
    {
        code: "HAM",
        name: "Hamburg Airport",
        city: "Hamburg",
        country: "Germany"
    },
    {
        code: "STR",
        name: "Stuttgart Airport",
        city: "Stuttgart",
        country: "Germany"
    },
    {
        code: "CGN",
        name: "Cologne Bonn Airport",
        city: "Cologne",
        country: "Germany"
    },
    {
        code: "NUE",
        name: "Nuremberg Airport",
        city: "Nuremberg",
        country: "Germany"
    },
    {
        code: "LEJ",
        name: "Leipzig/Halle Airport",
        city: "Leipzig",
        country: "Germany"
    },
    {
        code: "BRE",
        name: "Bremen Airport",
        city: "Bremen",
        country: "Germany"
    },
    // ── Europe – Iberia ───────────────────────────────────────────────────────
    {
        code: "MAD",
        name: "Adolfo Suárez Madrid–Barajas",
        city: "Madrid",
        country: "Spain"
    },
    {
        code: "BCN",
        name: "Barcelona El Prat",
        city: "Barcelona",
        country: "Spain"
    },
    {
        code: "PMI",
        name: "Palma de Mallorca Airport",
        city: "Palma",
        country: "Spain"
    },
    {
        code: "AGP",
        name: "Málaga-Costa del Sol Airport",
        city: "Málaga",
        country: "Spain"
    },
    {
        code: "VLC",
        name: "Valencia Airport",
        city: "Valencia",
        country: "Spain"
    },
    {
        code: "SVQ",
        name: "Seville Airport",
        city: "Seville",
        country: "Spain"
    },
    {
        code: "LPA",
        name: "Gran Canaria Airport",
        city: "Las Palmas",
        country: "Spain"
    },
    {
        code: "TFS",
        name: "Tenerife South Airport",
        city: "Tenerife",
        country: "Spain"
    },
    {
        code: "TFN",
        name: "Tenerife North Airport",
        city: "Tenerife",
        country: "Spain"
    },
    {
        code: "IBZ",
        name: "Ibiza Airport",
        city: "Ibiza",
        country: "Spain"
    },
    {
        code: "ALC",
        name: "Alicante-Elche Airport",
        city: "Alicante",
        country: "Spain"
    },
    {
        code: "FUE",
        name: "Fuerteventura Airport",
        city: "Fuerteventura",
        country: "Spain"
    },
    {
        code: "ACE",
        name: "Lanzarote Airport",
        city: "Arrecife",
        country: "Spain"
    },
    {
        code: "GRO",
        name: "Girona-Costa Brava Airport",
        city: "Girona",
        country: "Spain"
    },
    {
        code: "BIO",
        name: "Bilbao Airport",
        city: "Bilbao",
        country: "Spain"
    },
    {
        code: "LIS",
        name: "Humberto Delgado Airport",
        city: "Lisbon",
        country: "Portugal"
    },
    {
        code: "OPO",
        name: "Francisco Sá Carneiro Airport",
        city: "Porto",
        country: "Portugal"
    },
    {
        code: "FAO",
        name: "Faro Airport",
        city: "Faro",
        country: "Portugal"
    },
    {
        code: "FNC",
        name: "Madeira Airport",
        city: "Funchal",
        country: "Portugal"
    },
    // ── Europe – Italy ────────────────────────────────────────────────────────
    {
        code: "FCO",
        name: "Leonardo da Vinci–Fiumicino",
        city: "Rome",
        country: "Italy"
    },
    {
        code: "MXP",
        name: "Malpensa Airport",
        city: "Milan",
        country: "Italy"
    },
    {
        code: "LIN",
        name: "Linate Airport",
        city: "Milan",
        country: "Italy"
    },
    {
        code: "VCE",
        name: "Venice Marco Polo Airport",
        city: "Venice",
        country: "Italy"
    },
    {
        code: "NAP",
        name: "Naples International Airport",
        city: "Naples",
        country: "Italy"
    },
    {
        code: "BLQ",
        name: "Guglielmo Marconi Airport",
        city: "Bologna",
        country: "Italy"
    },
    {
        code: "CTA",
        name: "Catania-Fontanarossa Airport",
        city: "Catania",
        country: "Italy"
    },
    {
        code: "PMO",
        name: "Falcone-Borsellino Airport",
        city: "Palermo",
        country: "Italy"
    },
    {
        code: "FLR",
        name: "Amerigo Vespucci Airport",
        city: "Florence",
        country: "Italy"
    },
    {
        code: "PSA",
        name: "Galileo Galilei Airport",
        city: "Pisa",
        country: "Italy"
    },
    {
        code: "VRN",
        name: "Verona Villafranca Airport",
        city: "Verona",
        country: "Italy"
    },
    {
        code: "TRN",
        name: "Turin Airport",
        city: "Turin",
        country: "Italy"
    },
    {
        code: "BRI",
        name: "Karol Wojtyła Airport",
        city: "Bari",
        country: "Italy"
    },
    // ── Europe – Benelux & Switzerland ────────────────────────────────────────
    {
        code: "AMS",
        name: "Amsterdam Schiphol",
        city: "Amsterdam",
        country: "Netherlands"
    },
    {
        code: "EIN",
        name: "Eindhoven Airport",
        city: "Eindhoven",
        country: "Netherlands"
    },
    {
        code: "BRU",
        name: "Brussels Airport",
        city: "Brussels",
        country: "Belgium"
    },
    {
        code: "CRL",
        name: "Brussels South Charleroi",
        city: "Charleroi",
        country: "Belgium"
    },
    {
        code: "LUX",
        name: "Luxembourg Airport",
        city: "Luxembourg City",
        country: "Luxembourg"
    },
    {
        code: "ZRH",
        name: "Zurich Airport",
        city: "Zurich",
        country: "Switzerland"
    },
    {
        code: "GVA",
        name: "Geneva Airport",
        city: "Geneva",
        country: "Switzerland"
    },
    {
        code: "BSL",
        name: "EuroAirport Basel-Mulhouse-Freiburg",
        city: "Basel",
        country: "Switzerland"
    },
    // ── Europe – Austria & Balkans ────────────────────────────────────────────
    {
        code: "VIE",
        name: "Vienna International Airport",
        city: "Vienna",
        country: "Austria"
    },
    {
        code: "INN",
        name: "Innsbruck Airport",
        city: "Innsbruck",
        country: "Austria"
    },
    {
        code: "SZG",
        name: "Salzburg Airport",
        city: "Salzburg",
        country: "Austria"
    },
    {
        code: "LNZ",
        name: "Linz Blue Danube Airport",
        city: "Linz",
        country: "Austria"
    },
    {
        code: "ATH",
        name: "Athens International Airport",
        city: "Athens",
        country: "Greece"
    },
    {
        code: "SKG",
        name: "Thessaloniki International Airport",
        city: "Thessaloniki",
        country: "Greece"
    },
    {
        code: "HER",
        name: "Heraklion International Airport",
        city: "Heraklion",
        country: "Greece"
    },
    {
        code: "RHO",
        name: "Diagoras Airport",
        city: "Rhodes",
        country: "Greece"
    },
    {
        code: "CFU",
        name: "Ioannis Kapodistrias Airport",
        city: "Corfu",
        country: "Greece"
    },
    {
        code: "ZAG",
        name: "Franjo Tuđman Airport",
        city: "Zagreb",
        country: "Croatia"
    },
    {
        code: "DBV",
        name: "Dubrovnik Airport",
        city: "Dubrovnik",
        country: "Croatia"
    },
    {
        code: "SPU",
        name: "Split Airport",
        city: "Split",
        country: "Croatia"
    },
    {
        code: "BEG",
        name: "Belgrade Nikola Tesla Airport",
        city: "Belgrade",
        country: "Serbia"
    },
    {
        code: "SJJ",
        name: "Sarajevo International Airport",
        city: "Sarajevo",
        country: "Bosnia and Herzegovina"
    },
    {
        code: "TGD",
        name: "Podgorica Airport",
        city: "Podgorica",
        country: "Montenegro"
    },
    {
        code: "TIA",
        name: "Tirana International Nënë Tereza",
        city: "Tirana",
        country: "Albania"
    },
    {
        code: "SOF",
        name: "Sofia Airport",
        city: "Sofia",
        country: "Bulgaria"
    },
    {
        code: "OTP",
        name: "Henri Coandă International",
        city: "Bucharest",
        country: "Romania"
    },
    {
        code: "CLJ",
        name: "Cluj-Napoca International Airport",
        city: "Cluj-Napoca",
        country: "Romania"
    },
    {
        code: "TSR",
        name: "Traian Vuia International Airport",
        city: "Timișoara",
        country: "Romania"
    },
    {
        code: "IAS",
        name: "Iași International Airport",
        city: "Iași",
        country: "Romania"
    },
    {
        code: "SKP",
        name: "Skopje International Airport",
        city: "Skopje",
        country: "North Macedonia"
    },
    {
        code: "MLA",
        name: "Malta International Airport",
        city: "Valletta",
        country: "Malta"
    },
    // ── Europe – Turkey ───────────────────────────────────────────────────────
    {
        code: "IST",
        name: "Istanbul Airport",
        city: "Istanbul",
        country: "Turkey"
    },
    {
        code: "SAW",
        name: "Sabiha Gökçen International",
        city: "Istanbul",
        country: "Turkey"
    },
    {
        code: "AYT",
        name: "Antalya Airport",
        city: "Antalya",
        country: "Turkey"
    },
    {
        code: "ADB",
        name: "Adnan Menderes Airport",
        city: "Izmir",
        country: "Turkey"
    },
    {
        code: "ESB",
        name: "Esenboğa International Airport",
        city: "Ankara",
        country: "Turkey"
    },
    {
        code: "GZT",
        name: "Oğuzeli International Airport",
        city: "Gaziantep",
        country: "Turkey"
    },
    {
        code: "TZX",
        name: "Trabzon Airport",
        city: "Trabzon",
        country: "Turkey"
    },
    {
        code: "DIY",
        name: "Diyarbakır Airport",
        city: "Diyarbakır",
        country: "Turkey"
    },
    // ── Europe – Nordics ──────────────────────────────────────────────────────
    {
        code: "ARN",
        name: "Stockholm Arlanda Airport",
        city: "Stockholm",
        country: "Sweden"
    },
    {
        code: "GOT",
        name: "Gothenburg Landvetter Airport",
        city: "Gothenburg",
        country: "Sweden"
    },
    {
        code: "MMX",
        name: "Malmö Airport",
        city: "Malmö",
        country: "Sweden"
    },
    {
        code: "CPH",
        name: "Copenhagen Airport",
        city: "Copenhagen",
        country: "Denmark"
    },
    {
        code: "AAL",
        name: "Aalborg Airport",
        city: "Aalborg",
        country: "Denmark"
    },
    {
        code: "BLL",
        name: "Billund Airport",
        city: "Billund",
        country: "Denmark"
    },
    {
        code: "OSL",
        name: "Oslo Gardermoen Airport",
        city: "Oslo",
        country: "Norway"
    },
    {
        code: "BGO",
        name: "Bergen Airport Flesland",
        city: "Bergen",
        country: "Norway"
    },
    {
        code: "TRD",
        name: "Trondheim Airport Værnes",
        city: "Trondheim",
        country: "Norway"
    },
    {
        code: "SVG",
        name: "Stavanger Airport Sola",
        city: "Stavanger",
        country: "Norway"
    },
    {
        code: "HEL",
        name: "Helsinki-Vantaa Airport",
        city: "Helsinki",
        country: "Finland"
    },
    {
        code: "TMP",
        name: "Tampere-Pirkkala Airport",
        city: "Tampere",
        country: "Finland"
    },
    {
        code: "TKU",
        name: "Turku Airport",
        city: "Turku",
        country: "Finland"
    },
    {
        code: "RVN",
        name: "Rovaniemi Airport",
        city: "Rovaniemi",
        country: "Finland"
    },
    // ── Europe – Slavic & Baltic ──────────────────────────────────────────────
    {
        code: "WAW",
        name: "Warsaw Chopin Airport",
        city: "Warsaw",
        country: "Poland"
    },
    {
        code: "KRK",
        name: "John Paul II International Airport",
        city: "Kraków",
        country: "Poland"
    },
    {
        code: "WRO",
        name: "Copernicus Airport Wrocław",
        city: "Wrocław",
        country: "Poland"
    },
    {
        code: "GDN",
        name: "Lech Wałęsa Airport",
        city: "Gdańsk",
        country: "Poland"
    },
    {
        code: "KTW",
        name: "Katowice International Airport",
        city: "Katowice",
        country: "Poland"
    },
    {
        code: "PRG",
        name: "Václav Havel Airport Prague",
        city: "Prague",
        country: "Czech Republic"
    },
    {
        code: "BUD",
        name: "Budapest Ferenc Liszt Airport",
        city: "Budapest",
        country: "Hungary"
    },
    {
        code: "KBP",
        name: "Boryspil International Airport",
        city: "Kyiv",
        country: "Ukraine"
    },
    {
        code: "LWO",
        name: "Lviv Danylo Halytskyi International",
        city: "Lviv",
        country: "Ukraine"
    },
    {
        code: "ODS",
        name: "Odesa International Airport",
        city: "Odesa",
        country: "Ukraine"
    },
    {
        code: "HRK",
        name: "Kharkiv International Airport",
        city: "Kharkiv",
        country: "Ukraine"
    },
    {
        code: "RIX",
        name: "Riga International Airport",
        city: "Riga",
        country: "Latvia"
    },
    {
        code: "TLL",
        name: "Lennart Meri Tallinn Airport",
        city: "Tallinn",
        country: "Estonia"
    },
    {
        code: "VNO",
        name: "Vilnius Airport",
        city: "Vilnius",
        country: "Lithuania"
    },
    {
        code: "LJU",
        name: "Ljubljana Jože Pučnik Airport",
        city: "Ljubljana",
        country: "Slovenia"
    },
    // ── Russia ────────────────────────────────────────────────────────────────
    {
        code: "SVO",
        name: "Sheremetyevo International",
        city: "Moscow",
        country: "Russia"
    },
    {
        code: "DME",
        name: "Domodedovo International",
        city: "Moscow",
        country: "Russia"
    },
    {
        code: "VKO",
        name: "Vnukovo International",
        city: "Moscow",
        country: "Russia"
    },
    {
        code: "LED",
        name: "Pulkovo Airport",
        city: "Saint Petersburg",
        country: "Russia"
    },
    {
        code: "SVX",
        name: "Koltsovo Airport",
        city: "Yekaterinburg",
        country: "Russia"
    },
    {
        code: "OVB",
        name: "Tolmachevo Airport",
        city: "Novosibirsk",
        country: "Russia"
    },
    {
        code: "KZN",
        name: "Kazan International Airport",
        city: "Kazan",
        country: "Russia"
    },
    {
        code: "UFA",
        name: "Ufa International Airport",
        city: "Ufa",
        country: "Russia"
    },
    {
        code: "KUF",
        name: "Kurumoch International Airport",
        city: "Samara",
        country: "Russia"
    },
    {
        code: "AER",
        name: "Sochi International Airport",
        city: "Sochi",
        country: "Russia"
    },
    {
        code: "KRR",
        name: "Krasnodar International Airport",
        city: "Krasnodar",
        country: "Russia"
    },
    {
        code: "ROV",
        name: "Platov International Airport",
        city: "Rostov-on-Don",
        country: "Russia"
    },
    {
        code: "CEK",
        name: "Chelyabinsk Balandino Airport",
        city: "Chelyabinsk",
        country: "Russia"
    },
    {
        code: "IKT",
        name: "Irkutsk International Airport",
        city: "Irkutsk",
        country: "Russia"
    },
    {
        code: "KHV",
        name: "Khabarovsk Novy Airport",
        city: "Khabarovsk",
        country: "Russia"
    },
    {
        code: "VVO",
        name: "Vladivostok International Airport",
        city: "Vladivostok",
        country: "Russia"
    },
    {
        code: "ULN",
        name: "Chinggis Khaan International",
        city: "Ulaanbaatar",
        country: "Mongolia"
    },
    // ── Caucasus & Central Asia ───────────────────────────────────────────────
    {
        code: "TBS",
        name: "Tbilisi International Airport",
        city: "Tbilisi",
        country: "Georgia"
    },
    {
        code: "BUS",
        name: "Batumi International Airport",
        city: "Batumi",
        country: "Georgia"
    },
    {
        code: "EVN",
        name: "Zvartnots International Airport",
        city: "Yerevan",
        country: "Armenia"
    },
    {
        code: "GYD",
        name: "Heydar Aliyev International Airport",
        city: "Baku",
        country: "Azerbaijan"
    },
    {
        code: "ALA",
        name: "Almaty International Airport",
        city: "Almaty",
        country: "Kazakhstan"
    },
    {
        code: "NQZ",
        name: "Nursultan Nazarbayev International",
        city: "Astana",
        country: "Kazakhstan"
    },
    {
        code: "TAS",
        name: "Tashkent International Airport",
        city: "Tashkent",
        country: "Uzbekistan"
    },
    {
        code: "SKD",
        name: "Samarkand International Airport",
        city: "Samarkand",
        country: "Uzbekistan"
    },
    {
        code: "FRU",
        name: "Manas International Airport",
        city: "Bishkek",
        country: "Kyrgyzstan"
    },
    {
        code: "OSS",
        name: "Osh Airport",
        city: "Osh",
        country: "Kyrgyzstan"
    },
    {
        code: "DYU",
        name: "Dushanbe International Airport",
        city: "Dushanbe",
        country: "Tajikistan"
    },
    {
        code: "ASB",
        name: "Ashgabat International Airport",
        city: "Ashgabat",
        country: "Turkmenistan"
    },
    // ── Middle East – UAE & Gulf ──────────────────────────────────────────────
    {
        code: "DXB",
        name: "Dubai International Airport",
        city: "Dubai",
        country: "United Arab Emirates"
    },
    {
        code: "AUH",
        name: "Abu Dhabi International Airport",
        city: "Abu Dhabi",
        country: "United Arab Emirates"
    },
    {
        code: "SHJ",
        name: "Sharjah International Airport",
        city: "Sharjah",
        country: "United Arab Emirates"
    },
    {
        code: "AAN",
        name: "Al Ain International Airport",
        city: "Al Ain",
        country: "United Arab Emirates"
    },
    {
        code: "RKT",
        name: "Ras al-Khaimah International",
        city: "Ras al-Khaimah",
        country: "United Arab Emirates"
    },
    {
        code: "DOH",
        name: "Hamad International Airport",
        city: "Doha",
        country: "Qatar"
    },
    {
        code: "BAH",
        name: "Bahrain International Airport",
        city: "Manama",
        country: "Bahrain"
    },
    {
        code: "KWI",
        name: "Kuwait International Airport",
        city: "Kuwait City",
        country: "Kuwait"
    },
    {
        code: "MCT",
        name: "Muscat International Airport",
        city: "Muscat",
        country: "Oman"
    },
    {
        code: "SLL",
        name: "Salalah Airport",
        city: "Salalah",
        country: "Oman"
    },
    // ── Middle East – Saudi Arabia ────────────────────────────────────────────
    {
        code: "RUH",
        name: "King Khalid International Airport",
        city: "Riyadh",
        country: "Saudi Arabia"
    },
    {
        code: "JED",
        name: "King Abdulaziz International Airport",
        city: "Jeddah",
        country: "Saudi Arabia"
    },
    {
        code: "DMM",
        name: "King Fahd International Airport",
        city: "Dammam",
        country: "Saudi Arabia"
    },
    {
        code: "MED",
        name: "Prince Mohammad Bin Abdulaziz Airport",
        city: "Medina",
        country: "Saudi Arabia"
    },
    {
        code: "AHB",
        name: "Abha Regional Airport",
        city: "Abha",
        country: "Saudi Arabia"
    },
    {
        code: "TIF",
        name: "Ta'if Regional Airport",
        city: "Ta'if",
        country: "Saudi Arabia"
    },
    {
        code: "GIZ",
        name: "Jizan Regional Airport",
        city: "Jizan",
        country: "Saudi Arabia"
    },
    {
        code: "HOF",
        name: "Al-Ahsa International Airport",
        city: "Al-Ahsa",
        country: "Saudi Arabia"
    },
    // ── Middle East – Levant & Iraq ───────────────────────────────────────────
    {
        code: "TLV",
        name: "Ben Gurion Airport",
        city: "Tel Aviv",
        country: "Israel"
    },
    {
        code: "AMM",
        name: "Queen Alia International Airport",
        city: "Amman",
        country: "Jordan"
    },
    {
        code: "AQJ",
        name: "King Hussein International Airport",
        city: "Aqaba",
        country: "Jordan"
    },
    {
        code: "BEY",
        name: "Beirut-Rafic Hariri International",
        city: "Beirut",
        country: "Lebanon"
    },
    {
        code: "DAM",
        name: "Damascus International Airport",
        city: "Damascus",
        country: "Syria"
    },
    {
        code: "BGW",
        name: "Baghdad International Airport",
        city: "Baghdad",
        country: "Iraq"
    },
    {
        code: "BSR",
        name: "Basra International Airport",
        city: "Basra",
        country: "Iraq"
    },
    {
        code: "EBL",
        name: "Erbil International Airport",
        city: "Erbil",
        country: "Iraq"
    },
    {
        code: "ISU",
        name: "Sulaymaniyah International Airport",
        city: "Sulaymaniyah",
        country: "Iraq"
    },
    {
        code: "NJF",
        name: "Al Najaf International Airport",
        city: "Najaf",
        country: "Iraq"
    },
    // ── Middle East – Iran & Yemen ────────────────────────────────────────────
    {
        code: "IKA",
        name: "Imam Khomeini International Airport",
        city: "Tehran",
        country: "Iran"
    },
    {
        code: "THR",
        name: "Mehrabad International Airport",
        city: "Tehran",
        country: "Iran"
    },
    {
        code: "MHD",
        name: "Mashhad International Airport",
        city: "Mashhad",
        country: "Iran"
    },
    {
        code: "IFN",
        name: "Isfahan International Airport",
        city: "Isfahan",
        country: "Iran"
    },
    {
        code: "SYZ",
        name: "Shiraz International Airport",
        city: "Shiraz",
        country: "Iran"
    },
    {
        code: "TBZ",
        name: "Tabriz International Airport",
        city: "Tabriz",
        country: "Iran"
    },
    {
        code: "AWZ",
        name: "Ahvaz International Airport",
        city: "Ahvaz",
        country: "Iran"
    },
    {
        code: "KER",
        name: "Kerman Airport",
        city: "Kerman",
        country: "Iran"
    },
    {
        code: "SAH",
        name: "Sana'a International Airport",
        city: "Sana'a",
        country: "Yemen"
    },
    {
        code: "ADE",
        name: "Aden International Airport",
        city: "Aden",
        country: "Yemen"
    },
    // ── Middle East – Cyprus ──────────────────────────────────────────────────
    {
        code: "LCA",
        name: "Larnaca International Airport",
        city: "Larnaca",
        country: "Cyprus"
    },
    {
        code: "PFO",
        name: "Paphos International Airport",
        city: "Paphos",
        country: "Cyprus"
    },
    // ── North America – United States ─────────────────────────────────────────
    {
        code: "JFK",
        name: "John F. Kennedy International",
        city: "New York",
        country: "United States"
    },
    {
        code: "EWR",
        name: "Newark Liberty International",
        city: "Newark",
        country: "United States"
    },
    {
        code: "LGA",
        name: "LaGuardia Airport",
        city: "New York",
        country: "United States"
    },
    {
        code: "LAX",
        name: "Los Angeles International",
        city: "Los Angeles",
        country: "United States"
    },
    {
        code: "SFO",
        name: "San Francisco International",
        city: "San Francisco",
        country: "United States"
    },
    {
        code: "OAK",
        name: "Oakland International Airport",
        city: "Oakland",
        country: "United States"
    },
    {
        code: "SJC",
        name: "San José International Airport",
        city: "San José",
        country: "United States"
    },
    {
        code: "SMF",
        name: "Sacramento International Airport",
        city: "Sacramento",
        country: "United States"
    },
    {
        code: "ORD",
        name: "O'Hare International Airport",
        city: "Chicago",
        country: "United States"
    },
    {
        code: "MDW",
        name: "Chicago Midway International",
        city: "Chicago",
        country: "United States"
    },
    {
        code: "ATL",
        name: "Hartsfield–Jackson Atlanta International",
        city: "Atlanta",
        country: "United States"
    },
    {
        code: "DFW",
        name: "Dallas/Fort Worth International",
        city: "Dallas",
        country: "United States"
    },
    {
        code: "DAL",
        name: "Dallas Love Field",
        city: "Dallas",
        country: "United States"
    },
    {
        code: "IAH",
        name: "George Bush Intercontinental",
        city: "Houston",
        country: "United States"
    },
    {
        code: "HOU",
        name: "William P. Hobby Airport",
        city: "Houston",
        country: "United States"
    },
    {
        code: "DEN",
        name: "Denver International Airport",
        city: "Denver",
        country: "United States"
    },
    {
        code: "SEA",
        name: "Seattle-Tacoma International",
        city: "Seattle",
        country: "United States"
    },
    {
        code: "MIA",
        name: "Miami International Airport",
        city: "Miami",
        country: "United States"
    },
    {
        code: "FLL",
        name: "Fort Lauderdale-Hollywood International",
        city: "Fort Lauderdale",
        country: "United States"
    },
    {
        code: "MCO",
        name: "Orlando International Airport",
        city: "Orlando",
        country: "United States"
    },
    {
        code: "TPA",
        name: "Tampa International Airport",
        city: "Tampa",
        country: "United States"
    },
    {
        code: "BOS",
        name: "Logan International Airport",
        city: "Boston",
        country: "United States"
    },
    {
        code: "IAD",
        name: "Washington Dulles International",
        city: "Washington",
        country: "United States"
    },
    {
        code: "DCA",
        name: "Ronald Reagan Washington National",
        city: "Washington",
        country: "United States"
    },
    {
        code: "BWI",
        name: "Baltimore/Washington International",
        city: "Baltimore",
        country: "United States"
    },
    {
        code: "PHL",
        name: "Philadelphia International Airport",
        city: "Philadelphia",
        country: "United States"
    },
    {
        code: "CLT",
        name: "Charlotte Douglas International",
        city: "Charlotte",
        country: "United States"
    },
    {
        code: "RDU",
        name: "Raleigh-Durham International",
        city: "Raleigh",
        country: "United States"
    },
    {
        code: "LAS",
        name: "Harry Reid International Airport",
        city: "Las Vegas",
        country: "United States"
    },
    {
        code: "PHX",
        name: "Phoenix Sky Harbor International",
        city: "Phoenix",
        country: "United States"
    },
    {
        code: "SAN",
        name: "San Diego International Airport",
        city: "San Diego",
        country: "United States"
    },
    {
        code: "PDX",
        name: "Portland International Airport",
        city: "Portland",
        country: "United States"
    },
    {
        code: "SLC",
        name: "Salt Lake City International Airport",
        city: "Salt Lake City",
        country: "United States"
    },
    {
        code: "MSP",
        name: "Minneapolis-Saint Paul International",
        city: "Minneapolis",
        country: "United States"
    },
    {
        code: "DTW",
        name: "Detroit Metropolitan Airport",
        city: "Detroit",
        country: "United States"
    },
    {
        code: "STL",
        name: "Lambert-St. Louis International",
        city: "St. Louis",
        country: "United States"
    },
    {
        code: "MCI",
        name: "Kansas City International Airport",
        city: "Kansas City",
        country: "United States"
    },
    {
        code: "MSY",
        name: "Louis Armstrong New Orleans International",
        city: "New Orleans",
        country: "United States"
    },
    {
        code: "BNA",
        name: "Nashville International Airport",
        city: "Nashville",
        country: "United States"
    },
    {
        code: "CMH",
        name: "John Glenn Columbus International",
        city: "Columbus",
        country: "United States"
    },
    {
        code: "CVG",
        name: "Cincinnati/Northern Kentucky International",
        city: "Cincinnati",
        country: "United States"
    },
    {
        code: "IND",
        name: "Indianapolis International Airport",
        city: "Indianapolis",
        country: "United States"
    },
    {
        code: "MKE",
        name: "Mitchell International Airport",
        city: "Milwaukee",
        country: "United States"
    },
    {
        code: "CLE",
        name: "Cleveland Hopkins International",
        city: "Cleveland",
        country: "United States"
    },
    {
        code: "PIT",
        name: "Pittsburgh International Airport",
        city: "Pittsburgh",
        country: "United States"
    },
    {
        code: "AUS",
        name: "Austin-Bergstrom International",
        city: "Austin",
        country: "United States"
    },
    {
        code: "MEM",
        name: "Memphis International Airport",
        city: "Memphis",
        country: "United States"
    },
    {
        code: "PVD",
        name: "Rhode Island T. F. Green International",
        city: "Providence",
        country: "United States"
    },
    {
        code: "ORF",
        name: "Norfolk International Airport",
        city: "Norfolk",
        country: "United States"
    },
    {
        code: "SNA",
        name: "John Wayne Airport",
        city: "Orange County",
        country: "United States"
    },
    {
        code: "ABQ",
        name: "Albuquerque International Sunport",
        city: "Albuquerque",
        country: "United States"
    },
    {
        code: "TUS",
        name: "Tucson International Airport",
        city: "Tucson",
        country: "United States"
    },
    {
        code: "OGG",
        name: "Kahului Airport",
        city: "Maui",
        country: "United States"
    },
    {
        code: "HNL",
        name: "Daniel K. Inouye International",
        city: "Honolulu",
        country: "United States"
    },
    {
        code: "ANC",
        name: "Ted Stevens Anchorage International",
        city: "Anchorage",
        country: "United States"
    },
    // ── North America – Canada ────────────────────────────────────────────────
    {
        code: "YYZ",
        name: "Toronto Pearson International",
        city: "Toronto",
        country: "Canada"
    },
    {
        code: "YVR",
        name: "Vancouver International Airport",
        city: "Vancouver",
        country: "Canada"
    },
    {
        code: "YUL",
        name: "Montréal-Trudeau International",
        city: "Montreal",
        country: "Canada"
    },
    {
        code: "YYC",
        name: "Calgary International Airport",
        city: "Calgary",
        country: "Canada"
    },
    {
        code: "YEG",
        name: "Edmonton International Airport",
        city: "Edmonton",
        country: "Canada"
    },
    {
        code: "YOW",
        name: "Ottawa Macdonald-Cartier International",
        city: "Ottawa",
        country: "Canada"
    },
    {
        code: "YHZ",
        name: "Halifax Stanfield International",
        city: "Halifax",
        country: "Canada"
    },
    {
        code: "YWG",
        name: "Winnipeg James Armstrong Richardson",
        city: "Winnipeg",
        country: "Canada"
    },
    {
        code: "YQB",
        name: "Jean Lesage International Airport",
        city: "Quebec City",
        country: "Canada"
    },
    {
        code: "YYJ",
        name: "Victoria International Airport",
        city: "Victoria",
        country: "Canada"
    },
    // ── North America – Mexico ────────────────────────────────────────────────
    {
        code: "MEX",
        name: "Mexico City International Airport",
        city: "Mexico City",
        country: "Mexico"
    },
    {
        code: "CUN",
        name: "Cancún International Airport",
        city: "Cancún",
        country: "Mexico"
    },
    {
        code: "GDL",
        name: "Miguel Hidalgo y Costilla International",
        city: "Guadalajara",
        country: "Mexico"
    },
    {
        code: "MTY",
        name: "General Mariano Escobedo International",
        city: "Monterrey",
        country: "Mexico"
    },
    {
        code: "TIJ",
        name: "General Abelardo L. Rodríguez International",
        city: "Tijuana",
        country: "Mexico"
    },
    {
        code: "SJD",
        name: "Los Cabos International Airport",
        city: "Los Cabos",
        country: "Mexico"
    },
    {
        code: "PVR",
        name: "Licenciado Gustavo Díaz Ordaz International",
        city: "Puerto Vallarta",
        country: "Mexico"
    },
    {
        code: "MZT",
        name: "General Rafael Buelna International",
        city: "Mazatlán",
        country: "Mexico"
    },
    {
        code: "ZIH",
        name: "Ixtapa-Zihuatanejo International",
        city: "Ixtapa-Zihuatanejo",
        country: "Mexico"
    },
    {
        code: "OAX",
        name: "Xoxocotlán International Airport",
        city: "Oaxaca",
        country: "Mexico"
    },
    {
        code: "HUX",
        name: "Bahías de Huatulco International",
        city: "Huatulco",
        country: "Mexico"
    },
    {
        code: "BJX",
        name: "Del Bajío International Airport",
        city: "León",
        country: "Mexico"
    },
    {
        code: "SLP",
        name: "Ponciano Arriaga International",
        city: "San Luis Potosí",
        country: "Mexico"
    },
    {
        code: "AGU",
        name: "Lic. Jesús Terán Peredo Airport",
        city: "Aguascalientes",
        country: "Mexico"
    },
    {
        code: "HMO",
        name: "Gen. Ignacio Pesqueira García Airport",
        city: "Hermosillo",
        country: "Mexico"
    },
    {
        code: "VER",
        name: "General Heriberto Jara International",
        city: "Veracruz",
        country: "Mexico"
    },
    {
        code: "MID",
        name: "Manuel Crescencio Rejón International",
        city: "Mérida",
        country: "Mexico"
    },
    // ── Caribbean & Central America ───────────────────────────────────────────
    {
        code: "HAV",
        name: "José Martí International Airport",
        city: "Havana",
        country: "Cuba"
    },
    {
        code: "NAS",
        name: "Lynden Pindling International Airport",
        city: "Nassau",
        country: "Bahamas"
    },
    {
        code: "KIN",
        name: "Norman Manley International Airport",
        city: "Kingston",
        country: "Jamaica"
    },
    {
        code: "MBJ",
        name: "Sangster International Airport",
        city: "Montego Bay",
        country: "Jamaica"
    },
    {
        code: "POS",
        name: "Piarco International Airport",
        city: "Port of Spain",
        country: "Trinidad and Tobago"
    },
    {
        code: "BGI",
        name: "Grantley Adams International Airport",
        city: "Bridgetown",
        country: "Barbados"
    },
    {
        code: "SJU",
        name: "Luis Muñoz Marín International",
        city: "San Juan",
        country: "Puerto Rico"
    },
    {
        code: "SDQ",
        name: "Las Américas International Airport",
        city: "Santo Domingo",
        country: "Dominican Republic"
    },
    {
        code: "PUJ",
        name: "Punta Cana International Airport",
        city: "Punta Cana",
        country: "Dominican Republic"
    },
    {
        code: "POP",
        name: "Gregorio Luperón International",
        city: "Puerto Plata",
        country: "Dominican Republic"
    },
    {
        code: "UVF",
        name: "Hewanorra International Airport",
        city: "Vieux Fort",
        country: "Saint Lucia"
    },
    {
        code: "ANU",
        name: "V. C. Bird International Airport",
        city: "St. John's",
        country: "Antigua and Barbuda"
    },
    {
        code: "GCM",
        name: "Owen Roberts International Airport",
        city: "George Town",
        country: "Cayman Islands"
    },
    {
        code: "GUA",
        name: "La Aurora International Airport",
        city: "Guatemala City",
        country: "Guatemala"
    },
    {
        code: "SAL",
        name: "Monseñor Óscar Arnulfo Romero International",
        city: "San Salvador",
        country: "El Salvador"
    },
    {
        code: "TGU",
        name: "Toncontín International Airport",
        city: "Tegucigalpa",
        country: "Honduras"
    },
    {
        code: "SAP",
        name: "Ramón Villeda Morales International",
        city: "San Pedro Sula",
        country: "Honduras"
    },
    {
        code: "MGA",
        name: "Augusto C. Sandino International Airport",
        city: "Managua",
        country: "Nicaragua"
    },
    {
        code: "SJO",
        name: "Juan Santamaría International Airport",
        city: "San José",
        country: "Costa Rica"
    },
    {
        code: "PTY",
        name: "Tocumen International Airport",
        city: "Panama City",
        country: "Panama"
    },
    {
        code: "BZE",
        name: "Philip S. W. Goldson International",
        city: "Belize City",
        country: "Belize"
    },
    // ── South America – Brazil ────────────────────────────────────────────────
    {
        code: "GRU",
        name: "São Paulo/Guarulhos International",
        city: "São Paulo",
        country: "Brazil"
    },
    {
        code: "VCP",
        name: "Viracopos International Airport",
        city: "Campinas",
        country: "Brazil"
    },
    {
        code: "CGH",
        name: "Congonhas Airport",
        city: "São Paulo",
        country: "Brazil"
    },
    {
        code: "GIG",
        name: "Rio de Janeiro/Galeão International",
        city: "Rio de Janeiro",
        country: "Brazil"
    },
    {
        code: "SDU",
        name: "Santos Dumont Airport",
        city: "Rio de Janeiro",
        country: "Brazil"
    },
    {
        code: "BSB",
        name: "Presidente Juscelino Kubitschek International",
        city: "Brasília",
        country: "Brazil"
    },
    {
        code: "CNF",
        name: "Tancredo Neves International Airport",
        city: "Belo Horizonte",
        country: "Brazil"
    },
    {
        code: "SSA",
        name: "Deputado Luís Eduardo Magalhães International",
        city: "Salvador",
        country: "Brazil"
    },
    {
        code: "FOR",
        name: "Pinto Martins International Airport",
        city: "Fortaleza",
        country: "Brazil"
    },
    {
        code: "REC",
        name: "Guararapes-Gilberto Freyre International",
        city: "Recife",
        country: "Brazil"
    },
    {
        code: "NAT",
        name: "Governador Aluízio Alves International",
        city: "Natal",
        country: "Brazil"
    },
    {
        code: "MCZ",
        name: "Zumbi dos Palmares International",
        city: "Maceió",
        country: "Brazil"
    },
    {
        code: "AJU",
        name: "Santa Maria International Airport",
        city: "Aracaju",
        country: "Brazil"
    },
    {
        code: "JPA",
        name: "Presidente Castro Pinto International",
        city: "João Pessoa",
        country: "Brazil"
    },
    {
        code: "THE",
        name: "Senador Petrônio Portella Airport",
        city: "Teresina",
        country: "Brazil"
    },
    {
        code: "SLZ",
        name: "Marechal Cunha Machado International",
        city: "São Luís",
        country: "Brazil"
    },
    {
        code: "BEL",
        name: "Val de Cans International Airport",
        city: "Belém",
        country: "Brazil"
    },
    {
        code: "MAO",
        name: "Eduardo Gomes International Airport",
        city: "Manaus",
        country: "Brazil"
    },
    {
        code: "MCP",
        name: "Macapá International Airport",
        city: "Macapá",
        country: "Brazil"
    },
    {
        code: "PVH",
        name: "Governador Jorge Teixeira de Oliveira",
        city: "Porto Velho",
        country: "Brazil"
    },
    {
        code: "RBR",
        name: "Rio Branco International Airport",
        city: "Rio Branco",
        country: "Brazil"
    },
    {
        code: "POA",
        name: "Salgado Filho International Airport",
        city: "Porto Alegre",
        country: "Brazil"
    },
    {
        code: "FLN",
        name: "Hercílio Luz International Airport",
        city: "Florianópolis",
        country: "Brazil"
    },
    {
        code: "CWB",
        name: "Afonso Pena International Airport",
        city: "Curitiba",
        country: "Brazil"
    },
    {
        code: "CGR",
        name: "Campo Grande International Airport",
        city: "Campo Grande",
        country: "Brazil"
    },
    {
        code: "CGB",
        name: "Marechal Rondon International Airport",
        city: "Cuiabá",
        country: "Brazil"
    },
    {
        code: "GYN",
        name: "Santa Genoveva Airport",
        city: "Goiânia",
        country: "Brazil"
    },
    {
        code: "UDI",
        name: "Ten. Cel. Aviador César Bombonato Airport",
        city: "Uberlândia",
        country: "Brazil"
    },
    {
        code: "MGF",
        name: "Regional de Maringá Airport",
        city: "Maringá",
        country: "Brazil"
    },
    {
        code: "IOS",
        name: "Jorge Amado Airport",
        city: "Ilhéus",
        country: "Brazil"
    },
    {
        code: "BPS",
        name: "Porto Seguro Airport",
        city: "Porto Seguro",
        country: "Brazil"
    },
    {
        code: "STM",
        name: "Maestro Wilson Fonseca Airport",
        city: "Santarém",
        country: "Brazil"
    },
    // ── South America – Argentina ─────────────────────────────────────────────
    {
        code: "EZE",
        name: "Ministro Pistarini International Airport",
        city: "Buenos Aires",
        country: "Argentina"
    },
    {
        code: "AEP",
        name: "Jorge Newbery Airfield",
        city: "Buenos Aires",
        country: "Argentina"
    },
    {
        code: "COR",
        name: "Ingeniero Aeronáutico Ambrosio Taravella",
        city: "Córdoba",
        country: "Argentina"
    },
    {
        code: "MDZ",
        name: "El Plumerillo Airport",
        city: "Mendoza",
        country: "Argentina"
    },
    {
        code: "SLA",
        name: "Martín Miguel de Güemes International",
        city: "Salta",
        country: "Argentina"
    },
    {
        code: "TUC",
        name: "Benjamín Matienzo International Airport",
        city: "Tucumán",
        country: "Argentina"
    },
    {
        code: "ROS",
        name: "Islas Malvinas Airport",
        city: "Rosario",
        country: "Argentina"
    },
    {
        code: "BRC",
        name: "Teniente Luis Candelaria Airport",
        city: "Bariloche",
        country: "Argentina"
    },
    {
        code: "IGR",
        name: "Cataratas del Iguazú International",
        city: "Puerto Iguazú",
        country: "Argentina"
    },
    {
        code: "NQN",
        name: "Presidente Perón Airport",
        city: "Neuquén",
        country: "Argentina"
    },
    {
        code: "USH",
        name: "Malvinas Argentinas International",
        city: "Ushuaia",
        country: "Argentina"
    },
    {
        code: "CRD",
        name: "General Enrique Mosconi Airport",
        city: "Comodoro Rivadavia",
        country: "Argentina"
    },
    // ── South America – Chile ─────────────────────────────────────────────────
    {
        code: "SCL",
        name: "Arturo Merino Benítez International",
        city: "Santiago",
        country: "Chile"
    },
    {
        code: "PMC",
        name: "El Tepual International Airport",
        city: "Puerto Montt",
        country: "Chile"
    },
    {
        code: "PUQ",
        name: "Carlos Ibáñez del Campo International",
        city: "Punta Arenas",
        country: "Chile"
    },
    {
        code: "ANF",
        name: "Andrés Sabella Gálvez International",
        city: "Antofagasta",
        country: "Chile"
    },
    {
        code: "IQQ",
        name: "Diego Aracena International Airport",
        city: "Iquique",
        country: "Chile"
    },
    {
        code: "CCP",
        name: "Carriel Sur International Airport",
        city: "Concepción",
        country: "Chile"
    },
    {
        code: "IPC",
        name: "Mataveri International Airport",
        city: "Easter Island",
        country: "Chile"
    },
    // ── South America – Colombia ──────────────────────────────────────────────
    {
        code: "BOG",
        name: "El Dorado International Airport",
        city: "Bogotá",
        country: "Colombia"
    },
    {
        code: "MDE",
        name: "José María Córdova International",
        city: "Medellín",
        country: "Colombia"
    },
    {
        code: "CLO",
        name: "Alfonso Bonilla Aragón International",
        city: "Cali",
        country: "Colombia"
    },
    {
        code: "CTG",
        name: "Rafael Núñez International Airport",
        city: "Cartagena",
        country: "Colombia"
    },
    {
        code: "BAQ",
        name: "Ernesto Cortissoz International Airport",
        city: "Barranquilla",
        country: "Colombia"
    },
    {
        code: "BGA",
        name: "Palonegro International Airport",
        city: "Bucaramanga",
        country: "Colombia"
    },
    {
        code: "SMR",
        name: "Simón Bolívar International Airport",
        city: "Santa Marta",
        country: "Colombia"
    },
    {
        code: "PEI",
        name: "Matecaña International Airport",
        city: "Pereira",
        country: "Colombia"
    },
    {
        code: "ADZ",
        name: "Gustavo Rojas Pinilla International",
        city: "San Andrés",
        country: "Colombia"
    },
    // ── South America – Peru & Ecuador ────────────────────────────────────────
    {
        code: "LIM",
        name: "Jorge Chávez International Airport",
        city: "Lima",
        country: "Peru"
    },
    {
        code: "CUZ",
        name: "Alejandro Velasco Astete International",
        city: "Cusco",
        country: "Peru"
    },
    {
        code: "AQP",
        name: "Rodríguez Ballón International Airport",
        city: "Arequipa",
        country: "Peru"
    },
    {
        code: "IQT",
        name: "Coronel FAP Francisco Secada Vignetta",
        city: "Iquitos",
        country: "Peru"
    },
    {
        code: "TRU",
        name: "Carlos Martínez de Pinillos International",
        city: "Trujillo",
        country: "Peru"
    },
    {
        code: "PIU",
        name: "Cap. FAP Guillermo Concha Iberico",
        city: "Piura",
        country: "Peru"
    },
    {
        code: "JUL",
        name: "Inca Manco Cápac International",
        city: "Juliaca",
        country: "Peru"
    },
    {
        code: "UIO",
        name: "Mariscal Sucre International Airport",
        city: "Quito",
        country: "Ecuador"
    },
    {
        code: "GYE",
        name: "José Joaquín de Olmedo International",
        city: "Guayaquil",
        country: "Ecuador"
    },
    {
        code: "CUE",
        name: "Mariscal Lamar International Airport",
        city: "Cuenca",
        country: "Ecuador"
    },
    {
        code: "GPS",
        name: "Seymour Airport",
        city: "Galápagos",
        country: "Ecuador"
    },
    // ── South America – Bolivia, Paraguay & Uruguay ───────────────────────────
    {
        code: "VVI",
        name: "Viru Viru International Airport",
        city: "Santa Cruz",
        country: "Bolivia"
    },
    {
        code: "LPB",
        name: "El Alto International Airport",
        city: "La Paz",
        country: "Bolivia"
    },
    {
        code: "CBB",
        name: "Jorge Wilstermann International",
        city: "Cochabamba",
        country: "Bolivia"
    },
    {
        code: "SRE",
        name: "Juana Azurduy de Padilla Airport",
        city: "Sucre",
        country: "Bolivia"
    },
    {
        code: "ASU",
        name: "Silvio Pettirossi International Airport",
        city: "Asunción",
        country: "Paraguay"
    },
    {
        code: "MVD",
        name: "Carrasco International Airport",
        city: "Montevideo",
        country: "Uruguay"
    },
    {
        code: "PDP",
        name: "Laguna del Sauce Airport",
        city: "Punta del Este",
        country: "Uruguay"
    },
    // ── South America – Venezuela & Guianas ──────────────────────────────────
    {
        code: "CCS",
        name: "Simón Bolívar International Airport",
        city: "Caracas",
        country: "Venezuela"
    },
    {
        code: "MAR",
        name: "La Chinita International Airport",
        city: "Maracaibo",
        country: "Venezuela"
    },
    {
        code: "PBM",
        name: "Johan Adolf Pengel International",
        city: "Paramaribo",
        country: "Suriname"
    },
    {
        code: "GEO",
        name: "Cheddi Jagan International Airport",
        city: "Georgetown",
        country: "Guyana"
    },
    {
        code: "CAY",
        name: "Félix Éboué Airport",
        city: "Cayenne",
        country: "French Guiana"
    },
    // ── East Asia – Japan ─────────────────────────────────────────────────────
    {
        code: "NRT",
        name: "Narita International Airport",
        city: "Tokyo",
        country: "Japan"
    },
    {
        code: "HND",
        name: "Haneda Airport",
        city: "Tokyo",
        country: "Japan"
    },
    {
        code: "KIX",
        name: "Kansai International Airport",
        city: "Osaka",
        country: "Japan"
    },
    {
        code: "ITM",
        name: "Osaka Itami Airport",
        city: "Osaka",
        country: "Japan"
    },
    {
        code: "NGO",
        name: "Chubu Centrair International Airport",
        city: "Nagoya",
        country: "Japan"
    },
    {
        code: "FUK",
        name: "Fukuoka Airport",
        city: "Fukuoka",
        country: "Japan"
    },
    {
        code: "CTS",
        name: "New Chitose Airport",
        city: "Sapporo",
        country: "Japan"
    },
    {
        code: "OKA",
        name: "Naha Airport",
        city: "Okinawa",
        country: "Japan"
    },
    {
        code: "HIJ",
        name: "Hiroshima Airport",
        city: "Hiroshima",
        country: "Japan"
    },
    {
        code: "OIT",
        name: "Oita Airport",
        city: "Oita",
        country: "Japan"
    },
    // ── East Asia – South Korea & China ──────────────────────────────────────
    {
        code: "ICN",
        name: "Incheon International Airport",
        city: "Seoul",
        country: "South Korea"
    },
    {
        code: "GMP",
        name: "Gimpo International Airport",
        city: "Seoul",
        country: "South Korea"
    },
    {
        code: "PUS",
        name: "Gimhae International Airport",
        city: "Busan",
        country: "South Korea"
    },
    {
        code: "CJU",
        name: "Jeju International Airport",
        city: "Jeju",
        country: "South Korea"
    },
    {
        code: "PEK",
        name: "Beijing Capital International Airport",
        city: "Beijing",
        country: "China"
    },
    {
        code: "PKX",
        name: "Beijing Daxing International Airport",
        city: "Beijing",
        country: "China"
    },
    {
        code: "PVG",
        name: "Shanghai Pudong International Airport",
        city: "Shanghai",
        country: "China"
    },
    {
        code: "SHA",
        name: "Shanghai Hongqiao International Airport",
        city: "Shanghai",
        country: "China"
    },
    {
        code: "CAN",
        name: "Guangzhou Baiyun International Airport",
        city: "Guangzhou",
        country: "China"
    },
    {
        code: "SZX",
        name: "Shenzhen Bao'an International Airport",
        city: "Shenzhen",
        country: "China"
    },
    {
        code: "CTU",
        name: "Chengdu Tianfu International Airport",
        city: "Chengdu",
        country: "China"
    },
    {
        code: "CKG",
        name: "Chongqing Jiangbei International Airport",
        city: "Chongqing",
        country: "China"
    },
    {
        code: "KMG",
        name: "Kunming Changshui International Airport",
        city: "Kunming",
        country: "China"
    },
    {
        code: "WUH",
        name: "Wuhan Tianhe International Airport",
        city: "Wuhan",
        country: "China"
    },
    {
        code: "XIY",
        name: "Xi'an Xianyang International Airport",
        city: "Xi'an",
        country: "China"
    },
    {
        code: "HKG",
        name: "Hong Kong International Airport",
        city: "Hong Kong",
        country: "Hong Kong"
    },
    {
        code: "MFM",
        name: "Macau International Airport",
        city: "Macau",
        country: "Macau"
    },
    {
        code: "TPE",
        name: "Taoyuan International Airport",
        city: "Taipei",
        country: "Taiwan"
    },
    {
        code: "KHH",
        name: "Kaohsiung International Airport",
        city: "Kaohsiung",
        country: "Taiwan"
    },
    {
        code: "NKG",
        name: "Nanjing Lukou International Airport",
        city: "Nanjing",
        country: "China"
    },
    {
        code: "HGH",
        name: "Hangzhou Xiaoshan International Airport",
        city: "Hangzhou",
        country: "China"
    },
    {
        code: "XMN",
        name: "Xiamen Gaoqi International Airport",
        city: "Xiamen",
        country: "China"
    },
    {
        code: "FOC",
        name: "Fuzhou Changle International Airport",
        city: "Fuzhou",
        country: "China"
    },
    {
        code: "CSX",
        name: "Changsha Huanghua International Airport",
        city: "Changsha",
        country: "China"
    },
    {
        code: "HAK",
        name: "Haikou Meilan International Airport",
        city: "Haikou",
        country: "China"
    },
    {
        code: "SYX",
        name: "Sanya Phoenix International Airport",
        city: "Sanya",
        country: "China"
    },
    {
        code: "TSN",
        name: "Tianjin Binhai International Airport",
        city: "Tianjin",
        country: "China"
    },
    {
        code: "TAO",
        name: "Qingdao Jiaodong International Airport",
        city: "Qingdao",
        country: "China"
    },
    {
        code: "SHE",
        name: "Shenyang Taoxian International Airport",
        city: "Shenyang",
        country: "China"
    },
    {
        code: "HRB",
        name: "Harbin Taiping International Airport",
        city: "Harbin",
        country: "China"
    },
    {
        code: "CGO",
        name: "Zhengzhou Xinzheng International Airport",
        city: "Zhengzhou",
        country: "China"
    },
    {
        code: "TNA",
        name: "Jinan Yaoqiang International Airport",
        city: "Jinan",
        country: "China"
    },
    {
        code: "URC",
        name: "Ürümqi Diwopu International Airport",
        city: "Ürümqi",
        country: "China"
    },
    {
        code: "LHW",
        name: "Lanzhou Zhongchuan International Airport",
        city: "Lanzhou",
        country: "China"
    },
    // ── South & Southeast Asia – India ───────────────────────────────────────
    {
        code: "DEL",
        name: "Indira Gandhi International Airport",
        city: "New Delhi",
        country: "India"
    },
    {
        code: "BOM",
        name: "Chhatrapati Shivaji Maharaj International",
        city: "Mumbai",
        country: "India"
    },
    {
        code: "BLR",
        name: "Kempegowda International Airport",
        city: "Bengaluru",
        country: "India"
    },
    {
        code: "MAA",
        name: "Chennai International Airport",
        city: "Chennai",
        country: "India"
    },
    {
        code: "CCU",
        name: "Netaji Subhash Chandra Bose International",
        city: "Kolkata",
        country: "India"
    },
    {
        code: "HYD",
        name: "Rajiv Gandhi International Airport",
        city: "Hyderabad",
        country: "India"
    },
    {
        code: "AMD",
        name: "Sardar Vallabhbhai Patel International",
        city: "Ahmedabad",
        country: "India"
    },
    {
        code: "COK",
        name: "Cochin International Airport",
        city: "Kochi",
        country: "India"
    },
    {
        code: "GOI",
        name: "Dabolim Airport",
        city: "Goa",
        country: "India"
    },
    {
        code: "PNQ",
        name: "Pune Airport",
        city: "Pune",
        country: "India"
    },
    {
        code: "JAI",
        name: "Jaipur International Airport",
        city: "Jaipur",
        country: "India"
    },
    {
        code: "LKO",
        name: "Chaudhary Charan Singh International",
        city: "Lucknow",
        country: "India"
    },
    {
        code: "ATQ",
        name: "Sri Guru Ram Dass Jee International",
        city: "Amritsar",
        country: "India"
    },
    {
        code: "IDR",
        name: "Devi Ahilya Bai Holkar Airport",
        city: "Indore",
        country: "India"
    },
    {
        code: "NAG",
        name: "Dr. Babasaheb Ambedkar International",
        city: "Nagpur",
        country: "India"
    },
    {
        code: "BBI",
        name: "Biju Patnaik International Airport",
        city: "Bhubaneswar",
        country: "India"
    },
    {
        code: "GAU",
        name: "Lokpriya Gopinath Bordoloi International",
        city: "Guwahati",
        country: "India"
    },
    {
        code: "IXC",
        name: "Chandigarh International Airport",
        city: "Chandigarh",
        country: "India"
    },
    {
        code: "SXR",
        name: "Sheikh ul-Alam International Airport",
        city: "Srinagar",
        country: "India"
    },
    {
        code: "PAT",
        name: "Jay Prakash Narayan International Airport",
        city: "Patna",
        country: "India"
    },
    {
        code: "VNS",
        name: "Lal Bahadur Shastri International Airport",
        city: "Varanasi",
        country: "India"
    },
    {
        code: "TRZ",
        name: "Tiruchirappalli International Airport",
        city: "Tiruchirappalli",
        country: "India"
    },
    {
        code: "CJB",
        name: "Coimbatore International Airport",
        city: "Coimbatore",
        country: "India"
    },
    {
        code: "IXM",
        name: "Madurai Airport",
        city: "Madurai",
        country: "India"
    },
    {
        code: "UDR",
        name: "Maharana Pratap Airport",
        city: "Udaipur",
        country: "India"
    },
    {
        code: "JDH",
        name: "Jodhpur Airport",
        city: "Jodhpur",
        country: "India"
    },
    {
        code: "BHO",
        name: "Raja Bhoj Airport",
        city: "Bhopal",
        country: "India"
    },
    {
        code: "RPR",
        name: "Swami Vivekananda Airport",
        city: "Raipur",
        country: "India"
    },
    {
        code: "IXZ",
        name: "Veer Savarkar International Airport",
        city: "Port Blair",
        country: "India"
    },
    {
        code: "IXB",
        name: "Bagdogra Airport",
        city: "Bagdogra",
        country: "India"
    },
    {
        code: "RAJ",
        name: "Rajkot Airport",
        city: "Rajkot",
        country: "India"
    },
    {
        code: "IXJ",
        name: "Jammu Airport",
        city: "Jammu",
        country: "India"
    },
    // ── South Asia – other ────────────────────────────────────────────────────
    {
        code: "CMB",
        name: "Bandaranaike International Airport",
        city: "Colombo",
        country: "Sri Lanka"
    },
    {
        code: "HRI",
        name: "Mattala Rajapaksa International",
        city: "Hambantota",
        country: "Sri Lanka"
    },
    {
        code: "DAC",
        name: "Hazrat Shahjalal International Airport",
        city: "Dhaka",
        country: "Bangladesh"
    },
    {
        code: "CGP",
        name: "Shah Amanat International Airport",
        city: "Chittagong",
        country: "Bangladesh"
    },
    {
        code: "KTM",
        name: "Tribhuvan International Airport",
        city: "Kathmandu",
        country: "Nepal"
    },
    {
        code: "ISB",
        name: "Islamabad International Airport",
        city: "Islamabad",
        country: "Pakistan"
    },
    {
        code: "KHI",
        name: "Jinnah International Airport",
        city: "Karachi",
        country: "Pakistan"
    },
    {
        code: "LHE",
        name: "Allama Iqbal International Airport",
        city: "Lahore",
        country: "Pakistan"
    },
    {
        code: "PEW",
        name: "Bacha Khan International Airport",
        city: "Peshawar",
        country: "Pakistan"
    },
    {
        code: "MLE",
        name: "Velana International Airport",
        city: "Malé",
        country: "Maldives"
    },
    {
        code: "PBH",
        name: "Paro Airport",
        city: "Paro",
        country: "Bhutan"
    },
    // ── Southeast Asia – Singapore, Malaysia & Brunei ─────────────────────────
    {
        code: "SIN",
        name: "Singapore Changi Airport",
        city: "Singapore",
        country: "Singapore"
    },
    {
        code: "KUL",
        name: "Kuala Lumpur International Airport",
        city: "Kuala Lumpur",
        country: "Malaysia"
    },
    {
        code: "PEN",
        name: "Penang International Airport",
        city: "Penang",
        country: "Malaysia"
    },
    {
        code: "BKI",
        name: "Kota Kinabalu International Airport",
        city: "Kota Kinabalu",
        country: "Malaysia"
    },
    {
        code: "KCH",
        name: "Kuching International Airport",
        city: "Kuching",
        country: "Malaysia"
    },
    {
        code: "LGK",
        name: "Langkawi International Airport",
        city: "Langkawi",
        country: "Malaysia"
    },
    {
        code: "JHB",
        name: "Senai International Airport",
        city: "Johor Bahru",
        country: "Malaysia"
    },
    {
        code: "MYY",
        name: "Miri Airport",
        city: "Miri",
        country: "Malaysia"
    },
    {
        code: "SDK",
        name: "Sandakan Airport",
        city: "Sandakan",
        country: "Malaysia"
    },
    {
        code: "BWN",
        name: "Brunei International Airport",
        city: "Bandar Seri Begawan",
        country: "Brunei"
    },
    // ── Southeast Asia – Thailand ─────────────────────────────────────────────
    {
        code: "BKK",
        name: "Suvarnabhumi Airport",
        city: "Bangkok",
        country: "Thailand"
    },
    {
        code: "DMK",
        name: "Don Mueang International Airport",
        city: "Bangkok",
        country: "Thailand"
    },
    {
        code: "HKT",
        name: "Phuket International Airport",
        city: "Phuket",
        country: "Thailand"
    },
    {
        code: "CNX",
        name: "Chiang Mai International Airport",
        city: "Chiang Mai",
        country: "Thailand"
    },
    {
        code: "USM",
        name: "Samui Airport",
        city: "Koh Samui",
        country: "Thailand"
    },
    {
        code: "HDY",
        name: "Hat Yai International Airport",
        city: "Hat Yai",
        country: "Thailand"
    },
    {
        code: "CEI",
        name: "Chiang Rai International Airport",
        city: "Chiang Rai",
        country: "Thailand"
    },
    {
        code: "KBV",
        name: "Krabi Airport",
        city: "Krabi",
        country: "Thailand"
    },
    {
        code: "UTP",
        name: "U-Tapao International Airport",
        city: "Pattaya",
        country: "Thailand"
    },
    // ── Southeast Asia – Indonesia ────────────────────────────────────────────
    {
        code: "CGK",
        name: "Soekarno-Hatta International Airport",
        city: "Jakarta",
        country: "Indonesia"
    },
    {
        code: "DPS",
        name: "Ngurah Rai International Airport",
        city: "Denpasar",
        country: "Indonesia"
    },
    {
        code: "SUB",
        name: "Juanda International Airport",
        city: "Surabaya",
        country: "Indonesia"
    },
    {
        code: "KNO",
        name: "Kualanamu International Airport",
        city: "Medan",
        country: "Indonesia"
    },
    {
        code: "UPG",
        name: "Sultan Hasanuddin International Airport",
        city: "Makassar",
        country: "Indonesia"
    },
    {
        code: "BPN",
        name: "Sultan Aji Muhammad Sulaiman Airport",
        city: "Balikpapan",
        country: "Indonesia"
    },
    {
        code: "JOG",
        name: "Adisutjipto International Airport",
        city: "Yogyakarta",
        country: "Indonesia"
    },
    {
        code: "SOC",
        name: "Adisumarmo International Airport",
        city: "Solo",
        country: "Indonesia"
    },
    {
        code: "PLM",
        name: "Sultan Mahmud Badaruddin II Airport",
        city: "Palembang",
        country: "Indonesia"
    },
    {
        code: "PDG",
        name: "Minangkabau International Airport",
        city: "Padang",
        country: "Indonesia"
    },
    {
        code: "BTH",
        name: "Hang Nadim International Airport",
        city: "Batam",
        country: "Indonesia"
    },
    {
        code: "LOP",
        name: "Lombok International Airport",
        city: "Lombok",
        country: "Indonesia"
    },
    {
        code: "AMQ",
        name: "Pattimura Airport",
        city: "Ambon",
        country: "Indonesia"
    },
    {
        code: "MDC",
        name: "Sam Ratulangi International Airport",
        city: "Manado",
        country: "Indonesia"
    },
    {
        code: "DJJ",
        name: "Sentani International Airport",
        city: "Jayapura",
        country: "Indonesia"
    },
    // ── Southeast Asia – Philippines ──────────────────────────────────────────
    {
        code: "MNL",
        name: "Ninoy Aquino International Airport",
        city: "Manila",
        country: "Philippines"
    },
    {
        code: "CEB",
        name: "Mactan-Cebu International Airport",
        city: "Cebu",
        country: "Philippines"
    },
    {
        code: "DVO",
        name: "Francisco Bangoy International Airport",
        city: "Davao",
        country: "Philippines"
    },
    {
        code: "ILO",
        name: "Iloilo International Airport",
        city: "Iloilo",
        country: "Philippines"
    },
    {
        code: "KLO",
        name: "Kalibo International Airport",
        city: "Kalibo",
        country: "Philippines"
    },
    {
        code: "PPS",
        name: "Puerto Princesa International Airport",
        city: "Puerto Princesa",
        country: "Philippines"
    },
    {
        code: "BCD",
        name: "Bacolod-Silay Airport",
        city: "Bacolod",
        country: "Philippines"
    },
    {
        code: "GES",
        name: "General Santos International Airport",
        city: "General Santos",
        country: "Philippines"
    },
    // ── Southeast Asia – Vietnam ──────────────────────────────────────────────
    {
        code: "HAN",
        name: "Noi Bai International Airport",
        city: "Hanoi",
        country: "Vietnam"
    },
    {
        code: "SGN",
        name: "Tan Son Nhat International Airport",
        city: "Ho Chi Minh City",
        country: "Vietnam"
    },
    {
        code: "DAD",
        name: "Da Nang International Airport",
        city: "Da Nang",
        country: "Vietnam"
    },
    {
        code: "CXR",
        name: "Cam Ranh International Airport",
        city: "Nha Trang",
        country: "Vietnam"
    },
    {
        code: "PQC",
        name: "Phu Quoc International Airport",
        city: "Phu Quoc",
        country: "Vietnam"
    },
    {
        code: "HUI",
        name: "Phu Bai International Airport",
        city: "Hue",
        country: "Vietnam"
    },
    {
        code: "VDH",
        name: "Dong Hoi Airport",
        city: "Dong Hoi",
        country: "Vietnam"
    },
    {
        code: "VCA",
        name: "Can Tho International Airport",
        city: "Can Tho",
        country: "Vietnam"
    },
    // ── Southeast Asia – Myanmar, Cambodia, Laos & Timor ─────────────────────
    {
        code: "RGN",
        name: "Yangon International Airport",
        city: "Yangon",
        country: "Myanmar"
    },
    {
        code: "MDL",
        name: "Mandalay International Airport",
        city: "Mandalay",
        country: "Myanmar"
    },
    {
        code: "NYT",
        name: "Naypyidaw International Airport",
        city: "Naypyidaw",
        country: "Myanmar"
    },
    {
        code: "PNH",
        name: "Phnom Penh International Airport",
        city: "Phnom Penh",
        country: "Cambodia"
    },
    {
        code: "REP",
        name: "Siem Reap-Angkor International Airport",
        city: "Siem Reap",
        country: "Cambodia"
    },
    {
        code: "VTE",
        name: "Wattay International Airport",
        city: "Vientiane",
        country: "Laos"
    },
    {
        code: "LPQ",
        name: "Luang Prabang International Airport",
        city: "Luang Prabang",
        country: "Laos"
    },
    {
        code: "DIL",
        name: "Presidente Nicolau Lobato International",
        city: "Dili",
        country: "Timor-Leste"
    },
    // ── Oceania – Australia ───────────────────────────────────────────────────
    {
        code: "SYD",
        name: "Sydney Kingsford Smith Airport",
        city: "Sydney",
        country: "Australia"
    },
    {
        code: "MEL",
        name: "Melbourne Airport",
        city: "Melbourne",
        country: "Australia"
    },
    {
        code: "BNE",
        name: "Brisbane Airport",
        city: "Brisbane",
        country: "Australia"
    },
    {
        code: "PER",
        name: "Perth Airport",
        city: "Perth",
        country: "Australia"
    },
    {
        code: "ADL",
        name: "Adelaide Airport",
        city: "Adelaide",
        country: "Australia"
    },
    {
        code: "OOL",
        name: "Gold Coast Airport",
        city: "Gold Coast",
        country: "Australia"
    },
    {
        code: "CNS",
        name: "Cairns Airport",
        city: "Cairns",
        country: "Australia"
    },
    {
        code: "DRW",
        name: "Darwin International Airport",
        city: "Darwin",
        country: "Australia"
    },
    {
        code: "HBA",
        name: "Hobart International Airport",
        city: "Hobart",
        country: "Australia"
    },
    {
        code: "TSV",
        name: "Townsville Airport",
        city: "Townsville",
        country: "Australia"
    },
    // ── Oceania – New Zealand & Pacific ──────────────────────────────────────
    {
        code: "AKL",
        name: "Auckland Airport",
        city: "Auckland",
        country: "New Zealand"
    },
    {
        code: "WLG",
        name: "Wellington International Airport",
        city: "Wellington",
        country: "New Zealand"
    },
    {
        code: "CHC",
        name: "Christchurch International Airport",
        city: "Christchurch",
        country: "New Zealand"
    },
    {
        code: "DUD",
        name: "Dunedin International Airport",
        city: "Dunedin",
        country: "New Zealand"
    },
    {
        code: "HLZ",
        name: "Hamilton Airport",
        city: "Hamilton",
        country: "New Zealand"
    },
    {
        code: "NAN",
        name: "Nadi International Airport",
        city: "Nadi",
        country: "Fiji"
    },
    {
        code: "SUV",
        name: "Nausori International Airport",
        city: "Suva",
        country: "Fiji"
    },
    {
        code: "PPT",
        name: "Faa'a International Airport",
        city: "Papeete",
        country: "French Polynesia"
    },
    {
        code: "APW",
        name: "Faleolo International Airport",
        city: "Apia",
        country: "Samoa"
    },
    {
        code: "TBU",
        name: "Fua'amotu International Airport",
        city: "Nuku'alofa",
        country: "Tonga"
    },
    {
        code: "HIR",
        name: "Honiara International Airport",
        city: "Honiara",
        country: "Solomon Islands"
    },
    {
        code: "POM",
        name: "Jacksons International Airport",
        city: "Port Moresby",
        country: "Papua New Guinea"
    },
    {
        code: "VLI",
        name: "Bauerfield International Airport",
        city: "Port Vila",
        country: "Vanuatu"
    },
    {
        code: "GUM",
        name: "Antonio B. Won Pat International Airport",
        city: "Hagåtña",
        country: "Guam"
    },
    {
        code: "PPG",
        name: "Pago Pago International Airport",
        city: "Pago Pago",
        country: "American Samoa"
    },
    {
        code: "INU",
        name: "Nauru International Airport",
        city: "Nauru",
        country: "Nauru"
    },
    {
        code: "TRW",
        name: "Bonriki International Airport",
        city: "Tarawa",
        country: "Kiribati"
    }
];
}),
"[project]/Flight-app/flight-finder/src/data/countryGeo.json.[json].cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = JSON.parse("{\"Albania\":{\"continent\":\"Europe\",\"region\":\"Balkans\"},\"Algeria\":{\"continent\":\"Africa\",\"region\":\"North Africa\"},\"American Samoa\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Angola\":{\"continent\":\"Africa\",\"region\":\"Central Africa\"},\"Antigua and Barbuda\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Argentina\":{\"continent\":\"South America\",\"region\":\"Southern Cone\"},\"Armenia\":{\"continent\":\"Asia\",\"region\":\"West Asia\"},\"Australia\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Austria\":{\"continent\":\"Europe\",\"region\":\"Central Europe\"},\"Azerbaijan\":{\"continent\":\"Asia\",\"region\":\"West Asia\"},\"Bahamas\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Bahrain\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"Bangladesh\":{\"continent\":\"Asia\",\"region\":\"South Asia\"},\"Barbados\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Belgium\":{\"continent\":\"Europe\",\"region\":\"Western Europe\"},\"Belize\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Benin\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Bhutan\":{\"continent\":\"Asia\",\"region\":\"South Asia\"},\"Bolivia\":{\"continent\":\"South America\",\"region\":\"Andean\"},\"Bosnia and Herzegovina\":{\"continent\":\"Europe\",\"region\":\"Balkans\"},\"Botswana\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"Brazil\":{\"continent\":\"South America\",\"region\":\"Southern Cone\"},\"Brunei\":{\"continent\":\"Asia\",\"region\":\"Southeast Asia\"},\"Bulgaria\":{\"continent\":\"Europe\",\"region\":\"Eastern Europe\"},\"Burkina Faso\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Burundi\":{\"continent\":\"Africa\",\"region\":\"East Africa\"},\"Cambodia\":{\"continent\":\"Asia\",\"region\":\"Southeast Asia\"},\"Cameroon\":{\"continent\":\"Africa\",\"region\":\"Central Africa\"},\"Canada\":{\"continent\":\"North America\",\"region\":\"North America\"},\"Cape Verde\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Cayman Islands\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Chad\":{\"continent\":\"Africa\",\"region\":\"Africa (other)\"},\"Chile\":{\"continent\":\"South America\",\"region\":\"Southern Cone\"},\"China\":{\"continent\":\"Asia\",\"region\":\"East Asia\"},\"Colombia\":{\"continent\":\"South America\",\"region\":\"Andean\"},\"Costa Rica\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Croatia\":{\"continent\":\"Europe\",\"region\":\"Balkans\"},\"Cuba\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Cyprus\":{\"continent\":\"Europe\",\"region\":\"Southern Europe\"},\"Czech Republic\":{\"continent\":\"Europe\",\"region\":\"Eastern Europe\"},\"Côte d'Ivoire\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"DR Congo\":{\"continent\":\"Africa\",\"region\":\"Central Africa\"},\"Denmark\":{\"continent\":\"Europe\",\"region\":\"Northern Europe\"},\"Djibouti\":{\"continent\":\"Africa\",\"region\":\"East Africa\"},\"Dominican Republic\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Ecuador\":{\"continent\":\"South America\",\"region\":\"Andean\"},\"Egypt\":{\"continent\":\"Africa\",\"region\":\"North Africa\"},\"El Salvador\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Equatorial Guinea\":{\"continent\":\"Africa\",\"region\":\"Central Africa\"},\"Eritrea\":{\"continent\":\"Africa\",\"region\":\"East Africa\"},\"Estonia\":{\"continent\":\"Europe\",\"region\":\"Baltics\"},\"Eswatini\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"Ethiopia\":{\"continent\":\"Africa\",\"region\":\"East Africa\"},\"Fiji\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Finland\":{\"continent\":\"Europe\",\"region\":\"Northern Europe\"},\"France\":{\"continent\":\"Europe\",\"region\":\"Western Europe\"},\"French Guiana\":{\"continent\":\"South America\",\"region\":\"South America (other)\"},\"French Polynesia\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Gabon\":{\"continent\":\"Africa\",\"region\":\"Central Africa\"},\"Gambia\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Georgia\":{\"continent\":\"Asia\",\"region\":\"West Asia\"},\"Germany\":{\"continent\":\"Europe\",\"region\":\"Central Europe\"},\"Ghana\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Greece\":{\"continent\":\"Europe\",\"region\":\"Southern Europe\"},\"Guam\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Guatemala\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Guinea\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Guinea-Bissau\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Guyana\":{\"continent\":\"South America\",\"region\":\"South America (other)\"},\"Honduras\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Hong Kong\":{\"continent\":\"Asia\",\"region\":\"East Asia\"},\"Hungary\":{\"continent\":\"Europe\",\"region\":\"Eastern Europe\"},\"India\":{\"continent\":\"Asia\",\"region\":\"South Asia\"},\"Indonesia\":{\"continent\":\"Asia\",\"region\":\"Southeast Asia\"},\"Iran\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"Iraq\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"Ireland\":{\"continent\":\"Europe\",\"region\":\"Western Europe\"},\"Israel\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"Italy\":{\"continent\":\"Europe\",\"region\":\"Southern Europe\"},\"Jamaica\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Japan\":{\"continent\":\"Asia\",\"region\":\"East Asia\"},\"Jordan\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"Kazakhstan\":{\"continent\":\"Asia\",\"region\":\"Central Asia\"},\"Kenya\":{\"continent\":\"Africa\",\"region\":\"East Africa\"},\"Kiribati\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Kuwait\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"Kyrgyzstan\":{\"continent\":\"Asia\",\"region\":\"Central Asia\"},\"Laos\":{\"continent\":\"Asia\",\"region\":\"Southeast Asia\"},\"Latvia\":{\"continent\":\"Europe\",\"region\":\"Baltics\"},\"Lebanon\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"Lesotho\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"Liberia\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Libya\":{\"continent\":\"Africa\",\"region\":\"North Africa\"},\"Lithuania\":{\"continent\":\"Europe\",\"region\":\"Baltics\"},\"Luxembourg\":{\"continent\":\"Europe\",\"region\":\"Western Europe\"},\"Macau\":{\"continent\":\"Asia\",\"region\":\"East Asia\"},\"Madagascar\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"Malawi\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"Malaysia\":{\"continent\":\"Asia\",\"region\":\"Southeast Asia\"},\"Maldives\":{\"continent\":\"Asia\",\"region\":\"South Asia\"},\"Mali\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Malta\":{\"continent\":\"Europe\",\"region\":\"Southern Europe\"},\"Mauritania\":{\"continent\":\"Africa\",\"region\":\"Africa (other)\"},\"Mauritius\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"Mayotte\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"Mexico\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Mongolia\":{\"continent\":\"Asia\",\"region\":\"East Asia\"},\"Montenegro\":{\"continent\":\"Europe\",\"region\":\"Balkans\"},\"Morocco\":{\"continent\":\"Africa\",\"region\":\"North Africa\"},\"Mozambique\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"Myanmar\":{\"continent\":\"Asia\",\"region\":\"Southeast Asia\"},\"Namibia\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"Nauru\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Nepal\":{\"continent\":\"Asia\",\"region\":\"South Asia\"},\"Netherlands\":{\"continent\":\"Europe\",\"region\":\"Western Europe\"},\"New Zealand\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Nicaragua\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Niger\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Nigeria\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"North Macedonia\":{\"continent\":\"Europe\",\"region\":\"Balkans\"},\"Norway\":{\"continent\":\"Europe\",\"region\":\"Northern Europe\"},\"Oman\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"Pakistan\":{\"continent\":\"Asia\",\"region\":\"South Asia\"},\"Panama\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Papua New Guinea\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Paraguay\":{\"continent\":\"South America\",\"region\":\"Southern Cone\"},\"Peru\":{\"continent\":\"South America\",\"region\":\"Andean\"},\"Philippines\":{\"continent\":\"Asia\",\"region\":\"Southeast Asia\"},\"Poland\":{\"continent\":\"Europe\",\"region\":\"Eastern Europe\"},\"Portugal\":{\"continent\":\"Europe\",\"region\":\"Southern Europe\"},\"Puerto Rico\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Qatar\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"Republic of Congo\":{\"continent\":\"Africa\",\"region\":\"Central Africa\"},\"Romania\":{\"continent\":\"Europe\",\"region\":\"Eastern Europe\"},\"Russia\":{\"continent\":\"Europe\",\"region\":\"Eastern Europe\"},\"Rwanda\":{\"continent\":\"Africa\",\"region\":\"East Africa\"},\"Réunion\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"Saint Lucia\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Samoa\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Saudi Arabia\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"Senegal\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Serbia\":{\"continent\":\"Europe\",\"region\":\"Balkans\"},\"Seychelles\":{\"continent\":\"Africa\",\"region\":\"Africa (other)\"},\"Sierra Leone\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Singapore\":{\"continent\":\"Asia\",\"region\":\"Southeast Asia\"},\"Slovenia\":{\"continent\":\"Europe\",\"region\":\"Balkans\"},\"Solomon Islands\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Somalia\":{\"continent\":\"Africa\",\"region\":\"East Africa\"},\"South Africa\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"South Korea\":{\"continent\":\"Asia\",\"region\":\"East Asia\"},\"Spain\":{\"continent\":\"Europe\",\"region\":\"Southern Europe\"},\"Sri Lanka\":{\"continent\":\"Asia\",\"region\":\"South Asia\"},\"Sudan\":{\"continent\":\"Africa\",\"region\":\"East Africa\"},\"Suriname\":{\"continent\":\"South America\",\"region\":\"South America (other)\"},\"Sweden\":{\"continent\":\"Europe\",\"region\":\"Northern Europe\"},\"Switzerland\":{\"continent\":\"Europe\",\"region\":\"Central Europe\"},\"Syria\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"São Tomé and Príncipe\":{\"continent\":\"Africa\",\"region\":\"Central Africa\"},\"Taiwan\":{\"continent\":\"Asia\",\"region\":\"East Asia\"},\"Tajikistan\":{\"continent\":\"Asia\",\"region\":\"Central Asia\"},\"Tanzania\":{\"continent\":\"Africa\",\"region\":\"East Africa\"},\"Thailand\":{\"continent\":\"Asia\",\"region\":\"Southeast Asia\"},\"Timor-Leste\":{\"continent\":\"Asia\",\"region\":\"Southeast Asia\"},\"Togo\":{\"continent\":\"Africa\",\"region\":\"West Africa\"},\"Tonga\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Trinidad and Tobago\":{\"continent\":\"North America\",\"region\":\"Mexico & Central America\"},\"Tunisia\":{\"continent\":\"Africa\",\"region\":\"North Africa\"},\"Turkey\":{\"continent\":\"Asia\",\"region\":\"West Asia\"},\"Turkmenistan\":{\"continent\":\"Asia\",\"region\":\"Central Asia\"},\"Uganda\":{\"continent\":\"Africa\",\"region\":\"East Africa\"},\"Ukraine\":{\"continent\":\"Europe\",\"region\":\"Eastern Europe\"},\"United Arab Emirates\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"United Kingdom\":{\"continent\":\"Europe\",\"region\":\"Western Europe\"},\"United States\":{\"continent\":\"North America\",\"region\":\"North America\"},\"Uruguay\":{\"continent\":\"South America\",\"region\":\"Southern Cone\"},\"Uzbekistan\":{\"continent\":\"Asia\",\"region\":\"Central Asia\"},\"Vanuatu\":{\"continent\":\"Oceania\",\"region\":\"Oceania\"},\"Venezuela\":{\"continent\":\"South America\",\"region\":\"Andean\"},\"Vietnam\":{\"continent\":\"Asia\",\"region\":\"Southeast Asia\"},\"Yemen\":{\"continent\":\"Asia\",\"region\":\"Middle East\"},\"Zambia\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"},\"Zimbabwe\":{\"continent\":\"Africa\",\"region\":\"Southern Africa\"}}");
}),
"[project]/Flight-app/flight-finder/src/data/hubCodes.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Major international / high-connectivity airports used for "Worldwide (hubs)"
 * and prioritization when a continent search exceeds the per-request cap.
 */ __turbopack_context__.s([
    "HUB_CODES",
    ()=>HUB_CODES
]);
const HUB_CODES = new Set([
    // Africa
    "JNB",
    "CPT",
    "CAI",
    "CMN",
    "ADD",
    "NBO",
    "LOS",
    "ACC",
    "DKR",
    "TUN",
    "ALG",
    "DAR",
    "KGL",
    "EBB",
    // Asia — East & SEA
    "NRT",
    "HND",
    "ICN",
    "PEK",
    "PKX",
    "PVG",
    "CAN",
    "SZX",
    "HKG",
    "TPE",
    "SIN",
    "BKK",
    "KUL",
    "CGK",
    "DPS",
    "MNL",
    "HAN",
    "SGN",
    "PNH",
    // Asia — South
    "DEL",
    "BOM",
    "BLR",
    "MAA",
    "HYD",
    "CCU",
    "CMB",
    "KTM",
    // Asia — Middle East
    "DXB",
    "AUH",
    "DOH",
    "RUH",
    "JED",
    "BAH",
    "KWI",
    "MCT",
    "TLV",
    "AMM",
    "BEY",
    "IKA",
    // Asia — Central / West
    "IST",
    "ALA",
    "NQZ",
    "TAS",
    // Europe — Western & Central
    "LHR",
    "LGW",
    "CDG",
    "ORY",
    "AMS",
    "FRA",
    "MUC",
    "ZRH",
    "GVA",
    "VIE",
    "BRU",
    "DUB",
    "LUX",
    // Europe — Southern
    "MAD",
    "BCN",
    "LIS",
    "OPO",
    "FCO",
    "MXP",
    "ATH",
    "PMI",
    // Europe — Northern & UK regional
    "CPH",
    "ARN",
    "OSL",
    "HEL",
    "MAN",
    "EDI",
    "BHX",
    "GLA",
    // Europe — Eastern
    "WAW",
    "KRK",
    "PRG",
    "BUD",
    "OTP",
    "SOF",
    "ZAG",
    "BEG",
    "KBP",
    "RIX",
    "TLL",
    "VNO",
    "SVO",
    "LED",
    // North America
    "JFK",
    "EWR",
    "LAX",
    "SFO",
    "ORD",
    "ATL",
    "DFW",
    "DEN",
    "SEA",
    "MIA",
    "BOS",
    "IAD",
    "YYZ",
    "YVR",
    "YUL",
    "MEX",
    "CUN",
    "GDL",
    // South America
    "GRU",
    "GIG",
    "EZE",
    "SCL",
    "LIM",
    "BOG",
    "UIO",
    // Oceania
    "SYD",
    "MEL",
    "BNE",
    "AKL",
    "CHC",
    "NAN",
    "PPT"
]);
}),
"[project]/Flight-app/flight-finder/src/data/searchDestinations.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_SEARCHABLE",
    ()=>ALL_SEARCHABLE,
    "CONTINENT_OPTIONS",
    ()=>CONTINENT_OPTIONS,
    "pickDestinationsForSearch",
    ()=>pickDestinationsForSearch,
    "regionsForContinent",
    ()=>regionsForContinent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$airports$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/data/airports.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$countryGeo$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/data/countryGeo.json.[json].cjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$hubCodes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/data/hubCodes.ts [app-route] (ecmascript)");
;
;
;
function geoForCountry(country) {
    const row = __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$countryGeo$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"][country];
    return row ?? {
        continent: "Other",
        region: "Other"
    };
}
function tierForCode(code) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$hubCodes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HUB_CODES"].has(code) ? "hub" : "regional";
}
const ALL_SEARCHABLE = __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$airports$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["airports"].map((a)=>{
    const { continent, region } = geoForCountry(a.country);
    return {
        code: a.code,
        city: a.city,
        country: a.country,
        continent,
        region,
        tier: tierForCode(a.code)
    };
});
const CONTINENT_OPTIONS = [
    {
        value: "worldwide",
        label: "Worldwide"
    },
    {
        value: "Europe",
        label: "Europe"
    },
    {
        value: "Asia",
        label: "Asia"
    },
    {
        value: "Africa",
        label: "Africa"
    },
    {
        value: "North America",
        label: "North America"
    },
    {
        value: "South America",
        label: "South America"
    },
    {
        value: "Oceania",
        label: "Oceania"
    }
];
function regionsForContinent(continent) {
    const set = new Set();
    for (const d of ALL_SEARCHABLE){
        if (d.continent === continent) set.add(d.region);
    }
    return [
        ...set
    ].sort((a, b)=>a.localeCompare(b));
}
function shuffleInPlace(arr) {
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [
            arr[j],
            arr[i]
        ];
    }
}
/** Group destinations; order of keys is not used for filtering. */ function bucketByKey(items, keyFn) {
    const map = new Map();
    for (const d of items){
        const k = keyFn(d);
        if (!map.has(k)) map.set(k, []);
        map.get(k).push(d);
    }
    return [
        ...map.values()
    ];
}
/**
 * Spread selections across buckets (e.g. continents) in round-robin order so a
 * hard cap does not skew toward the start of an alphabetical IATA-code sort.
 */ function pickRoundRobinFromBuckets(buckets, max) {
    const sorted = [
        ...buckets
    ].sort((a, b)=>{
        const ka = a[0] ? keyForSort(a[0]) : "";
        const kb = b[0] ? keyForSort(b[0]) : "";
        return ka.localeCompare(kb);
    });
    const out = [];
    let round = 0;
    while(out.length < max){
        let progress = false;
        for (const bucket of sorted){
            if (round < bucket.length) {
                out.push(bucket[round]);
                progress = true;
                if (out.length >= max) return out;
            }
        }
        if (!progress) break;
        round++;
    }
    return out;
}
function keyForSort(d) {
    return `${d.continent}\0${d.region}\0${d.code}`;
}
/**
 * When over `max`, pick a geographically diverse subset instead of the first
 * `max` rows by IATA code (which clusters on "A..." codes).
 */ function pickDiverseSubset(items, max, groupKey) {
    if (items.length <= max) return items;
    const buckets = bucketByKey(items, groupKey);
    for (const b of buckets){
        shuffleInPlace(b);
    }
    return pickRoundRobinFromBuckets(buckets, max);
}
function pickDestinationsForSearch(options) {
    let pool;
    if (options.continent === "worldwide") {
        pool = ALL_SEARCHABLE;
    } else {
        pool = ALL_SEARCHABLE.filter((d)=>d.continent === options.continent);
        if (options.region !== "any") {
            pool = pool.filter((d)=>d.region === options.region);
        }
    }
    if (pool.length <= options.max) return pool;
    if (options.continent === "worldwide") {
        return pickDiverseSubset(pool, options.max, (d)=>d.continent);
    }
    const hubs = pool.filter((d)=>d.tier === "hub");
    const regional = pool.filter((d)=>d.tier !== "hub");
    const hubPick = pickDiverseSubset(hubs, options.max, (d)=>d.region);
    if (hubPick.length >= options.max) return hubPick;
    const regPick = pickDiverseSubset(regional, options.max - hubPick.length, (d)=>d.region);
    return [
        ...hubPick,
        ...regPick
    ];
}
}),
"[project]/Flight-app/flight-finder/src/app/api/search/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$asyncPool$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/lib/asyncPool.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$airports$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/data/airports.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$countryGeo$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/data/countryGeo.json.[json].cjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$searchDestinations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/data/searchDestinations.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$hubCodes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Flight-app/flight-finder/src/data/hubCodes.ts [app-route] (ecmascript)");
;
;
;
;
;
;
const DETAIL_TOP_N = 5;
const DETAIL_CONCURRENCY = 2;
const DETAIL_TIMEOUT_MS = 2500;
const TRAVELPAYOUTS_TIMEOUT_MS = 1800;
const TRAVELPAYOUTS_MAX_RETRIES = 1;
const SERP_CANDIDATE_CONCURRENCY = 3;
const MAX_RESULTS = 100;
const DUFFEL_SUPPLEMENT_MAX_DESTINATIONS = 180;
const DUFFEL_SUPPLEMENT_FAST_DESTINATIONS = 20;
const DUFFEL_SUPPLEMENT_CONCURRENCY = 4;
const DUFFEL_OFFERS_LIMIT = 60;
const TRAVELPAYOUTS_SUPPLEMENT_MAX_DESTINATIONS = 120;
const TRAVELPAYOUTS_SUPPLEMENT_FAST_DESTINATIONS = 20;
const TRAVELPAYOUTS_SUPPLEMENT_CONCURRENCY = 6;
const FIRECRAWL_TIMEOUT_MS = 30000;
const FIRECRAWL_LIMIT_PER_SITE = 5;
const DUFFEL_FULL_BUDGET_MS = 12000;
const TRAVELPAYOUTS_FULL_BUDGET_MS = 8000;
const FAST_STAGE_MIN_PROVIDER_RESULTS = 4;
const DUFFEL_FAST_FIRST_PASS_DESTINATIONS = 8;
const TRAVELPAYOUTS_FAST_FIRST_PASS_DESTINATIONS = 8;
const SUPPLEMENT_FLEX_MAX_DATES = 5;
const SEARCH_CACHE_TTL_MS = 10 * 60 * 1000;
const SEARCH_CACHE_MAX_ENTRIES = 300;
const airportByCode = new Map(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$airports$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["airports"].map((a)=>[
        a.code.toUpperCase(),
        a
    ]));
const LOCAL_AIRLINE_LOGOS = {
    "qatar airways": "/airlines/qatar-airways.svg",
    emirates: "/airlines/emirates.svg",
    lufthansa: "/airlines/lufthansa.svg",
    "british airways": "/airlines/british-airways.svg",
    "air france": "/airlines/air-france.svg",
    klm: "/airlines/klm.svg",
    "turkish airlines": "/airlines/turkish-airlines.svg",
    "south african": "/airlines/south-african.svg",
    "air china": "/airlines/air-china.svg",
    "china eastern": "/airlines/china-eastern.svg",
    "china southern": "/airlines/china-southern.svg",
    "hainan airlines": "/airlines/hainan-airlines.svg",
    xiamenair: "/airlines/xiamenair.svg",
    "xiamen air": "/airlines/xiamenair.svg",
    "shenzhen airlines": "/airlines/shenzhen-airlines.svg",
    "sichuan airlines": "/airlines/sichuan-airlines.svg",
    "cathay pacific": "/airlines/cathay-pacific.svg",
    cathay: "/airlines/cathay-pacific.svg",
    "hong kong express": "/airlines/hk-express.svg",
    "hk express": "/airlines/hk-express.svg",
    "spring airlines": "/airlines/spring-airlines.svg",
    spring: "/airlines/spring-airlines.svg",
    airasia: "/airlines/airasia.svg",
    "air asia": "/airlines/airasia.svg",
    "indonesia airasia": "/airlines/airasia.svg",
    "thai airasia": "/airlines/airasia.svg",
    "philippines airasia": "/airlines/airasia.svg",
    "airasia x": "/airlines/airasia.svg"
};
/** Two-letter IATA (or digit+letter) → local `/public/airlines/*.svg` when name lookup misses. */ const AIRLINE_LOGO_BY_IATA = {
    CX: "/airlines/cathay-pacific.svg",
    UO: "/airlines/hk-express.svg",
    "9C": "/airlines/spring-airlines.svg",
    AK: "/airlines/airasia.svg",
    D7: "/airlines/airasia.svg",
    FD: "/airlines/airasia.svg",
    Z2: "/airlines/airasia.svg"
};
const AIRLINE_IATA_TO_NAME = {
    // Middle East / Africa
    EK: "Emirates",
    QR: "Qatar Airways",
    EY: "Etihad Airways",
    MS: "EgyptAir",
    ET: "Ethiopian Airlines",
    KQ: "Kenya Airways",
    AT: "Royal Air Maroc",
    WY: "Oman Air",
    SV: "Saudia",
    GF: "Gulf Air",
    ME: "Middle East Airlines",
    // Europe
    BA: "British Airways",
    LH: "Lufthansa",
    AF: "Air France",
    KL: "KLM",
    TK: "Turkish Airlines",
    LX: "SWISS",
    OS: "Austrian Airlines",
    SN: "Brussels Airlines",
    IB: "Iberia",
    VY: "Vueling",
    TP: "TAP Air Portugal",
    SK: "Scandinavian Airlines",
    AY: "Finnair",
    LO: "LOT Polish Airlines",
    OK: "Czech Airlines",
    OU: "Croatia Airlines",
    A3: "Aegean Airlines",
    AZ: "ITA Airways",
    FI: "Icelandair",
    EI: "Aer Lingus",
    // Americas
    B6: "JetBlue",
    NK: "Spirit Airlines",
    F9: "Frontier Airlines",
    AS: "Alaska Airlines",
    WS: "WestJet",
    AM: "Aeromexico",
    AV: "Avianca",
    CM: "Copa Airlines",
    LA: "LATAM Airlines",
    G3: "GOL",
    AD: "Azul",
    SA: "South African",
    FR: "Ryanair",
    U2: "easyJet",
    W6: "Wizz Air",
    VS: "Virgin Atlantic",
    UA: "United Airlines",
    DL: "Delta Air Lines",
    AA: "American Airlines",
    AC: "Air Canada",
    // Asia Pacific
    SQ: "Singapore Airlines",
    CX: "Cathay Pacific",
    NH: "All Nippon Airways",
    JL: "Japan Airlines",
    OZ: "Asiana Airlines",
    KE: "Korean Air",
    MU: "China Eastern",
    CZ: "China Southern",
    CA: "Air China",
    HU: "Hainan Airlines",
    MF: "XiamenAir",
    ZH: "Shenzhen Airlines",
    "3U": "Sichuan Airlines",
    FM: "Shanghai Airlines",
    GA: "Garuda Indonesia",
    MH: "Malaysia Airlines",
    TG: "Thai Airways",
    VN: "Vietnam Airlines",
    PR: "Philippine Airlines",
    QF: "Qantas",
    JQ: "Jetstar",
    VA: "Virgin Australia",
    NZ: "Air New Zealand",
    // India / low-cost global
    AI: "Air India",
    "6E": "IndiGo",
    UK: "Vistara",
    SG: "SpiceJet",
    // Common charter/unknown fallback examples
    DP: "Pobeda",
    S7: "S7 Airlines"
};
const responseCache = new Map();
const inFlight = new Map();
function pruneResponseCache(now = Date.now()) {
    for (const [key, entry] of responseCache){
        if (entry.expiresAt <= now) responseCache.delete(key);
    }
    while(responseCache.size > SEARCH_CACHE_MAX_ENTRIES){
        const oldestKey = responseCache.keys().next().value;
        if (!oldestKey) break;
        responseCache.delete(oldestKey);
    }
}
const ALLOWED_CONTINENTS = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$searchDestinations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CONTINENT_OPTIONS"].map((o)=>o.value));
function deriveDepartureDate(month) {
    if (!month || typeof month !== "string") return null;
    const m = month.trim();
    if (!/^\d{4}-\d{2}$/.test(m)) return null;
    return `${m}-01`;
}
function parseBudget(raw) {
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    if (typeof raw === "string") {
        const n = parseFloat(raw);
        if (Number.isFinite(n)) return n;
    }
    return null;
}
function shiftIsoDateByDays(iso, dayDelta) {
    const [y, m, d] = iso.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d + dayDelta));
    return date.toISOString().slice(0, 10);
}
function buildCandidateDates(baseIso, flexDays) {
    if (flexDays === 0) return [
        baseIso
    ];
    const out = [];
    for(let delta = -flexDays; delta <= flexDays; delta++){
        out.push(shiftIsoDateByDays(baseIso, delta));
    }
    return out;
}
function buildStagedCandidateDates(baseIso, flexDays, stage) {
    if (stage === "full" || flexDays <= 1) return buildCandidateDates(baseIso, flexDays);
    const candidates = new Set([
        baseIso,
        shiftIsoDateByDays(baseIso, -1),
        shiftIsoDateByDays(baseIso, 1)
    ]);
    return [
        ...candidates
    ].sort();
}
function pickSupplementCandidateDates(candidates, maxDates) {
    if (candidates.length <= maxDates) return candidates;
    const center = Math.floor(candidates.length / 2);
    const idx = new Set([
        0,
        center,
        candidates.length - 1
    ]);
    let step = 1;
    while(idx.size < maxDates){
        const left = center - step;
        const right = center + step;
        if (left >= 0) idx.add(left);
        if (idx.size >= maxDates) break;
        if (right < candidates.length) idx.add(right);
        if (left < 0 && right >= candidates.length) break;
        step++;
    }
    return [
        ...idx
    ].sort((a, b)=>a - b).map((i)=>candidates[i]);
}
function normalizedCacheKey(input) {
    return JSON.stringify(input);
}
function geoForAirportCode(code) {
    const airport = airportByCode.get(code.toUpperCase());
    if (!airport) return null;
    const row = __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$countryGeo$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"][airport.country];
    if (!row) return null;
    return {
        continent: row.continent,
        region: row.region
    };
}
function normalizeGeoKey(value) {
    return value.toLowerCase().normalize("NFKD").replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
}
const GEO_BY_COUNTRY = new Map(Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$countryGeo$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]).map(([country, geo])=>[
        normalizeGeoKey(country),
        {
            continent: geo.continent,
            region: geo.region
        }
    ]));
function geoForCountryName(country) {
    if (!country || typeof country !== "string") return null;
    return GEO_BY_COUNTRY.get(normalizeGeoKey(country)) ?? null;
}
function geoForDestinationCity(city, country) {
    if (!city || typeof city !== "string") return null;
    const normalizedCity = normalizeGeoKey(city);
    const normalizedCountry = country ? normalizeGeoKey(country) : null;
    for (const airport of __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$airports$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["airports"]){
        if (normalizeGeoKey(airport.city) !== normalizedCity) continue;
        if (normalizedCountry && normalizeGeoKey(airport.country) !== normalizedCountry) continue;
        const geo = geoForAirportCode(airport.code);
        if (geo) return geo;
    }
    return null;
}
function localLogoForAirline(name) {
    if (!name || typeof name !== "string") return null;
    const raw = name.trim();
    const key = raw.toLowerCase();
    const byName = LOCAL_AIRLINE_LOGOS[key];
    if (byName) return byName;
    const iata = asAirlineIataCode(raw);
    if (iata) {
        const byIata = AIRLINE_LOGO_BY_IATA[iata];
        if (byIata) return byIata;
    }
    return null;
}
function normalizeCity(value) {
    return normalizeGeoKey(value);
}
function getNearbyOriginCodes(baseOrigin, maxNearby = 2) {
    const base = airportByCode.get(baseOrigin);
    if (!base) return [];
    const targetCity = normalizeCity(base.city);
    const targetCountry = base.country.toLowerCase();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$airports$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["airports"].filter((a)=>a.code !== baseOrigin).filter((a)=>normalizeCity(a.city) === targetCity && a.country.toLowerCase() === targetCountry).slice(0, maxNearby).map((a)=>a.code);
}
function shouldUseNearbyOriginFallback(rows) {
    if (rows.length === 0) return true;
    const nonStopCount = rows.filter((r)=>r.stops === 0).length;
    if (rows.length < 12 || nonStopCount < 4) return true;
    const bestPrice = rows.reduce((min, r)=>Math.min(min, r.price), Number.POSITIVE_INFINITY);
    return Number.isFinite(bestPrice) && bestPrice > 900;
}
function asAirlineIataCode(value) {
    if (!value || typeof value !== "string") return null;
    const code = value.trim().toUpperCase();
    return /^[A-Z0-9]{2}$/.test(code) ? code : null;
}
function resolveAirlineName(value) {
    if (!value || typeof value !== "string") return "";
    const raw = value.trim();
    const code = asAirlineIataCode(raw);
    if (!code) return raw;
    return AIRLINE_IATA_TO_NAME[code] ?? raw;
}
function formatMinutesDuration(total) {
    const mins = Math.max(0, Math.floor(total));
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
}
function monthFromIso(iso) {
    return iso.slice(0, 7);
}
function buildTravelpayoutsMonthPairs(params) {
    const seen = new Set();
    const pairs = [];
    for (const depDate of params.candidateDepartures){
        const retForThisQuery = params.returnDate && params.flexDays > 0 ? shiftIsoDateByDays(params.returnDate, Math.round((Date.parse(depDate + "T00:00:00Z") - Date.parse(params.departureDate + "T00:00:00Z")) / (24 * 60 * 60 * 1000))) : params.returnDate;
        const depMonth = monthFromIso(depDate);
        const retMonth = retForThisQuery ? monthFromIso(retForThisQuery) : "";
        const key = `${depMonth}|${retMonth}`;
        if (seen.has(key)) continue;
        seen.add(key);
        pairs.push({
            departureDate: depDate,
            returnDate: retForThisQuery
        });
    }
    return pairs;
}
function isoDurationToMinutes(iso) {
    if (!iso || typeof iso !== "string") return null;
    let mins = 0;
    const d = iso.match(/(\d+)D/);
    const h = iso.match(/(\d+)H/);
    const m = iso.match(/(\d+)M/);
    if (d) mins += parseInt(d[1], 10) * 24 * 60;
    if (h) mins += parseInt(h[1], 10) * 60;
    if (m) mins += parseInt(m[1], 10);
    return mins > 0 ? mins : null;
}
function asContinentFilter(raw) {
    return ALLOWED_CONTINENTS.has(raw) ? raw : "worldwide";
}
function asIsoDate(value) {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : null;
}
function asCurrencyCode(value, fallback) {
    if (typeof value !== "string") return fallback;
    const trimmed = value.trim().toUpperCase();
    return /^[A-Z]{3}$/.test(trimmed) ? trimmed : fallback;
}
function asPrice(value) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value !== "string") return null;
    const cleaned = value.replace(/[^\d.]/g, "");
    const parsed = Number.parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
}
function asStops(value) {
    if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.floor(value));
    if (typeof value === "string") {
        const numeric = Number.parseInt(value.replace(/[^\d]/g, ""), 10);
        if (Number.isFinite(numeric)) return Math.max(0, numeric);
        if (value.toLowerCase().includes("nonstop") || value.toLowerCase().includes("direct")) return 0;
    }
    return 0;
}
function readOffersFromFirecrawlJson(raw) {
    if (Array.isArray(raw)) return raw;
    if (!raw || typeof raw !== "object") return [];
    const candidate = raw;
    if (Array.isArray(candidate.offers)) return candidate.offers;
    if (Array.isArray(candidate.flights)) return candidate.flights;
    return [];
}
function toFlightResultFromFirecrawlOffer(args) {
    const price = asPrice(args.offer.price);
    if (price == null) return null;
    const destination = args.offer.destinationCity ?? args.offer.destination;
    if (!destination || typeof destination !== "string" || destination.trim() === "") return null;
    const airportCodeRaw = typeof args.offer.destinationAirportCode === "string" ? args.offer.destinationAirportCode.trim().toUpperCase() : "";
    if (airportCodeRaw && airportCodeRaw === args.origin) return null;
    const geo = (airportCodeRaw ? geoForAirportCode(airportCodeRaw) : null) ?? geoForCountryName(args.offer.destinationCountry ?? null) ?? geoForDestinationCity(destination, args.offer.destinationCountry ?? null);
    const airportMeta = airportCodeRaw ? airportByCode.get(airportCodeRaw) : null;
    const departureDate = asIsoDate(args.offer.departureDate) ?? args.departureDate;
    const returnDate = asIsoDate(args.offer.returnDate) ?? args.returnDate;
    const airline = typeof args.offer.airline === "string" ? args.offer.airline.trim() : "";
    const stops = asStops(args.offer.stops);
    return {
        destination: destination.trim(),
        destinationCountry: args.offer.destinationCountry ?? airportMeta?.country ?? null,
        originAirportCode: args.origin,
        airportCode: airportCodeRaw,
        price,
        currency: asCurrencyCode(args.offer.currency, args.fallbackCurrency),
        departureDate,
        requestedDepartureDate: args.departureDate,
        outboundDepartsAt: null,
        outboundArrivesAt: null,
        outboundDuration: null,
        outboundDurationMinutes: null,
        returnDate,
        airline,
        airlineIataCode: asAirlineIataCode(airline),
        airlineLogoUrl: localLogoForAirline(airline),
        stops,
        routeType: stops === 0 ? "direct" : "standard",
        fareType: "Economy",
        continent: geo?.continent ?? "",
        region: geo?.region ?? "",
        tier: "regional",
        source: "firecrawl"
    };
}
async function fetchFirecrawlRows(args) {
    const searchIntents = [
        "cheap flights",
        "flight deals"
    ];
    const rowsBySite = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$asyncPool$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asyncPool"])(searchIntents, 2, async (intent)=>{
        try {
            const destinationScope = args.continent === "worldwide" ? "anywhere" : args.continent.replace("-", " ");
            const query = `${args.origin} flights to ${destinationScope} ${intent}`;
            const response = await fetchWithTimeout("https://api.firecrawl.dev/v2/search", FIRECRAWL_TIMEOUT_MS, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${args.apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query,
                    limit: FIRECRAWL_LIMIT_PER_SITE,
                    sources: [
                        "web"
                    ],
                    scrapeOptions: {
                        formats: [
                            {
                                type: "json",
                                prompt: "Extract flight offers. Return { offers: [{ destinationCity, destinationAirportCode, destinationCountry, airline, price, currency, stops, departureDate, returnDate }] }. Use ISO dates YYYY-MM-DD and numeric price where possible."
                            }
                        ],
                        onlyMainContent: true
                    }
                })
            });
            if (!response.ok) return [];
            const json = await response.json();
            if (!json.success || json.error) return [];
            const webItems = Array.isArray(json.data?.web) ? json.data?.web : [];
            const offers = webItems.flatMap((item)=>readOffersFromFirecrawlJson(item.json));
            return offers.map((offer)=>toFlightResultFromFirecrawlOffer({
                    offer,
                    origin: args.origin,
                    departureDate: args.departureDate,
                    returnDate: args.returnDate,
                    fallbackCurrency: args.currency
                })).filter((row)=>row !== null);
        } catch  {
            // Keep partial results when one provider query times out/fails.
            return [];
        }
    });
    return rowsBySite.flat();
}
function prioritizeHubDestinations(destinations, max) {
    if (destinations.length <= max) return destinations;
    const hubs = destinations.filter((d)=>__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$hubCodes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HUB_CODES"].has(d.code));
    const nonHubs = destinations.filter((d)=>!__TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$hubCodes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HUB_CODES"].has(d.code));
    return [
        ...hubs,
        ...nonHubs
    ].slice(0, max);
}
async function fetchWithTimeout(url, timeoutMs, init) {
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), timeoutMs);
    try {
        return await fetch(url, {
            ...init ?? {},
            signal: controller.signal
        });
    } finally{
        clearTimeout(timeout);
    }
}
async function withBudget(promise, timeoutMs, fallback) {
    let timeoutHandle;
    const timeoutPromise = new Promise((resolve)=>{
        timeoutHandle = setTimeout(()=>resolve(fallback), timeoutMs);
    });
    try {
        return await Promise.race([
            promise,
            timeoutPromise
        ]);
    } finally{
        if (timeoutHandle) clearTimeout(timeoutHandle);
    }
}
async function fetchTravelpayoutsWithRetry(url, apiToken) {
    for(let attempt = 0; attempt <= TRAVELPAYOUTS_MAX_RETRIES; attempt++){
        try {
            const res = await fetchWithTimeout(url, TRAVELPAYOUTS_TIMEOUT_MS, {
                headers: {
                    "x-access-token": apiToken,
                    Accept: "application/json"
                }
            });
            if (res.ok || attempt === TRAVELPAYOUTS_MAX_RETRIES) return res;
        } catch  {
            if (attempt === TRAVELPAYOUTS_MAX_RETRIES) return null;
        }
        await new Promise((resolve)=>setTimeout(resolve, 120 * (attempt + 1)));
    }
    return null;
}
async function enrichTopResultDetails(row, args) {
    if (!row.airportCode) return row;
    const q = new URLSearchParams({
        engine: "google_flights",
        departure_id: args.origin,
        arrival_id: row.airportCode,
        outbound_date: row.departureDate,
        type: row.returnDate ? "1" : "2",
        currency: args.currency,
        api_key: args.apiKey
    });
    if (row.returnDate) q.set("return_date", row.returnDate);
    try {
        const res = await fetchWithTimeout(`https://serpapi.com/search.json?${q.toString()}`, DETAIL_TIMEOUT_MS);
        const json = await res.json();
        if (!res.ok || typeof json.error === "string") return row;
        const itinerary = Array.isArray(json.best_flights) && json.best_flights[0] || Array.isArray(json.other_flights) && json.other_flights[0] || null;
        if (!itinerary) return row;
        const flights = Array.isArray(itinerary.flights) ? itinerary.flights : [];
        const depRaw = flights[0]?.departure_airport?.time ?? null;
        const arrRaw = flights.length > 0 ? flights[flights.length - 1]?.arrival_airport?.time ?? null : null;
        let outboundDepartsAt = row.outboundDepartsAt ?? null;
        let outboundArrivesAt = row.outboundArrivesAt ?? null;
        const airlineLogoUrl = typeof flights[0]?.airline_logo === "string" && flights[0].airline_logo.trim() !== "" ? flights[0].airline_logo : row.airlineLogoUrl ?? null;
        if (depRaw) {
            const parsed = new Date(depRaw);
            if (!Number.isNaN(parsed.getTime())) {
                outboundDepartsAt = parsed.toISOString();
            }
        }
        if (arrRaw) {
            const parsed = new Date(arrRaw);
            if (!Number.isNaN(parsed.getTime())) {
                outboundArrivesAt = parsed.toISOString();
            }
        }
        const durationMinutes = typeof itinerary.total_duration === "number" && Number.isFinite(itinerary.total_duration) ? Math.max(0, Math.floor(itinerary.total_duration)) : null;
        const outboundDuration = durationMinutes != null ? formatMinutesDuration(durationMinutes) : row.outboundDuration;
        return {
            ...row,
            outboundDepartsAt,
            outboundArrivesAt,
            airlineLogoUrl,
            outboundDuration,
            outboundDurationMinutes: durationMinutes ?? row.outboundDurationMinutes ?? null
        };
    } catch  {
        return row;
    }
}
async function fetchDuffelCheapestForDestination(dest, apiKey, params) {
    const response = await fetch("https://api.duffel.com/air/offer_requests", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Duffel-Version": "v2",
            Accept: "application/json"
        },
        body: JSON.stringify({
            data: {
                slices: params.tripType === "one-way" ? [
                    {
                        origin: params.origin,
                        destination: dest.code,
                        departure_date: params.departureDate
                    }
                ] : [
                    {
                        origin: params.origin,
                        destination: dest.code,
                        departure_date: params.departureDate
                    },
                    {
                        origin: dest.code,
                        destination: params.origin,
                        departure_date: params.returnDate
                    }
                ],
                passengers: [
                    {
                        type: "adult"
                    }
                ],
                cabin_class: "economy",
                return_offers: false
            }
        })
    });
    if (!response.ok) return null;
    const requestJson = await response.json();
    const offerRequestId = requestJson.data?.id;
    if (!offerRequestId) return null;
    const offersRes = await fetch(`https://api.duffel.com/air/offers?offer_request_id=${offerRequestId}&limit=${DUFFEL_OFFERS_LIMIT}`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Duffel-Version": "v2",
            Accept: "application/json"
        }
    });
    if (!offersRes.ok) return null;
    const offersJson = await offersRes.json();
    const offers = Array.isArray(offersJson.data) ? offersJson.data : [];
    if (offers.length === 0) return null;
    const sorted = [
        ...offers
    ].sort((a, b)=>{
        const pa = parseFloat(a.total_amount ?? "NaN");
        const pb = parseFloat(b.total_amount ?? "NaN");
        if (!Number.isFinite(pa)) return 1;
        if (!Number.isFinite(pb)) return -1;
        return pa - pb;
    });
    const cheapest = sorted[0];
    const price = parseFloat(cheapest.total_amount ?? "NaN");
    if (!Number.isFinite(price)) return null;
    const outSlice = cheapest.slices?.[0];
    const outSegments = outSlice?.segments ?? [];
    const firstSegment = outSegments[0];
    const lastSegment = outSegments.length > 0 ? outSegments[outSegments.length - 1] : undefined;
    const marketing = firstSegment?.marketing_carrier;
    const operating = firstSegment?.operating_carrier;
    const airline = marketing?.name ?? operating?.name ?? "";
    const airlineIata = (marketing?.iata_code || operating?.iata_code || "").trim().toUpperCase() || null;
    const stops = Math.max(0, outSegments.length - 1);
    const outDep = firstSegment?.departing_at ?? outSlice?.departing_at ?? null;
    const outArr = lastSegment?.arriving_at ?? null;
    const outMins = isoDurationToMinutes(outSlice?.duration ?? null);
    return {
        destination: dest.city,
        destinationCountry: dest.country,
        originAirportCode: params.origin,
        airportCode: dest.code,
        price,
        currency: (cheapest.total_currency ?? params.currency).toUpperCase(),
        departureDate: (outDep ?? "").slice(0, 10) || params.departureDate,
        requestedDepartureDate: params.departureDate,
        outboundDepartsAt: outDep,
        outboundArrivesAt: outArr,
        outboundDuration: outMins != null ? formatMinutesDuration(outMins) : null,
        outboundDurationMinutes: outMins,
        returnDate: params.tripType === "round-trip" ? (cheapest.slices?.[1]?.departing_at ?? "").slice(0, 10) || params.returnDate : null,
        airline,
        airlineIataCode: airlineIata,
        airlineLogoUrl: localLogoForAirline(airline),
        stops,
        routeType: stops === 0 ? "direct" : "standard",
        fareType: outSlice?.fare_brand_name?.trim() || "Economy",
        continent: dest.continent,
        region: dest.region,
        tier: dest.tier,
        source: "duffel"
    };
}
async function fetchTravelpayoutsCheapestForDestination(dest, apiToken, params) {
    const q = new URLSearchParams({
        origin: params.origin,
        destination: dest.code,
        depart_date: monthFromIso(params.departureDate),
        currency: params.currency.toLowerCase()
    });
    if (params.tripType === "round-trip" && params.returnDate) {
        q.set("return_date", monthFromIso(params.returnDate));
    }
    const res = await fetchTravelpayoutsWithRetry(`https://api.travelpayouts.com/v1/prices/cheap?${q.toString()}`, apiToken);
    if (!res) return null;
    if (!res.ok) return null;
    const json = await res.json();
    const data = json.data;
    if (!data || typeof data !== "object") return null;
    const bucket = data[dest.code] ?? Object.values(data)[0];
    if (!bucket || typeof bucket !== "object") return null;
    const fares = Object.values(bucket);
    const valid = fares.filter((f)=>typeof f?.price === "number" && Number.isFinite(f.price));
    if (valid.length === 0) return null;
    valid.sort((a, b)=>a.price - b.price);
    const best = valid[0];
    const airlineCode = asAirlineIataCode(best.airline);
    const airlineName = resolveAirlineName(best.airline);
    const outDep = typeof best.departure_at === "string" ? best.departure_at : null;
    const outArr = typeof best.duration_to === "number" && outDep ? new Date(new Date(outDep).getTime() + best.duration_to * 60 * 1000).toISOString() : null;
    const outMins = typeof best.duration_to === "number" && Number.isFinite(best.duration_to) ? Math.max(0, Math.floor(best.duration_to)) : null;
    const returnDateFromFare = params.tripType === "round-trip" && typeof best.return_at === "string" ? best.return_at.slice(0, 10) : params.returnDate;
    return {
        destination: dest.city,
        destinationCountry: dest.country,
        originAirportCode: params.origin,
        airportCode: dest.code,
        price: best.price,
        currency: (json.currency ?? params.currency).toUpperCase(),
        departureDate: (outDep ?? "").slice(0, 10) || params.departureDate,
        requestedDepartureDate: params.departureDate,
        outboundDepartsAt: outDep,
        outboundArrivesAt: outArr,
        outboundDuration: outMins != null ? formatMinutesDuration(outMins) : null,
        outboundDurationMinutes: outMins,
        returnDate: returnDateFromFare,
        airline: airlineName,
        // Keep Travelpayouts fallback consistent with other generic icon behavior.
        airlineIataCode: null,
        airlineLogoUrl: localLogoForAirline(airlineName),
        stops: 0,
        routeType: "standard",
        fareType: "Economy",
        continent: dest.continent,
        region: dest.region,
        tier: dest.tier,
        source: "travelpayouts"
    };
}
function asFlightResult(item, origin, requestedDepartureDate, fallbackDepartureDate, fallbackReturnDate, currency) {
    const priceValue = item.flight_price;
    if (typeof priceValue !== "number" || !Number.isFinite(priceValue)) return null;
    if (!item.name || typeof item.name !== "string") return null;
    const stops = typeof item.number_of_stops === "number" ? item.number_of_stops : 0;
    const airline = item.airline ?? "";
    const departureDate = item.start_date ?? fallbackDepartureDate;
    const returnDate = item.end_date ?? fallbackReturnDate;
    const airportCode = item.destination_airport?.code ?? "";
    const geo = airportCode ? geoForAirportCode(airportCode) : null;
    const destAirport = airportCode ? airportByCode.get(airportCode.toUpperCase()) : undefined;
    const countryFromItem = typeof item.country === "string" && item.country.trim() !== "" ? item.country.trim() : null;
    const destinationCountry = countryFromItem ?? destAirport?.country ?? null;
    return {
        destination: item.name,
        destinationCountry,
        originAirportCode: origin,
        airportCode,
        price: priceValue,
        currency,
        departureDate,
        requestedDepartureDate,
        outboundDepartsAt: null,
        outboundArrivesAt: null,
        outboundDuration: null,
        outboundDurationMinutes: null,
        returnDate,
        airline,
        airlineIataCode: null,
        airlineLogoUrl: localLogoForAirline(airline),
        stops,
        routeType: stops === 0 ? "direct" : "standard",
        fareType: "Economy",
        continent: geo?.continent ?? "",
        region: geo?.region ?? "",
        tier: "regional",
        source: "serp"
    };
}
async function fetchSerpRowsForOrigin(args) {
    const rowsByDate = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$asyncPool$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asyncPool"])(args.candidateDepartures, Math.min(SERP_CANDIDATE_CONCURRENCY, args.candidateDepartures.length || 1), async (depDate)=>{
        const retForThisQuery = args.returnDate && args.flexDays > 0 ? shiftIsoDateByDays(args.returnDate, Math.round((Date.parse(depDate + "T00:00:00Z") - Date.parse(args.departureDate + "T00:00:00Z")) / (24 * 60 * 60 * 1000))) : args.returnDate;
        const query = new URLSearchParams({
            engine: "google_travel_explore",
            departure_id: args.origin,
            outbound_date: depDate,
            type: args.paramsTripType === "one-way" || !retForThisQuery ? "2" : "1",
            currency: args.currency,
            api_key: args.apiKey
        });
        if (retForThisQuery) query.set("return_date", retForThisQuery);
        const response = await fetch(`https://serpapi.com/search.json?${query.toString()}`);
        const json = await response.json();
        if (!response.ok || typeof json.error === "string") return [];
        const list = Array.isArray(json.destinations) ? json.destinations : [];
        return list.map((item)=>asFlightResult(item, args.origin, args.requestedDepartureDate, depDate, retForThisQuery, args.currency)).filter((r)=>r !== null);
    });
    return rowsByDate.flat();
}
async function POST(req) {
    const apiKey = process.env.SERPAPI_KEY;
    const duffelKey = process.env.DUFFEL_API_KEY;
    const travelpayoutsToken = process.env.TRAVELPAYOUTS_API_TOKEN;
    const firecrawlApiKey = process.env.FIRECRAWL_API_KEY;
    const hasAnyProvider = Boolean(apiKey) || Boolean(duffelKey) || Boolean(travelpayoutsToken) || Boolean(firecrawlApiKey);
    if (!hasAnyProvider) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "No flight providers are configured. Set at least one of SERPAPI_KEY, DUFFEL_API_KEY, TRAVELPAYOUTS_API_TOKEN, or FIRECRAWL_API_KEY."
        }, {
            status: 500
        });
    }
    let body;
    try {
        body = await req.json();
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid JSON body."
        }, {
            status: 400
        });
    }
    const params = body;
    const origin = typeof params.origin === "string" ? params.origin.trim().toUpperCase() : "";
    if (!origin) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Request body is missing required field: origin."
        }, {
            status: 400
        });
    }
    const departureDate = typeof params.departureDate === "string" && params.departureDate.trim() || deriveDepartureDate(params.month);
    if (!departureDate) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Request body is missing required date input: departureDate or month."
        }, {
            status: 400
        });
    }
    const returnDate = typeof params.returnDate === "string" && params.returnDate.trim() !== "" ? params.returnDate : null;
    const continent = typeof params.continent === "string" && params.continent.trim() !== "" ? params.continent : "worldwide";
    const region = typeof params.region === "string" && params.region.trim() !== "" ? params.region : "any";
    const currency = typeof params.currency === "string" && params.currency.trim() !== "" ? params.currency.trim().toUpperCase() : "USD";
    const budget = parseBudget(params.budget);
    /** Default on: widen thin origin results with nearby airports unless explicitly disabled. */ const includeNearbyAirports = params.includeNearbyAirports !== false;
    const requestedFlex = params.dateFlexDays === 1 || params.dateFlexDays === 3 || params.dateFlexDays === 5 ? params.dateFlexDays : null;
    const useFlexibleDates = params.flexibleDates === true || requestedFlex !== null;
    const flexDays = useFlexibleDates ? requestedFlex ?? 3 : 0;
    const stage = params.searchStage === "full" ? "full" : "fast";
    const sourceHasFullTail = stage === "fast" && (Boolean(duffelKey) || Boolean(travelpayoutsToken) || Boolean(firecrawlApiKey));
    const hasMore = (flexDays > 1 || sourceHasFullTail) && stage === "fast";
    const candidateDepartures = buildStagedCandidateDates(departureDate, flexDays, stage);
    const supplementCandidateDepartures = flexDays > 1 ? pickSupplementCandidateDates(candidateDepartures, SUPPLEMENT_FLEX_MAX_DATES) : candidateDepartures;
    const cacheKey = normalizedCacheKey({
        origin,
        departureDate,
        returnDate,
        tripType: params.tripType === "one-way" || !returnDate ? "one-way" : "round-trip",
        continent,
        region,
        currency,
        budget,
        flexDays,
        stage
    });
    const now = Date.now();
    pruneResponseCache(now);
    const cached = responseCache.get(cacheKey);
    if (cached && cached.expiresAt > now) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ...cached.payload,
            meta: {
                ...cached.payload.meta,
                cacheHit: true
            }
        });
    }
    const existing = inFlight.get(cacheKey);
    if (existing) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(await existing);
    }
    const run = async ()=>{
        const runStartedAt = Date.now();
        const timings = {};
        const providerErrors = {};
        const mapped = [];
        let serpRows = [];
        if (apiKey) {
            const serpStartedAt = Date.now();
            try {
                serpRows = await fetchSerpRowsForOrigin({
                    origin,
                    requestedDepartureDate: departureDate,
                    returnDate,
                    paramsTripType: params.tripType,
                    candidateDepartures,
                    departureDate,
                    flexDays,
                    currency,
                    apiKey
                });
                mapped.push(...serpRows);
            } catch  {
                providerErrors.serp = (providerErrors.serp ?? 0) + 1;
            } finally{
                timings.serp = Date.now() - serpStartedAt;
            }
        } else {
            providerErrors.serp = (providerErrors.serp ?? 0) + 1;
        }
        if (apiKey && includeNearbyAirports && shouldUseNearbyOriginFallback(serpRows)) {
            const nearbyOrigins = getNearbyOriginCodes(origin, 2);
            if (nearbyOrigins.length > 0) {
                const nearbyStartedAt = Date.now();
                const nearbyRows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$asyncPool$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asyncPool"])(nearbyOrigins, 2, async (nearbyOrigin)=>fetchSerpRowsForOrigin({
                        origin: nearbyOrigin,
                        requestedDepartureDate: departureDate,
                        returnDate,
                        paramsTripType: params.tripType,
                        candidateDepartures,
                        departureDate,
                        flexDays,
                        currency,
                        apiKey
                    }));
                mapped.push(...nearbyRows.flat());
                timings.nearbySerp = Date.now() - nearbyStartedAt;
            }
        }
        const tripType = params.tripType === "one-way" || !returnDate ? "one-way" : "round-trip";
        const continentFilter = asContinentFilter(continent);
        const regionFilter = continentFilter === "worldwide" ? "any" : region;
        const supplementTasks = [];
        if (duffelKey) {
            const duffelTask = (async ()=>{
                const startedAt = Date.now();
                const baseDuffelDestinations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$searchDestinations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pickDestinationsForSearch"])({
                    continent: continentFilter,
                    region: regionFilter,
                    max: Math.max(DUFFEL_SUPPLEMENT_MAX_DESTINATIONS * 2, 300)
                }).filter((d)=>d.code !== origin);
                const duffelCap = stage === "fast" ? DUFFEL_SUPPLEMENT_FAST_DESTINATIONS : DUFFEL_SUPPLEMENT_MAX_DESTINATIONS;
                const duffelDestinations = prioritizeHubDestinations(baseDuffelDestinations, duffelCap);
                const runDuffelBatch = async (destinations)=>{
                    const duffelRows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$asyncPool$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asyncPool"])(destinations, DUFFEL_SUPPLEMENT_CONCURRENCY, async (dest)=>{
                        let best = null;
                        for (const depDate of supplementCandidateDepartures){
                            const retForThisQuery = returnDate && flexDays > 0 ? shiftIsoDateByDays(returnDate, Math.round((Date.parse(depDate + "T00:00:00Z") - Date.parse(departureDate + "T00:00:00Z")) / (24 * 60 * 60 * 1000))) : returnDate;
                            try {
                                const candidate = await fetchDuffelCheapestForDestination(dest, duffelKey, {
                                    origin,
                                    tripType,
                                    departureDate: depDate,
                                    returnDate: retForThisQuery,
                                    currency
                                });
                                if (!candidate) continue;
                                candidate.requestedDepartureDate = departureDate;
                                if (!best || candidate.price < best.price) best = candidate;
                            } catch  {
                                providerErrors.duffel = (providerErrors.duffel ?? 0) + 1;
                            }
                        }
                        return best;
                    });
                    return duffelRows.filter((r)=>r !== null);
                };
                let rows = [];
                if (stage === "fast") {
                    const firstPassDestinations = duffelDestinations.slice(0, DUFFEL_FAST_FIRST_PASS_DESTINATIONS);
                    rows = await runDuffelBatch(firstPassDestinations);
                    if (rows.length < FAST_STAGE_MIN_PROVIDER_RESULTS) {
                        const remainingDestinations = duffelDestinations.slice(DUFFEL_FAST_FIRST_PASS_DESTINATIONS);
                        if (remainingDestinations.length > 0) {
                            const tailRows = await runDuffelBatch(remainingDestinations);
                            rows = [
                                ...rows,
                                ...tailRows
                            ];
                        }
                    }
                } else {
                    rows = await runDuffelBatch(duffelDestinations);
                }
                timings.duffel = Date.now() - startedAt;
                return rows;
            })();
            supplementTasks.push({
                provider: "duffel",
                task: stage === "full" ? withBudget(duffelTask, DUFFEL_FULL_BUDGET_MS, []) : duffelTask
            });
        }
        if (travelpayoutsToken) {
            const travelpayoutsTask = (async ()=>{
                const startedAt = Date.now();
                const baseTpDestinations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$data$2f$searchDestinations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pickDestinationsForSearch"])({
                    continent: continentFilter,
                    region: regionFilter,
                    max: Math.max(TRAVELPAYOUTS_SUPPLEMENT_MAX_DESTINATIONS * 2, 240)
                }).filter((d)=>d.code !== origin);
                const tpCap = stage === "fast" ? TRAVELPAYOUTS_SUPPLEMENT_FAST_DESTINATIONS : TRAVELPAYOUTS_SUPPLEMENT_MAX_DESTINATIONS;
                if (tpCap <= 0) {
                    timings.travelpayouts = Date.now() - startedAt;
                    return [];
                }
                const tpDestinations = prioritizeHubDestinations(baseTpDestinations, tpCap);
                const runTravelpayoutsBatch = async (destinations)=>{
                    const tpRows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$asyncPool$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asyncPool"])(destinations, TRAVELPAYOUTS_SUPPLEMENT_CONCURRENCY, async (dest)=>{
                        let best = null;
                        const monthPairs = buildTravelpayoutsMonthPairs({
                            candidateDepartures: supplementCandidateDepartures,
                            departureDate,
                            returnDate,
                            flexDays
                        });
                        for (const pair of monthPairs){
                            try {
                                const candidate = await fetchTravelpayoutsCheapestForDestination(dest, travelpayoutsToken, {
                                    origin,
                                    tripType,
                                    departureDate: pair.departureDate,
                                    returnDate: pair.returnDate,
                                    currency
                                });
                                if (!candidate) continue;
                                candidate.requestedDepartureDate = departureDate;
                                if (!best || candidate.price < best.price) best = candidate;
                            } catch  {
                                providerErrors.travelpayouts = (providerErrors.travelpayouts ?? 0) + 1;
                            }
                        }
                        return best;
                    });
                    return tpRows.filter((r)=>r !== null);
                };
                let rows = [];
                if (stage === "fast") {
                    const firstPassDestinations = tpDestinations.slice(0, TRAVELPAYOUTS_FAST_FIRST_PASS_DESTINATIONS);
                    rows = await runTravelpayoutsBatch(firstPassDestinations);
                    if (rows.length < FAST_STAGE_MIN_PROVIDER_RESULTS) {
                        const remainingDestinations = tpDestinations.slice(TRAVELPAYOUTS_FAST_FIRST_PASS_DESTINATIONS);
                        if (remainingDestinations.length > 0) {
                            const tailRows = await runTravelpayoutsBatch(remainingDestinations);
                            rows = [
                                ...rows,
                                ...tailRows
                            ];
                        }
                    }
                } else {
                    rows = await runTravelpayoutsBatch(tpDestinations);
                }
                timings.travelpayouts = Date.now() - startedAt;
                return rows;
            })();
            supplementTasks.push({
                provider: "travelpayouts",
                task: stage === "full" ? withBudget(travelpayoutsTask, TRAVELPAYOUTS_FULL_BUDGET_MS, []) : travelpayoutsTask
            });
        }
        if (firecrawlApiKey) {
            supplementTasks.push({
                provider: "firecrawl",
                task: (async ()=>{
                    const startedAt = Date.now();
                    try {
                        const rows = await fetchFirecrawlRows({
                            apiKey: firecrawlApiKey,
                            origin,
                            departureDate,
                            returnDate,
                            currency,
                            continent: continentFilter
                        });
                        timings.firecrawl = Date.now() - startedAt;
                        return rows;
                    } catch  {
                        providerErrors.firecrawl = (providerErrors.firecrawl ?? 0) + 1;
                        timings.firecrawl = Date.now() - startedAt;
                        return [];
                    }
                })()
            });
        }
        if (supplementTasks.length > 0) {
            const supplements = await Promise.allSettled(supplementTasks.map((s)=>s.task));
            for(let i = 0; i < supplements.length; i++){
                const settled = supplements[i];
                const provider = supplementTasks[i].provider;
                if (settled.status === "fulfilled") {
                    mapped.push(...settled.value);
                } else {
                    providerErrors[provider] = (providerErrors[provider] ?? 0) + 1;
                }
            }
        }
        const scoped = mapped.filter((r)=>{
            if (continent === "worldwide") return true;
            if (!r.continent || r.continent !== continent) return false;
            if (region !== "any" && r.region !== region) return false;
            return true;
        });
        const filtered = budget == null ? scoped : scoped.filter((r)=>r.price <= budget);
        filtered.sort((a, b)=>a.price - b.price);
        const byRoute = new Map();
        for (const row of filtered){
            const routeKey = (row.airportCode || row.destination).trim().toLowerCase();
            const sourceKey = row.source ?? "unknown";
            const key = `${routeKey}|${sourceKey}`;
            const prev = byRoute.get(key);
            if (!prev || row.price < prev.price) byRoute.set(key, row);
        }
        const collapsed = [
            ...byRoute.values()
        ].sort((a, b)=>a.price - b.price);
        const topResults = collapsed.slice(0, MAX_RESULTS);
        const withDebug = topResults.map((r)=>({
                ...r,
                flexSearchUsed: useFlexibleDates,
                flexDaysUsed: flexDays
            }));
        const enrichCount = Math.min(DETAIL_TOP_N, withDebug.length);
        if (enrichCount === 0) {
            timings.total = Date.now() - runStartedAt;
            const payload = {
                results: withDebug,
                meta: {
                    stage,
                    hasMore,
                    flexDaysUsed: flexDays,
                    cacheHit: false,
                    timingsMs: timings,
                    providerErrors: Object.keys(providerErrors).length > 0 ? providerErrors : undefined
                }
            };
            // Do not cache empty results — avoids "stuck" no-results for 10m after a transient failure.
            if (withDebug.length > 0) {
                pruneResponseCache();
                responseCache.set(cacheKey, {
                    expiresAt: Date.now() + SEARCH_CACHE_TTL_MS,
                    payload: {
                        results: payload.results,
                        meta: {
                            stage: payload.meta.stage,
                            hasMore: payload.meta.hasMore,
                            flexDaysUsed: payload.meta.flexDaysUsed,
                            timingsMs: payload.meta.timingsMs,
                            providerErrors: payload.meta.providerErrors
                        }
                    }
                });
            }
            return payload;
        }
        const leading = withDebug.slice(0, enrichCount);
        const trailing = withDebug.slice(enrichCount);
        let enrichedLeading = leading;
        if (apiKey) {
            const enrichStartedAt = Date.now();
            enrichedLeading = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$src$2f$lib$2f$asyncPool$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asyncPool"])(leading, DETAIL_CONCURRENCY, async (row)=>enrichTopResultDetails(row, {
                    apiKey,
                    origin,
                    currency
                }));
            timings.enrich = Date.now() - enrichStartedAt;
        }
        timings.total = Date.now() - runStartedAt;
        const payload = {
            results: [
                ...enrichedLeading,
                ...trailing
            ],
            meta: {
                stage,
                hasMore,
                flexDaysUsed: flexDays,
                cacheHit: false,
                timingsMs: timings,
                providerErrors: Object.keys(providerErrors).length > 0 ? providerErrors : undefined
            }
        };
        pruneResponseCache();
        responseCache.set(cacheKey, {
            expiresAt: Date.now() + SEARCH_CACHE_TTL_MS,
            payload: {
                results: payload.results,
                meta: {
                    stage: payload.meta.stage,
                    hasMore: payload.meta.hasMore,
                    flexDaysUsed: payload.meta.flexDaysUsed,
                    timingsMs: payload.meta.timingsMs,
                    providerErrors: payload.meta.providerErrors
                }
            }
        });
        return payload;
    };
    const promise = run();
    inFlight.set(cacheKey, promise);
    try {
        const payload = await promise;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Flight$2d$app$2f$flight$2d$finder$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(payload);
    } finally{
        inFlight.delete(cacheKey);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__111haea._.js.map