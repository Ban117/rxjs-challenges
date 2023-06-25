import { Route, provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
export const routes: Route[] = [
  {
    path: '1-focus-within',
    loadComponent: () =>
      import('./app/1-focus-within/focus-within.component').then(
        (x) => x.FocusWithinComponent
      ),
  },
  {
    path: 'lazy',
    loadChildren: () =>
      import('./app/lazy/lazy.routes').then((x) => x.lazyRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
