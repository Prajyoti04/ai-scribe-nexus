
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TrendingUp } from "lucide-react";

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

export default function Trending() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Check if a user is logged in
    const user = localStorage.getItem("techoh-user");
    if (user) {
      setIsAuthenticated(true);
    }

    // Set mock trending articles
    setTrendingArticles([
      {
        id: "1",
        title: "The Future of Web Development: WebAssembly and Beyond",
        excerpt: "Exploring how WebAssembly is changing the landscape of web applications",
        cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        author: {
          name: "Alex Morgan",
          avatar: "https://i.pravatar.cc/150?img=33",
          id: "user_trending1"
        },
        publishDate: "April 17, 2025",
        readTime: 8,
        tags: ["webassembly", "javascript", "future-tech"],
        likes: 325,
        views: 7890,
        comments: 42,
        trending: true
      },
      {
        id: "2",
        title: "Machine Learning for Frontend Developers",
        excerpt: "How to integrate machine learning models into your web applications",
        cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        author: {
          name: "Jamie Lee",
          avatar: "https://i.pravatar.cc/150?img=34",
          id: "user_trending2"
        },
        publishDate: "April 15, 2025",
        readTime: 10,
        tags: ["machine-learning", "frontend", "tensorflow.js"],
        likes: 271,
        views: 6543,
        comments: 38,
        trending: true
      },
      {
        id: "3",
        title: "Optimizing Cloud Infrastructure for Cost Efficiency",
        excerpt: "Strategies to reduce your cloud bill without compromising performance",
        cover: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
        author: {
          name: "Taylor Kim",
          avatar: "https://i.pravatar.cc/150?img=35",
          id: "user_trending3"
        },
        publishDate: "April 14, 2025",
        readTime: 7,
        tags: ["cloud", "aws", "cost-optimization"],
        likes: 198,
        views: 5124,
        comments: 27,
        trending: true
      }
    ]);
  }, []);

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div className="container max-w-6xl py-8">
        <div className="mb-8 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-techoh-purple" />
          <h1 className="text-3xl font-bold tracking-tight">Trending Articles</h1>
        </div>

        <Tabs defaultValue="today" className="mb-8">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="year">This Year</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="pt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trendingArticles.map(article => (
                <Link 
                  key={article.id} 
                  to={`/article/${article.id}`} 
                  className="group overflow-hidden rounded-lg border border-border/50 bg-card transition-all hover:border-border hover:shadow-md"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={article.cover}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={article.author.avatar} alt={article.author.name} />
                        <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{article.author.name}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{article.publishDate}</span>
                    </div>
                    <h3 className="mb-2 line-clamp-2 font-semibold">{article.title}</h3>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{article.readTime} min read</span>
                        <span>•</span>
                        <span>{article.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="week" className="pt-4">
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertTitle>Coming Soon</AlertTitle>
              <AlertDescription>
                Weekly trending articles will be available in the next update.
              </AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="month" className="pt-4">
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertTitle>Coming Soon</AlertTitle>
              <AlertDescription>
                Monthly trending articles will be available in the next update.
              </AlertDescription>
            </Alert>
          </TabsContent>
          <TabsContent value="year" className="pt-4">
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertTitle>Coming Soon</AlertTitle>
              <AlertDescription>
                Yearly trending articles will be available in the next update.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
