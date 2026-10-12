# ADR Registry (INDEX.md)

Przechowaj plik jako `docs/adr/INDEX.md`. To główny punkt wejścia do wszystkich decyzji architektonicznych projektu.

---

# Architecture Decision Records

Spis wszystkich decyzji architektonicznych podjętych w projekcie.

> **Jak dodać nowy ADR**: Stwórz plik `ADR-XXX.md` w tym folderze, a następnie wpisz wiersz w tabeli poniżej.

---

## Quick Summary

| # | Tytuł | Status | Data | Autor | Notes |
|---|-------|--------|------|-------|-------|
| [ADR-001](./ADR-001.md) | Architektura state managementu | Accepted | 2026-10-12 | Team | Angular Signals |
| [ADR-002](./ADR-002.md) | Signal Forms zamiast Reactive Forms | Proposed | 2026-10-12 | Engineer X | Wymaga spike'u |
| [ADR-003](./ADR-003.md) | Feature-based folder structure | Accepted | 2026-09-15 | Engineer Y | Zamiast ADR-004 |

---

## Grouped by Status

### ✅ Accepted (Aktywne)

Te decyzje są obowiązkowe dla nowego kodu i istniejącego kodu, jeśli jest refaktoryzowany.

| # | Tytuł | Data | Autor | Link |
|---|-------|------|-------|------|
| [ADR-001](./ADR-001.md) | Architektura state managementu | 2026-10-12 | Team | Angular Signals |
| [ADR-003](./ADR-003.md) | Feature-based folder structure | 2026-09-15 | Engineer Y | |

### 🔷 Proposed (W Dyskusji)

Te decyzje są sugerowane, ale nie zostały jeszcze zaakceptowane. Oczekują spikea lub dalszej dyskusji.

| # | Tytuł | Data | Autor | Link |
|---|-------|------|-------|------|
| [ADR-002](./ADR-002.md) | Signal Forms zamiast Reactive Forms | 2026-10-12 | Engineer X | Wymaga spike'u |

### ⚠️ Deprecated (Przestarzałe)

Te decyzje są już nie w użyciu. Stary kod może je jeszcze implementować, ale nowy kod powinien ich unikać.

| # | Tytuł | Data | Autor | Powód |
|---|-------|------|-------|-------|
| (brak) | | | | |

### 🔄 Superseded (Zastąpione)

Te decyzje zostały zastąpione przez nowsze ADR. Stary kod pozostaje, ale nowe decyzje budują na tych tutaj.

| # | Tytuł | Data | Zastąpione przez | Link |
|---|-------|------|------------------|------|
| (brak) | | | | |

---

## By Topic

Opcjonalnie: grupuj ADR po temacie architektonicznym.

### State Management
- [ADR-001: Architektura state managementu](./ADR-001.md)

### Folder Structure & Organization
- [ADR-003: Feature-based folder structure](./ADR-003.md)

### Forms & Input Validation
- [ADR-002: Signal Forms zamiast Reactive Forms](./ADR-002.md) (Proposed)

---

## Statistics

- **Total ADR**: 3
- **Accepted**: 2
- **Proposed**: 1
- **Superseded**: 0
- **Deprecated**: 0

---

## How to Add a New ADR

### 1. Check Existing ADR
Przeszukaj `docs/adr/` — czy decyzja nie jest już udokumentowana?

```bash
ls docs/adr/ADR-*.md
grep -i "state management" docs/adr/*.md
```

### 2. Create File
Stwórz nowy plik `docs/adr/ADR-XXX.md` (zamień XXX na numer). Użyj [ADR Template](../skills/adr-architecture-decision-records-management/references/adr-template.md).

### 3. Update This Index
Dodaj wiersz w tabeli `Quick Summary` wyżej. Status powinien być `Proposed` do momentu acceptance.

### 4. Get Approval
- Przesyłaj do review
- Dyskusja w kanale #architecture-decisions (lub equiv.)
- Po approval zmień status na `Accepted`

### 5. Commit & Push
Commit zarówno ADR jak i `INDEX.md`:

```bash
git add docs/adr/ADR-XXX.md docs/adr/INDEX.md
git commit -m "ADR-XXX: [Brief Title]"
git push
```

---

## Guidelines

- **Numeracja**: Numeruj sekwencyjnie (ADR-001, ADR-002, ...). Nie usuwaj starych ADR — archiwizuj ze statusem `Deprecated` lub `Superseded`.
- **Status**: Zmiana statusu ADR = zmiana w `INDEX.md`. Np. `Proposed` → `Accepted` po team vote'cie.
- **Superseded**: Jeśli ADR-005 zastępuje ADR-002, zmień status ADR-002 na `Superseded by ADR-005`, a w ADR-005 dodaj link do ADR-002.
- **Short-lived ADR**: Jeśli decyzja okazała się tymczasowa, ustaw status `Deprecated` zamiast usuwać.

---

## Links & Resources

- **Full ADR folder**: [./](./README.md)
- **Template**: Użyj [ADR Template](../skills/adr-architecture-decision-records-management/references/adr-template.md) do nowego ADR
- **Checklist**: [ADR Quality Checklist](../skills/adr-architecture-decision-records-management/references/adr-checklist.md)
- **Related**: [Architecture Decisions in Code](../README.md#Architecture)
