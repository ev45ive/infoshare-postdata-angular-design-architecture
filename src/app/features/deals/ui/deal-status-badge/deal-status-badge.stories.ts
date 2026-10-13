import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DealStatusBadge } from './deal-status-badge';

const meta: Meta<DealStatusBadge> = {
  title: 'Features/Deals/DealStatusBadge',
  component: DealStatusBadge,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<DealStatusBadge>;

export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `<app-deal-status-badge />`,
  }),
};
