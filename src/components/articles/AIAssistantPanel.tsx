
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Edit, Wand, RotateCw, Check, X, AlertCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface AIAssistantPanelProps {
  text?: string;
  onSuggestionAccept?: (text: string) => void;
  onClose?: () => void;
}

export default function AIAssistantPanel({
  text = "",
  onSuggestionAccept,
  onClose,
}: AIAssistantPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleGenerateSuggestion = () => {
    setIsGenerating(true);
    // Simulate API call to AI service
    setTimeout(() => {
      const improvedText = "This is an AI-improved version of your text that enhances clarity, engagement, and SEO optimization while maintaining your original voice and technical accuracy.";
      setAiSuggestion(improvedText);
      setIsGenerating(false);
    }, 1500);
  };

  const handleAcceptSuggestion = () => {
    if (onSuggestionAccept && aiSuggestion) {
      onSuggestionAccept(aiSuggestion);
      setSuccessMessage("AI suggestion applied!");
      setTimeout(() => {
        setSuccessMessage("");
        setAiSuggestion("");
      }, 2000);
    }
  };

  return (
    <div className="rounded-lg border border-techoh-blue/30 bg-gradient-to-r from-techoh-blue/5 to-techoh-purple/5 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-techoh-blue" />
          <h3 className="font-semibold text-lg">AI Writing Assistant</h3>
          <Badge className="badge-ai">Beta</Badge>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <Textarea
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Write your content here or select text from your article to enhance."
          className="min-h-24"
        />

        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-1 border-techoh-purple/30 bg-techoh-purple/10"
                  onClick={handleGenerateSuggestion}
                  disabled={isGenerating || !currentText.trim()}
                >
                  {isGenerating ? (
                    <RotateCw size={16} className="mr-1 animate-spin" />
                  ) : (
                    <Wand size={16} className="mr-1" />
                  )}
                  <span>Enhance Writing</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Use AI to enhance clarity and engagement</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-1 border-techoh-purple/30 bg-techoh-purple/10"
                  disabled={isGenerating || !currentText.trim()}
                >
                  <Edit size={16} className="mr-1" />
                  <span>Grammar Check</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fix grammar and spelling issues</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-1 border-techoh-purple/30 bg-techoh-purple/10"
                  disabled={isGenerating || !currentText.trim()}
                >
                  <AlertCircle size={16} className="mr-1" />
                  <span>SEO Tips</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get SEO improvement suggestions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {aiSuggestion && (
          <div className="mt-4 space-y-3">
            <div className="ai-highlight">
              <p className="text-sm text-muted-foreground mb-2">AI Suggestion:</p>
              <p>{aiSuggestion}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleAcceptSuggestion}>
                <Check size={16} className="mr-1" />
                Apply Suggestion
              </Button>
              <Button variant="outline" onClick={() => setAiSuggestion("")}>
                <X size={16} className="mr-1" />
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-md bg-green-500/10 p-3 text-green-600">
            <Check size={16} />
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
