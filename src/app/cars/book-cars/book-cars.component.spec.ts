import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCarsComponent } from './book-cars.component';

describe('BookCarsComponent', () => {
  let component: BookCarsComponent;
  let fixture: ComponentFixture<BookCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
