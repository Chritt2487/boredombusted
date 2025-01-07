import React from 'react';
import LoadMoreButton from "./LoadMoreButton";
import RefinementButton from "./RefinementButton";

interface ActionButtonsProps {
  isLoading: boolean;
  onLoadMore: () => void;
  showRefinement: boolean;
  onRefinement: () => void;
}

export default function ActionButtons({
  isLoading,
  onLoadMore,
  showRefinement,
  onRefinement
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4">
      <LoadMoreButton 
        isLoading={isLoading}
        onClick={onLoadMore}
      />
      {showRefinement && (
        <RefinementButton onClick={onRefinement} />
      )}
    </div>
  );
}