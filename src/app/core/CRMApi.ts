import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Deal } from '@feature/deals/model/types';
import { BehaviorSubject, map, tap } from 'rxjs';
import { paths, components } from '@core/model/openapi.model';

type Request = paths['/deals']['get']['responses']['200']['content']['application/json'];
type PageObject<T> = { items: T[]; total: number; offset: number };

@Service()
export class CRMAPI {
  http = inject(HttpClient);

  fetchDeals() {
    return this.http
      .get<PageObject<Deal>>('deals', {
        params: {},
        headers: {},
      })
      .pipe(map((res) => res.items));
  }

  fetchDeal(id: string) {
    // Unicast observable - Recipe
    return this.http.get<Deal>(`deals/${id}`, {
      params: {},
      headers: {},
    });
  }
}
