import { Resend } from "resend";
import type { DealsByOrigin } from "@/lib/deals/scoreAndFilter";
import DealsDigest from "@/emails/DealsDigest";
import React from "react";
import { render } from "@react-email/components";

/** Calendar date for subject line, e.g. "May 8, 2026" (Europe/Paris). */
function formatDigestSubjectDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(date);
}

/** Morning vs evening send — uses Europe/Paris hour (≥14 = evening). */
export function getDigestSlot(now: Date): "morning" | "evening" {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: "Europe/Paris",
  }).formatToParts(now);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "12");
  return hour >= 14 ? "evening" : "morning";
}

function buildDigestSubject(
  slot: "morning" | "evening",
  date: Date,
  focus: "general" | "south-america" = "general"
): string {
  const dateStr = formatDigestSubjectDate(date);
  const lead = (() => {
    if (focus === "south-america") {
      return slot === "morning"
        ? "This morning's best South America fares ✈️"
        : "This evening's best South America fares ✈️";
    }
    return slot === "morning"
      ? "This morning's best escape fares ✈️"
      : "This evening's best escape fares ✈️";
  })();
  return `${lead} — ${dateStr}`;
}

function formatGeneratedAt(date: Date): string {
  const datePart = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(date);

  const timeParts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Europe/Paris",
    timeZoneName: "short",
  }).formatToParts(date);

  const hour = timeParts.find((part) => part.type === "hour")?.value ?? "";
  const minute = timeParts.find((part) => part.type === "minute")?.value ?? "00";
  const dayPeriodRaw = timeParts.find((part) => part.type === "dayPeriod")?.value ?? "";
  const zone = timeParts.find((part) => part.type === "timeZoneName")?.value ?? "";
  const dayPeriod = dayPeriodRaw.toLowerCase();

  return `${datePart} · ${hour}:${minute}${dayPeriod} ${zone}`;
}

/** Primary supports comma-separated list; optional second env for one extra inbox. */
function resolveDigestRecipients(): string[] {
  const primaryRaw = process.env.DEALS_DIGEST_EMAIL?.trim() ?? "";
  const secondaryRaw = process.env.DEALS_DIGEST_EMAIL_2?.trim() ?? "";
  const fromPrimary = primaryRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const secondary = secondaryRaw ? [secondaryRaw] : [];
  return [...new Set([...fromPrimary, ...secondary])];
}

export async function sendDigest(
  deals: DealsByOrigin,
  options?: { slot?: "morning" | "evening"; focus?: "general" | "south-america" }
): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log("[sendDigest] Missing RESEND_API_KEY");
    return;
  }

  if (Object.keys(deals).length === 0) {
    console.log("[sendDigest] No deals to send");
    return;
  }

  const recipients = resolveDigestRecipients();
  if (recipients.length === 0) {
    console.log("[sendDigest] Missing DEALS_DIGEST_EMAIL (and no DEALS_DIGEST_EMAIL_2)");
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const now = new Date();
    const slot = options?.slot ?? getDigestSlot(now);
    const focus = options?.focus ?? "general";
    const generatedAt = formatGeneratedAt(now);
    const html = await render(
      React.createElement(DealsDigest, {
        deals,
        generatedAt,
      })
    );

    await resend.emails.send({
      from: "Flight Deals <onboarding@resend.dev>",
      to: recipients,
      subject: buildDigestSubject(slot, now, focus),
      html,
    });

    console.log("[sendDigest] Email sent successfully");
  } catch (error: unknown) {
    console.error("[sendDigest] Failed to send:", error);
  }
}
