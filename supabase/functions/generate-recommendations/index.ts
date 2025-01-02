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
    console.log('Starting generate-recommendations function');
    
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is not configured');
    }

    const { answers } = await req.json();
    console.log('Received answers:', answers);
    
    const prompt = `Based on these preferences:
    - Main interest: ${answers.initialChoice}
    - Environment: ${answers.environment}
    - Activity Level: ${answers.activityLevel}
    - Time Commitment: ${answers.timeCommitment}
    - Budget: ${answers.budget}
    - Social Setting: ${answers.social}

    Generate 4 activity recommendations. For each activity, provide:
    1. A name
    2. A detailed description (2-3 sentences)
    3. 3 quick tips for getting started

    Format the response as a JSON array with this structure:
    {
      "activities": [
        {
          "name": "Activity Name",
          "description": "Activity description",
          "tips": ["tip1", "tip2", "tip3"]
        }
      ]
    }`;

    console.log('Sending request to OpenAI');
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
            content: 'You are an expert activity recommendation system that provides personalized suggestions based on user preferences.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    if (!gptResponse.ok) {
      const errorText = await gptResponse.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const gptData = await gptResponse.json();
    console.log('Received response from OpenAI');

    let recommendations;
    try {
      recommendations = JSON.parse(gptData.choices[0].message.content);
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      throw new Error('Invalid response format from OpenAI');
    }

    // Add placeholder images
    const activitiesWithImages = recommendations.activities.map((activity: any) => ({
      ...activity,
      imageUrl: '/placeholder.svg',
    }));

    console.log('Sending response with activities:', activitiesWithImages);
    return new Response(
      JSON.stringify({ activities: activitiesWithImages }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-recommendations:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate recommendations',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});