import { Component, OnInit } from '@angular/core';
import { CommonService } from 'projects/common/src/public-api';
import { AuthService, Configuration } from 'projects/common/src/lib/api';
import { switchMap } from 'rxjs';
import { UserService } from 'projects/common/src/lib/api/api/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    protected commonService: CommonService,
    protected authService: AuthService,
    protected config: Configuration,
    protected userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.commonService.authenticated) {
      this.authService.profile()
        .subscribe(response => {
          console.log('your profile is', response);
        });
    }
  }

  public get authenticated(): boolean {
    return this.commonService.authenticated;
  }

  login(username: string, password: string): void {
    this.authService.login({username, password})
      .pipe(
        switchMap(response => {
          const expiresAt = new Date();
          expiresAt.setSeconds(expiresAt.getSeconds() + response.expires_in);

          this.commonService.setApiToken({accessToken: response.access_token, expiresAt});
          this.config.credentials['bearer'] = response.access_token;

          return this.authService.profile();
        })
      )
      .subscribe(response => {
        console.log('your profile is', response);
      });
  }
}
