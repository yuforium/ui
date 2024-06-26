import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { ForumService } from 'projects/yuforium-ui-common/src/lib/api';
import { catchError, of } from 'rxjs';

export const forumResolver: ResolveFn<object> = (route, state) => {
  const service = inject(ForumService);
  const router = inject(Router);

  return service.getForum(route.params['forumname']).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status === 404) {
        return of(new RedirectCommand(router.parseUrl('/404'), {skipLocationChange: true}));
      }
      return of(new RedirectCommand(router.parseUrl('/500'), {skipLocationChange: true}));
    })
  );
};
