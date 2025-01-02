import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const amazonAffiliateKey = Deno.env.get('AMAZON_AFFILIATE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Cache for storing activity details to reduce API calls
const activityCache = new Map();

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error('OpenAI API key is not set');
      throw new Error('OpenAI API key is not configured');
    }

    const { activityName } = await req.json();
    console.log('Processing request for activity:', activityName);
    
    // Check cache first
    const cachedData = activityCache.get(activityName);
    if (cachedData) {
      console.log("Returning cached data for:", activityName);
      return new Response(
        JSON.stringify(cachedData),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate detailed information using GPT-4
    const prompt = `For the activity "${activityName}", generate detailed information in this exact JSON format:
    {
      "difficulty": "beginner/intermediate/advanced",
      "timeCommitment": "average time needed",
      "costEstimate": "startup and ongoing costs",
      "equipment": [
        {
          "name": "item name",
          "description": "brief description",
          "price": "estimated price"
        }
      ],
      "benefits": {
        "skills": ["list of skills developed"],
        "health": ["list of health benefits"],
        "social": ["list of social benefits"]
      },
      "community": {
        "groups": [
          {
            "name": "group name",
            "description": "brief description",
            "link": "website link"
          }
        ],
        "events": [
          {
            "name": "event name",
            "description": "brief description",
            "date": "upcoming date or recurring"
          }
        ],
        "hashtags": ["relevant hashtags"]
      },
      "alternatives": [
        {
          "name": "alternative activity name",
          "description": "brief description why it's similar"
        }
      ]
    }`;

    console.log('Sending request to OpenAI');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert activity recommendation system. Always return complete, well-formatted JSON.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received response from OpenAI');

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid response format from OpenAI:', data);
      throw new Error('Invalid response format from OpenAI');
    }

    const detailedInfo = JSON.parse(data.choices[0].message.content);

    // Add affiliate links to equipment
    detailedInfo.equipment = detailedInfo.equipment.map((item: any) => ({
      ...item,
      affiliateUrl: `https://amazon.com/s?k=${encodeURIComponent(item.name)}&tag=${amazonAffiliateKey}`,
    }));

    // Cache the results
    activityCache.set(activityName, detailedInfo);
    console.log("Caching new data for:", activityName);

    return new Response(
      JSON.stringify(detailedInfo),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in get-activity-details function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate detailed information',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});