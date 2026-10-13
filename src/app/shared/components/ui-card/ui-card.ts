import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  imports: [CardModule],
  selector: 'ui-card',
  styles: [
    `
      :host {
        --ui-card-title-size: calc(var(--spacing) * 4);
      }

      :host([data-variant='compact']) {
        --ui-card-title-size: calc(var(--spacing) * 2);
        border: 2px solid yellowgreen;
      }
    `,
  ],
  host: { '[attr.data-variant]': 'variant()' },
  template: `
    <p-card>
      <!-- <ng-content select="div,h1,h2,button,.banana,.placki"></ng-content> -->

      <ng-content select="[ui-card-header],ui-card-header"></ng-content>

      <!-- Content - Composition -->
      <ng-content #content> No Content </ng-content>

      <ng-content
        select="[ui-card-footer],ui-card-footer, [ui-card-actions],ui-card-actions"
      ></ng-content>
    </p-card>
  `,
})
export class UiCard {
  // Content / Params (optional/default)

  variant = input<'default' | 'compact' | 'media'>('default');
  size = input<'sm' | 'md' | 'lg'>('md');
}

@Component({
  imports: [CardModule],
  selector: 'ui-card-header',
  template: `
    <div class="ui-card-header-title">
      <ng-content>{{ title() }}</ng-content>
    </div>
  `,
  styles: `
    // --ui-card-title-size

    :host {
      display: block;
      background-color: lightcyan;
    }

    .ui-card-header-title {
      font-size: var(--ui-card-title-size);
      // color: red !important;
    }
  `,
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
  template: `<div class="py-2">
    <ng-content />

    <ng-content select="button,[uiButton]" />
  </div>`,
})
export class UiCardActions {}

// index.ts
export const UICardImports = [UiCard, UiCardActions, UiCardFooter, UiCardHeader];
