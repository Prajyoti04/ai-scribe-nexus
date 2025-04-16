import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Bookmark,
  BarChart2
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  isAuthenticated?: boolean;
}

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
}

export default function Navbar({ isAuthenticated = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("techoh-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("techoh-user");
    setUser(null);
    
    // Show toast notification
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    
    // Redirect to homepage
    navigate("/");
  };

  // Determine authentication status based on user data
  const userIsAuthenticated = Boolean(user) || isAuthenticated;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <span className="gradient-text">Tech-OH</span>
            <span className="text-foreground">Blog</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground/80 hover:text-foreground">Home</Link>
            <Link to="/trending" className="text-foreground/80 hover:text-foreground">Trending</Link>
            <Link to="/topics" className="text-foreground/80 hover:text-foreground">Topics</Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center text-foreground/80 hover:text-foreground">
                Browse <ChevronDown size={16} className="ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/latest">Latest Articles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/top-rated">Top Rated</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/authors">Authors</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              className="h-10 w-64 rounded-full border border-border/50 bg-muted/30 pl-10 pr-4 text-sm outline-none focus:border-techoh-purple"
            />
          </div>

          {userIsAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex relative">
                <Bell size={20} />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-techoh-accent-purple text-[10px] text-white">
                  3
                </span>
              </Button>
              <Button variant="outline" asChild className="hidden md:inline-flex gap-2">
                <Link to="/create">
                  <span>New Article</span>
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} alt={user?.name || "User"} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user?.name || "Tech Creator"}</p>
                      <p className="text-xs text-muted-foreground">{user?.email || "techcreator@example.com"}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex w-full cursor-pointer items-center">
                      <User size={16} className="mr-2" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex w-full cursor-pointer items-center">
                      <BarChart2 size={16} className="mr-2" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookmarks" className="flex w-full cursor-pointer items-center">
                      <Bookmark size={16} className="mr-2" />
                      <span>Saved Articles</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex w-full cursor-pointer items-center">
                      <Settings size={16} className="mr-2" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex cursor-pointer items-center text-destructive focus:text-destructive" onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container py-4 space-y-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                className="h-10 w-full rounded-full border border-border/50 bg-muted/30 pl-10 pr-4 text-sm outline-none focus:border-techoh-purple"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-2 py-2 hover:bg-muted rounded-md">Home</Link>
              <Link to="/trending" className="px-2 py-2 hover:bg-muted rounded-md">Trending</Link>
              <Link to="/topics" className="px-2 py-2 hover:bg-muted rounded-md">Topics</Link>
              <Link to="/latest" className="px-2 py-2 hover:bg-muted rounded-md">Latest Articles</Link>
              <Link to="/top-rated" className="px-2 py-2 hover:bg-muted rounded-md">Top Rated</Link>
              <Link to="/authors" className="px-2 py-2 hover:bg-muted rounded-md">Authors</Link>
            </div>

            {userIsAuthenticated ? (
              <div className="flex flex-col space-y-2 pt-2 border-t border-border/40">
                <Link to="/notifications" className="px-2 py-2 hover:bg-muted rounded-md flex items-center">
                  <Bell size={16} className="mr-2" />
                  <span>Notifications</span>
                  <span className="ml-auto bg-techoh-accent-purple text-white text-xs px-2 py-1 rounded-full">3</span>
                </Link>
                <Link to="/profile" className="px-2 py-2 hover:bg-muted rounded-md flex items-center">
                  <User size={16} className="mr-2" />
                  <span>Profile</span>
                </Link>
                <Link to="/dashboard" className="px-2 py-2 hover:bg-muted rounded-md flex items-center">
                  <BarChart2 size={16} className="mr-2" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/create" className="px-2 py-2 hover:bg-muted rounded-md flex items-center font-medium text-techoh-purple">
                  <span>New Article</span>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-border/40">
                <Link to="/login" className="px-4 py-2 text-center hover:bg-muted rounded-md">Sign in</Link>
                <Button asChild className="w-full">
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
