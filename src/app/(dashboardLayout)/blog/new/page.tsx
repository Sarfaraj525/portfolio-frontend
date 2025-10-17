"use client";

import BlogForm from "@/components/BlogForm";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

const NewBlogPage = () => {
  const router = useRouter();

  const handleCreateBlog = (data: {
    title: string;
    content: string;
    thumbnail?: string;
    tags: string[];
    category: string;
    isFeatured: boolean;
  }) => {
    console.log("New blog created:", data);

    // You can send this to backend here via Axios
    // axios.post("/api/blogs", data)

    toast.success("Blog created successfully!");
    router.push("/dashboard/blog"); // redirect back to blog list
  };

  return (
    <div className="p-6 w-full">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Blog</h1>

      <div className="max-w-2xl mx-auto">
        <BlogForm
          onSubmit={handleCreateBlog}
          buttonText="Create Blog"
          initialData={{
            title: "",
            content: "",
            thumbnail: "",
            tags: [],
            category: "",
            isFeatured: false,
          }}
        />
      </div>
    </div>
  );
};

export default NewBlogPage;
