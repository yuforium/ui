import { Component, Input, OnInit, Output } from '@angular/core';
import { AppService } from './app.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public readonly title = environment.appName;
  public user: any;

  username: string = 'test';

  constructor(readonly appService: AppService) {
    this.appService.getUser().subscribe((user: any) => {
      this.user = user;
  }

  ngOnInit() {
  }

  public showUsername() {
  }
}
