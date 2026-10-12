import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SearchForm } from '../../forms/search-form/search-form';

@Component({
  selector: 'app-contacts-search',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, SearchForm],

  // encapsulation: ViewEncapsulation.None,
  template: `
    <div class="min-h-screen bg-surface-50 p-8">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold text-primary-700 mb-2">Contacts</h1>
        <p class="text-text-color-secondary mb-8">Search and manage your contacts</p>

        <div class="mb-8">
          <!-- <app-search-form style="" class="w-full" /> -->
          <app-search-form />
          <!-- HOST -->
        </div>

        <button>Advanced</button>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Contact Card 1 -->
          <div class="card-base">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg"
              >
                AK
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-text-color">Anna Kowalska</h3>
                <p class="text-sm text-text-color-secondary">Tech Solutions Sp. z o.o.</p>
              </div>
            </div>
            <p class="text-sm text-text-color-secondary mb-4">anna.kowalska@example.com</p>
            <span
              class="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded"
              >customer</span
            >
          </div>

          <!-- Contact Card 2 -->
          <div class="card-base">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg"
              >
                MN
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-text-color">Marek Nowak</h3>
                <p class="text-sm text-text-color-secondary">DataFlow Inc.</p>
              </div>
            </div>
            <p class="text-sm text-text-color-secondary mb-4">marek.nowak@example.com</p>
            <span
              class="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded"
              >lead</span
            >
          </div>

          <!-- Contact Card 3 -->
          <div class="card-base">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg"
              >
                EW
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-text-color">Ewa Wśniiewska</h3>
                <p class="text-sm text-text-color-secondary">Creative Agency</p>
              </div>
            </div>
            <p class="text-sm text-text-color-secondary mb-4">ewa.w@example.com</p>
            <span
              class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded"
              >prospect</span
            >
          </div>

          <!-- Contact Card 4 -->
          <div class="card-base">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-lg"
              >
                TZ
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-text-color">Tomasz Zieliński</h3>
                <p class="text-sm text-text-color-secondary">BuildRight Ltd.</p>
              </div>
            </div>
            <p class="text-sm text-text-color-secondary mb-4">tomasz.z@example.com</p>
            <span
              class="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded"
              >churned</span
            >
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      // ::ng-deep button { /* disable encaptulation - spill -> global/util */

      /* Encapsulation - parents, siblings, nested components */
      button {
        /* disable encaptulation - spill -> global/util */
        color: red;
        --ala-ma-kota: 'red';
      }

      .card-base {
        background-color: white !important;
        border-radius: 0.5rem !important;
        border: 1px solid var(--surface-200) !important;
        padding: 1.5rem !important;
        transition: box-shadow 0.2s ease !important;
      }

      .card-base:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
      }
    `,
  ],
})
export class ContactsSearch {}
