import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DogSearchComponent } from './components/dog-search/dog-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DogSearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<app-dog-search />`,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #f5f5f5;
      }
    `,
  ],
})
export class App {}
