
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, MessageSquare, BookmarkPlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  cover?: string;
  author: {
    name: string;
    avatar?: string;
    id: string;
  };
  publishDate: string;
  readTime: number;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  trending?: boolean;
  aiEnhanced?: boolean;
}

export default function ArticleCard({
  id,
  title,
  excerpt,
  cover,
  author,
  publishDate,
  readTime,
  tags,
  likes,
  views,
  comments,
  trending,
  aiEnhanced,
}: ArticleCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border/40 bg-card transition-all duration-200 hover:border-techoh-purple/40 hover:shadow-md">
      {cover && (
        <Link to={`/article/${id}`} className="relative aspect-video w-full overflow-hidden">
          <img
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 flex gap-1 p-2">
            {trending && <Badge className="badge-trending">Trending</Badge>}
            {aiEnhanced && (
              <Badge className="badge-ai flex items-center gap-1">
                <Sparkles size={12} />
                <span>AI Enhanced</span>
              </Badge>
            )}
          </div>
        </Link>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              to={`/tag/${tag}`}
              className="text-xs font-medium text-techoh-purple hover:underline"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <Link to={`/article/${id}`} className="mb-2">
          <h3 className="font-semibold text-lg md:text-xl line-clamp-2 hover:text-techoh-purple transition-colors">
            {title}
          </h3>
        </Link>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${author.id}`}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <Link to={`/profile/${author.id}`} className="text-sm font-medium hover:underline">
                {author.name}
              </Link>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{publishDate}</span>
                <span className="mx-1">•</span>
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye size={14} />
              {views}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ThumbsUp size={14} />
              {likes}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageSquare size={14} />
              {comments}
            </span>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <BookmarkPlus size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
