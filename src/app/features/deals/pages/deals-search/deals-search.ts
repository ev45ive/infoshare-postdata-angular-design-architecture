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
      <div class="grid gap-5 grid-cols-[300px_1fr]">
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

  // Effect - Async Call(Me)Back()
  loadDealEffect = effect(() => {
    // effect[currentEffectSymbol] = this
    
    const id = this.selectedDealId();  // .get() -> signalSubscibersSet.add(currentEffectSymbol)
    
    setTimeout(() => {
      this.selectedDeal.set(this.deals().find((d) => d.id === id));
    }, 1000);
    
    // effect[currentEffectSymbol] = null
  });

  // Synchroniczny - Return!
  // selectedDeal = computed(() => {
  //   const id = this.selectedDealId(); // tracked!
  //   return this.deals().find((d) => d.id === id);
  // });

  selectDealById(id: Deal['id']) {
    // this.selectedDealId() // no current effect observing - no tracking !


    this.selectedDealId.set(id); // Set -> mark observers DIRTY -> schedule effects
  }
}
