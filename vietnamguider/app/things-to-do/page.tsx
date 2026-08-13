import HubPage, { hubMetadata } from "@/components/HubPage";

export const metadata = hubMetadata(
  "Things To Do",
  "The things worth your time, and the ones you can skip. We say which is which."
);

export default function Page() {
  return (
    <HubPage
      kicker="Things to do"
      title="Things To Do"
      intro="The things worth your time, and the ones you can skip. We say which is which."
      workingOn={[
    "Ha Long vs Bai Tu Long vs Lan Ha: which bay",
    "Trekking around Sa Pa without a package",
    "Hà Giang loop: self-drive or easy rider",
    "Cooking classes that are not a show",
      ]}
      meanwhile={[
        { label: "Route guides", href: "/blog" },
        { label: "Destinations", href: "/destinations" },
      ]}
    />
  );
}
