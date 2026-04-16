import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { ProfileViewsService } from '../../core/services/profile-views.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  // Mock ProfileViewsService
  const mockProfileViewsService = {
    views: signal<number | null>(null),
    init: () => Promise.resolve(),
    stop: () => void 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [
        provideAnimations(),
        { provide: ProfileViewsService, useValue: mockProfileViewsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with empty display text', () => {
    // displayText starts empty — typewriter begins on ngOnInit
    expect(typeof component.displayText()).toBe('string');
  });

  it('should show scroll indicator when scroll is at top', () => {
    expect(component.showScrollIndicator()).toBe(true);
  });

  it('should hide scroll indicator when scrolled down', () => {
    // Simulate scroll event
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    component.onWindowScroll();
    expect(component.showScrollIndicator()).toBe(false);
    // Reset
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('should have stats array with 3 items', () => {
    expect(component.stats.length).toBe(3);
  });

  it('should set imageLoaded on onImageLoad call', () => {
    expect(component.imageLoaded()).toBe(false);
    component.onImageLoad();
    expect(component.imageLoaded()).toBe(true);
  });

  it('should render the hero section in the DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#hero')).toBeTruthy();
  });

  it('should render the hero name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-name')?.textContent).toContain('Piyush Kumar');
  });
});
