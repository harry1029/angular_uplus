import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurSelfComponent } from './our-self/our-self.component';
import { StarCoursesComponent } from './star-courses/star-courses.component';
import { DemoCoursesComponent } from './demo-courses/demo-courses.component';
import { BookCourseComponent } from './book-course/book-course.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OurTeachersComponent } from './our-teachers/our-teachers.component';
import { BookIntroductionComponent } from './book-introduction/book-introduction.component';
import { OnlineBooksComponent } from './online-books/online-books.component';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { MyCourseComponent } from './my-course/my-course.component';
import { HomeComponent } from '../manage/home/home.component';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'here', component: OurSelfComponent },
  { path: 'teachers', component: OurTeachersComponent },
  { path: 'star-courses', component: StarCoursesComponent },
  { path: 'demo-courses', component: DemoCoursesComponent },
  { path: 'book-courses', component: BookCourseComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'book-introduction', component: BookIntroductionComponent },
  { path: 'onlinebook', component: OnlineBooksComponent },
  { path: 'register-course', component: RegisterCourseComponent },
  { path: 'my-courses', component: MyCourseComponent },
  { path: 'admin', component: HomeComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
