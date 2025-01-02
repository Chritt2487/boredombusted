import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateImageWithRetry(prompt: string, retryCount = 0): Promise<Response> {
  const apiKey = Deno.env.get('OPENAI_API_KEY');
  
  try {
    console.log(`Attempt ${retryCount + 1} - Generating image with prompt: ${prompt}`);
    
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url"
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Successfully generated image');
    
    return new Response(
      JSON.stringify({ image: data.data[0].url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(`Error in attempt ${retryCount + 1}:`, error);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying after ${RETRY_DELAY}ms...`);
      await sleep(RETRY_DELAY);
      return generateImageWithRetry(prompt, retryCount + 1);
    }
    
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { activityName } = await req.json();
    
    if (!activityName) {
      throw new Error('Activity name is required');
    }

    console.log('Generating image for activity:', activityName);

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set');
      throw new Error('OpenAI API key is not configured');
    }

    // Enhanced safe prompt engineering
    const safePrompts: { [key: string]: string } = {
      "Nature Journaling": "A peaceful outdoor scene with a sketchbook and colored pencils on a wooden surface, surrounded by natural elements",
      "Birdwatching": "A pair of binoculars and a bird guide book placed on a wooden railing, with blurred trees in background",
      "Stargazing": "A telescope set up in a clearing under a starry night sky, professional astronomy setup",
      "Photography Walks": "A professional camera on a tripod capturing a scenic natural landscape at golden hour",
      "Hiking": "A well-maintained hiking trail through a forest with sunlight filtering through trees",
      "Picnicking": "A classic picnic setup with a blanket and basket in a sunny park setting",
      "Geocaching": "A handheld GPS device and small treasure box in an outdoor setting",
      "Outdoor Yoga": "A yoga mat placed in a serene garden setting with morning light",
      "Digital Drawing": "A digital drawing tablet and stylus on a clean desk with art supplies",
      "Cooking": "A clean, modern kitchen counter with fresh ingredients and cooking utensils",
      // Default case is very neutral and safe
      "default": "A peaceful outdoor scene with natural lighting and soft focus"
    };

    const basePrompt = safePrompts[activityName] || safePrompts.default;
    const enhancedPrompt = `High-quality photograph: ${basePrompt}. Style: Professional photography, natural lighting, clear composition. No text or watermarks.`;

    console.log('Using enhanced prompt:', enhancedPrompt);

    return await generateImageWithRetry(enhancedPrompt);
  } catch (error) {
    console.error('Error in generate-activity-image function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to generate image'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
})