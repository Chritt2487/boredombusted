import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Equipment } from "@/types/activity";

interface EquipmentSectionProps {
  equipment: Equipment[];
}

export default function EquipmentSection({ equipment }: EquipmentSectionProps) {
  const groupedEquipment = equipment.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Equipment[]>);

  const categoryTitles = {
    required: "Required Equipment",
    recommended: "Recommended Equipment",
    professional: "Professional Equipment"
  };

  return (
    <Card className="border-2 border-[#D6BCFA] bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-[#7E69AB]">
          <Package className="mr-2" /> Equipment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-[#F1F0FB]">
          <p className="text-sm text-gray-600 italic">
            As an Amazon Associate, we may earn from qualifying purchases. Recommendations are based on personal experience and user reviews.
          </p>
        </div>

        {Object.entries(groupedEquipment).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h3 className="font-semibold text-lg text-[#7E69AB]">
              {categoryTitles[category as keyof typeof categoryTitles]}
            </h3>
            <div className="grid gap-4">
              {items.map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-[#F1F0FB]">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-[#7E69AB]">{item.name}</h4>
                    <span className="text-sm font-medium text-gray-600">{item.price}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  {item.affiliateUrl && (
                    <a
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-[#9b87f5] hover:bg-[#7E69AB] text-white rounded-lg transition-colors text-sm"
                    >
                      View on Amazon →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}