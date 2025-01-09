import { useState } from "react";
import Header from "@/components/landing/Header";
import ContentContainer from "@/components/landing/ContentContainer";

const Index = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleContinue = () => {
    if (selectedOption) {
      setShowForm(true);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-2xl mx-auto space-y-8">
        <Header />
        <ContentContainer 
          showForm={showForm}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionSelect}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
};

export default Index;