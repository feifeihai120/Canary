import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

// primeng
import { PaginatorModule } from 'primeng/primeng';

import { UserMeetingRoutingModule } from './user-meeting.routing.module'
import { UserMeetingComponent } from './user-meeting.component';

import { MeetingPeopleService } from '../../service/meeting_people.service'

@NgModule({
    imports: [CommonModule, UserMeetingRoutingModule, PaginatorModule],
    declarations: [UserMeetingComponent],
    providers: [MeetingPeopleService]
})
export class UserMeetingModule { }