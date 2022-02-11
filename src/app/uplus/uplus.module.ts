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


@NgModule({
  declarations: [
    HeroListComponent,
    HeroInsertComponent,
    HeroEditComponent
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
    UplusRoutingModule
  ]
})
export class UplusModule { }
