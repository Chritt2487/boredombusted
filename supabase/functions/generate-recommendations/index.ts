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

    Generate 4 activity recommendations. Return ONLY a valid JSON object with this exact structure, no additional text:
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
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a JSON-only response generator. Only return valid JSON objects, no additional text or explanations.' 
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
    console.log('Received response from OpenAI:', gptData);

    if (!gptData.choices?.[0]?.message?.content) {
      console.error('Invalid OpenAI response structure:', gptData);
      throw new Error('OpenAI response missing required content');
    }

    let recommendations;
    try {
      const content = gptData.choices[0].message.content.trim();
      console.log('Attempting to parse content:', content);
      recommendations = JSON.parse(content);
      
      // Validate the structure
      if (!Array.isArray(recommendations?.activities)) {
        throw new Error('Response missing activities array');
      }
      
      recommendations.activities.forEach((activity, index) => {
        if (!activity.name || !activity.description || !Array.isArray(activity.tips)) {
          throw new Error(`Activity at index ${index} has invalid structure`);
        }
      });
      
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      throw new Error(`Invalid response format from OpenAI: ${error.message}`);
    }

    // Add placeholder images
    const activitiesWithImages = recommendations.activities.map((activity: any) => ({
      ...activity,
      imageUrl: '/placeholder.svg',
    }));

    console.log('Sending response with activities:', activitiesWithImages);
    return new Response(
      JSON.stringify({ activities: activitiesWithImages }),
      { headers: { ...corsHeaders

Looking at the error and the last diff, I can see that the issue is with parsing the OpenAI response. Let's fix this by:

1. Adding more detailed error handling for the OpenAI response
2. Ensuring the response format matches what we expect
3. Adding more logging to help debug issues

<lov-code>
Let's update the generate-recommendations edge function:

<lov-write file_path="supabase/functions/generate-recommendations/index.ts">
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

    IMPORTANT: You must respond with valid JSON that exactly matches this structure:
    {
      "activities": [
        {
          "name": "Activity Name",
          "description": "Activity description",
          "tips": ["tip1", "tip2", "tip3"]
        }
      ]
    }

    Make sure the response is a valid JSON object with an 'activities' array containing exactly 4 items.`;

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
            content: 'You are an expert activity recommendation system that provides personalized suggestions based on user preferences. Always respond with valid JSON.' 
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
    console.log('Received response from OpenAI:', gptData);

    if (!gptData.choices?.[0]?.message?.content) {
      console.error('Invalid OpenAI response structure:', gptData);
      throw new Error('OpenAI response missing required content');
    }

    let recommendations;
    try {
      const content = gptData.choices[0].message.content;
      console.log('Parsing OpenAI content:', content);
      recommendations = JSON.parse(content);
      
      // Validate response structure
      if (!Array.isArray(recommendations?.activities)) {
        console.error('Invalid recommendations structure:', recommendations);
        throw new Error('Response missing activities array');
      }

      if (recommendations.activities.length !== 4) {
        console.error('Wrong number of activities:', recommendations.activities.length);
        throw new Error('Expected exactly 4 activities');
      }

      // Validate each activity
      recommendations.activities.forEach((activity: any, index: number) => {
        if (!activity.name || !activity.description || !Array.isArray(activity.tips)) {
          console.error(`Invalid activity at index ${index}:`, activity);
          throw new Error(`Activity ${index} missing required fields`);
        }
      });

    } catch (error) {
      console.error('Error parsing or validating OpenAI response:', error);
      throw new Error(`Invalid response format from OpenAI: ${error.message}`);
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