import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { resErrorInterceptor } from './core/interceptors/res-error.interceptor';
import { reqHeaderInterceptor } from './core/interceptors/req-header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes , withViewTransitions() , withHashLocation()), 
  provideClientHydration(withEventReplay()), 
  provideHttpClient(withFetch() , withInterceptors( [loadingInterceptor , resErrorInterceptor , reqHeaderInterceptor] )),
  importProvidersFrom(BrowserAnimationsModule , NgxSpinnerModule),
  provideToastr({tapToDismiss:true , timeOut: 2000})
],

};
