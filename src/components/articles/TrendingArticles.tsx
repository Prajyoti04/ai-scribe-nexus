
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, TrendingUp } from "lucide-react";

interface TrendingArticle {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
    id: string;
  };
  likes: number;
  category: string;
}

interface TrendingArticlesProps {
  articles: TrendingArticle[];
}

export default function TrendingArticles({ articles }: TrendingArticlesProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-techoh-accent-orange" />
          <h3 className="text-lg font-semibold">Trending Now</h3>
        </div>
        <Link to="/trending" className="text-sm text-techoh-purple hover:underline">
          See all
        </Link>
      </div>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={article.id} className="flex items-start gap-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
              {index + 1}
            </span>
            <div className="space-y-1">
              <Link to={`/article/${article.id}`} className="font-medium hover:text-techoh-purple line-clamp-2">
                {article.title}
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{article.author.name}</span>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ThumbsUp size={12} /> {article.likes}
                </span>
                <Badge variant="outline" className="h-5 text-[10px]">
                  {article.category}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
