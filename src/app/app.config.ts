import Aura from '@primeng/themes/aura';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
  withFetch,
} from '@angular/common/http';
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(), // Añade esta línea
      withInterceptors([authInterceptor]),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'html[data-theme="light"]',
          lightModeSelector: 'html[data-theme="light"]',
        },
      },
    }),
  ],
};
