import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FocusWithinDirective,
    FocusVarDirective,
} from './solution/focus-within.directive';

@Component({
    selector: 'app-focus-within',
    standalone: true,
    imports: [AsyncPipe, FocusWithinDirective, FocusVarDirective],
    templateUrl: './focus-within.component.html',
    styleUrls: ['./focus-within.scss'],
})
export class FocusWithinComponent {}
