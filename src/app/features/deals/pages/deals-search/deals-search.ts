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

  // Request
  selectedDealId = signal<Deal['id']>('');

  // Result
  selectedDeal = signal<Deal | undefined>(undefined);

  // Effect
  loadDealEffect = effect((onCleanup) => {
    const id = this.selectedDealId();
    const dealsData = this.deals();

    if (!id) return;

    console.log(`Request ${id}`);

    // await null; // read signals before

    const handler = setTimeout(() => {
      console.log(`Response ${id}`);
      this.selectedDeal.set(dealsData.find((d) => d.id === id));
    }, 2000 * Math.random());

    onCleanup(() => clearTimeout(handler)); // Before next run and on destory!
  });

  selectDealById(id: Deal['id']) {
    this.selectedDealId.set(id);
  }

  // ngOnInit(){}
  // ngOnChanges(){}
  // ngOnDestroy(){}
}
