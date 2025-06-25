import { Resource, CategoryType, Community, Blog } from "../types";
import { 
  learningResources, 
  developerTools, 
  frameworks, 
  communities, 
  blogs, 
  allResources 
} from "./mock-data";
export const api = {
  getResourcesByCategory: (category: CategoryType): Resource[] => {
    switch (category) {
      case "learning":
        return learningResources;
      case "tools":
        return developerTools;
      case "frameworks":
        return frameworks;
      case "communities":
        return communities;
      case "blogs":
        return blogs;
      default:
        return [];
    }
  },
  getResourceById: (id: string): Resource | undefined => {
    return allResources.find((r) => r.id === id);
  },
  getFeaturedResources: (): Resource[] => {
    return [
      learningResources[0],
      developerTools[0],
      frameworks[0],
      communities[0],
      blogs[0],
    ];
  },
  getNewestResources: (): Resource[] => {
    return [
      frameworks[1],
      developerTools[2],
      blogs[1],
      learningResources[2],
      communities[1],
    ];
  },
  searchResources: (query: string): Resource[] => {
    if (!query.trim()) {
      return [];
    }
    const searchTerm = query.toLowerCase().trim();
    return allResources.filter(resource => {
      return (
        resource.title.toLowerCase().includes(searchTerm) ||
        resource.description.toLowerCase().includes(searchTerm) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    });
  },
  getLearningResources: (): Resource[] => {
    return learningResources;
  },
  getDeveloperTools: (): Resource[] => {
    return developerTools;
  },
  getFrameworks: (): Resource[] => {
    return frameworks;
  },
  getCommunities: (): Resource[] => {
    return communities;
  },
  getBlogs: (): Resource[] => {
    return blogs;
  },
  getResourceCounts: (): Record<CategoryType, number> => {
    return {
      learning: learningResources.length,
      tools: developerTools.length,
      frameworks: frameworks.length,
      communities: communities.length,
      blogs: blogs.length
    };
  },
  getCommunityInfo: (id: string): Community | null => {
    const community = communities.find((item) => item.id === id);
    return community || null;
  },
  getRecentBlogs: (): Blog[] => {
    const sorted = [...blogs].sort((a, b) => {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
    return sorted.slice(0, 5);
  }
};
