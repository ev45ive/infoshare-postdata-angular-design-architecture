import { Component, input } from '@angular/core';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { DealStatusBadge } from '../deal-status-badge/deal-status-badge';
import { Deal } from '../../model/types';
import { CurrencyPipe } from '@angular/common';
import { UiCard } from '../../../../shared/components/ui-card/ui-card';

@Component({
  imports: [CurrencyPipe, ButtonDirective, ButtonModule, DealStatusBadge, UiCard],
  selector: 'app-deal-detail-card',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <ui-card>
      @if (deal(); as deal) {
        <div class="grid gap-5 p-5 @container/deal-card">

        <!--  -->
          <div class="grid gap-2">
            <div class="flex justify-between">
              <h2 class="text-2xl flex-[1_1_60%]">{{ deal.title }}</h2>
              <div class="flex gap-2 ms-auto ">
                <app-deal-status-badge size="full" [stage]="deal.stage" />
              </div>
            </div>

            <div class="overflow-y-auto line-clamp-3">
              {{ deal.description }}
            </div>
          </div>

          <!-- Emmet + Tailwind  -->
          <!-- .grid.grid-cols-2.gap-5>.grid.gap-2*3>.font-semibold{Label}+div{Content} -->
          <!-- .grid.grid-cols-2.gap-5>.grid.gap-2*3>.font-semibold+div -->

          <!-- <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5"> -->
          <div class="grid grid-cols-1 @sm/deal-card:grid-cols-3 @md/deal-card:grid-cols-4 gap-5">
            <div class="flex gap-2">
              <div class="font-semibold">Value</div>
              <div>{{ deal.value | currency }}</div>
            </div>
            <div class="flex gap-2">
              <div class="font-semibold">Contact</div>
              <div>
                {{ deal.contactId }}
              </div>
            </div>
            <div class="flex gap-2">
              <div class="font-semibold">Public</div>
              <div
                class="border-b-2"
                [class]="{
                  'text-deal-public': deal.public,
                  'text-deal-private': !deal.public,
                }"
              >
                {{ deal.public ? 'Yes' : 'No' }}
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button [pButton]>Edit</button>
          </div>
        </div>
      } @else {
        <div class="grid p-5">No deal selected</div>
      }
    </ui-card>
  `,
})
export class DealDetailCard {
  deal = input<Deal>();
  // deal = input.required<Deal>();
}
