
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users as UsersIcon } from "lucide-react";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  articles: number;
  followers: number;
  following: number;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const currentUser = localStorage.getItem("techoh-user");
    if (currentUser) {
      setIsAuthenticated(true);
    }
    
    // Get all users from localStorage
    const storedUsers = localStorage.getItem("techoh-users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div className="container max-w-6xl py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Community Members</h1>
            <p className="text-muted-foreground mt-2">
              Connect with {users.length} tech enthusiasts and content creators
            </p>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-6">
              <UsersIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-medium">No Users Yet</h3>
            <p className="mb-6 text-muted-foreground">
              Be the first to join our community!
            </p>
            <Button asChild>
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription>@{user.username}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{user.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex space-x-4 text-sm">
                    <div>
                      <p className="font-medium">{user.articles}</p>
                      <p className="text-xs text-muted-foreground">Articles</p>
                    </div>
                    <div>
                      <p className="font-medium">{user.followers}</p>
                      <p className="text-xs text-muted-foreground">Followers</p>
                    </div>
                    <div>
                      <p className="font-medium">{user.following}</p>
                      <p className="text-xs text-muted-foreground">Following</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/profile/${user.id}`}>View Profile</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
