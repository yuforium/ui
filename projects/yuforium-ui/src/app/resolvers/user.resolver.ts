import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { PersonDto, UserService } from 'projects/yuforium-ui-common/src/lib/api';
import { catchError, of } from 'rxjs';

export const userResolver: ResolveFn<PersonDto> = (route, _state) => {
  const service = inject(UserService);
  const router = inject(Router);

  return service.getUser(route.params['username']).pipe(
    // @todo
    // consider creating a generic error page, and redirecting to it
    catchError((e: HttpErrorResponse) => {
      if (e.status === 404) {
        return of(new RedirectCommand(router.parseUrl('/404'), {skipLocationChange: true}));
      }
      return of(new RedirectCommand(router.parseUrl('/500'), {skipLocationChange: true}));
    })
  );
};
