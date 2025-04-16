
import Layout from "@/components/layout/Layout";
import FeaturedArticle from "@/components/articles/FeaturedArticle";
import ArticleCard from "@/components/articles/ArticleCard";
import TrendingArticles from "@/components/articles/TrendingArticles";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, TrendingUp, Clock, Zap, ChevronRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const featuredArticle = {
  id: "1",
  title: "Building Scalable Microservices with Go and Kubernetes in 2025",
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
  likes: 1254,
  views: 24689,
  comments: 87,
  aiEnhanced: true
};

const trendingArticles = [
  {
    id: "2",
    title: "Why WebAssembly is the Future of Browser-Based Computing",
    author: {
      name: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?img=11",
      id: "alex-chen"
    },
    likes: 987,
    category: "Web Dev"
  },
  {
    id: "3",
    title: "Advanced GraphQL Patterns with Apollo Federation",
    author: {
      name: "Miguel Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=12",
      id: "miguel-rodriguez"
    },
    likes: 876,
    category: "API"
  },
  {
    id: "4",
    title: "Quantum Computing Explained for Software Developers",
    author: {
      name: "Emily Zhao",
      avatar: "https://i.pravatar.cc/150?img=5",
      id: "emily-zhao"
    },
    likes: 782,
    category: "Quantum"
  },
  {
    id: "5",
    title: "The Ultimate Guide to Building AI-Powered Chatbots in 2025",
    author: {
      name: "David Kimani",
      avatar: "https://i.pravatar.cc/150?img=15",
      id: "david-kimani"
    },
    likes: 754,
    category: "AI"
  },
  {
    id: "6",
    title: "Rust vs. Go: A Comprehensive Performance Analysis",
    author: {
      name: "Sophia Martinez",
      avatar: "https://i.pravatar.cc/150?img=23",
      id: "sophia-martinez"
    },
    likes: 701,
    category: "Programming"
  }
];

const recentArticles = [
  {
    id: "7",
    title: "Building Machine Learning Models with PyTorch 2.0",
    excerpt: "Discover how PyTorch 2.0 is revolutionizing the way we build, train, and deploy machine learning models.",
    cover: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1080&auto=format&fit=crop",
    author: {
      name: "James Wilson",
      avatar: "https://i.pravatar.cc/150?img=3",
      id: "james-wilson"
    },
    publishDate: "Apr 14, 2025",
    readTime: 8,
    tags: ["ml", "pytorch", "ai", "deep-learning"],
    likes: 724,
    views: 12540,
    comments: 43,
    aiEnhanced: true
  },
  {
    id: "8",
    title: "WebGPU: The Future of Graphics Programming on the Web",
    excerpt: "Learn how WebGPU is transforming graphics and parallel computing on the web with modern GPU access.",
    cover: "https://images.unsplash.com/photo-1628277613967-6abca504d0ac?q=80&w=1080&auto=format&fit=crop",
    author: {
      name: "Lila Patel",
      avatar: "https://i.pravatar.cc/150?img=17",
      id: "lila-patel"
    },
    publishDate: "Apr 12, 2025",
    readTime: 10,
    tags: ["webgpu", "graphics", "javascript", "game-dev"],
    likes: 611,
    views: 9872,
    comments: 31,
    trending: true
  },
  {
    id: "9",
    title: "Serverless Architecture Patterns for Distributed Systems",
    excerpt: "Explore modern serverless patterns for building distributed, highly-available systems at scale.",
    cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1080&auto=format&fit=crop",
    author: {
      name: "Carlos Mendez",
      avatar: "https://i.pravatar.cc/150?img=14",
      id: "carlos-mendez"
    },
    publishDate: "Apr 10, 2025",
    readTime: 11,
    tags: ["serverless", "aws", "architecture", "cloud"],
    likes: 592,
    views: 8954,
    comments: 27
  },
  {
    id: "10",
    title: "Advanced TypeScript: Pattern Matching and Discriminated Unions",
    excerpt: "Master advanced TypeScript patterns to build robust, type-safe applications.",
    cover: "https://images.unsplash.com/photo-1613068687893-5e85b4638b56?q=80&w=1080&auto=format&fit=crop",
    author: {
      name: "Nina Johnson",
      avatar: "https://i.pravatar.cc/150?img=26",
      id: "nina-johnson"
    },
    publishDate: "Apr 8, 2025",
    readTime: 7,
    tags: ["typescript", "javascript", "frontend", "patterns"],
    likes: 547,
    views: 7823,
    comments: 19
  }
];

const topics = [
  "All Topics",
  "Web Development",
  "Machine Learning",
  "DevOps",
  "Databases",
  "Mobile",
  "Cloud",
  "Security",
  "Blockchain"
];

export default function Index() {
  return (
    <Layout>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-background to-muted/30 py-12 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6">
              <span className="gradient-text">Tech-OH</span> Blog
            </h1>
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
              Where technical brilliance meets AI-powered content creation
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/register">Join the Community</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/trending">
                  Explore Trending Topics
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured article section */}
      <section className="py-10">
        <div className="container">
          <h2 className="mb-6 text-3xl font-bold">Featured Article</h2>
          <FeaturedArticle {...featuredArticle} />
        </div>
      </section>

      {/* Main content section */}
      <section className="py-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Articles feed */}
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <Tabs defaultValue="latest" className="w-full">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <TabsList>
                      <TabsTrigger value="latest" className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>Latest</span>
                      </TabsTrigger>
                      <TabsTrigger value="popular" className="flex items-center gap-1">
                        <TrendingUp size={16} />
                        <span>Popular</span>
                      </TabsTrigger>
                      <TabsTrigger value="ai-enhanced" className="flex items-center gap-1">
                        <Sparkles size={16} />
                        <span>AI Enhanced</span>
                      </TabsTrigger>
                      <TabsTrigger value="recommended" className="flex items-center gap-1">
                        <Zap size={16} />
                        <span>For You</span>
                      </TabsTrigger>
                    </TabsList>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter size={16} />
                      <span>Filter</span>
                    </Button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
                    {topics.map((topic, i) => (
                      <Button
                        key={topic}
                        variant={i === 0 ? "secondary" : "outline"}
                        size="sm"
                        className={i === 0 ? "bg-techoh-purple text-white hover:bg-techoh-purple/90" : ""}
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>

                  <TabsContent value="latest" className="mt-6 space-y-6">
                    {recentArticles.map((article) => (
                      <ArticleCard key={article.id} {...article} />
                    ))}
                  </TabsContent>

                  <TabsContent value="popular" className="mt-6">
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <Sparkles size={40} className="mx-auto mb-4 text-techoh-purple opacity-60" />
                        <h3 className="mb-2 text-lg font-medium">Sign in to see popular articles</h3>
                        <p className="mb-4 text-muted-foreground">
                          Join our community to access personalized content recommendations
                        </p>
                        <Button asChild>
                          <Link to="/login">Sign in</Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ai-enhanced" className="mt-6">
                    {/* This would show AI-enhanced articles */}
                    <div className="space-y-6">
                      <ArticleCard {...recentArticles[0]} />
                    </div>
                  </TabsContent>

                  <TabsContent value="recommended" className="mt-6">
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <Sparkles size={40} className="mx-auto mb-4 text-techoh-purple opacity-60" />
                        <h3 className="mb-2 text-lg font-medium">Sign in for personalized recommendations</h3>
                        <p className="mb-4 text-muted-foreground">
                          Join our community to access personalized content recommendations
                        </p>
                        <Button asChild>
                          <Link to="/login">Sign in</Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <TrendingArticles articles={trendingArticles} />
              
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-4 text-lg font-semibold">Join Tech-OH Blog</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Connect with other tech professionals, share your expertise, and discover cutting-edge content.
                </p>
                <Button asChild className="w-full">
                  <Link to="/register">Create Account</Link>
                </Button>
                <div className="mt-2 text-center text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-techoh-purple hover:underline">
                    Sign in
                  </Link>
                </div>
              </div>
              
              <div className="rounded-lg border border-techoh-purple/30 bg-gradient-to-r from-techoh-purple/10 to-techoh-blue/10 p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-techoh-purple" />
                  <h3 className="font-semibold">AI-Powered Writing</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Supercharge your technical writing with our AI assistant. Get grammar checks, SEO tips, and content enhancement.
                </p>
                <Button asChild variant="default" className="w-full bg-techoh-purple hover:bg-techoh-purple/90">
                  <Link to="/create">Write with AI</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="bg-gradient-to-br from-techoh-purple/10 to-techoh-blue/10 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to share your tech knowledge?</h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Join the Tech-OH community and start writing today
            </p>
            <Button asChild size="lg" className="bg-techoh-purple hover:bg-techoh-purple/90">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
