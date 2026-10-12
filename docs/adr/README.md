# Architecture Decision Records (ADR)

Folder zawierający wszystkie Architecture Decision Records — dokumentację ważnych decyzji architektonicznych projektu.

## 🎯 Po co ADR?

ADR to prosta, lekka forma dokumentowania ważnych decyzji architektonicznych. Każde ADR:
- Wyjaśnia **jaki problem** prowadził do decyzji
- Dokumentuje **co się zdecydowaliśmy**
- Pokazuje **konsekwencje** tej decyzji
- Opisuje **alternatywy** które rozpatrywaliśmy

ADR żyje w gicie razem z kodem — mogą być przeszukiwane, linkowane, wersjonowane, i historyzowane jak wszystko inne w projekcie.

## 📂 Struktura

```
docs/adr/
├── INDEX.md              ← 📋 Spis wszystkich ADR (zacznij tutaj!)
├── ADR-001.md           ← Konkretna decyzja
├── ADR-002.md
└── ...
```

## 🚀 Szybki Start

### Przejrzeć istniejące ADR
Otwórz [INDEX.md](./INDEX.md) — tam są wszystkie decyzje + statystyki.

### Szukać konkretne ADR
```bash
grep -i "state management" docs/adr/*.md
```

### Stworzić nowy ADR

Użyj skill'u w VS Code:
```
/adr-architecture-decision-records-management: stwórz nowy ADR o [temat]
```

Lub ręcznie:
1. Skopiuj plik `ADR-001.md` (jeśli istnieje) lub użyj szablonu
2. Zmień numer (ADR-002, ADR-003, ...)
3. Wypełnij sekcje: Context, Decision, Consequences, Alternatives
4. Dodaj wiersz w [INDEX.md](./INDEX.md)
5. Wyślij do review

## 📝 Struktura ADR

Każde ADR powinno zawierać:

| Sekcja | Co zawiera |
|--------|-----------|
| **Status** | `Proposed` / `Accepted` / `Deprecated` / `Superseded` |
| **Context** | Jaki problem / pytanie się pojawił? (neutralny tone) |
| **Decision** | Konkretna decyzja (nie pytanie!) |
| **Consequences** | Plusy, minusy, ryzyka |
| **Alternatives** | Co rozpatrywaliśmy i dlaczego odrzuciliśmy |
| **Date & Author** | Kiedy i kto |

## ✅ Checklist Przed Review

- [ ] Context jest **neutralny** (nie propaganda dla wybranej opcji)
- [ ] Decision to **konkretna akcja** (nie pytanie)
- [ ] Consequences mają **plusy i minusy** (nie tylko jedno)
- [ ] Alternatywy są **omówione** (dlaczego ich odrzuciliśmy)
- [ ] Wpisane w [INDEX.md](./INDEX.md) z numerem i statusem
- [ ] Status to `Proposed` (przed approval) lub `Accepted` (po approval)

## 🎓 Best Practices

✅ **Robić:**
- Pisać ADR **przed** lub **zaraz po** spike'u
- Krótkie (1–2 strony) i konkretne
- Przechowywać w **gicie**
- Linkować do kodu, issue, dyskusji
- Archiwizować stare decyzje (status `Deprecated` / `Superseded`)

❌ **Nie robić:**
- Czekać aż implementacja będzie gotowa
- Zbyt szczegółowych (to nie RFC)
- Usuwać stare ADR — zmień status
- Pisać ADR dla każdego ticketu — tylko dla decyzji architektonicznych

## 🔍 Komendy Szybkie

```bash
# Liczba ADR
wc -l INDEX.md | awk '{print $1 - 10}'

# Pokaż tylko zaakceptowane
grep "Accepted" docs/adr/*.md

# Szukaj po słowie kluczowym
grep -r "signals\|state" docs/adr/ | grep -i "decision\|consequences"
```

## 📚 Skill & Templates

Wszystkie szablony, instrukcje, i czek-listy są dostępne w skill'u:

```
/adr-architecture-decision-records-management
```

Tam znajdziesz:
- Pełny szablon ADR
- Czek-listę jakości (dla autora i reviewera)
- Instrukcje inicjalizacji i zarządzania

## 📖 Czytanie Istniejącego ADR

1. Zacznij od [INDEX.md](./INDEX.md) — przegląd wszystkich decyzji
2. Otwórz konkretne ADR które Cię interesuje (np. [ADR-001](./ADR-001.md))
3. Czytaj w kolejności: Status → Context → Decision → Consequences → Alternatives
4. Jeśli jest link do kodu/issue — kliknij i zobacz implementację

## ❓ Pytania?

- Jak dodać nowy ADR? → [INDEX.md](./INDEX.md#how-to-add-a-new-adr)
- Jaka struktura ADR? → Poczytaj istniejące ADR w tym folderze
- Co jest w skill'u? → `/adr-architecture-decision-records-management`
- Coś nie działa? → Sprawdź czek-listę w skill'u

---

**Ostatnia aktualizacja**: 2026-10-12  
**Status**: 🟢 Aktywne
