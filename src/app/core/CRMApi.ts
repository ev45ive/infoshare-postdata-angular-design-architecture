import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Deal } from '@feature/deals/model/types';
import { BehaviorSubject } from 'rxjs';

// var -> T
// fn -> T
// promise -> request -> ...T

// Observable(params)
//
//      -> Subscriber -> requestA -> next:T .. next: T .. compelete
//      -> Subscriber -> requestB -> next:T .. next: T .. error

// Stateless?

@Service()
export class CRMAPI {
  http = inject(HttpClient);

  // Command / Query (Subscription) Separation

  // Multi-Cast Observable - N subscribes <-  1 next()
  private _updates = new BehaviorSubject<Deal[]>([]); // updates.next
  updates = this._updates.asObservable(); // Readonly

  fetchDeals() {
    // Unicast Observable<T> - Recipe - 1-1
    return this.http.get<Deal[]>('/deals', {
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
