import HubPage, { hubMetadata } from "@/components/HubPage";

export const metadata = hubMetadata(
  "Where To Stay",
  "Which neighbourhood, then which room. Named hotels with real prices, not adjectives."
);

export default function Page() {
  return (
    <HubPage
      kicker="Where to stay"
      title="Where To Stay"
      intro="Which neighbourhood, then which room. Named hotels with real prices, not adjectives."
      workingOn={[
    "Hà Nội: Old Quarter vs Tây Hồ vs Ba Đình",
    "Hội An: Old Town, An Bàng beach, or between",
    "Homestays in Sa Pa valleys worth the drive",
    "What 500.000₫ a night actually buys",
      ]}
      meanwhile={[
        { label: "Route guides", href: "/blog" },
        { label: "Destinations", href: "/destinations" },
      ]}
    />
  );
}
