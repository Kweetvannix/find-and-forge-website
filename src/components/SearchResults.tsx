
import { useState, useEffect } from "react";
import { X, Brain, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } = useToast";

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const SearchResults = ({ query, onClose }: SearchResultsProps) => {
  const [response, setResponse] = useState<string>("");
  const [thinking, setThinking] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setThinking("");
      setResponse("");
      
      // Simulate thinking process
      const thinkingSteps = [
        "🤔 Analyzing your question...",
        "🔍 Connecting to Gemma AI...",
        "💭 Processing with Google AI...",
        "🧠 Generating response...",
        "✨ Almost ready..."
      ];
      
      for (let i = 0; i < thinkingSteps.length; i++) {
        setThinking(thinkingSteps[i]);
        await new Promise(resolve => setTimeout(resolve, 600));
      }
      
      try {
        // Call the AI search service directly
        const { data, error } = await supabase.functions.invoke('ai-search', {
          body: { query }
        });

        if (error) {
          throw new Error(error.message);
        }

        if (data && data.success && data.results && data.results.length > 0) {
          // Get the AI-generated response from the results
          const aiResponse = data.results.map(r => 
            `**${r.title}**\n${r.description}\n`
          ).join('\n');
          
          setResponse(`Hey there! 👋 Great question about "${query}"!\n\n🎯 **Here's what I found using Google Gemma AI:**\n\n${aiResponse}\n\n**My Analysis:**\nBased on my AI processing, this information should give you a comprehensive understanding of your query. The response above was generated using Google's Gemma AI model to provide you with accurate and helpful information.\n\n**Powered by:**\n🤖 Google Gemma AI Model\n⚡ Advanced language processing\n🎯 Contextual understanding\n\nHope this helps! Feel free to ask another question. 🚀`);
        } else {
          throw new Error('No results from AI');
        }
      } catch (error) {
        console.error('AI search error:', error);
        toast({
          title: "Search Error",
          description: "There was an issue with the AI search. Please try again.",
          variant: "destructive",
        });
        
        setResponse(`Hey there! 👋 I encountered an issue searching for "${query}".\n\n🔧 **What happened:**\nThere seems to be a temporary issue with the Gemma AI service. This could be due to API connectivity or high demand.\n\n💡 **What you can try:**\n• Check your internet connection\n• Try a different search query\n• Wait a moment and try again\n• Ensure the Google API key is properly configured\n\n🤖 **Technical note:**\nThis search uses Google's Gemma AI model for intelligent responses. The service should be back online shortly.\n\nSorry for the inconvenience! 🙏`);
      }
      
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
            Gemma AI is thinking about "{query}"...
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
                Processing with Gemma AI...
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
            Gemma AI Response
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
              <div className="font-semibold text-lg">Gemma AI Assistant</div>
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
