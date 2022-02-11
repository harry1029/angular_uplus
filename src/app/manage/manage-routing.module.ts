import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import { MenuItemTreeComponent } from './menu-item/menu-item-tree/menu-item-tree.component';
import { OrgTreeComponent } from './organization/org-tree/org-tree.component';
import { CoursesComponent } from './courses/courses.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { BooksComponent } from './books/books.component';
import { ExampleOneComponent } from './example-one/example-one.component';
import { ExampleTwoComponent } from './example-two/example-two.component';
import { ExampleThreeComponent } from './example-three/example-three.component';
import { ExitAdminComponent } from './exit-admin/exit-admin.component';

const routes: Routes = [
  {
    path: 'manage',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'menutree', component: MenuItemTreeComponent },
      { path: 'orgtree', component: OrgTreeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'books', component: BooksComponent },
      { path: 'example1', component: ExampleOneComponent },
      { path: 'example2', component: ExampleTwoComponent },
      { path: 'example3', component: ExampleThreeComponent },
      { path: 'exit-admin', component: ExitAdminComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
