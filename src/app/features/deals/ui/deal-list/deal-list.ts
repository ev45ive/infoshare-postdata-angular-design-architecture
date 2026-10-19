import { Component, input, output, signal, Signal, WritableSignal } from '@angular/core';
import { Deal } from '../../model/types';

@Component({
  imports: [],
  selector: 'app-deal-list',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <div class="grid gap-2 border">
      @for (item of items(); track $index) {
        <div
          class="grid gap-2 px-2 p-5"
          (click)="selectItem(item.id)"
          [class.bg-blue-500]="selectedId() === item.id"
        >
          {{ item.title }}
        </div>
      } @empty {
        <p class="p-5">No deals found</p>
      }
    </div>
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
