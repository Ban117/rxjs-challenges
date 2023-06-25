import { DOCUMENT } from '@angular/common';
import { Injectable, Inject, ElementRef } from '@angular/core';
import {
    Observable,
    merge,
    defer,
    of,
    fromEvent,
    map,
    distinctUntilChanged,
    startWith,
} from 'rxjs';

@Injectable()
export class FocusWithinService extends Observable<boolean> {
    constructor(
        @Inject(DOCUMENT) documentRef: Document,
        { nativeElement }: ElementRef<HTMLElement>
    ) {
        const focused$ = merge(
            // `defer` stream is kinda optional, just to know if it's initally focused, replaces a `startWith`
            defer(() => of(nativeElement.contains(documentRef.activeElement))),
            fromEvent<FocusEvent>(nativeElement, 'focusin').pipe(
                map(() => true)
            ),
            fromEvent<FocusEvent>(nativeElement, 'focusout').pipe(
                map(({ relatedTarget }) =>
                    nativeElement.contains(relatedTarget as Node | null)
                )
            )
        ).pipe(distinctUntilChanged());

        super((subscriber) => focused$.subscribe(subscriber));
    }
}
