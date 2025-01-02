import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers } = await req.json();
    
    // Create a detailed prompt based on user answers
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
    4. A detailed image prompt for DALL-E to generate a representative image

    Format the response as a JSON array with this structure:
    {
      "activities": [
        {
          "name": "Activity Name",
          "description": "Activity description",
          "tips": ["tip1", "tip2", "tip3"],
          "imagePrompt": "Detailed image generation prompt"
        }
      ]
    }`;

    // Get activity recommendations from GPT
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
      }),
    });

    const gptData = await gptResponse.json();
    const recommendations = JSON.parse(gptData.choices[0].message.content);

    // Generate images for each activity
    const activitiesWithImages = await Promise.all(
      recommendations.activities.map(async (activity: any) => {
        const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: activity.imagePrompt,
            n: 1,
            size: "1024x1024",
          }),
        });

        const imageData = await imageResponse.json();
        return {
          ...activity,
          imageUrl: imageData.data[0].url,
        };
      })
    );

    return new Response(
      JSON.stringify({ activities: activitiesWithImages }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate recommendations' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});