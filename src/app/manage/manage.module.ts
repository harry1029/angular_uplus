import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { TreeModule } from 'primeng/tree';
import { TableModule } from 'primeng/table';


import { ManageRoutingModule } from './manage-routing.module';
import { MenuItemTreeComponent } from './menu-item/menu-item-tree/menu-item-tree.component';
import { MenuItemDetailComponent } from './menu-item/menu-item-detail/menu-item-detail.component';
import { MenuItemInsertComponent } from './menu-item/menu-item-insert/menu-item-insert.component';
import { MenuItemUpdateComponent } from './menu-item/menu-item-update/menu-item-update.component';
import { OrgTreeComponent } from './organization/org-tree/org-tree.component';
import { OrgTreeDetailComponent } from './organization/org-tree-detail/org-tree-detail.component';
import { OrgTreeInsertComponent } from './organization/org-tree-insert/org-tree-insert.component';
import { OrgTreeUpdateComponent } from './organization/org-tree-update/org-tree-update.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { BooksComponent } from './books/books.component';
import { ExampleOneComponent } from './example-one/example-one.component';
import { ExampleTwoComponent } from './example-two/example-two.component';
import { ExampleThreeComponent } from './example-three/example-three.component';
import { ExitAdminComponent } from './exit-admin/exit-admin.component';

@NgModule({
    declarations: [
        MenuItemTreeComponent,
        MenuItemDetailComponent,
        MenuItemInsertComponent,
        MenuItemUpdateComponent,
        OrgTreeComponent,
        OrgTreeDetailComponent,
        OrgTreeInsertComponent,
        OrgTreeUpdateComponent,
        HomeComponent,
        CoursesComponent,
        TeachersComponent,
        StudentsComponent,
        BooksComponent,
        ExampleOneComponent,
        ExampleTwoComponent,
        ExampleThreeComponent,
        ExitAdminComponent,
    ],

    imports: [
        CommonModule,
        FormsModule,
        TieredMenuModule,
        ButtonModule,
        ToastModule,
        RippleModule,
        TreeModule,
        TableModule,
        ManageRoutingModule
    ]
})
export class ManageModule { }
