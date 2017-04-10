import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MeetingModel } from '../service/meeting_model'
import { Meeting } from '../service/meeting'
import { MeetingRoom } from '../service/meeting_room'
import { MeetingType } from '../service/meeting_type'
import { MeetingTopicModel } from '../service/meeting_topic_model'
import { MeetingService } from '../service/meeting.service'

import { BaseUrl } from '../service/url'

@Component({
    moduleId: module.id,
    selector: 'meeting-detail',
    templateUrl: 'meeting-detail.component.html',
})
export class MeetingDetailComponent implements OnInit {

    private meetingModel: MeetingModel
    private meeting: Meeting
    private newMeeting: Meeting
    private meetingRooms: MeetingRoom[]
    private meetingTypes: MeetingType[]

    private meetingTopicModels: MeetingTopicModel[]

    private uploadedFiles: any[] = []
    private uploaded: Boolean = false
    private currMeetingId: number = 0
    private oneClick: boolean = false
    private filesUrl = BaseUrl.getBaseUrl() + 'file/more/'
    private fileUrl = BaseUrl.getBaseUrl() + 'file/'
    private edited: Boolean = false

    constructor(
        private route: ActivatedRoute,
        private meetingService: MeetingService,
        private location: Location) {
        this.meeting = new Meeting()
        this.newMeeting = new Meeting()
    }

    /**
     * ‘+’ 号 将 string 类型的 id 转成 number
     */
    ngOnInit() {
        this.route.params
            .switchMap((parmas: Params) => {
                this.currMeetingId = +parmas['id']
                return this.meetingService.getMeetingDetail(+parmas['id'])
            })
            .subscribe(meetingModel => {
                this.meetingModel = meetingModel
                this.meeting = meetingModel.meeting
                this.newMeeting = this.copy(this.meeting)
                this.meetingRooms = meetingModel.meetingRooms
                this.meetingTypes = meetingModel.meetingTypes
                this.meetingTopicModels = meetingModel.meetingTopicModels
            })
    }

    /**
     * 启动和禁用编辑
     */
    enableEdit() {
        this.edited = !this.edited
    }

    /**
     * 保存编辑
     */
    update() {
        this.meetingService.update(this.newMeeting)
            .then(b => {
                this.edited = !this.edited
                this.meeting = this.copy(this.newMeeting)
            })
    }

    /**
     * 取消编辑
     */
    cancel() {
        this.edited = !this.edited
        this.newMeeting = this.copy(this.meeting)
    }

    /**
     * 选择 议题
     * @param topicId 议题id
     */
    chooseTopic(topicId: number) {
        if (!this.oneClick) {
            this.filesUrl += (this.currMeetingId + '/' + topicId)
            this.oneClick = !this.oneClick
        }
    }

    /**
     * 显示/隐藏材料上传面板
     */
    showOrHideUpload() {
        this.uploaded = !this.uploaded
        this.uploadedFiles = []
    }

    /**
     * 在上传材料之前 设置 XMLHttpRequest 的 withCredentials 为 true
     * 确保 携带 cookie 到服务器
     */
    addHeaders(event) {
        event.xhr.withCredentials = true;
    }

    /**
     * 上传材料
     */
    upload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    /**
     * 刷新列表
     */
    refresh() {

    }


    copy(meeting: Meeting): Meeting {
        let m: Meeting = new Meeting()
        m.id = meeting.id
        m.name = meeting.name
        m.meetingTopics = meeting.meetingTopics
        m.topics = meeting.topics
        m.meetingDesc = meeting.meetingDesc
        m.typeId = meeting.typeId
        m.typeName = meeting.typeName
        m.theme = meeting.theme
        m.roomId = meeting.roomId
        m.roomName = meeting.roomName
        m.managerId = meeting.managerId
        m.managerName = meeting.managerName
        m.status = meeting.status
        m.statusDisplay = meeting.statusDisplay
        m.startTime = meeting.startTime
        m.endTime = meeting.endTime
        m.secret = meeting.secret
        m.secretDispaly = meeting.secretDispaly
        m.opened = meeting.opened
        m.openedDisplay = meeting.openedDisplay
        m.autoSync = meeting.autoSync
        m.autoSyncDispaly = meeting.autoSyncDispaly
        m.vote = meeting.vote
        m.voteDisplay = meeting.voteDisplay
        m.signIn = meeting.signIn
        m.signInDisplay = meeting.signInDisplay
        m.autoDelete = meeting.autoDelete
        m.autoDeleteDisplay = meeting.autoDeleteDisplay
        m.createdAt = meeting.createdAt
        m.updatedAt = meeting.updatedAt
        return m
    }
}