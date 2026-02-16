import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { News } from "@shared/types";

interface SimpleNewsFormProps {
  newsItem?: News;
  onSuccess: () => void;
}

export default function SimpleNewsForm({ newsItem, onSuccess }: SimpleNewsFormProps) {
  const [title, setTitle] = useState(newsItem?.title || "");
  const [category, setCategory] = useState<"Match Report" | "Announcement" | "Selection" | "Event" | "Other">(newsItem?.category || "Other");
  const [summary, setSummary] = useState(newsItem?.summary || "");
  const [content, setContent] = useState(newsItem?.content || "");
  const [author, setAuthor] = useState(newsItem?.author || "");
  const [published, setPublished] = useState(newsItem?.published ? true : false);

  const createNews = trpc.news.create.useMutation();
  const updateNews = trpc.news.update.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !summary || !content) {
      toast.error("Title, summary, and content are required");
      return;
    }

    try {
      const payload = {
        title,
        category: category as "Match Report" | "Announcement" | "Selection" | "Event" | "Other",
        summary,
        content,
        author,
        published: published ? 1 : 0,
        imageUrl: "",
        publishedAt: published ? new Date() : undefined,
      };

      if (newsItem?.id) {
        await updateNews.mutateAsync({
          id: newsItem.id,
          data: payload,
        });
        toast.success("News updated");
      } else {
        await createNews.mutateAsync(payload);
        toast.success("News created");
        setTitle("");
        setCategory("Other");
        setSummary("");
        setContent("");
        setAuthor("");
        setPublished(false);
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to save news");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-card border border-border rounded-lg">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="title" className="text-sm">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="News title"
            required
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-sm">Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as "Match Report" | "Announcement" | "Selection" | "Event" | "Other")}
            className="w-full px-2 py-1 border border-border rounded text-sm"
          >
            <option>Match Report</option>
            <option>Announcement</option>
            <option>Selection</option>
            <option>Event</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <Label htmlFor="author" className="text-sm">Author</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author name"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Publish</span>
          </label>
        </div>
      </div>

      <div>
        <Label htmlFor="summary" className="text-sm">Summary *</Label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Brief summary..."
          className="w-full px-2 py-1 border border-border rounded text-sm"
          rows={2}
          required
        />
      </div>

      <div>
        <Label htmlFor="content" className="text-sm">Content *</Label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Full content..."
          className="w-full px-2 py-1 border border-border rounded text-sm"
          rows={4}
          required
        />
      </div>

      <Button type="submit" disabled={createNews.isPending || updateNews.isPending} className="w-full">
        {newsItem ? "Update News" : "Add News"}
      </Button>
    </form>
  );
}
