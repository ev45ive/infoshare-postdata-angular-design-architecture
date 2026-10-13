import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  "stories": [
    "../docs/**/*.mdx",
    "../docs/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/angular-vite",
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const { default: tsconfigPaths } = await import('vite-tsconfig-paths');
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    });
  },
};
export default config;