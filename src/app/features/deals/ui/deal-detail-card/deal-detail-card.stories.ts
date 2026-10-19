import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DealDetailCard } from './deal-detail-card';

const meta: Meta<DealDetailCard> = {
  title: 'Components/Deals/DealDetailCard',
  component: DealDetailCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {  },
  render: ({}) => ({ template: '<app-deal-detail-card/>' }),
};



// ====== SNIPPETS: HELP SECTION (remove after use ) ===== 
//
// Metadata (moduleMetadata imports): story-metadata
//
// Providers (moduleMetadata or applicationConfig): story-providers
//
// Controls (argTypes): story-controls
//
// Render with template: story-render
//
// Wrapper component with signals: story-wrapper
//
// ====== SNIPPETS: HELP SECTION (remove after use ) ===== 