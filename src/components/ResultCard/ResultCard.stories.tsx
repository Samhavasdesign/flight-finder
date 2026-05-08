import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ResultCard } from "./ResultCard";

const baseResult = {
  destination: "Paris",
  destinationCountry: "France",
  originAirportCode: "SFO",
  airportCode: "CDG",
  price: 499,
  currency: "USD",
  departureDate: "2026-07-10",
  requestedDepartureDate: "2026-07-08",
  outboundDepartsAt: "2026-07-10T08:30:00Z",
  outboundArrivesAt: "2026-07-10T15:40:00Z",
  outboundDuration: "10h 10m",
  outboundDurationMinutes: 610,
  returnDate: "2026-07-18",
  airline: "Air France",
  airlineIataCode: "AF",
  airlineLogoUrl: null,
  stops: 1,
  routeType: "standard" as const,
  fareType: "Economy",
  continent: "europe",
  region: "western-europe",
  tier: "hub" as const,
  source: "duffel" as const,
};

const meta = {
  title: "Components/ResultCard",
  component: ResultCard,
  args: {
    result: baseResult,
    tripType: "round-trip",
  },
} satisfies Meta<typeof ResultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OneWay: Story = {
  args: {
    tripType: "one-way",
    result: {
      ...baseResult,
      returnDate: null,
    },
  },
};

export const WithFlexibleAlternative: Story = {
  args: {
    result: {
      ...baseResult,
      flexibleAlternative: {
        month: "September",
        price: 399,
        saving: 100,
        departureDate: "2026-09-12",
      },
    },
  },
};

export const WithSaveTrip: Story = {
  args: {
    onSave: () => undefined,
    saved: false,
  },
};

export const SavedTrip: Story = {
  args: {
    onSave: () => undefined,
    saved: true,
  },
};
