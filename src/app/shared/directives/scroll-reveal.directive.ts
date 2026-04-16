import { Directive, ElementRef, OnInit, OnDestroy, input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  readonly delay     = input<number>(0);
  readonly threshold = input<number>(0.15);
  readonly direction = input<'up' | 'left' | 'right' | 'scale'>('up');

  private observer!: IntersectionObserver;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;

    // Respect OS-level animation preference — immediately reveal without animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('scroll-reveal', 'revealed');
      return;
    }

    // Apply direction variant class alongside base scroll-reveal
    const directionClass = this.direction() !== 'up' ? `reveal-${this.direction()}` : '';
    element.classList.add('scroll-reveal');
    if (directionClass) element.classList.add(directionClass);

    if (this.delay() > 0) {
      element.style.transitionDelay = `${this.delay()}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('revealed');
          this.observer.unobserve(element); // Observe once and disconnect
        }
      },
      { threshold: this.threshold(), rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }
}
