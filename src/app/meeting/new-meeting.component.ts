import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Meeting } from '../service/meeting'

@Component({
    moduleId: module.id,
    templateUrl: 'new-meeting.component.html',
})
export class NewMeetingComponent implements OnInit {

    private meeting: Meeting

    private startTime: Date
    private endTime: Date

    constructor() {
        this.meeting = new Meeting()
    }

    ngOnInit() {
    }

    /**
     * 提交表单数据
     */
    submit() {
        console.log(this.meeting)
    }

    /**
     * 重置表单
     */
    reset() {
        this.meeting = new Meeting()
    }
}