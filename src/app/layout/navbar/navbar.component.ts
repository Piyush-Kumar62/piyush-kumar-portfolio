import {
  Component, ChangeDetectionStrategy, inject, signal,
  OnInit, OnDestroy, HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../core/services/scroll.service';
import { ThemeService } from '../../core/services/theme.service';

import { NAV_LINKS } from '../../core/constants/nav-items.constant';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  protected readonly themeService = inject(ThemeService);
  protected readonly scrollService = inject(ScrollService);

  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 50);
  }

  ngOnInit(): void {
    this.scrollService.initSectionObserver([
      'hero', 'projects', 'experience', 'skills', 'achievements',
      'coding-profiles', 'about', 'education', 'certifications', 'contact'
    ]);
  }

  navigate(id: string): void {
    this.scrollService.scrollTo(id);
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  ngOnDestroy(): void {
    this.scrollService.destroy();
  }
}
