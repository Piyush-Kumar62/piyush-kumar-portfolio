import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface Skill {
  name: string;
  iconClass: string;
  core?: boolean;
  hint?: string;
}

interface SkillCategory {
  title: string;
  emoji: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly skillCategories: SkillCategory[] = [
    {
      title: 'Backend Engineering',
      emoji: '🧠',
      skills: [
        { name: 'Java',            iconClass: 'devicon-java-plain colored', core: true, hint: 'Used in major backend projects and internship work.' },
        { name: 'Spring Boot',     iconClass: 'devicon-spring-original colored', core: true, hint: 'Built production-style APIs and business modules.' },
        { name: 'Spring Security', iconClass: 'devicon-spring-original colored', hint: 'Implemented JWT auth and RBAC-based access control.' },
        { name: 'Hibernate (JPA)', iconClass: 'devicon-hibernate-plain colored', hint: 'Used for ORM mapping and query optimization.' },
        { name: 'MySQL',           iconClass: 'devicon-mysql-plain colored', hint: 'Designed schemas and optimized relational queries.' },
      ]
    },
    {
      title: 'Frontend Engineering',
      emoji: '🎨',
      skills: [
        { name: 'Angular',                iconClass: 'devicon-angularjs-plain colored', core: true, hint: 'Built standalone-component based portfolio and project UIs.' },
        { name: 'TypeScript',             iconClass: 'devicon-typescript-plain colored' },
        { name: 'HTML / CSS',             iconClass: 'devicon-html5-plain colored' },
        { name: 'RxJS',                   iconClass: 'devicon-rxjs-plain colored' },
        { name: 'Forms & Validation',     iconClass: 'devicon-angularjs-plain colored' },
      ]
    },
    {
      title: 'DevOps & Cloud',
      emoji: '☁️',
      skills: [
        { name: 'AWS',            iconClass: 'devicon-amazonwebservices-plain-wordmark colored', hint: 'Hands-on exposure through deployment and cloud learning projects.' },
        { name: 'Docker',         iconClass: 'devicon-docker-plain colored', hint: 'Containerized backend services during development workflows.' },
        { name: 'GitHub Actions', iconClass: 'devicon-githubactions-plain colored', hint: 'Used CI automation for build and quality checks.' },
        { name: 'Linux',          iconClass: 'devicon-linux-plain colored', hint: 'Comfortable with CLI-based development and deployment commands.' },
      ]
    },
    {
      title: 'Developer Tools',
      emoji: '🛠️',
      skills: [
        { name: 'Git & GitHub', iconClass: 'devicon-git-plain colored' },
        { name: 'Maven',        iconClass: 'devicon-maven-plain colored' },
        { name: 'Postman',      iconClass: 'devicon-postman-plain colored' },
        { name: 'IntelliJ IDEA', iconClass: 'devicon-intellij-plain colored' },
        { name: 'VS Code',       iconClass: 'devicon-vscode-plain colored' },
      ]
    },
    {
      title: 'Testing & Quality',
      emoji: '🧪',
      skills: [
        { name: 'JUnit',   iconClass: 'devicon-java-plain colored' },
        { name: 'Mockito', iconClass: 'devicon-java-plain colored' },
        { name: 'Integration Testing', iconClass: 'devicon-java-plain colored' },
      ]
    },
  ];
}
