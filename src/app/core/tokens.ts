import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000/api/',
});

export const API_TOKEN = new InjectionToken<string>('API_TOKEN', {
  providedIn: 'root',
  factory: () => 'mock-access-u1',
});
