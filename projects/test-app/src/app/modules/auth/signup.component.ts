import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserCreateDto, UserService } from 'projects/ui-common/src/lib/api';
import { map, Observable, subscribeOn } from 'rxjs';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm!: UntypedFormGroup;
  @ViewChild('button', {static: true}) button!: ElementRef<HTMLButtonElement>;

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
    });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.parent?.get('password');
      const valid = password?.value === control?.value;
      return valid ? null : { passwordMatch: { value: control.value } };
    };
  }

  userExistsValidatorOld(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = control.value;
      return this.userService.exists(username)
        .pipe(
          map(exists => exists ? { userExists: { value: username } } : null)
        );
    };
  }

  userExistsValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const username = control.value;
    return this.userService.exists(username)
      .pipe(
        map(exists => exists ? { userExists: { value: username } } : null)
      );
  }

  getInvalidatedState(controlName: string) {
    return this.signupForm.get(controlName)?.invalid && (this.signupForm.get(controlName)?.touched && this.signupForm.get(controlName)?.dirty);
  }

  getInvalidatedErrors(controlName: string) {
    const errs = Object.entries(this.signupForm.get(controlName)?.errors || {}).map(([key, value]) => {
      switch(key) {
        case 'required':
          return 'Required';
        case 'minlength':
          return `Too short`;
        case 'email':
          return 'Invalid email';
        case 'passwordMatch':
          return "Doesn't match";
        case 'pattern':
          return 'Letters and numbers only';
        case 'userExists':
          return `${value.value} already exists`;
        default:
          return key;
      }
    });

    return errs;
  }

  signup(username: string, password: string, passwordAgain: string, email: string) {
    this.button.nativeElement.disabled = true;
    const userDto: UserCreateDto = {username, password, email};

    this.userService.create({username, password, email}).subscribe(
      response => this.onSignup(response),
      response => this.onSignupError(response)
    );
  }

  onSignup(response: HttpResponse<any>) {
    this.appService.login(this.signupForm.get('username')?.value, this.signupForm.get('password')?.value)
      .subscribe(response => {
        this.router.navigate(['/user', response.preferredUsername]);
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