"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import API from "@/lib/api";

type Blog = {
  _id: string;
  title: string;
  content: string;
};

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogs = async () => {
    const res = await API.get("/blogs");
    setBlogs(res.data as Blog[]);
  };

  const createBlog = async () => {
    try {
      await API.post("/blogs", { title, content });
      toast.success("Blog created!");
      fetchBlogs();
    } catch {
      toast.error("Failed to create blog");
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  return (
    <ProtectedRoute>
      <Toaster />
      <div className="p-8">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

        <div className="mb-8">
          <h2 className="text-xl mb-2">Create Blog</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <button onClick={createBlog} className="bg-green-600 text-white px-4 py-2 rounded">
            Add Blog
          </button>
        </div>

        <h2 className="text-xl mb-2">All Blogs</h2>
        {blogs.map((b) => (
          <div key={b._id} className="border p-3 mb-2 rounded">
            <h3 className="font-semibold">{b.title}</h3>
            <p>{b.content}</p>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}
