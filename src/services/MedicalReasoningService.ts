
import { supabase } from "@/integrations/supabase/client";

interface SymptomAnalysis {
  symptom: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  associatedSymptoms: string[];
  triggers: string[];
  relievingFactors: string[];
}

interface MedicalResponse {
  analysis: string;
  followUpQuestions: string[];
  suggestions: string[];
  riskLevel: 'low' | 'medium' | 'high';
  recommendedActions: string[];
}

export class MedicalReasoningService {
  private static conversationHistory: Array<{role: string, content: string}> = [];

  static async analyzeSymptoms(userInput: string, conversationContext?: SymptomAnalysis): Promise<MedicalResponse> {
    try {
      // Add user input to conversation history
      this.conversationHistory.push({ role: 'user', content: userInput });

      const medicalPrompt = this.buildMedicalPrompt(userInput, conversationContext);

      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { 
          query: medicalPrompt
        }
      });

      if (error) throw error;

      if (data && data.success && data.results) {
        const aiResponse = data.results.map(r => r.description).join(' ');
        
        // Add AI response to conversation history
        this.conversationHistory.push({ role: 'assistant', content: aiResponse });

        return this.parseAIResponse(aiResponse);
      } else {
        throw new Error('No response from medical AI');
      }
    } catch (error) {
      console.error('Medical reasoning error:', error);
      throw error;
    }
  }

  private static buildMedicalPrompt(userInput: string, context?: SymptomAnalysis): string {
    const conversationContext = this.conversationHistory.length > 0 
      ? `\nConversation history:\n${this.conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}\n`
      : '';

    return `You are an advanced medical AI assistant similar to Symptomate. Your role is to:

1. Analyze symptoms systematically
2. Ask targeted follow-up questions
3. Assess risk levels (low/medium/high)
4. Provide preliminary insights while emphasizing professional medical consultation

${conversationContext}

Current user input: "${userInput}"

Please provide a structured response in this exact JSON format:
{
  "analysis": "Detailed analysis of the reported symptoms, considering medical possibilities while being careful not to diagnose",
  "followUpQuestions": ["3-5 specific medical questions to better understand the condition"],
  "suggestions": ["Quick response options for common follow-ups"],
  "riskLevel": "low|medium|high",
  "recommendedActions": ["Specific recommendations like 'consult doctor', 'monitor symptoms', 'seek emergency care if symptoms worsen'"]
}

Medical reasoning approach:
- Consider differential diagnosis possibilities
- Assess urgency and severity
- Ask about associated symptoms, onset, triggers
- Consider patient demographics if mentioned
- Always emphasize that this is preliminary assessment only

Be empathetic, thorough, and medically sound while maintaining appropriate disclaimers.`;
  }

  private static parseAIResponse(response: string): MedicalResponse {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          analysis: parsed.analysis || "I'm analyzing your symptoms. Could you provide more details?",
          followUpQuestions: parsed.followUpQuestions || ["How long have you been experiencing this?", "Is the symptom constant or intermittent?"],
          suggestions: parsed.suggestions || ["Yes", "No", "Sometimes", "Not sure"],
          riskLevel: parsed.riskLevel || 'medium',
          recommendedActions: parsed.recommendedActions || ["Monitor symptoms", "Consult healthcare provider if symptoms persist"]
        };
      }
    } catch (e) {
      console.error('Error parsing AI response:', e);
    }

    // Fallback response if parsing fails
    return {
      analysis: response,
      followUpQuestions: ["Could you describe your symptoms in more detail?", "How long have you been experiencing this?"],
      suggestions: ["Yes", "No", "Not sure"],
      riskLevel: 'medium',
      recommendedActions: ["Consult with a healthcare professional for proper evaluation"]
    };
  }

  static clearConversationHistory(): void {
    this.conversationHistory = [];
  }

  static getQuickStartQuestions(): string[] {
    return [
      "I have a headache",
      "I'm experiencing chest pain",
      "I have a fever",
      "I'm feeling dizzy",
      "I have stomach pain",
      "I have trouble sleeping",
      "I'm experiencing fatigue",
      "I have a cough"
    ];
  }
}
