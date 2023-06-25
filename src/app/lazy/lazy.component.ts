import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lazy',
  standalone: true,
  template: `<p>lazy</p>`,
})
export class LazyComponent {
  constructor() {
    console.warn('>>>> I live');
  }
}
