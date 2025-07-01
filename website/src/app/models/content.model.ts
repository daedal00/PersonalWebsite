export interface Content {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  link?: string;
  documentationLink?: string;
  wallpaperLink?: string;
  reportLink?: string;
  notebookLink?: string;
  liveWebsiteLink?: string;
  details?: Record<string, any>;
  date?: string;
  duration?: string;
}

export interface Technology {
  name: string;
  icon: string;
}

export interface Section {
  id: string;
  name: string;
  description: string;
  type: SectionType;
  items: Content[];
}

export enum SectionType {
  PROJECTS = 'projects',
  EXPERIENCE = 'experience',
  EDUCATION = 'education',
  SKILLS = 'skills',
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  type: PlaylistType;
  items: Content[];
}

export enum PlaylistType {
  PROJECTS = 'projects',
  EXPERIENCE = 'experience',
  EDUCATION = 'education',
  SKILLS = 'skills',
}

export interface MusicTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  url: string;
  coverImage: string;
}
