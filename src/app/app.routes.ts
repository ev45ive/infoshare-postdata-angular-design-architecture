import { Routes } from '@angular/router';
import { TestComponent } from './test.component';
import { ContactsSearch } from './features/contacts/pages/contacts-search/contacts-search';

export const routes: Routes = [
  { path: '', component: ContactsSearch },
  // { path: '', component: TestComponent }
];
