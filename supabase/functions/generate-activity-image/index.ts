import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { activityName } = await req.json();
    console.log('Generating image for activity:', activityName);

    const pixabayKey = Deno.env.get('PIXABAY_API_KEY');
    if (!pixabayKey) {
      throw new Error('Pixabay API key not configured');
    }

    // Create a search query based on the activity name
    const searchQuery = encodeURIComponent(`${activityName} activity lifestyle`);
    
    // Make request to Pixabay API
    const response = await fetch(
      `https://pixabay.com/api/?key=${pixabayKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=3`
    );

    if (!response.ok) {
      throw new Error(`Pixabay API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received Pixabay response:', data);

    if (!data.hits || data.hits.length === 0) {
      throw new Error('No images found');
    }

    // Get a random image from the first 3 results
    const randomIndex = Math.floor(Math.random() * Math.min(3, data.hits.length));
    const selectedImage = data.hits[randomIndex];

    return new Response(
      JSON.stringify({ 
        image: selectedImage.largeImageURL,
        source: 'pixabay',
        sourceUrl: selectedImage.pageURL
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error generating image:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate image', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
})