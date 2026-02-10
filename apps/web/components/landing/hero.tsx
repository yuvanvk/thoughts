import { Button } from "@workspace/ui/components/button"
import { ArrowRight, BookOpen } from "lucide-react"
import { SquigglyArrow } from "@workspace/ui/components/arrow";

export const Hero = () => {
    return <div className="max-w-[400px] text-center mx-auto relative">
        <div className="flex items-center absolute -top-30 -left-15">
            <img src="/svgs/writing.svg" className="w-20 h-20 -rotate-30"/>
            {/* <SquigglyArrow direction="down" variant="bouncy"  strokeWidth={4} className="text-purple-500 -rotate-120" /> */}
        </div>
            <img src="/svgs/book.svg" className="w-13 h-13 rotate-125 absolute bottom-0 -right-20"/>
        <span className="font-serif text-5xl leading-12">A place to write, publish, &  share your thoughts.</span>
        <p className="mt-5 text-muted-foreground">Share your stories, grow your audience, and join a community of passionate writers and readers.</p>

        <div className="flex items-center gap-x-3 justify-center mt-8 mb-4">
            <Button className="rounded-[10px] cursor-pointer">
                Get started
                <ArrowRight size={20} />
            </Button>

            <Button className="rounded-[10px] dark:bg-neutral-700 border dark:border-neutral-500 dark:hover:bg-neutral-800 text-white cursor-pointer">
                Read blogs
                <BookOpen size={20} />
            </Button>
        </div>
    </div>
}