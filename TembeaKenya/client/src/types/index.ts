export interface Place {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  location: string;
  price: string;
  imageUrl: string;
  vibes: string[];
  category: string;
  accommodations?: Accommodation[];
  events?: Event[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  date: string;
  price: string;
  imageUrl: string;
  vibes: string[];
  category: 'recreational' | 'functional';
  location: string;
}

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  distance: string;
  price: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    initials: string;
  };
  caption: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  credits: number;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: 'traveler' | 'host' | 'admin';
  travelStyle?: string;
  interests?: string[];
  budgetRange?: string;
  accessibilityPreferences?: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
  type?: 'text' | 'recommendations' | 'options';
  data?: any;
}

export interface Collection {
  places: Place[];
  events: Event[];
}

export interface Feedback {
  id: string;
  itemId: string;
  itemType: 'place' | 'event';
  rating: number;
  comment: string;
  venueOwner: string;
  timestamp: string;
}
