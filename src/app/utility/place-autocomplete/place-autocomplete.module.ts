import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';

import { PlaceAutocompleteComponent } from './place-autocomplete.component';

@NgModule({
    declarations: [PlaceAutocompleteComponent],
    imports: [
        GooglePlaceModule,
        FormsModule,
        AutoCompleteModule,
        InputTextModule,
        CommonModule
    ],
    exports: [
        PlaceAutocompleteComponent
    ]
})
export class PlaceAutocompleteModule { }
