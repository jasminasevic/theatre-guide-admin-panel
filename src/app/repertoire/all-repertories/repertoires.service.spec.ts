import { TestBed } from '@angular/core/testing';

import { RepertoiresService } from './repertoires.service';

describe('RepertoiresService', () => {
  let service: RepertoiresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepertoiresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
