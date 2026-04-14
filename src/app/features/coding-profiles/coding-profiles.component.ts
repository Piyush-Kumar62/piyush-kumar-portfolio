import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface CodingProfile {
  platform: string;
  handle: string;
  url: string;
  desc: string;
  gradientColor: string;
  iconColor: string;
  stats: string;
}

@Component({
  selector: 'app-coding-profiles',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coding-profiles.component.html',
  styleUrl: './coding-profiles.component.scss',
})
export class CodingProfilesComponent {
  readonly profiles: CodingProfile[] = [
    {
      platform: 'GitHub',
      handle: '@Piyush-Kumar62',
      url: 'https://github.com/Piyush-Kumar62',
      desc: 'Open-source and personal projects focused on Java, Spring Boot, and Angular. Includes REST API development, authentication systems, and full-stack applications. Actively contributed during Hacktoberfest with multiple merged pull requests.',
      gradientColor: '#6e5494',
      iconColor: '#c4b5fd',
      stats: 'Open Source Contributions',
    },
    {
      platform: 'LinkedIn',
      handle: 'piyush-kumar62',
      url: 'https://www.linkedin.com/in/piyush-kumar62/',
      desc: 'Professional profile showcasing projects, skills, and experience. Connect with me for opportunities, collaboration, and insights into my development journey.',
      gradientColor: '#0077b5',
      iconColor: '#38bdf8',
      stats: 'Career & Networking',
    },
    {
      platform: 'LeetCode',
      handle: '@piyushkumardev',
      url: 'https://leetcode.com/u/piyushkumardev/',
      desc: 'Practicing data structures and algorithms with a focus on problem-solving and optimization using Java. Consistently improving coding patterns and logical thinking.',
      gradientColor: '#ffa116',
      iconColor: '#fbbf24',
      stats: 'Problem Solving',
    },
  ];
}
