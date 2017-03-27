import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingMaterialComponent } from './meeting-material.component';

const routes: Routes = [
    {
        path: '',
        component: MeetingMaterialComponent,
        data: {
            title: '会议材料'
        }
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