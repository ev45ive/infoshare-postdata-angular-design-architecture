import { Signal, signal, effect, inject, computed, isSignal, resource } from '@angular/core';
import { Deal } from '@feature/deals/model/types';
import { API_URL, API_TOKEN } from '@core/tokens';
import { CRMAPI } from '@core/CRMApi';
import { lastValueFrom, withLatestFrom } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { httpResource } from '@angular/common/http';

// Type Guards Functions - function isSignal(value: unknown): value is Signal<unknown>

// Util/Helper - https://ngrx.io/guide/signals/signal-method
const valueOrSignal = <T>(source: T | Signal<T> | (() => T)): Signal<T> =>
  computed(() => {
    if (isSignal(source)) return source();
    return typeof source === 'function' ? (source as () => T)() : source;
  });

export function useDeals(q: Signal<string>, defaultValue: Deal[] = []) {
  const api = inject(CRMAPI);

  return rxResource<Deal[], { q: string }>({
    params: () => ({ q: q() }),

    stream(params) {
      return api.fetchDeals(params.params.q);
    },
    defaultValue,
  });
}

export function useDeal(id: Signal<string>, initial: Deal[] = []) {
  const api = inject(CRMAPI);

  return resource<Deal, { id: string }>({
    // Track params
    params: () => ({ id: id() }),

    // Reload
    loader: async ({ abortSignal, params: { id } }) => {
      return lastValueFrom(api.fetchDealById(id));
    },
  });
}

export function useDealsQuery(q: Signal<string>) {
  //   return httpResource(() => `/deals?q=${q()}`, { defaultValue: [] });

  //   // HttpCLient stack -> Resource
  return httpResource<Deal[]>(
    () => ({
      url: '/deals',
      params: { q: q() },
    }),
    { defaultValue: [] },
  );
}
