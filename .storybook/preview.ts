import type { Preview } from '@storybook/angular-vite';
import { applicationConfig } from '@storybook/angular-vite';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import '../src/styles.css';
import './styles.css';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]),
        providePrimeNG({
          theme: {
            preset: Aura,
            options: {
              cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng'
              },
              // Override font to use sans-serif instead of Times New Roman
              cssVariables: {
                'primary-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }
            }
          }
        }),
      ],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;

