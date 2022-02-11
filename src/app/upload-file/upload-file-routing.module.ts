import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import { UploadFileComponent } from './upload-file.component';
import { FileListComponent } from './file-list/file-list.component';
import { FileDetailComponent } from './file-detail/file-detail.component';
import { FileDeleteComponent } from './file-delete/file-delete.component';

const routes: Routes = [
    {
        path: 'ufile',
        component: UploadFileComponent,
        canActivateChild: [AuthGuard],
        children: [
            { path: 'list', redirectTo: '', pathMatch: 'full' },
            { path: 'detail', component: FileDetailComponent },
            { path: 'delete', component: FileDeleteComponent },
            { path: '', component: FileListComponent },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFileRoutingModule { }
