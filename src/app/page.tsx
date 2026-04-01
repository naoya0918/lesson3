import Header from "@/components/Header";
import WorkList from "@/components/WorkList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-[860px] px-5 pb-16">
        <WorkList />
      </main>
      <Footer />
    </div>
  );
}
