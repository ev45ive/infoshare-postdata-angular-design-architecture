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
      .ui-card-header{}
      .ui-card-image{}
      .ui-card-footer{}
      .ui-card-actions{}
    `,
  ],
  // templateUrl: './ui-card.html',
  template: `
    <p-card>
      <div class="ui-card-header">
        <div class="bg-amber-200">
          <ng-content select="ui-card-title, [ui-card-title]">
            <div class="text-2xl leading-loose mb-1">
              {{ title() }}
            </div>
          </ng-content>
        </div>

        <ng-content select="ui-card-header"></ng-content>
      </div>

      <div class="ui-card-image">
        <ng-content select="ui-card-image"></ng-content>
      </div>

      <!-- <ng-content select="div,h1,h2,button,.banana,.placki"></ng-content> -->

      <!-- Content - Composition -->
      <ng-content #content> No Content </ng-content>

      <ng-content select="ui-card-footer"></ng-content>

      <ng-content select="ui-card-actions"></ng-content>
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
