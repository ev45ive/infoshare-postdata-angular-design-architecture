import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DealDetailCard } from './deal-detail-card';
import { mockDeals } from '../../data/mock-deals';

const meta: Meta<DealDetailCard> = {
  title: 'Components/Deals/DealDetailCard',
  component: DealDetailCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<DealDetailCard>;

export const Primary: Story = {
  args: {},
  render: ({}) => ({ template: '<app-deal-detail-card/>' }),
};

export const DealA: Story = {
  render: (args) => ({
    props: args,
    template: `<app-deal-detail-card/>`,
  }),
};

export const EnterpriseLicense: Story = { args: { deal: mockDeals[0] } };
export const PilotProgram: Story = { args: { deal: mockDeals[1] } };
export const DesignWorkshop: Story = { args: { deal: mockDeals[2] } };
export const Renewal: Story = { args: { deal: mockDeals[3] } };
export const NoDeal: Story = { args: { deal: undefined } };

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
