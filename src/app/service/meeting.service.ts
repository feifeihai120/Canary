import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise'

import { Meeting } from './meeting'
import { MeetingPage } from './meeting_page'
import { MeetingRoom } from './meeting_room'

import { BaseUrl } from './url'

/**
* This class provides the Meeting service with methods to read names and add names.
*/
@Injectable()
export class MeetingService {

    /**
    * Creates a new MeetingService with the injected Http.
    * @param {Http} http - The injected Http.
    * @constructor
    */
    constructor(private http: Http) { }
    /**
    * Returns an Observable for the HTTP GET request for the JSON resource.
    * @return {string[]} The Observable for the HTTP request.
    */
    getAllMeetingPage(parmas: URLSearchParams): Promise<MeetingPage> {
        console.log('get all meetings...')
        return this.http.get(BaseUrl.getBaseUrl() + 'meeting', { search: parmas })
            .toPromise()
            // .then((res: Response) => res.json().data as Meeting[])
            .then((res: Response) => res.json().data as MeetingPage)
            .catch(this.handleError);
    }

    /**
     * 获取首页显示的前 10 条记录
     */
    getLimitMeetings(): Promise<Meeting[]> {
        console.log('get limit meetings...')
        let params: URLSearchParams = new URLSearchParams();
        params.set('pageNo', '1');
        params.set('pageSize', '10');
        return this.getAllMeetingPage(params)
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
                return res.json().data as MeetingRoom[]
            })
            .catch(this.handleError);
    }

    /**
    * Handle HTTP error
    */
    private handleError(error: any): Promise<any> {
        let errMsg = (error.message) ? error.message :
            error.status ? `error.status - error.statusText` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg)
    }
}