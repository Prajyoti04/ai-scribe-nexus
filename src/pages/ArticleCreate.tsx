
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import AIAssistantPanel from "@/components/articles/AIAssistantPanel";
import {
  Sparkles,
  Save,
  Eye,
  Send,
  Image,
  Link,
  Code,
  ListOrdered,
  Quote,
  HelpCircle,
  Plus,
  ChevronDown,
  Clock,
  Tags,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function ArticleCreate() {
  const navigate = useNavigate();
  const [isAuthenticated] = useState(true);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    
    // Simulate API call to save draft
    setTimeout(() => {
      setIsSaving(false);
      navigate("/dashboard");
    }, 1500);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate API call to publish article
    setTimeout(() => {
      setIsPublishing(false);
      navigate("/dashboard");
    }, 1500);
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Layout isAuthenticated={isAuthenticated}>
      <div className="container py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Create Article</h1>
          <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
            <Button
              variant="outline"
              className="gap-1"
              onClick={() => setShowAiAssistant(!showAiAssistant)}
            >
              <Sparkles size={16} className="mr-1 text-techoh-blue" />
              {showAiAssistant ? "Hide AI Assistant" : "AI Assistant"}
            </Button>
            <Button variant="outline" className="gap-1" onClick={handleSaveDraft} disabled={isSaving}>
              <Save size={16} className="mr-1" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button className="gap-1" onClick={handlePublish} disabled={isPublishing}>
              <Send size={16} className="mr-1" />
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main content area */}
          <div className="space-y-6 md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Label htmlFor="title" className="mb-2 block text-lg font-medium">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter a title for your article"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="mb-2 flex flex-wrap items-center gap-2 border-b border-border pb-4">
                  <Button variant="ghost" size="sm">
                    <Image size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Link size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Code size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ListOrdered size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Quote size={16} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Plus size={16} className="mr-1" />
                        <span>More</span>
                        <ChevronDown size={14} className="ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Heading 1</DropdownMenuItem>
                      <DropdownMenuItem>Heading 2</DropdownMenuItem>
                      <DropdownMenuItem>Heading 3</DropdownMenuItem>
                      <DropdownMenuItem>Table</DropdownMenuItem>
                      <DropdownMenuItem>Divider</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="ml-auto">
                    <Button variant="ghost" size="sm">
                      <HelpCircle size={16} className="mr-1" />
                      <span>Help</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <Textarea
                    placeholder="Write your article content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </CardContent>
            </Card>

            {showAiAssistant && (
              <div className="relative">
                <AIAssistantPanel text={content} onClose={() => setShowAiAssistant(false)} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-medium">Article Settings</h3>

                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Tags</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Add a tag and press Enter"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <Button variant="outline" size="icon" onClick={addTag}>
                        <Plus size={16} />
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 rounded-full hover:bg-muted p-0.5"
                          >
                            <XCircle size={12} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Reading Time</Label>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Estimated: {Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Featured Image</Label>
                    <Button variant="outline" className="w-full">
                      <Image size={16} className="mr-2" />
                      Upload Image
                    </Button>
                  </div>

                  <div>
                    <Label className="mb-2 block">Categories</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <span>Select a category</span>
                          <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem>Web Development</DropdownMenuItem>
                        <DropdownMenuItem>Machine Learning</DropdownMenuItem>
                        <DropdownMenuItem>DevOps</DropdownMenuItem>
                        <DropdownMenuItem>Cloud</DropdownMenuItem>
                        <DropdownMenuItem>Security</DropdownMenuItem>
                        <DropdownMenuItem>Databases</DropdownMenuItem>
                        <DropdownMenuItem>Mobile</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-medium">AI Suggestions</h3>
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-3">
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <Tags size={14} />
                      Suggested Tags
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setTags([...tags, "tutorial"])}>
                        tutorial
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setTags([...tags, "guide"])}>
                        guide
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setTags([...tags, "beginners"])}>
                        beginners
                      </Button>
                    </div>
                  </div>
                  
                  <div className="rounded-md bg-muted p-3">
                    <h4 className="text-sm font-medium">Title Suggestions</h4>
                    <p className="mt-1 text-xs">Add a title to get AI-generated suggestions</p>
                  </div>

                  <Button variant="outline" className="w-full gap-1">
                    <Sparkles size={16} className="mr-1 text-techoh-blue" />
                    Get More Suggestions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
