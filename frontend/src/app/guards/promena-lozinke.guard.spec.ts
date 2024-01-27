import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { promenaLozinkeGuard } from './promena-lozinke.guard';

describe('promenaLozinkeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => promenaLozinkeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
