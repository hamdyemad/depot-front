import { TestBed } from '@angular/core/testing';

import { TranslateDetectionService } from './translate-detection.service';

describe('TranslateDetectionService', () => {
  let service: TranslateDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
