import { TestBed } from '@angular/core/testing';

import { FireAngularService } from './fire-angular.service';

describe('FireAngularService', () => {
  let service: FireAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
