import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuItemTreeComponent } from './menu-item/menu-item-tree/menu-item-tree.component';
import { OrgTreeComponent } from './organization/org-tree/org-tree.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { BooksComponent } from './books/books.component';
import { ExampleOneComponent } from './example-one/example-one.component';
import { ExampleTwoComponent } from './example-two/example-two.component';
import { ExampleThreeComponent } from './example-three/example-three.component';
import { ExitAdminComponent } from './exit-admin/exit-admin.component';
import { ApiListComponent } from './apis/api-list/api-list.component';
import { ApiInsertComponent } from './apis/api-insert/api-insert.component';
import { ApiEditComponent } from './apis/api-edit/api-edit.component';
import { ApiDetailComponent } from './apis/api-detail/api-detail.component';
import { TeacherListComponent } from './teachers/teacher-list/teacher-list.component';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { TeacherInsertComponent } from './teachers/teacher-insert/teacher-insert.component';
import { TeacherDetailComponent } from './teachers/teacher-detail/teacher-detail.component';
import { TeacherAttachmentComponent } from './teachers/teacher-attachment/teacher-attachment.component';
import { FaqListComponent } from './faqs/faq-list/faq-list.component';
import { FaqEditComponent } from './faqs/faq-edit/faq-edit.component';
import { FaqInsertComponent } from './faqs/faq-insert/faq-insert.component';
import { FaqDetailComponent } from './faqs/faq-detail/faq-detail.component';
import { StudentInsertComponent } from './students/student-insert/student-insert.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';
import { StudentAttachmentComponent } from './students/student-attachment/student-attachment.component';

const routes: Routes = [
  {
    path: 'manage',

    children: [
      { path: 'menutree', component: MenuItemTreeComponent },
      { path: 'orgtree', component: OrgTreeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'books', component: BooksComponent },
      { path: 'example1', component: ExampleOneComponent },
      { path: 'example2', component: ExampleTwoComponent },
      { path: 'example3', component: ExampleThreeComponent },
      { path: 'exit-admin', component: ExitAdminComponent },
      { path: 'apis', component: ApiListComponent },
      { path: 'apiinsert', component: ApiInsertComponent },
      { path: 'apiedit/:id', component: ApiEditComponent },
      { path: 'apidetail/:id', component: ApiDetailComponent },
      { path: 'faqs', component: FaqListComponent },
      { path: 'faqinsert', component: FaqInsertComponent },
      { path: 'faqedit/:id', component: FaqEditComponent },
      { path: 'faqdetail/:id', component: FaqDetailComponent },
      { path: 'students', component: StudentListComponent },
      { path: 'studentinsert', component: StudentInsertComponent },
      { path: 'studentedit/:id', component: StudentEditComponent },
      { path: 'studentdetail/:id', component: StudentDetailComponent },
      { path: 'studentattach/:id', component: StudentAttachmentComponent },
      { path: 'teachers', component: TeacherListComponent },
      { path: 'teacherinsert', component: TeacherInsertComponent },
      { path: 'teacheredit/:id', component: TeacherEditComponent },
      { path: 'teacherdetail/:id', component: TeacherDetailComponent },
      { path: 'teacherattach/:id', component: TeacherAttachmentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRoutingModule {}
