import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserMaterialComponent } from './user-material.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { 
                path: '', 
                component: UserMaterialComponent,
                data: {
                    title: '我的会议材料'
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class UserMaterialRoutingModule { 
    
}