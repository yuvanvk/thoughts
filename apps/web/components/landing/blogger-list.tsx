import { BlogCard } from "@/components/blog/blog-card";
import type { PostStatus } from "@prisma/client";

const dummyBlogs = [
  {
    id: "1",
    title: "How I Write 10x Faster with AI",
    description:
      "A practical workflow for drafting, editing, and publishing blazing-fast using AI tools.",
    status: "PUBLISHED" as PostStatus,
    createdAt: new Date(),
    imageUrl:
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: [
      { id: "t1", name: "Productivity" },
      { id: "t2", name: "AI" },
    ],
    user: {
      name: "Alex Carter",
      image: null,
    },
  },
  {
    id: "2",
    title: "From Blank Page to First Draft in 30 Minutes",
    description:
      "Step-by-step system to beat writer's block and ship more essays.",
    status: "PUBLISHED" as PostStatus,
    createdAt: new Date(),
    imageUrl:
      "https://images.pexels.com/photos/731020/pexels-photo-731020.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: [
      { id: "t3", name: "Writing" },
      { id: "t4", name: "Workflow" },
    ],
    user: {
      name: "Jordan Lee",
      image: null,
    },
  },
  {
    id: "3",
    title: "Designing a Personal Knowledge Garden",
    description:
      "How to structure notes so ideas compound over time instead of getting lost.",
    status: "PUBLISHED" as PostStatus,
    createdAt: new Date(),
    imageUrl:
      "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: [
      { id: "t5", name: "Knowledge" },
      { id: "t6", name: "Systems" },
    ],
    user: {
      name: "Sam Rivera",
      image: null,
    },
  },
  {
    id: "4",
    title: "The Ultimate Writer’s Tech Stack for 2026",
    description:
      "Tools, setups, and automations that let you focus purely on thinking.",
    status: "PUBLISHED" as PostStatus,
    createdAt: new Date(),
    imageUrl:
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: [
      { id: "t7", name: "Tools" },
      { id: "t8", name: "Setup" },
    ],
    user: {
      name: "Taylor Morgan",
      image: null,
    },
  },
];

export const BloggerList = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 mt-16">
      {dummyBlogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} variant="col" />
      ))}
    </div>
  );
};