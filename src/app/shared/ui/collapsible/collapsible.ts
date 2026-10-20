import { Directive, effect, inject, model, signal } from '@angular/core';

/** Broadcasts expand/collapse commands to every `UiCollapsible` declared inside it. */
@Directive({ selector: '[uiCollapsibleGroup]', exportAs: 'uiCollapsibleGroup' })
export class UiCollapsibleGroup {
  private readonly lastCommand = signal<{ expanded: boolean } | null>(null);
  readonly command = this.lastCommand.asReadonly();

  toggleAll() {
    this.lastCommand.set({ expanded: this.command()?.expanded === false });
  }
}

@Directive({ selector: '[uiCollapsible]', exportAs: 'uiCollapsible' })
export class UiCollapsible {
  readonly expanded = model(true);
  private readonly group = inject(UiCollapsibleGroup, { optional: true });

  constructor() {
    effect(() => {
      const command = this.group?.command();
      if (command) this.expanded.set(command.expanded);
    });
  }

  toggle() {
    this.expanded.update((v) => !v);
  }
}
