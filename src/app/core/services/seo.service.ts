import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta  = inject(Meta);
  private readonly title = inject(Title);

  private readonly BASE_URL = 'https://piyush-kumar.dev';
  private readonly BASE_IMG = `${this.BASE_URL}/assets/images/piyush.png`;

  private readonly defaultConfig: SeoConfig = {
    title: 'Piyush Kumar | Java Full Stack Developer',
    description: 'Portfolio of Piyush Kumar — Java Full Stack Developer specializing in Java, Spring Boot, Angular, MySQL, and AWS. Built 50+ REST APIs, real-time systems with WebSocket, and reduced API latency by 30–40%.',
    keywords: 'Piyush Kumar, Full Stack Developer, Java, Spring Boot, Angular, MySQL, AWS, REST API, WebSocket, Backend Developer, Portfolio',
    url: this.BASE_URL,
    image: this.BASE_IMG,
  };

  setTags(config: SeoConfig = {}): void {
    const merged = { ...this.defaultConfig, ...config };
    const { title, description, keywords, url, image } = merged;

    // Core meta
    this.title.setTitle(title!);
    this.meta.updateTag({ name: 'description',   content: description! });
    this.meta.updateTag({ name: 'keywords',      content: keywords! });
    this.meta.updateTag({ name: 'author',        content: 'Piyush Kumar' });
    this.meta.updateTag({ name: 'robots',        content: 'index, follow' });

    // Open Graph
    this.meta.updateTag({ property: 'og:type',        content: 'website' });
    this.meta.updateTag({ property: 'og:title',       content: title! });
    this.meta.updateTag({ property: 'og:description', content: description! });
    this.meta.updateTag({ property: 'og:url',         content: url! });
    this.meta.updateTag({ property: 'og:image',       content: image! });
    this.meta.updateTag({ property: 'og:locale',      content: 'en_US' });
    this.meta.updateTag({ property: 'og:site_name',   content: 'Piyush Kumar Portfolio' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card',        content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:creator',     content: '@PIYUSH_KUMAR6' });
    this.meta.updateTag({ name: 'twitter:title',       content: title! });
    this.meta.updateTag({ name: 'twitter:description', content: description! });
    this.meta.updateTag({ name: 'twitter:image',       content: image! });
  }

  updateCanonical(path: string = ''): void {
    // Update or create the canonical link element
    const canonicalUrl = `${this.BASE_URL}${path}`;
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);
  }

  // NOTE: JSON-LD is already in index.html as a static script tag.
  // This method is kept for any dynamic injection needed in the future.
  injectJsonLd(): void {
    // Avoid duplicating JSON-LD that is already in index.html
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Piyush Kumar',
      url: this.BASE_URL,
      sameAs: [
        'https://github.com/Piyush-Kumar62',
        'https://www.linkedin.com/in/piyush-kumar62/',
        'https://x.com/PIYUSH_KUMAR6'
      ],
      jobTitle: 'Java Full Stack Developer',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Centurion University of Technology and Management'
      },
      knowsAbout: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'AWS', 'REST APIs', 'WebSocket'],
    });
    document.head.appendChild(script);
  }
}
