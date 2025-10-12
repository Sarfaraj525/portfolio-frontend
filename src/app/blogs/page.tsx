import BlogCard from "@/components/BlogCard";
import API from "@/lib/api";
// import BlogCard from "@/components/BlogCard";

export const revalidate = 60; // ISR every 60s

type Blog = {
  _id: string;
  title: string;
  content: string;
  // Add other fields as needed
};

export default async function BlogsPage() {
  const res = await fetch("http://localhost:5000/api/blogs", { next: { revalidate: 60 } });
  const blogs: Blog[] = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">All Blogs</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((b: Blog) => <BlogCard key={b._id} blog={b} />)}
      </div>
    </div>
  );
}
