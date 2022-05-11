import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() public title: string = 'Navbar';
  @Input() public color: string = 'sky-900';
  @Input() public hoverColor: string = 'white';
  @Input() public hoverBgColor: string = 'sky-100';

  constructor() { }

  ngOnInit(): void {
  }
}
