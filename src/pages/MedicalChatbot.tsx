
import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ThreeCanvas from "@/components/ThreeCanvas";
import { TypingTracker, TypingData } from "@/components/TypingAnimation";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const MedicalChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI medical assistant. Please describe a single symptom you're experiencing, and I'll ask you follow-up questions to better understand it. Remember: This is for informational purposes only and should not replace professional medical advice.",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingData, setTypingData] = useState<TypingData>({
    typingSpeed: 0,
    inputLength: 0,
    isTyping: false
  });
  
  const { toast } = useToast();
  const typingTrackerRef = useRef<TypingTracker | null>(null);

  useEffect(() => {
    typingTrackerRef.current = new TypingTracker(setTypingData);
    
    return () => {
      typingTrackerRef.current?.cleanup();
    };
  }, []);

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { 
          query: `You are a helpful AI assistant designed to ask follow-up questions about a single reported symptom to gather more information. Your goal is to understand the symptom better by asking clear, concise, and relevant questions.

The user has reported this symptom: "${currentMessage}"

Your task is to generate 3-5 follow-up questions that would help clarify the nature, severity, duration, and any associated factors of this specific symptom. Do not ask about other symptoms or potential diagnoses. Focus solely on the symptom provided.

Please format your response as a numbered list of questions, and keep each question clear and concise. After the questions, provide a brief, empathetic closing statement reminding the user that this is for informational purposes only.

Example format:
1. [Question about the nature of the symptom]
2. [Question about duration]
3. [Question about severity]
4. [Question about triggers or relieving factors]
5. [Question about associated factors]

Remember: Focus only on understanding the reported symptom better, not on diagnosing or suggesting other symptoms to consider.` 
        }
      });

      if (error) throw error;

      if (data && data.success && data.results) {
        const aiResponse = data.results.map(r => r.description).join(' ');

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: aiResponse || "I apologize, but I couldn't process your symptom at the moment. Please try again or consult with a healthcare professional.",
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('No response from medical AI');
      }
    } catch (error) {
      console.error('Medical chatbot error:', error);
      toast({
        title: "Error",
        description: "Unable to get medical response. Please try again.",
        variant: "destructive",
      });

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again later or consult with a healthcare professional for immediate concerns.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    typingTrackerRef.current?.onKeyPress();
    
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCurrentMessage(value);
    typingTrackerRef.current?.onInputChange(value.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              AI Medical Assistant
            </h1>
            <p className="text-gray-600 text-lg">
              Describe your symptoms and get AI-powered medical insights
            </p>
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-left max-w-2xl mx-auto">
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> This AI assistant provides general medical information and should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chat Interface */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-96 overflow-y-auto mb-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-green-500 text-white'
                      }`}>
                        {message.type === 'user' ? <User className="h-4 w-4" /> : <Stethoscope className="h-4 w-4" />}
                      </div>
                      <div className={`flex-1 max-w-xs md:max-w-md ${message.type === 'user' ? 'text-right' : ''}`}>
                        <div className={`p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white ml-auto'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                        <Bot className="h-4 w-4 animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">
                            Analyzing your symptoms...
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Textarea
                    value={currentMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your symptoms in detail..."
                    className="flex-1 min-h-[80px] resize-none"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={isLoading || !currentMessage.trim()}
                    className="self-end bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Three.js Animation */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Activity Monitor</h3>
                  <p className="text-sm text-gray-600">
                    Watch the animation respond to your typing patterns
                  </p>
                </div>
                <ThreeCanvas typingData={typingData} />
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div className="p-2 bg-blue-50 rounded">
                    <div className="text-xs text-blue-600">Typing Speed</div>
                    <div className="text-sm font-semibold">{typingData.typingSpeed.toFixed(1)} k/s</div>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <div className="text-xs text-green-600">Input Length</div>
                    <div className="text-sm font-semibold">{typingData.inputLength}</div>
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <div className="text-xs text-purple-600">Status</div>
                    <div className="text-sm font-semibold">{typingData.isTyping ? 'Typing' : 'Idle'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedicalChatbot;
