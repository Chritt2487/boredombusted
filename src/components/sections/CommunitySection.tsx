import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface CommunitySectionProps {
  community: {
    groups: {
      name: string;
      description: string;
      link: string;
    }[];
    events: {
      name: string;
      description: string;
      date?: string;
    }[];
    hashtags: string[];
  };
}

export default function CommunitySection({ community }: CommunitySectionProps) {
  const [zipcode, setZipcode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!zipcode.match(/^\d{5}$/)) {
      toast({
        title: "Invalid Zipcode",
        description: "Please enter a valid 5-digit zipcode",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.example.com/search?zipcode=${zipcode}`);
      // Implementation for actual API call would go here
      toast({
        title: "Coming Soon",
        description: "Location-based search will be available soon!",
      });
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <Users className="mr-2" /> Community & Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter zipcode to find nearby activities"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            className="max-w-[200px]"
          />
          <Button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
          >
            Search
          </Button>
        </div>

        <div className="grid gap-4">
          {community.groups.map((group, index) => (
            <div key={index} className="p-4 rounded-lg bg-[#F1F0FB]">
              <h3 className="font-semibold text-[#7E69AB]">{group.name}</h3>
              <p className="text-gray-600 mb-2">{group.description}</p>
              <a 
                href={group.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#9b87f5] hover:text-[#7E69AB]"
              >
                Join Group →
              </a>
            </div>
          ))}
        </div>

        {community.events.length > 0 && (
          <div className="grid gap-4">
            <h3 className="font-semibold text-[#7E69AB]">Upcoming Events</h3>
            {community.events.map((event, index) => (
              <div key={index} className="p-4 rounded-lg bg-[#F1F0FB]">
                <h4 className="font-semibold text-[#7E69AB]">{event.name}</h4>
                <p className="text-gray-600">{event.description}</p>
                {event.date && (
                  <p className="text-sm text-gray-500 mt-2">{event.date}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}