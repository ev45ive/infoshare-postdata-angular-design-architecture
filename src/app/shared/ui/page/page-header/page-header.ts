import { Component } from '@angular/core';

// ng g c shared/ui/page/page-header

// ng g c exercises/ui/page/page-header

/**
 * Page Header
 *
 * @example Usage
 * ```html
 * <ui-page-header title="Filter Builder">
 *     <i ui-page-icon class="pi pi-filter" aria-hidden="true"></i>
 *     <button page-actions pButton type="button">Save View</button>
 *     <button page-actions pButton type="button" outlined>Share</button>
 * </ui-page-header>
 * ```
 */
@Component({
  imports: [],
  selector: 'ui-page-header',
  styles: `
    :host {
      display: block;
    }
  `,
  host: {
    class: 'flex flex-wrap items-center justify-between gap-3 py-3',
  },
  template: `
    <h1 class="flex items-center gap-2 text-xl font-semibold">
      <!-- Icon Here -->
      <!-- Title Here  -->
    </h1>
    <div class="flex flex-wrap gap-2">
      <!-- Actions Here -->
    </div>
  `,
})
export class UIPageHeader {}
