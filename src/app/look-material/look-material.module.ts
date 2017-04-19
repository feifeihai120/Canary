import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// pdf-viewer
import { PdfViewerComponent } from 'ng2-pdf-viewer';
// primeng
import { GrowlModule } from 'primeng/primeng';

import { LookMaterialRoutingModule } from './look-material-routing.module';
import { LookMaterialComponent } from './look-material.component'
import { MeetingMaterialService } from '../service/meeting_material.service'

@NgModule({
    imports: [CommonModule, LookMaterialRoutingModule, GrowlModule],
    declarations: [LookMaterialComponent, PdfViewerComponent],
    providers: [MeetingMaterialService]
})
export class LookMaterialModule { }