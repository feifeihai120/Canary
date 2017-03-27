import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMeetingComponent } from './user-meeting.component';

const routes: Routes = [
    { 
        path: '', 
        component: UserMeetingComponent, 
        data: {
            title: '我参与的会议'
        }
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UserMeetingRoutingModule {

}