import { Component, computed, effect, signal } from '@angular/core';
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
      <div class="grid gap-5 sm:grid-cols-[minmax(300px,1fr)_1fr]">
        <div>
          <app-deal-list
            [items]="deals()"
            [selectedId]="selectedDealId()"
            (selected)="selectDealById($event)"
            #dealListRef
          />
        </div>

        <div>
          <app-deal-detail-card [deal]="selectedDeal()"></app-deal-detail-card>
        </div>
      </div>
    </div>
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
