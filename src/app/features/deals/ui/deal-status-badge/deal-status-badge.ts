import { Component, computed, input } from '@angular/core';
import { Badge } from 'primeng/badge';

export const DealStageLabel = {
  new: 'New',
  negotiation: 'Negotiation',
  proposal: 'Proposal',
  'closed-won': 'Closed (won)',
  'closed-lost': 'Closed (lost)',
} as const;

export type DealStage = keyof typeof DealStageLabel;

// Full class names must stay literal so Tailwind can detect them.
export const DealStageClasses: Record<DealStage, string> = {
  new: 'bg-sky-100 text-sky-800',
  negotiation: 'bg-amber-100 text-amber-800',
  proposal: 'bg-violet-100 text-violet-800',
  'closed-won': 'bg-green-100 text-green-800',
  'closed-lost': 'bg-red-100 text-red-800',
};

const UnknownStageClasses = 'bg-surface-100 text-surface-700';

@Component({
  imports: [Badge],
  selector: 'app-deal-status-badge',
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` <p-badge [value]="stageLabel()" [class]="stageClasses()" /> `,
})
export class DealStatusBadge {
  stage = input<DealStage | null>(null);

  // computed(fn) - EXCEL: ""=SUM(A1,B2)" // tracks A1,B2
  stageLabel = computed(() => {
    const stage = this.stage();

    if (stage) return DealStageLabel[stage];

    return 'Unknown';
  });

  stageClasses = computed(() => {
    const stage = this.stage();

    return stage ? DealStageClasses[stage] : UnknownStageClasses;
  });
}
