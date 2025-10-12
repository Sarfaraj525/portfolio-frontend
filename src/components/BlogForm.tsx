// src/components/BlogForm.tsx
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/api";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type BlogInitial = {
  _id?: string;
  title?: string;
  summary?: string;
  content?: string;
};

export default function BlogForm({ onSaved, initial }: { onSaved?: () => void; initial?: BlogInitial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [summary, setSummary] = useState(initial?.summary || "");
  const [content, setContent] = useState(initial?.content || "");
  const [loading, setLoading] = useState(false);

  const createOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Title required");
    if (!content.trim()) return toast.error("Content required");
    setLoading(true);
    try {
      if (initial && initial._id) {
        await api.put(`/blogs/${initial._id}`, { title, summary, content });
        toast.success("Blog updated");
      } else {
        await api.post("/blogs", { title, summary, content });
        toast.success("Blog created");
        setTitle(""); setSummary(""); setContent("");
      }
      onSaved?.();
    } catch (err: unknown) {
      let msg = "Failed";
      if (typeof err === "object" && err !== null && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        msg = response?.data?.message || msg;
      }
      toast.error(msg);
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={createOrUpdate} className="space-y-3">
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
      <input value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="Short summary" className="w-full p-2 border rounded" />
      <div>
        <ReactQuill value={content} onChange={setContent} />
      </div>
      <button disabled={loading} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        {initial ? (loading ? "Updating..." : "Update") : (loading ? "Creating..." : "Create")}
      </button>
    </form>
  );
}
