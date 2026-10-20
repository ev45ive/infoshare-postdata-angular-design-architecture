# UI Card — compound / composable card plan

> Goal: one `ui-card` that wraps cards, panels, lists, forms; every region has a **default** built from inputs, replaceable by a **compound child** (`ui-card-*`) or **any HTML** (attribute slot).
> Implemented: `src/showcase/ui/card/` (`card.ts`, `card-parts.ts`, `card-defaults.ts`, `selectable.ts`, `public-api.ts` → `UI_CARD`) + `card.stories.ts` (`Showcase/UI/Card`, one story per composition). Replaces the old `p-card` based `src/app/shared/components/ui-card`.

## API at a glance

- **Selectors:** `ui-card` · `a[uiCard]` · `article[uiCard]` · `form[uiCard]`
- **Inputs:** `title` · `subtitle` · `count` · `variant` (`elevated|outlined|flat|ghost`) · `density` (`comfortable|compact`) · `orientation` (`vertical|horizontal`) · `intent` · `headingLevel` · `loading` · `collapsible` · `dismissible` · `items`
- **Models:** `expanded` · `mode` (`view|edit`); `selected` / `value` live on the opt-in `[uiSelectable]` directive
- **Outputs:** `dismiss`
- **CSS custom properties:** `--ui-card-padding` · `--ui-card-gap` · `--ui-card-title-size` · `--ui-card-radius` · `--ui-card-border` · `--ui-card-bg`
- **Slots (attribute or compound child):**

  | Slot | Attribute | Compound child | Default (fallback) | Replace / extend |
  |---|---|---|---|---|
  | ribbon | `[card-ribbon]` | — | none | — |
  | media | `[card-media]`, direct `img \| picture \| video` | `ui-card-media` | none | — |
  | header | `[card-header]` | `ui-card-header` | title + subtitle + actions row | replace |
  | title | `[card-title]` | `ui-card-title` | `title` + `count` heading | replace |
  | subtitle | `[card-subtitle]` | `ui-card-subtitle` | `subtitle` | replace |
  | header actions | `[card-actions]` | `ui-card-actions` | Edit / collapse / dismiss buttons if enabled | extend |
  | under header | `[card-header-bottom]` | — | none | — |
  | body | default | — | none | — |
  | footer | `[card-footer]` | `ui-card-footer` (`[actions-start]` + end) | none | — |
  | templates | `uiCardSkeleton` · `uiCardItem` · `uiCardEmpty` · `uiCardView` · `uiCardEdit` | — | built-in skeleton / "Nothing here yet." | replace |

---

### 1. Simple card

```html
<ui-card title="Notes">Key account, prefers email contact.</ui-card>
```

- `input()` → title
- `ng-content` default slot
- `<ng-content select="[card-title]">{{ title() }}</ng-content>` → **fallback content** (v18+) when nothing projected

---

### 2. Replace the title with any HTML

```html
<ui-card>
  <h3 card-title>Anna Kowalska <p-tag value="customer" severity="success" /></h3>
  Tech Solutions Sp. z o.o.
</ui-card>
```

- `ng-content select="[card-title]"` → attribute slot overrides the fallback
- Why not `title` input: rich markup (tags, icons, links) without growing the API

---

### 3. Compound header

```html
<ui-card>
  <ui-card-header>
    <p-avatar label="AK" shape="circle" />
    <ui-card-title>Anna Kowalska</ui-card-title>
    <ui-card-subtitle>Tech Solutions</ui-card-subtitle>
    <ui-card-actions><button pButton text aria-label="More"><i class="pi pi-ellipsis-h"></i></button></ui-card-actions>
  </ui-card-header>
  Body
</ui-card>
```

- `select="ui-card-header, [card-header]"` → one slot accepts **component or attribute**
- Compound children own their own layout/slots (nested `ng-content select`)
- `ui-card-title` → `inject(UiCard)` registers its id → card host gets `aria-labelledby` (**child → parent DI bridge**)
- Header leading media picked by tag: `select="p-avatar, img, [header-media]"` (see 24)

---

### 4. Variants

```html
<ui-card title="Elevated" />
<ui-card title="Outlined" variant="outlined" />
<ui-card title="Flat panel" variant="flat" density="compact" />
<ui-card title="Danger zone" variant="outlined" intent="danger" />
```

- `input()` + `host: { '[attr.data-variant]': 'variant()' }` → CSS does the rest
- `intent` from the reusable `[uiIntent]` directive → `hostDirectives: [{ directive: UiIntent, inputs: ['uiIntent: intent'] }]` (alias renames the input on the card)
- Why host attrs, not classes from the consumer: variant is part of the public API, styles stay encapsulated

---

### 5. Actions footer

```html
<ui-card title="Delete deal?">
  This cannot be undone.
  <ui-card-footer>
    <button actions-start pButton text>Learn more</button>
    <button pButton outlined severity="secondary">Cancel</button>
    <button pButton severity="danger">Delete</button>
  </ui-card-footer>
</ui-card>
```

- Compound footer with **its own** slots: `[actions-start]` + default (end)
- Card does not know about buttons, it only offers the region

---

### 6. Media card

```html
<ui-card title="Warsaw office">
  <img src="/office.jpg" alt="" class="aspect-video" />
  12 open deals
</ui-card>

<ui-card title="Weekly report" orientation="horizontal">
  <ui-card-media><i class="pi pi-chart-bar"></i></ui-card-media>
  Weekly report
</ui-card>
```

- `select="img, picture, video, [card-media], ui-card-media"` → plain images need no attribute
- Slot wrapper hides itself with `:empty` → no `contentChild` detection needed (simpler mechanism wins)
- Bleed to the card edge via `calc(-1 * var(--ui-card-padding))` (see 25)
- Wrapper sizes projected images with `[&>img]:size-full [&>img]:object-cover` → Tailwind utilities are not scoped by emulated encapsulation, component CSS would need `::ng-deep`
- `orientation` input → same slots, different flex direction

---

### 7. Whole card is a link

```html
<a uiCard href="/contacts/c1" title="Anna Kowalska">Tech Solutions</a>
```

- **Attribute selector component** → keeps native `<a>` semantics, focus, keyboard
- `host` adds hover/focus styles only for interactive hosts
- No `button[uiCard]`: `<button>` allows phrasing content only (no headings/blocks) → use `a[uiCard]`, `[uiSelectable]` (8) or `uiCardLink` (23)
- `title` is an input → host binds `[attr.title]: null` so the native tooltip disappears
- Rule: no nested interactive content inside → use 23 instead

---

### 8. Selectable card (tile picker)

```html
@for (plan of plans; track plan.id) {
  <ui-card uiSelectable [title]="plan.name" [(selected)]="plan.selected">{{ plan.price }}</ui-card>
}
```

- **Opt-in attribute directive**, not `hostDirectives`: host directives are always on, but most cards are not selectable
- `model(false)` → two-way `selected`; `host: { role: 'checkbox', '[attr.aria-checked]', '(click)', '(keydown.space)' }`
- Card reads it with `inject(UiSelectable, { self: true, optional: true })` to drop its own `role="group"`
- Styling keys off ARIA state: `:host([aria-checked='true'])`

---

### 9. Single selection across cards (card group)

```html
<ui-card-group [(value)]="planId" label="Plan">
  <ui-card uiSelectable value="free" title="Free" />
  <ui-card uiSelectable value="pro" title="Pro" />
  <ui-card uiSelectable value="team" title="Team" />
</ui-card-group>
```

- Group provides `SELECTION_GROUP` token; `[uiSelectable]` does `inject(SELECTION_GROUP, { optional: true })` → radio semantics when inside, checkbox otherwise
- Items register in the constructor and unregister via `DestroyRef`
- **Composite DI** instead of `contentChildren`: works through wrappers and `@for`, child self-registers
- Group: `role="radiogroup"`, roving tabindex

---

### 10. Collapsible panel

```html
<ui-card title="About this contact" collapsible [(expanded)]="aboutOpen">
  <dl uiPropertyList>…</dl>
</ui-card>
```

- Reuse `UiCollapsible` via `hostDirectives` (`inputs: ['expanded'], outputs: ['expandedChange']`)
- Default header action = chevron button with `aria-expanded` / `aria-controls`
- Inside `[uiCollapsibleGroup]` → "Collapse all" works for free (DI)

---

### 11. Replace a default header action

```html
<ui-card title="Companies (2)" collapsible>
  <button card-actions pButton text size="small">+ Add</button>
  …
</ui-card>
```

- `<ng-content select="[card-actions]">` **next to** built-in buttons (extend), vs. **fallback** inside it (replace) → design decision per slot
- Show both: actions = extend, title = replace

---

### 12. Dismissible card

```html
@if (showTip()) {
  <ui-card title="Tip" variant="flat" intent="info" dismissible (dismiss)="showTip.set(false)">
    Press / to search.
  </ui-card>
}
```

- `output()` → card never removes itself, parent owns visibility
- Close button rendered only if `dismiss` has listeners? → no public API for that; explicit `dismissible` input (explicit > magic)

---

### 13. Loading / skeleton

```html
<ui-card title="Insights" [loading]="loading()">
  <app-score [value]="score()" />
  <ng-template uiCardSkeleton><div class="h-24 animate-pulse rounded bg-surface-100"></div></ng-template>
</ui-card>
```

- `input loading` + `@if` swaps body for skeleton
- Default skeleton built-in; custom via `contentChild(UiCardSkeleton, { descendants: false })` → **lazy**, never instantiated when not loading; `descendants: false` keeps nested cards' templates out
- Host `aria-busy` while loading
- Why template, not `ng-content`: projected content is always created; templates are created on demand

---

### 14. List card with empty state

```html
<ui-card title="Related tasks" [count]="tasks().length">
  <ul uiCardList>
    @for (task of tasks(); track task.id) {
      <li>{{ task.title }}</li>
    } @empty {
      <li>No tasks for this deal.</li>
    }
  </ul>
</ui-card>
```

- `[uiCardList]` directive → bleeds by `--ui-card-padding`, adds dividers (CSS var contract, 25)
- Empty state: card cannot see `@for` length → consumer `@empty` (no `[card-empty]` slot); limit of slots

---

### 15. Templated items (card renders the list)

```html
<ui-card title="Saved views" [items]="views()">
  <ng-template uiCardItem [uiCardItemOf]="views()" let-view let-i="index">{{ i + 1 }}. {{ view.name }}</ng-template>
  <ng-template uiCardEmpty>No saved views.</ng-template>
</ui-card>
```

- `ng-template` + typed context (`ngTemplateContextGuard` + type-only `uiCardItemOf` input) → card owns iteration, consumer owns item markup
- Compare with 14: who owns the loop decides `ng-content` vs `ng-template`

---

### 16. Form card

```html
<form uiCard title="Edit deal" (submit)="save()">
  <ui-field-grid>
    <ui-form-field label="Title"><input pInputText [formField]="f.title" /></ui-form-field>
    <ui-form-field label="Value"><input pInputText type="number" [formField]="f.value" /></ui-form-field>
  </ui-field-grid>
  <ui-card-footer>
    <button pButton outlined type="button" (click)="cancel()">Cancel</button>
    <button pButton type="submit">Save</button>
  </ui-card-footer>
</form>
```

- `<form uiCard>` → card host **is** the form (attribute selector); footer submit works natively, named by the title
- Alternative: `<ui-card>` + inner `<form id>` + footer `form="…"` attribute

---

### 17. View ↔ edit card

```html
<ui-card title="Deal" [(mode)]="mode">
  <ng-template uiCardView>…properties…</ng-template>
  <ng-template uiCardEdit let-close>…form… <button (click)="close()">Done</button></ng-template>
</ui-card>
```

- Two `contentChild` templates, only one instantiated
- Default header action = "Edit" button in view mode (built-in, next to `[card-actions]`)
- Template context exposes `close` → consumer never touches card internals

---

### 18. Tabs inside card

```html
<ui-card title="Insights">
  <ui-tabs card-header-bottom label="Insights">
    <ui-tab id="score" label="Score">45 / 100</ui-tab>
    <ui-tab id="news" label="News" [count]="3">…</ui-tab>
  </ui-tabs>
</ui-card>
```

- Extra slot below the title row → `[card-header-bottom]`; shows when a new region is justified vs. reusing body

---

### 19. Nested cards

```html
<ui-card title="Account">
  <ui-card title="Primary contact">Anna Kowalska</ui-card>
  <ui-card title="Billing">Invoice monthly</ui-card>
</ui-card>
```

- Inner card: `inject(UiCard, { skipSelf: true, optional: true })` → depth > 0 ⇒ auto `variant="flat"` unless set, heading `aria-level` + 1
- `variant = input<Variant>()` + `computed(() => this.variant() ?? defaults ?? (this.parent ? 'flat' : 'elevated'))`

---

### 20. Subtree defaults (provider)

```html
<section [uiCardDefaults]="{ density: 'compact', variant: 'outlined' }">
  <ui-card title="A" />
  <ui-card title="B" />
</section>
```

- Directive provides `CARD_DEFAULTS` via `useExisting`; card `inject(CARD_DEFAULTS, { optional: true })`
- Priority: input > nearest provider > parent-aware built-in default
- Same token from `provideCardDefaults({ variant: 'flat' })` in route / story / app providers

---

### 21. Wrapping projected content (`ngProjectAs`)

```html
<ui-card>
  <ng-container ngProjectAs="[card-title]">
    @if (deal(); as d) { {{ d.title }} } @else { New deal }
  </ng-container>
</ui-card>
```

- Project control-flow output into a named slot without an extra element
- Shows the rule: `@if` / `@for` with a **single root element** projects by that element's selector; otherwise use `ngProjectAs`

---

### 22. Ribbon / badge corner

```html
<ui-card title="Onboarding Follow-up Call">
  <p-tag card-ribbon value="Recently used" severity="success" />
</ui-card>
```

- Absolute-positioned slot; empty slot renders nothing (`:empty` / no wrapper)

---

### 23. Stretched link (clickable card with inner actions)

```html
<ui-card>
  <a card-title uiCardLink href="/deals/d1">Enterprise License</a>
  $48,000
  <button card-actions pButton text aria-label="Deal actions"><i class="pi pi-ellipsis-h"></i></button>
</ui-card>
```

- `uiCardLink` directive → `::after` covers the card; actions get `position: relative; z-index` to stay clickable
- Use when card needs **both** navigation and inner buttons (7 forbids nested interactive)

---

### 24. Tag selectors done right

```html
<ui-card title="Warsaw office"><img src="/office.jpg" alt="" />12 open deals</ui-card>
<ui-card-header><p-avatar label="AK" /><ui-card-title>Anna</ui-card-title></ui-card-header>
```

- Select by tag only for **well-known, single-purpose** elements: `img, picture, video`, `p-avatar`
- Always pair with an attribute fallback (`[card-media]`, `[header-media]`) for wrapped / custom media
- Only **direct children** are matched → an inline `img` deeper in the body stays in the body
- Contrast with the anti-pattern `select="div, h1, button, .banana"`

---

### 25. CSS custom property contract

```html
<ui-card style="--ui-card-padding: 2rem; --ui-card-title-size: 1.5rem">
  <ui-card-title>Roomy</ui-card-title>
</ui-card>
```

- Card declares `--ui-card-*` on `:host`; variants/density only change variables
- Compound children (`ui-card-title`, `ui-card-media`, `ui-card-footer`, `[uiCardList]`) read them → styling crosses encapsulation without `::ng-deep`
- Consumer overrides on the card element (inline / class); ancestors can't, `:host` redeclares them
- **Styling split:**
  - `@layer components` CSS = tokens, `data-*` variant/density/intent rules, base box, orientation-dependent media, `:has()` hide rules → consumer utilities override them predictably
  - Tailwind on host = states only (`focus-visible:`, `aria-checked:`, `[&:is(a,[aria-checked]):hover]:`, `has-[a[uicardlink]:focus-visible]:`)
  - Tailwind in template = internal layout (`flex gap-(--ui-card-gap)`, `text-(length:--ui-card-title-size)`, `empty:hidden`, `animate-pulse`)
  - One owner per property: utilities layer always beats components layer, so never set the same property in both
  - No `group-*` / `in-*` variants: they match any ancestor and leak into nested cards

---

### 26. Slot naming: header actions vs footer actions

```html
<ui-card title="Companies">
  <ui-card-actions><button pButton text>+ Add</button></ui-card-actions>
  …
  <ui-card-footer>
    <button actions-start pButton text>Learn more</button>
    <button pButton>Save</button>
  </ui-card-footer>
</ui-card>
```

- `ui-card-actions` / `[card-actions]` = **header** actions only (old card used the name for the bottom bar)
- Bottom bar = `ui-card-footer` with its own `[actions-start]` / default slots
- One name, one place → no slot that accepts "footer or actions"

---

## Anti-patterns (also commented in `card.ts`)

- `<ng-content select="div, h1, button, .banana" />` → generic tags / classes silently steal consumer markup
- `button[uiCard]` → `<button>` allows phrasing content only
- `showHeader`, `footerText`, `actions: Action[]` inputs → config explosion instead of slots
- Card removes itself on dismiss (`el.nativeElement.remove()`) → emit, parent owns state
- `querySelector('[card-title]')` to find projected parts → use `contentChild` / DI
- `inject(DealsService)` in a shared card → shared UI must stay domain-agnostic
- Wrapping `p-card` → slots land inside a 3rd-party layout
- Consumer `::ng-deep .ui-card-title` → override `--ui-card-title-size`
- Consumer `<button card-title class="-mt-16">` → negative margins fake a slot position (hidden coupling)

---

## Mechanism coverage

| Mechanism | Compositions |
|---|---|
| `input` / `computed` | 1, 4, 6, 19 |
| `model` | 8, 10, 17 |
| `output` | 12 |
| `ng-content` default + fallback | 1, 2, 11 |
| `ng-content select` (attr + element) | 2, 3, 5, 6, 18, 22, 26 |
| `ng-content select` by tag | 6, 24 |
| nested fallback (`ng-content` inside fallback) | 1, 3 |
| `ngProjectAs` | 21 |
| `ng-template` + context | 13, 15, 17 |
| `contentChild` (`descendants: false`) | 13, 15, 17 |
| attribute-selector component | 7, 16 |
| attribute directive | 8, 14, 23 |
| `host` bindings | 4, 7, 8 |
| `hostDirectives` (+ input alias) | 4, 10 |
| child → parent DI | 3, 9, 19 |
| provider / token defaults | 9, 20 |
| `DestroyRef` registration | 9 |
| CSS custom property contract | 6, 14, 25 |

## Decisions taken

- Slot **replace** vs **extend** — per slot, see table above (title/header replace, actions extend)
- Compound children **and** attribute slots via `select="ui-card-x, [card-x]"`
- Plain markup, no `p-card`; styling consistent with showcase cards
- Empty state: card-owned (`items` input, 15) vs consumer-owned (`@empty`, 14)
