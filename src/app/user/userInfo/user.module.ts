import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

// primeng
import { GrowlModule } from 'primeng/primeng';

import { UserRoutingModule } from './user-routing.module'
import { UserComponent } from './user.component';

import { UserService } from '../../service/user.service'

@NgModule({
    imports: [CommonModule, FormsModule, GrowlModule, UserRoutingModule],
    declarations: [UserComponent],
    providers: [UserService]
})
export class UserModule { }