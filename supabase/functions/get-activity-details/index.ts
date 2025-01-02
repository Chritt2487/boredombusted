import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const amazonAffiliateKey = Deno.env.get('AMAZON_AFFILIATE_KEY');
const googlePlacesApiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { activityName } = await req.json();
    
    // Generate detailed information using GPT-4
    const prompt = `For the activity "${activityName}", generate detailed information including:
    1. 3 tutorial/guide recommendations with titles, descriptions, and video URLs
    2. 4 essential equipment items with names, descriptions, and approximate prices
    3. 3 alternative activities that someone might also enjoy
    Format as JSON with this structure:
    {
      "tutorials": [{"title": "", "description": "", "url": ""}],
      "equipment": [{"name": "", "description": "", "price": "", "affiliateUrl": ""}],
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
        max_tokens: 2000
      }),
    });

    if (!gptResponse.ok) {
      throw new Error('Failed to generate detailed information');
    }

    const gptData = await gptResponse.json();
    const detailedInfo = JSON.parse(gptData.choices[0].message.content);

    // Add affiliate links to equipment (mock implementation)
    detailedInfo.equipment = detailedInfo.equipment.map((item: any) => ({
      ...item,
      affiliateUrl: `https://amazon.com/s?k=${encodeURIComponent(item.name)}&tag=${amazonAffiliateKey}`,
    }));

    // If location data is needed, fetch from Google Places API
    if (req.headers.get('x-location-enabled') === 'true') {
      const locationResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(activityName)}&key=${googlePlacesApiKey}`
      );
      
      if (locationResponse.ok) {
        const locationData = await locationResponse.json();
        detailedInfo.locations = locationData.results.slice(0, 3).map((place: any) => ({
          name: place.name,
          description: place.formatted_address,
          address: place.formatted_address,
          rating: place.rating || 0,
        }));
      }
    }

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