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

/**
 * Displays a badge for a deal stage, or “Unknown” when the stage is null.
 *
 * @see {@link ./docs/badges.md}
 *
 * @example
 * ```html
 * <app-deal-status-badge [stage]="'negotiation'" />
 * <app-deal-status-badge [stage]="null" />
 * ```
 * @author Stachu!
 */
@Component({
  imports: [Badge],
  selector: 'app-deal-status-badge',
  styles: [
    `
      @layer components {
        :host {
          --badge-text-color: var(--on-surface, black);
          --badge-bg-color: var(--surface);
          --badge-height: auto;
        }
      }
      /* Variants / Overrides / State */
      :host([data-deal-stage='new']) {
        --badge-text-color: var(--color-blue-900);
        --badge-bg-color: var(--color-blue-200);
      }

      :host([data-deal-stage='negotiation']) {
        --badge-text-color: var(--color-surface-100);
        --badge-bg-color: var(--color-surface-700);
      }

      :host([data-size='full']) {
        // --badge-height: 100%;
      }

      /* Structure */
      p-badge {
        height: var(--badge-height);
        color: var(--badge-text-color);
        background-color: var(--badge-bg-color);
        border-color: var(--badge-border-color);
      }
    `,
  ],
  template: ` <p-badge size="xlarge" [value]="stageLabel()" class="border border-solid" />`,
  host: {
    '[attr.data-deal-stage]': 'stage()', // component state reflection
    '[attr.data-size]': 'size()',
    '[style]': "{'--stage-dynamic-value': stage()}", // for ubounded css var
  },
})
export class DealStatusBadge {
  // stage = input<DealStage | null>(null); // optional + defautl

  /**
   * Size of badge
   * 
   * @example ``
   */
  size = input<'sm' | 'md' | 'full'>('md');

  stage = input.required<DealStage | null>();

  // className = computed(() => `bg-text-${this.stage()}`); // Todo - hardcoded map/dict/list / whitelist.md

  // computed(fn) - EXCEL: ""=SUM(A1,B2)" // tracks A1,B2
  private stageLabel = computed(() => {
    const stage = this.stage(); // tracking

    if (stage) return DealStageLabel[stage];

    return 'Unknown';
  });
}
