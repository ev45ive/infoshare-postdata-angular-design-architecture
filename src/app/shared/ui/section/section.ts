import { Component, booleanAttribute, computed, inject, input } from '@angular/core';
import { UiCollapsible } from '../collapsible/collapsible';

let nextId = 0;

@Component({
  selector: 'ui-section',
  hostDirectives: [{ directive: UiCollapsible, inputs: ['expanded'], outputs: ['expandedChange'] }],
  host: { class: 'block rounded-lg border border-surface-200 p-4' },
  template: `
    <header class="flex items-center justify-between gap-2" [class.mb-3]="open()">
      <h2 class="font-semibold">
        @if (collapsible()) {
          <button
            type="button"
            class="flex items-center gap-2"
            [attr.aria-expanded]="collapse.expanded()"
            [attr.aria-controls]="bodyId"
            (click)="collapse.toggle()"
          >
            <i class="pi text-xs" [class]="collapse.expanded() ? 'pi-chevron-down' : 'pi-chevron-right'" aria-hidden="true"></i>
            {{ title() }}
            @if (count() !== undefined) {
              ({{ count() }})
            }
          </button>
        } @else {
          {{ title() }}
          @if (count() !== undefined) {
            ({{ count() }})
          }
        }
      </h2>
      <div class="flex items-center gap-2"><ng-content select="[section-actions]" /></div>
    </header>
    <div [id]="bodyId" [hidden]="!open()">
      <ng-content />
      <div class="mt-3 empty:hidden"><ng-content select="[section-footer]" /></div>
    </div>
  `,
})
export class UiSection {
  readonly title = input.required<string>();
  readonly count = input<number>();
  readonly collapsible = input(false, { transform: booleanAttribute });

  protected readonly collapse = inject(UiCollapsible);
  protected readonly bodyId = `ui-section-${nextId++}`;
  protected readonly open = computed(() => !this.collapsible() || this.collapse.expanded());
}
