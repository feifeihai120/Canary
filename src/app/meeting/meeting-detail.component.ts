import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MeetingModel } from '../service/meeting_model'
import { MeetingService } from '../service/meeting.service'

@Component({
    moduleId: module.id,
    selector: 'meeting-detail',
    templateUrl: 'meeting-detail.component.html',
})
export class MeetingDetailComponent implements OnInit {

    private meetingModel: MeetingModel

    constructor(
        private route: ActivatedRoute,
        private meetingService: MeetingService,
        private location: Location) { }

    /**
     * ‘+’ 号 将 string 类型的 id 转成 number
     */
    ngOnInit() {
        this.route.params
            .switchMap((parmas: Params) => this.meetingService.getMeetingDetail(+parmas['id']))
            .subscribe(meetingModel => {
                this.meetingModel = meetingModel
                // console.log(this.meetingModel)
            })
    }
}