import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

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
  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <Users className="mr-2" /> Community & Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <div className="p-4 rounded-lg bg-[#F1F0FB]">
          <h3 className="font-semibold text-[#7E69AB] mb-2">Popular Hashtags</h3>
          <div className="flex flex-wrap gap-2">
            {community.hashtags.map((hashtag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-[#E5DEFF] rounded-full text-[#7E69AB] text-sm"
              >
                #{hashtag}
              </span>
            ))}
          </div>
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