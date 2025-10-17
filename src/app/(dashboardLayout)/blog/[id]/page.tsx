"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import BlogForm from "@/components/BlogForm";
import { toast, Toaster } from "react-hot-toast";

interface Blog {
  title: string;
  description: string;
}

const EditBlogPage = () => {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch single blog from backend
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get<{ data: Blog }>(
          `https://portfolio-backend-production.up.railway.app/api/blogs/${blogId}`
        );
        setBlog(data.data); // Adjust based on your API response structure
      } catch (error: unknown) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId]);

  // ✅ Handle blog update
  const handleUpdate = async (data: Blog) => {
    try {
      await axios.put(
        `https://portfolio-backend-production.up.railway.app/api/blogs/${blogId}`,
        data
      );
      toast.success("Blog updated successfully!");
      router.push("/dashboard/blog");
    } catch (error: unknown) {
      console.error("Update failed:", error);
      toast.error("Failed to update blog.");
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-600 py-10">Loading blog details...</div>
    );

  if (!blog)
    return (
      <div className="text-center text-red-500 py-10">
        Blog not found or failed to load.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog</h1>

      <BlogForm
        initialData={blog}
        onSubmit={handleUpdate}
        buttonText="Update Blog"
      />
    </div>
  );
};

export default EditBlogPage;
