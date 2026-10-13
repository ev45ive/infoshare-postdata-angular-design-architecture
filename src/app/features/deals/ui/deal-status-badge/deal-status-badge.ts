import { Component, computed, input } from '@angular/core';
import { Badge } from 'primeng/badge';

/* === DEAL STAGES CONFIG === */

export const DealStageLabel = {
  new: 'New',
  negotiation: 'Negotiation',
  proposal: 'Proposal',
  'closed-won': 'Closed (won)',
  'closed-lost': 'Closed (lost)',
  // suspended: '...'
} as const;

export type DealStage = keyof typeof DealStageLabel;

// Full class names must stay literal so Tailwind can detect them.
export const DealStageClasses: Record<DealStage, string> = {
  new: 'bg-sky-100 text-sky-800',
  negotiation: 'bg-amber-100 text-amber-800',
  proposal: 'bg-violet-100 text-violet-800',
  'closed-won': 'bg-green-100 text-green-800',
  'closed-lost': 'bg-red-100 text-red-800',
  // suspended: '...'
};

/* === END DEAL STAGES CONFIG === */

const UnknownStageClasses = 'bg-surface-100 text-surface-700';

@Component({
  imports: [Badge],
  selector: 'app-deal-status-badge',
  styles: `
    // :host p-badge {
    //   background-color: red;
    //   color: blue;
    // }

    // Reflect state to DOM / CSS
    :host([data-deal-stage="new"]) p-badge { color: hotpink;  background-color: blue;}
    :host([data-deal-stage="negotiation"]) p-badge { color: green; }

  `,
  template: ` <p-badge [value]="stageLabel()" />`,
  host: {
    '[attr.data-deal-stage]': 'stage()', // component state reflection
  },
})
export class DealStatusBadge {
  stage = input<DealStage | null>(null);

  // computed(fn) - EXCEL: ""=SUM(A1,B2)" // tracks A1,B2
  private stageLabel = computed(() => {
    const stage = this.stage();

    if (stage) return DealStageLabel[stage];

    return 'Unknown';
  });
}
