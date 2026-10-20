// Object Oriented - Service - SOLID:

import { InjectionToken, Injectable, Service, Inject, inject } from '@angular/core';
import { API_URL, API_TOKEN } from '../../../core/tokens';
import { Deal } from '../model/types';
import { mockDeals } from './mock-deals';

// Abstract - Contract ( Role - CV )
export interface DealsSource {
  fetchDeals(): Deal[];
  //   fetchDeal(id:string): Deal[];
}
export const DealsSource = new InjectionToken<DealsSource>('DealsSource');

// Concrete - Implementation ( Staszek - Backend i Frontend )

// @Injectable({ providedIn: 'root' }) // Singleton
//   constructor(@Inject(API_URL) url: string) {}

// Lazy Instantiated app root level Singleton (app lifetime)
@Service()
export class DealsStore implements DealsSource {
  API_URL = inject(API_URL);
  APIToken = inject(API_TOKEN);

  fetchDeals(): Deal[] {
    return mockDeals;
  }

  ngOnDestory() {}
}

// When implmentation splits (v2.0)

// export const DealsService = new InjectionToken()
// DealsServiceA implements DealsService   // Provided in Deals
// DealsServiceB implements DealsService   // Provifed in Contracts
