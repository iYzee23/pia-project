import { TestBed } from '@angular/core/testing';

import { ZService } from './z.service';

describe('ZService', () => {
  let service: ZService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
