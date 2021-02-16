/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { RolesService } from './roles.service';

describe('Service: Roles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolesService]
    });
  });

  it('should ...', inject([RolesService], (service: RolesService) => {
    expect(service).toBeTruthy();
  }));
});
