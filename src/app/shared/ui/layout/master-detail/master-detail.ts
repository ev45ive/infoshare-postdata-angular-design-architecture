import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'ui-master-detail',
  styles: ``,
  template: ` <div class="grid items-start gap-4 sm:grid-cols-[18rem_minmax(0,1fr)]">
    <div class="min-w-0">
      <!-- List -->
      <ng-content select="[ui-master]" />
    </div>
    <div class="min-w-0 ">
      <!-- Selected Detail -->
      <ng-content />
    </div>
  </div>`,
})
export class UIMasterDetail {}
