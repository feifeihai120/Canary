import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

// 时间 控件
import { CalendarModule } from 'primeng/primeng'

import { MeetingComponent } from './meeting.component';
import { NewMeetingComponent } from './new-meeting.component'
import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingService } from '../service/meeting.service'

@NgModule({
  imports: [
    MeetingRoutingModule,
    ChartsModule,
    DropdownModule,
    CommonModule,
    RouterModule,
    FormsModule,
    CalendarModule,
  ],
  declarations: [MeetingComponent, NewMeetingComponent],
  providers: [MeetingService]
})
export class MeetingModule { }
