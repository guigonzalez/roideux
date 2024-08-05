import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarModule } from '@gui/roideux/ui/src/lib/navbar';

@Component({
  standalone: true,
  imports: [RouterModule, NavbarModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
