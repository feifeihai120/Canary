import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { MeetingPeopleService } from '../../service/meeting_people.service'
import { MeetingPeoplePage } from '../../service/meeting_people_page'

@Component({
    moduleId: module.id,
    selector: 'user-meeting',
    templateUrl: 'user-meeting.component.html',
})
export class UserMeetingComponent implements OnInit {
    private userMeetingPage: MeetingPeoplePage = new MeetingPeoplePage()
    constructor(
        private userMeetingService: MeetingPeopleService,
        private router: Router) { }

    ngOnInit() {
        this.userMeetingService.pageUserMeeting(1, 10)
            .then(page => this.userMeetingPage = page)
    }

    paginate(event) {
        this.userMeetingService.pageUserMeeting(event.page + 1, event.rows)
            .then(page => this.userMeetingPage = page)
    }

    lookMeeting(meetingId: number) {
        this.router.navigate(['/meeting/meetingDetail', meetingId])
    }
}