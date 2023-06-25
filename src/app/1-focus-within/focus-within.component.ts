import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, fromEvent, map, merge, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-focus-within',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './focus-within.component.html',
  styleUrls: ['./focus-within.scss'],
})
export class FocusWithinComponent {
  @ViewChild('focusBlock', { static: true })
  focusBlock!: ElementRef<HTMLElement>;

  focusedIn$!: Observable<boolean>;

  ngOnInit() {
    const focusIn$ = fromEvent(this.focusBlock.nativeElement, 'focusin');
    const focusOut$ = fromEvent(this.focusBlock.nativeElement, 'focusout');

    this.focusedIn$ = merge(focusIn$, focusOut$).pipe(
      tap((x) => console.warn('>>>> event', x)),
      map((x) => x.type === 'focusin'),
      startWith(false)
    );
  }
}
