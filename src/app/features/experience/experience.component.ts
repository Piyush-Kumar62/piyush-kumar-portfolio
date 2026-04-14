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
      role: 'Java Full Stack Virtual Intern',
      type: 'Virtual Internship',
      duration: 'Feb 2026 – Mar 2026',
      location: 'Remote',
      icon: '🏢',
      description: [
        'Developed a Digital Café Ordering Platform using Spring Boot, Angular, and MySQL',
        'Designed system supporting 5 user roles: Admin, Café Owner, Customer, Chef, Waiter',
        'Developed 50+ REST APIs for authentication, orders, and workflow management',
        'Implemented JWT-based authentication with role-based access control (RBAC)',
        'Integrated WebSocket for real-time order status updates',
        'Integrated Razorpay for secure online payments',
        'Designed normalized database schema and handled validations & exceptions',
        'Optimized SQL queries and improved API performance by 30–40%',
        'Tested APIs using Postman',
      ],
      technologies: [
        'Java',
        'Spring Boot',
        'Spring Security',
        'Angular',
        'MySQL',
        'REST APIs',
        'JWT',
        'RBAC',
        'WebSocket',
        'Razorpay',
        'Postman',
      ],
    }
  ];
}
