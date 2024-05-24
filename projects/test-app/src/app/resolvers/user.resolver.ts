import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from 'projects/ui-common/src/lib/api';

export const userResolver: ResolveFn<boolean> = (route, _state) => {
  const service = inject(UserService);

  return service.get(route.params['username']);
};
