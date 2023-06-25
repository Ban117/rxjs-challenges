import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    template: `
        <a routerLink="1-focus-within">Focus Within</a>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
