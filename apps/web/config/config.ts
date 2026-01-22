import { Home, Pen } from "@/components/branding/icons";
import { BookOpen, ScrollText } from "lucide-react";

export const Category = [
    {
        id: 1,
        name: "All",
        count: 121,
        route: "all"
    },
    {
        id: 2,
        name: "Engineering",
        count: 20,
        route: "engineering"
    },
    {
        id: 3,
        name: "Design",
        count: 40,
        route: "design"
    },
    {
        id: 4,
        name: "Tech",
        count: 50,
        route: "tech"
    },
    {
        id: 5,
        name: "Software",
        count: 10,
        route: "software"
    },
    {
        id: 6,
        name: "Tools",
        count: 1,
        route: "tools"
    }
];


export const SidebarContent = [
    {
        id: 1,
        name: "Home",
        icon: Home,
        route: "/home"
    },
    {
        id: 2,
        name: "Write",
        icon: Pen,
        route: "/write"
    },
    {
        id: 3, 
        name: "Drafts",
        icon: ScrollText,
        route: "/drafts"
    },
    {
        id: 4,
        name: "My blogs",
        icon: BookOpen,
        route: "/myblogs"
    },
]