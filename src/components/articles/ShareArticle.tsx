
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Twitter, Facebook, Linkedin, Link as LinkIcon, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareArticleProps {
  articleId: string;
  title: string;
}

export default function ShareArticle({ articleId, title }: ShareArticleProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Current URL for sharing
  const articleUrl = window.location.origin + `/article/${articleId}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl)
      .then(() => {
        setCopied(true);
        toast({
          title: "Link copied!",
          description: "Article link copied to clipboard.",
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        toast({
          title: "Failed to copy link",
          description: "Please try again.",
          variant: "destructive"
        });
      });
  };
  
  const handleShare = (platform: string) => {
    let shareUrl = "";
    const encodedUrl = encodeURIComponent(articleUrl);
    const encodedTitle = encodeURIComponent(`Check out this article: ${title}`);
    
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Share className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => handleShare("twitter")} className="cursor-pointer">
          <Twitter className="mr-2 h-4 w-4 text-[#1DA1F2]" />
          <span>Share on Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
          <Facebook className="mr-2 h-4 w-4 text-[#4267B2]" />
          <span>Share on Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")} className="cursor-pointer">
          <Linkedin className="mr-2 h-4 w-4 text-[#0077B5]" />
          <span>Share on LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          <LinkIcon className="mr-2 h-4 w-4" />
          <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
