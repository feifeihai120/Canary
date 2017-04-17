import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { UserRoutingModule } from './user-routing.module'
import { UserComponent } from './user.component';

import { UserService } from '../../service/user.service'

@NgModule({
    imports: [CommonModule, UserRoutingModule],
    declarations: [UserComponent],
    providers: [UserService]
})
export class UserModule { }