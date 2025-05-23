
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, Twitter } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  type: "login" | "register";
}

// User structure for local storage
interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  joinedDate: string;
  articles: number;
  followers: number;
  following: number;
  badges: string[];
}

export default function AuthForm({ type }: AuthFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (type === "login") {
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem("techoh-users") || "[]");
        const user = users.find((u: User) => u.email === email);
        
        if (!user) {
          throw new Error("User not found. Please check your email or sign up.");
        }
        
        // In a real app, we would verify the password here
        // For this demo, we'll just simulate success
        
        // Set the current user
        localStorage.setItem("techoh-user", JSON.stringify(user));
        
        toast({
          title: "Successfully signed in!",
          description: "Welcome back to Tech-OH Blog",
        });
      } else {
        // Registration
        // Generate a unique ID for the new user
        const userId = `user_${Date.now()}`;
        const username = name.toLowerCase().replace(/\s/g, "");
        
        // Create a user object
        const newUser: User = {
          id: userId,
          name: name,
          username: username,
          email: email,
          avatar: `https://i.pravatar.cc/150?u=${userId}`, // Random avatar based on user ID
          bio: "Tech enthusiast and content creator",
          location: "Tech-OH Community",
          joinedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" }),
          articles: 0, // Initialize with 0 articles
          followers: 0, // Initialize with 0 followers
          following: 0, // Initialize with 0 following
          badges: [] // Initialize with empty badges array
        };
        
        // Get existing users or initialize empty array
        const existingUsers = JSON.parse(localStorage.getItem("techoh-users") || "[]");
        
        // Check if email already exists
        if (existingUsers.some((user: User) => user.email === email)) {
          throw new Error("Email already in use. Please try a different one or sign in.");
        }
        
        // Add the new user to the array
        existingUsers.push(newUser);
        
        // Save the updated array back to localStorage
        localStorage.setItem("techoh-users", JSON.stringify(existingUsers));
        
        // Set the current user
        localStorage.setItem("techoh-user", JSON.stringify(newUser));
        
        toast({
          title: "Account created successfully!",
          description: "Welcome to Tech-OH Blog",
        });
      }
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Authentication failed. Please check your credentials and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">
          {type === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-muted-foreground">
          {type === "login"
            ? "Enter your credentials to sign in to your account"
            : "Enter your information to create an account"}
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-6">
        <Button variant="outline" disabled={isLoading} className="w-full">
          <Github className="mr-2 h-4 w-4" />
          Github
        </Button>
        <Button variant="outline" disabled={isLoading} className="w-full">
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "register" && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {type === "login" && (
              <Link
                to="/forgot-password"
                className="text-xs text-techoh-purple hover:underline"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder={type === "register" ? "Create a password" : "Enter your password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {type === "register" && (
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link to="/terms" className="text-techoh-purple hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-techoh-purple hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? type === "login"
              ? "Signing in..."
              : "Creating account..."
            : type === "login"
            ? "Sign in"
            : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {type === "login" ? (
          <>
            Don't have an account?{" "}
            <Link to="/register" className="text-techoh-purple hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-techoh-purple hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
