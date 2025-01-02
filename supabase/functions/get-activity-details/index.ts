import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request:", req.method);
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const { activityName } = await req.json();
    console.log("Processing request for activity:", activityName);
    
    if (!activityName) {
      throw new Error('Activity name is required');
    }

    const prompt = `Generate detailed information about the activity "${activityName}" in the following JSON format:
    {
      "equipment": [
        {
          "name": "string",
          "description": "string",
          "price": "string (e.g. $20-30)",
          "affiliateUrl": "string"
        }
      ],
      "locations": [
        {
          "name": "string",
          "description": "string",
          "address": "string",
          "rating": number
        }
      ],
      "alternatives": [
        {
          "name": "string",
          "description": "string"
        }
      ],
      "difficulty": "string (Beginner/Intermediate/Advanced)",
      "timeCommitment": "string",
      "costEstimate": "string",
      "history": "string",
      "gettingStarted": {
        "steps": ["string"],
        "beginnerTips": ["string"]
      },
      "benefits": {
        "skills": ["string"],
        "health": ["string"]
      },
      "variations": ["string"],
      "pairingActivities": ["string"]
    }
    
    Include 3-5 items for equipment, locations, and alternatives. Make the content engaging and informative.`;

    console.log("Sending request to OpenAI");
    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'You are an expert activity recommendation system that provides detailed, accurate information about various activities and hobbies.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    if (!gptResponse.ok) {
      console.error("OpenAI API error:", await gptResponse.text());
      throw new Error('Failed to generate detailed information from OpenAI');
    }

    const gptData = await gptResponse.json();
    console.log("Received response from OpenAI");
    
    let detailedInfo;
    try {
      detailedInfo = JSON.parse(gptData.choices[0].message.content);
      
      // Validate the response structure
      const requiredFields = [
        'equipment',
        'alternatives',
        'difficulty',
        'timeCommitment',
        'costEstimate',
        'history',
        'gettingStarted',
        'benefits',
        'variations',
        'pairingActivities'
      ];

      for (const field of requiredFields) {
        if (!detailedInfo[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      // Add affiliate links to equipment
      const amazonAffiliateKey = Deno.env.get('AMAZON_AFFILIATE_KEY');
      detailedInfo.equipment = detailedInfo.equipment.map((item: any) => ({
        ...item,
        affiliateUrl: `https://amazon.com/s?k=${encodeURIComponent(item.name)}&tag=${amazonAffiliateKey}`,
      }));

    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      throw new Error('Invalid response format from OpenAI');
    }

    return new Response(
      JSON.stringify(detailedInfo),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in get-activity-details:', error);
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