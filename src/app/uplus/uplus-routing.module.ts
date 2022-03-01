import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { HeroInsertComponent } from './heroes/hero-insert/hero-insert.component';
import { HeroEditComponent } from './heroes/hero-edit/hero-edit.component';

import { ApiListComponent } from './apis/api-list/api-list.component';
import { ApiInsertComponent } from './apis/api-insert/api-insert.component';
import { ApiEditComponent } from './apis/api-edit/api-edit.component';
import { ApiDetailComponent } from './apis/api-detail/api-detail.component';

const routes: Routes = [
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroinsert', component: HeroInsertComponent },
  { path: 'heroedit/:id', component: HeroEditComponent },

  { path: 'apis', component: ApiListComponent },
  { path: 'apiinsert', component: ApiInsertComponent },
  { path: 'apiedit/:id', component: ApiEditComponent},
  { path: 'apidetail/:id', component: ApiDetailComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UplusRoutingModule { }
