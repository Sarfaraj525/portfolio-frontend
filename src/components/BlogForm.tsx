"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface BlogFormProps {
  initialData?: { title: string; description: string };
  onSubmit: (data: { title: string; description: string }) => void;
  buttonText: string;
}

const BlogForm = ({ initialData, onSubmit, buttonText }: BlogFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please fill out all fields");
      return;
    }

    onSubmit({ title, description });
    toast.success("Blog saved successfully!");
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Enter blog title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Enter blog description"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default BlogForm;
