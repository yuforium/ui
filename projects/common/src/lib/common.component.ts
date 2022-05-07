import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-common',
  template: `
    <p>
      common works!  this gets refreshed automatically
    </p>
  `,
  styles: [
  ]
})
export class CommonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
