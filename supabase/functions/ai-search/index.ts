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
    console.error('OpenRouter API key not found in environment variables');
    return null;
  }
  
  return provider;
};

const callOpenRouterAI = async (provider: AIProvider, query: string) => {
  console.log(`Calling OpenRouter API with model ${provider.model} for query: ${query}`);
  const response = await fetch(provider.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${provider.apiKey}`,
      'HTTP-Referer': 'https://your-app.com',
      'X-Title': 'Medical AI Search'
    },
    body: JSON.stringify({
      model: provider.model,
      messages: [{
        role: 'user',
        content: `Hey there! 🧠✨ I need you to be like Grok AI - witty, conversational, and fun! Generate 4 awesome search results for this medical query. Make them engaging with emojis and casual language. Return ONLY a valid JSON object (no markdown):

        {
          "results": [
            {
              "title": "🔬 Cool title with emoji",
              "description": "Fun, conversational description that sounds like you're chatting with a friend. Include relevant emojis! Make it informative but not boring.",
              "url": "https://real-medical-site.com/relevant-path",
              "category": "📚 Research/💊 Treatment/🏥 Clinical/etc"
            }
          ]
        }

        Make it sound like Grok would write it - smart but casual, informative but entertaining! 🚀

        Query: ${query}`
      }],
      temperature: 0.8,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`OpenRouter API error response: Status ${response.status}, ${errorText}`);
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  console.log('OpenRouter API raw response:', JSON.stringify(data, null, 2));
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
    console.error('Unexpected API response structure:', JSON.stringify(data, null, 2));
    throw new Error('Invalid response structure from OpenRouter API');
  }

  return data.choices[0].message.content;
};

const cleanJSONResponse = (response: string): string => {
  let cleaned = response.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '');
  }
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '');
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.replace(/\s*```$/, '');
  }
  return cleaned.trim();
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query) {
      console.error('No query provided in request');
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
      aiResponse = await callOpenRouterAI(provider, query);
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
      console.error('No response received from Google AI API');
      return new Response(
        JSON.stringify({ success: false, error: 'No response from AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    try {
      const cleanedResponse = cleanJSONResponse(aiResponse);
      console.log('Raw AI response:', aiResponse);
      console.log('Cleaned AI response:', cleanedResponse);
      
      const parsedResponse = JSON.parse(cleanedResponse);
      
      if (!parsedResponse.results || !Array.isArray(parsedResponse.results)) {
        console.error('Invalid response structure: missing or invalid results array');
        throw new Error('Invalid response structure: missing results array');
      }
      
      const results = parsedResponse.results.map((result: any, index: number) => ({
        id: `ai-${index + 1}`,
        title: result.title || 'Untitled',
        description: result.description || 'No description available',
        url: result.url || '#',
        category: result.category || 'General',
        timestamp: new Date().toLocaleString(),
        provider: provider.name
      }));

      console.log(`AI search successful using ${provider.name}, returning ${results.length} results`);
      return new Response(
        JSON.stringify({ success: true, results, provider: provider.name }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw response that failed to parse:', aiResponse);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Failed to parse AI response: ${parseError.message}` 
        }),
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
