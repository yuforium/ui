import { Component, OnInit } from '@angular/core';
import { UserService } from 'projects/ui-common/src/lib/api';
import { Observable, pluck } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts$: Observable<any> | undefined;
  env = environment;

  constructor(protected userService: UserService) { }

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent() {
    this.posts$ = this.userService.getContent('chris', {type: 'Note', sort: '-published', limit: 5}).pipe(pluck('items'));
  }

  isArray(value: any): boolean {
    return true;
  }
}
