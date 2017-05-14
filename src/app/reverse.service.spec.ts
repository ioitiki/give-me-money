import { TestBed, inject } from '@angular/core/testing';

import { ReverseService } from './reverse.service';

describe('ReverseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReverseService]
    });
  });

  it('should ...', inject([ReverseService], (service: ReverseService) => {
    expect(service).toBeTruthy();
  }));
});
