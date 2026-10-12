import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { TestComponent } from './test.component';
import { ButtonModule } from 'primeng/button';

const meta: Meta<TestComponent> = {
  title: 'Components/Test',
  component: TestComponent,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [ButtonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TestComponent>;

/**
 * Default story showcasing the Test component with PrimeNG Button and Tailwind styling.
 * Demonstrates:
 * - PrimeNG Button component integration
 * - Tailwind CSS utilities (flex, gap, min-h-screen, bg-surface-50)
 * - Aura theme color palette (primary-700, text-muted-color)
 * - PrimeIcons integration (pi pi-check, pi pi-user)
 */
export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center justify-center min-h-screen bg-surface-50 gap-8 p-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-primary-700 mb-6">Storybook + PrimeNG + Tailwind</h1>
          <div class="flex flex-wrap gap-4 justify-center">
            <p-button 
              label="Primary Button" 
              icon="pi pi-check"
              [severity]="'primary'"
            />
            <p-button 
              label="Secondary Button" 
              icon="pi pi-user"
              [severity]="'secondary'"
            />
            <p-button 
              label="Success Button" 
              icon="pi pi-check"
              [severity]="'success'"
            />
          </div>
          <p class="text-muted-color mt-8">
            This story demonstrates PrimeNG theme colors and Tailwind utilities working together.
          </p>
        </div>
      </div>
    `,
  }),
  decorators: [],
};

/**
 * Minimal story showing the bare component.
 */
export const Minimal: Story = {
  render: () => ({
    template: `<app-test />`,
  }),
};
