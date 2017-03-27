import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common'

import { MeetingMaterialRoutingModule } from './meeting-material-routing.module'
import { MeetingMaterialComponent }  from './meeting-material.component';

@NgModule({
    imports:      [ CommonModule, MeetingMaterialRoutingModule ],
    declarations: [ MeetingMaterialComponent ],
})
export class MeetingMaterialModule {  }