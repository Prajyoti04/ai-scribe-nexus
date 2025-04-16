
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Settings,
  User,
  MapPin,
  Calendar,
  Twitter,
  Github,
  Linkedin,
  Globe,
  Award,
  BookOpen,
  Users,
  BarChart2,
} from "lucide-react";
import ArticleCard from "@/components/articles/ArticleCard";
import { Link } from "react-router-dom";

// Mock user data
const userData = {
  id: "user1",
  name: "Sarah Johnson",
  username: "sarahjohnson",
  avatar: "https://i.pravatar.cc/150?img=32",
  bio: "Senior Software Engineer at TechCorp | Kubernetes & Go enthusiast | Writing about cloud-native technologies and distributed systems",
  location: "San Francisco, CA",
  joinedDate: "March 2024",
  website: "https://sarahjohnson.dev",
  twitter: "sarahjohnsondev",
  github: "sarahjohnson",
  linkedin: "sarah-johnson",
  followers: 342,
  following: 128,
  articles: 12,
  badges: [
    { name: "Top Contributor", description: "Consistently writes high-quality content" },
    { name: "Kubernetes Expert", description: "Published multiple highly-rated Kubernetes articles" },
  ]
};

// Mock articles data
const userArticles = [
  {
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
  },
  {
    id: "7",
    title: "Building Machine Learning Models with PyTorch 2.0",
    excerpt: "Discover how PyTorch 2.0 is revolutionizing the way we build, train, and deploy machine learning models.",
    cover: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1080&auto=format&fit=crop",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=32",
      id: "sarah-johnson"
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
    id: "9",
    title: "Serverless Architecture Patterns for Distributed Systems",
    excerpt: "Explore modern serverless patterns for building distributed, highly-available systems at scale.",
    cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1080&auto=format&fit=crop",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=32",
      id: "sarah-johnson"
    },
    publishDate: "Apr 10, 2025",
    readTime: 11,
    tags: ["serverless", "aws", "architecture", "cloud"],
    likes: 592,
    views: 8954,
    comments: 27
  }
];

export default function Profile() {
  const [isAuthenticated] = useState(true);
  const [isCurrentUser] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div className="container py-8">
        {/* Profile header */}
        <div className="mb-8 rounded-xl border border-border/40 bg-card">
          <div className="h-32 bg-gradient-to-r from-techoh-purple/20 to-techoh-blue/20 rounded-t-xl"></div>
          <div className="p-6">
            <div className="relative flex flex-col items-center md:flex-row md:items-end">
              <div className="relative -mt-16 flex items-center justify-center">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              <div className="mt-4 flex flex-1 flex-col items-center md:ml-4 md:items-start">
                <h1 className="text-center text-2xl font-bold md:text-left">{userData.name}</h1>
                <p className="text-center text-muted-foreground md:text-left">@{userData.username}</p>
              </div>

              <div className="mt-4 flex gap-2 md:mt-0">
                {isCurrentUser ? (
                  <>
                    <Button variant="outline" className="gap-1" asChild>
                      <Link to="/settings">
                        <Settings size={16} className="mr-1" />
                        Settings
                      </Link>
                    </Button>
                    <Button className="gap-1" asChild>
                      <Link to="/edit-profile">
                        <Edit size={16} className="mr-1" />
                        Edit Profile
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-y-4 gap-x-8">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <User size={16} />
                <span>{userData.bio}</span>
              </div>
              {userData.location && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin size={16} />
                  <span>{userData.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar size={16} />
                <span>Joined {userData.joinedDate}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              {userData.website && (
                <a
                  href={userData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-techoh-purple hover:underline"
                >
                  <Globe size={16} />
                  <span>Website</span>
                </a>
              )}
              {userData.twitter && (
                <a
                  href={`https://twitter.com/${userData.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-techoh-purple hover:underline"
                >
                  <Twitter size={16} />
                  <span>Twitter</span>
                </a>
              )}
              {userData.github && (
                <a
                  href={`https://github.com/${userData.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-techoh-purple hover:underline"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              )}
              {userData.linkedin && (
                <a
                  href={`https://linkedin.com/in/${userData.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-techoh-purple hover:underline"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-1">
                <Award size={18} className="text-techoh-accent-purple" />
                <span className="font-medium">{userData.badges.length} Badges</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen size={18} className="text-techoh-blue" />
                <span className="font-medium">{userData.articles} Articles</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={18} className="text-techoh-purple" />
                <span className="font-medium">{userData.followers} Followers</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart2 size={18} className="text-techoh-accent-green" />
                <Link to="/profile/stats" className="font-medium hover:underline">
                  View Stats
                </Link>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {userData.badges.map((badge, index) => (
                <Badge
                  key={index}
                  className="bg-gradient-to-r from-techoh-purple to-techoh-blue text-white"
                >
                  {badge.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Profile content */}
        <Tabs defaultValue="articles">
          <TabsList className="mb-8 grid w-full grid-cols-3 sm:w-auto sm:flex">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>

            {userArticles.length > 9 && (
              <div className="flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity">
            <div className="rounded-lg border border-border/40 bg-card p-6">
              <div className="flex items-center justify-center py-12 text-center">
                <div className="max-w-md">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Activity timeline coming soon</h3>
                  <p className="mt-2 text-muted-foreground">
                    We're working on a beautiful activity timeline to showcase your engagements with the community.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="rounded-lg border border-border/40 bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">About {userData.name}</h2>
              <p className="text-muted-foreground">{userData.bio}</p>
              
              <h3 className="mt-6 mb-2 text-lg font-medium">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Kubernetes</Badge>
                <Badge variant="outline">Go</Badge>
                <Badge variant="outline">Distributed Systems</Badge>
                <Badge variant="outline">Cloud Architecture</Badge>
                <Badge variant="outline">Microservices</Badge>
                <Badge variant="outline">AWS</Badge>
                <Badge variant="outline">Docker</Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
