import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { environment } from '../environments/environment';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PersonDto } from 'projects/ui-common/src/lib/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public readonly title;
  public $user!: BehaviorSubject<PersonDto | null>

  username: string = 'test';

  constructor(readonly appService: AppService, readonly titleService: Title, protected router: Router) {
    this.title = appService.title;
    this.titleService.setTitle(this.title);
    this.$user = this.appService.$user;
  }

  public logout(): void {
    this.appService.logout();
    this.router.navigate(['/']);
  }
}
