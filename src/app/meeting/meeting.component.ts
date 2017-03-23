import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../service/meeting.service';

import { Meeting } from '../service/meeting'

/**
* This class represents the lazy loaded HomeComponent.
*/
@Component({
    moduleId: module.id,
    selector: 'meeting',
    templateUrl: './meeting.component.html',
})
export class MeetingComponent implements OnInit {

    private meetings: Meeting[]

    constructor(public meetingService: MeetingService) { }

    ngOnInit() {
        console.log('init meeting list...')
    }
}