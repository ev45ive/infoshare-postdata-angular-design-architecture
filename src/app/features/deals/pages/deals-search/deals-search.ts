import { Component, input } from '@angular/core';
import { DealList } from '../../ui/deal-list/deal-list';
import { DealListItem } from '../../ui/deal-list-item/deal-list-item';
import { DealDetailCard } from '../../ui/deal-detail-card/deal-detail-card';
import { ButtonDirective } from 'primeng/button';
import { UIPageHeader } from '../../../../shared/ui/page/page-header/page-header';
import { UIMasterDetail } from '../../../../shared/ui/layout/master-detail/master-detail';
import { useDeal, useDeals } from '../../injectables/useDeals';
import { UiCard } from '../../../../shared/components/ui-card/ui-card';
import { UiIntent } from '../../../../shared/ui/intent/intent';

import { RouterOutlet } from '@angular/router';

@Component({
  imports: [
    DealList,
    DealListItem,
    DealDetailCard,
    ButtonDirective,
    UIPageHeader,
    UIMasterDetail,
    UiCard,
    UiIntent,
    RouterOutlet,
  ],
  selector: 'app-deals-search',
  template: `
    <ui-page-header title="Deals">
      <button pButton outlined>New Deal</button>
    </ui-page-header>

    <ui-master-detail>
      <app-deal-list ui-master [items]="dealsResource.value()" />

      @if (dealsResource.error()) {
        <ui-card [title]="dealsResource.error()" uiIntent="danger" />
      }

      <router-outlet />
    </ui-master-detail>
  `,
})
export class DealsSearch {
  query = input('');
  selectedDealId = input('', { alias: 'id' });

  dealsResource = useDeals(this.query);
  selectedDealResource = useDeal(this.selectedDealId);
}
