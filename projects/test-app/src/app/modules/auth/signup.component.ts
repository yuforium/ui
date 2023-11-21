import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserCreateDto, UserService } from 'projects/ui-common/src/lib/api';
import { map, Observable, subscribeOn } from 'rxjs';
import { AppService } from '../../app.service';
import { environment } from 'projects/test-app/src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm!: UntypedFormGroup;
  @ViewChild('button', {static: true}) button!: ElementRef<HTMLButtonElement>;
  public displayError = false;
  public loading = false;
  public appName = environment.appName;

  constructor(
    protected appService: AppService,
    protected router: Router,
    protected userService: UserService
  ) { }

  ngOnInit(): void {
    this.signupForm = new UntypedFormGroup({
      username: new UntypedFormControl('', {
        validators: [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)],
        asyncValidators: [this.userExistsValidator.bind(this)]
      }),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      passwordAgain: new UntypedFormControl('', [this.passwordMatchValidator()]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
    }, {updateOn: 'change'});
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.parent?.get('password');
      const valid = password?.value === control?.value;
      return valid ? null : { passwordMatch: { value: control.value } };
    };
  }

  userExistsValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;
    return this.userService.exists(value)
      .pipe(
        map(exists => {
          const err = exists ? { userExists: { value } } : null;

          control.setErrors(err);
          control.markAsTouched();

          return err;
        })
    );
  }

  signup(username: string, password: string, passwordAgain: string, email: string) {
    if (this.signupForm.invalid) {
      this.displayError = true;
      return;
    }

    this.button.nativeElement.disabled = true;
    const userDto: UserCreateDto = {username, password, email};

    this.loading = true;

    this.userService.create({username, password, email}).subscribe({
      next: response => this.onSignup(response),
      error: response => this.onSignupError(response)
    }).add(() => this.loading = false);
  }

  onSignup(response: HttpResponse<any>) {
    this.appService.login(this.signupForm.get('username')?.value, this.signupForm.get('password')?.value)
      .subscribe(response => {
        this.router.navigate(['/users', response.preferredUsername]);
      });
  }

  onSignupError(response: HttpErrorResponse) {
    switch(response.status) {
      case 409:
        alert('Sorry, that username already exists');
        break;
      default:
        alert('Sorry, we had an error creating your account');
    }

    this.button.nativeElement.disabled = false;
  }
}