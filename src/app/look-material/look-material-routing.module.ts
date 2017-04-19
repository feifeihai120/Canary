import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LookMaterialComponent } from './look-material.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: '查看材料'
        },
        children: [
            {
                path: 'material/:id',
                component: LookMaterialComponent,
                data: {
                    title: '查看材料'
                }
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class LookMaterialRoutingModule {

}