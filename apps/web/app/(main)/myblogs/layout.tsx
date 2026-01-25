import { Appbar } from "@/components/navigation/app-bar";
import { Categories } from "@/components/navigation/categories";
import { Search } from "@/components/navigation/search";
import { Sidebar } from "@/components/navigation/sidebar";
import { Container } from "@/components/wrapper/container";
import { ScrollArea } from "@workspace/ui/components/scroll-area";

export default function MyBlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="max-w-6xl flex h-screen">
      <Sidebar />
      <Container className="max-w-full lg:max-w-[600px] mx-0 border-x flex flex-col h-full space-y-4">
        <Appbar />
        <ScrollArea className="w-full px-4 flex-1 min-h-[90%]">
          {children}
        </ScrollArea>
      </Container>
      <Container className="hidden md:block md:flex-1 p-0 border-r space-y-2">
        <Search />
        <Categories />
      </Container>
    </Container>
  );
}
