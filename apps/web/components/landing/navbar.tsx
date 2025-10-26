export const Navbar = () => (
    <div className="fixed flex items-center justify-between w-full px-16 py-4 uppercase bg-black border-b">
        <div className="uppercase">Thoughts</div>
        <div className="flex items-center gap-x-8 font-mono">
            <div className="cursor-pointer">sign up</div>
            <div className="cursor-pointer">login</div>
        </div>
    </div>
)