import { Component, inject, input, linkedSignal } from '@angular/core';
import { UiCard } from '../../../../shared/ui/card/card';
import { UiFormField } from '../../../../shared/ui/form-field/form-field';
import { UiFieldGrid } from '../../../../shared/ui/field-grid/field-grid';
import { form, required, applyEach, min, FormField } from '@angular/forms/signals';
import { Deal } from '@feature/deals/model/types';
import { InputText } from 'primeng/inputtext';
import { UiCardFooter } from '../../../../shared/components/ui-card/ui-card';
import { UILink } from '../../../../shared/ui/link';
import { CRMAPI } from '@core/CRMApi';
import { Router } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
  imports: [
    UiCard,
    UiFormField,
    UiFieldGrid,
    FormField,
    InputText,
    UiCardFooter,
    UILink,
    ButtonDirective,
  ],
  selector: 'app-deal-editor',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <form (submit)="submit()">
      <ui-card>
        <ui-field-grid>
          <ui-form-field label="Title">
            <input pInputText [formField]="dealForm.title" />
          </ui-form-field>
          <ui-form-field label="Value ($)">
            <input pInputText type="number" [formField]="dealForm.value" />
          </ui-form-field>
          <ui-form-field label="Contact">
            <input pInputText [formField]="dealForm.contactId" />
          </ui-form-field>
          <!-- 
          <ui-form-field label="Stage">
            <select pInputText [formField]="dealForm.stage">
              @for (s of stages; track s) {
                <option [value]="s">{{ s }}</option>
              }
            </select>
          </ui-form-field>

          <ui-form-field label="Description" optional wide>
            <textarea pTextarea rows="3" [formField]="dealForm.description"></textarea>
          </ui-form-field>
          
          <label class="flex items-center gap-2">
            <input type="checkbox" [formField]="dealForm.isPublic" /> Public deal
          </label> -->
        </ui-field-grid>

        <ui-card-footer>
          <a uiLink="..">Cancel</a>
          <button pButton type="submit">Save</button>
        </ui-card-footer>
      </ui-card>
    </form>
  `,
})
export class DealEditor implements HasUnsavedChanges {
  api = inject(CRMAPI); // TODO: DealStore -> updateDeal
  router = inject(Router);

  submit() {
    debugger;
    // this.api.saveDeal();
    this.router.navigate(['..', this.draft().id]);
  }

  deal = input<DealFormDTO>();

  stages = ContactStatus;

  protected readonly draft = linkedSignal(() => structuredClone(this.deal() ?? emptyDeal()));

  hasUnsavedChanges() {
    return false; // !!this.dealForm().dirty;
  }

  protected readonly dealForm = form(this.draft, (deal) => {
    required(deal.title, { message: 'Title is required' });
    min(deal.value, 0, { message: 'Value cannot be negative' });
    // applyEach(deal.tasks, (task) => required(task.title, { message: 'Task title is required' }));
  });
}

export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

type DealFormDTO = Deal;

const emptyDeal = (): Deal => ({
  id: '',
  title: '',
  value: 0,
  stage: 'new',
  description: '',
  contactId: '',
  public: true,
  // tasks: [],
  createdAt: '2026-01-10T08:00:00Z',
});

const ContactStatus = ['lead', 'prospect', 'customer', 'churned'];

export const DealStageLabel = {
  new: 'New',
  negotiation: 'Negotiation',
  proposal: 'Proposal',
  'closed-won': 'Closed (won)',
  'closed-lost': 'Closed (lost)',
  // suspended: '...'
} as const;
