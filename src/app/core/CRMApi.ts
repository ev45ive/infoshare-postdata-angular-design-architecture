import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Deal } from '@feature/deals/model/types';
import { BehaviorSubject } from 'rxjs';
import { paths, components } from '@core/model/openapi.model';

// var -> T
// fn -> T
// promise -> request -> ...T

// T -> signal() -> T

// Observable(params)
//
//      -> Subscriber -> requestA -> next:T .. next: T .. compelete
//      -> Subscriber -> requestB -> next:T .. next: T .. error

// Stateless?

type Request = paths['/deals']['get']['responses']['200']['content']['application/json'];
type PageObject<T> = { items: T[]; total: number; offset: number };

@Service()
export class CRMAPI {
  http = inject(HttpClient);

  // Command / Query (Subscription) Separation

  // Multi-Cast Observable - N subscribes <-  1 next()
//   private _updates = new BehaviorSubject<Deal[]>([]); // updates.next
//   updates = this._updates.asObservable(); // Readonly

  fetchDeals() {
    // Unicast Observable<T> - Recipe - 1-1
    return this.http.get<PageObject<Deal>>('/deals', {
      params: {},
      headers: {},
    });
  }

  fetchDeal(id: string) {
    // Unicast observable - Recipe
    return this.http.get<Deal>(`/deals/${id}`, {
      params: {},
      headers: {},
    });
  }
}
