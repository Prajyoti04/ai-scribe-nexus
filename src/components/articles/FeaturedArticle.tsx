
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Eye, BookmarkPlus, Sparkles } from "lucide-react";

interface FeaturedArticleProps {
  id: string;
  title: string;
  excerpt: string;
  cover: string;
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
  aiEnhanced?: boolean;
}

export default function FeaturedArticle({
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
  aiEnhanced,
}: FeaturedArticleProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-muted/50 to-background">
      <div className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                to={`/tag/${tag}`}
                className="text-xs font-medium text-techoh-purple hover:underline"
              >
                #{tag}
              </Link>
            ))}
            {aiEnhanced && (
              <Badge className="badge-ai flex items-center gap-1">
                <Sparkles size={12} />
                <span>AI Enhanced</span>
              </Badge>
            )}
          </div>
          <Link to={`/article/${id}`} className="block">
            <h2 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-4xl">
              {title}
            </h2>
          </Link>
          <p className="text-muted-foreground md:text-lg">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to={`/profile/${author.id}`}>
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link to={`/profile/${author.id}`} className="font-medium hover:underline">
                  {author.name}
                </Link>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{publishDate}</span>
                  <span className="mx-1">•</span>
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>
            <div className="hidden space-x-2 md:flex">
              <Button asChild variant="default">
                <Link to={`/article/${id}`}>Read Article</Link>
              </Button>
              <Button variant="ghost" size="icon">
                <BookmarkPlus size={18} />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye size={16} />
              {views} views
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp size={16} />
              {likes} likes
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={16} />
              {comments} comments
            </span>
          </div>
          <div className="flex md:hidden">
            <Button asChild variant="default" className="w-full">
              <Link to={`/article/${id}`}>Read Article</Link>
            </Button>
          </div>
        </div>
        <div className="order-first lg:order-last">
          <Link to={`/article/${id}`} className="block overflow-hidden rounded-lg">
            <img
              src={cover}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
