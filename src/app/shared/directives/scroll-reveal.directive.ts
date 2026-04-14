import { Directive, ElementRef, OnInit, OnDestroy, input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  readonly delay = input<number>(0);
  readonly threshold = input<number>(0.15);

  private observer!: IntersectionObserver;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('scroll-reveal');
    if (this.delay() > 0) {
      element.style.transitionDelay = `${this.delay()}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('revealed');
          this.observer.unobserve(element);
        }
      },
      { threshold: this.threshold() }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }
}
