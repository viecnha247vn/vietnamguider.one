import HubPage, { hubMetadata } from "@/components/HubPage";

export const metadata = hubMetadata(
  "Food",
  "What to order, where, and how to say it. Street stalls included, with the rules for eating at them safely."
);

export default function Page() {
  return (
    <HubPage
      kicker="Food"
      title="Food"
      intro="What to order, where, and how to say it. Street stalls included, with the rules for eating at them safely."
      workingOn={[
    "Phở: the northern original vs the southern bowl",
    "Bún chả, bánh mì, cao lầu: where they belong",
    "Ordering in Vietnamese, with pronunciation",
    "Street food and your stomach: the real rules",
      ]}
      meanwhile={[
        { label: "Route guides", href: "/blog" },
        { label: "Destinations", href: "/destinations" },
      ]}
    />
  );
}
