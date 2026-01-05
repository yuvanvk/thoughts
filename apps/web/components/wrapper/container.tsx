import { cn } from "@workspace/ui/lib/utils"

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return <div className={cn("max-w-xl mx-auto space-y-8 w-full", className)}>
        {children}
    </div>
}