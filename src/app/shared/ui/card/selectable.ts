import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  Signal,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';

export interface SelectionGroup {
  readonly value: Signal<unknown>;
  select(value: unknown): void;
  register(item: UiSelectable): () => void;
  isTabStop(item: UiSelectable): boolean;
}

export const SELECTION_GROUP = new InjectionToken<SelectionGroup>('SELECTION_GROUP');

/**
 * Opt-in selection for any host: a checkbox on its own, a radio inside a `SELECTION_GROUP` (e.g. `ui-card-group`).
 *
 * Inputs:
 * - `selected` — two-way checked state when standalone.
 * - `value` — value reported to the enclosing group.
 *
 * @example
 * ```html
 * <ui-card uiSelectable title="Pro" [(selected)]="pro">$29</ui-card>
 *
 * <ui-card-group label="Plan" [(value)]="planId">
 *   <ui-card uiSelectable value="free" title="Free" />
 *   <ui-card uiSelectable value="pro" title="Pro" />
 * </ui-card-group>
 * ```
 */
@Directive({
  selector: '[uiSelectable]',
  host: {
    class: 'cursor-pointer',
    '[attr.role]': 'group ? "radio" : "checkbox"',
    '[attr.aria-checked]': 'checked()',
    '[attr.tabindex]': 'tabIndex()',
    '(click)': 'toggle()',
    '(keydown.space)': '$event.preventDefault(); toggle()',
  },
})
export class UiSelectable {
  readonly selected = model(false);
  readonly value = input<unknown>();
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly group = inject(SELECTION_GROUP, { optional: true });
  protected readonly checked = computed(() => (this.group ? this.group.value() === this.value() : this.selected()));
  protected readonly tabIndex = computed(() => (!this.group || this.group.isTabStop(this) ? 0 : -1));

  constructor() {
    const unregister = this.group?.register(this);
    if (unregister) inject(DestroyRef).onDestroy(unregister);
  }

  toggle() {
    if (this.group) this.group.select(this.value());
    else this.selected.update((v) => !v);
  }
}

/**
 * Single-selection group (radio semantics, arrow keys, one tab stop) for `[uiSelectable]` descendants.
 * Children register themselves through DI, so wrappers and `@for` between group and card are fine.
 *
 * Inputs:
 * - `label` — accessible name of the radio group (required).
 * - `value` — two-way selected value.
 *
 * Slots:
 * - default — selectable items.
 *
 * @example
 * ```html
 * <ui-card-group label="Plan" [(value)]="planId">
 *   <ui-card uiSelectable value="free" title="Free">$0</ui-card>
 *   <ui-card uiSelectable value="pro" title="Pro">$29</ui-card>
 * </ui-card-group>
 * ```
 */
@Component({
  selector: 'ui-card-group',
  providers: [{ provide: SELECTION_GROUP, useExisting: UiCardGroup }],
  host: {
    role: 'radiogroup',
    class: 'grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]',
    '[attr.aria-label]': 'label()',
    '(keydown.arrowRight)': 'move($event, 1)',
    '(keydown.arrowDown)': 'move($event, 1)',
    '(keydown.arrowLeft)': 'move($event, -1)',
    '(keydown.arrowUp)': 'move($event, -1)',
  },
  template: `<ng-content />`,
})
export class UiCardGroup implements SelectionGroup {
  readonly label = input.required<string>();
  readonly value = model<unknown>();

  private readonly items = signal<UiSelectable[]>([]);

  register(item: UiSelectable) {
    this.items.update((items) => [...items, item]);
    return () => this.items.update((items) => items.filter((i) => i !== item));
  }

  select(value: unknown) {
    this.value.set(value);
  }

  isTabStop(item: UiSelectable) {
    const items = this.items();
    return (items.find((i) => i.value() === this.value()) ?? items[0]) === item;
  }

  protected move(event: Event, step: number) {
    const items = this.items();
    const current = items.findIndex((i) => i.element.nativeElement.contains(event.target as Node));
    if (current < 0) return;
    event.preventDefault();
    const next = items[(current + step + items.length) % items.length];
    this.select(next.value());
    next.element.nativeElement.focus();
  }
}
