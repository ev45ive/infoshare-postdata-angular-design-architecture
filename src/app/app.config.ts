import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNGTheme } from '../design/primeng-theme';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor, ErrorInterceptor, URLInterceptor } from '@core/interceptors/index-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNGTheme(),

    provideHttpClient(
      withInterceptors([
        URLInterceptor({}),
        AuthInterceptor,
        ErrorInterceptor
      ]) 
    )

    // {provide: API_URL, useValue:'http://localhost:3000/api/'}
    // {provide: API_URL, useValue:'http://localhost:9000/mock-api/'}
    // {provide:'', useValue:''}
  ],
};
