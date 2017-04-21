import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router'

import 'rxjs/add/operator/switchMap'

// storage
import { SessionStorage } from 'ng2-webstorage';

// primeng
import { Message } from 'primeng/primeng'

// stomp websocket
import { StompService } from 'ng2-stomp-service';

import { User } from '../service/user'
import { MeetingService } from '../service/meeting.service'
import { MeetingSimpleModel } from '../service/meeting_simple_model'
import { MeetingMaterial } from '../service/meeting_material'
import { MeetingTopic } from '../service/meeting_topic'
import { PageNotice } from '../service/page_notice'

@Component({
    moduleId: module.id,
    selector: 'pdf',
    templateUrl: 'pdf.component.html',
})
export class PdfComponent implements OnInit {

    public disabled: boolean = false;
    public status: { isopen: boolean } = { isopen: false };

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    @SessionStorage() private currUser: User
    private meetingSimpleModel: MeetingSimpleModel = new MeetingSimpleModel()
    private currMaterial = new MeetingMaterial()
    private currTopic = new MeetingTopic()
    // private pdfSrc: string = 'http://localhost:9009/api/file/files/AeQfSQ7jIqXvxfhT29IE_1492585664680.pdf'
    private page: number = 1
    private scale: number = 1.0
    private zoom: number = 1.0;
    private rotate: number = 0.0

    // 订阅 材料同步 通知
    private subMaterialAsync: any
    private subMeetingParticipants: any // 订阅 参会人员 列表 通知
    private subMeetingPeopleEnter: any // 订阅 参会人员 入会 通知
    private subMeetingPeopleLeave: any // 订阅 参会人员 离会 通知
    private subChangeMaterial: any // 订阅 材料改变 通知
    private subChangeTopic: any // 订阅 切换议题 通知
    private wsConf = {
        host: 'http://localhost:9009/meeting-ws',
        debug: true
    }
    constructor(
        private route: ActivatedRoute,
        private meetingService: MeetingService,
        private router: Router,
        private stomp: StompService, ) { }

    ngOnInit() {
        this.route.params
            .switchMap((parmas: Params) => this.meetingService.getMeetingSimpleModel(+parmas['id']))
            .subscribe(meetingSimpleModel => {
                this.meetingSimpleModel = meetingSimpleModel
                this.currMaterial = this.meetingSimpleModel.meetingMaterials[0]
                this.currTopic.id = this.meetingSimpleModel.topicId
                this.currTopic.name = this.meetingSimpleModel.topicName
                console.log(this.meetingSimpleModel)

                this.stomp.configure(this.wsConf);
                this.stomp.startConnect().then(() => {
                    console.log('connected');
                    // 订阅当前 议题 的 材料同步 /meeting/next-page/meetingId/topicId/materialId
                    this.subMaterialAsync = this.stomp.subscribe(
                        `/meeting/next-page/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}/${this.currMaterial.id}`,
                        this.nextPageResponse
                    )
                    // 订阅当前 会议的 参会人员列表 /meeting/meeting.participants/meetingId/topicId
                    this.subMeetingParticipants = this.stomp.subscribe(
                        `/meeting/meeting.participants/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}`,
                        this.participantResponse
                    )
                    // 订阅 参会人员 加入会议 /meeting/enter/meetingId/topicId
                    this.subMeetingPeopleEnter = this.stomp.subscribe(
                        `/meeting/join/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}`,
                        this.joinResponse
                    )
                    // 订阅 参会人员 中途离会 /meeting/leave/meetingId/topicId
                    this.subMeetingPeopleLeave = this.stomp.subscribe(
                        `/meeting/leave/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}`,
                        this.leaveResponse
                    )
                    // 订阅 材料切换 通知  /meeting/meeting.material/meetingId/topicId
                    this.subChangeMaterial = this.stomp.subscribe(
                        `/meeting/meeting.material/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}`,
                        this.changeMaterialResponse
                    )
                    // 订阅 议题切换 通知 /meeting/meeting.topic/meetingId/topicId
                    this.subChangeTopic = this.stomp.subscribe(
                        `/meeting/meeting.topic/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}`,
                        this.changeTopicResponse
                    )
                    // 请求 参会人员 到场 列表
                    this.stomp.send('/app/meeting.participants',
                        JSON.stringify(
                            {
                                'meetingId': this.meetingSimpleModel.meeting.id,
                                'topicId': this.currTopic.id,
                                'userId': this.currUser.id,
                            }
                        ))
                });
            })
    }

    // 处理 换页通知
    public nextPageResponse = (page) => {
        if (this.async) {
            this.page = page.page
        }
    }

    private onlines: number[] = []
    // 处理 参会人员 列表 通知
    public participantResponse = (participants) => {
        console.log(participants)
        this.onlines = participants
    }

    // 处理 参会人员 加入会议 通知
    public joinResponse = (user) => {
        console.log(user)
        this.meetingSimpleModel.users.push(user)
    }

    // 处理 参会人员 中途 离会 通知
    public leaveResponse = (leave) => {
        console.log(leave)
        this.onlines = this.onlines.filter(id => id !== leave.userId)
    }

    // 处理 主持人 切换材料 通知
    public changeMaterialResponse = (changeMaterial) => {
        if (this.currUser.id !== this.meetingSimpleModel.meeting.managerId) {
            console.log(changeMaterial)
            this.currMaterial = this.meetingSimpleModel.meetingMaterials.find(it => it.id === changeMaterial.materialId)
            this.page = 1
            // 参会人员 要切换 订阅 频道 到 当前 材料的 通知频道
            // 关闭当前同步材料订阅并打开新的材料订阅
            this.subMaterialAsync.unsubscribe()
            // 订阅当前 议题 的 材料同步 /meeting/next-page/meetingId/topicId/materialId
            this.subMaterialAsync = this.stomp.subscribe(
                `/meeting/next-page/${this.meetingSimpleModel.meeting.id}/${this.meetingSimpleModel.topicId}/${this.currMaterial.id}`,
                this.nextPageResponse
            )
        }
    }

    // 处理 主持人 切换议题 通知
    public changeTopicResponse = (changeTopic) => {
        if (this.currUser.id !== this.meetingSimpleModel.meeting.managerId) {
            console.log(changeTopic)
            // 切换：发送切换议题的请求 --> 关闭当前同步订阅并打开新的订阅
            // 切换 议题
            this.currTopic = this.meetingSimpleModel.topics.find(it => it.id === changeTopic.topicId)
            this.meetingSimpleModel.topicId = this.currTopic.id
            this.meetingSimpleModel.topicName = this.currTopic.name
            this.currMaterial = this.meetingSimpleModel.meetingMaterials[0]
            this.page = 1
            // 初始化 新议题 的相关信息：参会人员列表、议题材料列表
            this.meetingService.getMeetingTopicSimpleModel(this.currTopic.id)
                .then(model => {
                    this.meetingSimpleModel.users = model.users
                    this.meetingSimpleModel.meetingMaterials = model.meetingMaterials
                    this.currMaterial = this.meetingSimpleModel.meetingMaterials[0]
                    this.page = 1
                    // 关闭 当前 的订阅频道
                    this.subMaterialAsync.unsubscribe()
                    // 订阅当前 议题 的 材料同步 /meeting/next-page/meetingId/topicId/materialId
                    this.subMaterialAsync = this.stomp.subscribe(
                        `/meeting/next-page/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}/${this.currMaterial.id}`,
                        this.nextPageResponse
                    )
                })
            // 用户进入 议题
            // 然后重新 初始化 新议题下的 通知订阅
            this.meetingService.enterTopic(this.meetingSimpleModel.meeting.id, this.currTopic.id)
                .then(b => {
                    this.reInitSubEvent()
                    // 请求 参会人员 到场 列表
                    this.stomp.send('/app/meeting.participants',
                        JSON.stringify(
                            {
                                'meetingId': this.meetingSimpleModel.meeting.id,
                                'topicId': this.currTopic.id,
                                'userId': this.currUser.id,
                            }
                        ))

                })
        }
    }

    public isOnline(userId: number): boolean {
        return this.onlines.includes(userId)
    }

    private pdf: PDFDocumentProxy
    private pdfViewPort: PDFPageViewport
    private width: number
    private height: number
    afterLoadComplete(pdf: PDFDocumentProxy) {
        this.pdf = pdf
        pdf.getPage(this.page)
            .then(page => this.pdfViewPort = page.getViewport(this.scale, this.rotate))
        console.log(pdf)
    }

    private msgs: Message[] = [];

    // 是否开启 材料同步
    private async: boolean = true

    /**
     * 根据鼠标点击事件 翻页
     */
    next($event: MouseEvent) {
        console.log($event)
        console.log(this.pdfViewPort)
        if ($event.layerX < this.pdfViewPort.width / 2) {
            this.lastPage()
        } else {
            this.nextPage()
        }
    }

    private nextPage() {
        if (this.pdf.numPages <= this.page) {
            this.msgs.push({ severity: 'warn', summary: '', detail: '已经到最后一页了' })
        } else {
            this.page += 1
            // 发送换页 通知
            this.stomp.send('/app/meeting.change-page',
                JSON.stringify(
                    {
                        'meetingId': this.meetingSimpleModel.meeting.id,
                        'topicId': this.currTopic.id,
                        'materialId': this.currMaterial.id,
                        'page': this.page
                    }
                ));
        }
    }

    private lastPage() {
        if (this.page <= 1) {
            this.msgs.push({ severity: 'warn', summary: '', detail: '已经到第一页了' })
        } else {
            this.page -= 1
            // 发送换页 通知
            this.stomp.send('/app/meeting.change-page',
                JSON.stringify(
                    {
                        'meetingId': this.meetingSimpleModel.meeting.id,
                        'topicId': this.currTopic.id,
                        'materialId': this.currMaterial.id,
                        'page': this.page
                    }
                ));
        }
    }

    /**
     * 离开会议
     */
    leave() {
        this.meetingService.leaveMeeting(this.meetingSimpleModel.meeting.id, this.meetingSimpleModel.topicId)
            .then(b => this.unSubscribe())
    }

    /**
     * 会议管理员 结束会议
     */
    finish() {
        this.meetingService.finishMeeting(this.meetingSimpleModel.meeting.id)
            .then(b => this.unSubscribe())
    }

    /**
     * 会议管理员 关闭会议
     */
    close() {
        this.meetingService.closeMeeting(this.meetingSimpleModel.meeting.id)
            .then(b => b)
    }

    /**
     * 材料同步 开关
     */
    asyncMaterial() {
        this.async = !this.async
        if (this.async) {
            // 这里应该自动同步到 主持人 的状态
            // 主持人正在讲的 材料
            // 主持人正在讲的 材料的 当前页

        }
    }

    /**
     * 切换材料
     */
    changeMaterial(materialId: number) {
        if (this.currMaterial.id !== materialId) {
            // 切换 材料
            this.currMaterial = this.meetingSimpleModel.meetingMaterials.find(it => it.id === materialId)
            // 关闭当前同步材料订阅并打开新的材料订阅
            this.subMaterialAsync.unsubscribe()
            // 订阅当前 议题 的 材料同步 /meeting/next-page/meetingId/topicId/materialId
            this.subMaterialAsync = this.stomp.subscribe(
                `/meeting/next-page/${this.meetingSimpleModel.meeting.id}/${this.meetingSimpleModel.topicId}/${this.currMaterial.id}`,
                this.nextPageResponse
            )
            // 发送 切换材料 通知
            this.stomp.send(
                `/app/meeting.change-material`,
                JSON.stringify({
                    'meetingId': this.meetingSimpleModel.meeting.id,
                    'topicId': this.currTopic.id,
                    'materialId': this.currMaterial.id
                })
            )
            this.page = 1
        }
    }

    /**
     * 切换议题， 议题切换后，当前议题的状态即置为 已结束
     */
    changeTopic(topicId: number) {
        let lastTopicId = this.currTopic.id
        if (this.currTopic.id !== topicId) {
            // 1. 提示是否切换

            // 2. 切换：发送切换议题的请求 --> 关闭当前同步订阅并打开新的订阅
            // 切换 议题
            this.currTopic = this.meetingSimpleModel.topics.find(it => it.id === topicId)
            this.meetingSimpleModel.topicId = this.currTopic.id
            this.meetingSimpleModel.topicName = this.currTopic.name
            // 初始化 新议题的 信息：参会人员列表、议题材料列表
            this.meetingService.getMeetingTopicSimpleModel(this.currTopic.id)
                .then(model => {
                    this.meetingSimpleModel.users = model.users
                    this.meetingSimpleModel.meetingMaterials = model.meetingMaterials
                    this.currMaterial = this.meetingSimpleModel.meetingMaterials[0]
                    this.page = 1
                    // 关闭 当前 的订阅频道
                    this.subMaterialAsync.unsubscribe()
                    // 订阅当前 议题 的 材料同步 /meeting/next-page/meetingId/topicId/materialId
                    this.subMaterialAsync = this.stomp.subscribe(
                        `/meeting/next-page/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}/${this.currMaterial.id}`,
                        this.nextPageResponse
                    )
                    // 发送 切换 议题的 通知
                    this.stomp.send(
                        `/app/meeting.change-topic`,
                        JSON.stringify({
                            'meetingId': this.meetingSimpleModel.meeting.id,
                            'lastTopicId': lastTopicId,
                            'topicId': this.currTopic.id,
                            'userId': this.currUser.id
                        })
                    )
                })
            // 主持人 进入 议题
            this.meetingService.enterTopic(this.meetingSimpleModel.meeting.id, this.currTopic.id)
                .then(b => {
                    this.reInitSubEvent()
                    // 请求 参会人员 到场 列表
                    this.stomp.send('/app/meeting.participants',
                        JSON.stringify(
                            {
                                'meetingId': this.meetingSimpleModel.meeting.id,
                                'topicId': this.currTopic.id,
                                'userId': this.currUser.id,
                            }
                        ))
                })
        }
    }

    private reInitSubEvent() {
        this.subMeetingParticipants.unsubscribe()
        // 订阅当前 会议的 参会人员列表 /meeting/meeting.participants/meetingId/topicId
        this.subMeetingParticipants = this.stomp.subscribe(
            `/meeting/meeting.participants/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}`,
            this.participantResponse
        )
        this.subMeetingPeopleEnter.unsubscribe()
        // 订阅 参会人员 加入会议 /meeting/enter/meetingId/topicId
        this.subMeetingPeopleEnter = this.stomp.subscribe(
            `/meeting/join/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}`,
            this.joinResponse
        )
        this.subMeetingPeopleLeave.unsubscribe()
        // 订阅 参会人员 中途离会 /meeting/leave/meetingId/topicId
        this.subMeetingPeopleLeave = this.stomp.subscribe(
            `/meeting/leave/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}`,
            this.leaveResponse
        )
        this.subChangeMaterial.unsubscribe()
        // 订阅 材料切换 通知  /meeting/meeting.material/meetingId/topicId
        this.subChangeMaterial = this.stomp.subscribe(
            `/meeting/meeting.material/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}`,
            this.changeMaterialResponse
        )
        this.subChangeTopic.unsubscribe()
        // 订阅 议题切换 通知 /meeting/meeting.topic/meetingId/topicId
        this.subChangeTopic = this.stomp.subscribe(
            `/meeting/meeting.topic/${this.meetingSimpleModel.meeting.id}/${this.currTopic.id}`,
            this.changeTopicResponse
        )
    }

    private unSubscribe() {
        this.subMaterialAsync.unsubscribe()
        this.subMeetingParticipants.unsubscribe()
        this.subMeetingPeopleEnter.unsubscribe()
        this.subMeetingPeopleLeave.unsubscribe()
        this.subChangeMaterial.unsubscribe()
        this.subChangeTopic.unsubscribe()
        this.stomp.disconnect().then(() => {
            console.log('Connection closed')
            this.router.navigateByUrl('/meeting/meetingList')
        })
    }








    // private client: string
    // private screen: string
    // private layer: string
    // private offset: string
    // private pageXY: string
    // private movement: string
    // private xy: string
    // showCase($event) {
    //     console.log($event)
    //     this.width = this.pdfViewPort.width
    //     this.height = this.pdfViewPort.height
    //     console.log(this.width)
    //     console.log(this.height)
    //     this.client = 'client:(x, y): (' + $event.clientX + ',' + $event.clientY + ')'
    //     this.screen = 'screen:(x, y): (' + $event.screenX + ',' + $event.screenY + ')'
    //     this.layer = 'layer:(x, y): (' + $event.layerX + ',' + $event.layerY + ')'
    //     this.offset = 'offset:(x, y): (' + $event.offsetX + ',' + $event.offsetY + ')'
    //     this.pageXY = 'page:(x, y): (' + $event.pageX + ',' + $event.pageY + ')'
    //     this.movement = 'movement:(x, y): (' + $event.movementX + ',' + $event.movementY + ')'
    //     this.xy = 'xy:(x, y): (' + $event.x + ',' + $event.y + ')'
    // }
}