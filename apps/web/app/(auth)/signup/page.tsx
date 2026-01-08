import { SignUp } from "@/components/auth/signup";
import { Navbar } from "@/components/landing/navbar";
import { Container } from "@/components/wrapper/container";

export default function SignupPage() {
  return (
    <Container>
      <Navbar />
      <SignUp />
    </Container>
  );
}
