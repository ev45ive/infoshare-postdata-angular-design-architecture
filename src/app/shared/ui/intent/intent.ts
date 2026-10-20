import { Directive, input } from '@angular/core';

export type Intent = 'neutral' | 'info' | 'success' | 'warn' | 'danger';

/**
 * Exposes a semantic intent as `data-intent` so any host can style it; components re-expose it via `hostDirectives`.
 *
 * Inputs:
 * - `uiIntent` — `neutral | info | success | warn | danger`; omitted removes the attribute.
 *
 * @example
 * ```html
 * <div uiIntent="danger">Danger zone</div>
 * <ui-card title="Danger zone" intent="danger" />
 * ```
 */
@Directive({
  selector: '[uiIntent]',
  host: { '[attr.data-intent]': 'uiIntent() ?? null' },
})
export class UiIntent {
  readonly uiIntent = input<Intent>();
}
