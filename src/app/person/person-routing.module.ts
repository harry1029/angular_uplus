import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalInfoEditComponent } from './personal-info-edit/personal-info-edit.component';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { MyHomeComponent } from './my-home/my-home.component';

const routes: Routes = [
  {
    path: 'personal',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'photo/:id', component: ProfilePhotoComponent },
      { path: 'edit/:id', component: PersonalInfoEditComponent },
      { path: 'info/:id', component: PersonalInfoComponent },
      { path: 'info', component: PersonalInfoComponent },
      { path: 'my/:id', component: MyHomeComponent },
      { path: 'my', component: MyHomeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
