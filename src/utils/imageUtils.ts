export interface CachedImage {
  url: string;
  timestamp: number;
  isFallback?: boolean;
}

export interface ImageCache {
  [key: string]: CachedImage;
}

export const IMAGE_CACHE_KEY = 'activity_images_cache';
export const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const ACTIVITY_CATEGORIES = {
  OUTDOOR: ['hiking', 'garden', 'outdoor', 'nature', 'park'],
  INDOOR: ['reading', 'cooking', 'indoor', 'home'],
  CREATIVE: ['art', 'craft', 'paint', 'create', 'music'],
  SOCIAL: ['party', 'group', 'social', 'meet', 'community'],
} as const;

export const FALLBACK_IMAGES = {
  outdoor: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  indoor: "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27",
  creative: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
  social: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6",
  default: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe"
};

export const getImageCache = (): ImageCache => {
  try {
    const cache = localStorage.getItem(IMAGE_CACHE_KEY);
    return cache ? JSON.parse(cache) : {};
  } catch (error) {
    console.error('Error reading image cache:', error);
    return {};
  }
};

export const setImageCache = (cache: ImageCache) => {
  try {
    localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error setting image cache:', error);
  }
};

export const getFallbackImage = (activityName: string): string => {
  const lowerActivity = activityName.toLowerCase();
  
  for (const [category, keywords] of Object.entries(ACTIVITY_CATEGORIES)) {
    if (keywords.some(keyword => lowerActivity.includes(keyword))) {
      return FALLBACK_IMAGES[category.toLowerCase() as keyof typeof FALLBACK_IMAGES];
    }
  }
  
  return FALLBACK_IMAGES.default;
};