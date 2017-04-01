import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfComponent } from './pdf.component'

const routes: Routes = [
    {
        path: '',
        data: {
            tiyle: '会议室'
        },
        children: [
            {
                path: 'pdf/:id',
                component: PdfComponent,
                data: {
                    title: 'PDF文件'
                }
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class RunMeetingRoutingModule {

}