
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  Eye,
  Calendar,
  ChevronLeft,
  Send,
  Sparkles,
  Award,
} from "lucide-react";
import AIAssistantPanel from "@/components/articles/AIAssistantPanel";

// Mock article data
const articleData = {
  id: "1",
  title: "Building Scalable Microservices with Go and Kubernetes in 2025",
  content: `
    <h2>Introduction</h2>
    <p>As we move into 2025, building scalable, resilient microservices has become more critical than ever for modern software architectures. This article explores best practices for creating microservices using Go and Kubernetes, with a focus on the latest advancements in these technologies.</p>
    
    <p>Go has established itself as a premier language for building microservices due to its simplicity, efficient concurrency model, and excellent standard library. When combined with Kubernetes' robust container orchestration capabilities, developers can create systems that scale seamlessly and handle failures gracefully.</p>
    
    <h2>Why Go for Microservices?</h2>
    <p>Go's lightweight goroutines and channels make it perfectly suited for handling thousands of concurrent connections with minimal resource overhead. The language's simplicity also reduces cognitive load for developers, allowing them to focus on creating maintainable, efficient services.</p>
    
    <p>Key advantages include:</p>
    <ul>
      <li>Fast compilation and runtime performance</li>
      <li>Built-in concurrency primitives</li>
      <li>Strong standard library for network services</li>
      <li>Static typing with pragmatic simplicity</li>
      <li>Single binary deployments</li>
    </ul>

    <h2>Kubernetes as the Foundation</h2>
    <p>Kubernetes has evolved significantly in recent years, providing an increasingly sophisticated platform for deploying, scaling, and managing containerized applications. In 2025, Kubernetes offers enhanced developer experience through:</p>
    
    <ul>
      <li>Simplified multi-cluster management</li>
      <li>Advanced autoscaling capabilities</li>
      <li>Improved resource efficiency</li>
      <li>Enhanced security features</li>
      <li>Better support for GitOps workflows</li>
    </ul>

    <h2>Service Mesh Integration</h2>
    <p>Modern microservice architectures benefit greatly from service mesh technologies like Istio, Linkerd, or the newer lightweight alternatives. These provide crucial capabilities including:</p>
    
    <ul>
      <li>Transparent mTLS for all service-to-service communication</li>
      <li>Advanced traffic management and routing</li>
      <li>Detailed observability with minimal code changes</li>
      <li>Rate limiting and circuit breaking</li>
      <li>Policy enforcement across the service ecosystem</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Building scalable microservices with Go and Kubernetes in 2025 involves embracing these technologies' latest advancements while following established best practices. The combination provides an exceptionally powerful foundation for creating resilient, performant distributed systems that can scale to meet the demands of even the most challenging workloads.</p>
  `,
  publishDate: "Apr 15, 2025",
  readTime: 12,
  cover: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=1080&auto=format&fit=crop",
  author: {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=32",
    bio: "Senior Software Engineer at TechCorp | Kubernetes & Go enthusiast",
    followers: 342
  },
  tags: ["golang", "kubernetes", "microservices", "cloud"],
  views: 24689,
  likes: 1254,
  comments: [
    {
      id: "comment1",
      user: {
        name: "Alex Chen",
        avatar: "https://i.pravatar.cc/150?img=11",
        id: "alex-chen"
      },
      content: "Great article! I especially liked the section on service mesh integration. Have you considered discussing how eBPF is changing the landscape for service mesh implementations?",
      date: "2 hours ago",
      likes: 12
    },
    {
      id: "comment2",
      user: {
        name: "Emily Zhao",
        avatar: "https://i.pravatar.cc/150?img=5",
        id: "emily-zhao"
      },
      content: "This was super helpful for my current project. One question - what monitoring tools would you recommend for this kind of architecture?",
      date: "5 hours ago",
      likes: 8
    }
  ],
  relatedArticles: [
    {
      id: "2",
      title: "Advanced Error Handling Patterns in Go Microservices",
      author: "Miguel Rodriguez"
    },
    {
      id: "3",
      title: "Kubernetes Operators: Extending Kubernetes for Stateful Applications",
      author: "Nina Johnson"
    },
    {
      id: "4",
      title: "Building Event-Driven Architectures with Go and NATS",
      author: "David Kimani"
    }
  ],
  aiGenerated: false,
  aiEnhanced: true,
};

export default function ArticleView() {
  const [isAuthenticated] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  
  const handleComment = () => {
    if (commentText.trim()) {
      // Logic to post comment would go here
      setCommentText("");
    }
  };

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div className="container py-8">
        <div className="mb-6 flex items-center">
          <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft size={16} className="mr-1" />
            Back to Home
          </Link>
        </div>
        
        <article className="mx-auto max-w-3xl">
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {articleData.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tag/${tag}`}
                  className="text-sm font-medium text-techoh-purple hover:underline"
                >
                  #{tag}
                </Link>
              ))}
              {articleData.aiEnhanced && (
                <Badge className="badge-ai flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>AI Enhanced</span>
                </Badge>
              )}
            </div>
            
            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              {articleData.title}
            </h1>
            
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Link to={`/profile/${articleData.author.id}`}>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={articleData.author.avatar} alt={articleData.author.name} />
                    <AvatarFallback>{articleData.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link to={`/profile/${articleData.author.id}`} className="font-medium hover:underline">
                    {articleData.author.name}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      <span>{articleData.publishDate}</span>
                    </div>
                    <span>•</span>
                    <span>{articleData.readTime} min read</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 sm:mt-0">
                <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowAiAssistant(!showAiAssistant)}>
                  <Sparkles size={14} className="text-techoh-blue" />
                  <span>AI Assistant</span>
                </Button>
              </div>
            </div>
            
            {articleData.cover && (
              <div className="mb-8 overflow-hidden rounded-lg">
                <img
                  src={articleData.cover}
                  alt={articleData.title}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </header>
          
          {showAiAssistant && (
            <div className="mb-8">
              <AIAssistantPanel onClose={() => setShowAiAssistant(false)} />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: articleData.content }} />
          </div>
          
          <footer className="mt-10">
            <div className="flex items-center justify-between border-t border-b border-border/40 py-4">
              <div className="flex items-center gap-4">
                <Button
                  variant={liked ? "default" : "outline"}
                  className={liked ? "bg-techoh-purple hover:bg-techoh-purple/90" : ""}
                  size="sm"
                  onClick={handleLike}
                >
                  <ThumbsUp size={16} className="mr-1" />
                  <span>{liked ? articleData.likes + 1 : articleData.likes}</span>
                </Button>
                
                <Button variant="outline" size="sm" onClick={() => window.location.href = "#comments"}>
                  <MessageSquare size={16} className="mr-1" />
                  <span>{articleData.comments.length}</span>
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 size={16} className="mr-1" />
                  <span>Share</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBookmark}
                  className={bookmarked ? "bg-techoh-purple/10 text-techoh-purple" : ""}
                >
                  <Bookmark size={16} className={bookmarked ? "fill-current mr-1" : "mr-1"} />
                  <span>{bookmarked ? "Saved" : "Save"}</span>
                </Button>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-between rounded-lg border border-border/40 bg-muted/30 p-4">
              <div className="flex items-center gap-4">
                <Link to={`/profile/${articleData.author.id}`}>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={articleData.author.avatar} alt={articleData.author.name} />
                    <AvatarFallback>{articleData.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link to={`/profile/${articleData.author.id}`} className="font-medium hover:underline">
                    {articleData.author.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{articleData.author.bio}</p>
                </div>
              </div>
              <Button variant="outline">Follow</Button>
            </div>
            
            <div className="mt-12" id="comments">
              <h3 className="mb-6 text-xl font-semibold">Comments ({articleData.comments.length})</h3>
              
              <div className="mb-8">
                <div className="mb-4 flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" alt="You" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-2 min-h-24"
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleComment} disabled={!commentText.trim()}>
                        <Send size={16} className="mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {articleData.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Link to={`/profile/${comment.user.id}`}>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link to={`/profile/${comment.user.id}`} className="font-medium hover:underline">
                            {comment.user.name}
                          </Link>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="mt-1 text-muted-foreground">{comment.content}</p>
                        <div className="mt-2 flex items-center gap-4">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp size={14} className="mr-1" />
                            <span>{comment.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </article>
        
        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="mb-6 text-xl font-semibold">Related Articles</h3>
          <div className="space-y-4">
            {articleData.relatedArticles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="block rounded-lg border border-border/40 p-4 transition-all hover:border-techoh-purple/40 hover:shadow-sm"
              >
                <h4 className="font-medium hover:text-techoh-purple">{article.title}</h4>
                <p className="text-sm text-muted-foreground">By {article.author}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
