import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { generateOpenAIResponse } from "./openai.ts";
import { corsHeaders, generatePrompt, validateActivities, applyWeightedParameters } from "./utils.ts";
import type { UserAnswers, RecommendationsResponse } from "./types.ts";

const openAIApiKey = Deno.env.get('Open_AI_2');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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

    // Generate the prompt
    const prompt = generatePrompt(weightedAnswers, existingActivities);
    console.log('Generated prompt:', prompt);
      
    try {
      const recommendations = await generateOpenAIResponse(openAIApiKey, prompt, 0.85);
      console.log('Received recommendations:', recommendations);
      
      // Use less strict validation for random activities
      if (answers.isRandom) {
        console.log('Using less strict validation for random activities');
        if (!Array.isArray(recommendations.activities)) {
          throw new Error('Response missing activities array');
        }
      } else {
        validateActivities(recommendations.activities);
      }

      // Add placeholder images
      const activitiesWithImages = recommendations.activities.map(activity => ({
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
      console.error('Error generating recommendations:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in generate-recommendations:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate recommendations',
        details: error.message,
        timestamp: new Date().toISOString(),
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        } 
      }
    );
  }
});