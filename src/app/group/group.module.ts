import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

// primeng
import { PaginatorModule } from 'primeng/primeng';

import { GroupRoutingModule } from './group.routing'
import { GroupComponent } from './group.component';

import { GroupService } from '../service/group.service'

@NgModule({
    imports: [CommonModule, GroupRoutingModule, PaginatorModule],
    declarations: [GroupComponent],
    providers: [GroupService]
})
export class GroupModule { }