import { TestBed } from '@angular/core/testing';

import { FinalistService } from './finalist.service';

describe('FinalistService', () => {
  let service: FinalistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinalistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
