"use client";

import { useState, type ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";


// import {
//   Input,
//   Label,
//   Button,
//   Checkbox,
//   Textarea,
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui"; // Make sure all components exist in this path

interface BlogFormProps {
  initialData?: {
    title?: string;
    content?: string;
    thumbnail?: string;
    tags?: string[];
    category?: string;
    isFeatured?: boolean;
  };
  onSubmit: (data: {
    title: string;
    content: string;
    thumbnail?: string;
    tags: string[];
    category: string;
    isFeatured: boolean;
  }) => void;
  buttonText: string;
}

const BlogForm = ({ initialData, onSubmit, buttonText }: BlogFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || title.length < 3) {
      toast.error("Title must be at least 3 characters long");
      return;
    }

    if (!content || content.length < 20) {
      toast.error("Content should be at least 20 characters long");
      return;
    }

    if (!category || category.length < 2) {
      toast.error("Category must be at least 2 characters long");
      return;
    }

    if (tags.length === 0) {
      toast.error("Please add at least one tag");
      return;
    }

    onSubmit({ title, content, thumbnail, category, isFeatured, tags });
    toast.success("Blog saved successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-3xl mx-auto"
    >
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
      </div>

      {/* Thumbnail */}
      <div>
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input
          id="thumbnail"
          type="url"
          placeholder="Enter thumbnail URL"
          value={thumbnail}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setThumbnail(e.target.value)}
        />
      </div>

      {/* Content */}
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Enter blog content"
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          rows={6}
        />
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={category}
          onValueChange={(val: string) => setCategory(val)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div>
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button type="button" onClick={handleAddTag}>
            Add Tag
          </Button>
        </div>
      </div>

      {/* Is Featured */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isFeatured}
          onCheckedChange={(checked: boolean | "indeterminate" | undefined) => setIsFeatured(Boolean(checked))}
        />
        <Label>Featured Blog</Label>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        {buttonText}
      </Button>
    </form>
  );
};

export default BlogForm;
