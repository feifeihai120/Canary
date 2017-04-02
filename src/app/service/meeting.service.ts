import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import 'rxjs/add/operator/toPromise'

import { Meeting } from './meeting'
import { MeetingModel } from './meeting_model'
import { MeetingPage } from './meeting_page'
import { MeetingRoom } from './meeting_room'
import { NewMeetingInfo } from './new_meeting_info'

import { BaseUrl } from './url'
import { HttpService } from './http.service'

@Injectable()
export class MeetingService {

    constructor(private httpService: HttpService) { }

    /**
     * 创建一个 会议
     */
    create(meeting: Meeting): Promise<number> {
        // console.log(meeting)
        return this.httpService.post(BaseUrl.getBaseUrl() + 'meeting', meeting)
            .toPromise()
            .then(meetingId => meetingId)
    }

    getPageMeeting(parmas: URLSearchParams): Promise<MeetingPage> {
        return this.httpService.get(BaseUrl.getBaseUrl() + 'meeting', parmas)
            .toPromise()
            .then(meetingPage => meetingPage)
    }

    /**
     * 获取会议室列表，暂时未加条件
     */
    getAllMeetingRoom(): Promise<MeetingRoom[]> {
        console.log('get all meetingRoos...')
        return this.httpService.get(BaseUrl.getBaseUrl() + 'meeting/meetingRooms', null)
            .toPromise()
            .then(meetingRooms => meetingRooms)
    }

    /**
     * 获取创建一个会议需要的所有信息
     */
    getNewMeetingInfo(): Promise<NewMeetingInfo> {
        return this.httpService.get(BaseUrl.getBaseUrl() + 'meeting/newMeetingInfo', null)
            .toPromise()
            .then(newMeetingInfo => newMeetingInfo)
    }

    /**
     * 根据会议id获取会议详细信息
     */
    getMeetingDetail(id: number): Promise<MeetingModel> {
        const url = `${BaseUrl.getBaseUrl()}meeting/detail/${id}`
        return this.httpService.get(url, null)
            .toPromise()
            .then(meetingModel => meetingModel)
    }

}