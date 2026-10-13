import { Meta, StoryObj, moduleMetadata } from '@storybook/angular-vite';

import { ButtonModule } from 'primeng/button';
import { UiCard, UiCardHeader, UICardActions, UICardImports } from './ui-card';

const meta: Meta<UiCard> = {
  title: 'Shared / UI Card',
  component: UiCard,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [UICardImports, ButtonModule],
    }),
  ],
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
        
    <ui-card variant="compact" size="xl">

        <!-- <div class="text-2xl mb-1.5">Simple card</div> -->

        <ui-card-header title="Simple card title">
            Custom header
        </ui-card-header>

        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
        ratione quam perferendis esse, cupiditate neque quas!

    </ui-card>
    
    <ui-card>
        
        <div ui-card-title class="text-2xl mb-2">Complex card title</div>

        <button ui-card-title class="-mt-[65.5px] mr-auto">Test</button>  Hidden coupling
        

        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
        ratione quam perferendis esse, cupiditate neque quas!

        <ui-card-actions>
            <!-- <button pButton intent="success" class="mr-5">Save</button> - is layout my responsibility? -->
            <button pButton intent="danger">Delete</button>
        </ui-card-actions>
        
    </ui-card>
    

</div>`,
  }),
};
