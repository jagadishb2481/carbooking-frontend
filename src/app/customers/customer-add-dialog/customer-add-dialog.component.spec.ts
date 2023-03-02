import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddDialogComponent } from './customer-add-dialog.component';

describe('CustomerAddDialogComponent', () => {
  let component: CustomerAddDialogComponent;
  let fixture: ComponentFixture<CustomerAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
