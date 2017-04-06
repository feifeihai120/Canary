import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

// ng2-bootstrap
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';

// pdf-viewer
import { PdfViewerComponent } from 'ng2-pdf-viewer';

// primeng
import { GrowlModule } from 'primeng/primeng';

// socket
import { StompService } from 'ng2-stomp-service';

// shared
import { AsideToggleDirective } from '../shared/aside.directive';

import { RunMeetingRoutingModule } from './run-meeting.routing'

import { PdfComponent } from './pdf.component'

import { MeetingService } from '../service/meeting.service'

@NgModule({
    imports: [
        RunMeetingRoutingModule,
        CommonModule,
        RouterModule,
        FormsModule,
        DropdownModule,
        TabsModule,
        GrowlModule
    ],
    declarations: [PdfComponent, AsideToggleDirective, PdfViewerComponent],
    providers: [MeetingService, StompService],
})
export class RunMeetingModule { }