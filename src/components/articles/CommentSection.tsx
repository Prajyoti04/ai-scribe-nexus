
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem("techoh-user");
    if (userData) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(userData));
    }
    
    // Load comments for this article
    const storedComments = localStorage.getItem("techoh-comments");
    if (storedComments) {
      const allComments = JSON.parse(storedComments);
      const articleComments = allComments.filter((comment: Comment) => comment.articleId === articleId);
      setComments(articleComments);
    }
  }, [articleId]);

  const handleCommentSubmit = () => {
    if (!commentText.trim()) {
      toast({
        title: "Comment cannot be empty",
        description: "Please write something before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    // Create new comment
    const newComment = {
      id: Date.now().toString(),
      articleId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: commentText,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    };
    
    // Get existing comments or initialize empty array
    const existingComments = JSON.parse(localStorage.getItem("techoh-comments") || "[]");
    
    // Add new comment
    const updatedComments = [...existingComments, newComment];
    
    // Save to localStorage
    localStorage.setItem("techoh-comments", JSON.stringify(updatedComments));
    
    // Update UI
    setComments([...comments, newComment]);
    setCommentText("");
    
    // Show success toast
    toast({
      title: "Comment posted!",
      description: "Your comment has been added successfully.",
    });
  };

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      
      {isAuthenticated ? (
        <div className="space-y-4">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
              <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Write your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-24 resize-none"
              />
              <Button onClick={handleCommentSubmit}>Post Comment</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6 text-center">
          <h3 className="mb-2 font-medium">Sign in to join the discussion</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            You need to be signed in to post comments.
          </p>
          <Button asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      )}
      
      <div className="space-y-6 pt-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Link to={`/profile/${comment.userId}`} className="font-medium hover:underline">
                    {comment.userName}
                  </Link>
                  <span className="text-sm text-muted-foreground">{comment.date}</span>
                </div>
                <p className="mt-1">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No comments yet. Be the first to start the conversation!</p>
        )}
      </div>
    </div>
  );
}
