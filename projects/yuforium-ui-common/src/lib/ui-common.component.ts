import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lib-UiCommon',
    template: `
    <p>
      ui-common works!
    </p>
  `,
    styles: [],
    standalone: true
})
export class UiCommonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
