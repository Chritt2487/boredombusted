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
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              What are you looking to do?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedOption}
              onValueChange={handleOptionSelect}
              className="space-y-4"
            >
              {[
                "Find a new hobby",
                "Do something near me",
                "Learn a skill",
                "Try something new",
                "Surprise me",
              ].map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-accent cursor-pointer"
                >
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="cursor-pointer flex-grow">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              onClick={handleContinue}
              className="w-full mt-6"
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