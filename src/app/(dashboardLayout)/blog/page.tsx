"use client";

import { useState } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Blog {
  id: string;
  title: string;
  description: string;
}

const BlogManagementPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    { id: "1", title: "My First Blog", description: "This is a sample blog post." },
    { id: "2", title: "Next.js + TypeScript Setup", description: "Learn how to build scalable apps." },
  ]);

  const handleDelete = (id: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    toast.success("Blog deleted successfully!");
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        <Link
          href="/dashboard/blog/new"
          className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> New Blog
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {blogs.length > 0 ? (
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-gray-700">Title</th>
                <th className="py-3 px-4 text-gray-700">Description</th>
                <th className="py-3 px-4 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-t">
                  <td className="py-3 px-4">{blog.title}</td>
                  <td className="py-3 px-4 text-gray-600">{blog.description}</td>
                  <td className="py-3 px-4 flex items-center space-x-3">
                    <Link
                      href={`/dashboard/blog/${blog.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center py-6">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogManagementPage;
