import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  provideBrowserGlobalErrorListeners,
  isDevMode
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';

import {
  TranslateModule,
  TranslateLoader
} from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';


// ================= FIX: loader =================
export function HttpLoaderFactory(http: HttpClient) {
 return new TranslateHttpLoader(
  http,
  '/i18n/',
  '.json'
);}
export const appConfig: ApplicationConfig = {

  providers: [

    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    provideRouter(routes),

    provideHttpClient(withFetch()),

    provideAnimations(),

    provideClientHydration(withEventReplay()),

    // ================= TRANSLATE FIX =================
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),

    // ================= SERVICE WORKER =================
    provideServiceWorker(
      'ngsw-worker.js',
      {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
      }
    )

  ]
};