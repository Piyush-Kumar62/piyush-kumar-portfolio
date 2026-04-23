import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  readonly experiences: Experience[] = [
    {
      id: 1,
      company: 'Infosys Springboard',
      role: 'Java Full Stack Intern',
      type: 'Virtual Internship',
      duration: 'Feb 2026 – Mar 2026',
      location: 'Remote',
      icon: '🏢',
      description: [
        'Completed hands-on training in Java Full Stack development using Spring Boot and Angular',
        'Built a digital café ordering system as part of the program',
        'Developed REST APIs for authentication, order management, and workflows',
        'Implemented JWT-based authentication and role-based access control (RBAC)',
        'Integrated WebSocket for real-time order status updates',
        'Designed normalized MySQL schema and handled validations & exception handling',
        'Optimized SQL queries using indexing and query tuning',
      ],
      technologies: [
        'Spring Boot',
        'Angular',
        'MySQL',
        'JWT',
        'WebSocket',
      ],
    }
  ];
}
