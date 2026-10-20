import { Directive, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Directive({
  selector: '[uiLink]',
  host: {
    class: 'text-link hover:underline',
  },
  hostDirectives: [
    // { directive: RouterLinkActive/* , inputs: ['routerLinkActive'] */ },
    RouterLinkActive,
    { directive: RouterLink, inputs: ['routerLink:uiLink'] },
  ],
  providers: [/* RouterLink, RouterLinkActive, UILink */],
})
export class UILink {
  // routerLinkActive = input('underline text-primary!');

  routerLinkActive = inject(RouterLinkActive);

  constructor() {
    // TODO: OCP - overrides : providers / input
    this.routerLinkActive.routerLinkActive = 'underline text-primary!';
    this.routerLinkActive.routerLinkActiveOptions = { exact: true };
  }
}
