import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { VedioCarouselComponent } from './vedio-carousel/vedio-carousel.component';
import { StarTeachersComponent } from './star-teachers/star-teachers.component';
import { StarStudentsComponent } from './star-students/star-students.component';
import { ProgramsComponent } from './programs/programs.component';
import { PartnersComponent } from './partners/partners.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BookIntroductionComponent } from './book-introduction/book-introduction.component';
import { OnlineBooksComponent } from './online-books/online-books.component';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { MyCourseComponent } from './my-course/my-course.component';
import { OurSelfComponent } from './our-self/our-self.component';
import { OurTeachersComponent } from './our-teachers/our-teachers.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StarCoursesComponent } from './star-courses/star-courses.component';
import { DemoCoursesComponent } from './demo-courses/demo-courses.component';
import { BookCourseComponent } from './book-course/book-course.component';

@NgModule({
    declarations: [
        HomePageComponent,
        MainCarouselComponent,
        VedioCarouselComponent,
        StarTeachersComponent,
        StarStudentsComponent,
        ProgramsComponent,
        PartnersComponent,
        AboutUsComponent,
        BookIntroductionComponent,
        OnlineBooksComponent,
        RegisterCourseComponent,
        MyCourseComponent,
        OurSelfComponent,
        OurTeachersComponent,
        ContactUsComponent,
        StarCoursesComponent,
        DemoCoursesComponent,
        BookCourseComponent,
    ],
    imports: [
        BrowserModule,
        GalleriaModule,
        CarouselModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        HttpClientModule,
        RippleModule,
        ToastModule,
        DropdownModule,
        FileUploadModule,
        CommonModule,
        HomePageRoutingModule
    ]
})
export class HomePageModule { }
