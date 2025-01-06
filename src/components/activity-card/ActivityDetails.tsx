import { getTranslation } from "@/utils/i18n";
import type { Language } from "@/utils/i18n";

interface ActivityDetailsProps {
  difficulty?: string;
  timeCommitment?: string;
  costEstimate?: string;
  language?: Language;
}

export default function ActivityDetails({ 
  difficulty, 
  timeCommitment, 
  costEstimate,
  language = 'en'
}: ActivityDetailsProps) {
  if (!difficulty && !timeCommitment && !costEstimate) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-[#7E69AB]">
        {getTranslation('activityDetails', language)}
      </h4>
      <ul className="space-y-1 text-gray-600">
        {difficulty && (
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{getTranslation('difficulty', language)}: {difficulty}</span>
          </li>
        )}
        {timeCommitment && (
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{getTranslation('time', language)}: {timeCommitment}</span>
          </li>
        )}
        {costEstimate && (
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{getTranslation('cost', language)}: {costEstimate}</span>
          </li>
        )}
      </ul>
    </div>
  );
}