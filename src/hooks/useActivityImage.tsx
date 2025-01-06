import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getImageCache, setImageCache, getFallbackImage } from "@/utils/imageUtils";

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
          
          if (cachedImage && Date.now() - cachedImage.timestamp < 24 * 60 * 60 * 1000) {
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

          if (fetchError) throw fetchError;

          if (existingImage) {
            console.log(`Found existing image for ${activityName}`);
            setImageUrl(existingImage.image_url);
            setImageCache({ 
              ...getImageCache(), 
              [activityName]: { 
                url: existingImage.image_url, 
                timestamp: Date.now(),
                isFallback: false
              } 
            });
          } else {
            console.log(`Generating new image for ${activityName}`);
            const { data, error } = await supabase.functions.invoke('generate-activity-image', {
              body: { activityName }
            });

            if (error || !data?.image) {
              throw error || new Error('No image generated');
            }

            console.log(`Successfully generated image for ${activityName}`);
            
            await supabase
              .from('activity_images')
              .insert([
                { activity_name: activityName, image_url: data.image }
              ]);

            setImageUrl(data.image);
            setIsFallback(data.isFallback);
            
            setImageCache({ 
              ...getImageCache(), 
              [activityName]: { 
                url: data.image, 
                timestamp: Date.now(),
                isFallback: data.isFallback
              } 
            });
          }
        } catch (error) {
          console.error("Error in image generation process:", error);
          const fallbackUrl = getFallbackImage(activityName);
          setImageUrl(fallbackUrl);
          setIsFallback(true);
          setError(error as Error);
          
          setImageCache({ 
            ...getImageCache(), 
            [activityName]: { 
              url: fallbackUrl, 
              timestamp: Date.now(),
              isFallback: true
            } 
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    generateImage();
  }, [activityName, initialImageUrl]);

  return { imageUrl, isLoading, error, isFallback };
}