export const Container = ({ children }: { children: React.ReactNode }) => {
    return <div className="max-w-xl mx-auto px-2 py-2 space-y-8">
        {children}
    </div>
}