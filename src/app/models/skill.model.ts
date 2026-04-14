export interface Skill {
  category: string;
  icon: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  proficiency: number; // 0–100
  icon?: string;
}
