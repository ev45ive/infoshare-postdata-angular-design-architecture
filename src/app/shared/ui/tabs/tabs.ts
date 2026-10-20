import {
  Component,
  ElementRef,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChildren,
  input,
  model,
  output,
  viewChild,
  viewChildren,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'ui-tab',
  template: `<ng-template><ng-content /></ng-template>`,
})
export class UiTab {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly count = input<number>();
  readonly closable = input(false, { transform: booleanAttribute });
  readonly content = viewChild.required(TemplateRef);
}

let nextId = 0;

@Component({
  selector: 'ui-tabs',
  imports: [NgTemplateOutlet],
  host: { class: 'block' },
  template: `
    <div class="flex items-end gap-1 border-b border-surface-200">
      <div role="tablist" [attr.aria-label]="label()" class="flex gap-1" (keydown)="onKeydown($event)">
        @for (tab of tabs(); track tab.id()) {
          @let selected = tab.id() === active()?.id();
          <button
            #tabButton
            type="button"
            role="tab"
            class="-mb-px border-b-2 px-3 py-2"
            [class]="selected ? 'border-primary font-medium' : 'border-transparent'"
            [id]="baseId + '-' + tab.id()"
            [attr.aria-selected]="selected"
            [attr.aria-controls]="baseId + '-panel'"
            [tabIndex]="selected ? 0 : -1"
            [attr.aria-keyshortcuts]="tab.closable() ? 'Delete' : null"
            (click)="activeId.set(tab.id())"
            (keydown.delete)="tab.closable() && tabClose.emit(tab.id())"
          >
            {{ tab.label() }}
            @if (tab.count() !== undefined) {
              <span class="ml-1 rounded-full bg-surface-100 px-2 text-sm">{{ tab.count() }}</span>
            }
            @if (tab.closable()) {
              <span class="ml-1 px-1 text-muted-color hover:text-color" aria-hidden="true" (click)="$event.stopPropagation(); tabClose.emit(tab.id())">×</span>
            }
          </button>
        }
      </div>
      <ng-content select="[tabs-end]" />
    </div>
    <div
      role="tabpanel"
      class="pt-4"
      [id]="baseId + '-panel'"
      [attr.aria-labelledby]="baseId + '-' + active()?.id()"
    >
      @if (active(); as tab) {
        <ng-container [ngTemplateOutlet]="tab.content()" />
      }
    </div>
  `,
})
export class UiTabs {
  readonly label = input.required<string>();
  readonly activeId = model<string>();
  readonly tabClose = output<string>();

  protected readonly baseId = `ui-tabs-${nextId++}`;
  protected readonly tabs = contentChildren(UiTab);
  protected readonly active = computed(() => {
    const tabs = this.tabs();
    return tabs.find((t) => t.id() === this.activeId()) ?? tabs[0];
  });

  private readonly buttons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  protected onKeydown(event: KeyboardEvent) {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const tabs = this.tabs();
    const current = tabs.findIndex((t) => t === this.active());
    const next = (current + step + tabs.length) % tabs.length;
    this.activeId.set(tabs[next].id());
    this.buttons()[next]?.nativeElement.focus();
  }
}

export const UI_TABS = [UiTabs, UiTab] as const;
