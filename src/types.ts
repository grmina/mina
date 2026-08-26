export type ProjectCategory = 
  | 'all'
  | 'mobile-rpg'
  | 'pc-mmorpg'
  | 'casual-gui'
  | 'scifi-fps'
  | 'subculture'
  | 'icon-kit';

export interface ProjectSpec {
  contribution: string;
  duration: string;
  tools: string[];
  platform: string;
  genre: string;
  role: string;
}

export interface DesignSystemColor {
  name: string;
  hex: string;
  usage: string;
}

export interface ProjectScreen {
  title: string;
  description: string;
  image: string;
  aspect?: string;
}

export interface ProjectItem {
  id: string;
  number: number;
  title: string;
  titleKo: string;
  subtitle: string;
  subtitleKo: string;
  category: ProjectCategory;
  categoryName: string;
  thumbnail: string;
  detailImage: string;
  summary: string;
  intent: string;
  problemSolution: {
    problem: string;
    solution: string;
  };
  specs: ProjectSpec;
  tags: string[];
  colors: DesignSystemColor[];
  screens: ProjectScreen[];
  interactiveType?: 'equipment' | 'hud' | 'upgrade' | 'crosshair' | 'gacha' | 'icons';
}

export interface DesignerProfile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  experienceYears: number;
  socials: {
    artstation?: string;
    behance?: string;
    github?: string;
    linkedin?: string;
  };
  skills: {
    category: string;
    items: { name: string; level: number; highlight?: boolean }[];
  }[];
  workExperience: {
    period: string;
    company: string;
    role: string;
    description: string;
    highlights: string[];
  }[];
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: string;
  read: boolean;
  status: 'new' | 'replied' | 'archived';
}
