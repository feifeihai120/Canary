import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingMaterialComponent } from './meeting-material.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: '会议材料'
        },
        children: [
            {
                path: 'meetingMaterialList',
                component: MeetingMaterialComponent,
                data: {
                    title: '会议材料列表'
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
export class MeetingMaterialRoutingModule {

}