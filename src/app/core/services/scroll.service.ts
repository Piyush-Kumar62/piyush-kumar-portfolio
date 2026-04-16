import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  readonly activeSection = signal<string>('hero');

  private observer!: IntersectionObserver;

  // Detect if user prefers reduced motion for scroll behavior
  private get prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  initSectionObserver(sectionIds: string[]): void {
    if (this.observer) this.observer.disconnect();

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { threshold: 0.2, rootMargin: '-72px 0px -20% 0px' }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      // Use instant scroll when user prefers reduced motion
      el.scrollIntoView({
        behavior: this.prefersReducedMotion ? 'instant' : 'smooth',
        block: 'start'
      });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: this.prefersReducedMotion ? 'instant' : 'smooth' });
  }

  destroy(): void {
    if (this.observer) this.observer.disconnect();
  }
}
