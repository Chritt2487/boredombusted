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
    const prompt = `Generate detailed information about the activity "${activityName}". Return ONLY a JSON object with no markdown formatting or additional text. The JSON should follow this structure:

    {
      "difficulty": "A clear difficulty level with explanation (use **bold** for key terms)",
      "timeCommitment": "Realistic time commitment including setup and practice time (use **bold** for key numbers and time periods)",
      "costEstimate": "Detailed cost breakdown including initial and ongoing expenses (use **bold** for prices and key terms)",
      "equipment": [
        {
          "name": "Specific item name",
          "description": "Detailed description of why this item is needed",
          "price": "Estimated price range",
          "category": "required/recommended/professional"
        }
      ],
      "locations": [
        {
          "name": "Location name",
          "description": "Brief description",
          "address": "General address or area",
          "rating": 4.5
        }
      ],
      "benefits": {
        "skills": ["List specific skills developed"],
        "health": ["List concrete health benefits"],
        "social": ["List social advantages"]
      },
      "community": {
        "groups": [
          {
            "name": "Group name",
            "description": "Brief description",
            "link": "Valid URL to join"
          }
        ],
        "events": [
          {
            "name": "Event name",
            "description": "Brief description",
            "date": "Upcoming or recurring schedule"
          }
        ]
      },
      "alternatives": [
        {
          "name": "Similar activity name",
          "description": "Why it's a good alternative"
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
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert activity recommendation system. Provide detailed, practical information about activities and hobbies. Return ONLY valid JSON with no markdown formatting.' 
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

    // Clean the response content to ensure it's valid JSON
    const cleanContent = data.choices[0].message.content.trim()
      .replace(/```json\n?|\n?```/g, '') // Remove any markdown code blocks
      .replace(/^\s*\n/gm, ''); // Remove empty lines

    console.log('Cleaned content:', cleanContent);
    
    try {
      const detailedInfo = JSON.parse(cleanContent);

      // Add affiliate links to equipment
      if (amazonAffiliateKey) {
        detailedInfo.equipment = detailedInfo.equipment.map((item: any) => ({
          ...item,
          affiliateUrl: `https://amazon.com/s?k=${encodeURIComponent(item.name)}&tag=${amazonAffiliateKey}`,
        }));
      }

      // Cache the results
      activityCache.set(activityName, detailedInfo);
      console.log("Caching new data for:", activityName);

      return new Response(
        JSON.stringify(detailedInfo),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      console.error('Content that failed to parse:', cleanContent);
      throw new Error(`Failed to parse OpenAI response: ${parseError.message}`);
    }
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
