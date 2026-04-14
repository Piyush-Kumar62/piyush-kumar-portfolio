import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
})
export class AchievementsComponent implements OnInit, OnDestroy {
  readonly currentImageIndex = signal(0);
  private flipTimer: ReturnType<typeof setInterval> | null = null;

  readonly openSourceAchievement = {
    icon: '🏆',
    title: 'Hacktoberfest 2025 — Open Source Contributor',
    points: [
      'Completed Hacktoberfest with 6+ merged pull requests across multiple repositories.',
      'Contributed to code improvements, bug fixes, and documentation.',
      'Worked with Git & GitHub workflows (fork -> branch -> PR -> review -> merge).',
      'Collaborated with maintainers following open-source standards.',
    ],
    links: [
      { icon: '🔗', label: 'View GitHub', url: 'https://github.com/Piyush-Kumar62' },
      { icon: '📄', label: 'View PRs', url: 'https://github.com/pulls?q=is%3Apr+author%3APiyush-Kumar62+created%3A2025-10-01..2025-10-31+is%3Amerged' },
      { icon: '🏅', label: 'View Badges', url: 'https://holopin.io/@piyushkumar62' },
    ],
  };

  readonly hacktoberfestImages = Array.from({ length: 6 }, (_, i) => ({
    src: `/assets/images/Achievement/${i + 1}.jpg`,
    alt: `Hacktoberfest contribution snapshot ${i + 1}`,
  }));

  ngOnInit(): void {
    this.flipTimer = setInterval(() => {
      this.currentImageIndex.update((index) => (index + 1) % this.hacktoberfestImages.length);
    }, 2800);
  }

  ngOnDestroy(): void {
    if (this.flipTimer) {
      clearInterval(this.flipTimer);
    }
  }
}
