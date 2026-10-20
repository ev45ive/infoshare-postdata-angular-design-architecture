import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'ui-master-detail',
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` <div class="grid items-start gap-4 md:grid-cols-[18rem_minmax(0,1fr)">
    <div class="min-w-0">
      <!-- Master List -->
    </div>
    <div class="min-w-0">
      <!-- Selected Detail -->
    </div>
  </div>`,
})
export class UIMasterDetail {}
