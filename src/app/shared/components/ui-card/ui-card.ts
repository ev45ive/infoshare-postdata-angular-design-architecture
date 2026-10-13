import { Component, input } from '@angular/core';
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
      <div class="text-2xl leading-loose">
        {{ title() }}
      </div>

      <!-- Content - Composition -->
      <ng-content #content></ng-content>
    </p-card>
  `,
})
export class UiCard {
  
  // Content / Params (optional/default)
  title = input('');


  //
  // Configuration driven 
  //

  // Flags:

  // icon = input()
  // selected = input()
  // disabled = input()
  // someRandomFlag = input()
  // sameFlagAsPrimeNG = input()
  
  // Configs
  
  // passThrough = input<PTConfig>()
  // config = input<UICARDCONFIG>()
  
  // Orthogonal Variants
  
  // isBig = input()
  // isSmall  = input()
  // size = input<'small|'medium;|'large'>()
}
