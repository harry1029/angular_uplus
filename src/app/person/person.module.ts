import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ImageCropperModule } from 'ngx-image-cropper';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { GalleriaModule } from 'primeng/galleria';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeModule } from 'primeng/tree';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { PlaceAutocompleteModule } from '../utility/place-autocomplete/place-autocomplete.module';

import { PersonRoutingModule } from './person-routing.module';
import { PersonalInfoEditComponent } from './personal-info-edit/personal-info-edit.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { MyHomeComponent } from './my-home/my-home.component';


@NgModule({
  declarations: [
    PersonalInfoComponent,
    PersonalInfoEditComponent,
    MyHomeComponent,
    ProfilePhotoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    PersonRoutingModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    MultiSelectModule,
    GalleriaModule,
    CheckboxModule,
    TreeModule,
    ConfirmPopupModule,
    PlaceAutocompleteModule,
    ProgressBarModule,
    ImageCropperModule
  ]

})
export class PersonModule { }
