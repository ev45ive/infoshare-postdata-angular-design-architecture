import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { DealList } from '../../ui/deal-list/deal-list';
import { DealListItem } from '../../ui/deal-list-item/deal-list-item';
import { DealDetailCard } from '../../ui/deal-detail-card/deal-detail-card';
import { Button, ButtonDirective } from 'primeng/button';
import { mockDeals } from '../../data/mock-deals';
import { Deal } from '../../model/types';
import { UIPageHeader } from '../../../../shared/ui/page/page-header/page-header';
import { UIMasterDetail } from '../../../../shared/ui/layout/master-detail/master-detail';
import { useDeal, useDeals, useDealsQuery } from '../../injectables/useDeals';
import { UiCard } from '../../../../shared/components/ui-card/ui-card';
import { UiIntent } from '../../../../shared/ui/intent/intent';
import { CRMAPI } from '@shared/CRMApi';
import { catchError, concatMap, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs';
import { unsubscribe } from 'diagnostics_channel';

import {
  toObservable,
  toSignal,
  outputFromObservable,
  rxResource,
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';
import { httpResource } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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
  ],
  selector: 'app-deals-search',
  template: `
    <ui-page-header title="Deals">
      <button pButton outlined>New Deal</button>
    </ui-page-header>

    <ui-master-detail>
      <app-deal-list
        ui-master
        [items]="dealsResource.value()"
        [selectedId]="selectedDealId()"
        (selected)="selectDealById($event)"
        #dealListRef
      />

      @if (dealsResource.error()) {
        <ui-card [title]="dealsResource.error()" uiIntent="danger" />
      }

      @if (selectedDealResource.isLoading()) {
        <ui-card title="Loading Deal" uiIntent="info" />
      }
      @if (selectedDealResource.error()) {
        <ui-card [title]="selectedDealResource.error()" uiIntent="danger" />
      } @else {
        <app-deal-detail-card [deal]="selectedDealResource.value()" />
      }

      <!-- TODO: form -->
    </ui-master-detail>
  `,
})
export class DealsSearch {
  api = inject(CRMAPI);
  route = inject(ActivatedRoute);
  router = inject(Router);

  params = toSignal(this.route.queryParams, {
    initialValue: { q: '', id: '' },
  });

  query = computed(() => this.params().q);
  selectedDealId = computed(() => this.params().id);

  dealsResource = useDeals(this.query);
  selectedDealResource = useDeal(this.selectedDealId);

  selectDealById(id: Deal['id']) {
    // this.router.navigate([], {
    //   queryParams: { id },
    //   queryParamsHandling: 'merge',
    //   relativeTo: this.route,
    // });
  }
}
