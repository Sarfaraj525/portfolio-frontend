import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  content: string;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-gray-700 mb-2">{blog.content.slice(0, 80)}...</p>
      <Link href={`/blogs/${blog._id}`} className="text-blue-600 hover:underline">Read More</Link>
    </div>
  );
}
