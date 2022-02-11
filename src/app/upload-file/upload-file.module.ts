import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UploadFileRoutingModule } from './upload-file-routing.module';
import { UploadFileComponent } from './upload-file.component';
import { FileListComponent } from './file-list/file-list.component';
import { FileDetailComponent } from './file-detail/file-detail.component';
import { FileDeleteComponent } from './file-delete/file-delete.component';


@NgModule({
    declarations: [UploadFileComponent, FileListComponent, FileDetailComponent, FileDeleteComponent],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        BrowserAnimationsModule,
        UploadFileRoutingModule
    ]
})
export class UploadFileModule { }
