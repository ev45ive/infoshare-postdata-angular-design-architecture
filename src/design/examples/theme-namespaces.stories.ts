import type { Meta, StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Design System/Theme namespaces',
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj;

/** Each cell uses a token declared in `src/design/theme-namespaces.css`. */
export const Added: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-3 gap-gutter text-sm text-on-surface">
        <div class="bg-brand text-white rounded-tile p-gutter">color: bg-brand</div>
        <div class="bg-surface-100 rounded-tile p-gutter">
          <a class="text-link underline">text-link</a> /
          <span class="text-danger">text-danger</span>
          <p class="text-muted">inline aliases of palette steps</p>
        </div>
        <div class="bg-surface-100 rounded-tile p-gutter">
          <span class="text-label tracking-label uppercase">text-label + tracking-label</span>
        </div>
        <div class="bg-surface rounded-tile p-gutter shadow-card">shadow-card</div>
        <div class="bg-surface-100 rounded-tile p-gutter inset-shadow-pressed">inset-shadow-pressed</div>
        <div class="bg-surface rounded-tile p-gutter drop-shadow-soft">drop-shadow-soft</div>
        <div class="bg-surface-100 rounded-tile p-gutter text-shadow-soft">text-shadow-soft</div>
        <div class="bg-surface-100 rounded-tile p-gutter blur-soft">blur-soft</div>
        <div class="bg-surface-100 rounded-tile aspect-card grid place-items-center">aspect-card</div>
        <div class="bg-surface-100 rounded-tile p-gutter max-w-panel">container: max-w-panel (28rem)</div>
        <div class="bg-surface-100 rounded-tile p-gutter">
          <span class="3xl:hidden">breakpoint: below 3xl</span>
          <span class="hidden 3xl:inline">breakpoint: 3xl or wider</span>
        </div>
        <div class="bg-primary text-primary-contrast rounded-tile p-gutter animate-wiggle ease-snappy w-fit">
          animate-wiggle
        </div>
      </div>`,
  }),
};

/** Disabled palettes generate no utility: the lime and cyan cells have no background. */
export const Restricted: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-4 gap-4 text-sm text-on-surface">
        <div class="bg-sky-500 rounded-control p-4">bg-sky-500 (kept)</div>
        <div class="bg-amber-500 rounded-control p-4">bg-amber-500 (kept)</div>
        <div class="bg-lime-500 rounded-control p-4 outline outline-line">bg-lime-500 (disabled)</div>
        <div class="bg-cyan-500 rounded-control p-4 outline outline-line">bg-cyan-500 (disabled)</div>
      </div>`,
  }),
};
