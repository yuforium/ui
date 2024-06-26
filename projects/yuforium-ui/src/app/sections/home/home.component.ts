import { Component, OnInit } from '@angular/core';
import { UserService } from 'projects/yuforium-ui-common/src/lib/api';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent implements OnInit {
  public posts$: Observable<any> | undefined;
  env = environment;

  constructor(protected userService: UserService) { }

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent() {
    this.posts$ = this.userService.getContent('chris', {type: 'Note', sort: '-published', limit: 5})
      .pipe(map(collectionPage => collectionPage.items));
  }
}
