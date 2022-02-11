import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninGoogleComponent } from './signin-google/signin-google.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpSuccessComponent } from './sign-up-success/sign-up-success.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { VerifyUserEmailComponent } from './verify-user-email/verify-user-email.component';

const routes: Routes = [
  { path: 'login-phone', component: LoginComponent },
  { path: 'signin-google', component: SigninGoogleComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'signin', component: SignUpComponent },
  { path: 'signin-success', component: SignUpSuccessComponent },
  { path: 'signin-success/:id', component: SignUpSuccessComponent },
  { path: 'verifyemail/:id', component: VerifyemailComponent },
  { path: 'verifyuseremail/:id', component: VerifyUserEmailComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
