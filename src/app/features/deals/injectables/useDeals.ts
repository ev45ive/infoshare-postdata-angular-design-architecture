import { Signal, signal, effect, inject, computed, isSignal } from '@angular/core';
import { Deal } from '@feature/deals/model/types';
import { API_URL, API_TOKEN } from '@core/tokens';

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

  const data = signal<T[]>(initial);

  const error = signal<Error | null>(null);
  const isLoading = signal<boolean>(false);

  const APIURL = inject(API_URL);
  const APIToken = inject(API_TOKEN);

  /* TODO: Cleanup */
  effect(async (onCleanup) => {
    if (!id) return;

    const huston = new AbortController();
    onCleanup(() => huston.abort()); // On effect rerun / component Destory!

    try {
      isLoading.set(true);
      error.set(null);

      const resp = await fetch(`${APIURL}deals`, {
        headers: { Authorization: `Bearer ${APIToken}` },
        signal: huston.signal,
      });

      // const result:unknown = await resp.json();
      const result: T[] = await resp.json(); // Trust youre API?

      data.set(result);
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) error.set(e);
    } finally {
      isLoading.set(false);
    }
  });

  return { value: data, error, isLoading /* refresh */ };
}
