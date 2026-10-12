# Architecture Guidelines

Dokument ten opisuje architekturę projektu i zasady organizacji kodu.

---

## 📐 Struktura Projektu

```
src/app/
├── routing.ts               # Root routing
├── main.ts                  # Bootstrap
│
├── core/                    # Singleton services, DI config
│   ├── public-api.ts        # 🔓 PUBLIC exports only
│   ├── core.providers.ts    # 🔒 DI configuration
│   │
│   ├── auth/
│   │   ├── auth.service.ts              # 🔓 Public interface
│   │   ├── auth.service.impl.ts         # 🔒 Implementation
│   │   └── auth.token.ts                # 🔒 Injection token
│   │
│   ├── api/
│   │   ├── api.service.ts               # 🔓 Public interface
│   │   ├── api.service.impl.ts          # 🔒 Implementation
│   │   ├── http.interceptor.ts          # 🔒 Internal
│   │   └── api.token.ts                 # 🔒 Token
│   │
│   └── config/
│       ├── config.service.ts            # 🔓 Interface
│       └── config.token.ts              # 🔒 Token
│
├── features/                # Business domains (lazy-loaded)
│   ├── public-api.ts        # 🔓 Feature index
│   │
│   ├── deals/
│   │   ├── public-api.ts                # 🔓 PUBLIC: services, types, routes
│   │   ├── deals.routes.ts              # 🔒 Routing config
│   │   │
│   │   ├── pages/                       # 🔒 Routed components
│   │   │   └── deals-page.component.ts
│   │   │
│   │   ├── ui/                          # 🔒 Feature-specific components
│   │   │   ├── deal-card.component.ts
│   │   │   └── deal-filter.component.ts
│   │   │
│   │   ├── model/                       # 🔓 Types & interfaces
│   │   │   └── deal.model.ts
│   │   │
│   │   ├── services/                    # 🔒 Feature services
│   │   │   ├── deals.service.ts         # Interface
│   │   │   ├── deals.service.impl.ts    # Implementation
│   │   │   └── deals.token.ts           # Token
│   │   │
│   │   └── store/                       # 🔒 Local state
│   │       └── deals.signals.ts
│   │
│   ├── contacts/ ...                    # Druga feature (sama struktura)
│   └── <feature>/
│
└── shared/                  # Reusable components & utilities
    ├── public-api.ts        # 🔓 PUBLIC exports
    │
    ├── ui/                  # 🔓 Generic UI components
    │   ├── components/
    │   │   ├── button.component.ts
    │   │   ├── card.component.ts
    │   │   └── modal.component.ts
    │   └── pipes/
    │       ├── date.pipe.ts
    │       └── currency.pipe.ts
    │
    └── utils/               # 🔓 Pure functions
        ├── formatters.ts
        ├── validators.ts
        └── helpers.ts
```

---

## 🎯 Dependency Flow (Zezwolone Kierunki)

```
┌─────────────────────────────────────────────────────────┐
│                    features/                            │
│  (Deals, Contacts, Reports, etc.)                       │
│  ✅ może zależeć z: core, shared, inne features         │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼ (imports via @core)
┌─────────────────────────────────────────────────────────┐
│                     core/                               │
│  (Auth, API, Config)                                    │
│  ✅ może zależeć z: stdlib, external libs              │
│  ❌ NIGDY nie zależy z features ani shared              │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼ (imports via @shared)
┌─────────────────────────────────────────────────────────┐
│                     shared/                             │
│  (UI Components, Utilities)                             │
│  ✅ może zależeć z: stdlib, external libs              │
│  ❌ NIGDY nie zależy z core ani features                │
└─────────────────────────────────────────────────────────┘
```

### Zasady

1. ✅ **Features** mogą importować z `@core` i `@shared`
2. ✅ **Features** mogą importować z innych **features** TYLKO poprzez ich `public-api.ts`
3. ✅ **Core** publikuje TYLKO publiczne interfaces, tokeny, providery
4. ✅ **Shared** nie zna o `core` ani `features`
5. ❌ **Core** nigdy nie importuje z `features` ani `shared`
6. ❌ **Shared** nigdy nie importuje z `core` ani `features`
7. ❌ **Feature A** nigdy nie importuje z `features/B/` — zawsze `@features/b`

---

## 🔐 Public API Pattern

Każdy moduł (core, features, shared) publikuje **TYLKO** publiczne elementy:

### ✅ Co eksportować w `public-api.ts`

```typescript
// Publiczne typy
export type { Deal } from './model/deal.model';
export type { IDealsService } from './services/deals.service';

// Publiczne tokeny (dla DI)
export { DEALS_SERVICE } from './services/deals.service';
export { DEALS_CONFIG } from './deals.config';

// Publiczne providery (dla konfiguracji)
export { provideDeals } from './deals.providers';

// Publiczne routing
export { DEALS_ROUTES } from './deals.routes';
```

### ❌ Co NIE eksportować

```typescript
// ❌ Konkretne implementacje
export { DealsServiceImpl } from './services/deals.service.impl';

// ❌ Prywatne komponenty
export { DealsPageComponent } from './pages/deals-page.component';
export { DealCardComponent } from './ui/deal-card.component';

// ❌ Prywatne helpery
export { formatDealName } from './utils/deal.formatter';

// ❌ Wewnętrzne tokeny
export { DEALS_CACHE_TOKEN } from './cache/deals.cache.token';
```

---

## 💉 Dependency Inversion Pattern

### Service Interface

```typescript
// ✅ public-api.ts — eksportuj
export interface IAuthService {
  login(email: string, password: string): Observable<void>;
  logout(): void;
  isAuthenticated$(): Observable<boolean>;
}

export const AUTH_SERVICE = new InjectionToken<IAuthService>('core.auth');
```

### Service Implementation

```typescript
// 🔒 auth.service.impl.ts — prywatny
export class AuthServiceImpl implements IAuthService {
  constructor(private httpClient: HttpClient) {}
  
  login(email: string, password: string): Observable<void> {
    return this.httpClient.post<void>('/auth/login', { email, password });
  }
  
  logout(): void { /* ... */ }
  isAuthenticated$(): Observable<boolean> { /* ... */ }
}
```

### DI Configuration

```typescript
// 🔒 core.providers.ts — prywatne
export function provideCore() {
  return [
    provideHttpClient(),
    {
      provide: AUTH_SERVICE,
      useClass: AuthServiceImpl  // ← mapuj token na implementację
    }
  ];
}
```

### Usage w Feature

```typescript
// ✅ Feature importuje TYLKO interfejs i token
import { AUTH_SERVICE, type IAuthService } from '@core';

@Component({...})
export class DealsPageComponent {
  private auth = inject(AUTH_SERVICE);  // ← Inject token
  
  loadDeals() {
    return this.auth.isAuthenticated$().pipe(
      switchMap(() => this.dealsService.load())
    );
  }
}
```

---

## 📝 Path Mappings (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      // Core — public-api only
      "@core": ["src/app/core/public-api.ts"],
      "@core/*": ["src/app/core/public-api.ts"],
      
      // Features — każda ma swoją public-api
      "@features": ["src/app/features/public-api.ts"],
      "@features/*": ["src/app/features/*/public-api.ts"],
      
      // Shared — public-api
      "@shared": ["src/app/shared/public-api.ts"],
      "@shared/*": ["src/app/shared/public-api.ts"],
      
      // Environments
      "@env": ["src/environments"]
    }
  }
}
```

---

## 🛡️ ESLint Rules

### Zabraniaj prywatnych importów

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          "@core/auth/auth.service.impl",
          "@core/*/private*",
          "@core/*/*.impl",
          "@features/*/services/*.impl",
          "@features/*/pages/*",
          "@features/*/ui/*"
        ],
        "message": "❌ Importuj z public-api.ts!"
      }
    ]
  }
}
```

### Egzekwuj kierunki zależności

```json
{
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "depConstraints": [
          {
            "sourceTag": "scope:feature",
            "onlyDependsOnTags": ["scope:shared", "scope:core"]
          },
          {
            "sourceTag": "scope:shared",
            "onlyDependsOnTags": ["scope:shared"]
          },
          {
            "sourceTag": "scope:core",
            "onlyDependsOnTags": []
          }
        ]
      }
    ]
  }
}
```

---

## ✅ Checklist — Gdzie umieścić Kod?

| Artefakt | Gdzie? | Eksportować? |
|----------|--------|--------------|
| **Service interface** | `core/auth/auth.service.ts` | ✅ public-api.ts |
| **Service implementation** | `core/auth/auth.service.impl.ts` | ❌ Nigdy |
| **Injection token** | `core/auth/auth.token.ts` | ✅ public-api.ts |
| **DI provider** | `core/core.providers.ts` | ✅ public-api.ts |
| **Feature interface** | `features/deals/model/deal.ts` | ✅ public-api.ts |
| **Routed component** | `features/deals/pages/deals-page.component.ts` | ❌ Nigdy |
| **UI component** | `features/deals/ui/deal-card.component.ts` | ❌ Nigdy |
| **UI component** (generic) | `shared/ui/button.component.ts` | ✅ public-api.ts |
| **Utility function** | `shared/utils/formatters.ts` | ✅ public-api.ts |

---

## 📚 References

- **ADR-001**: [Feature-Based Architecture with DIP](./adr/ADR-001.md)
- **Angular Styleguide**: https://angular.dev/guide/styleguide
- **Dependency Inversion**: https://en.wikipedia.org/wiki/Dependency_inversion_principle
- **Public API Pattern**: https://github.com/angular/angular/blob/main/packages/core/public-api.ts

---

## 🔄 Zmiana / Feedback

Znalazłeś błąd lub chcesz coś zmienić w architekturze?
1. Stwórz nowy ADR (propozycja zmiany)
2. Dyskusja w team
3. Po zatwierdzeniu — refactoring

Patrz: [docs/adr/](./adr/) dla listy wszystkich decyzji.
