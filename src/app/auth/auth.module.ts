import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CountdownModule } from 'ngx-countdown';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { SigninGoogleComponent } from './signin-google/signin-google.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpSuccessComponent } from './sign-up-success/sign-up-success.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { VerifyUserEmailComponent } from './verify-user-email/verify-user-email.component';


@NgModule({
    declarations: [LoginComponent, TestComponent, SigninGoogleComponent, LoginUserComponent, SignUpComponent, SignUpSuccessComponent, VerifyemailComponent, VerifyUserEmailComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        FileUploadModule,
        AuthRoutingModule,
        ButtonModule,
        ToastModule,
        DropdownModule,
        InputTextModule,
        CountdownModule,
        RippleModule
    ]
})
export class AuthModule { }
