import { Component, signal } from '@angular/core';
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
    <div class="grid gap-5 p-5">
      <div class="flex justify-between gap-5">
        <h1 class="text-2xl">Deals</h1>
        <button pButton="">New Deal</button>
      </div>
      <div class="grid grid-cols-[300px_1fr]">
        <div>
          <app-deal-list [items]="deals()"></app-deal-list>
        </div>
        <div>
          <app-deal-detail-card [deal]="selectedDeal()"></app-deal-detail-card>
        </div>
      </div>
    </div>
  `,
})
export class DealsSearch {
  deals = signal(mockDeals);

  selectedDeal = signal(mockDeals[0]);

  selectDealById(id: Deal['id']) {
    const result = this.deals().find((d) => d.id === id); // Deal | undefined

    if (!result) return; // Type Guard / Function Guard
    // if (!result) throw new Error('');

    // Happy path:
    this.selectedDeal.set(result);
  }
}
