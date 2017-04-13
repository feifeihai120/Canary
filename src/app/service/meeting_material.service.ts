import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import 'rxjs/add/operator/toPromise'

import { Meeting } from './meeting'
import { MeetingMaterialPage } from './meeting_material_page'


import { BaseUrl } from './url'
import { HttpService } from './http.service'

@Injectable()
export class MeetingMaterialService {

    constructor(private httpService: HttpService) { }

    /**
     * 分页获取 会议材料
     * @param meetingId 会议 ID
     * @param topicId 议题 ID
     */
    pageMaterial(topicId: number, pageNo: number, pageSize: number): Promise<MeetingMaterialPage> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}meetingMaterial/${topicId}`, `pageNo=${pageNo}&&pageSize=${pageSize}`)
            .toPromise()
            .then(meetingMaterialPage => meetingMaterialPage)
    }

    /**
     * 根据材料id 删除 材料
     */
    deleteMaterial(materialId: number): Promise<boolean> {
        return this.httpService.delete(`${BaseUrl.getBaseUrl()}meetingMaterial/${materialId}`)
        .toPromise()
        .then(it => it)
    }

}