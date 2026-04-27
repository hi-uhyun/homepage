import portfolioData from '@/data/portfolio.json';
import profileData from '@/data/profile.json';
import type { PortfolioItem, Profile } from './types';

export function getPortfolio(): PortfolioItem[] {
  return portfolioData as PortfolioItem[];
}

export function getFeaturedPortfolio(): PortfolioItem[] {
  return getPortfolio().filter((item) => item.isFeatured);
}

export function getPortfolioByCategory(category: PortfolioItem['category']): PortfolioItem[] {
  return getPortfolio().filter((item) => item.category === category);
}

export function getProfile(): Profile {
  return profileData as Profile;
}
