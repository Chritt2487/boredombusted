import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Globe, MessageSquare } from "lucide-react";

interface Resource {
  name: string;
  url: string;
  description: string;
  type: 'subreddit' | 'website';
}

interface ResourcesSectionProps {
  activityName: string;
}

export default function ResourcesSection({ activityName }: ResourcesSectionProps) {
  const resources: Resource[] = [
    {
      name: `r/${activityName.toLowerCase().replace(/\s+/g, '')}`,
      url: `https://reddit.com/r/${activityName.toLowerCase().replace(/\s+/g, '')}`,
      description: `Main subreddit for ${activityName} enthusiasts`,
      type: 'subreddit'
    },
    {
      name: `r/begin${activityName.toLowerCase().replace(/\s+/g, '')}`,
      url: `https://reddit.com/r/begin${activityName.toLowerCase().replace(/\s+/g, '')}`,
      description: `Community for ${activityName} beginners`,
      type: 'subreddit'
    },
    {
      name: `${activityName} Guide`,
      url: `https://www.wikihow.com/Main-Page`,
      description: `Comprehensive guide to get started with ${activityName}`,
      type: 'website'
    },
    {
      name: `${activityName} Community`,
      url: `https://www.meetup.com/find/?keywords=${activityName}`,
      description: `Find local ${activityName} groups and events`,
      type: 'website'
    }
  ];

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <Link className="mr-2" /> Additional Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-[#F1F0FB] hover:bg-[#E5DEFF] transition-colors group"
            >
              <div className="flex items-start space-x-3">
                {resource.type === 'subreddit' ? (
                  <MessageSquare className="h-5 w-5 text-[#7E69AB] mt-1" />
                ) : (
                  <Globe className="h-5 w-5 text-[#7E69AB] mt-1" />
                )}
                <div>
                  <h4 className="font-semibold text-[#7E69AB] group-hover:text-[#9b87f5] transition-colors">
                    {resource.name}
                  </h4>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}