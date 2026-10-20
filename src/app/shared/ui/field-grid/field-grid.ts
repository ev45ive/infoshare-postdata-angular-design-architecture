import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-field-grid',
  host: { class: 'grid gap-4', '[style.grid-template-columns]': '"repeat(" + cols() + ", minmax(0, 1fr))"' },
  template: `<ng-content />`,
})
export class UiFieldGrid {
  readonly cols = input(2);
}
