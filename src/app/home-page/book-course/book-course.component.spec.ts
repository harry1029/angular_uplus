import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCourseComponent } from './book-course.component';

describe('BookCourseComponent', () => {
  let component: BookCourseComponent;
  let fixture: ComponentFixture<BookCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
