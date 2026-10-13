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
    // API
    :host {
      --badge-text-color: var(--badge-text-color-override, var(--color-surface-100));
      --badge-bg-color: var(--badge-text-color-override, var(--color-surface-700));
      --badge-border-color: currentColor;
    }

    // Structure:
    p-badge {
      background-color: var(--badge-bg-color);
      color: var(--badge-text-color);
      border-color: var(--badge-boder-color);
    }

    // Variants / Overrides / State
    :host([data-deal-stage='new']) {
      --badge-text-color: var(--color-sky-800);
      --badge-bg-color: var(--color-sky-100);
    }

    :host([data-deal-stage='negotiation']) {
      --badge-text-color: var(--color-surface-100);
      --badge-bg-color: var(--color-surface-700);
    }
  `,
  template: ` <p-badge [value]="stageLabel()" class="border border-solid" />`,
  host: {
    '[attr.data-deal-stage]': 'stage()', // component state reflection
    '[style]': "{'--stage-dynamic-value': stage()}", // for ubounded css var
  },
})
export class DealStatusBadge {
  stage = input<DealStage | null>(null);

  // computed(fn) - EXCEL: ""=SUM(A1,B2)" // tracks A1,B2
  private stageLabel = computed(() => {
    const stage = this.stage(); // tracking

    if (stage) return DealStageLabel[stage];

    return 'Unknown';
  });
}
