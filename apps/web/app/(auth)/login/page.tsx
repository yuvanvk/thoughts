import { Navbar } from "@/components/landing/navbar";
import { Login } from "@/components/auth/login";
import { Container } from "@/components/wrapper/container";

export default function LoginPage() {
  return (
    <Container>
      <Navbar />
      <Login />
    </Container>
  );
}
