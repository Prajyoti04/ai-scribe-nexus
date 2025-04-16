import { useState, useEffect } from "react";
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
  PenLine,
} from "lucide-react";
import ArticleCard from "@/components/articles/ArticleCard";
import { Link, useParams } from "react-router-dom";

// Default user data as fallback
const defaultUserData = {
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
  articles: 0,
  badges: [
    { name: "Top Contributor", description: "Consistently writes high-quality content" },
    { name: "Kubernetes Expert", description: "Published multiple highly-rated Kubernetes articles" },
  ]
};

export default function Profile() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [userData, setUserData] = useState(defaultUserData);
  const [userArticles, setUserArticles] = useState([]);
  const { id } = useParams();

  // Define mock articles for the user
  const mockArticles = [
    {
      id: "1",
      title: "Getting Started with Kubernetes",
      excerpt: "A beginner's guide to understanding and deploying Kubernetes clusters",
      cover: `https://images.unsplash.com/photo-1649972904349-6e44c42644a7`, // Using a placeholder image
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=32",
        id: "user1"
      },
      publishDate: "April 15, 2025",
      readTime: 7,
      tags: ["kubernetes", "devops", "cloud"],
      likes: 142,
      views: 3526,
      comments: 24,
      trending: true,
      aiEnhanced: true
    },
    {
      id: "2",
      title: "Advanced React Performance Optimization",
      excerpt: "Techniques to improve your React application's rendering and load times",
      cover: `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b`, // Using a placeholder image
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=32",
        id: "user1"
      },
      publishDate: "March 22, 2025",
      readTime: 5,
      tags: ["react", "performance", "web-development"],
      likes: 87,
      views: 2103,
      comments: 15,
      aiEnhanced: true
    },
    {
      id: "3",
      title: "Building Scalable Microservices with Go",
      excerpt: "Design patterns and best practices for creating robust microservice architectures",
      cover: `https://images.unsplash.com/photo-1461749280684-dccba630e2f6`, // Using a placeholder image
      author: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=32",
        id: "user1"
      },
      publishDate: "February 10, 2025",
      readTime: 9,
      tags: ["go", "microservices", "backend"],
      likes: 213,
      views: 4507,
      comments: 37,
      trending: true
    }
  ];

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("techoh-user");
    
    if (storedUser) {
      setIsAuthenticated(true);
      const parsedUser = JSON.parse(storedUser);
      
      // If viewing someone else's profile
      if (id && id !== parsedUser.id) {
        setIsCurrentUser(false);
        // Here we would fetch the other user's profile data
        // For now we'll use the default data
        
        // For other users we would fetch their articles from an API
        // For now we'll set articles to empty array
        setUserArticles([]);
      } else {
        // Merge the stored user data with default data for properties that might be missing
        const mergedUser = {
          ...defaultUserData,
          ...parsedUser,
          articles: 0 // Reset articles count as the user hasn't uploaded any
        };
        setUserData(mergedUser);
        setIsCurrentUser(true);
        
        // For the current user, set articles to empty array as they haven't uploaded any
        setUserArticles([]);
      }
    } else {
      setIsAuthenticated(false);
    }

    // When it's the current user's profile, set the mock articles
    if (isCurrentUser) {
      setUserData(prevUser => ({
        ...prevUser,
        articles: mockArticles.length
      }));
      setUserArticles(mockArticles);
    }
  }, [id, isCurrentUser]);

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
                      <Link to="/create">
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
            {userArticles.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userArticles.map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border/40 bg-card p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <PenLine className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-medium">No articles yet</h3>
                <p className="mb-4 text-muted-foreground">
                  {isCurrentUser
                    ? "You haven't published any articles yet. Start writing to share your expertise!"
                    : "This user hasn't published any articles yet."}
                </p>
                {isCurrentUser && (
                  <Button asChild>
                    <Link to="/create">Write your first article</Link>
                  </Button>
                )}
              </div>
            )}

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
