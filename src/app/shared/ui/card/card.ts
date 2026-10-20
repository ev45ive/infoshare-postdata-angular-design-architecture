import {
  Component,
  Directive,
  ElementRef,
  Signal,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UiCollapsible } from '../collapsible/collapsible';
import { UiIntent } from '../intent/intent';
import { CARD_DEFAULTS, CardDensity, CardVariant } from './card-defaults';
import { UiSelectable } from './selectable';

export type CardOrientation = 'vertical' | 'horizontal';
export type CardMode = 'view' | 'edit';

/**
 * Lazy loading placeholder; instantiated only while `loading` is true.
 *
 * @example
 * ```html
 * <ui-card title="Insights" [loading]="busy">
 *   <ng-template uiCardSkeleton><div class="h-24 animate-pulse rounded bg-surface-100"></div></ng-template>
 * </ui-card>
 * ```
 */
@Directive({ selector: 'ng-template[uiCardSkeleton]' })
export class UiCardSkeleton {
  readonly template = inject(TemplateRef);
}

export interface CardItemContext<T> {
  $implicit: T;
  index: number;
}

/**
 * Item template used when the card renders `items` itself.
 *
 * Inputs:
 * - `uiCardItemOf` — type-only: pass the same array as `items` to type `let-item`.
 *
 * @example
 * ```html
 * <ui-card title="Saved views" [items]="views">
 *   <ng-template uiCardItem [uiCardItemOf]="views" let-view let-i="index">{{ i + 1 }}. {{ view.name }}</ng-template>
 * </ui-card>
 * ```
 */
@Directive({ selector: 'ng-template[uiCardItem]' })
export class UiCardItem<T> {
  readonly uiCardItemOf = input<readonly T[] | null>();
  readonly template = inject<TemplateRef<CardItemContext<T>>>(TemplateRef);

  static ngTemplateContextGuard<T>(_dir: UiCardItem<T>, ctx: unknown): ctx is CardItemContext<T> {
    return true;
  }
}

/**
 * Empty state used when `items` is an empty array.
 *
 * @example
 * ```html
 * <ui-card title="Saved views" [items]="[]">
 *   <ng-template uiCardEmpty>No saved views.</ng-template>
 * </ui-card>
 * ```
 */
@Directive({ selector: 'ng-template[uiCardEmpty]' })
export class UiCardEmpty {
  readonly template = inject(TemplateRef);
}

/**
 * Read-only body for view/edit cards; adds a default "Edit" header action.
 *
 * @example
 * ```html
 * <ui-card title="Deal" [(mode)]="mode">
 *   <ng-template uiCardView>…properties…</ng-template>
 *   <ng-template uiCardEdit let-close>…form… <button (click)="close()">Done</button></ng-template>
 * </ui-card>
 * ```
 */
@Directive({ selector: 'ng-template[uiCardView]' })
export class UiCardView {
  readonly template = inject(TemplateRef);
}

export interface CardEditContext {
  $implicit: () => void;
}

/**
 * Edit body for view/edit cards; context `$implicit` closes edit mode.
 *
 * @example
 * ```html
 * <ng-template uiCardEdit let-close><button (click)="close()">Done</button></ng-template>
 * ```
 */
@Directive({ selector: 'ng-template[uiCardEdit]' })
export class UiCardEdit {
  readonly template = inject<TemplateRef<CardEditContext>>(TemplateRef);

  static ngTemplateContextGuard(_dir: UiCardEdit, ctx: unknown): ctx is CardEditContext {
    return true;
  }
}

// Anti-patterns kept for reference — do not uncomment:
// BAD: <ng-content select="div, h1, button, .banana" /> — generic tags/classes silently steal consumer markup.
// BAD: selector: 'button[uiCard]' — <button> allows phrasing content only; headings and blocks inside are invalid.
// BAD: showHeader = input(true); footerText = input(''); actions = input<Action[]>([]) — config explosion instead of slots.
// BAD: dismiss() { this.el.nativeElement.remove(); } — a card must not delete itself; emit and let the parent own state.
// BAD: this.el.nativeElement.querySelector('[card-title]') — DOM search for projected parts; use contentChild / DI.
// BAD: private readonly deals = inject(DealsService) — shared UI must stay domain-agnostic.
// BAD: template: `<p-card><ng-content /></p-card>` — slots end up inside a 3rd-party layout you don't control.
// BAD (consumer): ::ng-deep .ui-card-title { font-size: 2rem } — override `--ui-card-title-size` instead.
// BAD (consumer): <button card-title class="-mt-16"> — negative margins to fake a slot position = hidden coupling.

let nextId = 0;

/**
 * Composable card / panel. Every region has a default built from inputs and can be replaced
 * by a compound child (`ui-card-*`) or any element carrying the slot attribute.
 *
 * Slots:
 * - `[card-ribbon]` — corner badge.
 * - `[card-media]`, `ui-card-media`, direct `img | picture | video` — media edge (bleeds to card border).
 * - `[card-header]`, `ui-card-header` — replaces the whole default header row.
 * - `[card-title]`, `ui-card-title` — replaces the default title (`title` + `count`).
 * - `[card-subtitle]`, `ui-card-subtitle` — replaces the default subtitle.
 * - `[card-actions]`, `ui-card-actions` — header actions, rendered before the built-in Edit / collapse / dismiss buttons.
 * - `[card-header-bottom]` — row under the header (tabs, filters).
 * - default — body content.
 * - `[card-footer]`, `ui-card-footer` — footer row.
 * - templates: `uiCardSkeleton`, `uiCardItem`, `uiCardEmpty`, `uiCardView`, `uiCardEdit`.
 *
 * Inputs:
 * - `title` / `subtitle` / `count` — default header text.
 * - `variant` — `elevated | outlined | flat | ghost`; default from `uiCardDefaults`, nested cards default to `flat`.
 * - `density` — `comfortable | compact`.
 * - `orientation` — `vertical | horizontal` (media beside content).
 * - `intent` — `neutral | info | success | warn | danger` (via `UiIntent`).
 * - `headingLevel` — aria-level of the title; nested cards add 1.
 * - `loading` — shows skeleton instead of body.
 * - `collapsible` / `expanded` — adds collapse toggle; `[(expanded)]` two-way (via `UiCollapsible`).
 * - `dismissible` — adds a close button that emits `dismiss`.
 * - `items` — card renders the list with `uiCardItem` / `uiCardEmpty`.
 * - `mode` — two-way `view | edit` for `uiCardView` / `uiCardEdit`.
 *
 * Outputs:
 * - `dismiss` — close button clicked.
 *
 * CSS custom properties: `--ui-card-padding`, `--ui-card-gap`, `--ui-card-title-size`, `--ui-card-radius`,
 * `--ui-card-border`, `--ui-card-bg`.
 *
 * @example
 * ```html
 * <ui-card title="Notes">Key account, prefers email contact.</ui-card>
 *
 * <ui-card title="Companies" [count]="2" variant="outlined" collapsible>
 *   <button card-actions pButton text size="small">+ Add</button>
 *   …
 *   <ui-card-footer><button pButton>Save</button></ui-card-footer>
 * </ui-card>
 *
 * <a uiCard href="/contacts/c1" title="Anna Kowalska">Tech Solutions</a>
 * <form uiCard title="Edit deal" (submit)="save()">…</form>
 * ```
 */
@Component({
  selector: 'ui-card, a[uiCard], article[uiCard], form[uiCard]',
  imports: [NgTemplateOutlet, ButtonModule],
  hostDirectives: [
    { directive: UiCollapsible, inputs: ['expanded'], outputs: ['expandedChange'] },
    { directive: UiIntent, inputs: ['uiIntent: intent'] },
  ],
  host: {
    // `title` is an input here; drop the native attribute so the whole card has no tooltip.
    '[attr.title]': 'null',
    '[attr.data-variant]': 'resolvedVariant()',
    '[attr.data-density]': 'resolvedDensity()',
    '[attr.data-orientation]': 'orientation()',
    '[attr.role]': 'role',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[attr.aria-busy]': 'loading() || null',
    // States only (utilities layer); everything a consumer may override stays in the components layer below.
    class:
      '[&:is(a,[aria-checked]):hover]:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary aria-checked:outline-2 aria-checked:outline-offset-1 aria-checked:outline-primary has-[a[uicardlink]:focus-visible]:outline-2 has-[a[uicardlink]:focus-visible]:outline-offset-1 has-[a[uicardlink]:focus-visible]:outline-primary',
  },
  styles: `
    /* Components layer = overridable by consumer utilities. One owner per property: never set these again with Tailwind. */
    @layer components {
      :host {
        --ui-card-padding: 1rem;
        --ui-card-gap: 0.75rem;
        --ui-card-title-size: 1rem;
        --ui-card-radius: 0.5rem;
        --ui-card-border: var(--p-content-border-color);
        --ui-card-bg: var(--p-content-background);
        --ui-card-shadow: none;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--ui-card-gap);
        min-width: 0;
        padding: var(--ui-card-padding);
        border: 1px solid var(--ui-card-border);
        border-radius: var(--ui-card-radius);
        background: var(--ui-card-bg);
        box-shadow: var(--ui-card-shadow);
        color: inherit;
        text-decoration: none;
      }
      :host([data-density='compact']) {
        --ui-card-padding: 0.5rem;
        --ui-card-gap: 0.375rem;
        --ui-card-title-size: 0.875rem;
      }
      :host([data-variant='elevated']) {
        --ui-card-shadow: 0 1px 3px rgb(0 0 0 / 0.12);
      }
      :host([data-variant='flat']) {
        --ui-card-border: transparent;
        --ui-card-bg: var(--p-content-hover-background);
      }
      :host([data-variant='ghost']) {
        --ui-card-border: transparent;
        --ui-card-bg: transparent;
        --ui-card-padding: 0;
      }
      :host([data-intent='info']) {
        --ui-card-border: var(--p-sky-400);
      }
      :host([data-intent='success']) {
        --ui-card-border: var(--p-green-500);
      }
      :host([data-intent='warn']) {
        --ui-card-border: var(--p-amber-500);
      }
      :host([data-intent='danger']) {
        --ui-card-border: var(--p-red-500);
      }
      :host([data-orientation='horizontal']) {
        flex-direction: row;
      }

      /* Orientation-dependent: Tailwind group-/in- variants would leak into nested cards. */
      .ui-card-media {
        overflow: hidden;
        margin: calc(-1 * var(--ui-card-padding)) calc(-1 * var(--ui-card-padding)) 0;
        border-radius: var(--ui-card-radius) var(--ui-card-radius) 0 0;
      }
      :host([data-orientation='horizontal']) .ui-card-media {
        flex: 0 0 40%;
        max-width: 14rem;
        margin: calc(-1 * var(--ui-card-padding)) 0 calc(-1 * var(--ui-card-padding))
          calc(-1 * var(--ui-card-padding));
        border-radius: var(--ui-card-radius) 0 0 var(--ui-card-radius);
      }

      /* :has() hide rules own display, so header/body layout stays here too. */
      .ui-card-header {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .ui-card-body {
        display: flex;
        flex-direction: column;
        gap: var(--ui-card-gap);
      }
      .ui-card-header:not(
        :has(
          .ui-card-title-slot:not(:empty),
          .ui-card-subtitle-slot:not(:empty),
          .ui-card-actions:not(:empty)
        )
      ),
      .ui-card-body:not(:has(> :not(:empty))) {
        display: none;
      }
    }
  `,
  template: `
    <div class="absolute -top-2.5 right-3 empty:hidden"><ng-content select="[card-ribbon]" /></div>
    <div class="ui-card-media empty:hidden [&>img]:block [&>img]:size-full [&>img]:object-cover">
      <ng-content select="img, picture, video, [card-media], ui-card-media" />
    </div>

    <div class="flex min-w-0 flex-1 flex-col gap-(--ui-card-gap)">
      <ng-content select="[card-header], ui-card-header">
        <div class="ui-card-header">
          <div class="min-w-0 flex-1">
            <div class="ui-card-title-slot empty:hidden">
              <ng-content select="[card-title], ui-card-title">
                @if (title()) {
                  <div
                    role="heading"
                    class="text-(length:--ui-card-title-size) font-semibold"
                    [attr.aria-level]="level()"
                    [id]="titleId"
                  >
                    {{ title() }}
                    @if (count() !== undefined) {
                      ({{ count() }})
                    }
                  </div>
                }
              </ng-content>
            </div>
            <div class="ui-card-subtitle-slot empty:hidden">
              <ng-content select="[card-subtitle], ui-card-subtitle">
                @if (subtitle()) {
                  <p class="text-sm text-muted-color">{{ subtitle() }}</p>
                }
              </ng-content>
            </div>
          </div>
          <div class="ui-card-actions relative z-1 flex shrink-0 items-center gap-1 empty:hidden">
            <ng-content select="[card-actions], ui-card-actions" />
            @if (viewTemplate() && mode() === 'view') {
              <button pButton type="button" text size="small" (click)="mode.set('edit')">
                Edit
              </button>
            }
            @if (collapsible()) {
              <button
                pButton
                type="button"
                text
                size="small"
                [attr.aria-label]="
                  (collapse.expanded() ? 'Collapse ' : 'Expand ') + (title() ?? 'card')
                "
                [attr.aria-expanded]="collapse.expanded()"
                [attr.aria-controls]="bodyId"
                (click)="collapse.toggle()"
              >
                <i
                  class="pi"
                  [class]="collapse.expanded() ? 'pi-chevron-up' : 'pi-chevron-down'"
                  aria-hidden="true"
                ></i>
              </button>
            }
            @if (dismissible()) {
              <button
                pButton
                type="button"
                text
                size="small"
                [attr.aria-label]="'Dismiss ' + (title() ?? 'card')"
                (click)="dismiss.emit()"
              >
                <i class="pi pi-times" aria-hidden="true"></i>
              </button>
            }
          </div>
        </div>
      </ng-content>

      <ng-content select="[card-header-bottom]" />

      <div class="ui-card-body" [id]="bodyId" [hidden]="!open()">
        @if (loading()) {
          <div class="flex flex-col gap-2" aria-hidden="true">
            @if (skeleton(); as custom) {
              <ng-container [ngTemplateOutlet]="custom.template" />
            } @else {
              @for (width of skeletonWidths; track $index) {
                <div
                  class="h-3.5 animate-pulse rounded bg-surface-100 dark:bg-surface-800"
                  [class]="width"
                ></div>
              }
            }
          </div>
        } @else if (mode() === 'edit' && editTemplate(); as edit) {
          <div>
            <ng-container
              [ngTemplateOutlet]="edit.template"
              [ngTemplateOutletContext]="{ $implicit: close }"
            />
          </div>
        } @else if (viewTemplate(); as view) {
          <div><ng-container [ngTemplateOutlet]="view.template" /></div>
        } @else if (items(); as list) {
          <ul class="flex flex-col gap-1">
            @for (item of list; track $index; let index = $index) {
              <li>
                @if (itemTemplate(); as tpl) {
                  <ng-container
                    [ngTemplateOutlet]="tpl.template"
                    [ngTemplateOutletContext]="{ $implicit: item, index }"
                  />
                } @else {
                  {{ item }}
                }
              </li>
            } @empty {
              <li class="text-muted-color">
                @if (emptyTemplate(); as empty) {
                  <ng-container [ngTemplateOutlet]="empty.template" />
                } @else {
                  Nothing here yet.
                }
              </li>
            }
          </ul>
        }
        <div class="empty:hidden" [hidden]="loading()"><ng-content /></div>
      </div>

      <div class="empty:hidden" [hidden]="!open()">
        <ng-content select="[card-footer], ui-card-footer" />
      </div>
    </div>
  `,
})
export class UiCard {
  readonly title = input<string>();
  readonly subtitle = input<string>();
  readonly count = input<number>();
  readonly variant = input<CardVariant>();
  readonly density = input<CardDensity>();
  readonly orientation = input<CardOrientation>('vertical');
  readonly headingLevel = input<number>();
  readonly loading = input(false, { transform: booleanAttribute });
  readonly collapsible = input(false, { transform: booleanAttribute });
  readonly dismissible = input(false, { transform: booleanAttribute });
  readonly items = input<readonly unknown[] | null>(null);
  readonly mode = model<CardMode>('view');
  readonly dismiss = output<void>();

  private readonly parent = inject(UiCard, { skipSelf: true, optional: true });
  private readonly defaults = inject(CARD_DEFAULTS, { optional: true });
  private readonly selectable = inject(UiSelectable, { self: true, optional: true });
  private readonly tag = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName;
  protected readonly collapse = inject(UiCollapsible);

  protected readonly isLink = this.tag === 'A';
  protected readonly role = this.tag === 'UI-CARD' && !this.selectable ? 'group' : null;
  protected readonly titleId = `ui-card-${nextId++}`;
  protected readonly bodyId = `${this.titleId}-body`;
  protected readonly skeletonWidths = ['w-3/4', 'w-full', 'w-1/2'];
  private readonly projectedTitleId = signal<string | null>(null);

  protected readonly skeleton = contentChild(UiCardSkeleton, { descendants: false });
  protected readonly itemTemplate = contentChild(UiCardItem, { descendants: false });
  protected readonly emptyTemplate = contentChild(UiCardEmpty, { descendants: false });
  protected readonly viewTemplate = contentChild(UiCardView, { descendants: false });
  protected readonly editTemplate = contentChild(UiCardEdit, { descendants: false });

  protected readonly resolvedVariant = computed(
    () =>
      this.variant() ?? this.defaults?.defaults().variant ?? (this.parent ? 'flat' : 'elevated'),
  );
  protected readonly resolvedDensity = computed(
    () => this.density() ?? this.defaults?.defaults().density ?? 'comfortable',
  );
  /** Heading level used by the default title and `ui-card-title`. */
  readonly level: Signal<number> = computed(() =>
    Math.min(6, this.headingLevel() ?? (this.parent ? this.parent.level() + 1 : 3)),
  );

  protected readonly open = computed(() => !this.collapsible() || this.collapse.expanded());
  protected readonly labelledBy = computed(() =>
    this.isLink ? null : (this.projectedTitleId() ?? (this.title() ? this.titleId : null)),
  );
  protected readonly close = () => this.mode.set('view');

  /** Called by `ui-card-title` so the card is labelled by the projected heading. */
  registerTitle(id: string) {
    this.projectedTitleId.set(id);
  }
}
