import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { TreeModule } from 'primeng/tree';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ImageModule } from 'primeng/image';

import { HttpClientModule } from '@angular/common/http';

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
import { StudentsComponent } from './students/students.component';
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
import { ProductsComponent } from './products/products.component';

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
    StudentsComponent,
    BooksComponent,
    ExampleOneComponent,
    ExampleTwoComponent,
    ExampleThreeComponent,
    ExitAdminComponent,
    ApiListComponent,
    ApiInsertComponent,
    ApiEditComponent,
    ApiDetailComponent,
    TeacherListComponent,
    TeacherEditComponent,
    TeacherInsertComponent,
    TeacherDetailComponent,
    TeacherAttachmentComponent,
    FaqListComponent,
    FaqEditComponent,
    FaqInsertComponent,
    FaqDetailComponent,
    ProductsComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    TieredMenuModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    DropdownModule,
    InputTextModule,
    FileUploadModule,
    CheckboxModule,
    TreeModule,
    TableModule,
    ManageRoutingModule,
        CalendarModule,
    InputNumberModule,
    HttpClientModule,
    MultiSelectModule,
    ImageModule,
  ]
})
export class ManageModule { }
