import { AvatarSection } from "@/components/landing/avatar-section";
import { BloggerList } from "@/components/landing/blogger-list";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { JoinCommunity } from "@/components/landing/join-community";
import { Navbar } from "@/components/landing/navbar";
import { Container } from "@/components/wrapper/container";

export default function Page() {
  return (
   <Container className="h-screen">
      <Navbar />
      <Hero /> 
      <AvatarSection />
      <BloggerList />
      <JoinCommunity />
      <Footer />
   </Container>
  )
}
