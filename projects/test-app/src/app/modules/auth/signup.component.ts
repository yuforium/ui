import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService, UserCreateDto, UserService } from 'projects/ui-common/src/lib/api';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(public authService: AuthService, public userService: UserService) { }

  ngOnInit(): void {
  }

  signup(username: string, password: string, passwordAgain: string, email: string) {
    const userDto: UserCreateDto = {username, password, email};

    this.userService.create({username, password, email}).subscribe(
      response => this.onSignup(response),
      response => this.onSignupError(response)
    );
  }

  onSignup(response: HttpResponse<any>) {
  }

  onSignupError(response: HttpErrorResponse) {
    switch(response.status) {
      case 409:
        alert('Username already exists');
        break;
      case 400:
        alert('there are errors');
        break;
      default:
        alert('looks like it worked');
    }
}
}
