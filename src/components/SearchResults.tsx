
import { useState, useEffect } from "react";
import { X, Brain, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AISearchService } from "@/services/AISearchService";
import { useToast } from "@/hooks/use-toast";

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const SearchResults = ({ query, onClose }: SearchResultsProps) => {
  const [response, setResponse] = useState<string>("");
  const [thinking, setThinking] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showThinking, setShowThinking] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setThinking("");
      setResponse("");
      
      // Simulate thinking process
      const thinkingSteps = [
        "🤔 Analyzing your question...",
        "🔍 Searching through knowledge base...",
        "💭 Processing information...",
        "🧠 Formulating comprehensive response...",
        "✨ Almost ready with your answer..."
      ];
      
      for (let i = 0; i < thinkingSteps.length; i++) {
        setThinking(thinkingSteps[i]);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      try {
        // Use the actual AI search service
        const result = await AISearchService.searchWithAI(query);
        
        if (result.success && result.results && result.results.length > 0) {
          // Combine all results into a conversational response
          const combinedResponse = result.results.map(r => 
            `**${r.title}**\n${r.description}\n`
          ).join('\n');
          
          setResponse(`Hey there! 👋 Great question about "${query}"!\n\n🎯 **Here's what I found:**\n\n${combinedResponse}\n\n**My Take:**\nBased on the search results above, this is a really interesting topic with multiple perspectives worth considering. The information I've gathered should give you a solid foundation to understand the subject better.\n\n**Bottom Line:**\nHope this helps! Feel free to ask if you want me to dive deeper into any specific aspect. 🚀`);
        } else {
          throw new Error(result.error || 'No results found');
        }
      } catch (error) {
        console.error('AI search error:', error);
        toast({
          title: "Search Error",
          description: "There was an issue with the AI search. Please try again.",
          variant: "destructive",
        });
        
        // Fallback response
        setResponse(`Hey there! 👋 I encountered an issue searching for "${query}".\n\n🔧 **What happened:**\nThere seems to be a temporary issue with the AI search service. This could be due to API connectivity or configuration.\n\n💡 **What you can try:**\n• Check if the Google API key is properly configured\n• Try a different search query\n• Wait a moment and try again\n\n🤖 **Technical note:**\nThe search service uses Google's Gemma AI model to provide intelligent responses. Make sure the API credentials are set up correctly.\n\nSorry for the inconvenience! 🙏`);
      }
      
      setShowThinking(false);
      setLoading(false);
    };

    fetchResults();
  }, [query, toast]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-500" />
            AI is thinking about "{query}"...
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white animate-pulse" />
              </div>
              <Badge variant="outline" className="animate-pulse">
                Thinking...
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 text-lg">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="animate-pulse">{thinking}</span>
            </div>
            
            <div className="mt-6 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-3 bg-gray-200 rounded animate-pulse" style={{width: `${Math.random() * 40 + 60}%`}}></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-500" />
            AI Response
          </h2>
          <p className="text-gray-600">Answer for "{query}"</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-lg">AI Assistant</div>
              <Badge variant="outline">Powered by Google Gemma AI</Badge>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {response}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchResults;
