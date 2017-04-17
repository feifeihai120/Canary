import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

// primeng
import { PaginatorModule } from 'primeng/primeng';

import { MeetingMaterialRoutingModule } from './meeting-material-routing.module'
import { MeetingMaterialComponent } from './meeting-material.component';

import { MeetingMaterialService } from '../service/meeting_material.service'

@NgModule({
    imports: [CommonModule, MeetingMaterialRoutingModule, PaginatorModule],
    declarations: [MeetingMaterialComponent],
    providers: [MeetingMaterialService]
})
export class MeetingMaterialModule { }