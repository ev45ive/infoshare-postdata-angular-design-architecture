import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  imports: [CardModule],
  selector: 'ui-card',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  // templateUrl: './ui-card.html',
  template: `
    <p-card>
      <ng-content #content></ng-content>
    </p-card>
  `,
})
export class UiCard {}
