import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService, Configuration } from 'projects/ui-common/src/lib/api';
import { switchMap } from 'rxjs';
import { UserService } from 'projects/ui-common/src/lib/api/api/user.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit {
  public loading = false;
  public loginError = false;
  public loginErrorMessage = '';
  @ViewChild('username', {static: true}) usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('password', {static: true}) passwordInput!: ElementRef<HTMLInputElement>;

  constructor(
    protected appService: AppService,
    protected authService: AuthService,
    protected config: Configuration,
    protected userService: UserService,
    protected router: Router
  ) { }

  ngAfterViewInit(): void {
    this.usernameInput.nativeElement.focus();
    this.passwordInput.nativeElement.onkeyup = (e) => {
      if (e.key === 'Enter') {
        this.login(this.usernameInput.nativeElement.value, this.passwordInput.nativeElement.value);
      }
    };
  }

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
    this.router.navigate(['/', 'users', response.preferredUsername])
  }

  onLoginError(err: any): void {
    if (err instanceof HttpErrorResponse && err.status === 401) {
      this.loginErrorMessage = 'Invalid username or password';
    }
    else {
      this.loginErrorMessage = 'Unable to login at this time';
    }
    this.loginError = true;

    this.usernameInput.nativeElement.focus();
    this.usernameInput.nativeElement.select();
  }
}
