import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  PreloadAllModules,
  withComponentInputBinding
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { routes } from './app.routes';

// Application-level providers — keep this file lean
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withPreloading(PreloadAllModules),   // Preload lazy routes in browser idle time
      withComponentInputBinding()          // Allow route params as @Input() on components
    ),
    provideAnimations(),
    provideHttpClient(withFetch()),        // Native fetch-based HTTP client
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),               // Only activate SW in production builds
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
};
