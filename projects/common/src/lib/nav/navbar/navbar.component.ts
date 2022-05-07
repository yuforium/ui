import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() public title: string = 'Navbar';

  constructor() { }

  ngOnInit(): void {
  }
}
