import { ActivityEquipment } from "../../questionnaire/activityTypes";
import EquipmentItem from "./EquipmentItem";

interface EquipmentListProps {
  items: ActivityEquipment[];
  title: string;
  formatAmazonUrl: (url: string) => string;
}

export default function EquipmentList({ items, title, formatAmazonUrl }: EquipmentListProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-[#7E69AB]">{title}</h3>
      {items.map((item, index) => (
        <EquipmentItem 
          key={index} 
          item={item} 
          formatAmazonUrl={formatAmazonUrl}
        />
      ))}
    </div>
  );
}