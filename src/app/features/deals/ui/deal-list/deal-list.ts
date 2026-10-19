import { Component, input, Signal, WritableSignal } from '@angular/core';
import { Deal } from '../../model/types';

@Component({
  imports: [],
  selector: 'app-deal-list',
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` <p>deal-list works!</p> `,
})
export class DealList {
  // items = input<WritableSignal<Deal[]>>(); // WRONG: this cannot be writable from here!

  items = input<Deal[]>();
}
