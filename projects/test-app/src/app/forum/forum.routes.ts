import { Route } from "@angular/router";
import { ForumComponent } from "./forum.component";
import { ForumPostComponent } from "./forum-post/forum-post.component";

export const FORUM_ROUTES: Route[] = [
  {
    path: ':forumId', 
    component: ForumComponent,
    children: [
      {
        path: 'post',
        component: ForumPostComponent
      }
    ]
  }
]