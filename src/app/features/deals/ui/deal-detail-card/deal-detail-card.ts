import { Component, input } from '@angular/core';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { DealStatusBadge } from '../deal-status-badge/deal-status-badge';
import { Deal } from '../../model/types';
import { CurrencyPipe } from '@angular/common';
import { UiCard } from '../../../../shared/ui/card/card';
import { UiCardHeader, UiCardActions, UiCardFooter } from '../../../../shared/ui/card/card-parts';
import { UiFieldGrid } from '../../../../shared/ui/field-grid/field-grid';

@Component({
  imports: [
    CurrencyPipe,
    ButtonDirective,
    ButtonModule,
    DealStatusBadge,
    UiCard,
    UiCardActions,
    UiCardHeader,
    UiFieldGrid,
    UiCardFooter,
  ],
  selector: 'app-deal-detail-card',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    @if (deal(); as deal) {
      <ui-card class="grid gap-5 @container/deal-card" [title]="deal.title">
        <div ui-card-subtitle>{{ deal.description }}</div>

        <ui-field-grid [cols]="3">
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
        </ui-field-grid>

        <ui-card-footer>
          <button actions-start pButton text>Learn more</button>
          <button [pButton]>Edit</button>
        </ui-card-footer>
      </ui-card>
    } @else {
      <ui-card title="No deal selected" variant="outlined" />
    }
  `,
})
export class DealDetailCard {
  deal = input<Deal>();
  // deal = input.required<Deal>();
}
