import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { ButtonModule } from 'primeng/button';

const meta: Meta = {
  title: 'Design System/Decoupling',
  decorators: [moduleMetadata({ imports: [ButtonModule] })],
};

export default meta;
type Story = StoryObj;

/**
 * Templates that use only role utilities re-skin by re-pointing `--app-*`, with no `--p-*` involved.
 * PrimeNG components still follow Aura: they leave only when replaced.
 */
export const RolesWithoutPrimeNG: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="bg-surface text-on-surface border border-line rounded-control p-4">
          Aura-backed roles
          <p-button label="PrimeNG" class="block mt-2" />
        </div>
        <div
          class="bg-surface text-on-surface border border-line rounded-control p-4"
          style="--app-surface: #fff7ed; --app-on-surface: #431407; --app-line: #fdba74; --app-radius: 0"
        >
          Same markup, roles re-pointed to plain values
          <p-button label="PrimeNG (unchanged)" class="block mt-2" />
        </div>
      </div>`,
  }),
};
