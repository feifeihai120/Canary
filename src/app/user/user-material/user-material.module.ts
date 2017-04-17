import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

// primeng
import { PaginatorModule } from 'primeng/primeng';

import { UserMaterialRoutingModule } from './user-material.routing'
import { UserMaterialComponent } from './user-material.component';

import { MeetingMaterialService } from '../../service/meeting_material.service'

@NgModule({
    imports: [CommonModule, UserMaterialRoutingModule, PaginatorModule],
    declarations: [UserMaterialComponent],
    providers: [MeetingMaterialService]
})
export class UserMaterialModule { }