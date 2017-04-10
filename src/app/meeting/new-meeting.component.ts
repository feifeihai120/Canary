import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MeetingService } from '../service/meeting.service'

import { Meeting } from '../service/meeting'
import { NewMeetingInfo } from '../service/new_meeting_info'
import { MeetingRoom } from '../service/meeting_room'
import { MeetingType } from '../service/meeting_type'

@Component({
    moduleId: module.id,
    selector: 'new-meeting',
    templateUrl: 'new-meeting.component.html',
})
export class NewMeetingComponent implements OnInit {

    private meetingRooms: MeetingRoom[]
    private meetingTypes: MeetingType[]
    private meeting: Meeting

    private startTime: Date
    private endTime: Date

    constructor(
        private meetingService: MeetingService,
        private router: Router) {
        this.meeting = new Meeting()
    }

    ngOnInit() {
        this.meetingService.getNewMeetingInfo()
            .then(newMeetingInfo => {
                this.meetingRooms = newMeetingInfo.meetingRooms
                this.meetingTypes = newMeetingInfo.meetingTypes
            })
    }

    /**
     * 提交表单数据
     */
    submit() {
        console.log(this.meeting)
        this.meetingService.create(this.meeting)
            .then(meetingId => this.router.navigate(['/meeting/meetingDetail', meetingId]))
    }

    /**
     * 重置表单
     */
    reset() {
        this.meeting = new Meeting()
    }

    /**
     * 取消新建会议，返回会议列表
     */
    cancel() {
        this.router.navigateByUrl('/meeting/meetingList')
    }
}