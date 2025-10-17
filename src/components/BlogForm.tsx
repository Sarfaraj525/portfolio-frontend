"use client";

import { useState, type ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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

  // ✅ Add tag
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  // ✅ Remove tag
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // ✅ Submit blog form
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
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    if (tags.length === 0) {
      toast.error("Add at least one tag");
      return;
    }

    onSubmit({ title, content, thumbnail, category, isFeatured, tags });
    toast.success("Blog saved successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white shadow-md rounded-xl p-6 sm:p-8 
        max-w-3xl mx-auto 
        space-y-5 
        transition-all duration-200
      "
    >
      {/* Title */}
      <div className="flex flex-col">
        <Label htmlFor="title" className="font-medium text-gray-700">
          Title
        </Label>
        <Input
          id="title"
          placeholder="Enter blog title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="mt-1"
        />
      </div>

      {/* Thumbnail */}
      <div className="flex flex-col">
        <Label htmlFor="thumbnail" className="font-medium text-gray-700">
          Thumbnail URL
        </Label>
        <Input
          id="thumbnail"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={thumbnail}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setThumbnail(e.target.value)
          }
          className="mt-1"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <Label htmlFor="content" className="font-medium text-gray-700">
          Content
        </Label>
        <Textarea
          id="content"
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          rows={6}
          className="mt-1 resize-none"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <Label htmlFor="category" className="font-medium text-gray-700">
          Category
        </Label>
        <Select value={category} onValueChange={(val) => setCategory(val)}>
          <SelectTrigger id="category" className="mt-1">
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
      <div className="flex flex-col">
        <Label className="font-medium text-gray-700">Tags</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                bg-blue-100 text-blue-800 px-3 py-1 rounded-full 
                flex items-center gap-1 text-sm font-medium
              "
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-red-500 font-bold hover:text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <Input
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTagInput(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleAddTag}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            Add Tag
          </Button>
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={isFeatured}
          onCheckedChange={(checked) => setIsFeatured(Boolean(checked))}
          id="featured"
        />
        <Label htmlFor="featured" className="text-gray-700">
          Featured Blog
        </Label>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="
          w-full bg-blue-600 hover:bg-blue-700 
          text-white font-semibold py-2
        "
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default BlogForm;
