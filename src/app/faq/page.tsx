import Header from "@/components/Header";
import Faq from "@/components/Faq";
import SiteFooter from "@/components/design/SiteFooter";

export const metadata = { title: "FAQ & Support — Reelo" };

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-6">
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
