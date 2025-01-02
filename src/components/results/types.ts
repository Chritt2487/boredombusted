export interface Activity {
  name: string;
  description: string;
  imageUrl: string;
  difficulty?: string;
  timeCommitment?: string;
  costEstimate?: string;
  benefits: string[];
}