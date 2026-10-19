import type { Meta, StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Design System/Foundations',
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

/** Reused: `bg-primary`, `bg-surface-100` (tailwindcss-primeui). Owned: `surface`, `on-surface`, `muted`, `line`. */
export const Colors: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="bg-surface text-on-surface border border-line rounded-control p-4">
          bg-surface text-on-surface border-line
          <p class="text-muted">text-muted</p>
        </div>
        <div class="bg-surface-100 text-on-surface rounded-control p-4">bg-surface-100 (plugin palette)</div>
        <div class="bg-primary text-primary-contrast rounded-control p-4">bg-primary text-primary-contrast (plugin)</div>
        <button class="rounded-control bg-surface text-on-surface p-4 outline-2 outline-offset-2 outline-transparent focus-visible:outline-focus">
          focus-visible:outline-focus (Tab to me)
        </button>
      </div>`,
  }),
};

/** `--spacing` is a runtime variable, so any scope can re-scale every spacing utility. */
export const Spacing: Story = {
  render: () => ({
    template: `
      <div class="grid gap-4 text-sm">
        <div class="bg-surface-100 text-on-surface rounded-control p-4">p-4 with the default scale</div>
        <div class="bg-surface-100 text-on-surface rounded-control p-4" style="--spacing: 2px">
          p-4 with <code>--spacing: 2px</code> set on this element
        </div>
        <div style="--spacing: 2px">
          <div class="bg-surface-100 text-on-surface rounded-control p-4 flex gap-4">
            <span>Same scope</span><span>on a parent: p-4 and gap-4 both shrink</span>
          </div>
        </div>
      </div>`,
  }),
};

/** `rounded-control` follows `--app-radius`, which follows Aura; override it per scope. */
export const Radius: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-4 text-sm text-on-surface">
        <div class="bg-surface-100 rounded-control p-4">Aura default</div>
        <div class="bg-surface-100 rounded-control p-4" style="--app-radius: 0">--app-radius: 0</div>
        <div class="bg-surface-100 rounded-control p-4" style="--app-radius: 1.5rem">--app-radius: 1.5rem</div>
      </div>`,
  }),
};

/** Use the Theme toolbar item. `dark:` and Aura share the `.app-dark` selector; a nested `.app-dark` scopes both. */
export const DarkMode: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div class="bg-surface text-on-surface border border-line rounded-control p-4">
          Follows the toolbar
          <div class="mt-2 rounded-control bg-surface-100 p-2 dark:bg-surface-800">dark:bg-surface-800</div>
        </div>
        <div class="app-dark bg-surface text-on-surface border border-line rounded-control p-4">
          Always dark (nested .app-dark)
          <div class="mt-2 rounded-control bg-surface-100 p-2 dark:bg-surface-800">dark:bg-surface-800</div>
        </div>
      </div>`,
  }),
};
