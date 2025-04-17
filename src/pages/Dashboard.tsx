
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  LineChart,
  PlusCircle,
  Newspaper,
  BookOpen,
  ThumbsUp,
  MessagesSquare,
  BookMarked,
  PenSquare,
  Filter,
  TrendingUp,
  Clock,
  CalendarDays
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  status: string;
  readTime: number;
  tags: string[];
  likes: number;
  views: number;
  comments: number;
  trending?: boolean;
  aiEnhanced?: boolean;
}

const recentActivity = [
  {
    type: "comment",
    user: {
      name: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    content: "Great article! I especially liked the section on Kubernetes operators.",
    articleTitle: "Building Scalable Microservices with Go and Kubernetes in 2025",
    time: "2 hours ago"
  },
  {
    type: "like",
    user: {
      name: "Emily Zhao",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    articleTitle: "Building Scalable Microservices with Go and Kubernetes in 2025",
    time: "4 hours ago"
  },
  {
    type: "follow",
    user: {
      name: "David Kimani",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    time: "1 day ago"
  },
];

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userArticles, setUserArticles] = useState<Article[]>([]);
  const [userStats, setUserStats] = useState({
    articles: 0,
    views: 0,
    likes: 0,
    comments: 0,
    followers: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("techoh-user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUser(parsedUser);
      
      // Get user articles from localStorage
      const storedArticles = localStorage.getItem("techoh-articles");
      if (storedArticles) {
        const parsedArticles = JSON.parse(storedArticles);
        // Filter articles by the current user's ID
        const filteredArticles = parsedArticles.filter(
          (article: Article) => article.author.id === parsedUser.id
        );
        setUserArticles(filteredArticles);
        
        // Calculate stats based on user's articles
        let views = 0;
        let likes = 0;
        let comments = 0;
        
        filteredArticles.forEach((article: Article) => {
          views += article.views || 0;
          likes += article.likes || 0;
          comments += article.comments || 0;
        });
        
        setUserStats({
          articles: filteredArticles.length,
          views,
          likes,
          comments,
          followers: parsedUser.followers || 0,
        });
      }
    } else {
      // Redirect to login if not authenticated
      navigate("/login");
    }
  }, [navigate]);

  if (!isAuthenticated || !user) {
    return null; // Don't render anything until authentication check is complete
  }

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div className="container py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}! Manage your articles and track your performance
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
            <Button asChild className="gap-1">
              <Link to="/create">
                <PlusCircle size={16} className="mr-1" />
                New Article
              </Link>
            </Button>
            <Button variant="outline" className="gap-1">
              <Filter size={16} className="mr-1" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Articles
                  </p>
                  <p className="text-3xl font-bold">{userStats.articles}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Newspaper size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Views
                  </p>
                  <p className="text-3xl font-bold">{userStats.views.toLocaleString()}</p>
                </div>
                <div className="rounded-full bg-techoh-blue/10 p-3 text-techoh-blue">
                  <BookOpen size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Likes
                  </p>
                  <p className="text-3xl font-bold">{userStats.likes.toLocaleString()}</p>
                </div>
                <div className="rounded-full bg-techoh-accent-green/10 p-3 text-techoh-accent-green">
                  <ThumbsUp size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Followers
                  </p>
                  <p className="text-3xl font-bold">{userStats.followers.toLocaleString()}</p>
                </div>
                <div className="rounded-full bg-techoh-accent-orange/10 p-3 text-techoh-accent-orange">
                  <MessagesSquare size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Performance Overview</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Last 30 Days
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                    <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                    <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
                    <DropdownMenuItem>All Time</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="h-[300px] flex items-center justify-center">
                {/* Placeholder for chart */}
                <div className="flex flex-col items-center text-muted-foreground">
                  <BarChart3 size={60} strokeWidth={1} />
                  <p className="mt-4 text-sm">Analytics visualization would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, i) => (
                    <div key={i} className="flex gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user.name}</span>{" "}
                          {activity.type === "comment" && "commented on"}
                          {activity.type === "like" && "liked"}
                          {activity.type === "follow" && "started following you"}
                          {activity.articleTitle && (
                            <span>
                              {" "}
                              your article{" "}
                              <Link to={`/article/1`} className="font-medium hover:underline">
                                {activity.articleTitle}
                              </Link>
                            </span>
                          )}
                        </p>
                        {activity.content && (
                          <p className="text-xs text-muted-foreground">{activity.content}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
              {recentActivity.length > 0 && (
                <Button variant="ghost" size="sm" className="mt-4 w-full">
                  View all activity
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold">Your Articles</h2>
                <Tabs defaultValue="all" className="mt-4 sm:mt-0">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {userArticles.length > 0 ? (
                <div className="space-y-4">
                  {userArticles.map((article) => (
                    <div
                      key={article.id}
                      className="flex flex-col gap-4 rounded-lg border border-border/40 p-4 sm:flex-row"
                    >
                      {article.cover && (
                        <div className="h-24 w-full overflow-hidden rounded-md sm:h-auto sm:w-36">
                          <img
                            src={article.cover}
                            alt={article.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <Link
                            to={`/article/${article.id}`}
                            className="font-semibold hover:text-primary"
                          >
                            {article.title}
                          </Link>
                          <Badge
                            variant={article.status === "published" ? "default" : "outline"}
                            className={
                              article.status === "published"
                                ? "bg-techoh-accent-green"
                                : ""
                            }
                          >
                            {article.status === "published" ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            {article.publishDate && (
                              <span className="flex items-center">
                                <CalendarDays size={14} className="mr-1" />
                                {article.publishDate}
                              </span>
                            )}
                            {article.status === "published" && (
                              <>
                                <span className="flex items-center">
                                  <BookOpen size={14} className="mr-1" />
                                  {article.views.toLocaleString()} views
                                </span>
                                <span className="flex items-center">
                                  <ThumbsUp size={14} className="mr-1" />
                                  {article.likes.toLocaleString()} likes
                                </span>
                                <span className="flex items-center">
                                  <MessagesSquare size={14} className="mr-1" />
                                  {article.comments.toLocaleString()} comments
                                </span>
                              </>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8" asChild>
                              <Link to={`/edit/${article.id}`}>
                                <PenSquare size={14} className="mr-1" />
                                Edit
                              </Link>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                  </svg>
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Statistics</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem>Archive</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-muted p-6">
                    <PenSquare className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">No Articles Yet</h3>
                  <p className="mb-6 text-muted-foreground">
                    You haven't created any articles yet. Start writing your first article!
                  </p>
                  <Button asChild>
                    <Link to="/create">Create New Article</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
