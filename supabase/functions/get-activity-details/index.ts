import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
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
    const { activityName, userLocation } = await req.json();
    console.log('Processing request for activity:', activityName);
    console.log('User location data:', userLocation);

    // Generate image using DALL-E
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `A high-quality, realistic image of people enjoying ${activityName}. The image should be well-lit, engaging, and showcase the activity in an appealing way.`,
        n: 1,
        size: "1024x1024",
      }),
    });

    const imageData = await imageResponse.json();
    const imageUrl = imageData.data[0].url;

    // Only fetch locations if we have valid user location data
    let locations = [];
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      console.log('Fetching nearby locations...');
      const placesResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
        `location=${userLocation.latitude},${userLocation.longitude}&` +
        `radius=5000&` +
        `keyword=${encodeURIComponent(activityName)}&` +
        `key=${googlePlacesApiKey}`
      );

      const placesData = await placesResponse.json();
      locations = placesData.results.slice(0, 3).map((place: any) => ({
        name: place.name,
        description: place.vicinity,
        address: place.formatted_address || place.vicinity,
        rating: place.rating || 4.0,
      }));
    } else {
      console.log('No user location provided, skipping location search');
    }

    // Generate activity details using GPT-4
    const prompt = `Generate concise information about the activity "${activityName}". Return ONLY a JSON object with no markdown formatting or additional text. Make descriptions brief and focused. The JSON should follow this structure:
    {
      "difficulty": "One short sentence about difficulty level",
      "timeCommitment": "One short sentence about time needed",
      "costEstimate": "One short sentence about costs",
      "equipment": [
        {
          "name": "Item name",
          "description": "Brief description",
          "price": "Price range",
          "category": "required/recommended/professional"
        }
      ],
      "benefits": {
        "skills": ["List specific skills"],
        "health": ["List health benefits"],
        "social": ["List social advantages"]
      },
      "alternatives": [
        {
          "name": "Similar activity name",
          "description": "Why it's a good alternative"
        }
      ]
    }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert activity recommendation system. Provide concise, practical information about activities and hobbies.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const detailedInfo = JSON.parse(data.choices[0].message.content.trim());

    // Add the generated image and locations to the response
    const fullResponse = {
      ...detailedInfo,
      imageUrl,
      locations: locations.length > 0 ? locations : undefined,
    };

    return new Response(
      JSON.stringify(fullResponse),
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