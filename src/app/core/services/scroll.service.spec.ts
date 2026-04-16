import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollService);
  });

  afterEach(() => {
    service.destroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize activeSection signal to "hero"', () => {
    expect(service.activeSection()).toBe('hero');
  });

  it('should call destroy without errors when observer not initialized', () => {
    const newService = TestBed.inject(ScrollService);
    expect(() => newService.destroy()).not.toThrow();
  });

  it('should initialize section observer without throwing', () => {
    // Create DOM elements for the observer
    const heroEl = document.createElement('section');
    heroEl.id = 'hero';
    document.body.appendChild(heroEl);

    expect(() => service.initSectionObserver(['hero'])).not.toThrow();

    document.body.removeChild(heroEl);
  });

  it('should handle scrollTo on non-existent element gracefully', () => {
    expect(() => service.scrollTo('non-existent-section')).not.toThrow();
  });

  it('should handle scrollToTop without errors', () => {
    expect(() => service.scrollToTop()).not.toThrow();
  });

  it('should disconnect observer on destroy', () => {
    const heroEl = document.createElement('section');
    heroEl.id = 'hero';
    document.body.appendChild(heroEl);

    service.initSectionObserver(['hero']);
    expect(() => service.destroy()).not.toThrow();

    document.body.removeChild(heroEl);
  });
});
