import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MeetingComponent }  from './meeting.component';
import { MeetingRoutingModule } from './meeting-routing.module'

@NgModule({
    imports:      [ BrowserModule, MeetingRoutingModule ],
    declarations: [ MeetingComponent ]
})
export class MeetingModule { }