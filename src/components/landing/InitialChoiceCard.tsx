import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface InitialChoiceCardProps {
  selectedOption: string;
  onOptionSelect: (value: string) => void;
  onContinue: () => void;
}

export default function InitialChoiceCard({
  selectedOption,
  onOptionSelect,
  onContinue,
}: InitialChoiceCardProps) {
  const options = [
    {
      value: "Find a new hobby",
      description: "Discover exciting new hobbies tailored to your interests"
    },
    {
      value: "Learn a skill",
      description: "Master new skills with personalized learning paths"
    },
    {
      value: "Try something new",
      description: "Step out of your comfort zone with exciting experiences"
    },
    {
      value: "Be productive",
      description: "Find meaningful projects and self-improvement activities"
    },
    {
      value: "surprise me",
      description: "Get a random activity suggestion right away"
    },
  ];

  return (
    <Card className="w-full border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm animate-fade-in">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl md:text-4xl text-center text-[#7E69AB] font-bold">
          What are you looking to do?
        </CardTitle>
        <p className="text-xl text-center text-gray-600 font-medium">
          Choose an option below and we'll help you find the perfect match
        </p>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedOption}
          onValueChange={onOptionSelect}
          className="space-y-4"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-4 p-4 rounded-lg border-2 border-[#D6BCFA] hover:bg-[#F1F0FB] cursor-pointer transition-all duration-200 hover:scale-[1.02]"
              onClick={() => onOptionSelect(option.value)}
            >
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer text-xl font-semibold">
                    {option.value}
                  </Label>
                </div>
                <p className="text-lg text-gray-600 mt-1 font-medium">{option.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
        <Button
          onClick={onContinue}
          className="w-full mt-6 bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-200 text-xl font-semibold py-6"
          disabled={!selectedOption}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}