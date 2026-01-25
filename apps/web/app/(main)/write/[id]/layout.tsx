import { Appbar } from "@/components/navigation/app-bar";
import { Sidebar } from "@/components/navigation/sidebar";
import { Container } from "@/components/wrapper/container";
import { ScrollArea } from "@workspace/ui/components/scroll-area";

export default function WriteLayout({ children }: { children: React.ReactNode }) {
    return <Container className="max-w-6xl flex h-screen">
    <Sidebar />
    <Container className="max-w-full mx-0 border-x h-full flex flex-col">
      <Appbar />
      <ScrollArea className="w-full flex-1 min-h-[90%]">
        {children}
      </ScrollArea>
    </Container>
  </Container>
}