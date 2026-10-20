import { Meta, StoryObj, moduleMetadata } from '@storybook/angular-vite';
import { Tag } from 'primeng/tag';
import { UiPropertyList, UiProperty } from './property-list';

const meta: Meta<UiPropertyList> = {
  title: 'Showcase/UI/Property list',
  component: UiPropertyList,
  decorators: [moduleMetadata({ imports: [UiProperty, Tag] })],
  argTypes: { layout: { control: 'inline-radio', options: ['stacked', 'grid', 'row'] } },
};

export default meta;
type Story = StoryObj<UiPropertyList>;

const template = (layout: string) => `
  <dl uiPropertyList layout="${layout}">
    <div uiProperty label="Email">anna.kowalska&#64;example.com</div>
    <div uiProperty label="Phone">+48 600 100 200</div>
    <div uiProperty label="Status"><p-tag value="customer" severity="success" /></div>
    <div uiProperty label="Created">June 15, 2025</div>
    <div uiProperty label="Notes" wide>Key account, prefers email contact.</div>
  </dl>`;

export const Stacked: Story = { render: () => ({ template: template('stacked') }) };
export const Grid: Story = { render: () => ({ template: template('grid') }) };
export const Row: Story = { render: () => ({ template: template('row') }) };
