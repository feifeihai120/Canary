import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'

import 'rxjs/add/operator/switchMap'

import { MeetingService } from '../service/meeting.service'
import { Meeting } from '../service/meeting'
import { User } from '../service/user'

@Component({
  moduleId: module.id,
  templateUrl: 'meeting.component.html'
})
export class MeetingComponent implements OnInit {

  private meetings: Meeting[]
  private currUser: User

  constructor(
    private meetingService: MeetingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("parmas: ", this.route.queryParams)
    console.log('init meeting list...')

    this.meetingService.getLimitMeetings()
      .then(meetings => this.meetings = meetings)
  }
}
