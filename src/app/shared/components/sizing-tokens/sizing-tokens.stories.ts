import type { Meta, StoryObj } from '@storybook/angular';
import { SizingTokens } from './sizing-tokens';

const meta: Meta<SizingTokens> = {
  title: 'Design System / Sizing Tokens',
  component: SizingTokens,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SpacingHierarchy: Story = {
  args: {},
};
