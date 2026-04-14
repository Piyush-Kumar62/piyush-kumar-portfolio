import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';
import { toastAnimation } from '../../../animations/fade.animation';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toastAnimation],
  template: `
    <div class="toast-container" role="region" aria-live="polite" aria-label="Notifications">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="toast toast--{{ toast.type }}"
          [@toast]
          role="alert"
        >
          <span class="toast__icon">
            @switch (toast.type) {
              @case ('success') { ✅ }
              @case ('error')   { ❌ }
              @default          { ℹ️ }
            }
          </span>
          <span class="toast__message">{{ toast.message }}</span>
          <button
            class="toast__close"
            (click)="toastService.remove(toast.id)"
            aria-label="Dismiss notification"
          >×</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      border-radius: 12px;
      background: var(--bg-secondary);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(16px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      min-width: 280px;
      max-width: 380px;
      pointer-events: all;
      color: var(--text-primary);
      font-size: 0.9rem;
      font-weight: 500;

      &--success { border-color: rgba(34, 197, 94, 0.4); }
      &--error   { border-color: rgba(239, 68, 68, 0.4); }
      &--info    { border-color: var(--border-accent); }

      &__icon { font-size: 1.1rem; flex-shrink: 0; }
      &__message { flex: 1; line-height: 1.4; }
      &__close {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-muted);
        font-size: 1.3rem;
        padding: 0;
        line-height: 1;
        transition: color 0.2s;
        &:hover { color: var(--text-primary); }
      }
    }

    @media (max-width: 480px) {
      .toast-container { left: 16px; right: 16px; bottom: 16px; }
      .toast { min-width: unset; }
    }
  `]
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);
}
