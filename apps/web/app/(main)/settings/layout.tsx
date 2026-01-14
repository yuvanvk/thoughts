import { Appbar } from "@/components/navigation/app-bar";
import { Sidebar } from "@/components/navigation/sidebar";
import { Container } from "@/components/wrapper/container";

export default function SettingLayout({ children }: { children: React.ReactNode }) {
    return <Container className="max-w-6xl flex">
        <Sidebar />
      <Container className="max-w-full mx-0 border-x">
        <Appbar />
        {children}
      </Container>
    </Container>
}