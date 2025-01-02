import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, ShoppingBag, PlayCircle, Lightbulb } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ActivityDetailProps {
  activity: {
    name: string;
    description: string;
    imageUrl: string;
    tips: string[];
  };
  onBack: () => void;
}

interface DetailedActivity {
  tutorials: {
    title: string;
    url: string;
    description: string;
  }[];
  equipment: {
    name: string;
    description: string;
    affiliateUrl: string;
    price: string;
  }[];
  locations?: {
    name: string;
    description: string;
    address: string;
    rating: number;
  }[];
  alternatives: {
    name: string;
    description: string;
  }[];
}

export default function ActivityDetail({ activity, onBack }: ActivityDetailProps) {
  const [detailedInfo, setDetailedInfo] = useState<DetailedActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDetailedInfo = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-activity-details', {
          body: { activityName: activity.name }
        });

        if (error) throw error;
        
        console.log("Received detailed info:", data);
        setDetailedInfo(data);
      } catch (error) {
        console.error("Error fetching detailed info:", error);
        toast({
          title: "Error",
          description: "Failed to load detailed information. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedInfo();
  }, [activity.name, toast]);

  return (
    <div className="space-y-8">
      <Button 
        onClick={onBack}
        variant="ghost" 
        className="mb-4 text-[#7E69AB] hover:text-[#9b87f5]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
      </Button>

      {/* Hero Section */}
      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src={activity.imageUrl}
          alt={activity.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">
          {activity.name}
        </h1>
      </div>

      {/* Description */}
      <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            {activity.description}
          </p>
        </CardContent>
      </Card>

      {/* Tutorials Section */}
      <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-[#7E69AB]">
            <PlayCircle className="mr-2" /> Tutorials & Guides
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {detailedInfo?.tutorials.map((tutorial, index) => (
            <div key={index} className="p-4 rounded-lg bg-[#F1F0FB] hover:bg-[#E5DEFF] transition-colors">
              <h3 className="font-semibold text-[#7E69AB] mb-2">{tutorial.title}</h3>
              <p className="text-gray-600 mb-3">{tutorial.description}</p>
              <Button 
                onClick={() => window.open(tutorial.url, '_blank')}
                className="bg-[#9b87f5] hover:bg-[#7E69AB]"
              >
                Watch Tutorial
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Equipment Section */}
      <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-[#7E69AB]">
            <ShoppingBag className="mr-2" /> Recommended Equipment
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {detailedInfo?.equipment.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-[#F1F0FB]">
              <div className="flex-grow">
                <h3 className="font-semibold text-[#7E69AB]">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-[#6E59A5] font-semibold">{item.price}</p>
              </div>
              <Button 
                onClick={() => window.open(item.affiliateUrl, '_blank')}
                className="bg-[#9b87f5] hover:bg-[#7E69AB]"
              >
                View on Amazon
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Locations Section */}
      {detailedInfo?.locations && (
        <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-[#7E69AB]">
              <MapPin className="mr-2" /> Nearby Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {detailedInfo.locations.map((location, index) => (
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
      )}

      {/* Alternative Activities */}
      <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-[#7E69AB]">
            <Lightbulb className="mr-2" /> You Might Also Like
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {detailedInfo?.alternatives.map((alt, index) => (
            <div key={index} className="p-4 rounded-lg bg-[#F1F0FB] hover:bg-[#E5DEFF] transition-colors">
              <h3 className="font-semibold text-[#7E69AB]">{alt.name}</h3>
              <p className="text-gray-600">{alt.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}