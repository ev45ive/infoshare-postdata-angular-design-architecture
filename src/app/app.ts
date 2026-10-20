import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { UILink } from './shared/ui/link';

@Component({
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive, UILink],
  selector: 'app-root',
  styles: [],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('postdata');
}
