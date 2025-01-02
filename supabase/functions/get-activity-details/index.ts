import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const defaultActivity = {
  equipment: [
    {
      name: "Basic Art Supplies",
      description: "A starter set of art supplies for beginners",
      price: "$20-30",
      affiliateUrl: "https://amazon.com/s?k=art+supplies+set"
    }
  ],
  locations: [
    {
      name: "Local Community Center",
      description: "Many community centers offer art classes and workspace",
      address: "Check your local community center",
      rating: 4.5
    }
  ],
  alternatives: [
    {
      name: "Digital Art",
      description: "Create art using digital tools and software"
    }
  ],
  difficulty: "Beginner",
  timeCommitment: "1-2 hours per session",
  costEstimate: "$50-100 to start",
  history: "Art has been a form of human expression for thousands of years",
  gettingStarted: {
    steps: ["Gather basic supplies", "Start with simple exercises", "Practice regularly"],
    beginnerTips: ["Don't aim for perfection", "Learn basic techniques first", "Join a community"]
  },
  benefits: {
    skills: ["Creativity", "Hand-eye coordination", "Patience"],
    health: ["Stress relief", "Improved focus", "Self-expression"]
  },
  variations: ["Sketching", "Painting", "Mixed media"],
  pairingActivities: ["Photography", "Crafting", "Meditation"]
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

    const { activityName, isRandom } = await req.json();
    console.log("Processing request for activity:", activityName, "isRandom:", isRandom);
    
    if (!activityName) {
      throw new Error('Activity name is required');
    }

    // If isRandom is true, return a modified version of the default activity
    if (isRandom) {
      console.log("Returning random activity");
      return new Response(
        JSON.stringify({
          ...defaultActivity,
          name: "Random Creative Activity",
          description: "A fun and engaging creative activity to try"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
        model: 'gpt-4',
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