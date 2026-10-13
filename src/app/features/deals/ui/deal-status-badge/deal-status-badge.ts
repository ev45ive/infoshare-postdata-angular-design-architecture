import { Component } from '@angular/core';
import { Badge } from 'primeng/badge';

@Component({
  imports: [Badge],
  selector: 'app-deal-status-badge',
  styles: `
    :host {
      display: block;
    }
  `,
  template: ` <p-badge value="Status" /> `,
})
export class DealStatusBadge {}
