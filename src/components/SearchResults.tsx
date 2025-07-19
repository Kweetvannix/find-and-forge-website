import { useState, useEffect } from "react";
import { X, ExternalLink, Clock, Sparkles, Bot, Zap, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AISearchService } from "@/services/AISearchService";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  timestamp: string;
  provider?: string;
}

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const providerIcons = {
  openai: Sparkles,
  anthropic: Bot,
  gemini: Zap,
  openrouter: Network,
};

const providerNames = {
  openai: 'OpenAI GPT',
  anthropic: 'Anthropic Claude',
  gemini: 'Google Gemini',
  openrouter: 'OpenRouter',
};

const SearchResults = ({ query, onClose }: SearchResultsProps) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [usedProvider, setUsedProvider] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      
      const aiResponse = await AISearchService.searchWithAI(query);
      
      if (aiResponse.success && aiResponse.results) {
        setResults(aiResponse.results);
        setUsedProvider('🤖 Grok-style AI (DeepSeek)');
      } else {
        toast({
          title: "🚨 Oops!",
          description: aiResponse.error || "AI search hit a snag! 😅",
          variant: "destructive",
        });
        // Fall back to mock results if AI search fails
        await fetchMockResults();
      }
      
      setLoading(false);
    };

    const fetchMockResults = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a single conversational response instead of multiple results
      const chatResponse = `Hey there! 👋 So you're asking about "${query}"? 

🤔 Here's what I'm thinking about this topic:

This is definitely an interesting area to explore! Based on what I know, there are several key aspects worth considering:

💡 **Key Points:**
• This topic has been gaining attention in recent research
• There are multiple approaches and perspectives to consider
• The latest developments show promising results
• It's important to look at evidence-based information

🔬 **What the research tells us:**
The current literature suggests that this area is evolving rapidly, with new findings emerging regularly. Many experts are focusing on practical applications and real-world implications.

🎯 **Bottom line:**
This is a complex topic that benefits from a comprehensive understanding. I'd recommend looking into peer-reviewed sources and staying updated with the latest research developments.

Want to dive deeper into any specific aspect? Just let me know! 🚀`;

      const mockResults: SearchResult[] = [
        {
          id: "chat-response",
          title: "💬 Grok-style AI Response",
          description: chatResponse,
          url: "#",
          category: "💭 AI Chat",
          timestamp: "just now"
        }
      ];
      
      setResults(mockResults);
      setUsedProvider('🤖 Grok-style AI (Offline Mode)');
    };

    fetchResults();
  }, [query, toast]);

  const ProviderIcon = Network;
  const providerDisplayName = usedProvider;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ProviderIcon className="h-6 w-6 text-blue-500 animate-pulse" />
            🤖 Hold up! Grok-style AI is cooking up some spicy results for "{query}"... ✨
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ProviderIcon className="h-6 w-6 text-blue-500" />
            🎯 Boom! Here's what I found
            {usedProvider !== 'fallback' && (
              <Badge variant="outline" className="ml-2">
                {providerDisplayName}
              </Badge>
            )}
          </h2>
          <p className="text-gray-600">
            🔍 Here's my take on "{query}" 
            {usedProvider !== 'fallback' && ` • Powered by ${providerDisplayName} 🚀`}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <Card key={result.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className="text-xs">
                  {result.category}
                </Badge>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {result.timestamp}
                </div>
              </div>
              
              {result.id === 'chat-response' ? (
                // Show conversational chat response
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {result.description}
                  </div>
                </div>
              ) : (
                // Show regular result format (fallback)
                <>
                  <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-700 mb-2">
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      {result.title}
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </h3>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {result.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 font-medium">{result.url}</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href={result.url} target="_blank" rel="noopener noreferrer">
                        Visit Site
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
