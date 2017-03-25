import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { MeetingComponent } from './meeting.component';

const routes: Routes = [
  {
    path: '',
    component: MeetingComponent,
    data: {
      title: '会议'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule {}
