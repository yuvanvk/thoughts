import { AvatarSection } from "@/components/landing/avatar-section";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { Container } from "@/components/wrapper/container";

export default function Page() {
  return (
   <Container>
      <Navbar />
      <Hero /> 
      <AvatarSection />
      <Footer />
   </Container>
  )
}
