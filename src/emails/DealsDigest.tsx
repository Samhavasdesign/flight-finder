import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type { DealsByOrigin, ScoredDeal } from "@/lib/deals/scoreAndFilter";
import { buildDealDigestCard } from "@/lib/deals/dealTravelPresentation";

type Props = {
  deals: DealsByOrigin;
  generatedAt: string;
};

const ACCENT = "#defd4e";
const CARD = "#161616";
const MUTED = "#a3a3a3";
const LABEL = "#737373";
const BODY_TEXT = "#fafafa";
const BORDER = "#2a2a2a";

/** Same typography as digest H1, smaller and white. */
const digestSectionTitle = {
  margin: "0 0 8px 0",
  fontSize: "28px",
  lineHeight: "1.15" as const,
  letterSpacing: "-0.02em",
  fontWeight: 700 as const,
  color: "#ffffff",
};

const digestSectionSubtitle = {
  margin: "0 0 22px 0",
  fontSize: "14px",
  lineHeight: "1.5" as const,
  color: MUTED,
};

const fontStack =
  "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const lab = {
  margin: "0 0 4px 0",
  fontSize: "10px",
  lineHeight: "14px",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: LABEL,
  fontWeight: 600,
};

function isEuropeContinent(label: string): boolean {
  return label.trim().toLowerCase() === "europe";
}

/** Same route + dates as one card — used to avoid repeating a Top Deals Today row elsewhere. */
function dealFingerprint(d: ScoredDeal): string {
  const h = d.hubFare;
  return `${h.hub.origin}|${h.destination.trim().toUpperCase()}|${h.departureDate.trim()}|${h.returnDate.trim()}`;
}

function selectTopDealsToday(allDeals: ScoredDeal[]): ScoredDeal[] {
  return [...allDeals]
    .filter((d) => d.hubFare.stops === 0 && d.scoreResult.score >= 75)
    .sort((a, b) => a.hubFare.price - b.hubFare.price)
    .slice(0, 5);
}

function selectIntraEuropeTop(allDeals: ScoredDeal[], excludeKeys: ReadonlySet<string>): ScoredDeal[] {
  return [...allDeals]
    .filter(
      (d) =>
        !excludeKeys.has(dealFingerprint(d)) &&
        isEuropeContinent(d.hubFare.hub.originContinent) &&
        isEuropeContinent(d.hubFare.destinationContinent)
    )
    .sort((a, b) => a.hubFare.price - b.hubFare.price)
    .slice(0, 10);
}

function selectOutsideEuropeTop(allDeals: ScoredDeal[], excludeKeys: ReadonlySet<string>): ScoredDeal[] {
  return [...allDeals]
    .filter(
      (d) =>
        !excludeKeys.has(dealFingerprint(d)) &&
        isEuropeContinent(d.hubFare.hub.originContinent) &&
        d.hubFare.destinationContinent.trim() !== "" &&
        !isEuropeContinent(d.hubFare.destinationContinent)
    )
    .sort((a, b) => a.hubFare.price - b.hubFare.price)
    .slice(0, 10);
}

function DigestDealCard({
  deal,
  index,
  sectionLabel,
  showTopDealTodayTag = false,
}: {
  deal: ScoredDeal;
  index: number;
  sectionLabel?: string;
  /** Star pill — only first five cards in “Top Deals Today”. */
  showTopDealTodayTag?: boolean;
}) {
  const m = buildDealDigestCard(deal);
  const conservativeMode = deal.scoreResult.conservativeMode === true;

  const showFooter = showTopDealTodayTag || Boolean(sectionLabel?.trim());

  return (
    <Section
      style={{
        backgroundColor: CARD,
        borderRadius: "16px",
        padding: "26px 24px 28px",
        marginTop: index === 0 ? "0" : "28px",
      }}
    >
      <Row>
        <Column style={{ width: "52%", verticalAlign: "top", paddingRight: "16px" }}>
          <Text style={{ ...lab, margin: "0 0 8px 0" }}>Destination</Text>
          <Text
            style={{
              margin: "0",
              fontSize: "34px",
              lineHeight: "1.12",
              fontWeight: 700,
              color: BODY_TEXT,
              letterSpacing: "-0.02em",
            }}
          >
            {m.destinationCity}
          </Text>
        </Column>
        <Column style={{ width: "48%", verticalAlign: "top", textAlign: "right" }}>
          <Text style={{ ...lab, margin: "0 0 8px 0", textAlign: "right" }}>Starting at</Text>
          <Text
            style={{
              margin: "0",
              fontSize: "52px",
              lineHeight: "1",
              fontWeight: 800,
              color: ACCENT,
              letterSpacing: "-0.03em",
            }}
          >
            €{m.price}
          </Text>
        </Column>
      </Row>

      <Text style={{ ...lab, margin: "22px 0 6px 0" }}>From / route</Text>
      <Text
        style={{
          margin: "0 0 18px 0",
          fontSize: "15px",
          lineHeight: "1.45",
          fontWeight: 600,
          color: "#ececec",
        }}
      >
        From {m.originCity}{" "}
        <span style={{ color: MUTED, fontWeight: 500 }}>
          ({m.originCode} → {m.destinationCode})
        </span>
      </Text>

      <Text
        style={{
          margin: "0 0 22px 0",
          fontSize: "13px",
          lineHeight: "1.5",
          color: MUTED,
        }}
      >
        {m.flightMetaLine}
      </Text>

      <Hr style={{ borderColor: BORDER, borderWidth: "1px", margin: "0 0 20px 0" }} />

      <Row>
        <Column style={{ width: "50%", verticalAlign: "top", paddingRight: "14px" }}>
          <Text style={{ ...lab, margin: "0 0 8px 0" }}>Dates</Text>
          <Text
            style={{
              margin: "0",
              fontSize: "15px",
              lineHeight: "1.35",
              fontWeight: 600,
              color: BODY_TEXT,
            }}
          >
            {m.compactTripDates ?? "—"}
          </Text>
        </Column>
        <Column style={{ width: "50%", verticalAlign: "top", paddingLeft: "14px" }}>
          <Text style={{ ...lab, margin: "0 0 8px 0" }}>Value score</Text>
          <Text
            style={{
              margin: "0",
              fontSize: "15px",
              lineHeight: "1.35",
              fontWeight: 600,
              ...(conservativeMode
                ? {
                    display: "inline-block",
                    backgroundColor: "#444",
                    color: "#888",
                    padding: "8px 12px",
                    borderRadius: "8px",
                  }
                : { color: BODY_TEXT }),
            }}
          >
            {conservativeMode ? "Early data" : `${m.score}/100`}
          </Text>
        </Column>
      </Row>

      <Text
        style={{
          margin: "22px 0 0 0",
          fontSize: "13px",
          lineHeight: "1.55",
          color: "#d4d4d4",
        }}
      >
        <span style={{ fontWeight: 700, color: BODY_TEXT }}>Why this surfaced:</span>{" "}
        {m.whyBrief}
      </Text>

      {m.showEarlyDataNote ? (
        <Text
          style={{
            margin: "10px 0 0 0",
            fontSize: "11px",
            lineHeight: "1.45",
            color: "#64748b",
          }}
        >
          Limited history on this route — treat pricing as indicative.
        </Text>
      ) : null}

      {showFooter ? (
        <Section
          style={{
            margin: "16px 0 0 0",
            paddingTop: "14px",
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          <Row>
            <Column
              style={{
                width: showTopDealTodayTag && sectionLabel?.trim() ? "62%" : "100%",
                verticalAlign: "middle",
              }}
            >
              {showTopDealTodayTag ? (
                <Text style={{ margin: "0", fontSize: "11px", lineHeight: "1.45" }}>
                  <span
                    style={{
                      display: "inline-block",
                      border: `1px solid ${ACCENT}`,
                      borderRadius: "999px",
                      padding: "6px 14px",
                      backgroundColor: "#141414",
                    }}
                  >
                    <span style={{ color: ACCENT }}>★</span>
                    <span
                      style={{
                        marginLeft: "8px",
                        color: "#d4d4d4",
                        fontWeight: 600,
                        fontSize: "10px",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Top deal today
                    </span>
                  </span>
                </Text>
              ) : sectionLabel?.trim() ? (
                <Text
                  style={{
                    margin: "0",
                    fontSize: "10px",
                    letterSpacing: "0.06em",
                    color: "#525252",
                  }}
                >
                  {sectionLabel}
                </Text>
              ) : null}
            </Column>
            {showTopDealTodayTag && sectionLabel?.trim() ? (
              <Column style={{ width: "38%", verticalAlign: "middle", textAlign: "right" }}>
                <Text
                  style={{
                    margin: "0",
                    fontSize: "10px",
                    letterSpacing: "0.06em",
                    color: "#525252",
                  }}
                >
                  {sectionLabel}
                </Text>
              </Column>
            ) : null}
          </Row>
        </Section>
      ) : null}
    </Section>
  );
}

function HighlightSection({
  title,
  subtitle,
  deals,
  cardKeyPrefix,
}: {
  title: string;
  subtitle: string;
  deals: ScoredDeal[];
  cardKeyPrefix: string;
}) {
  if (deals.length === 0) return null;

  return (
    <Section
      style={{
        backgroundColor: "#111111",
        borderRadius: "18px",
        padding: "28px 24px 32px",
        margin: "0 0 28px 0",
      }}
    >
      <Text style={{ ...digestSectionTitle }}>{title}</Text>
      <Text style={{ ...digestSectionSubtitle, margin: "0 0 26px 0" }}>{subtitle}</Text>
      {deals.map((deal, index) => (
        <DigestDealCard
          key={`${cardKeyPrefix}-${deal.hubFare.hub.origin}-${deal.hubFare.destination}-${deal.hubFare.departureDate}-${index}`}
          deal={deal}
          index={index}
          sectionLabel={title}
        />
      ))}
    </Section>
  );
}

export default function DealsDigest({ deals, generatedAt }: Props) {
  const flatDeals = Object.values(deals).flat();
  const topDealsToday = selectTopDealsToday(flatDeals);
  const topDealKeys = new Set(topDealsToday.map(dealFingerprint));
  const intraEuropeDeals = selectIntraEuropeTop(flatDeals, topDealKeys);
  const outsideEuropeDeals = selectOutsideEuropeTop(flatDeals, topDealKeys);

  return (
    <Html>
      <Head />
      <Preview>Today&apos;s cheapest routes worth paying attention to</Preview>
      <Body
        style={{
          backgroundColor: "#0a0a0a",
          margin: "0",
          padding: "48px 24px",
          color: "#e5e5e5",
          fontFamily: fontStack,
        }}
      >
        <Container
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            backgroundColor: "#0a0a0a",
          }}
        >
          <Text
            style={{
              margin: "0 0 10px 0",
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#525252",
              fontWeight: 600,
            }}
          >
            Deal digest
          </Text>
          <Text
            style={{
              margin: "0 0 12px 0",
              color: ACCENT,
              fontSize: "40px",
              lineHeight: "1.15",
              letterSpacing: "-0.02em",
              fontWeight: 700,
            }}
          >
            Today&apos;s cheapest routes worth paying attention to
          </Text>
          <Text
            style={{
              margin: "0 0 36px 0",
              fontSize: "14px",
              lineHeight: "1.5",
              color: MUTED,
            }}
          >
            Surfaced from major European hubs · {generatedAt}
          </Text>

          {topDealsToday.length > 0 ? (
            <Section
              style={{
                backgroundColor: "#111111",
                borderRadius: "18px",
                padding: "28px 24px 32px",
                margin: "0 0 28px 0",
              }}
            >
              <Text style={{ ...digestSectionTitle }}>Top Deals Today</Text>
              <Text style={{ ...digestSectionSubtitle, margin: "0 0 26px 0" }}>
                Best nonstop fares across European hubs right now
              </Text>

              {topDealsToday.map((deal, index) => (
                <DigestDealCard
                  key={`top-${deal.hubFare.hub.origin}-${deal.hubFare.destination}-${deal.hubFare.departureDate}-${index}`}
                  deal={deal}
                  index={index}
                  showTopDealTodayTag={index < 5}
                />
              ))}
            </Section>
          ) : null}

          <Section style={{ margin: "8px 0 28px 0", borderTop: `1px solid ${BORDER}` }} />

          <HighlightSection
            title="Within Europe"
            subtitle="Top genuine deals between European hubs (by price)"
            deals={intraEuropeDeals}
            cardKeyPrefix="intra"
          />

          <HighlightSection
            title="Beyond Europe"
            subtitle="Long-haul picks from European hubs (by price)"
            deals={outsideEuropeDeals}
            cardKeyPrefix="outside"
          />

          <Text
            style={{
              margin: "40px 0 0 0",
              fontSize: "12px",
              color: "#404040",
            }}
          >
            Flight Deal Alerts · Built by Sam
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
