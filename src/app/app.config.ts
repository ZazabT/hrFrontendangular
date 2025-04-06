import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';  // Adjust this path
import { NgModule } from '@angular/core';  // Or adjust to your configuration system

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes) , provideHttpClient() , {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,  // Keep this true to allow multiple interceptors if needed
  },]
};
