import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateInfoComponent } from './generate-info.component';

describe('GenerateInfoComponent', () => {
  let component: GenerateInfoComponent;
  let fixture: ComponentFixture<GenerateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
