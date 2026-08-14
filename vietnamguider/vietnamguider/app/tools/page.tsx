import HubPage, { hubMetadata } from "@/components/HubPage";

export const metadata = hubMetadata(
  "Travel Tools",
  "Small calculators that answer the question you actually have. No sign-up, no email."
);

export default function Page() {
  return (
    <HubPage
      kicker="Travel tools"
      title="Travel Tools"
      intro="Small calculators that answer the question you actually have. No sign-up, no email."
      workingOn={[
    "Dong converter with a sense of what things cost",
    "Journey planner between any two towns",
    "Packing list by season and region",
    "Tipping and bargaining: what is normal",
      ]}
      meanwhile={[
        { label: "Route guides", href: "/blog" },
        { label: "Destinations", href: "/destinations" },
      ]}
    />
  );
}
