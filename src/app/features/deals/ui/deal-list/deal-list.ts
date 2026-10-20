import { Component, input, output, signal, Signal, WritableSignal } from '@angular/core';
import { Deal } from '../../model/types';
import { UiCard } from '../../../../shared/components/ui-card/ui-card';

@Component({
  imports: [UiCard],
  selector: 'app-deal-list',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <ui-card>
      <div ui-card-list>
        @for (item of items(); track $index) {
          <div
            tabindex="0"
            class="grid gap-2 px-2 p-5"
            (keydown.Space)="selectItem(item.id)"
            (click)="selectItem(item.id)"
            [class.bg-blue-500]="selectedId() === item.id"
          >
            {{ item.title }}
          </div>
        } @empty {
          <p class="p-5">No deals found</p>
        }
      </div>

    </ui-card>
  `,
})
export class DealList {
  items = input<Deal[]>();

  selectedId = input<Deal['id']>();
  selected = output<Deal['id']>();

  selectItem(id: Deal['id']) {
    this.selected.emit(id);
  }
}
