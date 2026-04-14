import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  readonly btech = {
    college: 'Centurion University of Technology and Management, Parlakhemundi',
    degree: 'B.Tech',
    branch: 'Electronics and Communication Engineering',
    specialization: 'Software Technology (5th Semester)',
    location: 'Odisha, India',
    duration: '2022 - 2026',
    cgpa: '7.8 / 10',
  };
}
