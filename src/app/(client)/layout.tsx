import Header from "@/components/header/Header";
import { anonymous_pro, anton, gothic_a1 } from "../fonts";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
