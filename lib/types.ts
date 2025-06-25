export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  rating: number;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  iconifyIcon?: string;
}
export interface Tool extends Resource {
  pricing: 'free' | 'freemium' | 'paid';
  features: string[];
}
export interface Framework extends Resource {
  version: string;
  documentation: string;
  github: string;
  stars: number;
}
export interface Community extends Resource {
  members: number;
  platform: string;
  joinUrl: string;
}
export interface Blog extends Resource {
  author: string;
  readTime: number;
  publishDate: string;
}
export type CategoryType = 'learning' | 'tools' | 'frameworks' | 'communities' | 'blogs';
