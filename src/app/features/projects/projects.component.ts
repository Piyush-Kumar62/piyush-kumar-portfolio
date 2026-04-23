import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  readonly currentImageByProject = signal<Record<number, number>>({});
  private flipTimer: ReturnType<typeof setInterval> | null = null;

  readonly projects: Project[] = [
    {
      id: 1,
      name: 'Digital Café Ordering & Operations Platform',
      description: 'Built a multi-role café management system with real-time order tracking, payment integration, and RBAC across 5 user workflows.',
      longDescription: 'Engineered a scalable multi-role system with role-based access control (RBAC) across 5 user workflows. Features real-time WebSocket order tracking, Razorpay payment gateway integration, and a normalized database schema reducing redundancy by 35%.',
      summary: '• Designed a multi-role system (Admin, Owner, Chef, Waiter, Customer) using RBAC\n• Built real-time order processing using WebSocket (booking → serving lifecycle)\n• Integrated Razorpay payment gateway for secure transactions\n• Designed normalized MySQL schema for scalability\n• Optimized SQL queries using indexing and query tuning\n• Implemented layered architecture (Controller → Service → Repository)',
      screens: [
        { title: 'Landing Page', src: '/assets/images/projects/digitalcafe/landing-page-header.png', alt: 'Digital Cafe landing page' },
        { title: 'Login Page', src: '/assets/images/projects/digitalcafe/login.png', alt: 'Digital Cafe login page' },
        { title: 'Registration Page', src: '/assets/images/projects/digitalcafe/register.png', alt: 'Digital Cafe registration page' },
        { title: 'Customer Dashboard', src: '/assets/images/projects/digitalcafe/customer-dashboard.png', alt: 'Digital Cafe customer dashboard' },
        { title: 'Cafes Listing Page', src: '/assets/images/projects/digitalcafe/cafes-listing.png', alt: 'Digital Cafe cafes listing' },
        { title: 'Menu Page', src: '/assets/images/projects/digitalcafe/menu.png', alt: 'Digital Cafe menu page' },
        { title: 'Table Booking Page', src: '/assets/images/projects/digitalcafe/table-booking.png', alt: 'Digital Cafe table booking page' },
        { title: 'Cafe Owner Dashboard', src: '/assets/images/projects/digitalcafe/owner-dashboard.png', alt: 'Digital Cafe owner dashboard' },
        { title: 'Chef Dashboard', src: '/assets/images/projects/digitalcafe/chef-dashboard.png', alt: 'Digital Cafe chef dashboard' },
        { title: 'Waiter Dashboard', src: '/assets/images/projects/digitalcafe/waiter-dashboard.png', alt: 'Digital Cafe waiter dashboard' },
        { title: 'Admin Dashboard', src: '/assets/images/projects/digitalcafe/admin-dashboard.png', alt: 'Digital Cafe admin dashboard' },
      ],
      techStack: ['Java', 'Spring Boot','Spring Security', 'Angular', 'MySQL', 'JWT', 'WebSocket', 'AWS'],
      githubUrl: 'https://github.com/Piyush-Kumar62/Digital-Cafe-Ordering-and-Operations-Platform',
      liveUrl: 'https://cafehub.tech',
      demoVideoUrl: '',
      metrics: [
        { label: 'REST APIs Built', value: '50+' },
        { label: 'Latency Reduced', value: '30–40%' },
        { label: 'Real-time Delay Reduced', value: '70%' },
        { label: 'Data Redundancy Reduced', value: '35%' },
      ],
      featured: true,
      type: 'Full Stack · Real-Time System',
      gradient: 'linear-gradient(135deg, #6366f1, #06b6d4)',
    },
    {
      id: 2,
      name: 'Fitness Management System',
      description: 'Secure backend system for gym management with JWT authentication, multi-role RBAC, and optimized database queries across 30+ REST APIs.',
      longDescription: 'Engineered a backend system with 30+ REST APIs supporting Member, Trainer, Owner, and Admin roles. JWT-based authentication reduced unauthorized access attempts by 90%. Optimized relational DB schema improved query efficiency by 25%.',
      summary: '• Built a full-stack fitness platform supporting Member, Trainer, Owner, and Admin roles using RBAC\n• Developed REST APIs for memberships, classes, workouts, and analytics modules\n• Implemented JWT-based authentication and role-based authorization\n• Integrated Stripe payment gateway for subscription management\n• Used Redis caching to improve performance and reduce database load\n• Enabled real-time notifications using WebSocket\n• Containerized application using Docker for consistent deployment\n• Designed layered architecture (Controller → Service → Repository)',
      previewTitle: 'Application Preview',
      screens: [
        { title: 'Fitness Preview', src: '/assets/images/projects/fitness-management/landingpage.png', alt: 'Fitness management project screen preview' },
      ],
      techStack: ['Spring Boot', 'Angular', 'MySQL', 'Redis', 'Docker', 'JWT', 'WebSocket'],
      githubUrl: 'https://github.com/Piyush-Kumar62/Fitness-Management-System',
      liveUrl: '',
      demoVideoUrl: '',
      metrics: [
        { label: 'REST APIs Built', value: '30+' },
        { label: 'Unauth Access Reduced', value: '90%' },
        { label: 'Query Efficiency Up', value: '25%' },
        { label: 'API Latency Reduced', value: '30%' },
      ],
      featured: true,
      type: 'Backend · Security System',
      gradient: 'linear-gradient(135deg, #a855f7, #6366f1)',
    },

  ];

  ngOnInit(): void {
    const initialState: Record<number, number> = {};
    for (const project of this.projects) {
      initialState[project.id] = 0;
    }
    this.currentImageByProject.set(initialState);

    this.flipTimer = setInterval(() => {
      this.currentImageByProject.update((current) => {
        const next = { ...current };
        for (const project of this.projects) {
          const total = project.screens?.length ?? 0;
          if (total > 1) {
            next[project.id] = ((next[project.id] ?? 0) + 1) % total;
          }
        }
        return next;
      });
    }, 2800);
  }

  ngOnDestroy(): void {
    if (this.flipTimer) {
      clearInterval(this.flipTimer);
    }
  }

  getCurrentImageIndex(projectId: number): number {
    return this.currentImageByProject()[projectId] ?? 0;
  }

  getCurrentScreen(project: Project): { title: string; src: string; alt: string } | undefined {
    if (!project.screens?.length) {
      return undefined;
    }
    return project.screens[this.getCurrentImageIndex(project.id)];
  }
}
