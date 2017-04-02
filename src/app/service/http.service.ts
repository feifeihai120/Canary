import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class HttpService {

    private headers = new Headers({ 'Content-Type': 'application/json' })

    constructor(private http: Http) { }

    /**
     * 利用 http 发送 GET request
     * @param url 请求地址
     * @param parmas 查询参数
     */
    get(url: string, parmas: any): Observable<any> {
        return this.http.get(url, { search: parmas, headers: this.headers, withCredentials: true })
            .map((res: Response) => res.json())
            .do(data => console.log('server data:', data))  // debug
            .catch(this.handleError);
    }

    /**
     * 利用 http 发送 POST request
     * @param url 请求地址
     * @param parmas 数据实体
     */
    post(url: string, parmas: any): Observable<any> {
        return this.http.post(url, JSON.stringify(parmas), { headers: this.headers, withCredentials: true })
            .map(res => res.json())
            .do(data => console.log('server data:', data))  // debug
            .catch(this.handleError);
    }

    /**
     * 利用 http 发送 PUT request
     * @param url 请求地址
     * @param parmas 数据实体
     */
    put(url: string, parmas: any): Observable<any> {
        return this.http.put(url, JSON.stringify(parmas), { headers: this.headers, withCredentials: true })
            .map(res => res.json())
            .do(data => console.log('server data:', data))  // debug
            .catch(this.handleError);
    }

    /**
     * 利用 http 发送 DELETE request
     * @param url 请求地址
     */
    delete(url: string): Observable<any> {
        return this.http.delete(url, { headers: this.headers, withCredentials: true })
            .map(res => res.json())
            .do(data => console.log('server data:', data))  // debug
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `error.status - error.statusText` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}