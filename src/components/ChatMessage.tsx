
import React from 'react';
import { User, Stethoscope, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: {
    id: string;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
    suggestions?: string[];
    isLoading?: boolean;
  };
  onSuggestionClick?: (suggestion: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSuggestionClick }) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-blue-500 text-white' 
          : 'bg-green-500 text-white'
      }`}>
        {isUser ? <User className="h-5 w-5" /> : <Stethoscope className="h-5 w-5" />}
      </div>
      
      <div className={`flex-1 max-w-xs md:max-w-md ${isUser ? 'text-right' : ''}`}>
        <div className={`p-4 rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white ml-auto'
            : 'bg-gray-50 text-gray-800 border'
        }`}>
          {message.isLoading ? (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 animate-spin" />
              <span className="text-sm">Analyzing your symptoms...</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
          )}
        </div>
        
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-xs text-gray-500 font-medium">Quick responses:</p>
            <div className="flex flex-wrap gap-2">
              {message.suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className="text-xs h-7 px-2"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-2">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
