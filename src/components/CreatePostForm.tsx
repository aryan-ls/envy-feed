import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface CreatePostFormProps {
  onPostCreated: () => void;
  currentUser: string;
}

export const CreatePostForm = ({ onPostCreated, currentUser }: CreatePostFormProps) => {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something to share!",
        variant: "destructive",
      });
      return;
    }

    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const newPost = {
      id: Date.now().toString(),
      content: content.trim(),
      author: currentUser,
      timestamp: new Date().toISOString(),
    };

    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    
    setContent("");
    onPostCreated();
    
    toast({
      title: "Post shared!",
      description: "Your thoughts have been added to the feed",
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Share your daily moments..."
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {content.length}/500 characters
            </span>
            <Button type="submit" disabled={!content.trim()}>
              Share Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};