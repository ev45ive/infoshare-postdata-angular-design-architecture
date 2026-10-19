import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Component, signal } from '@angular/core';
import { DealStageLabel, DealStage, DealStatusBadge } from './deal-status-badge';

const stages = Object.keys(DealStageLabel) as DealStage[];

@Component({
  selector: 'app-story-wrapper',
  imports: [DealStatusBadge],
  template: `
    <div class="flex flex-col gap-4">
      <label class="flex flex-col gap-2 text-sm font-medium">
        Select stage
        <select
          (change)="stage.set($any($event.target).value)"
          [value]="stage()"
          class="border rounded px-2 py-1"
        >
          @for (s of stages; track s) {
            <option [value]="s">{{ s }}</option>
          }
        </select>
      </label>

      <app-deal-status-badge [stage]="stage()" />
    </div>
  `,
  styles: [
    ` 
    `,
  ],
})
export class StoryWrapper {
  stage = signal<DealStage>('new');
  stages = stages;
}

const meta: Meta<DealStatusBadge> = {
  title: 'Features/Deals/DealStatusBadge',
  component: DealStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    stage: { control: 'select', options: stages },
  },
};

export default meta;
type Story = StoryObj<DealStatusBadge>;

export const Dynamic: Story = {
  render: () => ({ component: StoryWrapper, props: {}, template: '<app-deal-status-badge/>' }),
};

export const New: Story = { args: { stage: 'new' } };
export const Negotiation: Story = { args: { stage: 'negotiation' } };
export const Proposal: Story = { args: { stage: 'proposal' } };
export const ClosedWon: Story = { args: { stage: 'closed-won' } };
export const ClosedLost: Story = { args: { stage: 'closed-lost' } };
