import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'ui-card',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  // templateUrl: './ui-card.html',
  template: `<p>ui-card works!</p> `,
})
export class UiCard {}
