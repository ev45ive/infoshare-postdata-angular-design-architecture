import { Meta, StoryObj, moduleMetadata } from '@storybook/angular-vite';
import { ButtonModule } from 'primeng/button';
import { UI_TABS, UiTabs } from './tabs';

const meta: Meta<UiTabs> = {
  title: 'Showcase/UI/Tabs',
  component: UiTabs,
  decorators: [moduleMetadata({ imports: [UI_TABS, ButtonModule] })],
};

export default meta;
type Story = StoryObj<UiTabs>;

export const Basic: Story = {
  render: () => ({
    props: { current: 'overview' },
    template: `
      <ui-tabs label="Record" [(activeId)]="current">
        <ui-tab id="overview" label="Overview">Overview panel</ui-tab>
        <ui-tab id="activities" label="Activities">Activities panel</ui-tab>
        <ui-tab id="orders" label="Orders">Orders panel</ui-tab>
      </ui-tabs>
      <p class="mt-2 text-sm">activeId: {{ current }} (use ← → on a focused tab)</p>`,
  }),
};

export const ClosableViewTabs: Story = {
  render: () => {
    const state = {
      views: [
        { id: 'all', name: 'All contacts', count: 16 },
        { id: 'mine', name: 'My contacts', count: 4 },
        { id: 'follow', name: 'Needing follow up', count: 2 },
      ],
    };
    return {
      props: { state, close: (id: string) => (state.views = state.views.filter((v) => v.id !== id)) },
      template: `
        <ui-tabs label="Saved views" (tabClose)="close($event)">
          @for (view of state.views; track view.id) {
            <ui-tab [id]="view.id" [label]="view.name" [count]="view.count" [closable]="view.id !== 'all'">{{ view.name }} grid</ui-tab>
          }
          <button tabs-end pButton type="button" text size="small" aria-label="Add view"><i class="pi pi-plus" aria-hidden="true"></i></button>
        </ui-tabs>
        <p class="mt-2 text-sm">Click × or press Delete on a focused tab.</p>`,
    };
  },
};

export const WithCountsAndEndSlot: Story = {
  render: () => ({
    template: `
      <ui-tabs label="Insights">
        <ui-tab id="score" label="Score">45 / 100</ui-tab>
        <ui-tab id="tech" label="Technologies" [count]="27">27 technologies</ui-tab>
        <ui-tab id="funding" label="Funding rounds" [count]="5">5 rounds</ui-tab>
        <button tabs-end pButton type="button" text size="small" aria-label="Settings"><i class="pi pi-cog" aria-hidden="true"></i></button>
      </ui-tabs>`,
  }),
};
