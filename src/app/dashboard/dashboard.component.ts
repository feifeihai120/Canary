import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MeetingService } from '../service/meeting.service'
import { Meeting } from '../service/meeting'

@Component({
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  meetings: Meeting[]
  constructor(private meetingService: MeetingService) { }

  ngOnInit(): void {
    console.log('init meeting list...')
    this.meetingService.getLimitMeetings()
      .then(meetings => this.meetings = meetings)
  }
}
