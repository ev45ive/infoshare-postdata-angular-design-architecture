import { Component, Directive, inject } from '@angular/core';
import { UiCard } from './card';

let nextId = 0;

/**
 * Compound header row; replaces the card's default header.
 *
 * Slots:
 * - `p-avatar`, `img`, `[header-media]` — leading media (tag selectors: well-known media elements only).
 * - `ui-card-title`, `[card-title]` — title.
 * - `ui-card-subtitle`, `[card-subtitle]` — subtitle.
 * - default — extra lines under the title.
 * - `ui-card-actions`, `[card-actions]` — trailing actions.
 *
 * @example
 * ```html
 * <ui-card>
 *   <ui-card-header>
 *     <p-avatar label="AK" shape="circle" />
 *     <ui-card-title>Anna Kowalska</ui-card-title>
 *     <ui-card-subtitle>Tech Solutions</ui-card-subtitle>
 *     <ui-card-actions><button pButton text aria-label="More"><i class="pi pi-ellipsis-h"></i></button></ui-card-actions>
 *   </ui-card-header>
 *   Body
 * </ui-card>
 * ```
 */
@Component({
  selector: 'ui-card-header',
  host: { class: 'flex items-start gap-3' },
  template: `
    <ng-content select="p-avatar, img, [header-media]" />
    <div class="min-w-0 flex-1">
      <ng-content select="ui-card-title, [card-title]" />
      <ng-content select="ui-card-subtitle, [card-subtitle]" />
      <ng-content />
    </div>
    <div class="relative z-1 flex shrink-0 items-center gap-1 empty:hidden">
      <ng-content select="ui-card-actions, [card-actions]" />
    </div>
  `,
})
export class UiCardHeader {}

/**
 * Card title rendered as a heading; registers its id with the nearest `ui-card` for `aria-labelledby`.
 * Heading level and font size come from the card (`level`, `--ui-card-title-size`).
 *
 * Slots:
 * - default — title content.
 *
 * @example
 * ```html
 * <ui-card><ui-card-title>Warsaw office</ui-card-title>12 open deals</ui-card>
 * ```
 */
@Component({
  selector: 'ui-card-title',
  host: {
    role: 'heading',
    class: 'block text-[length:var(--ui-card-title-size,1rem)] font-semibold',
    '[attr.aria-level]': 'card?.level() ?? 3',
    '[id]': 'id',
  },
  template: `<ng-content />`,
})
export class UiCardTitle {
  protected readonly card = inject(UiCard, { optional: true });
  protected readonly id = `ui-card-title-${nextId++}`;

  constructor() {
    this.card?.registerTitle(this.id);
  }
}

/**
 * Muted secondary line under the title.
 *
 * Slots:
 * - default — subtitle content.
 *
 * @example
 * ```html
 * <ui-card-subtitle>Tech Solutions Sp. z o.o.</ui-card-subtitle>
 * ```
 */
@Component({
  selector: 'ui-card-subtitle',
  host: { class: 'block text-sm text-muted-color' },
  template: `<ng-content />`,
})
export class UiCardSubtitle {}

/**
 * Header action group; sits above stretched links so its buttons stay clickable.
 *
 * Slots:
 * - default — buttons / menus.
 *
 * @example
 * ```html
 * <ui-card-actions><button pButton text size="small">+ Add</button></ui-card-actions>
 * ```
 */
@Component({
  selector: 'ui-card-actions',
  host: { class: 'relative z-1 flex items-center gap-1' },
  template: `<ng-content />`,
})
export class UiCardActions {}

/**
 * Media wrapper for non-image content (icons, charts, maps); bleeds to the card edge.
 * Plain `img | picture | video` children need no wrapper.
 *
 * Slots:
 * - default — media content.
 *
 * @example
 * ```html
 * <ui-card orientation="horizontal" title="Pipeline">
 *   <ui-card-media><div class="grid h-full place-items-center bg-primary-50"><i class="pi pi-chart-bar"></i></div></ui-card-media>
 *   Weekly report
 * </ui-card>
 * ```
 */
@Component({
  selector: 'ui-card-media',
  host: { class: 'block h-full' },
  template: `<ng-content />`,
})
export class UiCardMedia {}

/**
 * Footer row with a top divider: `[actions-start]` on the left, everything else on the right.
 *
 * Slots:
 * - `[actions-start]` — leading actions (secondary / destructive).
 * - default — trailing actions.
 *
 * @example
 * ```html
 * <ui-card-footer>
 *   <button actions-start pButton text>Learn more</button>
 *   <button pButton outlined>Cancel</button>
 *   <button pButton severity="danger">Delete</button>
 * </ui-card-footer>
 * ```
 */
@Component({
  selector: 'ui-card-footer',
  host: {
    class:
      'flex flex-wrap items-center gap-2 border-t border-(--p-content-border-color) pt-[var(--ui-card-gap,0.75rem)]',
  },
  template: `
    <ng-content select="[actions-start]" />
    <span class="flex-1"></span>
    <ng-content />
  `,
})
export class UiCardFooter {}

/**
 * Edge-to-edge list inside a card body: bleeds by `--ui-card-padding` and adds dividers.
 *
 * @example
 * ```html
 * <ui-card title="Related tasks">
 *   <ul uiCardList>
 *     @for (task of tasks; track task.id) { <li>{{ task.title }}</li> } @empty { <li>No tasks.</li> }
 *   </ul>
 * </ui-card>
 * ```
 */
@Directive({
  selector: 'ul[uiCardList], ol[uiCardList]',
  host: {
    class:
      '-mx-[var(--ui-card-padding)] flex flex-col divide-y divide-surface-200 border-y border-surface-200 [&>li]:px-[var(--ui-card-padding)] [&>li]:py-2',
  },
})
export class UiCardList {}

/**
 * Stretched link: the whole card becomes clickable while `card-actions` stay on top.
 * Use instead of `a[uiCard]` when the card also contains buttons.
 *
 * @example
 * ```html
 * <ui-card>
 *   <a card-title uiCardLink href="/deals/d1">Enterprise License</a>
 *   $48,000
 *   <button card-actions pButton text aria-label="Deal actions"><i class="pi pi-ellipsis-h"></i></button>
 * </ui-card>
 * ```
 */
@Directive({
  selector: 'a[uiCardLink]',
  host: { class: "after:absolute after:inset-0 after:rounded-[inherit] after:content-['']" },
})
export class UiCardLink {}
