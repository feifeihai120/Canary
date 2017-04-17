import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise'

import { BaseUrl } from './url'
import { HttpService } from './http.service'
import { MeetingPeoplePage } from './meeting_people_page'

@Injectable()
export class MeetingPeopleService {

    constructor(private httpService: HttpService) { }

    public pageUserMeeting(pageNo: number, pageSize: number): Promise<MeetingPeoplePage> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}meetingPeople/user`, `pageNo=${pageNo}&pageSize=${pageSize}`)
            .toPromise()
            .then(page => page)
    }

    public pageTopicMeetingPeople(topicId: number, pageNo: number, pageSize: number): Promise<MeetingPeoplePage> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}meetingPeople/${topicId}`, `pageNo=${pageNo}&pageSize=${pageSize}`)
            .toPromise()
            .then(page => page)
    }
}