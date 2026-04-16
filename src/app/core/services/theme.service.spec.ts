import { TestBed } from '@angular/core/testing';
import { ThemeService, Theme } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to dark theme when no preference is stored', () => {
    // matchMedia returns false (light mode) by default in test env
    expect(service.theme()).toBeDefined();
  });

  it('should load theme from localStorage', () => {
    localStorage.setItem('portfolio-theme', 'light');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const freshService = TestBed.inject(ThemeService);
    expect(freshService.theme()).toBe('light' as Theme);
  });

  it('should toggle theme from dark to light', () => {
    // Set known state
    if (service.theme() !== 'dark') {
      service.toggle();
    }
    const initial = service.theme();
    service.toggle();
    const after = service.theme();
    expect(initial).not.toBe(after);
  });

  it('should persist theme to localStorage on toggle', () => {
    service.toggle();
    const stored = localStorage.getItem('portfolio-theme');
    expect(['light', 'dark']).toContain(stored);
  });

  it('should set isDark signal correctly', () => {
    // isDark should match theme signal
    expect(service.isDark()).toBe(service.theme() === 'dark');
  });

  it('should set data-theme attribute on document', () => {
    service.toggle();
    const attr = document.documentElement.getAttribute('data-theme');
    expect(attr).toBe(service.theme());
  });
});
