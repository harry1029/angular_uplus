import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttachmentComponent } from './student-attachment.component';

describe('StudentAttachmentComponent', () => {
  let component: StudentAttachmentComponent;
  let fixture: ComponentFixture<StudentAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAttachmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
