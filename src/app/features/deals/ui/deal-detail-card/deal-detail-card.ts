import { Component } from '@angular/core';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { DealStatusBadge } from '../deal-status-badge/deal-status-badge';

@Component({
  imports: [ButtonDirective, ButtonModule, DealStatusBadge],
  selector: 'app-deal-detail-card',
  styles: `
    :host {
      display: block;
      /* padding:10px; - component does  control geometry! */
      /* margin:10px; - component does not control positioninig! */
    }
  `,
  template: `
    <div class="flex justify-between">
      <span class="text-2xl">Test Deal name</span>
      <div class="flex gap-2">
        <app-deal-status-badge size="full" [stage]="'negotiation'" />
        <button [pButton]>Test</button>
      </div>
    </div>

    <div class="overflow-y-auto">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum cupiditate exercitationem
      similique quisquam totam aliquam accusantium, quae dicta perferendis fugiat adipisci assumenda
      sit quasi, obcaecati nemo ad, odit at. A! Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Cum cupiditate exercitationem similique quisquam totam aliquam accusantium, quae dicta
      perferendis fugiat adipisci assumenda sit quasi, obcaecati nemo ad, odit at. A! Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Cum cupiditate exercitationem similique quisquam
      totam aliquam accusantium, quae dicta perferendis fugiat adipisci assumenda sit quasi,
      obcaecati nemo ad, odit at. A!
    </div>
  `,
})
export class DealDetailCard {}
