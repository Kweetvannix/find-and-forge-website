
import { useState } from "react";
import { ChevronDown, Sparkles, Bot, Zap, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AIProvider } from "@/services/AISearchService";

interface ProviderSelectorProps {
  selectedProvider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
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

const ProviderSelector = ({ selectedProvider, onProviderChange }: ProviderSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const providers: AIProvider[] = ['openai', 'anthropic', 'gemini', 'openrouter'];

  const handleProviderSelect = (provider: AIProvider) => {
    onProviderChange(provider);
    setIsOpen(false);
  };

  const SelectedIcon = providerIcons[selectedProvider];

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-[140px] justify-between"
      >
        <div className="flex items-center gap-2">
          <SelectedIcon className="h-4 w-4" />
          <span className="text-sm">{providerNames[selectedProvider]}</span>
        </div>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <Card className="absolute top-full mt-1 z-50 w-48 border-0 shadow-lg">
          <CardContent className="p-2">
            {providers.map((provider) => {
              const Icon = providerIcons[provider];
              return (
                <Button
                  key={provider}
                  variant="ghost"
                  onClick={() => handleProviderSelect(provider)}
                  className={`w-full justify-start gap-2 h-8 ${
                    selectedProvider === provider ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{providerNames[provider]}</span>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProviderSelector;
