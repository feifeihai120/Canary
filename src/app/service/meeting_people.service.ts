import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise'

import { BaseUrl } from './url'
import { HttpService } from './http.service'
import { MeetingPeoplePage } from './meeting_people_page'
import { MeetingPeople } from './meeting_people'

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

    /**
     * 添加 参会人员
     * @param people 
     */
    public addPeople(people: MeetingPeople[]): Promise<boolean> {
        return this.httpService.post(`${BaseUrl.getBaseUrl()}meetingPeople/add`, people)
            .toPromise()
            .then(it => it)
    }
}