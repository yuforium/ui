import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityPubService } from 'projects/ui-common/src/lib/api';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public forumname: string = '';
  public forum: any;
  public posts$: Observable<any>|undefined;
  public skip: number = 0;
  public limit: number = 0;

  constructor(
    private route: ActivatedRoute,
    // protected forumService: ForumService,
    protected activityPubService: ActivityPubService
  ) { }

  ngOnInit(): void {
    // this.route.params.subscribe((params: any) => {
    //   this.forumname = params.forumname;
    //   this.loadContent();
    // });
  }

  loadContent() {
    // this.posts$ = this.forumService.getForum('asdf')
    //   .pipe(
    //     switchMap((response: any) => {
    //       console.log('this is a test')
    //       console.log(response);
    //       return Promise.resolve(response);
    //     })
    //   )
  }
}
