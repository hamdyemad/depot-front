import { TestBed } from '@angular/core/testing';

import { InternetInterceptor } from './internet.interceptor';

describe('InternetInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InternetInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InternetInterceptor = TestBed.inject(InternetInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
