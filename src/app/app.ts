import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  selector: 'app-root',
  styles: [],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('postdata');
}
