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
    name: 'google',
    apiKey: Deno.env.get('GOOGLE_API_KEY'),
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent',
    model: 'gemma-3-27b-it'
  };
  
  if (!provider.apiKey) {
    console.error('Google API key not found in environment variables');
    return null;
  }
  
  return provider;
};

const callGoogleAI = async (provider: AIProvider, query: string) => {
  console.log(`Calling Google AI API with model ${provider.model} for query: ${query}`);
  const response = await fetch(`${provider.endpoint}?key=${provider.apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are a helpful search assistant. Generate 4 relevant search results for the user's query. Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks):
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
          Make sure the results are realistic and relevant to the query. Use real-looking URLs and comprehensive descriptions. Return only the JSON, no other text. Search for: ${query}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Google AI API error response: Status ${response.status}, ${errorText}`);
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  console.log('Google AI API raw response:', JSON.stringify(data, null, 2));
  
  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0].text) {
    console.error('Unexpected API response structure:', JSON.stringify(data, null, 2));
    throw new Error('Invalid response structure from Google AI API');
  }

  return data.candidates[0].content.parts[0].text;
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
          error: 'Google API key not configured' 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing AI search for query: ${query} using Google AI with model: ${provider.model}`);

    let aiResponse: string;
    
    try {
      aiResponse = await callGoogleAI(provider, query);
    } catch (apiError) {
      console.error(`Google AI API error:`, apiError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Google AI API error: ${apiError.message}` 
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
