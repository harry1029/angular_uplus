import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttachmentComponent } from './teacher-attachment.component';

describe('TeacherAttachmentComponent', () => {
  let component: TeacherAttachmentComponent;
  let fixture: ComponentFixture<TeacherAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
