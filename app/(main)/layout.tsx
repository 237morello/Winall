import { Header } from "@/components/features/header";
import { MarketingFooter } from "@/components/features/marketing/components/marketing-footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <MarketingFooter />
    </>
  );
}
