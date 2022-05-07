import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'test-app';
  username: string = 'test';

  public showUsername() {
    console.log(this.username);
  }
}
