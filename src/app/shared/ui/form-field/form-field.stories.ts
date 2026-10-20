import { Component, signal } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { FormField, email, form, required } from '@angular/forms/signals';
import { InputTextModule } from 'primeng/inputtext';
import { UiFormField } from './form-field';
import { UiFieldGrid } from '../field-grid/field-grid';

@Component({
  selector: 'story-form-field-demo',
  imports: [UiFormField, UiFieldGrid, FormField, InputTextModule],
  template: `
    <ui-field-grid>
      <ui-form-field label="Name">
        <input pInputText [formField]="f.name" />
      </ui-form-field>
      <ui-form-field label="Email" hint="Touch and leave empty to see the error">
        <input pInputText type="email" [formField]="f.email" />
      </ui-form-field>
      <ui-form-field label="Related case" optional>
        <input pInputText [formField]="f.relatedCase" />
      </ui-form-field>
      <ui-form-field label="Without [formField]" for="plain-input">
        <input id="plain-input" pInputText />
      </ui-form-field>
      <ui-form-field label="Notes" wide>
        <input pInputText [formField]="f.notes" />
      </ui-form-field>
    </ui-field-grid>
  `,
})
class FormFieldDemo {
  protected readonly f = form(signal({ name: 'Anna', email: '', relatedCase: '', notes: '' }), (p) => {
    required(p.email, { message: 'Email is required' });
    email(p.email, { message: 'Invalid email' });
  });
}

const meta: Meta<FormFieldDemo> = {
  title: 'Showcase/UI/Form field',
  component: FormFieldDemo,
};

export default meta;
export const Variants: StoryObj<FormFieldDemo> = {};
