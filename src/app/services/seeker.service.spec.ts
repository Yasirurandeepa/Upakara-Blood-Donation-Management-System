import { TestBed, inject } from '@angular/core/testing';

import { SeekerService } from './seeker.service';

describe('SeekerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeekerService]
    });
  });

  it('should be created', inject([SeekerService], (service: SeekerService) => {
    expect(service).toBeTruthy();
  }));
});
