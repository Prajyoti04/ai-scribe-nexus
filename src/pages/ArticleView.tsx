import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Heart, Bookmark, Eye, MessageSquare, Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import CommentSection from "@/components/articles/CommentSection";
import ShareArticle from "@/components/articles/ShareArticle";

interface Article {
  id: string;
  title: string;
  content?: string;
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

export default function ArticleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem("techoh-user");
    if (userData) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(userData));
    }

    // Initialize storage if needed
    if (!localStorage.getItem("techoh-articles")) {
      localStorage.setItem("techoh-articles", JSON.stringify([]));
    }
    
    if (!localStorage.getItem("techoh-liked-articles")) {
      localStorage.setItem("techoh-liked-articles", JSON.stringify([]));
    }
    
    if (!localStorage.getItem("techoh-saved-articles")) {
      localStorage.setItem("techoh-saved-articles", JSON.stringify([]));
    }

    // Get article from localStorage
    const articles = JSON.parse(localStorage.getItem("techoh-articles") || "[]");
    
    if (!id) {
      navigate("/not-found");
      return;
    }
    
    const foundArticle = articles.find((a: Article) => a.id === id);
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Update views count
      const updatedArticles = articles.map((a: Article) => {
        if (a.id === id) {
          return { ...a, views: a.views + 1 };
        }
        return a;
      });
      
      localStorage.setItem("techoh-articles", JSON.stringify(updatedArticles));
      
      // Check if article is liked by current user
      if (isAuthenticated) {
        const likedArticles = JSON.parse(localStorage.getItem("techoh-liked-articles") || "[]");
        setIsLiked(likedArticles.includes(id));
        
        // Check if article is saved by current user
        const savedArticles = JSON.parse(localStorage.getItem("techoh-saved-articles") || "[]");
        setIsSaved(savedArticles.includes(id));
      }
    } else {
      // For demo purposes, create a sample article if not found
      const demoArticle: Article = {
        id: id,
        title: "Building Scalable Microservices with Go and Kubernetes",
        excerpt: "Learn how to design and implement a highly scalable microservice architecture using Go, Kubernetes, and the latest cloud-native technologies.",
        cover: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=1080&auto=format&fit=crop",
        author: {
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?img=32",
          id: "sarah-johnson"
        },
        publishDate: "Apr 15, 2025",
        readTime: 12,
        tags: ["golang", "kubernetes", "microservices", "cloud"],
        likes: 254,
        views: 2489,
        comments: 27,
        aiEnhanced: true
      };
      
      setArticle(demoArticle);
      
      // Add demo article to storage for future viewing
      const updatedArticles = [...articles, demoArticle];
      localStorage.setItem("techoh-articles", JSON.stringify(updatedArticles));
    }
    
    setIsLoading(false);
  }, [id, navigate, isAuthenticated]);

  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "You need to sign in to like articles.",
      });
      return;
    }
    
    // Get all articles
    const articles = JSON.parse(localStorage.getItem("techoh-articles") || "[]");
    
    // Get liked articles for current user
    const likedArticles = JSON.parse(localStorage.getItem("techoh-liked-articles") || "[]");
    
    if (isLiked) {
      // Remove like
      const updatedLikedArticles = likedArticles.filter((articleId: string) => articleId !== id);
      localStorage.setItem("techoh-liked-articles", JSON.stringify(updatedLikedArticles));
      
      // Update article like count
      const updatedArticles = articles.map((a: Article) => {
        if (a.id === id) {
          return { ...a, likes: a.likes - 1 };
        }
        return a;
      });
      
      localStorage.setItem("techoh-articles", JSON.stringify(updatedArticles));
      
      // Update state
      setIsLiked(false);
      setArticle((prev) => prev ? { ...prev, likes: prev.likes - 1 } : null);
    } else {
      // Add like
      const updatedLikedArticles = [...likedArticles, id];
      localStorage.setItem("techoh-liked-articles", JSON.stringify(updatedLikedArticles));
      
      // Update article like count
      const updatedArticles = articles.map((a: Article) => {
        if (a.id === id) {
          return { ...a, likes: a.likes + 1 };
        }
        return a;
      });
      
      localStorage.setItem("techoh-articles", JSON.stringify(updatedArticles));
      
      // Update state
      setIsLiked(true);
      setArticle((prev) => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "You need to sign in to save articles.",
      });
      return;
    }
    
    // Get saved articles for current user
    const savedArticles = JSON.parse(localStorage.getItem("techoh-saved-articles") || "[]");
    
    if (isSaved) {
      // Remove from saved
      const updatedSavedArticles = savedArticles.filter((articleId: string) => articleId !== id);
      localStorage.setItem("techoh-saved-articles", JSON.stringify(updatedSavedArticles));
      
      // Update state
      setIsSaved(false);
      
      toast({
        title: "Article removed",
        description: "Article removed from your saved list.",
      });
    } else {
      // Add to saved
      const updatedSavedArticles = [...savedArticles, id];
      localStorage.setItem("techoh-saved-articles", JSON.stringify(updatedSavedArticles));
      
      // Update state
      setIsSaved(true);
      
      toast({
        title: "Article saved",
        description: "Article added to your saved list.",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout isAuthenticated={isAuthenticated}>
        <div className="container py-12">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-techoh-purple border-t-transparent"></div>
            <span className="ml-2">Loading article...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout isAuthenticated={isAuthenticated}>
        <div className="container py-12">
          <Alert className="mb-4">
            <AlertDescription>
              Article not found. It may have been removed or is no longer available.
            </AlertDescription>
          </Alert>
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div className="container max-w-4xl py-12">
        <article>
          {/* Article Header */}
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">{article.title}</h1>
          
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link to={`/profile/${article.author.id}`} className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{article.author.name}</span>
            </Link>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-1.5 h-4 w-4" />
              <span>{article.publishDate}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center text-muted-foreground">
              <Clock className="mr-1.5 h-4 w-4" />
              <span>{article.readTime} min read</span>
            </div>
            {article.aiEnhanced && (
              <>
                <span className="text-muted-foreground">•</span>
                <Badge variant="secondary">
                  <Award className="mr-1.5 h-3 w-3" />
                  <span>AI Enhanced</span>
                </Badge>
              </>
            )}
          </div>

          {/* Featured Image */}
          <div className="mb-8 overflow-hidden rounded-lg">
            <img
              src={article.cover}
              alt={article.title}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose max-w-none lg:prose-lg">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <>
                <p className="lead">{article.excerpt}</p>
                <Alert className="my-8">
                  <AlertDescription>
                    This is a sample article. The full content is not available.
                  </AlertDescription>
                </Alert>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h2>Getting Started</h2>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <ul>
                  <li>Step 1: Install the dependencies</li>
                  <li>Step 2: Configure your environment</li>
                  <li>Step 3: Start building your application</li>
                </ul>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article Footer */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                className={isLiked ? "bg-techoh-purple hover:bg-techoh-purple/90" : ""}
                onClick={handleLike}
              >
                <Heart className={`mr-1 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span>{article.likes}</span>
              </Button>
              <Button
                variant={isSaved ? "default" : "outline"}
                size="sm"
                className={isSaved ? "bg-techoh-purple hover:bg-techoh-purple/90" : ""}
                onClick={handleSave}
              >
                <Bookmark className={`mr-1 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                <span>Save</span>
              </Button>
              <div className="flex items-center text-muted-foreground">
                <Eye className="mr-1.5 h-4 w-4" />
                <span>{article.views} views</span>
              </div>
            </div>
            <ShareArticle articleId={article.id} title={article.title} />
          </div>
          
          <Separator className="my-8" />
          
          {/* Author Bio */}
          <div className="rounded-lg border border-border bg-card/50 p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="mb-1 text-lg font-medium">About {article.author.name}</h3>
                <p className="mb-4 text-muted-foreground">
                  Tech enthusiast and software developer with a passion for sharing knowledge.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/profile/${article.author.id}`}>View Profile</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          {/* Comments Section */}
          <CommentSection articleId={article.id} />
        </article>
      </div>
    </Layout>
  );
}
