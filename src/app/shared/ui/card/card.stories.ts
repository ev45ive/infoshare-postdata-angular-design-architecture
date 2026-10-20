import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular-vite';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Avatar } from 'primeng/avatar';
import { Tag } from 'primeng/tag';
import { UI_CARD, UiCard, provideCardDefaults } from './public-api';
import { UiCollapsibleGroup } from '../collapsible/collapsible';
import { UI_TABS } from '../tabs/tabs';
import { UiFormField } from '../form-field/form-field';
import { UiFieldGrid } from '../field-grid/field-grid';
import { UiPropertyList, UiProperty } from '../property-list/property-list';

// Story props must not reuse UiCard member names (title, loading, mode, items…): Storybook assigns them onto the card.

const meta: Meta<UiCard> = {
  title: 'Showcase/UI/Card',
  component: UiCard,
  decorators: [
    moduleMetadata({
      imports: [
        UI_CARD,
        ButtonModule,
        InputTextModule,
        Avatar,
        Tag,
        UiCollapsibleGroup,
        UI_TABS,
        UiFormField,
        UiFieldGrid,
        UiPropertyList,
        UiProperty,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<UiCard>;

const IMAGE = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'><rect width='16' height='9' fill='%2393c5fd'/><circle cx='12' cy='3' r='1.5' fill='%23fef3c7'/></svg>`;

/** 1 · input + default slot + fallback title */
export const Simple: Story = {
  render: () => ({
    template: `<ui-card class="max-w-sm" title="Notes">Key account, prefers email contact.</ui-card>`,
  }),
};

/** 2 · attribute slot replaces the fallback title with any HTML */
export const TitleAsAnyHtml: Story = {
  render: () => ({
    template: `
      <ui-card class="max-w-sm">
        <h3 card-title class="flex items-center gap-2 font-semibold">Anna Kowalska <p-tag value="customer" severity="success" /></h3>
        Tech Solutions Sp. z o.o.
      </ui-card>`,
  }),
};

/** 3 · compound header; ui-card-title registers itself for aria-labelledby */
export const CompoundHeader: Story = {
  render: () => ({
    template: `
      <ui-card class="max-w-sm">
        <ui-card-header>
          <p-avatar label="AK" shape="circle" aria-hidden="true" />
          <ui-card-title>Anna Kowalska</ui-card-title>
          <ui-card-subtitle>Tech Solutions</ui-card-subtitle>
          <ui-card-actions>
            <button pButton type="button" text size="small" aria-label="More"><i class="pi pi-ellipsis-h" aria-hidden="true"></i></button>
          </ui-card-actions>
        </ui-card-header>
        anna.kowalska&#64;example.com
      </ui-card>`,
  }),
};

/** 4 · variant / intent / density via host data attributes */
export const Variants: Story = {
  render: () => ({
    template: `
      <div class="grid gap-4 sm:grid-cols-4">
        <ui-card title="Elevated" subtitle="default" />
        <ui-card title="Outlined" variant="outlined" />
        <ui-card title="Flat" variant="flat" />
        <ui-card title="Ghost" variant="ghost">No border, no padding</ui-card>
        <ui-card title="Info" variant="outlined" intent="info" />
        <ui-card title="Success" variant="outlined" intent="success" />
        <ui-card title="Warn" variant="outlined" intent="warn" />
        <ui-card title="Danger zone" variant="outlined" intent="danger" />
        <ui-card title="Compact" density="compact">Smaller padding and title</ui-card>
        <ui-card title="Compact flat" density="compact" variant="flat">Panel look</ui-card>
      </div>`,
  }),
};

/** 5 · compound footer with its own start/end slots */
export const FooterActions: Story = {
  render: () => ({
    template: `
      <ui-card class="max-w-md" title="Delete deal?" intent="danger" variant="outlined">
        This cannot be undone.
        <ui-card-footer>
          <button actions-start pButton type="button" text size="small">Learn more</button>
          <button pButton type="button" outlined severity="secondary" size="small">Cancel</button>
          <button pButton type="button" severity="danger" size="small">Delete</button>
        </ui-card-footer>
      </ui-card>`,
  }),
};

/** 6 · media: direct img picked by tag selector, ui-card-media for anything else, orientation */
export const Media: Story = {
  render: () => ({
    props: { image: IMAGE },
    template: `
      <div class="grid gap-4 md:grid-cols-2">
        <ui-card title="Warsaw office" subtitle="12 open deals">
          <img [src]="image" alt="" class="aspect-video" />
          Media bleeds to the card edge.
        </ui-card>
        <ui-card title="Weekly report" orientation="horizontal">
          <ui-card-media>
            <div class="grid h-full min-h-24 place-items-center bg-primary-50 dark:bg-primary-950">
              <i class="pi pi-chart-bar text-2xl" aria-hidden="true"></i>
            </div>
          </ui-card-media>
          Horizontal: same slots, media beside content.
        </ui-card>
      </div>`,
  }),
};

/** 7 · attribute-selector component keeps native link semantics */
export const LinkCard: Story = {
  render: () => ({
    template: `
      <a uiCard class="max-w-sm" href="#" title="Anna Kowalska" subtitle="Tech Solutions" (click)="$event.preventDefault()">
        Open contact →
      </a>`,
  }),
};

/** 8 · opt-in [uiSelectable] directive, two-way selected */
export const Selectable: Story = {
  render: () => ({
    props: {
      plans: [
        { id: 'free', name: 'Free', price: '$0', picked: false },
        { id: 'pro', name: 'Pro', price: '$29', picked: true },
        { id: 'team', name: 'Team', price: '$99', picked: false },
      ],
    },
    template: `
      <div class="grid gap-3 sm:grid-cols-3">
        @for (plan of plans; track plan.id) {
          <ui-card uiSelectable [title]="plan.name" [(selected)]="plan.picked">{{ plan.price }} / month</ui-card>
        }
      </div>
      <p class="mt-3 text-sm">picked: {{ plans[0].picked }} · {{ plans[1].picked }} · {{ plans[2].picked }}</p>`,
  }),
};

/** 9 · group provides SELECTION_GROUP; cards switch to radio semantics via DI */
export const CardGroup: Story = {
  render: () => ({
    props: { planId: 'pro' },
    template: `
      <ui-card-group label="Plan" [(value)]="planId">
        <ui-card uiSelectable value="free" title="Free">$0 / month</ui-card>
        <ui-card uiSelectable value="pro" title="Pro">$29 / month</ui-card>
        <ui-card uiSelectable value="team" title="Team">$99 / month</ui-card>
      </ui-card-group>
      <p class="mt-3 text-sm">value: {{ planId }} (use arrow keys)</p>`,
  }),
};

/** 10 · collapse via hostDirectives(UiCollapsible); works with uiCollapsibleGroup */
export const Collapsible: Story = {
  render: () => ({
    props: { aboutOpen: true },
    template: `
      <div uiCollapsibleGroup #group="uiCollapsibleGroup" class="flex max-w-md flex-col gap-3">
        <button pButton type="button" size="small" class="self-start" (click)="group.toggleAll()">
          {{ group.command()?.expanded === false ? 'Expand all' : 'Collapse all' }}
        </button>
        <ui-card title="About this contact" collapsible [(expanded)]="aboutOpen">
          <dl uiPropertyList>
            <div uiProperty label="Email">anna.kowalska&#64;example.com</div>
            <div uiProperty label="City">Warsaw</div>
          </dl>
          <ui-card-footer><button pButton type="button" link size="small">View all properties</button></ui-card-footer>
        </ui-card>
        <ui-card title="Subscriptions" collapsible [expanded]="false">Newsletter</ui-card>
      </div>
      <p class="mt-2 text-sm">aboutOpen: {{ aboutOpen }}</p>`,
  }),
};

/** 11 · [card-actions] extends built-in actions; [card-title] replaces the default title */
export const HeaderActionsExtend: Story = {
  render: () => ({
    template: `
      <ui-card class="max-w-sm" title="Companies" [count]="2" collapsible dismissible>
        <button card-actions pButton type="button" text size="small"><i class="pi pi-plus" aria-hidden="true"></i> Add</button>
        <p>Parker Industries</p>
        <p>Doctor Octopus Inc</p>
      </ui-card>`,
  }),
};

/** 12 · output only — the parent owns visibility */
export const Dismissible: Story = {
  render: () => {
    const state = { showTip: true };
    return {
      props: { state },
      template: `
        @if (state.showTip) {
          <ui-card class="max-w-sm" title="Tip" variant="flat" intent="info" dismissible (dismiss)="state.showTip = false">
            Press / to search.
          </ui-card>
        } @else {
          <button pButton type="button" size="small" (click)="state.showTip = true">Show tip again</button>
        }`,
    };
  },
};

/** 13 · default skeleton vs lazy custom uiCardSkeleton template */
export const Loading: Story = {
  render: () => ({
    props: { busy: true },
    template: `
      <button pButton type="button" size="small" class="mb-3" (click)="busy = !busy">Toggle loading ({{ busy }})</button>
      <div class="grid gap-4 sm:grid-cols-2">
        <ui-card title="Default skeleton" [loading]="busy">Loaded content.</ui-card>
        <ui-card title="Insights" [loading]="busy">
          <strong class="text-3xl">45 / 100</strong>
          <ng-template uiCardSkeleton><div class="h-10 w-32 animate-pulse rounded bg-surface-100 dark:bg-surface-800"></div></ng-template>
        </ui-card>
      </div>`,
  }),
};

/** 14 · consumer owns the loop and @empty; uiCardList bleeds via --ui-card-padding */
export const ListWithConsumerEmpty: Story = {
  render: () => ({
    props: {
      tasks: [
        { id: 't1', title: 'Send revised proposal' },
        { id: 't2', title: 'Schedule call with legal' },
      ],
      noTasks: [],
    },
    template: `
      <div class="grid gap-4 sm:grid-cols-2">
        @for (list of [tasks, noTasks]; track $index) {
          <ui-card title="Related tasks" [count]="list.length">
            <ul uiCardList>
              @for (task of list; track task.id) {
                <li>{{ task.title }}</li>
              } @empty {
                <li class="text-muted-color">No tasks for this deal.</li>
              }
            </ul>
          </ui-card>
        }
      </div>`,
  }),
};

/** 15 · card owns the loop: uiCardItem (typed context) + uiCardEmpty */
export const TemplatedItems: Story = {
  render: () => ({
    props: { views: [{ name: 'High-value customers' }, { name: 'Recent signups' }], noViews: [] },
    template: `
      <div class="grid gap-4 sm:grid-cols-2">
        <ui-card title="Saved views" [items]="views">
          <ng-template uiCardItem [uiCardItemOf]="views" let-view let-i="index">{{ i + 1 }}. {{ view.name }}</ng-template>
        </ui-card>
        <ui-card title="Shared views" [items]="noViews">
          <ng-template uiCardEmpty>No shared views yet.</ng-template>
        </ui-card>
      </div>`,
  }),
};

/** 16 · form[uiCard]: the card host is the form, footer submit works natively */
export const FormCard: Story = {
  render: () => ({
    props: { saved: false },
    template: `
      <form uiCard class="max-w-lg" title="Edit deal" (submit)="$event.preventDefault(); saved = true">
        <ui-field-grid>
          <ui-form-field label="Title" for="deal-title"><input id="deal-title" pInputText value="Enterprise License" /></ui-form-field>
          <ui-form-field label="Value" for="deal-value"><input id="deal-value" pInputText type="number" value="48000" /></ui-form-field>
        </ui-field-grid>
        <ui-card-footer>
          <button pButton type="button" outlined severity="secondary" size="small" (click)="saved = false">Cancel</button>
          <button pButton type="submit" size="small">Save</button>
        </ui-card-footer>
      </form>
      <p class="mt-2 text-sm">saved: {{ saved }}</p>`,
  }),
};

/** 17 · two lazy templates + default Edit action; close() from template context */
export const ViewEdit: Story = {
  render: () => ({
    props: { cardMode: 'view' },
    template: `
      <ui-card class="max-w-md" title="Deal" [(mode)]="cardMode">
        <ng-template uiCardView>
          <dl uiPropertyList layout="row">
            <div uiProperty label="Value">$48,000</div>
            <div uiProperty label="Stage">Negotiation</div>
          </dl>
        </ng-template>
        <ng-template uiCardEdit let-close>
          <ui-form-field label="Value" for="edit-value"><input id="edit-value" pInputText value="48000" /></ui-form-field>
          <button pButton type="button" size="small" class="mt-2" (click)="close()">Done</button>
        </ng-template>
      </ui-card>
      <p class="mt-2 text-sm">mode: {{ cardMode }}</p>`,
  }),
};

/** 18 · extra region under the header */
export const TabsInHeaderBottom: Story = {
  render: () => ({
    template: `
      <ui-card class="max-w-md" title="Insights">
        <ui-tabs card-header-bottom label="Insights">
          <ui-tab id="score" label="Score">45 / 100</ui-tab>
          <ui-tab id="news" label="News" [count]="3">3 articles</ui-tab>
        </ui-tabs>
      </ui-card>`,
  }),
};

/** 19 · inject(UiCard, { skipSelf }) → nested cards default to flat, heading level +1 */
export const Nested: Story = {
  render: () => ({
    template: `
      <ui-card class="max-w-md" title="Account">
        <ui-card title="Primary contact">Anna Kowalska</ui-card>
        <ui-card title="Billing" variant="outlined">Explicit variant wins over the parent default.</ui-card>
      </ui-card>`,
  }),
};

/** 20 · [uiCardDefaults] for a subtree; input still wins */
export const SubtreeDefaults: Story = {
  render: () => ({
    template: `
      <section class="grid gap-3 sm:grid-cols-3" [uiCardDefaults]="{ density: 'compact', variant: 'outlined' }">
        <ui-card title="A">From defaults</ui-card>
        <ui-card title="B">From defaults</ui-card>
        <ui-card title="C" variant="elevated">Input wins</ui-card>
      </section>`,
  }),
};

/** 20b · same token from application providers */
export const ProvidedDefaults: Story = {
  decorators: [applicationConfig({ providers: [provideCardDefaults({ variant: 'flat' })] })],
  render: () => ({
    template: `<ui-card class="max-w-sm" title="Flat by provider">Variant comes from provideCardDefaults in applicationConfig.</ui-card>`,
  }),
};

/** 21 · ngProjectAs routes control-flow output into a named slot */
export const NgProjectAs: Story = {
  render: () => ({
    props: { deal: null as { title: string } | null, existing: { title: 'Enterprise License' } },
    template: `
      <div class="grid gap-4 sm:grid-cols-2">
        @for (d of [deal, existing]; track $index) {
          <ui-card>
            <ng-container ngProjectAs="[card-title]">
              @if (d) {
                <h3 class="font-semibold">{{ d.title }}</h3>
              } @else {
                <h3 class="font-semibold">New deal</h3>
              }
            </ng-container>
            Body
          </ui-card>
        }
      </div>`,
  }),
};

/** 22 · corner slot; empty slot renders nothing */
export const Ribbon: Story = {
  render: () => ({
    template: `
      <ui-card class="mt-3 max-w-sm" title="Onboarding Follow-up Call">
        <p-tag card-ribbon value="Recently used" severity="success" />
        Playbook · 5 steps
      </ui-card>`,
  }),
};

/** 23 · whole card clickable, inner actions still usable */
export const StretchedLink: Story = {
  render: () => ({
    template: `
      <ui-card class="max-w-sm">
        <a card-title uiCardLink href="#" class="font-semibold underline" (click)="$event.preventDefault()">Enterprise License</a>
        <button card-actions pButton type="button" text size="small" aria-label="Deal actions">
          <i class="pi pi-ellipsis-h" aria-hidden="true"></i>
        </button>
        $48,000 · Negotiation
      </ui-card>`,
  }),
};

/** 24 · CSS custom property contract: override on the card, compound children follow */
export const CssVariableContract: Story = {
  render: () => ({
    template: `
      <div class="grid gap-4 sm:grid-cols-2">
        <ui-card title="Default">Regular spacing</ui-card>
        <ui-card style="--ui-card-padding: 2rem; --ui-card-title-size: 1.5rem; --ui-card-radius: 1rem">
          <ui-card-title>Roomy</ui-card-title>
          ui-card-title reads --ui-card-title-size from the card.
        </ui-card>
      </div>`,
  }),
};
