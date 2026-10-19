import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

// Must stay identical to the `@layer` statement at the top of src/styles.css.
export const CSS_LAYER_ORDER = 'theme, base, primeng, components, utilities';

export const DARK_MODE_SELECTOR = '.app-dark';

export const providePrimeNGTheme = () =>
  providePrimeNG({
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: DARK_MODE_SELECTOR,
        cssLayer: { name: 'primeng', order: CSS_LAYER_ORDER },
      },
    },
  });
