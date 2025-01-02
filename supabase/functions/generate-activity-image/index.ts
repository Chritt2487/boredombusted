import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { activityName } = await req.json()
    
    if (!activityName) {
      throw new Error('Activity name is required')
    }

    console.log('Generating image for activity:', activityName)

    const apiKey = Deno.env.get('OPENAI_API_KEY')
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set')
      throw new Error('OpenAI API key is not configured')
    }

    // Enhanced prompt engineering for better image generation
    const promptKeywords = {
      "Nature Journaling": "person sketching in nature journal outdoors, surrounded by trees and wildlife",
      "Birdwatching": "person with binoculars watching birds in nature, professional wildlife photography",
      "Stargazing": "person using telescope at night under clear starry sky",
      "Photography Walks": "person taking photos with professional camera in scenic natural location",
      "Hiking": "person hiking on scenic mountain trail with backpack",
      "Picnicking in the Park": "scenic picnic setup in lush green park with blanket and basket",
      "Geocaching": "person using GPS device searching for geocache in nature",
      "Outdoor Yoga": "person doing yoga pose in beautiful outdoor setting",
      "Digital Drawing": "person using digital drawing tablet and stylus, creating digital art",
      "Cooking": "person cooking in modern kitchen with fresh ingredients",
      // Default case
      "default": "person enjoying outdoor recreational activity in nature"
    }

    const promptBase = promptKeywords[activityName] || promptKeywords.default
    const prompt = `High-quality, realistic photograph of ${promptBase}. Style: Professional photography, natural lighting, clear focus on the activity. 4K quality, documentary style.`

    console.log('Using prompt:', prompt)

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
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenAI API error:', errorData)
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    console.log('Successfully generated image')

    return new Response(
      JSON.stringify({ image: data.data[0].url }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error in generate-activity-image function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to generate image'
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 500
      }
    )
  }
})