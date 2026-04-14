import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';
type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme';

  readonly theme = signal<Theme>(this.loadTheme());
  readonly isDark = signal<boolean>(this.loadTheme() === 'dark');

  constructor() {
    effect(() => {
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      this.isDark.set(t === 'dark');
      localStorage.setItem(this.STORAGE_KEY, t);
    });
  }

  toggle(): void {
    const nextTheme: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.applyCenterRevealTransition(nextTheme);
  }

  private loadTheme(): Theme {
    const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private applyCenterRevealTransition(nextTheme: Theme): void {
    const root = document.documentElement;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY),
    );

    root.style.setProperty('--theme-reveal-x', `${centerX}px`);
    root.style.setProperty('--theme-reveal-y', `${centerY}px`);
    root.style.setProperty('--theme-reveal-end-radius', `${endRadius}px`);

    const docWithTransition = document as Document & {
      startViewTransition?: (updateCallback: () => void) => ViewTransitionLike;
    };

    if (!docWithTransition.startViewTransition) {
      this.theme.set(nextTheme);
      return;
    }

    root.classList.add('theme-transitioning');
    let transition: ViewTransitionLike;
    try {
      transition = docWithTransition.startViewTransition(() => {
        this.theme.set(nextTheme);
      });
    } catch {
      root.classList.remove('theme-transitioning');
      this.theme.set(nextTheme);
      return;
    }

    transition.finished.finally(() => {
      root.classList.remove('theme-transitioning');
    });
  }
}
