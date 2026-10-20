import { Component, booleanAttribute, input } from '@angular/core';

export type PropertyListLayout = 'stacked' | 'grid' | 'row';

@Component({
  selector: 'dl[uiPropertyList]',
  host: { class: 'grid gap-3', '[attr.data-layout]': 'layout()' },
  styles: `
    :host([data-layout='grid']) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    :host([data-layout='row']) {
      grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    }
  `,
  template: `<ng-content />`,
})
export class UiPropertyList {
  readonly layout = input<PropertyListLayout>('stacked');
}

@Component({
  selector: 'div[uiProperty]',
  host: { '[class.col-span-full]': 'wide()' },
  template: `
    <dt class="text-sm text-muted-color">{{ label() }}</dt>
    <dd class="flex items-center gap-2"><ng-content /></dd>
  `,
})
export class UiProperty {
  readonly label = input.required<string>();
  readonly wide = input(false, { transform: booleanAttribute });
}
