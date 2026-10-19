import { Component } from '@angular/core';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { DealStatusBadge } from '../deal-status-badge/deal-status-badge';

@Component({
  imports: [
    ButtonDirective,
    ButtonModule,
    DealStatusBadge
  ],
  selector: 'app-deal-detail-card',
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` 
  <div>Test</div>
  <p>deal-detail-card works!</p> 
  

  <app-deal-status-badge [stage]="'new'" />

  <app-deal-status-badge [stage]="'negotiation'" />


  <button [pButton]>Test</button>
  `,
})
export class DealDetailCard {}

