
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AIProvider {
  name: string;
  apiKey: string;
  endpoint: string;
  model: string;
}

const getAIProvider = (): AIProvider | null => {
  const provider = {
    name: 'openrouter',
    apiKey: Deno.env.get('OPENROUTER_API_KEY'),
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'deepseek/deepseek-chat-v3-0324:free'
  };
  
  if (!provider.apiKey) {
    return null;
  }
  
  return provider;
};

const callOpenRouter = async (provider: AIProvider, query: string) => {
  const response = await fetch(provider.endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${provider.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://your-app.com',
      'X-Title': 'AI Search App'
    },
    body: JSON.stringify({
      model: provider.model,
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
    throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content;
};


serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ success: false, error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const provider = getAIProvider();
    if (!provider) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'OpenRouter API key not configured' 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing AI search for query: ${query} using OpenRouter with model: ${provider.model}`);

    let aiResponse: string;
    
    try {
      aiResponse = await callOpenRouter(provider, query);
    } catch (apiError) {
      console.error(`OpenRouter API error:`, apiError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `OpenRouter API error: ${apiError.message}` 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (!aiResponse) {
      return new Response(
        JSON.stringify({ success: false, error: 'No response from AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      const parsedResponse = JSON.parse(aiResponse);
      const results = parsedResponse.results.map((result: any, index: number) => ({
        id: `ai-${index + 1}`,
        title: result.title,
        description: result.description,
        url: result.url,
        category: result.category,
        timestamp: new Date().toLocaleString(),
        provider: provider.name
      }));

      console.log(`AI search successful using ${provider.name}, returning results:`, results.length);
      return new Response(
        JSON.stringify({ success: true, results, provider: provider.name }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to parse AI response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in ai-search function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
