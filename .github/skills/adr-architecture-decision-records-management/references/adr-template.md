# ADR Template

Użyj tego szablonu do stworzenia nowego dokumentu ADR. Zapisz jako `docs/adr/ADR-XXX.md` (zamień XXX na numer).

---

## ADR-NNN: [Krótki Tytuł Decyzji]

**Status:** Proposed | Accepted | Deprecated | Superseded (by ADR-NNN)  
**Date:** YYYY-MM-DD  
**Author:** [Imię, zespół]  
**Deciders:** [Kto podejmuje ostateczną decyzję]

---

## Context

Opisz sytuację, która doprowadziła do tej decyzji. Odpowiedz na:
- Jaki problem lub pytanie się pojawił?
- Jakie były ograniczenia (performance, koszt, czas)?
- Jakie wymagania musiały być spełnione?
- Dlaczego teraz musimy podjąć decyzję?

**Przykład:**
```
Aplikacja rośnie, komponent state management staje się bottleneckiem.
Alternatywne podejścia (Redux, Context API, Signals) mają różne 
trade-off'y w zakresie boilerplate'u, skalowania i testabilności.
Decyzja była pilna, bo team chciał migrować do Angular 22 w Q1.
```

---

## Decision

Jasne, konkretne sformułowanie co decydujemy. Forma przyszła czasem, nie otwarte pytania.

**Zła decyzja:** "Czy powinniśmy używać Signals?"  
**Dobra decyzja:** "Będziemy używać Angular Signals do state managementu zamiast RxJS w nowych komponentach."

---

## Consequences

Opisz skutki decyzji. Podziel na:

### ✅ Pozytywne
- Mniej boilerplate'u w porównaniu do Redux
- Signals są domyślnym podejściem w Angular 22+
- Łatwiej testować (pure functions)

### ⚠️ Negatywne / Koszty
- Wymaga refaktoringu istniejących serwisów RxJS
- Nowy pattern dla developerów przyzwyczajonych do Observables
- Mniejsza ekosystem bibliotek (mniej stack overflow answers)

### 🚨 Ryzyka / Wyzwania
- Migracja może być czasochłonna na dużym projekcie
- DevTools / debugging tooling jeszcze się rozwija

---

## Alternatives

Omów opcje które rozpatrywałeś. Dla każdej:
- Krótki opis
- Dlaczego ją odrzuciliśmy

### 1. Redux
- Pros: Dużo narzędzi, popularny, time-travel debugging
- Cons: Ogromna ilość boilerplate'u, curve learning dla nowych devów
- **Dlaczego odrzuciliśmy:** Overkill dla naszej skali, team chciał czegoś lżejszego

### 2. Context API
- Pros: Wbudowany w React... czekaj, używamy Angular
- Cons: Nie dotyczy
- **Dlaczego odrzuciliśmy:** [N/A - inny ekosystem]

### 3. MobX
- Pros: Reactive, mniej boilerplate'u niż Redux
- Cons: Mniejsza społeczność, rzadka w ekosystemie Angular
- **Dlaczego odrzuciliśmy:** Signals robią to lepiej w Angular 22+

---

## Links & References

- **Issue/Spike:** [#1234 State Management Investigation](https://github.com/org/repo/issues/1234)
- **Implementation:** [PR #5678](https://github.com/org/repo/pull/5678)
- **Dokumentacja:** [Angular Signals](https://angular.io/guide/signals)
- **Dyskusja:** [Slack #architecture-decisions](https://slack.com/app_redirect?channel=C123)
- **Related ADR:** ADR-001 (architektura komponentów), ADR-003 (dependency injection)

---

## Superseded By

Jeśli ten ADR został zastąpiony, wpisz tutaj:

```
⚠️ This ADR is superseded by [ADR-NNN: Title](./ADR-NNN.md) (dated YYYY-MM-DD)
Reason: [Krótko — co się zmieniło]
```

---

## Notes

Dodatkowe uwagi, edge cases, powinności follow-up.

- [ ] Code review dla implementacji
- [ ] Update documentation
- [ ] Team training session (jeśli nowy pattern)

---

## Template Checklist

Przed commitkiem sprawdź:
- ✅ Status jest prawidłowy (Proposed / Accepted / ...)
- ✅ Context nie ma propagandy (neutralny tone)
- ✅ Decision jest konkretna i przemienna (nie pytanie)
- ✅ Consequences mają plusy i minusy
- ✅ Alternatives mają co najmniej 2 opcje
- ✅ Wpisane w INDEX.md z numerem i datą
- ✅ Linki do kodu / issue / slack'a jeśli są dostępne
