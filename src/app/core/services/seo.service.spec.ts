import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';
import { Title, Meta } from '@angular/platform-browser';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the page title with default config', () => {
    service.setTags();
    expect(titleService.getTitle()).toContain('Piyush Kumar');
  });

  it('should set a custom title when provided', () => {
    service.setTags({ title: 'Custom Title' });
    expect(titleService.getTitle()).toBe('Custom Title');
  });

  it('should set og:title meta tag', () => {
    service.setTags({ title: 'OG Title Test' });
    const tag = metaService.getTag("property='og:title'");
    expect(tag?.content).toBe('OG Title Test');
  });

  it('should set twitter:creator meta tag', () => {
    service.setTags();
    const tag = metaService.getTag("name='twitter:creator'");
    expect(tag?.content).toBe('@PIYUSH_KUMAR6');
  });

  it('should set og:locale meta tag', () => {
    service.setTags();
    const tag = metaService.getTag("property='og:locale'");
    expect(tag?.content).toBe('en_US');
  });

  it('should set og:site_name meta tag', () => {
    service.setTags();
    const tag = metaService.getTag("property='og:site_name'");
    expect(tag?.content).toContain('Portfolio');
  });

  it('should set description meta tag', () => {
    service.setTags({ description: 'Test description' });
    const tag = metaService.getTag("name='description'");
    expect(tag?.content).toBe('Test description');
  });

  it('should not duplicate JSON-LD if already present in DOM', () => {
    // First call should add
    service.injectJsonLd();
    const count1 = document.querySelectorAll('script[type="application/ld+json"]').length;
    // Second call should not add another
    service.injectJsonLd();
    const count2 = document.querySelectorAll('script[type="application/ld+json"]').length;
    expect(count2).toBe(count1);
  });

  it('should update canonical link element', () => {
    service.updateCanonical('/about');
    const canonical = document.querySelector("link[rel='canonical']");
    expect(canonical?.getAttribute('href')).toContain('/about');
  });
});
