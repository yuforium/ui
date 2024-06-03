import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ForumService } from 'projects/ui-common/src/lib/api';
import { catchError, of } from 'rxjs';

export const forumResolver: ResolveFn<object> = (route, state) => {
  const service = inject(ForumService);
  const router = inject(Router);

  return service.getForum(route.params['forumname']).pipe(
    catchError(() => {
      return of(router.parseUrl('/404'), {skipLocationChange: true});
    })
  );
};
