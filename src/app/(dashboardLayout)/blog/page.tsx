"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import BlogForm from "@/components/BlogForm";

type BlogFormData = {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  category: string;
  isFeatured: boolean;
};

interface Blog extends BlogFormData {
  id: string;
}

const BlogManagementPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      title: "My First Blog",
      content: "This is a sample blog post with content...",
      thumbnail: "",
      tags: ["sample"],
      category: "tech",
      isFeatured: false,
    },
    {
      id: "2",
      title: "Next.js + TypeScript Setup",
      content: "Learn how to build scalable apps with Next.js and TypeScript...",
      thumbnail: "",
      tags: ["nextjs", "typescript"],
      category: "education",
      isFeatured: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Create new blog
  const handleCreateBlog = (data: BlogFormData) => {
    const newBlog: Blog = {
      id: Date.now().toString(),
      ...data,
    };
    setBlogs((prev) => [...prev, newBlog]);
    toast.success("Blog created successfully!");
    setShowForm(false);
  };

  // Update existing blog
  const handleUpdateBlog = (data: BlogFormData) => {
    if (!editingBlog) return;

    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === editingBlog.id ? { ...blog, ...data } : blog
      )
    );
    toast.success("Blog updated successfully!");
    setEditingBlog(null);
    setShowForm(false);
  };

  // Delete blog
  const handleDelete = (id: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    toast.success("Blog deleted successfully!");
  };

  // Open form in edit mode
  const handleEditClick = (blog: Blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  return (
    <div className="p-4">
      <Toaster position="top-right" />

      {!showForm ? (
        <>
          {/* Blog List Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
            <button
              onClick={() => {
                setEditingBlog(null);
                setShowForm(true);
              }}
              className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              <FaPlus className="mr-2" /> New Blog
            </button>
          </div>

          {/* Blog Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {blogs.length > 0 ? (
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-gray-700">Title</th>
                    <th className="py-3 px-4 text-gray-700">Category</th>
                    <th className="py-3 px-4 text-gray-700">Tags</th>
                    <th className="py-3 px-4 text-gray-700">Featured</th>
                    <th className="py-3 px-4 text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="border-t">
                      <td className="py-3 px-4">{blog.title}</td>
                      <td className="py-3 px-4">{blog.category}</td>
                      <td className="py-3 px-4">
                        {blog.tags.join(", ")}
                      </td>
                      <td className="py-3 px-4">
                        {blog.isFeatured ? "Yes" : "No"}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-3">
                        <button
                          onClick={() => handleEditClick(blog)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
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
              <p className="text-gray-500 text-center py-6">
                No blogs found.
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Blog Form */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {editingBlog ? "Edit Blog" : "Create New Blog"}
            </h1>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Back
            </button>
          </div>

          <div className="max-w-3xl mx-auto">
            <BlogForm
              initialData={editingBlog ?? undefined}
              onSubmit={editingBlog ? handleUpdateBlog : handleCreateBlog}
              buttonText={editingBlog ? "Update Blog" : "Create Blog"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BlogManagementPage;
