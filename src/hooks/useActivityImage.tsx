import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const IMAGE_CACHE_KEY = 'activity_images_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedImage {
  url: string;
  timestamp: number;
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

export function useActivityImage(activityName: string, initialImageUrl: string) {
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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
            const newCache = { ...getImageCache(), [activityName]: { url: existingImage.image_url, timestamp: Date.now() } };
            setImageCache(newCache);
          } else {
            console.log(`Generating new image for ${activityName}`);
            const { data, error } = await supabase.functions.invoke('generate-activity-image', {
              body: { activityName }
            });

            if (error) {
              console.error("Error generating image:", error);
              throw error;
            }

            if (data?.image) {
              console.log(`Successfully generated image for ${activityName}`);
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
              // Update cache
              const newCache = { ...getImageCache(), [activityName]: { url: data.image, timestamp: Date.now() } };
              setImageCache(newCache);
            }
          }
        } catch (error) {
          console.error("Error in image generation process:", error);
          setError(error as Error);
          setImageUrl("/placeholder.svg");
        } finally {
          setIsLoading(false);
        }
      }
    };

    generateImage();
  }, [activityName, initialImageUrl]);

  return { imageUrl, isLoading, error };
}