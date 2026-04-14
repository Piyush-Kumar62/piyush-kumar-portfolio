import { Component, signal, HostListener, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../../core/services/scroll.service';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="scroll-top-btn"
      [class.visible]="isVisible()"
      (click)="scrollToTop()"
      aria-label="Scroll to top"
      title="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  `,
  styles: [`
    .scroll-top-btn {
      position: fixed;
      bottom: 32px;
      left: 32px;
      z-index: 100;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: var(--gradient);
      color: #fff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: translateY(20px) scale(0.8);
      transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s;
      pointer-events: none;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);

      &.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }

      &:hover {
        transform: translateY(-3px) scale(1.08);
        box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
      }

      &:active { transform: scale(0.95); }
    }

    @media (max-width: 480px) {
      .scroll-top-btn { bottom: 24px; left: 24px; }
    }
  `]
})
export class ScrollTopComponent {
  private readonly scrollService = inject(ScrollService);
  readonly isVisible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.isVisible.set(window.scrollY > 400);
  }

  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}
