import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingComponent } from './meeting.component';
import { NewMeetingComponent } from './new-meeting.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: '会议'
    },
    children: [
      {
        path: 'meetingList',
        component: MeetingComponent,
        data: {
          title: '会议列表'
        }
      },
      {
        path: 'newMeeting',
        component: NewMeetingComponent,
        data: {
          title: '新建会议'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
