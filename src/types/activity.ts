export interface Equipment {
  name: string;
  description: string;
  affiliateUrl: string;
  price: string;
  category: 'required' | 'recommended' | 'professional';
}

export interface Location {
  name: string;
  description: string;
  address: string;
  rating: number;
}

export interface Alternative {
  name: string;
  description: string;
}

export interface Benefits {
  skills: string[];
  health: string[];
  social: string[];
}

export interface CommunityGroup {
  name: string;
  description: string;
  link: string;
}

export interface CommunityEvent {
  name: string;
  description: string;
  date?: string;
}

export interface Community {
  groups: CommunityGroup[];
  events: CommunityEvent[];
  hashtags: string[];
}

export interface Activity {
  name: string;
  description: string;
  imageUrl: string;
  tips: string[];
}

export interface DetailedActivity {
  equipment: Equipment[];
  locations?: Location[];
  alternatives: Alternative[];
  difficulty: string;
  timeCommitment: string;
  costEstimate: string;
  benefits: Benefits;
  community: Community;
  imageUrl: string;
}