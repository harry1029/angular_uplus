import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { HeroInsertComponent } from './heroes/hero-insert/hero-insert.component';
import { HeroEditComponent } from './heroes/hero-edit/hero-edit.component';

const routes: Routes = [
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroinsert', component: HeroInsertComponent },
  { path: 'heroedit/:id', component: HeroEditComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UplusRoutingModule { }
