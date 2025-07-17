
import { useState } from "react";
import { Key, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AISearchService } from "@/services/AISearchService";
import { useToast } from "@/hooks/use-toast";

interface APIKeyInputProps {
  onApiKeySet: () => void;
}

const APIKeyInput = ({ onApiKeySet }: APIKeyInputProps) => {
  const [apiKey, setApiKey] = useState(AISearchService.getApiKey() || "");
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your OpenAI API key",
        variant: "destructive",
      });
      return;
    }

    AISearchService.saveApiKey(apiKey.trim());
    toast({
      title: "Success",
      description: "API key saved successfully! You can now use AI-powered search.",
    });
    onApiKeySet();
  };

  const hasApiKey = !!AISearchService.getApiKey();

  return (
    <Card className="max-w-md mx-auto mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-lg">
          <Key className="h-5 w-5" />
          AI Search Setup
        </CardTitle>
        <p className="text-sm text-gray-600">
          {hasApiKey 
            ? "API key is set. You can update it below if needed." 
            : "Enter your OpenAI API key to enable AI-powered search"}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showApiKey ? "text" : "password"}
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Button type="submit" className="w-full">
            {hasApiKey ? "Update API Key" : "Save API Key"}
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Your API key is stored locally in your browser and never sent to our servers.
          Get your key from{" "}
          <a 
            href="https://platform.openai.com/api-keys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            OpenAI Platform
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export default APIKeyInput;
