import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { DealList } from '../../ui/deal-list/deal-list';
import { DealListItem } from '../../ui/deal-list-item/deal-list-item';
import { DealDetailCard } from '../../ui/deal-detail-card/deal-detail-card';
import { Button, ButtonDirective } from 'primeng/button';
import { mockDeals } from '../../data/mock-deals';
import { Deal } from '../../model/types';
import { UIPageHeader } from '../../../../shared/ui/page/page-header/page-header';
import { UIMasterDetail } from '../../../../shared/ui/layout/master-detail/master-detail';
import { DealsService, DealsSource, useDeals } from '../../injectables/useDeals';

@Component({
  imports: [DealList, DealListItem, DealDetailCard, ButtonDirective, UIPageHeader, UIMasterDetail],
  selector: 'app-deals-search',
  template: `
    <ui-page-header title="Deals">
      <button pButton outlined>New Deal</button>
    </ui-page-header>

    <ui-master-detail>
      <app-deal-list
        ui-master
        [items]="deals()"
        [selectedId]="selectedDealId()"
        (selected)="selectDealById($event)"
        #dealListRef
      />

      <app-deal-detail-card [deal]="selectedDeal()"></app-deal-detail-card>
    </ui-master-detail>
  `,
  providers: [
    // DealsService, // local lifecycle
    
    // { provide: DealsSourceA, useExisting: DealsService }, // Share 
    // { provide: DealsSourceB, useExisting: DealsService }, // Share

    // { provide: DealsSourceA, useClass: DealsService }, // create A
    // { provide: DealsSourceB, useClass: DealsService }, // create B
  ],
})
export class DealsSearch {
  selectedDealId = signal<Deal['id']>('d2');

  // Factory Coupling -> Dependency Inversion
  // dealsService = new DealsService(new API(), new Session( new API));

  // dealsService: DealsSource = inject(DealsSource);
  // dealsService = inject(DealsService); // singleton
  dealsService = inject(DealsSource); // providers

  selectedDeal = signal<Deal | undefined>(undefined);
  message = signal<Error | null>(null);

  deals = useDeals(this.selectedDealId);

  selectDealById(id: Deal['id']) {
    this.selectedDealId.set(id);
  }
}
