import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss',
})
export class CertificationsComponent {
  readonly certificates = [
    {
      id: 1,
      title: 'Java',
      image: 'assets/images/certifications/Java.png',
      linkLabel: 'View Certificate',
      link: 'https://drive.google.com/file/d/17KJSjFPq8g2MdLOJT8x9hQbwTLKWjKxp/view?usp=sharing',
    },
    {
      id: 2,
      title: 'Spring Boot',
      image: 'assets/images/certifications/spring-boot.png',
      linkLabel: 'View Certificate',
      link: 'https://drive.google.com/file/d/1XF-VOTFHcNhJePhmTT0Rps2s0AQLPB8M/view?usp=sharing',
    },
    {
      id: 3,
      title: 'Angular',
      image: 'assets/images/certifications/angular.png',
      linkLabel: 'View Certificate',
      link: 'https://drive.google.com/file/d/1eu6c1f_IEPvlxPeUcrvHkS3jwYAsg4uJ/view?usp=sharing',
    },
    {
      id: 4,
      title: 'Postman',
      image: 'assets/images/certifications/postman.png',
      linkLabel: 'View Certificate',
      link: 'https://drive.google.com/file/d/1FFpE8r8vx9B-6_b2Es2SOX4RzukVBQpN/view?usp=sharing',
    },
    {
      id: 5,
      title: 'Cloud Computing',
      image: 'assets/images/certifications/cloud-computing.png',
      linkLabel: 'View Certificate',
      link: 'https://drive.google.com/file/d/1WGjlL4Ub1ukdapxhRG0HPgRSJ2ox4e0I/view?usp=sharing',
    },
    {
      id: 6,
      title: 'Agile Scrum in Practice',
      image: 'assets/images/certifications/agile-scrum-in-practice.png',
      linkLabel: 'View Certificate',
      link: 'https://drive.google.com/file/d/1SxBUuOSdlWMKIexMC1bUx3eiSM7CsBMG/view?usp=sharing',
    },
    // {
    //   id: 7,
    //   title: 'Certificate 7',
    //   image: '',
    //   linkLabel: 'Add Link',
    //   link: '',
    // },
    // {
    //   id: 8,
    //   title: 'Certificate 8',
    //   image: '',
    //   linkLabel: 'Add Link',
    //   link: '',
    // },
    // {
    //   id: 9,
    //   title: 'Certificate 9',
    //   image: '',
    //   linkLabel: 'Add Link',
    //   link: '',
    // },
  ];
}
