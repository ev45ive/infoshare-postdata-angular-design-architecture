import { Component } from '@angular/core';
import { UiCard } from '../ui-card/ui-card';

@Component({
  imports: [UiCard],
  selector: 'app-scratchpad',
  styles: `
    :host {
      display: block;
    }
  `,
  templateUrl: './scratchpad.html',
})
export class Scratchpad {}
