
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
  private static API_KEY_STORAGE_KEY = 'openai_api_key';
  
  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async searchWithAI(query: string): Promise<AISearchResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found. Please set your OpenAI API key first.' };
    }

    try {
      console.log('Making AI search request for query:', query);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-2025-04-14',
          messages: [
            {
              role: 'system',
              content: `You are a helpful search assistant. Generate 4 relevant search results for the user's query. Return the results in JSON format with this exact structure:
              {
                "results": [
                  {
                    "title": "Result title",
                    "description": "Detailed description of the result",
                    "url": "https://example.com/relevant-url",
                    "category": "Category name"
                  }
                ]
              }
              Make sure the results are realistic and relevant to the query. Use real-looking URLs and comprehensive descriptions.`
            },
            {
              role: 'user',
              content: `Search for: ${query}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        return { 
          success: false, 
          error: errorData.error?.message || `API request failed with status ${response.status}` 
        };
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;
      
      if (!aiResponse) {
        return { success: false, error: 'No response from AI' };
      }

      try {
        const parsedResponse = JSON.parse(aiResponse);
        const results: SearchResult[] = parsedResponse.results.map((result: any, index: number) => ({
          id: `ai-${index + 1}`,
          title: result.title,
          description: result.description,
          url: result.url,
          category: result.category,
          timestamp: new Date().toLocaleString()
        }));

        console.log('AI search successful:', results);
        return { success: true, results };
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        return { success: false, error: 'Failed to parse AI response' };
      }
    } catch (error) {
      console.error('Error during AI search:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to OpenAI API' 
      };
    }
  }
}
