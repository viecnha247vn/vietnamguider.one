import HubPage, { hubMetadata } from "@/components/HubPage";

export const metadata = hubMetadata(
  "Deals",
  "Only deals we would use ourselves. If nothing is worth it this month, this page will say so."
);

export default function Page() {
  return (
    <HubPage
      kicker="Deals"
      title="Deals"
      intro="Only deals we would use ourselves. If nothing is worth it this month, this page will say so."
      workingOn={[
    "Bus and train fares worth booking early",
    "Hotel rates that actually drop off-season",
    "eSIM plans compared by real cost per GB",
    "What never goes on sale in Vietnam",
      ]}
      meanwhile={[
        { label: "Route guides", href: "/blog" },
        { label: "Destinations", href: "/destinations" },
      ]}
    />
  );
}
