
import { useState, useRef } from "react";
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
  Upload,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const CATEGORIES = [
  "Web Development",
  "Machine Learning",
  "DevOps",
  "Cloud",
  "Security",
  "Databases",
  "Mobile",
  "UI/UX",
  "Career",
  "Programming Languages",
];

const SUGGESTED_TAGS = [
  "tutorial", "guide", "beginners", "advanced", "react", "typescript", 
  "javascript", "python", "aws", "azure", "gcp", "docker", "kubernetes",
  "css", "html", "frontend", "backend", "fullstack", "mobile", "web", 
  "database", "api", "security", "testing", "devops", "ci/cd"
];

export default function ArticleCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated] = useState(true);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title to your article before saving",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    // Create article object
    const articleId = `article_${Date.now()}`;
    const article = {
      id: articleId,
      title,
      content,
      excerpt: content.substring(0, 150) + (content.length > 150 ? "..." : ""),
      cover: coverImage,
      author: {
        name: "Current User",
        id: "current_user",
        avatar: "",
      },
      publishDate: new Date().toLocaleDateString(),
      readTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
      tags,
      category: selectedCategory,
      likes: 0,
      views: 0,
      comments: 0,
      isDraft: true,
    };
    
    // Get existing articles from localStorage
    const existingArticles = JSON.parse(localStorage.getItem("techoh-articles") || "[]");
    
    // Add new article
    const updatedArticles = [...existingArticles, article];
    localStorage.setItem("techoh-articles", JSON.stringify(updatedArticles));
    
    toast({
      title: "Draft saved",
      description: "Your article draft has been saved successfully",
    });
    
    setIsSaving(false);
    navigate("/dashboard");
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title to your article before publishing",
        variant: "destructive",
      });
      return;
    }

    if (content.length < 100) {
      toast({
        title: "Content too short",
        description: "Your article content should be at least 100 characters long",
        variant: "destructive",
      });
      return;
    }

    if (!selectedCategory) {
      toast({
        title: "Category required",
        description: "Please select a category for your article",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    
    // Create article object
    const articleId = `article_${Date.now()}`;
    const article = {
      id: articleId,
      title,
      content,
      excerpt: content.substring(0, 150) + (content.length > 150 ? "..." : ""),
      cover: coverImage,
      author: {
        name: "Current User",
        id: "current_user",
        avatar: "",
      },
      publishDate: new Date().toLocaleDateString(),
      readTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
      tags,
      category: selectedCategory,
      likes: 0,
      views: 0,
      comments: 0,
      isDraft: false,
    };
    
    // Get existing articles from localStorage
    const existingArticles = JSON.parse(localStorage.getItem("techoh-articles") || "[]");
    
    // Add new article
    const updatedArticles = [...existingArticles, article];
    localStorage.setItem("techoh-articles", JSON.stringify(updatedArticles));
    
    toast({
      title: "Article published",
      description: "Your article has been published successfully",
    });
    
    setIsPublishing(false);
    navigate("/dashboard");
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

  const handleSuggestedTagClick = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleTitleSuggestionClick = (suggestion: string) => {
    setTitle(suggestion);
    toast({
      title: "Title updated",
      description: "The suggested title has been applied",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getMoreSuggestions = () => {
    if (!title && !content) {
      toast({
        title: "Content required",
        description: "Please add some content to get suggestions",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingSuggestions(true);
    
    // Simulate AI generating suggestions
    setTimeout(() => {
      // Generate tag suggestions based on content
      const contentBasedTags = SUGGESTED_TAGS.sort(() => 0.5 - Math.random()).slice(0, 5);
      setSuggestedTags(contentBasedTags);
      
      // Generate title suggestions if content exists but title is empty
      if (content && !title) {
        const generatedTitles = [
          "The Complete Guide to " + (content.split(' ').slice(0, 3).join(' ') || "Modern Development"),
          "How to Master " + (content.split(' ').slice(0, 2).join(' ') || "This Technology"),
          "Understanding the Basics of " + (content.split(' ').slice(0, 2).join(' ') || "Programming"),
        ];
        setTitleSuggestions(generatedTitles);
      }
      
      toast({
        title: "Suggestions generated",
        description: "AI has provided new suggestions based on your content",
      });
      
      setIsGeneratingSuggestions(false);
    }, 1500);
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
                <AIAssistantPanel 
                  text={content} 
                  onClose={() => setShowAiAssistant(false)}
                  onSuggestionAccept={(updatedText) => setContent(updatedText)} 
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-medium">Article Settings</h3>

                <div className="space-y-4">
                  {/* Featured Image */}
                  <div>
                    <Label className="mb-2 block">Featured Image</Label>
                    {coverImage ? (
                      <div className="relative mb-2 rounded-md border overflow-hidden">
                        <img 
                          src={coverImage}
                          alt="Cover preview" 
                          className="aspect-video w-full object-cover"
                        />
                        <Button 
                          variant="destructive" 
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 rounded-full opacity-90"
                          onClick={removeCoverImage}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ) : (
                      <div className="mb-2">
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                          id="cover-image-upload"
                        />
                        <label htmlFor="cover-image-upload">
                          <Button variant="outline" className="w-full cursor-pointer" asChild>
                            <span>
                              <Upload size={16} className="mr-2" />
                              Upload Image
                            </span>
                          </Button>
                        </label>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Recommended: 1200×630px, max 5MB
                    </p>
                  </div>

                  {/* Categories */}
                  <div>
                    <Label className="mb-2 block">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags */}
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
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-medium">AI Suggestions</h3>
                <div className="space-y-4">
                  {/* Suggested Tags */}
                  <div className="rounded-md bg-muted p-3">
                    <h4 className="text-sm font-medium flex items-center gap-1">
                      <Tags size={14} />
                      Suggested Tags
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {suggestedTags.length > 0 ? (
                        suggestedTags.map((tag) => (
                          <Button 
                            key={tag}
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => handleSuggestedTagClick(tag)}
                          >
                            {tag}
                          </Button>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Click "Get More Suggestions" to generate tags
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Title Suggestions */}
                  <div className="rounded-md bg-muted p-3">
                    <h4 className="text-sm font-medium">Title Suggestions</h4>
                    {titleSuggestions.length > 0 ? (
                      <div className="mt-2 space-y-2">
                        {titleSuggestions.map((suggestion, index) => (
                          <Button 
                            key={index} 
                            variant="ghost" 
                            className="w-full justify-start text-left text-xs h-auto py-1.5"
                            onClick={() => handleTitleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Add content to get AI-generated title suggestions
                      </p>
                    )}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full gap-1"
                    onClick={getMoreSuggestions}
                    disabled={isGeneratingSuggestions}
                  >
                    {isGeneratingSuggestions ? (
                      <>
                        <span className="animate-spin mr-1">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} className="mr-1 text-techoh-blue" />
                        Get More Suggestions
                      </>
                    )}
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
