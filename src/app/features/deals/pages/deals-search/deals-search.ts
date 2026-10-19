import { Component, computed, signal } from '@angular/core';
import { DealList } from '../../ui/deal-list/deal-list';
import { DealListItem } from '../../ui/deal-list-item/deal-list-item';
import { DealDetailCard } from '../../ui/deal-detail-card/deal-detail-card';
import { Button, ButtonDirective } from 'primeng/button';
import { mockDeals } from '../../data/mock-deals';
import { Deal } from '../../model/types';

@Component({
  imports: [DealList, DealListItem, DealDetailCard, ButtonDirective],
  selector: 'app-deals-search',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <!-- .grid>.flex.justify-between>h1{Deals}+button[p-button]{New Deal}^.grid.grid-cols-300px_1fr>div>app-deal-list^div>deal-detail-card -->
    <div class="grid gap-5 p-5 border">
      <div class="flex justify-between gap-5">
        <h1 class="text-2xl">Deals</h1>
        <button pButton="">New Deal</button>
      </div>
      <div class="grid gap-5 grid-cols-[300px_1fr]">
        <div>
          <app-deal-list
            [items]="deals()"
            [selectedId]="selectedDeal()?.id"
            (selected)="selectDealById($event)"
            #dealListRef
          />
        </div>

        <!-- {{localRefA.selectItem('123')}} -->

        <div>
          <app-deal-detail-card [deal]="selectedDeal()"></app-deal-detail-card>
        </div>
      </div>
    </div>
  `,
})
export class DealsSearch {
  deals = signal<Deal[]>(mockDeals);

  // selectedDeal = signal<Deal | undefined>(undefined);
  selectedDealId = signal<Deal['id']>('');

  // =SUM(A1,B2) + Lazy + Memoized (Cached)
  selectedDeal = computed(() => {
    console.log('Deal computed');

    const id = this.selectedDealId();

    return this.deals().find((d) => d.id === id);
  });

  selectDealById(id: Deal['id']) {
    this.selectedDealId.set(id);
  }
}
