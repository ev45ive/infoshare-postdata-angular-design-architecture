import { Component, inject } from '@angular/core';
import { UiCollapsible } from '../collapsible/collapsible';

@Component({
  selector: 'ol[uiTimeline]',
  host: { class: 'flex flex-col gap-2' },
  template: `<ng-content />`,
})
export class UiTimeline {}

let nextId = 0;

@Component({
  selector: 'li[uiTimelineItem]',
  hostDirectives: [{ directive: UiCollapsible, inputs: ['expanded'], outputs: ['expandedChange'] }],
  host: { class: 'block rounded-md border border-surface-200 p-3' },
  template: `
    <button
      type="button"
      class="flex w-full items-center gap-2 text-left"
      [attr.aria-expanded]="collapse.expanded()"
      [attr.aria-controls]="bodyId"
      (click)="collapse.toggle()"
    >
      <i class="pi text-xs" [class]="collapse.expanded() ? 'pi-chevron-down' : 'pi-chevron-right'" aria-hidden="true"></i>
      <ng-content select="[timeline-icon]" />
      <span class="min-w-0 flex-1"><ng-content select="[timeline-summary]" /></span>
      <small class="text-muted-color"><ng-content select="[timeline-meta]" /></small>
    </button>
    <div [id]="bodyId" class="pt-2 pl-6" [hidden]="!collapse.expanded()">
      <ng-content />
    </div>
  `,
})
export class UiTimelineItem {
  protected readonly collapse = inject(UiCollapsible);
  protected readonly bodyId = `ui-timeline-item-${nextId++}`;

  constructor() {
    // Items start collapsed; an `[expanded]` binding still wins.
    this.collapse.expanded.set(false);
  }
}

export const UI_TIMELINE = [UiTimeline, UiTimelineItem] as const;
