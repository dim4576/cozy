import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Features from '@/components/Features'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

