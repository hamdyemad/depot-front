import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusOfOrdersComponent } from './change-status-of-orders.component';

describe('ChangeStatusOfOrdersComponent', () => {
  let component: ChangeStatusOfOrdersComponent;
  let fixture: ComponentFixture<ChangeStatusOfOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeStatusOfOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStatusOfOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
