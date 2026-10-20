import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

/**
 *  Card HEader
 * @example
 * ```html
 * <ui-card>
 *     <ui-card-header title="banana" />
 *  /<ui-card>
 * ```
 */
@Component({
  imports: [CardModule],
  selector: 'ui-card',
  styles: [
    `
      :host {
        display: block;
        --ui-card-title-size: calc(var(--spacing) * 4);
        --p-card-body-padding: calc(var(--spacing) * 4);
      }

      :host([data-variant='compact']) {
        --ui-card-title-size: calc(var(--spacing) * 2);
      }

      :host {
        &:has([ui-card-list]) {
          /* border: 1px solid red !important; */
          --p-card-body-padding: 0;
        }
      }
    `,
  ],
  host: { '[attr.data-variant]': 'variant()' },
  template: `
    <div class="grid gap-5 shadow-md p-(--p-card-body-padding) rounded-xl">
      <!-- <ng-content select="div,h1,h2,button,.banana,.placki"></ng-content> -->

      <ng-content select="[ui-card-header],ui-card-header"></ng-content>

      <!-- Content - Composition -->
      <ng-content #content> No Content </ng-content>

      <div class="ui-card-actions flex items-center">
        <ng-content select="[card-actions], ui-card-actions" />
      </div>

      <ng-content select="[ui-card-footer],ui-card-footer, ui-card-actions">
        <!-- ui-card-actions -->
        <!-- ui-card-paginati0n -->
        <!-- ui-card-cos inneg -->
      </ng-content>
    </div>
  `,
})
export class UiCard {
  // Content / Params (optional/default)

  variant = input<'default' | 'compact' | 'media'>('default');
  size = input<'sm' | 'md' | 'lg'>('md');
}

/**
 *  Card HEader
 * @example
 * ```html
      <div ui-card-actions]" />
      <div ui-card-subtitle" />
    ```
 */
@Component({
  imports: [CardModule],
  selector: 'ui-card-header',
  template: `
    <div class="grid gap-2">
      <ng-content>
        <h2 class="text-2xl">
          {{ title() }}
        </h2>
      </ng-content>
      <ng-content select="[ui-card-actions]" />
      <ng-content select="[ui-card-subtitle]" />
    </div>
  `,
  styles: ``,
})
export class UiCardHeader {
  title = input('');
}

@Component({
  imports: [CardModule],
  selector: 'ui-card-footer',
  template: `<ng-content />`,
})
export class UiCardFooter {}

@Component({
  imports: [CardModule],
  selector: 'ui-card-actions',
  template: `<div class="py-2 flex justify-between">
    <ng-content />

    <ng-content select="button,[uiButton]" />
  </div>`,
})
export class UiCardActions {}

// index.ts
export const UICardImports = [UiCard, UiCardActions, UiCardFooter, UiCardHeader];
