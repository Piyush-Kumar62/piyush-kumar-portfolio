export interface Project {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  summary?: string;
  screens?: { title: string; src: string; alt: string }[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  metrics: { label: string; value: string }[];
  featured: boolean;
  type: string;
  gradient: string;
}
