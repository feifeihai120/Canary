import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Meeting } from '../service/meeting'
import { MeetingService } from '../service/meeting.service'

@Component({
    moduleId: module.id,
    selector: 'meeting-detail',
    templateUrl: 'meeting-detail.component.html',
})
export class MeetingDetailComponent implements OnInit {

    private meeting: Meeting

    constructor(
        private route: ActivatedRoute,
        private meetingService: MeetingService,
        private location: Location) { }

    ngOnInit() {
        this.route.params
            .switchMap((parmas: Params) => this.meetingService.getMeetingDetail(+parmas['id']))
            .subscribe(meeting => {
                this.meeting = meeting
                console.log(this.meeting)
            })
    }
}