import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router'

import 'rxjs/add/operator/toPromise'

import { Meeting } from './meeting'
import { MeetingPage } from './meeting_page'
import { MeetingRoom } from './meeting_room'

import { BaseUrl } from './url'

@Injectable()
export class MeetingService {


    constructor(private http: Http, private router: Router) { }

    getPageMeeting(parmas: URLSearchParams): Promise<MeetingPage> {
        console.log('get all meetings...', parmas)
        return this.http.get(BaseUrl.getBaseUrl() + 'meeting', { search: parmas })
            .toPromise()
            // .then((res: Response) => res.json().data as Meeting[])
            .then((res: Response) => res.json())
            .catch(err => this.router.navigate(["/login"]));
        // .catch(this.handleError) 
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

    getAllMeetingRoom(): Promise<MeetingRoom[]> {
        console.log('get all meetingRoos...')
        return this.http.get(BaseUrl.getBaseUrl() + 'meeting/meetingRooms')
            .toPromise()
            // .then((res: Response) => res.json().data as Meeting[])
            .then(function (res) {
                console.log('got meetingRoos...')
                console.log(res)
                console.log(res.json())
                console.log(res.json().data)
                return res.json()
            })
            .catch(this.handleError);
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