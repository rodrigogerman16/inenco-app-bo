import HeroSection from "@/components/hero-section"
import ProductsSection from "@/components/products-section"
import ClientsSection from "@/components/clients-section"
import ContactSection from "@/components/contact-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NovedadesSection from "@/components/novedades-section" // Import NovedadesSection

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <HeroSection />
        {/* Removed ServicesSection as requested */}
        <ProductsSection />
        <ClientsSection />
        <NovedadesSection /> {/* Added NovedadesSection */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
