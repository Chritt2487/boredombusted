import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const IMAGE_CACHE_KEY = 'activity_images_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const FALLBACK_IMAGES = {
  outdoor: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  indoor: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27",
  creative: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
  social: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6",
  default: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe"
};

interface CachedImage {
  url: string;
  timestamp: number;
  isFallback?: boolean;
}

interface ImageCache {
  [key: string]: CachedImage;
}

const getImageCache = (): ImageCache => {
  try {
    const cache = localStorage.getItem(IMAGE_CACHE_KEY);
    return cache ? JSON.parse(cache) : {};
  } catch (error) {
    console.error('Error reading image cache:', error);
    return {};
  }
};

const setImageCache = (cache: ImageCache) => {
  try {
    localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error setting image cache:', error);
  }
};

const getFallbackImage = (activityName: string): string => {
  const outdoorKeywords = ['hiking', 'garden', 'outdoor', 'nature', 'park'];
  const indoorKeywords = ['reading', 'cooking', 'indoor', 'home'];
  const creativeKeywords = ['art', 'craft', 'paint', 'create', 'music'];
  const socialKeywords = ['party', 'group', 'social', 'meet', 'community'];

  const lowerActivity = activityName.toLowerCase();

  if (outdoorKeywords.some(keyword => lowerActivity.includes(keyword))) {
    return FALLBACK_IMAGES.outdoor;
  }
  if (indoorKeywords.some(keyword => lowerActivity.includes(keyword))) {
    return FALLBACK_IMAGES.indoor;
  }
  if (creativeKeywords.some(keyword => lowerActivity.includes(keyword))) {
    return FALLBACK_IMAGES.creative;
  }
  if (socialKeywords.some(keyword => lowerActivity.includes(keyword))) {
    return FALLBACK_IMAGES.social;
  }

  return FALLBACK_IMAGES.default;
};

export function useActivityImage(activityName: string, initialImageUrl: string) {
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const generateImage = async () => {
      if (!initialImageUrl || initialImageUrl === "/placeholder.svg") {
        setIsLoading(true);
        
        try {
          // Check cache first
          const cache = getImageCache();
          const cachedImage = cache[activityName];
          
          if (cachedImage && Date.now() - cachedImage.timestamp < CACHE_DURATION) {
            console.log(`Using cached image for ${activityName}`);
            setImageUrl(cachedImage.url);
            setIsFallback(!!cachedImage.isFallback);
            return;
          }

          console.log(`Fetching image for ${activityName} from database`);
          const { data: existingImage, error: fetchError } = await supabase
            .from('activity_images')
            .select('image_url')
            .eq('activity_name', activityName)
            .maybeSingle();

          if (fetchError) {
            console.error("Error fetching image:", fetchError);
            throw fetchError;
          }

          if (existingImage) {
            console.log(`Found existing image for ${activityName}`);
            setImageUrl(existingImage.image_url);
            // Update cache
            const newCache = { 
              ...getImageCache(), 
              [activityName]: { 
                url: existingImage.image_url, 
                timestamp: Date.now(),
                isFallback: false
              } 
            };
            setImageCache(newCache);
          } else {
            console.log(`Generating new image for ${activityName}`);
            const { data, error } = await supabase.functions.invoke('generate-activity-image', {
              body: { activityName }
            });

            if (error || !data?.image) {
              console.error("Error generating image:", error);
              const fallbackUrl = getFallbackImage(activityName);
              setImageUrl(fallbackUrl);
              setIsFallback(true);
              
              // Cache the fallback image
              const newCache = { 
                ...getImageCache(), 
                [activityName]: { 
                  url: fallbackUrl, 
                  timestamp: Date.now(),
                  isFallback: true
                } 
              };
              setImageCache(newCache);
              return;
            }

            console.log(`Successfully generated image for ${activityName}`);
            console.log('Image source:', data.source);
            console.log('Is fallback:', data.isFallback);

            const { error: insertError } = await supabase
              .from('activity_images')
              .insert([
                { activity_name: activityName, image_url: data.image }
              ]);

            if (insertError) {
              console.error("Error storing image URL:", insertError);
              throw insertError;
            }

            setImageUrl(data.image);
            setIsFallback(data.isFallback);
            
            // Update cache
            const newCache = { 
              ...getImageCache(), 
              [activityName]: { 
                url: data.image, 
                timestamp: Date.now(),
                isFallback: data.isFallback
              } 
            };
            setImageCache(newCache);
          }
        } catch (error) {
          console.error("Error in image generation process:", error);
          const fallbackUrl = getFallbackImage(activityName);
          setImageUrl(fallbackUrl);
          setIsFallback(true);
          setError(error as Error);
          
          // Cache the fallback image
          const newCache = { 
            ...getImageCache(), 
            [activityName]: { 
              url: fallbackUrl, 
              timestamp: Date.now(),
              isFallback: true
            } 
          };
          setImageCache(newCache);
        } finally {
          setIsLoading(false);
        }
      }
    };

    generateImage();
  }, [activityName, initialImageUrl]);

  return { imageUrl, isLoading, error, isFallback };
}