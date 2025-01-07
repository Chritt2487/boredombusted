import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useActivityCategories(activityName: string) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      console.log('Fetching categories for activity:', activityName);
      const { data, error } = await supabase
        .from('activity_categories')
        .select('category')
        .eq('activity_name', activityName);
      
      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      if (data) {
        const categoryList = data.map(item => item.category);
        console.log('Retrieved categories:', categoryList);
        setCategories(categoryList);
      }
    };

    fetchCategories();
  }, [activityName]);

  return categories;
}