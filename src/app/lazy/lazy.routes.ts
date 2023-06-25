import { Route } from '@angular/router';

export const lazyRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('./lazy.component').then((x) => x.LazyComponent),
    },
];
