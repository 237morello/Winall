import { Header } from "@/components/features/Header";
import { Footer } from "@/components/layout/footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className="w-full max-w-7xl mx-auto flex flex-col space-y-4 px-4 pb-10 pt-20 md:space-y-8 md:px-6 lg:space-y-10">

        {children}
      </main>
      <Footer />
    </>
  );
}
