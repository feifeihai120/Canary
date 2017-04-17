import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise'

import { BaseUrl } from './url'
import { HttpService } from './http.service'

import { Group } from './model/group'
import { GroupPage } from './model/group_page'

@Injectable()
export class GroupService {

    constructor(private httpService: HttpService) { }

    public pageOrgGroup(orgId: number, pageNo: number, pageSize: number): Promise<GroupPage> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}groups/${orgId}`, `pageNo=${pageNo}&pageSize=${pageSize}`)
            .toPromise()
            .then(page => page)
            .catch(this.handleError)
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `error.status - error.statusText` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}