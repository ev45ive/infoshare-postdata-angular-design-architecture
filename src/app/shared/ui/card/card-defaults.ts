import { Directive, InjectionToken, Signal, input, signal } from '@angular/core';

export type CardVariant = 'elevated' | 'outlined' | 'flat' | 'ghost';
export type CardDensity = 'comfortable' | 'compact';

export interface CardConfig {
  variant: CardVariant;
  density: CardDensity;
}

export interface CardDefaultsSource {
  readonly defaults: Signal<Partial<CardConfig>>;
}

export const CARD_DEFAULTS = new InjectionToken<CardDefaultsSource>('CARD_DEFAULTS');

/**
 * Provides card defaults to every `ui-card` below this element.
 * Priority: card input > nearest defaults > built-in default.
 *
 * Inputs:
 * - `uiCardDefaults` — partial `{ variant, density }`.
 *
 * @example
 * ```html
 * <section [uiCardDefaults]="{ density: 'compact', variant: 'outlined' }">
 *   <ui-card title="A" />
 *   <ui-card title="B" variant="elevated" />
 * </section>
 * ```
 */
@Directive({
  selector: '[uiCardDefaults]',
  providers: [{ provide: CARD_DEFAULTS, useExisting: UiCardDefaults }],
})
export class UiCardDefaults implements CardDefaultsSource {
  readonly defaults = input<Partial<CardConfig>>({}, { alias: 'uiCardDefaults' });
}

/**
 * Same contract as `[uiCardDefaults]` for route, story or application providers.
 *
 * @example
 * ```ts
 * providers: [provideCardDefaults({ variant: 'flat' })]
 * ```
 */
export function provideCardDefaults(defaults: Partial<CardConfig>) {
  return { provide: CARD_DEFAULTS, useValue: { defaults: signal(defaults) } satisfies CardDefaultsSource };
}
