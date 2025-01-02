import React from "react";
import { Activity } from "./ResultsDisplay";

interface ActivityDetailProps {
  activity: Activity;
  onBack: () => void;
  onSelectAlternative: (alternative: { name: string; description: string }) => void;
}

export default function ActivityDetail({ 
  activity, 
  onBack,
  onSelectAlternative 
}: ActivityDetailProps) {
  const { name, description, imageUrl, tips } = activity;

  const alternatives = [
    { name: "Alternative 1", description: "Description for alternative 1" },
    { name: "Alternative 2", description: "Description for alternative 2" },
    { name: "Alternative 3", description: "Description for alternative 3" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-blue-500">Back</button>
        <h2 className="text-3xl font-bold text-[#7E69AB]">{name}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
      {imageUrl && <img src={imageUrl} alt={name} className="w-full h-auto rounded-lg" />}
      <div>
        <h3 className="text-xl font-semibold text-[#7E69AB]">Tips</h3>
        <ul className="list-disc list-inside">
          {tips.map((tip, index) => (
            <li key={index} className="text-gray-600">{tip}</li>
          ))}
        </ul>
      </div>

      {alternatives && alternatives.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#7E69AB]">Similar Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alternatives.map((alt, index) => (
              <div
                key={index}
                onClick={() => onSelectAlternative(alt)}
                className="p-4 rounded-lg border border-[#D6BCFA] hover:bg-[#F1F0FB] cursor-pointer transition-colors duration-200"
              >
                <h4 className="font-medium text-[#7E69AB]">{alt.name}</h4>
                <p className="text-sm text-gray-600">{alt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}