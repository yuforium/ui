import { Component, OnInit } from '@angular/core';
import { AuthService, Configuration } from 'projects/ui-common/src/lib/api';
import { switchMap } from 'rxjs';
import { UserService } from 'projects/ui-common/src/lib/api/api/user.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    protected appService: AppService,
    protected authService: AuthService,
    protected config: Configuration,
    protected userService: UserService,
    protected router: Router
  ) { }

  ngOnInit(): void {
    if (this.appService.authenticated) {
      this.authService.profile()
        .subscribe(response => {
          console.log('your profile is', response);
        });
    }
  }

  public get authenticated(): boolean {
    return this.appService.authenticated;
  }

  login(username: string, password: string): void {
    this.appService.login(username, password)
      .subscribe(response => {
        this.router.navigate(['/user', response.preferredUsername]);
      });
  }
}
