import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNGTheme } from '../design/primeng-theme';
import { routes } from './app.routes';
import { API_URL } from './features/deals/injectables/useDeals';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes), 
    providePrimeNGTheme()

    // {provide: API_URL, useValue:'http://localhost:3000/api/'}
    // {provide: API_URL, useValue:'http://localhost:9000/mock-api/'}
    // {provide:'', useValue:''}
  ],

};
