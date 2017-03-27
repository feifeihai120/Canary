import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common'

import { UserMaterialRoutingModule } from './user-material.routing'
import { UserMaterialComponent }  from './user-material.component';

@NgModule({
    imports:      [ CommonModule, UserMaterialRoutingModule ],
    declarations: [ UserMaterialComponent ],
})
export class UserMaterialModule {  }