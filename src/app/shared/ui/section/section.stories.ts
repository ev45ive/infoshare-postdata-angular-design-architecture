import { Meta, StoryObj, moduleMetadata } from '@storybook/angular-vite';
import { ButtonModule } from 'primeng/button';
import { UiSection } from './section';

const meta: Meta<UiSection> = {
  title: 'Showcase/UI/Section',
  component: UiSection,
  decorators: [moduleMetadata({ imports: [ButtonModule] })],
};

export default meta;
type Story = StoryObj<UiSection>;

export const Static: Story = {
  render: () => ({
    template: `<ui-section title="Notes">Key account, prefers email contact.</ui-section>`,
  }),
};

export const WithActions: Story = {
  render: () => ({
    template: `
      <ui-section title="Companies (2)">
        <button section-actions pButton type="button" text size="small">+ Add</button>
        <p>Parker Industries</p>
        <p>Doctor Octopus Inc</p>
      </ui-section>`,
  }),
};

export const CollapsibleWithCountAndFooter: Story = {
  render: () => ({
    props: { expanded: true },
    template: `
      <ui-section title="Tickets" [count]="1" collapsible [(expanded)]="expanded">
        <button section-actions pButton type="button" text size="small">+ Add</button>
        <p>Web Server Downtime Notification</p>
        <button section-footer pButton type="button" link size="small">View associated tickets</button>
      </ui-section>
      <p class="mt-2 text-sm">expanded: {{ expanded }}</p>`,
  }),
};

export const CollapsedInitially: Story = {
  render: () => ({
    template: `<ui-section title="Communication subscriptions" collapsible [expanded]="false">Hidden body</ui-section>`,
  }),
};
