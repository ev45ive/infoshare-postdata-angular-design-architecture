import { Meta, StoryObj, moduleMetadata } from '@storybook/angular-vite';
import { ButtonModule } from 'primeng/button';
import { UiCollapsibleGroup } from './collapsible';
import { UiSection } from '../section/section';
import { UI_TIMELINE } from '../timeline/timeline';

const meta: Meta<UiCollapsibleGroup> = {
  title: 'Showcase/UI/Collapsible group',
  component: UiCollapsibleGroup,
  decorators: [moduleMetadata({ imports: [UiSection, UI_TIMELINE, ButtonModule] })],
};

export default meta;
type Story = StoryObj<UiCollapsibleGroup>;

export const SectionsInGroup: Story = {
  render: () => ({
    template: `
      <div uiCollapsibleGroup #group="uiCollapsibleGroup" class="flex flex-col gap-3">
        <button pButton type="button" size="small" class="self-start" (click)="group.toggleAll()">
          {{ group.command()?.expanded === false ? 'Expand all' : 'Collapse all' }}
        </button>
        <ui-section title="About this contact" collapsible>Properties…</ui-section>
        <ui-section title="Companies" collapsible>Cards…</ui-section>
        <ui-section title="Not collapsible">Ignores the group command</ui-section>
      </div>`,
  }),
};

export const TimelineItemsInGroup: Story = {
  render: () => ({
    template: `
      <button pButton type="button" size="small" class="mb-3" (click)="group.toggleAll()">Toggle all</button>
      <ol uiTimeline uiCollapsibleGroup #group="uiCollapsibleGroup">
        <li uiTimelineItem><span timeline-summary>Call: 14 min</span>Body 1</li>
        <li uiTimelineItem><span timeline-summary>Email sent</span>Body 2</li>
      </ol>`,
  }),
};
