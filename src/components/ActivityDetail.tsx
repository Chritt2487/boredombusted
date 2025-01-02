import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Clock, DollarSign, Brain } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import TutorialsSection from "./sections/TutorialsSection";
import EquipmentSection from "./sections/EquipmentSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityDetailProps {
  activity: {
    name: string;
    description: string;
    imageUrl: string;
    benefits: string[];
  };
  onBack: () => void;
  onSelectAlternative: (alternative: { name: string; description: string; }) => void;
}

interface DetailedActivity {
  equipment: {
    name: string;
    description: string;
    affiliateUrl: string;
    price: string;
    category: 'required' | 'optional' | 'recommended';
  }[];
  difficulty: string;
  timeCommitment: string;
  costEstimate: string;
  history: string;
  gettingStarted: {
    steps: string[];
    beginnerTips: string[];
  };
  benefits: {
    skills: string[];
    health: string[];
    funFacts: string[];
  };
}

export default function ActivityDetail({ activity, onBack, onSelectAlternative }: ActivityDetailProps) {
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

  if (loading || !detailedInfo) {
    return <div>Loading...</div>;
  }

  const boldKeywords = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

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
          src={`https://source.unsplash.com/featured/?${encodeURIComponent(activity.name)}`}
          alt={activity.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">
          {activity.name}
        </h1>
      </div>

      {/* Overview Section */}
      <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-[#7E69AB]">Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: boldKeywords(activity.description) }} className="text-gray-700" />
            {detailedInfo.history && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-[#7E69AB]">History & Fun Facts</h3>
                <div dangerouslySetInnerHTML={{ __html: boldKeywords(detailedInfo.history) }} className="text-gray-700" />
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center space-x-3 p-4 bg-[#F1F0FB] rounded-lg">
              <Star className="h-5 w-5 text-[#7E69AB]" />
              <div>
                <p className="font-semibold text-[#7E69AB]">Difficulty</p>
                <p className="text-gray-600">{detailedInfo.difficulty}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-[#F1F0FB] rounded-lg">
              <Clock className="h-5 w-5 text-[#7E69AB]" />
              <div>
                <p className="font-semibold text-[#7E69AB]">Time Commitment</p>
                <p className="text-gray-600">{detailedInfo.timeCommitment}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-[#F1F0FB] rounded-lg">
              <DollarSign className="h-5 w-5 text-[#7E69AB]" />
              <div>
                <p className="font-semibold text-[#7E69AB]">Cost Estimate</p>
                <p className="text-gray-600">{detailedInfo.costEstimate}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Benefits Section */}
      <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-[#7E69AB]">Why You'll Love It</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2">
            {detailedInfo.benefits.funFacts.map((fact, index) => (
              <li key={index} className="text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: boldKeywords(fact) }} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Getting Started Section */}
      <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-[#7E69AB]">Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-[#7E69AB]">Step-by-Step Guide</h3>
            <ol className="list-decimal list-inside space-y-2">
              {detailedInfo.gettingStarted.steps.map((step, index) => (
                <li key={index} className="text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: boldKeywords(step) }} />
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-[#7E69AB]">Tips for Beginners</h3>
            <ul className="list-disc list-inside space-y-2">
              {detailedInfo.gettingStarted.beginnerTips.map((tip, index) => (
                <li key={index} className="text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: boldKeywords(tip) }} />
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Section */}
      <EquipmentSection equipment={detailedInfo.equipment} />

      {/* Benefits Section */}
      <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-[#7E69AB]">
            <Brain className="mr-2" /> Benefits and Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-[#7E69AB]">Skills Developed</h3>
              <ul className="list-disc list-inside space-y-2">
                {detailedInfo.benefits.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700">
                    <div dangerouslySetInnerHTML={{ __html: boldKeywords(skill) }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-[#7E69AB]">Health Benefits</h3>
              <ul className="list-disc list-inside space-y-2">
                {detailedInfo.benefits.health.map((benefit, index) => (
                  <li key={index} className="text-gray-700">
                    <div dangerouslySetInnerHTML={{ __html: boldKeywords(benefit) }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Resources Section */}
      <TutorialsSection activityName={activity.name} />

      {/* Back to Results Button */}
      <div className="flex justify-center">
        <Button 
          onClick={onBack}
          className="bg-[#9b87f5] hover:bg-[#7E69AB]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Activities
        </Button>
      </div>
    </div>
  );
}
