import { Component, computed, effect, signal } from '@angular/core';
import { DealList } from '../../ui/deal-list/deal-list';
import { DealListItem } from '../../ui/deal-list-item/deal-list-item';
import { DealDetailCard } from '../../ui/deal-detail-card/deal-detail-card';
import { Button, ButtonDirective } from 'primeng/button';
import { mockDeals } from '../../data/mock-deals';
import { Deal } from '../../model/types';
import { UIPageHeader } from '../../../../shared/ui/page/page-header/page-header';
import { UIMasterDetail } from '../../../../shared/ui/layout/master-detail/master-detail';

@Component({
  imports: [DealList, DealListItem, DealDetailCard, ButtonDirective, UIPageHeader, UIMasterDetail],
  selector: 'app-deals-search',
  template: `
    <ui-page-header title="Deals">
      <button pButton outlined>New Deal</button>
    </ui-page-header>

    <ui-master-detail>
      <app-deal-list
        ui-master
        [items]="deals()"
        [selectedId]="selectedDealId()"
        (selected)="selectDealById($event)"
        #dealListRef
      />

      <app-deal-detail-card [deal]="selectedDeal()"></app-deal-detail-card>
    </ui-master-detail>
  `,
})
export class DealsSearch {
  deals = signal<Deal[]>(mockDeals);

  selectedDealId = signal<Deal['id']>('d2');

  selectedDeal = signal<Deal | undefined>(undefined);
  message = signal<Error | null>(null);

  loadDealEffect = effect(async (onCleanup) => {
    const id = this.selectedDealId();

    // No seelction
    if (!id) return;

    const huston = new AbortController();
    onCleanup(() => huston.abort());
    try {
      const resp = await fetch('http://localhost:3000/api/deals', {
        headers: { Authorization: `Bearer ${'mock_access_u1'}` },
        signal: huston.signal,
      });
      resp.json();
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) this.message.set(e);
    }
  });

  selectDealById(id: Deal['id']) {
    this.selectedDealId.set(id);
  }

  // ngOnInit(){}
  // ngOnChanges(){}
  // ngOnDestroy(){}
}
