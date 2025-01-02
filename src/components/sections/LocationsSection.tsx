import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface LocationsSectionProps {
  locations: {
    name: string;
    description: string;
    address: string;
    rating: number;
  }[];
}

export default function LocationsSection({ locations }: LocationsSectionProps) {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  if (!userLocation) {
    return null;
  }

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <MapPin className="mr-2" /> Nearby Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {locations.map((location, index) => (
          <div key={index} className="p-4 rounded-lg bg-[#F1F0FB]">
            <h3 className="font-semibold text-[#7E69AB]">{location.name}</h3>
            <p className="text-gray-600 mb-2">{location.description}</p>
            <p className="text-sm text-gray-500">{location.address}</p>
            <div className="mt-2 flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-gray-600">{location.rating.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}