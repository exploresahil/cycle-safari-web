import StudioHeader from "@/components/studioHeaders/StudioHeader";
import "@/app/scss/globals.scss";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StudioHeader />
      {children}
    </>
  );
}
