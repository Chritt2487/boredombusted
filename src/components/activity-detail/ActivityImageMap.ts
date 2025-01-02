export const getActivityImage = (activityName: string) => {
  const imageMap: { [key: string]: string } = {
    "Nature Journaling": "https://images.unsplash.com/photo-1517971053567-8bde93bc6a58?q=80&w=2946&auto=format&fit=crop",
    "Birdwatching": "https://images.unsplash.com/photo-1621631187029-c1e8f11f9c42?q=80&w=2940&auto=format&fit=crop",
    "Stargazing": "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2940&auto=format&fit=crop",
    "Photography Walks": "https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=2936&auto=format&fit=crop",
    "Hiking": "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2940&auto=format&fit=crop",
    "Picnicking in the Park": "https://images.unsplash.com/photo-1526307616774-60d0098f7642?q=80&w=2940&auto=format&fit=crop",
    "Geocaching": "https://images.unsplash.com/photo-1578674473215-9f63c76c6fe4?q=80&w=2940&auto=format&fit=crop",
    "Outdoor Yoga": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2940&auto=format&fit=crop",
    "default": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2940&auto=format&fit=crop"
  };
  
  return imageMap[activityName] || imageMap.default;
};