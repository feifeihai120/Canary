import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupComponent } from './group.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: GroupComponent, data: { title: '分组信息' } }
        ])
    ],
    exports: [RouterModule]
})
export class GroupRoutingModule {

}