import { Component, Input, Output } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'test-app';
  username: string = 'test';

  constructor(readonly appService: AppService) {
  }

  public showUsername() {
    console.log(this.username);
  }
}
