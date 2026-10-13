import { Routes } from '@angular/router';
import { TestComponent } from './test.component';
import { ContactsSearch } from './features/contacts/pages/contacts-search/contacts-search';
import { StoryWrapper } from './features/deals/ui/deal-status-badge/deal-status-badge.stories';

export const routes: Routes = [
  // { path: '', component: ContactsSearch },
  // { path: '', component: TestComponent }
  { path: '', component: StoryWrapper }
];
