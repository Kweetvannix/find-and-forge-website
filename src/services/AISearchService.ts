
import { supabase } from "@/integrations/supabase/client";

interface AISearchResponse {
  success: boolean;
  results?: SearchResult[];
  error?: string;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  timestamp: string;
}

export class AISearchService {
  static async searchWithAI(query: string): Promise<AISearchResponse> {
    try {
      console.log('Making AI search request for query:', query);
      
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { query }
      });

      if (error) {
        console.error('Supabase function error:', error);
        return { success: false, error: error.message || 'Failed to call AI search function' };
      }

      if (data && data.success && data.results) {
        console.log('AI search successful:', data.results);
        return { success: true, results: data.results };
      } else {
        console.error('AI search failed:', data);
        return { success: false, error: data?.error || 'AI search failed' };
      }
    } catch (error) {
      console.error('Error during AI search:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to AI search service' 
      };
    }
  }
}
