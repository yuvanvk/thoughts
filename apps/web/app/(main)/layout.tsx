import { Appbar } from "@/components/ui/appbar";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <div>
        <Appbar />
        {children}
    </div>
}