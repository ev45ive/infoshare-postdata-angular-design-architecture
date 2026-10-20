import { Signal, signal, effect } from '@angular/core';
import { Deal } from '../model/types';

export function useDeals(id: Signal<Deal['id']>, initial: Deal[] = []): Signal<Deal[]> {
  const deals = signal<Deal[]>(initial);

  effect(async (onCleanup) => {
    if (!id) return;

    const huston = new AbortController();
    onCleanup(() => huston.abort()); // On effect rerun / component Destory!

    try {
      const resp = await fetch('http://localhost:3000/api/deals', {
        headers: { Authorization: `Bearer ${'mock_access_u1'}` },
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
