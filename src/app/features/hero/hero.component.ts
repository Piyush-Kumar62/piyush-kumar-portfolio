import {
  Component, ChangeDetectionStrategy, OnInit, OnDestroy, signal, HostListener, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeSlideIn, slideInRight } from '../../animations/fade.animation';

const ROLES = [
  'Java Full Stack Developer (Backend-Focused)',
];

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeSlideIn, slideInRight],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly displayText  = signal('');
  readonly currentRole  = signal(0);
  readonly showCursor   = signal(true);
  readonly imageLoaded  = signal(false);
  readonly showScrollIndicator = signal(true);

  private roleIdx   = 0;
  private charIdx   = 0;
  private isDeleting = false;
  private timerId!: ReturnType<typeof setTimeout>;
  private cursorId!: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.type();
    this.onWindowScroll();
    this.cursorId = setInterval(() => this.showCursor.update(v => !v), 530);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollIndicator.set(window.scrollY < 30);
  }

  private type(): void {
    const role = ROLES[this.roleIdx];

    if (!this.isDeleting) {
      this.displayText.set(role.slice(0, ++this.charIdx));
      if (this.charIdx === role.length) {
        this.isDeleting = true;
        this.timerId = setTimeout(this.type.bind(this), 2200);
        return;
      }
    } else {
      this.displayText.set(role.slice(0, --this.charIdx));
      if (this.charIdx === 0) {
        this.isDeleting = false;
        this.roleIdx = (this.roleIdx + 1) % ROLES.length;
        this.currentRole.set(this.roleIdx);
      }
    }

    const speed = this.isDeleting ? 40 : 65;
    this.timerId = setTimeout(this.type.bind(this), speed);
  }

  onImageLoad(): void {
    this.imageLoaded.set(true);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timerId);
    clearInterval(this.cursorId);
  }

  scrollToProjects(): void {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
}
