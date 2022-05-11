import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'projects/common/src/lib/api/api/user.service';
import { PersonDto } from 'projects/common/src/lib/api/model/personDto';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public username: string = '';
  public person: PersonDto|null = null;
  public activity: any[] = [];

  constructor(
    private route: ActivatedRoute,
    protected userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.username = params.username;

      this.userService.get(this.username)
        .pipe(
          switchMap(response => {
            this.person = response;
            return this.userService.getInbox(this.username);
          })
        )
        .subscribe((response: any[]) => {
          console.log('inbox is', response);
      });
    });
  }
}
