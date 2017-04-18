import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise'

import { BaseUrl } from './url'
import { User } from './user'
import { LoginUser } from './login_user'
import { RegisterUser } from './model/register_user'
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

    /**
     * 用户注册
     */
    register(registerUser: RegisterUser): Promise<boolean> {
        return this.httpService.post(`${BaseUrl.getBaseUrl()}users/register`, registerUser)
            .toPromise()
            .then(it => it)
    }

    /**
     * 更新用户信息
     * @param user 
     */
    update(user: User): Promise<boolean> {
        return this.httpService.put(`${BaseUrl.getBaseUrl()}users`, user)
            .toPromise()
            .then(it => it)
    }

    /**
     * 校验 密码
     */
    validate(pwd: string): Promise<boolean> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}users/validate`, `password=${pwd}`)
            .toPromise()
            .then(b => b)
    }

    /**
     * 修改密码
     * @param pwd 
     */
    changePwd(pwd: string): Promise<boolean> {
        return this.httpService.post(`${BaseUrl.getBaseUrl()}users/changePwd`, { 'password': pwd })
            .toPromise()
            .then(b => b)
    }
}