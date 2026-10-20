import {
  Signal,
  signal,
  effect,
  Injector,
  InjectionToken,
  inject,
  Injectable,
  Service,
} from '@angular/core';
import { Deal } from '../model/types';
import { mockDeals } from '../data/mock-deals';

export function useDeals(id?: Signal<Deal['id']>, initial: Deal[] = []): Signal<Deal[]> {
  const deals = signal<Deal[]>(initial);

  const APIURL = inject(API_URL);
  const APIToken = inject(API_TOKEN);

  effect(async (onCleanup) => {
    if (!id) return;

    const huston = new AbortController();
    onCleanup(() => huston.abort()); // On effect rerun / component Destory!

    try {
      const resp = await fetch(`${APIURL}deals`, {
        headers: { Authorization: `Bearer ${APIToken}` },
        signal: huston.signal,
      });

      // const result:unknown = await resp.json();
      const result: Deal[] = await resp.json(); // Trust youre API?

      deals.set(result);
    } catch (e: unknown) {
      console.error(e);
      // if (e instanceof Error) this.message.set(e);
    }
  });

  return deals;
}

// Object Oriented - Service - SOLID:

// Abstract - Contract ( Role - CV )
export interface DealsSource {
  fetchDeals(): Deal[];
  //   fetchDeal(id:string): Deal[];
}
export const DealsSource = new InjectionToken<DealsSource>('DealsSource');

/// -------

export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000/api/',
});

export const API_TOKEN = new InjectionToken<string>('API_TOKEN', {
  providedIn: 'root',
  factory: () => 'mock_access_u1',
});

// Concrete - Implementation ( Staszek - Backend i Frontend )

// @Injectable({ providedIn: 'root' }) // Singleton

// @Service() // Lazy Instantiated app root level Singleton (app lifetime)
// export class DealsService implements DealsSource {
//   //   _internal = 'secret'; // no local state // stateless service

//  constructor( @Inject(API_URL) url: string){}

//   API_URL = inject(API_URL);
//   APIToken = inject(API_TOKEN);

//   fetchDeals(): Deal[] {
//     return mockDeals;
//   }

//   ngOnDestory() {}
// }

// When implmentation split

// export const DealsService = new InjectionToken()
// DealsServiceA implements DealsService   // Provided in Deals
// DealsServiceB implements DealsService   // Provifed in Contracts
