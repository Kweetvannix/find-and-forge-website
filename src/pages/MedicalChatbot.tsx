
import { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, AlertTriangle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import ThreeCanvas from "@/components/ThreeCanvas";
import ChatMessage from "@/components/ChatMessage";
import { MedicalReasoningService } from "@/services/MedicalReasoningService";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  isLoading?: boolean;
}

interface AIActivityData {
  typingSpeed: number;
  inputLength: number;
  isTyping: boolean;
}

const MedicalChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI medical assistant, designed to help analyze your symptoms systematically. I'll ask targeted questions to better understand your condition and provide preliminary insights.\n\nPlease describe your main symptom or health concern, and I'll guide you through a structured assessment.\n\n⚠️ Important: This is for informational purposes only and should not replace professional medical advice.",
      timestamp: new Date(),
      suggestions: MedicalReasoningService.getQuickStartQuestions().slice(0, 4)
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiActivityData, setAiActivityData] = useState<AIActivityData>({
    typingSpeed: 0,
    inputLength: 0,
    isTyping: false
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update AI activity when loading state changes
  useEffect(() => {
    if (isLoading) {
      setAiActivityData({
        typingSpeed: 8,
        inputLength: 75,
        isTyping: true
      });
    } else {
      setAiActivityData({
        typingSpeed: 0,
        inputLength: 0,
        isTyping: false
      });
    }
  }, [isLoading]);

  const sendMessage = async (messageText: string = currentMessage) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: "",
      timestamp: new Date(),
      isLoading: true
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      const medicalResponse = await MedicalReasoningService.analyzeSymptoms(messageText);

      // Remove loading message and add actual response
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: `${medicalResponse.analysis}\n\n${medicalResponse.recommendedActions.length > 0 ? '**Recommendations:**\n' + medicalResponse.recommendedActions.map(action => `• ${action}`).join('\n') : ''}`,
          timestamp: new Date(),
          suggestions: medicalResponse.followUpQuestions.slice(0, 3)
        };
        return [...withoutLoading, botMessage];
      });

      // Show risk level if medium or high
      if (medicalResponse.riskLevel === 'high') {
        toast({
          title: "High Priority Symptoms",
          description: "Consider seeking immediate medical attention if symptoms are severe or worsening.",
          variant: "destructive",
        });
      } else if (medicalResponse.riskLevel === 'medium') {
        toast({
          title: "Medical Attention Recommended",
          description: "Consider consulting with a healthcare provider for proper evaluation.",
        });
      }

    } catch (error) {
      console.error('Medical chatbot error:', error);
      
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: "I apologize, but I'm having trouble processing your request right now. Please try again later or consult with a healthcare professional for immediate concerns.",
          timestamp: new Date()
        };
        return [...withoutLoading, errorMessage];
      });

      toast({
        title: "Error",
        description: "Unable to get medical response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewConversation = () => {
    MedicalReasoningService.clearConversationHistory();
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "Hello! I'm your AI medical assistant, designed to help analyze your symptoms systematically. I'll ask targeted questions to better understand your condition and provide preliminary insights.\n\nPlease describe your main symptom or health concern, and I'll guide you through a structured assessment.\n\n⚠️ Important: This is for informational purposes only and should not replace professional medical advice.",
        timestamp: new Date(),
        suggestions: MedicalReasoningService.getQuickStartQuestions().slice(0, 4)
      }
    ]);
    setCurrentMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              AI Medical Assistant
            </h1>
            <p className="text-gray-600 text-lg">
              Advanced symptom analysis with systematic medical reasoning
            </p>
          </div>

          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Medical Disclaimer:</strong> This AI assistant provides preliminary symptom analysis for informational purposes only. It does not replace professional medical diagnosis, treatment, or advice. Always consult qualified healthcare professionals for medical concerns, especially for severe or emergency symptoms.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    Medical Consultation
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={startNewConversation}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    New Chat
                  </Button>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="h-96 overflow-y-auto mb-4 space-y-4 scroll-smooth">
                    {messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        onSuggestionClick={handleSuggestionClick}
                      />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="flex gap-3">
                    <Textarea
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Describe your symptoms in detail..."
                      className="flex-1 min-h-[80px] resize-none"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={() => sendMessage()}
                      disabled={isLoading || !currentMessage.trim()}
                      className="self-end bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Three.js Animation & Info Panel */}
            <div className="space-y-6">
              <Card className="border-0 shadow-xl bg-white">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Analysis Monitor</h3>
                    <p className="text-sm text-gray-600">
                      Visual feedback during symptom analysis
                    </p>
                  </div>
                  <ThreeCanvas typingData={aiActivityData} />
                  <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs text-blue-600 font-medium">Status</div>
                      <div className="text-sm font-semibold">
                        {aiActivityData.isTyping ? 'Analyzing' : 'Ready'}
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-xs text-green-600 font-medium">Activity</div>
                      <div className="text-sm font-semibold">
                        {aiActivityData.typingSpeed.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Start Questions */}
              <Card className="border-0 shadow-xl bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Symptoms</h3>
                  <div className="space-y-2">
                    {MedicalReasoningService.getQuickStartQuestions().slice(4).map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => sendMessage(question)}
                        className="w-full text-left justify-start text-sm h-auto py-2 px-3"
                        disabled={isLoading}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedicalChatbot;
