import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204,
    });
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

    const prompt = `Generate detailed information about the activity "${activityName}" including required, recommended, and optional equipment. Format the response in this JSON structure:
    {
      "equipment": [
        {
          "name": "string",
          "description": "string",
          "price": "string (e.g. $20-30)",
          "category": "required | recommended | optional"
        }
      ],
      "difficulty": "string",
      "timeCommitment": "string",
      "costEstimate": "string",
      "history": "string",
      "gettingStarted": {
        "steps": ["string"],
        "beginnerTips": ["string"]
      },
      "benefits": {
        "skills": ["string"],
        "health": ["string"],
        "funFacts": ["string"]
      }
    }
    
    Include at least 2-3 items for each equipment category. Make the content engaging and informative.`;

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
      const errorText = await gptResponse.text();
      console.error("OpenAI API error:", errorText);
      throw new Error('Failed to generate detailed information from OpenAI');
    }

    const gptData = await gptResponse.json();
    console.log("Received response from OpenAI");
    
    let detailedInfo;
    try {
      detailedInfo = JSON.parse(gptData.choices[0].message.content);
      
      // Add affiliate links to equipment
      detailedInfo.equipment = detailedInfo.equipment.map((item: any) => ({
        ...item,
        affiliateUrl: `https://amazon.com/s?k=${encodeURIComponent(item.name)}&tag=${Deno.env.get('AMAZON_AFFILIATE_KEY') || 'default-tag'}`,
      }));

    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      throw new Error('Invalid response format from OpenAI');
    }

    return new Response(
      JSON.stringify(detailedInfo),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in get-activity-details:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate detailed information',
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});