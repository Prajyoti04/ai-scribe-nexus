
import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import ArticleCard from "@/components/articles/ArticleCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";

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

export default function SavedArticles() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  
  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem("techoh-user");
    if (user) {
      setIsAuthenticated(true);
      
      // Get saved articles from localStorage
      const savedArticlesIds = JSON.parse(localStorage.getItem("techoh-saved-articles") || "[]");
      const allArticles = JSON.parse(localStorage.getItem("techoh-articles") || "[]");
      
      // Filter articles by saved IDs
      const userSavedArticles = allArticles.filter((article: Article) => 
        savedArticlesIds.includes(article.id)
      );
      
      setSavedArticles(userSavedArticles);
    }
  }, []);

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div className="container py-12">
        <h1 className="mb-8 text-4xl font-bold">Saved Articles</h1>
        
        {isAuthenticated ? (
          savedArticles.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {savedArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Bookmark className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 text-2xl font-semibold">No saved articles yet</h2>
              <p className="mb-6 text-muted-foreground">
                When you save articles, they will appear here for easy access.
              </p>
              <Button asChild>
                <Link to="/">Explore Articles</Link>
              </Button>
            </Card>
          )
        ) : (
          <Card className="p-12 text-center">
            <h2 className="mb-2 text-2xl font-semibold">Sign in to save articles</h2>
            <p className="mb-6 text-muted-foreground">
              You need to be signed in to save and view your saved articles.
            </p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </Card>
        )}
      </div>
    </Layout>
  );
}
