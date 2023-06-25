import {
    Directive,
    TemplateRef,
    ViewContainerRef,
    inject,
} from '@angular/core';
import { FocusWithinService } from './focus-within.service';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';

// *** the whole reason for these directives was that
// 1. the only way to expose a context/variable is using a structural directive
//    with `createEmbeddedView` afaik
// 2. using a structural directive means that what we get from injecting the ElementRef
//    is the comment, not the element we want. So the `FocusWithinService` was getting reference
//    to the comment DOM element
// 3. The solution I thought of was breaking up exposing a var and the focusing part
// 4. Had to use a subject + observable and `.next` due to timing

@Directive({
    selector: '[appFocusVar]',
    standalone: true,
})
export class FocusVarDirective {
    // since the async pipe was subbing to the inital value we have to use a
    // subject and `.next` it
    focusedSubject$ = new BehaviorSubject<boolean>(false);
    focused$: Observable<boolean> = this.focusedSubject$.asObservable();

    private vcr = inject(ViewContainerRef);
    private templateRef = inject(TemplateRef);

    ngOnInit() {
        this.vcr.createEmbeddedView(this.templateRef, {
            $implicit: this.focused$,
        });
    }
}

@Directive({
    selector: '[appFocusWithin]',
    standalone: true,
    providers: [
        {
            provide: FocusWithinService,
        },
    ],
})
export class FocusWithinDirective {
    private focused$ = inject(FocusWithinService);
    private varDirective = inject(FocusVarDirective, { optional: true });
    private readonly _destroy$ = new Subject<void>();

    ngOnInit() {
        if (!this.varDirective) {
            throw new Error(
                'FocusVarDirective must be a parent of FocusWithinDirective!'
            );
        }

        this.focused$
            .pipe(
                tap((x) => this.varDirective!.focusedSubject$.next(x)),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
