import { Component, input } from '@angular/core';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { DealStatusBadge } from '../deal-status-badge/deal-status-badge';
import { Deal } from '../../model/types';
import { CurrencyPipe } from '@angular/common';
import {
  UiCard,
  UiCardHeader,
  UiCardFooter,
  UiCardActions,
} from '../../../../shared/components/ui-card/ui-card';

@Component({
  imports: [
    CurrencyPipe,
    ButtonDirective,
    ButtonModule,
    DealStatusBadge,
    UiCard,
    UiCardHeader,
    UiCardFooter,
    UiCardActions,
  ],
  selector: 'app-deal-detail-card',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    @if (deal(); as deal) {
      <ui-card class="grid gap-5 @container/deal-card">
        <ui-card-header [title]="deal.title">
          <div ui-card-subtitle>{{ deal.description }}</div>
        </ui-card-header>

        <!--  -->

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
        <ui-card-actions>
          <button [pButton]>Edit</button>
        </ui-card-actions>
      </ui-card>
    } @else {
      <ui-card>No deal selected</ui-card>
    }
  `,
})
export class DealDetailCard {
  deal = input<Deal>();
  // deal = input.required<Deal>();
}
