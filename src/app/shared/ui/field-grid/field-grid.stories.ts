import { Meta, StoryObj, moduleMetadata } from '@storybook/angular-vite';
import { UiFieldGrid } from './field-grid';
import { UiFormField } from '../form-field/form-field';

const meta: Meta<UiFieldGrid> = {
  title: 'Showcase/UI/Field grid',
  component: UiFieldGrid,
  decorators: [moduleMetadata({ imports: [UiFormField] })],
};

export default meta;
type Story = StoryObj<UiFieldGrid>;

const cell = (n: number) => `<div class="rounded bg-surface-100 p-2">field ${n}</div>`;

export const TwoColumns: Story = {
  render: () => ({ template: `<ui-field-grid>${[1, 2, 3, 4].map(cell).join('')}</ui-field-grid>` }),
};

export const ThreeColumns: Story = {
  render: () => ({ template: `<ui-field-grid [cols]="3">${[1, 2, 3, 4, 5].map(cell).join('')}</ui-field-grid>` }),
};

export const WithWideField: Story = {
  render: () => ({
    template: `
      <ui-field-grid>
        ${cell(1)}${cell(2)}
        <ui-form-field label="Description" wide for="desc"><textarea id="desc" rows="2" class="border"></textarea></ui-form-field>
      </ui-field-grid>`,
  }),
};
