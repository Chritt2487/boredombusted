import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useActivityImage(activityName: string, initialImageUrl: string) {
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generateImage = async () => {
      if (!initialImageUrl || initialImageUrl === "/placeholder.svg") {
        setIsLoading(true);
        try {
          // First check if we already have an image stored
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
            setImageUrl(existingImage.image_url);
          } else {
            // Generate new image if none exists
            const { data, error } = await supabase.functions.invoke('generate-activity-image', {
              body: { activityName }
            });

            if (error) {
              console.error("Error generating image:", error);
              throw error;
            }

            if (data?.image) {
              // Store the generated image URL
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
            }
          }
        } catch (error) {
          console.error("Error in image generation process:", error);
          setImageUrl("/placeholder.svg");
        } finally {
          setIsLoading(false);
        }
      }
    };

    generateImage();
  }, [activityName, initialImageUrl]);

  return { imageUrl, isLoading };
}