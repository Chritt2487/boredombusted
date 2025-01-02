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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { activityName } = await req.json();
    
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
    const prompt = `For the activity "${activityName}", generate detailed information including:
    1. 3 essential equipment items with names, descriptions, and approximate prices
    2. 3 alternative activities that someone might also enjoy
    Format as JSON with this structure:
    {
      "equipment": [{"name": "", "description": "", "price": ""}],
      "alternatives": [{"name": "", "description": ""}]
    }`;

    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an expert activity recommendation system.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!gptResponse.ok) {
      throw new Error('Failed to generate detailed information');
    }

    const gptData = await gptResponse.json();
    const detailedInfo = JSON.parse(gptData.choices[0].message.content);

    // Add affiliate links to equipment
    detailedInfo.equipment = detailedInfo.equipment.map((item: any) => ({
      ...item,
      affiliateUrl: `https://amazon.com/s?k=${encodeURIComponent(item.name)}&tag=${amazonAffiliateKey}`,
    }));

    // Add YouTube search link for tutorials
    detailedInfo.tutorials = [{
      title: `${activityName} Tutorials`,
      description: `Find helpful tutorials and guides for ${activityName}`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(activityName)}+tutorial+guide+how+to`,
    }];

    // Cache the results
    activityCache.set(activityName, detailedInfo);
    console.log("Caching new data for:", activityName);

    return new Response(
      JSON.stringify(detailedInfo),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating detailed information:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate detailed information' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});