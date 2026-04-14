import portfolioData from '@/data/portfolio.json';
import profileData from '@/data/profile.json';
import scheduleData from '@/data/schedule.json';
import type { PortfolioItem, Profile, ScheduleEvent } from './types';

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

export function getUpcomingSchedule(): ScheduleEvent[] {
  const now = new Date().toISOString();
  return (scheduleData as ScheduleEvent[])
    .filter((event) => event.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getAllSchedule(): ScheduleEvent[] {
  return (scheduleData as ScheduleEvent[]).sort((a, b) => a.date.localeCompare(b.date));
}
