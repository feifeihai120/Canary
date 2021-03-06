import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import 'rxjs/add/operator/toPromise'

import { Meeting } from './meeting'
import { MeetingMaterial } from './meeting_material'
import { MeetingMaterialPage } from './meeting_material_page'


import { BaseUrl } from './url'
import { HttpService } from './http.service'

@Injectable()
export class MeetingMaterialService {

    constructor(private httpService: HttpService) { }

    /**
     * 查询 材料信息
     * @param id 
     */
    getMaterial(id: number): Promise<MeetingMaterial> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}meetingMaterial/single/${id}`, null)
            .toPromise()
            .then(it => it)
    }

    /**
     * 分页获取 会议材料
     * @param meetingId 会议 ID
     * @param topicId 议题 ID
     */
    pageTopicMaterial(topicId: number, pageNo: number, pageSize: number): Promise<MeetingMaterialPage> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}meetingMaterial/${topicId}`, `pageNo=${pageNo}&pageSize=${pageSize}`)
            .toPromise()
            .then(meetingMaterialPage => meetingMaterialPage)
    }

    /**
     * 分页获取 会议材料
     * @param meetingId 会议 ID
     * @param topicId 议题 ID
     */
    pageMaterial(pageNo: number, pageSize: number): Promise<MeetingMaterialPage> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}meetingMaterial`, `pageNo=${pageNo}&pageSize=${pageSize}`)
            .toPromise()
            .then(meetingMaterialPage => meetingMaterialPage)
    }

    /**
     * 获取用户上传的 材料列表
     * @param pageNo 
     * @param pageSize 
     */
    pageUserMaterial(pageNo: number, pageSize: number): Promise<MeetingMaterialPage> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}meetingMaterial/user`, `pageNo=${pageNo}&pageSize=${pageSize}`)
            .toPromise()
            .then(page => page)
    }

    /**
     * 根据材料id 删除 材料
     */
        deleteMaterial(materialId: number): Promise<boolean> {
        return this.httpService.delete(`${BaseUrl.getBaseUrl()}meetingMaterial/${materialId}`)
            .toPromise()
            .then(it => it)
    }

    /**
     * 下载材料
     * @param materialId 
     */
    download(materialId: number) {
        this.httpService.get(`${BaseUrl.getBaseUrl()}file/files/${materialId}`, null)
    }
}