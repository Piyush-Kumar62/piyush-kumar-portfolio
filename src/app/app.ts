import {
  Component, OnInit, signal, ChangeDetectionStrategy, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent }          from './layout/navbar/navbar.component';
import { FooterComponent }          from './layout/footer/footer.component';
import { BackgroundEffectComponent } from './shared/components/background-effect/background-effect.component';
import { LoadingScreenComponent }   from './shared/components/loading-screen/loading-screen.component';
import { ScrollTopComponent }       from './shared/components/scroll-top/scroll-top.component';
import { ToastComponent }           from './shared/components/toast/toast.component';

import { HeroComponent }            from './features/hero/hero.component';
import { AboutComponent }           from './features/about/about.component';
import { EducationComponent }       from './features/education/education.component';
import { ExperienceComponent }      from './features/experience/experience.component';
import { AchievementsComponent }    from './features/achievements/achievements.component';
import { ProjectsComponent }        from './features/projects/projects.component';
import { SkillsComponent }          from './features/skills/skills.component';
import { CertificationsComponent }  from './features/certifications/certifications.component';
import { CodingProfilesComponent }  from './features/coding-profiles/coding-profiles.component';
import { ContactComponent }         from './features/contact/contact.component';

import { SeoService }   from './core/services/seo.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    BackgroundEffectComponent,
    LoadingScreenComponent,
    ScrollTopComponent,
    ToastComponent,
    HeroComponent,
    AboutComponent,
    EducationComponent,
    ExperienceComponent,
    AchievementsComponent,
    ProjectsComponent,
    SkillsComponent,
    CertificationsComponent,
    CodingProfilesComponent,
    ContactComponent,
  ],
  template: `
    @if (loading()) {
      <app-loading-screen />
    } @else {
      <app-background-effect />
      <app-navbar />

      <main id="main-content" role="main">
        <app-hero />
        <app-projects />
        <app-experience />
        <app-skills />
        <app-achievements />
        <app-coding-profiles />
        <app-about />
        <app-education />
        <app-certifications />
        <app-contact />
      </main>

      <app-footer />
      <app-scroll-top />
      <app-toast />
    }
  `,
  styles: [`
    main { position: relative; z-index: 1; }
  `],
})
export class App implements OnInit {
  private readonly seo   = inject(SeoService);
  readonly themeService  = inject(ThemeService); // triggers effect on init
  readonly loading       = signal(true);

  ngOnInit(): void {
    this.seo.setTags();
    this.seo.injectJsonLd();

    // Keep loader snappy for better perceived performance
    setTimeout(() => this.loading.set(false), 1000);
  }
}
