/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { TheatreService } from './theatres.service';

describe('Service: Theatres', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TheatreService]
    });
  });

  it('should ...', inject([TheatreService], (service: TheatreService) => {
    expect(service).toBeTruthy();
  }));
});
