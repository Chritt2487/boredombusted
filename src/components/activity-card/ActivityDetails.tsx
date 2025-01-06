interface ActivityDetailsProps {
  difficulty?: string;
  timeCommitment?: string;
  costEstimate?: string;
}

export default function ActivityDetails({ 
  difficulty, 
  timeCommitment, 
  costEstimate 
}: ActivityDetailsProps) {
  if (!difficulty && !timeCommitment && !costEstimate) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-[#7E69AB]">Activity Details:</h4>
      <ul className="space-y-1 text-gray-600">
        {difficulty && (
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Difficulty: {difficulty}</span>
          </li>
        )}
        {timeCommitment && (
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Time: {timeCommitment}</span>
          </li>
        )}
        {costEstimate && (
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Cost: {costEstimate}</span>
          </li>
        )}
      </ul>
    </div>
  );
}