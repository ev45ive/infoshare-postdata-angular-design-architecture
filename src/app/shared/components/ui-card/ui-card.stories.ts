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
    template: `<div class="grid gap-5">
    <ui-card>

        <h1 class="text-2xl mb-1.5">Simple card</h1>

        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
        ratione quam perferendis esse, cupiditate neque quas!

    </ui-card>
    
    <ui-card>
        
        <div class="text-2xl mb-2">Simple card</div>

        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
        ratione quam perferendis esse, cupiditate neque quas!
        
    </ui-card>
    
    </div>`,
  }),
};
