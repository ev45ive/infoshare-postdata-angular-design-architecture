import type { Meta, StoryObj } from '@storybook/angular-vite';

import { UiCard } from './ui-card';

const meta: Meta<UiCard> = {
  title: 'Shared / UI Card',
  component: UiCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story showcasing the Scratchpad component.
 * A basic scratchpad component for general use.
 */
export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `<ui-card />`,
  }),
};
