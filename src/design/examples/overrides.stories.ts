import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { ButtonModule } from 'primeng/button';
import { DealStatusBadge } from '../../app/features/deals/ui/deal-status-badge/deal-status-badge';

const meta: Meta = {
  title: 'Design System/Overrides',
  decorators: [moduleMetadata({ imports: [DealStatusBadge, ButtonModule] })],
};

export default meta;
type Story = StoryObj;

/** Component contract: the public knobs are `--app-badge-bg` and `--app-badge-fg`. */
export const ComponentContract: Story = {
  render: () => ({
    template: `
      <div class="grid gap-4 text-sm text-on-surface">
        <div>
          <p>1. Default (stage colors)</p>
          <app-deal-status-badge stage="negotiation" />
        </div>
        <div>
          <p>2. Instance (utility on the host)</p>
          <app-deal-status-badge stage="negotiation" class="[--app-badge-bg:black] [--app-badge-fg:white]" />
        </div>
        <div class="[--app-badge-bg:black] [--app-badge-fg:white]">
          <p>3. Scope (any ancestor, inherited)</p>
          <app-deal-status-badge stage="negotiation" />
          <app-deal-status-badge stage="closed-won" />
        </div>
        <div class="[--app-badge-bg:black] [--app-badge-fg:white]">
          <p>4. Nearest wins (instance inside scope)</p>
          <app-deal-status-badge stage="closed-won" class="[--app-badge-bg:white] [--app-badge-fg:black]" />
        </div>
      </div>`,
  }),
};

/** PrimeNG tokens: global via `definePreset`, scoped via the `--p-*` component variable, per instance via `[dt]`. */
export const PrimeNGTokens: Story = {
  render: () => ({
    props: { dt: { root: { borderRadius: '0' } } },
    template: `
      <div class="grid gap-4 text-sm text-on-surface">
        <div>
          <p>Aura default</p>
          <p-button label="Save" />
        </div>
        <div class="[--p-button-border-radius:999px]">
          <p>Scope: a variable on any ancestor</p>
          <p-button label="Save" />
        </div>
        <div>
          <p>Instance: [dt]</p>
          <p-button label="Save" [dt]="dt" />
        </div>
      </div>`,
  }),
};
