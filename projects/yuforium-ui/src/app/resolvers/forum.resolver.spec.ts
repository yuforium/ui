import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { forumResolver } from './forum.resolver';

describe('forumResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => forumResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
