import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Badge } from 'primeng/badge';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, Badge],
  template: `
    <!-- <div class="w-full"></div> -->
    <input
      pInputText
      type="text"
      placeholder="Search contacts by name, email or company..."
      class="flex-1"
    />
    <button pButton label="Search" icon="pi pi-search" severity="primary">Search</button>

    <p-badge [value]="2" class="badge-danger" />
  `,
  // encapsulation: ViewEncapsulation.None,
  styles: [
    `
      /* Powód? Nie wiem. Bo tak mi kazali */
      :host ::ng-deep p-badge {
        color: red;
      }

      /* Powód? Semantyczny -> Niebezpieczny */
      p-badge.badge-danger {
        // color: red; // override
      }

      :host {
        --p-button-primary-color: green; /* Token -> Dependency Inversion (Injection) */
      }

      /* [_content-ng-c2229295192] */
      button {
      } /* only my template elemetns */

      /* [_nghost-%COMP%] */
      /* [_nghost-ng-c2229295192] */
      /* <app-search-form/> -> :host */

      :host {
        --ala-ma-kota: 123;
        display: block;
        width: 100%;
        // color: blue;
      }

      /* Override PrimeNG input styles */
      :host ::ng-deep .p-inputtext {
        border-radius: 0.375rem !important;
        border: 2px solid var(--surface-300) !important;
        padding: 0.75rem 1rem !important;
        font-size: 0.9375rem !important;
        line-height: 1.5 !important;
      }
      :host ::ng-deep .p-inputtext .child .child a {
        /* override ... override ...  !important */
      }

      :host ::ng-deep .p-inputtext:focus {
        border-color: var(--primary-500) !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        outline: none !important;
      }

      :host ::ng-deep .p-inputtext::placeholder {
        color: var(--text-color-secondary) !important;
        opacity: 1 !important;
      }

      /* Override PrimeNG button styles */
      :host ::ng-deep .p-button {
        border-radius: 0.375rem !important;
        padding: 0.75rem 1.5rem !important;
        font-weight: 600 !important;
        letter-spacing: 0.025em !important;
      }

      :host ::ng-deep .p-button-icon {
        margin-right: 0.5rem !important;
      }

      :host ::ng-deep .p-button:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.15) !important;
      }

      :host ::ng-deep .p-button:active {
        transform: translateY(0) !important;
      }
    `,
  ],
})
export class SearchForm {}
