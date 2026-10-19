import { Component } from '@angular/core';
import { DealList } from '../../ui/deal-list/deal-list';
import { DealListItem } from '../../ui/deal-list-item/deal-list-item';
import { DealDetailCard } from '../../ui/deal-detail-card/deal-detail-card';
import { Button, ButtonDirective } from 'primeng/button';

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
          <app-deal-list></app-deal-list>
        </div>
        <div>
          <app-deal-detail-card></app-deal-detail-card>
        </div>
      </div>
    </div>
  `,
})
export class DealsSearch {}
