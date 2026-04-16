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

// Feature components — imported for @defer lazy rendering
import { HeroComponent }           from './features/hero/hero.component';
import { ProjectsComponent }       from './features/projects/projects.component';
import { ExperienceComponent }     from './features/experience/experience.component';
import { SkillsComponent }         from './features/skills/skills.component';
import { AchievementsComponent }   from './features/achievements/achievements.component';
import { CodingProfilesComponent } from './features/coding-profiles/coding-profiles.component';
import { AboutComponent }          from './features/about/about.component';
import { EducationComponent }      from './features/education/education.component';
import { CertificationsComponent } from './features/certifications/certifications.component';
import { ContactComponent }        from './features/contact/contact.component';

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
    ProjectsComponent,
    ExperienceComponent,
    SkillsComponent,
    AchievementsComponent,
    CodingProfilesComponent,
    AboutComponent,
    EducationComponent,
    CertificationsComponent,
    ContactComponent,
  ],
  template: `
    @if (loading()) {
      <app-loading-screen />
    } @else {
      <!-- Skip navigation link for keyboard accessibility -->
      <a class="skip-link" href="#main-content">Skip to main content</a>

      <app-background-effect />
      <app-navbar />

      <main id="main-content" role="main">

        <!-- Hero: render immediately on load (critical content) -->
        <app-hero />

        <!-- Remaining sections: defer until viewport intersection -->
        <section id="projects">
          @defer (on viewport) {
            <app-projects />
          } @placeholder {
            <div class="section-placeholder" aria-hidden="true"></div>
          }
        </section>

        <section id="experience">
          @defer (on viewport) {
            <app-experience />
          } @placeholder {
            <div class="section-placeholder" aria-hidden="true"></div>
          }
        </section>

        <section id="skills">
          @defer (on viewport) {
            <app-skills />
          } @placeholder {
            <div class="section-placeholder" aria-hidden="true"></div>
          }
        </section>

        <section id="achievements">
          @defer (on viewport) {
            <app-achievements />
          } @placeholder {
            <div class="section-placeholder" aria-hidden="true"></div>
          }
        </section>

        <section id="coding-profiles">
          @defer (on viewport) {
            <app-coding-profiles />
          } @placeholder {
            <div class="section-placeholder" aria-hidden="true"></div>
          }
        </section>

        <section id="about">
          @defer (on viewport) {
            <app-about />
          } @placeholder {
            <div class="section-placeholder" aria-hidden="true"></div>
          }
        </section>

        <section id="education">
          @defer (on viewport) {
            <app-education />
          } @placeholder {
            <div class="section-placeholder" aria-hidden="true"></div>
          }
        </section>

        <section id="certifications">
          @defer (on viewport) {
            <app-certifications />
          } @placeholder {
            <div class="section-placeholder" aria-hidden="true"></div>
          }
        </section>

        <section id="contact">
          @defer (on viewport) {
            <app-contact />
          } @placeholder {
            <div class="section-placeholder" aria-hidden="true"></div>
          }
        </section>

      </main>

      <app-footer />
      <app-scroll-top />
      <app-toast />
    }
  `,
  styles: [`
    main { position: relative; z-index: 1; }
    /* Placeholder height prevents layout shift during deferred load */
    .section-placeholder { min-height: 200px; }
  `],
})
export class App implements OnInit {
  private readonly seo  = inject(SeoService);
  readonly themeService = inject(ThemeService); // Triggers theme effect on init
  readonly loading      = signal(true);

  ngOnInit(): void {
    this.seo.setTags();
    this.seo.injectJsonLd();
    this.seo.updateCanonical();

    // Keep loader fast for better perceived performance
    setTimeout(() => this.loading.set(false), 800);
  }
}
