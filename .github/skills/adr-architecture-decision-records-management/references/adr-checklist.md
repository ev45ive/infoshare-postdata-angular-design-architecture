# ADR Quality Checklist & Instructions

Instrukcje i czek-lista do weryfikacji jakości ADR przed acceptorem.

---

## Pre-Review Checklist (Autor ADR)

Zanim przesyłasz do review, sprawdź:

### ✅ Struktura i Zawartość

- [ ] Plik jest w lokalizacji `docs/adr/ADR-XXX.md`
- [ ] Numer ADR nie jest duplikatem (sprawdź `docs/adr/INDEX.md`)
- [ ] Tytuł jest krótki i opisowy (nie więcej niż 10 słów)
- [ ] Status wybrany poprawnie (`Proposed` dla nowego ADR)
- [ ] Data jest dzisiejsza (YYYY-MM-DD)
- [ ] Author i Deciders są wpisani (imiona lub zespół)

### ✅ Context (Kontekst)

- [ ] Context jest **neutralny** — nie propaguje wybraną opcję
  - ❌ Zła: "RxJS to chaos, dlatego potrzebujemy Signals"
  - ✅ Dobra: "Aplikacja rośnie, state management ma trade-off'y..."
- [ ] Opisuje **problem**, nie rozwiązanie
- [ ] Wiadomo **dlaczego teraz** podejmujemy decyzję
- [ ] Wymienione są ograniczenia (czas, koszt, performance, ...)

### ✅ Decision (Decyzja)

- [ ] Decyzja jest **konkretna** (nie pytanie)
  - ❌ Zła: "Czy powinniśmy używać Signals?"
  - ✅ Dobra: "Będziemy używać Angular Signals..."
- [ ] Sformułowana **przyszłym czasem** ("będziemy", "używamy")
- [ ] Można ją **zmierzyć** (wiadomo czy się jej stosujemy)
- [ ] Dotyczy **architektonicznych wyborów** (design pattern, tech stack, struktura)
  - ⚠️ Zbyt szczegółowe: "Używamy interfejsu FormInterface dla każdej formy" (to jest detail implementacyjny)
  - ✅ Prawidłowe: "Używamy Signal Forms zamiast Template-driven Forms"

### ✅ Consequences (Konsekwencje)

- [ ] **Pozytywne** skutki — co zyskujemy
  - Konkretne: "Zmniejszenie boilerplate'u o ~30%"
  - Nie abstrakcyjne: "Lepsza jakość" 💥
- [ ] **Negatywne** skutki / koszty — co tracimy lub co nas boli
  - Konkretne: "Wymaga refaktoringu 15 serwisów"
  - Nie straszne: "DevTools mogą być gorsze" ✅
- [ ] **Ryzyka** — co może pójść źle
  - Konkretne: "Migracja może trwać 3 dni"
  - Zaplanowane: "Musimy planować o to na sprincie"
- [ ] Wiadomo **co się zmienia** w projekcie (kod, proces, dokumentacja, ...)

### ✅ Alternatives (Alternatywy)

- [ ] Co najmniej **2 opcje** rozważane
- [ ] Każda opcja ma opis (co by to dało)
- [ ] Dla każdej opcji wiadomo **dlaczego ją odrzuciliśmy**
  - ❌ Zła: "Redux — zbyt ciężki"
  - ✅ Dobra: "Redux — 40% więcej boilerplate'u niż Signals, team wolał lżejsze podejście"
- [ ] Decyzja wyboru jest **jasna** (nie czytanie tekstu między linijkami)

### ✅ Linki & Śledź

- [ ] Są linki do issue/spike'u jeśli istnieją
- [ ] Linki do dokumentacji technicznej (ang. docs)
- [ ] Linki do dyskusji (Slack, PR, email)
- [ ] Jeśli jest implementation — link do PR

### ✅ Status & Metadane

- [ ] Status ADR jest prawidłowy
  - `Proposed` — nowe ADR, czeka na approval
  - `Accepted` — zatwierdzony, team się zgadza
  - `Deprecated` — nie powinniśmy tego robić, ale stary kod może istnieć
  - `Superseded by ADR-XXX` — zastąpiony nowszą decyzją
- [ ] Jeśli `Superseded` — link do nowego ADR jest w tekście
- [ ] Jeśli `Deprecated` — powód jest jasny

### ✅ Rejestr (INDEX.md)

- [ ] ADR wpisane w `docs/adr/INDEX.md` w tabeli `Quick Summary`
- [ ] Kolumny: # | Tytuł | Status | Data | Autor
- [ ] Wpisane w odpowiedni status (Accepted / Proposed / ...)

---

## Review Checklist (Reviewer)

### Pytania Rozumienia

1. **Kontekst?** Czy rozumiesz dlaczego ten ADR był potrzebny?
2. **Decyzja?** Czy wiesz co dokładnie się zmienia?
3. **Konsekwencje?** Czy jasne jest co nas czeka?
4. **Alternatywy?** Czy wiesz co inne opcje oferowały?

Jeśli na którąś z tych odpowiedź to "nie" — poproś autora o zmianę.

### Pytania Techniczne

- [ ] Decyzja pasuje do architektonicznych wyborów już podjętych
- [ ] Nie konfliktuje z innym ADR (sprawdź INDEX.md)
- [ ] Jeśli implementation już istnieje — kod to potwierdza
- [ ] Jeśli implementation planowana — owner wiadomo i deadline jasny

### Pytania Procesu

- [ ] W `docs/adr/` — nie w Confluence, nie w Notion
- [ ] W gicie — możemy je przeszukiwać, linkować, historyza
- [ ] Wersjonowane razem z kodem — ADR i kod ewoluują razem

---

## Common Gotchas

### ❌ Zbyt Szczegółowy

```
❌ ZŁY ADR: "Folder component powinien mieć strukturę component/component.ts, 
component/component.html, component/component.css, z plikami *.spec.ts obok"

✅ DOBRY ADR: "Używamy single-file templates (inline) zamiast external HTML 
dla małych komponentów (<200 linii)"
```

**Reguła**: Jeśli to detail implementacyjny — nie ADR, to lint rule albo convention.

### ❌ Bez Konsekwencji

```
❌ ZŁY ADR: "Decision: Używamy Angular Signals"
   (i nic więcej — co to oznacza?)

✅ DOBRY ADR: 
   Consequences:
   - ✅ Mniej boilerplate'u (łatwiej pisać)
   - ⚠️ Wymaga refaktoringu 15 serwisów (3 dni work)
   - 🚨 DevTools jeszcze się rozwijają (mogą być problemy debugowania)
```

### ❌ Nie Neutralny Kontekst

```
❌ ZŁY: "RxJS jest zawiły i ciężki, dlatego potrzebujemy Signals"
   (propaganda dla wybranej opcji)

✅ DOBRY: "State management ma trade-off'y: RxJS = rozbudowana 
ekosystem ale boilerplate; Signals = mniej kodu ale młodsze narzędzia"
```

### ❌ Bez Alternatyw

```
❌ ZŁY: Tylko opisana decyzja, bez innych opcji

✅ DOBRY: 
   Alternatives:
   1. Redux — popularny, ale 30% więcej boilerplate'u
   2. MobX — reaktywny, ale mniej devów to zna
   3. Context API — (wbudowana, ale nie na Angularz)
   → Wybrano Signals bo (powody)
```

### ❌ Status nie Pasuje

```
❌ ZŁY: 
   Status: Proposed
   (ale to jest implementowana już 3 miesiące, team się zgadza)

✅ DOBRY:
   Status: Accepted
   (bo już zatwierdzono, team to robi)
```

**Zasada**: Zmień status jeśli się coś zmieniło. `Proposed` → `Accepted` po vote'cie.

### ❌ Wiele ADR na Jeden Problem

```
❌ ZŁY:
   ADR-001: State management
   ADR-002: RxJS vs Signals
   ADR-003: Reducers structure
   (trzy ADR dla jednego problemu)

✅ DOBRY:
   ADR-001: State management (Signals + struktura reducers)
   ADR-002: Dependency injection pattern
   (jeden ADR per decyzję, nie per requirement)
```

---

## Edge Cases & Solutions

### Case 1: Decyzja Okazała Się Zła

```
Status: Deprecated
Reason: Signals okazały się zbyt nowe, DevTools nie nadążają.
Nowe podejście: Redux (ADR-XXX)
```

Nie usuwaj ADR — zmień status. To lekcja dla przyszłych.

### Case 2: Decyzja Zastąpiona Nowszą

```
Status: Superseded by ADR-005

(w ADR-005: Reference to ADR-001 in "Alternatives")
```

Link w obie strony — przeszukiwalność.

### Case 3: Team się Nie Zgadza

```
Status: Proposed
Oczekiwanie: Vote w Slack #architecture-decisions (koniec tygodnia)

(lub jeśli deadline — escalate to team lead)
```

Nie zmuszaj do Accepted bez zgody.

### Case 4: Spike Pokazał Inna Ścieżkę

```
Status: Proposed → Accepted (po spike'u)

(dodaj link do spike'u PRa i eksperymentów)
```

Spike to badanie — jeśli ADR okazuje się niedostateczny, iteruj.

---

## Quick Tips for Reviewers

| Pytanie | Jeśli "Nie" | Action |
|---------|-----------|--------|
| Rozumiem kontekst? | ❌ | Poproś autora o wyjaśnienie |
| Znam decyzję? | ❌ | "Decision" za niejasne, rewrite |
| Wiem co mnie czeka? | ❌ | "Consequences" brakuje szczegółów |
| Czy decyzja ma sens? | ❌ | Zapytaj dlaczego te alternatywy, a nie inne |
| Czy to ADR czy detail? | Detajl | Przenieś do lint rule / convention file |
| Czy konflikt z innym ADR? | ✅ Konflikt | Oznacz w obu ADR (versionowanie) |

---

## Zatwierdzenie (Acceptance Criteria)

ADR można zaakceptować jeśli:

✅ Spełnia wszystkie punkty **Pre-Review Checklist**  
✅ Reviewer potwierdzi **Pytania Rozumienia** (all "yes")  
✅ Brak konfliktów z innymi ADR  
✅ Owner implementacji zgadza się z timeline'em  
✅ Wpisane w `docs/adr/INDEX.md` z statusem `Accepted`  

Po zatwierdzeniu: Status `Proposed` → `Accepted`, commit do gita.

---

## Automated Checks (CI/CD Integration)

Opcjonalnie możesz dodać do CI:

```bash
# Sprawdź czy każdy ADR ma link w INDEX.md
# Sprawdź czy numeracja jest sekwencyjna
# Lint YAML frontmatter
```

Ale to overkill dla małych projektów — human review wystarczy.

---

## Summary

**W skrócie**: ADR musi odpowiedzieć na pytania:
1. **Jaki problem?** (Context)
2. **Co robimy?** (Decision)
3. **Co się zmieni?** (Consequences)
4. **Dlaczego nie coś innego?** (Alternatives)

Jeśli umiesz odpowiedzieć — ADR jest dobry. 📝
