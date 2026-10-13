import type { Meta, StoryObj } from '@storybook/angular-vite';
import { Scratchpad } from './scratchpad';

const meta: Meta<Scratchpad> = {
  title: 'Shared/Scratchpad',
  component: Scratchpad,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<Scratchpad>;

/**
 * Default story showcasing the Scratchpad component.
 * A basic scratchpad component for general use.
 */
export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `<app-scratchpad />`,
  }),
};
