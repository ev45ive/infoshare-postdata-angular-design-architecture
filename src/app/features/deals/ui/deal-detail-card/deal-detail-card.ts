import { Component } from '@angular/core';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { DealStatusBadge } from '../deal-status-badge/deal-status-badge';

@Component({
  imports: [ButtonDirective, ButtonModule, DealStatusBadge],
  selector: 'app-deal-detail-card',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <p>deal-detail-card works!</p>

    <div>
      <span class="text-2xl inline-block mr-auto w-auto">Test Deal name</span>
      <app-deal-status-badge [stage]="'new'" class="ml-auto" />
      <button [pButton]>Test</button>
    </div>

    <div>
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
