import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise'

import { BaseUrl } from './url'
import { User } from './user'
import { LoginUser } from './login_user'

@Injectable()
export class UserService {

    private headers = new Headers({ 'Content-Type': 'application/json' })

    constructor(
        private http: Http
    ) { }

    /**
     * 用户登录
     * @param data user
     */
    login(loginUser: LoginUser): Promise<User> {
        // console.log("login : ", loginUser)
        return this.http.post(BaseUrl.getBaseUrl() + 'users/login', JSON.stringify(loginUser), { headers: this.headers })
            .toPromise()
            .then(res => {
                console.log('res.headers.keys: ' + res.headers.keys());
                console.log('res.headers["Set-Cookie"]: ', res.headers.get('Set-Cookie'))
                console.log('res : ' + res)
                return res.json()
            })
            .catch(this.handleError)
    }

    /**
     * 用户退出 登录
     */
    logout(): Promise<Boolean> {
        return this.http.get(BaseUrl.getBaseUrl() + 'users/logout')
            .toPromise()
            .then(() => true)
            .catch(this.handleError)
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `error.status - error.statusText` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg)
    }
}