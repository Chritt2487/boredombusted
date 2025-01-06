import { Loader2, ImageOff } from "lucide-react";
import { useActivityImage } from "@/hooks/useActivityImage";

interface ActivityImageProps {
  name: string;
  imageUrl: string;
}

export default function ActivityImage({ name, imageUrl }: ActivityImageProps) {
  const { imageUrl: resolvedImageUrl, isLoading, isFallback } = useActivityImage(name, imageUrl);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
      </div>
    );
  }

  const fallbackUrl = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2940&auto=format&fit=crop";

  return (
    <div className="relative w-full h-full">
      <img
        src={resolvedImageUrl || fallbackUrl}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          console.error(`Error loading image for ${name}, falling back to nature placeholder`);
          e.currentTarget.src = fallbackUrl;
          e.currentTarget.classList.add("opacity-80");
        }}
      />
      {(isFallback || !resolvedImageUrl) && (
        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
          <ImageOff className="w-3 h-3" />
          <span>Generic Image</span>
        </div>
      )}
    </div>
  );
}