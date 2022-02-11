import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceAutocompleteComponent } from './utility/place-autocomplete/place-autocomplete.component';
import { PageNotFoundComponent } from './utility/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'placeautocomplete', component: PlaceAutocompleteComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
