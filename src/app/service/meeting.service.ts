import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import 'rxjs/add/operator/toPromise'

import { Meeting } from './meeting'
import { MeetingModel } from './meeting_model'
import { MeetingTopicModel } from './meeting_topic_model'
import { MeetingPage } from './meeting_page'
import { MeetingRoom } from './meeting_room'
import { NewMeetingInfo } from './new_meeting_info'
import { MeetingSimpleModel } from './meeting_simple_model'

import { BaseUrl } from './url'
import { HttpService } from './http.service'

@Injectable()
export class MeetingService {

    constructor(private httpService: HttpService) { }

    /**
     * 创建一个 会议
     */
    create(meeting: Meeting): Promise<number> {
        // console.log(meeting)
        return this.httpService.post(BaseUrl.getBaseUrl() + 'meeting', meeting)
            .toPromise()
            .then(meetingId => meetingId)
    }

    /**
     * 获取会议分页数据
     * @param parmas 查询条件
     */
    getPageMeeting(pageNo: number, pageSize: number): Promise<MeetingPage> {
        return this.httpService.get(BaseUrl.getBaseUrl() + 'meeting', `pageNo=${pageNo}&pageSize=${pageSize}`)
            .toPromise()
            .then(meetingPage => meetingPage)
    }

    /**
     * 获取会议议题 数据
     */
    getMeetingTopicModel(meetingId: number, topicId: number): Promise<MeetingTopicModel> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}/meeting/meetingTopic/${topicId}`, null)
            .toPromise()
            .then(meetingTopicModel => meetingTopicModel)
    }

    /**
     * 获取会议室列表，暂时未加条件
     */
    getAllMeetingRoom(): Promise<MeetingRoom[]> {
        console.log('get all meetingRoos...')
        return this.httpService.get(BaseUrl.getBaseUrl() + 'meeting/meetingRooms', null)
            .toPromise()
            .then(meetingRooms => meetingRooms)
    }

    /**
     * 获取创建一个会议需要的所有信息
     */
    getNewMeetingInfo(): Promise<NewMeetingInfo> {
        return this.httpService.get(BaseUrl.getBaseUrl() + 'meeting/newMeetingInfo', null)
            .toPromise()
            .then(newMeetingInfo => newMeetingInfo)
    }

    /**
     * 根据会议id获取会议详细信息
     */
    getMeetingDetail(id: number): Promise<MeetingModel> {
        const url = `${BaseUrl.getBaseUrl()}meeting/detail/${id}`
        return this.httpService.get(url, null)
            .toPromise()
            .then(meetingModel => meetingModel)
    }

    /**
     * 根据会议id 获取本场会议的 开会信息
     */
    getMeetingSimpleModel(meetingId: number): Promise<MeetingSimpleModel> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}run-meeting/${meetingId}`, null)
            .toPromise()
            .then(meetingSimpleModel => meetingSimpleModel)
    }

    /**
     * 根据 议题Id 获取 参会人员列表和 议题材料列表
     * @param topicId 
     */
    getMeetingTopicSimpleModel(topicId: number): Promise<MeetingSimpleModel> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}run-meeting/simple/${topicId}`, null)
            .toPromise()
            .then(model => model)
    }

    /**
     * 主持人切换 议题时 ，参会人员接收到 通知后，通过此方法 向后台 发送一个 进入 议题的请求，以便记录 当前议题的参会人员 列表
     * @param meetingId 
     * @param topicId 
     */
    enterTopic(meetingId: number, topicId: number): Promise<boolean> {
        return this.httpService.get(`${BaseUrl.getBaseUrl()}run-meeting/enterTopic/${meetingId}/${topicId}`, null)
            .toPromise()
            .then(it => it)
    }

    /**
     * 更新一个会议
     */
    update(meeting: Meeting): Promise<Boolean> {
        return this.httpService.put(BaseUrl.getBaseUrl() + 'meeting', meeting)
            .toPromise()
            .then(it => it)
    }

    /**
     * 会议管理员 开启会议
     * 
     * @param meetingId 会议
     */
    openMeeting(meetingId: number): Promise<boolean> {
        return this.httpService.put(`${BaseUrl.getBaseUrl()}run-meeting/open/${meetingId}`, null)
            .toPromise()
            .then(it => it)
    }

    /**
     * 会议管理员 关闭会议
     */
    closeMeeting(meetingId: number): Promise<boolean> {
        return this.httpService.put(`${BaseUrl.getBaseUrl()}meeting/run-meeting/${meetingId}`, null)
            .toPromise()
            .then(it => it)
    }

    /**
     * 会议管理员 结束会议
     * @param meetingId 会议
     */
    finishMeeting(meetingId: number): Promise<boolean> {
        return this.httpService.put(`${BaseUrl.getBaseUrl()}run-meeting/finish/${meetingId}`, null)
            .toPromise()
            .then(it => it)
    }

    /**
     * 参加一个会议
     */
    joinMeeting(meetingId: number): Promise<boolean> {
        return this.httpService.put(`${BaseUrl.getBaseUrl()}meeting/join/${meetingId}`, null)
            .toPromise()
            .then(it => it)
    }

    /**
     * 删除一个会议
     */
    deleteMeeting(meetingId: number): Promise<boolean> {
        return this.httpService.delete(`${BaseUrl.getBaseUrl()}meeting/${meetingId}`)
            .toPromise()
            .then(it => it)
    }

    /**
     * 用户离开会议
     * @param meetingId 会议
     * @param topicId 
     */
    leaveMeeting(meetingId: number, topicId: number): Promise<boolean> {
        return this.httpService.put(`${BaseUrl.getBaseUrl()}run-meeting/leave/${meetingId}/${topicId}`, null)
            .toPromise()
            .then(it => it)
    }

}