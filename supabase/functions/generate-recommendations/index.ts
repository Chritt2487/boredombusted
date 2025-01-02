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
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const { answers } = await req.json();
    console.log('Processing answers:', answers);
    
    const prompt = `Based on these preferences:
    - Main interest: ${answers.initialChoice}
    - Environment: ${answers.environment}
    - Activity Level: ${answers.activityLevel}
    - Time Commitment: ${answers.timeCommitment}
    - Budget: ${answers.budget}
    - Social Setting: ${answers.social}

    Generate 4 activity recommendations. Return ONLY a JSON object with this exact structure, no markdown or additional text:
    {
      "activities": [
        {
          "name": "Activity Name",
          "description": "Activity description (2-3 sentences)",
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
        model: 'gpt-4',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert activity recommendation system. Return ONLY valid JSON with no markdown formatting.' 
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
      throw new Error(`OpenAI API error: ${gptResponse.status} ${errorText}`);
    }

    const gptData = await gptResponse.json();
    console.log('Received GPT response:', gptData);
    
    if (!gptData.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI');
    }

    // Clean the response content and parse JSON
    const cleanContent = gptData.choices[0].message.content.trim()
      .replace(/```json\n?|\n?```/g, '') // Remove any markdown code blocks
      .replace(/^\s*\n/gm, ''); // Remove empty lines

    console.log('Cleaned content:', cleanContent);
    
    try {
      const recommendations = JSON.parse(cleanContent);

      // Add placeholder images
      const activitiesWithImages = recommendations.activities.map((activity: any) => ({
        ...activity,
        imageUrl: '/placeholder.svg',
      }));

      return new Response(
        JSON.stringify({ activities: activitiesWithImages }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      console.error('Content that failed to parse:', cleanContent);
      throw new Error(`Failed to parse OpenAI response: ${parseError.message}`);
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate recommendations',
        details: error.message 
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