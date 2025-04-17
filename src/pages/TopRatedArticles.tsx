
import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import ArticleCard from "@/components/articles/ArticleCard";
import { Award } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  cover: string;
  author: {
    name: string;
    avatar: string;
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

export default function TopRatedArticles() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  
  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem("techoh-user");
    if (user) {
      setIsAuthenticated(true);
    }
    
    // Get all articles from localStorage
    const allArticles = JSON.parse(localStorage.getItem("techoh-articles") || "[]");
    
    // Sort articles by likes (highest first)
    const sortedArticles = [...allArticles].sort((a, b) => b.likes - a.likes);
    
    setArticles(sortedArticles);
  }, []);

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div className="container py-12">
        <div className="mb-8 flex items-center gap-3">
          <Award className="h-8 w-8 text-techoh-purple" />
          <h1 className="text-4xl font-bold">Top Rated Articles</h1>
        </div>
        
        {articles.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <h2 className="mb-2 text-2xl font-semibold">No articles available</h2>
            <p className="text-muted-foreground">
              Be the first to publish content on Tech-OH Blog!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
