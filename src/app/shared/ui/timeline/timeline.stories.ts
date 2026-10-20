import { Meta, StoryObj, moduleMetadata } from '@storybook/angular-vite';
import { UI_TIMELINE, UiTimeline } from './timeline';

const meta: Meta<UiTimeline> = {
  title: 'Showcase/UI/Timeline',
  component: UiTimeline,
  decorators: [moduleMetadata({ imports: [UI_TIMELINE] })],
};

export default meta;
type Story = StoryObj<UiTimeline>;

export const Default: Story = {
  render: () => ({
    template: `
      <ol uiTimeline>
        <li uiTimelineItem [expanded]="true">
          <i timeline-icon class="pi pi-comment" aria-hidden="true"></i>
          <span timeline-summary><strong>Michael Davis</strong> logged SMS</span>
          <span timeline-meta>Today 09:12</span>
          Confirmed the revised proposal arrives by Friday.
        </li>
        <li uiTimelineItem>
          <i timeline-icon class="pi pi-phone" aria-hidden="true"></i>
          <span timeline-summary>Call: 14 min</span>
          <span timeline-meta>Mar 8</span>
          Discussed onboarding plan.
        </li>
        <li uiTimelineItem>
          <span timeline-summary>Minimal item: summary only</span>
          Body without icon and meta.
        </li>
      </ol>`,
  }),
};
