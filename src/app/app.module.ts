import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { JwtInterceptor } from './utility/jwt.interceptor';
import { ErrorInterceptor } from './utility/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './utility/page-not-found/page-not-found.component';
import { UnderConstructionComponent } from './utility/under-construction/under-construction.component';
import { FooterComponent } from './utility/footer/footer.component';
import { HomePageModule } from './home-page/home-page.module';
import { TopBarComponent } from './utility/top-bar/top-bar.component';
import { UploadFileModule } from './upload-file/upload-file.module';
import { AuthModule } from './auth/auth.module';
import { PlaceAutocompleteModule } from './utility/place-autocomplete/place-autocomplete.module';
import { ManageModule } from './manage/manage.module';
import { UplusModule } from './uplus/uplus.module';
import { PersonModule } from './person/person.module';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UnderConstructionComponent,
    FooterComponent,
    TopBarComponent,
  ],
  imports: [
    HomePageModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MenubarModule,
    UplusModule,
    ButtonModule,
    RippleModule,
    UploadFileModule,
    AuthModule,
    ManageModule,
    PlaceAutocompleteModule,
    SocialLoginModule,
    PersonModule,
    AppRoutingModule,
    //AppRoutingModule要往后放，因为path: '**'
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '917036876132-q9rkk8uhfc7uk939agcmdkkg837le17u.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '436356704210371'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
