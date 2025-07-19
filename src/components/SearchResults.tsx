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
      
      const mockResults: SearchResult[] = [
        {
          id: "1",
          title: `Best practices for ${query}`,
          description: `Comprehensive guide covering everything you need to know about ${query}. Learn from industry experts and improve your skills.`,
          url: `https://example.com/${query.toLowerCase().replace(/\s+/g, '-')}`,
          category: "Guide",
          timestamp: "2 hours ago"
        },
        {
          id: "2",
          title: `${query} - Complete Tutorial`,
          description: `Step-by-step tutorial that will help you master ${query}. Includes practical examples and real-world applications.`,
          url: `https://tutorial.com/${query.toLowerCase().replace(/\s+/g, '-')}`,
          category: "Tutorial",
          timestamp: "1 day ago"
        },
        {
          id: "3",
          title: `Advanced ${query} Techniques`,
          description: `Take your ${query} skills to the next level with these advanced techniques and professional tips from experts.`,
          url: `https://advanced.com/${query.toLowerCase().replace(/\s+/g, '-')}`,
          category: "Advanced",
          timestamp: "3 days ago"
        },
        {
          id: "4",
          title: `${query} Tools and Resources`,
          description: `Curated collection of the best tools, resources, and utilities for ${query}. Save time and boost productivity.`,
          url: `https://tools.com/${query.toLowerCase().replace(/\s+/g, '-')}`,
          category: "Tools",
          timestamp: "1 week ago"
        }
      ];
      
      setResults(mockResults);
      setUsedProvider('fallback');
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
            🔍 Dug up {results.length} juicy results for "{query}" 
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
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-xs">
                  {result.category}
                </Badge>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {result.timestamp}
                </div>
              </div>
              
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
