import HubPage, { hubMetadata } from "@/components/HubPage";

export const metadata = hubMetadata(
  "Plan Your Trip",
  "When to come, how long to stay, and how much a week in Vietnam actually costs. Written after the fact, from real receipts."
);

export default function Page() {
  return (
    <HubPage
      kicker="Plan your trip"
      title="Plan Your Trip"
      intro="When to come, how long to stay, and how much a week in Vietnam actually costs. Written after the fact, from real receipts."
      workingOn={[
    "How many days for a first trip, north to south",
    "Month-by-month weather, honestly rated",
    "What a week costs at three budgets, in dong",
    "SIM, eSIM and money on day one",
      ]}
      meanwhile={[
        { label: "Route guides", href: "/blog" },
        { label: "Destinations", href: "/destinations" },
      ]}
    />
  );
}
