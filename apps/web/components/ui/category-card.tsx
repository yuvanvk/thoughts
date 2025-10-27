import Image from "next/image";

export const CategoryCard = ({ imageUrl, title}: { imageUrl: string, title: string }) => (
    <div className="w-full h-36 relative cursor-pointer">
        <Image src={imageUrl} alt="hr" fill className="object-cover blur-[2px]"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full px-16 text-2xl font-medium font-mono ">
            <div>{title}</div>
            
        </div>
    </div>
)