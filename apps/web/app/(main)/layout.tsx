import { Appbar } from "@/components/navigation/appbar";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return <div>
        <Appbar />
        {children}
    </div>
}