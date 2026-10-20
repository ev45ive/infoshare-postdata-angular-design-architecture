import { Signal, signal, effect, inject, computed, isSignal, resource } from '@angular/core';
import { Deal } from '@feature/deals/model/types';
import { API_URL, API_TOKEN } from '@core/tokens';

// Type Guards Functions - function isSignal(value: unknown): value is Signal<unknown>

// Util/Helper - https://ngrx.io/guide/signals/signal-method
const valueOrSignal = <T>(source: T | Signal<T> | (() => T)): Signal<T> =>
  computed(() => {
    if (isSignal(source)) return source();
    return typeof source === 'function' ? (source as () => T)() : source;
  });

export function useDeals<T extends { id: string }>(
  idFn: T['id'] | Signal<T['id']> | (() => T['id']),
  initial: T[] = [],
) {
  const id = valueOrSignal(idFn);

  const APIURL = inject(API_URL);
  const APIToken = inject(API_TOKEN);

  return resource<Deal[], { id: string }>({
    // Track params
    params: () => ({ id: id() }),

    // Reload
    loader: async ({ abortSignal, params: { id } }) => {
      const resp = await fetch(`${APIURL}deals`, {
        headers: { Authorization: `Bearer ${APIToken}` },
        signal: abortSignal,
      });
      return resp.json(); // Trust youre API?
    },
  });
}
