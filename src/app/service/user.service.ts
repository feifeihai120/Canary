import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise'

import { BaseUrl } from './url'
import { User } from './user'
import { LoginUser } from './login_user'
import { HttpService } from './http.service'

@Injectable()
export class UserService {

    private headers = new Headers({ 'Content-Type': 'application/json' })

    constructor(
        private httpService: HttpService
    ) { }

    /**
     * 用户登录
     * @param data user
     */
    login(loginUser: LoginUser): Promise<User> {
        return this.httpService.post(BaseUrl.getBaseUrl() + 'users/login', loginUser)
            .toPromise()
            .then(res => res)
    }

    /**
     * 用户退出 登录
     */
    logout(): Promise<Boolean> {
        return this.httpService.post(BaseUrl.getBaseUrl() + 'users/logout', null)
            .toPromise()
            .then(b => b)
    }
}