import { Routes } from '@angular/router';
import { TestComponent } from './test.component';
import { ContactsSearch } from './features/contacts/pages/contacts-search/contacts-search';
import { StoryWrapper } from './features/deals/ui/deal-status-badge/deal-status-badge.stories';

export const routes: Routes = [
  // { path: '', component: ContactsSearch },
  // { path: '', component: TestComponent }
  // { path: '', component: StoryWrapper }

  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  
  {
    path: 'deals',
    loadChildren: () => import('./features/deals/routes'),
  },
  
  {
    path: 'contacts',
    loadChildren: () => import('./features/contacts/routes'),
  },

  {
    path: 'exercises',
    loadChildren: () => import('./exercises/routes'),
  },
];
