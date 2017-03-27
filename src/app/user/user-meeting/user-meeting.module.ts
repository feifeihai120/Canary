import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common'

import { UserMeetingRoutingModule } from './user-meeting.routing.module'
import { UserMeetingComponent }  from './user-meeting.component';

@NgModule({
    imports:      [ CommonModule, UserMeetingRoutingModule ],
    declarations: [ UserMeetingComponent ],
})
export class UserMeetingModule {  }