import { Component, computed, input } from '@angular/core';
import { Badge } from 'primeng/badge';
import { NgClass } from '../../../../../../node_modules/@angular/common/types/_common_module-chunk';

export const DealStageLabel = {
  new: 'New',
  negotiation: 'Negotiation',
  proposal: 'Proposal',
  'closed-won': 'Closed (won)',
  'closed-lost': 'Closed (lost)',
} as const;

// mapping - stage -> css colors ??

export type DealStage = keyof typeof DealStageLabel;

@Component({
  imports: [Badge, NgClass],
  selector: 'app-deal-status-badge',
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` <p-badge [value]="stageLabel()" [ngClass]="{}" /> `,
})
export class DealStatusBadge {
  stage = input<DealStage | null>(null);

  // label = DealStageLabel[this.stage()]; // construtor before render

  // computed(fn) - EXCEL: ""=SUM(A1,B2)" // tracks A1,B2

  stageLabel = computed(() => {
    const stage = this.stage();
    
    if (stage) return DealStageLabel[stage];

    return 'Unknown';
  });
}
