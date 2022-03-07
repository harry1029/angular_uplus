import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

import { UplusRoutingModule } from './uplus-routing.module';
import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { HeroInsertComponent } from './heroes/hero-insert/hero-insert.component';
import { HeroEditComponent } from './heroes/hero-edit/hero-edit.component';

import { CheckboxModule } from 'primeng/checkbox';

// Import API related components
import { ApiListComponent } from './apis/api-list/api-list.component';
import { ApiInsertComponent } from './apis/api-insert/api-insert.component';
import { ApiEditComponent } from './apis/api-edit/api-edit.component';
import { ApiDetailComponent } from './apis/api-detail/api-detail.component';

@NgModule({
  declarations: [
    HeroListComponent,
    HeroInsertComponent,
    HeroEditComponent,

    ApiListComponent,
    ApiInsertComponent,
    ApiEditComponent,
    ApiDetailComponent,
  ],
  imports: [
    BrowserModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    RippleModule,
    ToastModule,
    DropdownModule,
    FileUploadModule,
    CommonModule,
    UplusRoutingModule,
    CheckboxModule,
  ]
})
export class UplusModule { }
