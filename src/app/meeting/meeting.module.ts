import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
// tabs
import { TabsModule } from 'ng2-bootstrap/tabs';

// primeng
import { CalendarModule } from 'primeng/primeng'
import { ChipsModule } from 'primeng/primeng';
import { AccordionModule } from 'primeng/primeng'
import { FileUploadModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { PickListModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';

// 功能 组件
import { MeetingComponent } from './meeting.component';
import { NewMeetingComponent } from './new-meeting.component'
import { MeetingDetailComponent } from './meeting-detail.component'

import { MeetingRoutingModule } from './meeting-routing.module';

import { MeetingService } from '../service/meeting.service'
import { MeetingMaterialService } from '../service/meeting_material.service'
import { MeetingPeopleService } from '../service/meeting_people.service'

@NgModule({
  imports: [
    MeetingRoutingModule,
    ChartsModule,
    DropdownModule,
    CommonModule,
    RouterModule,
    FormsModule,
    CalendarModule,
    ChipsModule,
    AccordionModule,
    FileUploadModule,
    PaginatorModule,
    GrowlModule,
    PickListModule,
    DialogModule,
    TabsModule
  ],
  declarations: [
    MeetingComponent,
    NewMeetingComponent,
    MeetingDetailComponent
  ],
  providers: [MeetingService, MeetingMaterialService, MeetingPeopleService]
})
export class MeetingModule { }
