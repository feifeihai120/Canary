import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { GroupRoutingModule } from './group.routing'
import { GroupComponent } from './group.component';

@NgModule({
    imports: [CommonModule, GroupRoutingModule],
    declarations: [GroupComponent],
})
export class GroupModule { }