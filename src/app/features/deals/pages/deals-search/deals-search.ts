import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { DealList } from '../../ui/deal-list/deal-list';
import { DealListItem } from '../../ui/deal-list-item/deal-list-item';
import { DealDetailCard } from '../../ui/deal-detail-card/deal-detail-card';
import { Button, ButtonDirective } from 'primeng/button';
import { mockDeals } from '../../data/mock-deals';
import { Deal } from '../../model/types';
import { UIPageHeader } from '../../../../shared/ui/page/page-header/page-header';
import { UIMasterDetail } from '../../../../shared/ui/layout/master-detail/master-detail';
import { useDeals } from '../../injectables/useDeals';
import { UiCard } from '../../../../shared/components/ui-card/ui-card';
import { UiIntent } from '../../../../shared/ui/intent/intent';
import { CRMAPI } from '@shared/CRMApi';
import { catchError, concatMap, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs';
import { unsubscribe } from 'diagnostics_channel';

import {
  toObservable,
  toSignal,
  outputFromObservable,
  rxResource,
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';

@Component({
  imports: [
    DealList,
    DealListItem,
    DealDetailCard,
    ButtonDirective,
    UIPageHeader,
    UIMasterDetail,
    UiCard,
    UiIntent,
  ],
  selector: 'app-deals-search',
  template: `
    <ui-page-header title="Deals">
      <button pButton outlined>New Deal</button>
    </ui-page-header>

    <ui-master-detail>
      <app-deal-list
        ui-master
        [items]="dealsResource.value()"
        [selectedId]="selectedDealId()"
        (selected)="selectDealById($event)"
        #dealListRef
      />

      @if (dealsResource.error()) {
        <ui-card [title]="dealsResource.error()" uiIntent="danger" />
      }

      <app-deal-detail-card [deal]="selectedDeal()" />

      <!-- TODO: form -->
    </ui-master-detail>
  `,
})
export class DealsSearch {
  api = inject(CRMAPI);

  dealsResource = useDeals<Deal>(() => this.selectedDealId());



  // Recipe
  deals$ = this.api.fetchDeals().pipe();

  // Eager effect
  deals = toSignal(this.deals$, { initialValue: [] });

  selectedDealId = signal<Deal['id']>('d2');

  dealLoading = toObservable(this.selectedDealId).pipe(
    switchMap((id) => this.api.fetchDealById(id)),
  );

  selectedDeal = toSignal(this.dealLoading);

  selectDealById(id: Deal['id']) {
    this.selectedDealId.set(id);
  }


}
