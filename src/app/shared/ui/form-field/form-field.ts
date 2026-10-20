import { Component, booleanAttribute, computed, contentChild, effect, input } from '@angular/core';
import { FormField } from '@angular/forms/signals';

let nextId = 0;

@Component({
  selector: 'ui-form-field',
  host: { class: 'flex min-w-0 flex-col gap-1', '[class.col-span-full]': 'wide()' },
  template: `
    <label [attr.for]="controlId()" class="text-sm font-medium">
      {{ label() }}
      @if (optional()) {
        <span class="font-normal text-muted-color">(Optional)</span>
      }
    </label>
    <ng-content />
    @if (hint()) {
      <small [id]="hintId" class="text-muted-color">{{ hint() }}</small>
    }
    @if (errors().length) {
      <small [id]="errorId" class="text-red-700">
        @for (error of errors(); track $index) {
          {{ error.message ?? error.kind }}
        }
      </small>
    }
  `,
})
export class UiFormField {
  readonly label = input.required<string>();
  readonly hint = input<string>();
  readonly optional = input(false, { transform: booleanAttribute });
  readonly wide = input(false, { transform: booleanAttribute });
  /** Only needed for controls without `[formField]`. */
  readonly for = input<string>();

  private readonly id = `ui-form-field-${nextId++}`;
  protected readonly hintId = `${this.id}-hint`;
  protected readonly errorId = `${this.id}-error`;

  private readonly control = contentChild(FormField);

  protected readonly controlId = computed(() => this.for() ?? (this.control()?.element.id || this.id));
  protected readonly errors = computed(() => {
    const state = this.control()?.state();
    return state?.touched() && state.invalid() ? state.errors() : [];
  });

  constructor() {
    effect(() => {
      const element = this.control()?.element;
      if (!element) return;
      element.id ||= this.id;
      const describedBy = [this.hint() ? this.hintId : null, this.errors().length ? this.errorId : null].filter(Boolean);
      if (describedBy.length) element.setAttribute('aria-describedby', describedBy.join(' '));
      else element.removeAttribute('aria-describedby');
    });
  }
}
