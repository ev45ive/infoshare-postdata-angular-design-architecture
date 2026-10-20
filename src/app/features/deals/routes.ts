import { ActivatedRouteSnapshot, Route, RouterStateSnapshot } from '@angular/router';
import { DealsSearch } from './pages/deals-search/deals-search';
import { DealDetailCard } from './ui/deal-detail-card/deal-detail-card';
import { inject } from '@angular/core';
import { CRMAPI } from '@core/CRMApi';
import { DealsStore } from './data/DealsStore';

const DealDetailsResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const api = inject(CRMAPI);
  const id = route.paramMap.get('id') ?? '';
  return api.fetchDealById(id);
};
export default [
  {
    path: '',
    children: [
      {
        path: '' /* ?id=123 -> input() */,
        component: DealsSearch,
        children: [
          {
            path: ':id',
            data: {
              config: '',
            },
            resolve: {
              deal: DealDetailsResolver,
            },
            providers: [
              // DealsStore
            ],
            canActivate: [],
            canDeactivate: [],
            component: DealDetailCard,
          },
        ],
      },
    ],
  },
] satisfies Route[];

// export const banana = 123;
