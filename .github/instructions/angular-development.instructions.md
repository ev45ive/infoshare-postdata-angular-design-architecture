---
description: "Use when writing Angular components, services, and templates in src/. Covers Angular v22+ best practices: standalone components, signals, Signal Forms, native control flow, accessibility (WCAG AA), and TypeScript strict mode."
applyTo: "src/**/*.ts, src/**/*.html"
---

# Angular v22+ Development Guidelines

Standards for this project: standalone components (default), signals for state, Signal Forms, type-safe reactive patterns, and WCAG AA accessibility compliance.

## TypeScript Conventions

### Type Safety
- **Strict mode is enforced.** Enable `noImplicitAny`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, and `noPropertyAccessFromIndexSignature`.
- **Avoid `any`**. Use `unknown` when the type is genuinely uncertain, then narrow it.
- **Type inference wins.** If TypeScript infers the type correctly, omit the annotation:
  ```typescript
  const count = signal(0);  // ✅ inferred as Signal<number>
  const count: Signal<number> = signal(0);  // ❌ redundant
  ```

### Import Paths
- Use path aliases from `tsconfig.json`: `@core`, `@shared`, `@features`.
- Respect the dependency flow: **features → core → shared** (reverse imports forbidden).
- Import from `public-api.ts` only; never reach into feature/module internals.

---

## Standalone Components (Default)

### Component Declaration
- **Do NOT write `standalone: true`.** It is the default in Angular v22+; setting it is redundant and clutters the code.
- **Always use standalone components.** NgModules are legacy; use standalone for all new components.

```typescript
// ✅ v22+ default
@Component({
  selector: 'app-button',
  imports: [NgIf, NgFor, AsyncPipe],  // Explicit imports only
  template: `...`,
  styles: [`...`],
})
export class ButtonComponent {}

// ❌ Legacy—do not write
@Component({
  selector: 'app-button',
  standalone: true,  // Redundant in v22+
  imports: [...],
  template: `...`,
})
export class ButtonComponent {}
```

### Change Detection
- **Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush`.** It is the default strategy in Angular v22+ and is now the only strategy. Omit it.

```typescript
// ✅ Correct for v22+
@Component({
  selector: 'app-card',
  template: `...`,
})
export class CardComponent {}

// ❌ Unnecessary in v22+
@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,  // Default; don't write
  template: `...`,
})
export class CardComponent {}
```

---

## Signals and Reactive State

### Signal Basics
- Use `signal()` for local component state.
- Use `computed()` for derived, read-only state.
- Use `linkedSignal()` for state derived from **multiple reactive sources** that must stay in sync.
- **Never mutate signals with `mutate()`.** Use `set()` or `update()`:
  ```typescript
  const count = signal(0);
  count.update(v => v + 1);  // ✅
  count.set(5);              // ✅
  count.mutate(v => v++);    // ❌
  ```

### Input/Output Functions (Signals v2)
- **Use `input()` and `output()` functions, not decorators.**
- `input()` returns a signal-like readonly object; to update, pass new values from parent.
- `output()` creates an emitter; call `.emit()` to notify the parent.
- Use `model()` for two-way binding with `[(property)]` syntax:

```typescript
// ✅ Input/Output functions
export class ButtonComponent {
  label = input('Click me');                    // Readonly input signal
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input(false);
  
  onClick = output<MouseEvent>();              // Output emitter
  
  handleClick(event: MouseEvent) {
    this.onClick.emit(event);
  }
}

// ✅ Two-way binding with model()
export class ToggleComponent {
  isOpen = model(false);                        // Readable/writable
  
  toggle() {
    this.isOpen.update(v => !v);
  }
}

// ❌ Legacy decorators—do not use
export class ButtonComponent {
  @Input() label = 'Click me';        // ❌
  @Output() onClick = new EventEmitter<MouseEvent>();  // ❌
}
```

### Computed State
- Use `computed()` for read-only derived state that responds to signal changes.
- Memoized automatically; recomputes only when dependencies change.

```typescript
export class UserCardComponent {
  firstName = input('');
  lastName = input('');
  
  // ✅ Derived state
  fullName = computed(() => 
    `${this.firstName()} ${this.lastName()}`.trim()
  );
  
  initials = computed(() =>
    (this.firstName()[0] ?? '') + (this.lastName()[0] ?? '')
  );
}
```

---

## Inputs and Outputs

### Prefer `input()` and `output()` Functions
In Angular v22+, signal-based inputs are the standard. **Decorators are legacy.**

```typescript
// ✅ Signal inputs/outputs
export class DealCardComponent {
  deal = input.required<Deal>();
  onSelect = output<Deal>();
  
  onCardClick() {
    this.onSelect.emit(this.deal());
  }
}

// ❌ Decorator-based—legacy
export class DealCardComponent {
  @Input() deal!: Deal;
  @Output() onSelect = new EventEmitter<Deal>();
}
```

### Two-Way Binding with `model()`
Use `model()` to enable `[(property)]` binding in templates:

```typescript
// ✅ Component
export class SearchBoxComponent {
  query = model('');
  
  clear() {
    this.query.set('');
  }
}

// ✅ Usage in parent
<app-search-box [(query)]="searchText" />
```

---

## Dependency Injection

### Prefer `inject()` Over Constructor Injection
Use the `inject()` function in service and component bodies. It is cleaner and works anywhere.

```typescript
// ✅ inject()
export class DealsService {
  private http = inject(HttpClient);
  
  getDeals() {
    return this.http.get<Deal[]>('/api/deals');
  }
}

// ❌ Constructor injection—older pattern
export class DealsService {
  constructor(private http: HttpClient) {}
  
  getDeals() {
    return this.http.get<Deal[]>('/api/deals');
  }
}
```

### Singleton Services with `@Service` Decorator
In Angular v22+, the `@Service` decorator (syntactic sugar over `@Injectable({providedIn: 'root'})`) is preferred.

```typescript
// ✅ v22+ @Service decorator
@Service({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  
  login(email: string, password: string) {
    return this.http.post('/auth/login', { email, password });
  }
}

// ✅ Also valid—traditional approach
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ...
}

// ❌ Don't use—forces manual provider registration
@Injectable()
export class AuthService {
  // Requires manual providedIn or root providers
}
```

---

## Forms: Signal Forms (Stable in v22+)

### Prefer Signal Forms for New Forms
Signal Forms are the modern, type-safe choice. They are stable in Angular v22+.

```typescript
// ✅ Signal Forms
import { FormControl, FormGroup } from '@angular/forms/signals';

export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  
  get email() {
    return this.form.get('email');
  }
  
  onSubmit() {
    if (this.form.valid()) {
      console.log(this.form.getRawValue());  // Type-safe, includes all fields
    }
  }
}
```

### Fallback: Reactive Forms
If not using Signal Forms, use Reactive Forms (not Template-driven).

```typescript
// ✅ Reactive Forms
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}

// ❌ Template-driven forms—avoid
<form (ngSubmit)="onSubmit()">
  <input [(ngModel)]="email" name="email" />
</form>
```

---

## Templates

### Native Control Flow (No `*ngIf`, `*ngFor`, `*ngSwitch`)
Use `@if`, `@for`, `@switch`, `@empty` instead of structural directives.

```html
<!-- ✅ v22+ native control flow -->
@if (isLoggedIn()) {
  <p>Welcome, {{ userName() }}!</p>
} @else {
  <p>Please log in.</p>
}

@for (item of items(); track item.id) {
  <app-item [item]="item" />
} @empty {
  <p>No items found.</p>
}

@switch (status()) {
  @case ('loading') {
    <app-spinner />
  }
  @case ('error') {
    <p class="error">Error loading data.</p>
  }
  @default {
    <p>{{ data() }}</p>
  }
}

<!-- ❌ Legacy structural directives—do not use -->
<p *ngIf="isLoggedIn">Welcome!</p>
<app-item *ngFor="let item of items; trackBy: trackById" />
<p [ngSwitch]="status">
  <ng-container *ngSwitchCase="'loading'">Loading...</ng-container>
</p>
```

### Class and Style Bindings (No `ngClass` or `ngStyle`)
Use native `class` and `style` bindings.

```html
<!-- ✅ Native bindings -->
<button 
  [class.active]="isActive()"
  [class.disabled]="isDisabled()"
  [style.background-color]="bgColor()">
  Click me
</button>

<!-- ✅ Dynamic classes -->
<div [class]="buttonClasses()">Content</div>

<!-- ✅ Dynamic styles -->
<div [style]="dynamicStyles()">Content</div>

<!-- ❌ ngClass/ngStyle—do not use -->
<button [ngClass]="{ active: isActive(), disabled: isDisabled() }">Click</button>
<div [ngStyle]="{ backgroundColor: bgColor() }">Content</div>
```

### Async Pipe
Use the async pipe to subscribe to observables and signals directly in templates.

```html
<!-- ✅ Async pipe with observables -->
@if (userData$ | async as user) {
  <p>Hello, {{ user.name }}</p>
}

<!-- ✅ Signals (auto-tracked) -->
@if (userData()) {
  <p>Hello, {{ userData().name }}</p>
}

<!-- ❌ Manual subscriptions—avoid in templates -->
<p>{{ userData.subscribe(...) }}</p>
```

### Do Not Import `CommonModule`
Import only the directives and pipes your template uses.

```typescript
// ✅ Import only what's needed
@Component({
  selector: 'app-user-card',
  imports: [AsyncPipe, DatePipe, NgIf],  // Explicit imports
  template: `
    @if (user() as user) {
      <p>{{ user.joinDate | date }}</p>
    }
  `,
})
export class UserCardComponent {}

// ❌ Do not import CommonModule
@Component({
  selector: 'app-user-card',
  imports: [CommonModule],  // Too broad; lists everything unused
  template: `...`,
})
export class UserCardComponent {}
```

### External Templates and Styles (Relative Paths)
When using external template or style files, use paths relative to the component TypeScript file.

```typescript
// ✅ Relative paths
@Component({
  selector: 'app-deal-card',
  templateUrl: './deal-card.component.html',  // Relative to .ts file
  styleUrls: ['./deal-card.component.scss'],
})
export class DealCardComponent {}

// ❌ Absolute or incorrect paths
@Component({
  selector: 'app-deal-card',
  templateUrl: '/src/app/features/deals/ui/deal-card.component.html',
  styleUrls: ['/src/app/features/deals/ui/deal-card.component.scss'],
})
export class DealCardComponent {}
```

### Avoid Assuming Globals
Do not assume globals like `new Date()` are available in the component. Use signals or computed values.

```typescript
// ✅ Reactive and explicit
export class TimerComponent {
  now = signal(new Date());
  
  ngOnInit() {
    setInterval(() => this.now.set(new Date()), 1000);
  }
}

// ❌ Assumes Date is globally available
export class TimerComponent {
  currentTime = new Date();  // May not work in SSR or Edge
}
```

---

## Components

### Keep Components Small and Focused
- One responsibility per component.
- Prefer inline templates for simple components (<20 lines).
- Extract reusable logic into services or utility functions.

```typescript
// ✅ Focused, single responsibility
@Component({
  selector: 'app-button',
  template: `
    <button (click)="onClick.emit($event)">
      {{ label() }}
    </button>
  `,
})
export class ButtonComponent {
  label = input('');
  onClick = output<MouseEvent>();
}

// ❌ Too many responsibilities
@Component({
  selector: 'app-deal-manager',
  templateUrl: './deal-manager.component.html',
})
export class DealManagerComponent {
  // Handles auth, API calls, UI, state management, filtering, sorting, ...
}
```

### Host Bindings via `host` Object
Do not use `@HostBinding` or `@HostListener`. Use the `host` property in the component decorator.

```typescript
// ✅ host object
@Component({
  selector: 'app-focusable-button',
  host: {
    '[attr.tabindex]': '0',
    '(keydown.enter)': 'onEnter()',
  },
  template: `<button>Click</button>`,
})
export class FocusableButtonComponent {
  onEnter() {
    console.log('Pressed Enter');
  }
}

// ❌ @HostBinding/@HostListener—do not use
@Component({
  selector: 'app-focusable-button',
  template: `<button>Click</button>`,
})
export class FocusableButtonComponent {
  @HostBinding('attr.tabindex') tabindex = '0';
  
  @HostListener('keydown.enter')
  onEnter() {
    console.log('Pressed Enter');
  }
}
```

### Images: `NgOptimizedImage`
Use `NgOptimizedImage` for all static images (via `ngSrc`).

```typescript
// ✅ NgOptimizedImage for static images
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [NgOptimizedImage],
  template: `
    <img ngSrc="assets/user-avatar.png" alt="User Avatar" width="40" height="40" />
  `,
})
export class AvatarComponent {}

// ❌ Standard <img> for static images
@Component({
  template: `<img src="assets/user-avatar.png" />`,
})
export class AvatarComponent {}

// ⚠️ NgOptimizedImage does NOT work for base64 inline images
// For base64, use standard <img src="data:image/...">
```

---

## Services

### Single Responsibility
- One service = one concern (Auth, API, Config, etc.).
- Delegate to other services as needed.

### Public API and Tokens
- Export **only** public interfaces, tokens, and providers in `public-api.ts`.
- Hide implementations (`.impl.ts` files).
- Use injection tokens for dependency inversion.

```typescript
// ✅ public-api.ts
export type { IDealsService } from './deals.service';
export { DEALS_SERVICE } from './deals.service';
export { provideDeals } from './deals.providers';

// 🔒 deals.service.ts (internal)
export interface IDealsService {
  getDeals(): Observable<Deal[]>;
}

export const DEALS_SERVICE = new InjectionToken<IDealsService>('core.deals');

// 🔒 deals.service.impl.ts (internal)
@Service({ providedIn: 'root' })
export class DealsServiceImpl implements IDealsService {
  private http = inject(HttpClient);
  
  getDeals(): Observable<Deal[]> {
    return this.http.get<Deal[]>('/api/deals');
  }
}
```

### Provider Configuration
Register services in `core.providers.ts` or feature-level provider functions.

```typescript
// ✅ core.providers.ts
export function provideCore() {
  return [
    provideHttpClient(),
    {
      provide: AUTH_SERVICE,
      useClass: AuthServiceImpl,
    },
  ];
}
```

---

## Accessibility (WCAG AA)

Every component **MUST** pass **AXE checks** and follow **WCAG AA** minimums.

### Required Checks
- ✅ All interactive elements are focusable (tabindex, buttons, links).
- ✅ Focus is visible (outline, ring, or custom style).
- ✅ Color contrast is ≥ 4.5:1 for normal text, ≥ 3:1 for large text.
- ✅ ARIA labels and roles are correct (e.g., `role="button"`, `aria-label`).
- ✅ Form inputs have labels (either `<label>` or `aria-label`).
- ✅ Images have alt text.
- ✅ Keyboard navigation works (no keyboard traps).
- ✅ Semantic HTML (use `<button>`, `<a>`, `<form>` instead of `<div role="button">`).

### Example: Accessible Button Component
```typescript
// ✅ Accessible
@Component({
  selector: 'app-button',
  imports: [],
  host: {
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.tabindex]': 'isDisabled() ? -1 : 0',
  },
  template: `
    <button
      type="button"
      [disabled]="isDisabled()"
      (click)="onClick.emit($event)">
      {{ label() }}
    </button>
  `,
})
export class ButtonComponent {
  label = input('');
  isDisabled = input(false);
  onClick = output<MouseEvent>();
}

// ❌ Inaccessible
@Component({
  selector: 'app-button',
  template: `
    <div (click)="onClick.emit($event)">
      {{ label() }}
    </div>
  `,
})
export class ButtonComponent {}
```

### Semantic HTML
- Use `<button>` for clickable actions, not `<div>`.
- Use `<a>` for navigation, not `<div>` with click handlers.
- Use `<form>`, `<input>`, `<label>` for forms.
- Use `<nav>`, `<main>`, `<article>`, `<section>` for page structure.

```html
<!-- ✅ Semantic -->
<button (click)="submit()">Submit</button>
<a href="/dashboard">Dashboard</a>
<form (ngSubmit)="onSubmit()">
  <label for="email">Email</label>
  <input id="email" type="email" />
</form>

<!-- ❌ Div-based—inaccessible -->
<div (click)="submit()" role="button">Submit</div>
<div (click)="navigate()">Dashboard</div>
```

---

## Lazy Loading and Routing

### Feature Route Lazy Loading
Load feature modules on-demand via `loadComponent` or `loadChildren`.

```typescript
// ✅ Lazy-loaded feature route
export const APP_ROUTES: Routes = [
  {
    path: 'deals',
    loadComponent: () => import('./features/deals/pages/deals-page.component')
      .then(m => m.DealsPageComponent),
  },
];
```

### Feature Routes Structure
Each feature exports `FEATURE_ROUTES` from `public-api.ts`.

```typescript
// ✅ features/deals/public-api.ts
export { DEALS_ROUTES } from './deals.routes';

// ✅ features/deals/deals.routes.ts
export const DEALS_ROUTES: Routes = [
  { path: '', component: DealsPageComponent },
  { path: ':id', component: DealDetailComponent },
];

// ✅ Main router config
loadChildren: () => import('@features/deals').then(m => m.DEALS_ROUTES)
```

---

## Summary of Key Points

| Pattern | ✅ Use | ❌ Avoid |
|---------|--------|---------|
| Components | Standalone (default) | NgModules |
| State | `signal()`, `computed()` | Manual subscriptions |
| Input/Output | `input()`, `output()`, `model()` | `@Input`, `@Output` decorators |
| DI | `inject()` | Constructor injection (older) |
| Services | `@Service` in v22+ | Manual `providedIn` |
| Forms | Signal Forms | Template-driven forms |
| Control Flow | `@if`, `@for`, `@switch` | `*ngIf`, `*ngFor`, `*ngSwitch` |
| Bindings | `[class]`, `[style]` | `ngClass`, `ngStyle` |
| Host Config | `host` object | `@HostBinding`, `@HostListener` |
| Accessibility | WCAG AA + AXE checks | Generic components without ARIA |
| Routing | Lazy-loaded features | Eager-loaded modules |

---

## Related Resources

- [Angular 22 Documentation](https://angular.dev)
- [Architecture Guidelines](../ARCHITECTURE.md)
- [WCAG 2.1 AA Standards](https://www.w3.org/WAI/WCAG21/quickref/)
