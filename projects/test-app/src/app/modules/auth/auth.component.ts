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
export class AuthComponent {
  public loading = false;

  constructor(
    protected appService: AppService,
    protected authService: AuthService,
    protected config: Configuration,
    protected userService: UserService,
    protected router: Router
  ) { }

  public get authenticated(): boolean {
    return this.appService.authenticated;
  }

  /**
   * Login the user
   * Use this instead of the Auth service login method, since that is generated from the OpenAPI spec and doesn't return the profile or update a BehaviorSubject
   * @param username 
   * @param password 
   */
  login(username: string, password: string): void {
    this.loading = true;

    this.appService.login(username, password)
      .subscribe({
        next: (response: any) => this.onLogin(response),
        error: err => this.onLoginError(err)
      })
      .add(() => this.loading = false);
  }

  onLogin(response: any): void {
    this.router.navigate(['/user', response.preferredUsername])
  }

  onLoginError(err: any): void {
    
  }
}
