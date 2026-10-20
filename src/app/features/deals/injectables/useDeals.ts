import { Signal, signal, effect, inject } from '@angular/core';
import { Deal } from '@feature/deals/model/types';
import { API_URL, API_TOKEN } from '@core/tokens';

export function useDeals(id?: Signal<Deal['id']>, initial: Deal[] = []): Signal<Deal[]> {
  const deals = signal<Deal[]>(initial);

  const APIURL = inject(API_URL);
  const APIToken = inject(API_TOKEN);

  /* TODO: Cleanup */
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
