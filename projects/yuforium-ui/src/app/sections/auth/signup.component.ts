import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCreateDto, UserService } from 'projects/yuforium-ui-common/src/lib/api';
import { map, Observable } from 'rxjs';
import { AppService } from '../../app.service';
import { environment } from '../../../environments/environment';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { HlmSpinnerModule } from '@spartan-ng/ui-spinner-helm';
import { HlmH3Directive } from '@spartan-ng/ui-typography-helm';
import { HlmIconModule, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideShieldAlert } from '@ng-icons/lucide';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmAlertModule } from '@spartan-ng/ui-alert-helm';
import { HlmLabelModule } from '@spartan-ng/ui-label-helm';
import { HlmInputModule } from '@spartan-ng/ui-input-helm';
import { BrnSeparatorModule } from '@spartan-ng/ui-separator-brain';
import { HlmSeparatorModule } from '@spartan-ng/ui-separator-helm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    KeyValuePipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HlmSpinnerModule,
    HlmH3Directive,
    HlmIconModule,
    HlmButtonModule,
    HlmAlertModule,
    HlmLabelModule,
    HlmInputModule
  ],
  providers: [
    provideIcons({lucideShieldAlert})
  ]
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

    this.userService.createUser({username, password, email}).subscribe({
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
