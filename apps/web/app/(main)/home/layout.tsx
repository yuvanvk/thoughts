import { Appbar } from "@/components/navigation/app-bar";
import { Categories } from "@/components/navigation/categories";
import { Search } from "@/components/navigation/search";
import { Sidebar } from "@/components/navigation/sidebar";
import { Container } from "@/components/wrapper/container";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="max-w-6xl flex">
      <Sidebar />
      <Container className="max-w-[600px] mx-0 border-x ">
        <Appbar />
        {children}
      </Container>
      <Container className="hidden md:block md:flex-1 p-0 border-r ">
        <Search />
        <Categories />
      </Container>
    </Container>
  );
}
