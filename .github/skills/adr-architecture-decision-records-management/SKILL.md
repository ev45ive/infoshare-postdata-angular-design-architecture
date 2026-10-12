---
name: adr-architecture-decision-records-management
description: "Manage Architecture Decision Records (ADR). Use when: initializing ADR structure in a project; reviewing or searching existing architectural decisions; creating or updating ADR documents and registry."
argument-hint: "describe what you want to do with ADR (init, search, create, update)"
disable-model-invocation: true
user-invocable: true
---

# Architecture Decision Records (ADR) Management

Skill do zarządzania Architecture Decision Records — dokumentacji decyzji architektonicznych projektu.

## Kiedy Używać

- **Inicjalizacja** — Nowy projekt, nie ma jeszcze struktur ADR
- **Przegląd** — Szukasz istniejących decyzji, historii zmian
- **Tworzenie** — Nowa decyzja architektoniczna do udokumentowania
- **Aktualizacja** — Zmiana statusu, supercedowanie starego ADR

## Trzy Tryby Pracy

### 1️⃣ Inicjalizacja (Init)

**Kiedy**: Pierwszy raz w projekcie, nie ma jeszcze folderu `docs/adr/`

**Co robi**:
- Tworzy katalog `docs/adr/`
- Tworzy `docs/adr/INDEX.md` (rejestr ADR)
- Dodaje szablony referencyj

**Jak użyć**: "Zainicjalizuj strukturę ADR w projekcie"

---

### 2️⃣ Przegląd & Wyszukiwanie (Review)

**Kiedy**: Chcesz zobaczyć istniejące ADR, szukać konkretnej decyzji

**Co robi**:
- Wyświetla listę wszystkich ADR z numerami i statusami
- Przeszukuje ADR po słowach kluczowych (context, decision, status)
- Pokazuje zależności między ADR (które ją zastępują, które na niej bazują)

**Jak użyć**: 
- "Pokaż wszystkie zaakceptowane ADR"
- "Szukaj ADR o state managemencie"
- "Jaka decyzja zastępiła ADR-001?"

---

### 3️⃣ Tworzenie & Aktualizacja (Create/Update)

**Kiedy**: Podjęliśmy nową decyzję architektoniczną, lub zmieniamy status

**Przepływ**:
1. Agent zadaje pytania o decyzję (kontekst, alternatywy, konsekwencje)
2. Generuje nowy dokument ADR (`docs/adr/ADR-XXX.md`)
3. Aktualizuje rejestr (`docs/adr/INDEX.md`)
4. Pokazuje czek-listę zweryfikowaną

**Jak użyć**: "Stwórz nowy ADR o wyborze state managementu"

---

## Struktura Pliku ADR

Zobacz: [ADR Template](./references/adr-template.md)

**Części obowiązkowe**:
- **Tytuł** — jasny, opisowy
- **Status** — `Proposed` / `Accepted` / `Deprecated` / `Superseded`
- **Context** — neutralny opis problemu
- **Decision** — konkretna decyzja
- **Consequences** — plusy i minusy
- **Alternatives** — co rozważaliśmy
- **Date & Author** — kiedy i kto

---

## Rejestr ADR (INDEX.md)

Zobacz: [Registry Template](./references/adr-registry-template.md)

Każdy ADR musi być wpisany w rejestr:

| # | Tytuł | Status | Data | Autor |
|---|-------|--------|------|-------|
| ADR-001 | Wybór state managementu | Accepted | 2026-10-12 | Team |

---

## Czek-lista Jakości

Przed zaakceptowaniem ADR, sprawdź: [ADR Checklist](./references/adr-checklist.md)

✅ Kontekst jest **neutralny** (nie propaguje wybraną opcję)  
✅ Konsekwencje są **konkretne** (coś się zmienia w kodzie/procesie)  
✅ Alternatywy są **omówione** (dlaczego je odrzuciliśmy)  
✅ Status jest **aktualny** (czy to proponowana czy zaakceptowana)  
✅ Wpisane w **INDEX.md** (śledzialność)  

---

## Główne Best Practices

| ✅ Robić | ❌ Nie robić |
|---------|------------|
| Pisać ADR *przed* lub zaraz *po* spike'u | Czekać aż implementacja będzie gotowa |
| Krótkie (1–2 strony) | Zbyt szczegółowe (to nie RFC) |
| Neutralne sformułowanie contextu | Propagandę dla wybranej opcji |
| Przechowywać w gicie | Przechowywać w Confluence/odseparowane |
| Linki do kodu, issue, dyskusji | Dokument bez śladów decyzji |
| Archiwizować stare ADR (`Superseded`) | Usuwać stare decyzje |
| Jeden ADR per decyzję | ADR dla każdego ticketu |

---

## Komendy Szybkie

```
# Inicjalizacja
"Zainicjalizuj ADR w projekcie"
"Setup struktura ADR w docs/adr"

# Przegląd
"Pokaż wszystkie ADR"
"Jakie są zaakceptowane decyzje?"
"Szukaj ADR o architekturze"

# Tworzenie
"Stwórz nowy ADR o [temat]"
"Dokumentuj decyzję o [wybór]"
"Zaproponuj ADR dla [problem]"

# Zmiana statusu
"Oznacz ADR-001 jako Superseded przez ADR-003"
"Zaakceptuj ADR-002"
```

---

## Powiązane Materiały

- **Kontekst**: Co zawiera dobry ADR → przeczytaj Introduction powyżej
- **Edgecases**: Supersedence, wiele autorów → [ADR Checklist](./references/adr-checklist.md)
- **Szablon gotowy do użytku**: [ADR Template](./references/adr-template.md)
