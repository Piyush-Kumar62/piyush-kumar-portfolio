import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NAV_LINKS } from '../../core/constants/nav-items.constant';
import { SOCIAL_LINKS } from '../../core/constants/social-links.constant';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly navLinks = NAV_LINKS;

  readonly socials = SOCIAL_LINKS;

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
