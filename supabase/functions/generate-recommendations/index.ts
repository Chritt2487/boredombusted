import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateOpenAIResponse } from "./openai.ts";
import { corsHeaders, generatePrompt, validateActivities, applyWeightedParameters } from "./utils.ts";
import type { UserAnswers, RecommendationsResponse } from "./types.ts";

const openAIApiKey = Deno.env.get('Open_AI_2');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      }
    });
  }

  try {
    if (!openAIApiKey) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is not configured');
    }

    if (req.method !== 'POST') {
      throw new Error(`HTTP method ${req.method} is not allowed`);
    }

    const { answers, existingActivities = [] } = await req.json() as { 
      answers: UserAnswers;
      existingActivities?: string[];
    };

    console.log('Processing request with answers:', answers);
    console.log('Existing activities:', existingActivities);
    
    // Apply weighted parameters to introduce variability
    const weightedAnswers = applyWeightedParameters(answers);
    console.log('Weighted answers:', weightedAnswers);

    // Generate multiple prompts with different temperatures
    const temperatures = [0.7, 0.85, 1.0];
    const allResponses: RecommendationsResponse[] = [];

    for (const temperature of temperatures) {
      const prompt = generatePrompt(weightedAnswers, existingActivities);
      console.log(`Generating response with temperature ${temperature}`);
      
      try {
        const gptData = await generateOpenAIResponse(openAIApiKey, prompt, temperature);
        console.log(`Received GPT response for temperature ${temperature}:`, gptData);
        
        if (!gptData.choices?.[0]?.message?.content) {
          console.error('Invalid OpenAI response structure:', gptData);
          continue;
        }

        const content = gptData.choices[0].message.content.trim();
        console.log('Parsing OpenAI response:', content);
        const recommendations = JSON.parse(content);
        validateActivities(recommendations.activities);
        allResponses.push(recommendations);
      } catch (error) {
        console.error(`Error with temperature ${temperature}:`, error);
        continue;
      }
    }

    if (allResponses.length === 0) {
      throw new Error('Failed to generate valid recommendations with any temperature');
    }

    // Randomly select activities from all valid responses
    const selectedResponse = allResponses[Math.floor(Math.random() * allResponses.length)];
    
    // Add placeholder images
    const activitiesWithImages = selectedResponse.activities.map(activity => ({
      ...activity,
      imageUrl: '/placeholder.svg',
    }));

    console.log('Sending successful response with activities:', activitiesWithImages);
    return new Response(
      JSON.stringify({ activities: activitiesWithImages }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        } 
      }
    );
  } catch (error) {
    console.error('Error in generate-recommendations:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate recommendations',
        details: error.message,
        timestamp: new Date().toISOString(),
      }),
      { 
        status: error.status || 500, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        } 
      }
    );
  }
});