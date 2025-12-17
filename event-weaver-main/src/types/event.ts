export interface Event {
  id: string;
  name: string;
  performer: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  category: 'concert' | 'sports' | 'theater' | 'comedy' | 'other';
  imageUrl?: string;
  ticketmasterUrl?: string;
  fctUrl?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isCurated?: boolean;
  wikipediaExcerpt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CuratedList {
  id: string;
  name: string;
  description?: string;
  eventIds: string[];
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = 'grid' | 'list';
export type SortField = 'date' | 'name' | 'venue' | 'city';
export type SortOrder = 'asc' | 'desc';
