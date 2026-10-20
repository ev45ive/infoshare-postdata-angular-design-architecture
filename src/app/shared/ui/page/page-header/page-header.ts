import { Component, input } from '@angular/core';

// ng g c shared/ui/page/page-header

// ng g c exercises/ui/page/page-header

/**
 * Page Header
 *
 * Slots:
 * - [ui-page-title] - defaults to title input
 * - [ui-page-icon] - before title
 * - [page-actions] - right side buttons
 *
 * @example Usage
 * ```html
 * <ui-page-header title="Filter Builder">
 *     <i ui-page-icon class="pi pi-filter" aria-hidden="true"></i>
 *     <button page-actions pButton type="button">Save View</button>
 *     <button page-actions pButton type="button" outlined>Share</button>
 * </ui-page-header>
 * ```
 *
 * @example Usage
 * ```html
 * <ui-page-header>
 *     <h2 ui-page-title>Title  <app-badge/> </h2>
 *     <button page-actions pButton type="button">Save View</button>
 *     <button page-actions pButton type="button" outlined>Share</button>
 * </ui-page-header>
 * ```
 */
@Component({
  imports: [],
  selector: 'ui-page-header',
  styles: ``,
  host: {
    class: 'flex flex-wrap items-center justify-between gap-3 py-3',
  },
  template: `
    <h1 class="flex items-center gap-2 text-xl font-semibold">
      <!-- Icon Here -->
      <ng-content select="[ui-page-icon]" />

      <ng-content select="[ui-page-title]">
        {{ title() }}
      </ng-content>
    </h1>
    <div class="flex flex-wrap gap-2">
      <ng-content page-actions />
    </div>
  `,
})
export class UIPageHeader {
  title = input('');
}
