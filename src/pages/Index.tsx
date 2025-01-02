import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import QuestionnaireForm from "@/components/QuestionnaireForm";

const Index = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setShowForm(false);
  };

  const handleContinue = () => {
    if (selectedOption) {
      setShowForm(true);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-[#9b87f5]">Discover Your Next Adventure</h1>
          <p className="text-gray-600">Let's find the perfect activity that matches your interests</p>
        </div>

        <Card className="w-full border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-center text-[#7E69AB]">
              What are you looking to do?
            </CardTitle>
            <p className="text-center text-gray-500 text-sm">
              Choose an option below and we'll help you find the perfect match
            </p>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedOption}
              onValueChange={handleOptionSelect}
              className="space-y-4"
            >
              {[
                {
                  value: "Find a new hobby",
                  icon: "photo-1486312338219-ce68d2c6f44d",
                  description: "Discover exciting new hobbies tailored to your interests"
                },
                {
                  value: "Do something near me",
                  icon: "photo-1518770660439-4636190af475",
                  description: "Explore activities and events in your area"
                },
                {
                  value: "Learn a skill",
                  icon: "photo-1498050108023-c5249f4df085",
                  description: "Master new skills with personalized learning paths"
                },
                {
                  value: "Try something new",
                  icon: "photo-1649972904349-6e44c42644a7",
                  description: "Step out of your comfort zone with exciting experiences"
                },
                {
                  value: "Surprise me",
                  icon: "photo-1605810230434-7631ac76ec81",
                  description: "Let us suggest something unexpected and fun"
                },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-4 p-4 rounded-lg border border-[#D6BCFA] hover:bg-[#F1F0FB] cursor-pointer transition-colors duration-200"
                  onClick={() => handleOptionSelect(option.value)}
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/${option.icon}?w=400&auto=format&fit=crop&q=60`}
                      alt={option.value}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="cursor-pointer font-medium">
                        {option.value}
                      </Label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
            <Button
              onClick={handleContinue}
              className="w-full mt-6 bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200"
              disabled={!selectedOption}
            >
              Continue
            </Button>
          </CardContent>
        </Card>

        {showForm && <QuestionnaireForm initialChoice={selectedOption} />}
      </div>
    </div>
  );
};

export default Index;