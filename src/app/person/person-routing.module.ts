import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import { PersonInfoComponent } from './person-info/person-info.component';
import { PersonInfoEditComponent } from './person-info-edit/person-info-edit.component';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { MyHomeComponent } from './my-home/my-home.component';

const routes: Routes = [
  {
    path: 'person',
    canActivateChild: [AuthGuard],
    children: [
      { path: 'photo/:id', component: ProfilePhotoComponent },
      { path: 'edit/:id', component: PersonInfoEditComponent },
      { path: 'info/:id', component: PersonInfoComponent },
      { path: 'info', component: PersonInfoComponent },
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
