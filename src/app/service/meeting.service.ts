import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router'

import 'rxjs/add/operator/toPromise'

import { Meeting } from './meeting'
import { MeetingModel } from './meeting_model'
import { MeetingPage } from './meeting_page'
import { MeetingRoom } from './meeting_room'
import { NewMeetingInfo } from './new_meeting_info'

import { BaseUrl } from './url'

@Injectable()
export class MeetingService {

    private headers: Headers = new Headers({ 'Content-Type': 'application/json' })

    constructor(private http: Http, private router: Router) { }

    /**
     * 创建一个 会议
     */
    create(meeting: Meeting): Promise<number> {
        // console.log(meeting)
        return this.http.post(BaseUrl.getBaseUrl() + 'meeting', JSON.stringify(meeting), { headers: this.headers })
            .toPromise()
            .then((res: Response) => res.json())
            .catch(this.handleError)
    }

    getPageMeeting(parmas: URLSearchParams): Promise<MeetingPage> {
        return this.http.get(BaseUrl.getBaseUrl() + 'meeting', { search: parmas })
            .toPromise()
            .then((res: Response) => res.json())
            .catch(this.handleError)
    }

    /**
     * 获取首页显示的前 10 条记录
     */
    getLimitMeetings(): Promise<Meeting[]> {
        console.log('get limit meetings...')
        let params: URLSearchParams = new URLSearchParams();
        params.set('pageNo', '1');
        params.set('pageSize', '10');
        return this.getPageMeeting(params)
            .then(meetingPage => meetingPage.list)
    }

    /**
     * 获取会议室列表，暂时未加条件
     */
    getAllMeetingRoom(): Promise<MeetingRoom[]> {
        console.log('get all meetingRoos...')
        return this.http.get(BaseUrl.getBaseUrl() + 'meeting/meetingRooms')
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    /**
     * 获取创建一个会议需要的所有信息
     */
    getNewMeetingInfo(): Promise<NewMeetingInfo> {
        return this.http.get(BaseUrl.getBaseUrl() + 'meeting/newMeetingInfo')
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    /**
     * 根据会议id获取会议详细信息
     */
    getMeetingDetail(id: number): Promise<Meeting> {
        const url = `${BaseUrl.getBaseUrl()}meeting/detail/${id}`
        return this.http.get(url)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    /**
     * Handle HTTP error
    */
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `error.status - error.statusText` : 'Server error';
        console.log("status: ", error.status)
        console.log("message: ", error.message)
        console.error('errMsg', errMsg); // log to console instead
        this.router.navigate(["/login"])
        // return Promise.reject(errMsg)
    }
}