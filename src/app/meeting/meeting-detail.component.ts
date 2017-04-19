import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// primeng
import { Message } from 'primeng/primeng'

// storage
import { SessionStorage } from 'ng2-webstorage';

import { User } from '../service/user'
import { MeetingPeople } from '../service/meeting_people'
import { MeetingModel } from '../service/meeting_model'
import { Meeting } from '../service/meeting'
import { MeetingRoom } from '../service/meeting_room'
import { MeetingType } from '../service/meeting_type'
import { MeetingTopic } from '../service/meeting_topic'
import { MeetingTopicModel } from '../service/meeting_topic_model'
import { MeetingPeoplePage } from '../service/meeting_people_page'
import { MeetingMaterialPage } from '../service/meeting_material_page'
import { MeetingService } from '../service/meeting.service'
import { MeetingMaterialService } from '../service/meeting_material.service'
import { MeetingPeopleService } from '../service/meeting_people.service'
import { UserService } from '../service/user.service'

import { BaseUrl } from '../service/url'

@Component({
    moduleId: module.id,
    selector: 'meeting-detail',
    templateUrl: 'meeting-detail.component.html',
})
export class MeetingDetailComponent implements OnInit {

    @SessionStorage() private currUser: User
    private meetingModel: MeetingModel
    private meeting: Meeting
    private newMeeting: Meeting
    private meetingRooms: MeetingRoom[]
    private meetingTypes: MeetingType[]

    private meetingTopics: MeetingTopic[]

    private uploadedFiles: any[] = []
    private uploaded: Boolean = false
    private currMeetingId: number = 0
    private currTopicId: number = 0
    private oneClick: boolean = false
    private filesUrl = BaseUrl.getBaseUrl() + 'file/more/'
    private finalFilesUrl = ''
    private fileUrl = BaseUrl.getBaseUrl() + 'file/'
    private finalFileUrl = ''
    private edited: Boolean = false

    constructor(
        private route: ActivatedRoute,
        private meetingService: MeetingService,
        private meetingMaterialService: MeetingMaterialService,
        private meetingPeopleService: MeetingPeopleService,
        private location: Location,
        private userService: UserService) {
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
                this.meetingTopics = meetingModel.meetingTopics
            })
    }

    /**
     * 启动和禁用编辑
     */
    enableEdit() {
        this.edited = !this.edited
    }

    private msgs: Message[] = [];
    /**
     * 保存编辑
     */
    update() {
        this.meetingService.update(this.newMeeting)
            .then(b => {
                this.msgs.push({ severity: 'success', summary: '更新会议', detail: '恭喜！会议信息更新成功' })
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
     * 上传材料:当文件上传完成 回调
     */
    upload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        // 刷新 材料列表
        this.refresh()
    }

    /**
     * 刷新列表
     */
    refresh() {
        this.meetingMaterialService.pageTopicMaterial(this.currTopicId, this.currPageNo, this.currPageSize)
            .then(meetingDetarialPage => this.meetingMaterialPageInfo = meetingDetarialPage)
    }



    // private meetingTopicModel: MeetingTopicModel
    private meetingPeoplePageInfo: MeetingPeoplePage = new MeetingPeoplePage()
    private meetingMaterialPageInfo: MeetingMaterialPage = new MeetingMaterialPage()
    /**
     * 选择 议题
     * @param topicId 议题id
     */
    chooseTopic(event) {
        this.currTopicId = this.meetingTopics[event.index].id
        this.finalFilesUrl = this.filesUrl + (this.currMeetingId + '/' + this.currTopicId)
        // 查询并显示 当前议题的信息
        this.meetingService.getMeetingTopicModel(this.currMeetingId, this.currTopicId)
            .then(meetingTopicModel => {
                this.meetingPeoplePageInfo = meetingTopicModel.meetingPeoplePageInfo
                this.meetingMaterialPageInfo = meetingTopicModel.meetingMaterialPageInfo
            })
    }

    private currPageNo = 1
    private currPageSize = 10
    /**
     * 请求换页
     * @param event 换页事件
     */
    paginate(event) {
        this.currPageNo = event.page + 1
        this.currPageSize = event.rows
        this.meetingMaterialService.pageTopicMaterial(this.currTopicId, event.page + 1, event.rows)
            .then(meetingDetarialPage => this.meetingMaterialPageInfo = meetingDetarialPage)
    }

    /**
     * 删除 材料
     */
    deleteMaterial(materialId: number) {
        this.meetingMaterialService.deleteMaterial(materialId)
            .then(b => {
                console.log('delete success')
                this.refresh()
            })
    }

    private peopleCurrPageNo = 1
    private peopleCurrPageSize = 10
    /**
    * 请求换页
    * @param event 换页事件
    */
    paginatePeople(event) {
        this.peopleCurrPageNo = event.page + 1
        this.peopleCurrPageSize = event.rows
        this.meetingPeopleService.pageTopicMeetingPeople(this.currTopicId, event.page + 1, event.rows)
            .then(page => this.meetingPeoplePageInfo = page)
    }

    private showAddPeopleDialog = false
    private sourcePeople: User[] = [] // 可以选择的用户列表 ： 不包含已经选择过的用户，根据 会议所属 group 查询
    private targetPeople: User[] = []
    /**
     * 显示 添加用户的 对话框
     */
    addPeople() {
        // 查询 可以选择的用户列表
        this.userService.currGroupPeople()
            .then(list => {
                this.sourcePeople = list
                this.showAddPeopleDialog = !this.showAddPeopleDialog
            })
    }

    submitAdd() {
        let addedPeople: MeetingPeople[] = []
        this.targetPeople.forEach(it => {
            let mp = new MeetingPeople()
            mp.userId = it.id
            mp.topicId = this.currTopicId
            mp.meetingId = this.currMeetingId
            addedPeople.push(mp)
        })
        this.meetingPeopleService.addPeople(addedPeople)
            .then(b => {
                this.showAddPeopleDialog = false
                this.targetPeople = []
                this.refreshPeople()
            })
            .catch(error => {
                console.log('meeting-daterial..')
                console.log(error)
                this.msgs.push({ severity: 'warn', summary: '更新参会人员列表失败', detail: '抱歉！' + error.message })
            })
    }

    cancelAdd() {
        this.showAddPeopleDialog = false
        this.targetPeople = []
    }

    /**
     * 刷新与会人员 列表
     */
    refreshPeople() {
        this.meetingPeopleService.pageTopicMeetingPeople(this.currTopicId, this.peopleCurrPageNo, this.peopleCurrPageSize)
            .then(page => this.meetingPeoplePageInfo = page)
    }

    /**
     * 设置为主持人
     * @param userId 
     */
    setHost(userId: number) {

    }

    /**
     * 移除此用户
     * @param userId 
     */
    deletePeople(userId: number) {

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