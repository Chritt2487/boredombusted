import { Tag } from "lucide-react";

interface CategoryTagsProps {
  categories: string[];
}

export default function CategoryTags({ categories }: CategoryTagsProps) {
  if (!categories.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex items-center bg-[#F1F0FB] px-2 py-1 rounded-full text-sm text-[#7E69AB]"
        >
          <Tag className="w-3 h-3 mr-1" />
          {category}
        </div>
      ))}
    </div>
  );
}