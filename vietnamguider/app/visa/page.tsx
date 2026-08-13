import HubPage, { hubMetadata } from "@/components/HubPage";

export const metadata = hubMetadata(
  "Vietnam Visa",
  "E-visa, exemptions and extensions, kept current. Visa rules change often, so every page here carries the date we checked it."
);

export default function Page() {
  return (
    <HubPage
      kicker="Vietnam visa"
      title="Vietnam Visa"
      intro="E-visa, exemptions and extensions, kept current. Visa rules change often, so every page here carries the date we checked it."
      workingOn={[
    "E-visa: who needs one and how to apply",
    "Which passports enter visa-free, and for how long",
    "Extending or doing a border run",
    "Common e-visa rejections and how to avoid them",
      ]}
      meanwhile={[
        { label: "Route guides", href: "/blog" },
        { label: "Destinations", href: "/destinations" },
      ]}
    />
  );
}
