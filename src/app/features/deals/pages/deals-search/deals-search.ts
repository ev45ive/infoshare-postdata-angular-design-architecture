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
  selectedDealId = signal<Deal['id']>('d2');

  api = inject(CRMAPI);

  _ = effect(() => {
    // Observable
    const obs = this.api.fetchDeals();

    // Subscriber<T> -> Req1
    const sub = obs.subscribe(console.log);
    sub.unsubscribe(); // AbortControler.abort()

    // Subscriber<T> > -> Req1
    obs.subscribe({
      next: (vaLUE) => console.log(vaLUE),
      error: (e) => console.log(e),
      complete: () => console.log('Unsubcribed'),
    });
  });

  selectedDeal = signal<Deal | undefined>(undefined);

  dealsResource = useDeals<Deal>(() => this.selectedDealId());

  selectDealById(id: Deal['id']) {
    this.selectedDealId.set(id);
  }
}
