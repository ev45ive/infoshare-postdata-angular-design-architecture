import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-test',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-surface-50">
      <div class="card flex flex-col gap-4">
        <h2 class="text-2xl font-bold text-primary-700">PrimeNG Setup Test</h2>
        
        <div class="flex gap-2">
          <p-button label="Primary Button" icon="pi pi-check" />
          <p-button label="Secondary" severity="secondary" icon="pi pi-user" />
        </div>
        
        <div class="text-sm text-muted-color">
          ✓ Tailwind v4 utilities
          <br />
          ✓ Aura theme colors
          <br />
          ✓ PrimeNG components
          <br />
          ✓ PrimeIcons
        </div>
      </div>
    </div>
  `,
  imports: [ButtonModule],
})
export class TestComponent {}
