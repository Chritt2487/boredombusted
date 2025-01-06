import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const FALLBACK_IMAGES = {
  outdoor: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  indoor: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27",
  creative: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
  social: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6",
  default: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe"
};

function getSearchKeywords(activityName: string): string[] {
  // Map of activity keywords to relevant search terms
  const keywordMap: { [key: string]: string[] } = {
    "meditation": ["meditation", "zen", "mindfulness", "peaceful"],
    "yoga": ["yoga", "exercise", "wellness", "stretching"],
    "hiking": ["hiking", "trail", "mountain", "nature walk"],
    "reading": ["library", "books", "reading nook", "bookstore"],
    "cooking": ["cooking", "kitchen", "culinary", "food preparation"],
    "gardening": ["garden", "plants", "gardening", "horticulture"],
    "painting": ["art studio", "painting", "canvas", "artist"],
    "photography": ["camera", "photography", "photographer", "photo shoot"],
    "dancing": ["dance studio", "dancing", "dancers", "dance class"],
    "music": ["musical instrument", "music", "musician", "concert"],
    // Add more mappings as needed
  };

  // Find matching keywords
  const words = activityName.toLowerCase().split(' ');
  for (const word of words) {
    if (keywordMap[word]) {
      return keywordMap[word];
    }
  }

  // If no specific mapping found, use the activity name plus some general terms
  return [activityName, "activity", "lifestyle", "hobby", "family-friendly"];
}

function getFallbackCategory(activityName: string): string {
  const outdoorActivities = ["hiking", "gardening", "photography", "nature"];
  const indoorActivities = ["reading", "cooking", "meditation", "yoga"];
  const creativeActivities = ["painting", "music", "crafts", "writing"];
  const socialActivities = ["dancing", "sports", "games", "club"];

  const lowerActivity = activityName.toLowerCase();

  if (outdoorActivities.some(activity => lowerActivity.includes(activity))) {
    return "outdoor";
  }
  if (indoorActivities.some(activity => lowerActivity.includes(activity))) {
    return "indoor";
  }
  if (creativeActivities.some(activity => lowerActivity.includes(activity))) {
    return "creative";
  }
  if (socialActivities.some(activity => lowerActivity.includes(activity))) {
    return "social";
  }

  return "default";
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

    // Get optimized search keywords
    const searchKeywords = getSearchKeywords(activityName);
    console.log('Using search keywords:', searchKeywords);

    // Add safety parameters to ensure family-friendly content
    const safetyParams = '&safesearch=true&category=activities,people,education,sports';

    // Try each keyword until we find a suitable image
    let imageFound = false;
    let selectedImage = null;

    for (const keyword of searchKeywords) {
      const searchQuery = encodeURIComponent(keyword + ' family friendly');
      const response = await fetch(
        `https://pixabay.com/api/?key=${pixabayKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&per_page=3${safetyParams}&min_width=800`
      );

      if (!response.ok) {
        console.error(`Pixabay API error for keyword ${keyword}:`, response.statusText);
        continue;
      }

      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        // Get a random image from the results
        selectedImage = data.hits[Math.floor(Math.random() * Math.min(3, data.hits.length))];
        imageFound = true;
        console.log('Found image using keyword:', keyword);
        break;
      }
    }

    if (!imageFound) {
      console.log('No suitable images found, using fallback');
      const category = getFallbackCategory(activityName);
      return new Response(
        JSON.stringify({ 
          image: FALLBACK_IMAGES[category],
          source: 'unsplash',
          isFallback: true
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        image: selectedImage.largeImageURL,
        source: 'pixabay',
        sourceUrl: selectedImage.pageURL,
        isFallback: false
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating image:', error);
    return new Response(
      JSON.stringify({ 
        image: FALLBACK_IMAGES.default,
        source: 'unsplash',
        isFallback: true,
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
})