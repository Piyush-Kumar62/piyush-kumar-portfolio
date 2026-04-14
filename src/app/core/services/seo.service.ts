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
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  private readonly defaultConfig: SeoConfig = {
    title: 'Piyush Kumar',
    description: 'Portfolio of Piyush Kumar — Full Stack Java Developer specializing in Java, Spring Boot, Angular, MySQL, and AWS. Built 50+ REST APIs, real-time systems with WebSocket, and reduced API latency by 30-40%.',
    keywords: 'Piyush Kumar, Full Stack Developer, Java, Spring Boot, Angular, MySQL, AWS, REST API, WebSocket, Portfolio',
    url: 'https://piyush-kumar.dev',
    image: '/assets/images/piyush.png',
  };

  setTags(config: SeoConfig = {}): void {
    const merged = { ...this.defaultConfig, ...config };
    const { title, description, keywords, url, image } = merged;

    this.title.setTitle(title!);
    this.meta.updateTag({ name: 'description', content: description! });
    this.meta.updateTag({ name: 'keywords', content: keywords! });
    this.meta.updateTag({ name: 'author', content: 'Piyush Kumar' });
    this.meta.updateTag({ property: 'og:title', content: title! });
    this.meta.updateTag({ property: 'og:description', content: description! });
    this.meta.updateTag({ property: 'og:url', content: url! });
    this.meta.updateTag({ property: 'og:image', content: image! });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title! });
    this.meta.updateTag({ name: 'twitter:description', content: description! });
  }

  injectJsonLd(): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Piyush Kumar',
      url: 'https://piyush-kumar.dev',
      sameAs: [
        'https://github.com/Piyush-Kumar62',
        'https://www.linkedin.com/in/piyush-kumar62/',
        'https://x.com/PIYUSH_KUMAR6'
      ],
      jobTitle: 'Full Stack Java Developer',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Centurion University of Technology and Management'
      },
      knowsAbout: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'AWS', 'REST APIs', 'WebSocket'],
    });
    document.head.appendChild(script);
  }
}
