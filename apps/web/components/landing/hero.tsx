import { Button } from "@workspace/ui/components/button"
import { ArrowRight, BookOpen } from "lucide-react"

export const Hero = () => {
    return <div className="max-w-[400px] text-center pt-20 mx-auto">
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