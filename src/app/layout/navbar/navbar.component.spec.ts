import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { ScrollService } from '../../core/services/scroll.service';
import { ThemeService } from '../../core/services/theme.service';
import { signal } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const mockScrollService = {
    activeSection: signal('hero'),
    initSectionObserver: jasmine.createSpy('initSectionObserver'),
    scrollTo: jasmine.createSpy('scrollTo'),
    destroy: jasmine.createSpy('destroy'),
  };

  const mockThemeService = {
    isDark: signal(true),
    theme: signal<'dark' | 'light'>('dark'),
    toggle: jasmine.createSpy('toggle'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: ScrollService, useValue: mockScrollService },
        { provide: ThemeService,  useValue: mockThemeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize section observer on init', () => {
    expect(mockScrollService.initSectionObserver).toHaveBeenCalled();
  });

  it('should start with menu closed', () => {
    expect(component['menuOpen']()).toBe(false);
  });

  it('should toggle menu on toggleMenu call', () => {
    component.toggleMenu();
    expect(component['menuOpen']()).toBe(true);
    component.toggleMenu();
    expect(component['menuOpen']()).toBe(false);
  });

  it('should close menu on closeMenu call', () => {
    component.toggleMenu(); // Open first
    component.closeMenu();
    expect(component['menuOpen']()).toBe(false);
  });

  it('should call scrollTo and close menu on navigate', () => {
    component.toggleMenu();
    component.navigate('projects');
    expect(mockScrollService.scrollTo).toHaveBeenCalledWith('projects');
    expect(component['menuOpen']()).toBe(false);
  });

  it('should render nav element with role navigation', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nav = compiled.querySelector('nav');
    expect(nav?.getAttribute('role')).toBe('navigation');
  });

  it('should set scrolled state when scrollY > 50', () => {
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    component.onScroll();
    expect(component['scrolled']()).toBe(true);
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('should destroy scroll observer on destroy', () => {
    component.ngOnDestroy();
    expect(mockScrollService.destroy).toHaveBeenCalled();
  });
});
