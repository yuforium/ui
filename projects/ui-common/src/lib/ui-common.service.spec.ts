import { TestBed } from '@angular/core/testing';

import { UiCommonService } from './ui-common.service';

describe('UiCommonService', () => {
  let service: UiCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
