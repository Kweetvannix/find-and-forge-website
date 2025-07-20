
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
      
      // Simulate AI response generation
      const aiResponse = await generateMockResponse(query);
      setResponse(aiResponse);
      setShowThinking(false);
      setLoading(false);
    };

    const generateMockResponse = async (query: string): Promise<string> => {
      // Mock AI response generation with typing effect
      const responses = {
        default: `Hey there! 👋 Great question about "${query}"!\n\n🎯 **Here's what I found:**\n\nBased on my analysis, this is a really interesting topic that touches on several key areas. Let me break this down for you in a way that's actually useful:\n\n**Key Points:**\n• This subject has been gaining significant attention recently\n• There are multiple perspectives worth considering\n• The practical applications are quite fascinating\n\n**My Take:**\nWhat's really cool about this is how it connects to broader trends we're seeing. The research suggests that understanding this concept can really help with making informed decisions.\n\n**Bottom Line:**\nThis is definitely worth exploring further! The implications are pretty significant, and I think you're asking exactly the right questions here.\n\nWant me to dive deeper into any specific aspect? I'm here to help! 🚀`,
        
        medical: `🩺 **Medical AI Analysis for "${query}"**\n\nHey! Really solid question about medical stuff. Let me break this down based on the latest research and clinical findings:\n\n🔬 **Current State:**\n• AI diagnostic accuracy has improved dramatically (85-95% in many areas)\n• Machine learning models are now assisting doctors in real-time\n• Patient outcomes are showing measurable improvements\n\n🏥 **Real-World Impact:**\nWhat's happening in hospitals right now is honestly pretty amazing. AI systems are helping catch things human doctors might miss, especially in radiology and pathology.\n\n⚡ **The Game Changer:**\nThe speed is incredible - what used to take hours now takes minutes. But here's the thing: it's not replacing doctors, it's making them superhuman.\n\n🎯 **Bottom Line:**\nWe're seeing a 40-60% reduction in diagnostic errors when AI and human expertise work together. That's thousands of lives saved annually.\n\nThis is just the beginning - the next 5 years are going to be wild! 🚀\n\nNeed me to dig into any specific medical area?`
      };
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (query.toLowerCase().includes('medical') || query.toLowerCase().includes('health') || query.toLowerCase().includes('doctor')) {
        return responses.medical;
      }
      
      return responses.default;
    };

    fetchResults();
  }, [query]);

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
              <Badge variant="outline">Powered by Advanced AI</Badge>
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
