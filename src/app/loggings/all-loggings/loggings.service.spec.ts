/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoggingsService } from './loggings.service';

describe('Service: Loggings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggingsService]
    });
  });

  it('should ...', inject([LoggingsService], (service: LoggingsService) => {
    expect(service).toBeTruthy();
  }));
});
