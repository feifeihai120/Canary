import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router'

import 'rxjs/add/operator/switchMap'

import { Message } from 'primeng/primeng'

import { StompService } from 'ng2-stomp-service';

import { MeetingService } from '../service/meeting.service'
import { MeetingModel } from '../service/meeting_model'
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

    private meetingModel: MeetingModel

    private pdfSrc: string = 'http://localhost:9009/api/file/files/pdf-test.pdf'
    private page: number = 1
    private scale: number = 1.0
    private zoom: number = 1.0;
    private rotate: number = 0.0

    private subscription: any;
    private wsConf = {
        host: 'http://localhost:9009/meeting-ws',
        debug: true
    }
    constructor(
        private route: ActivatedRoute,
        private meetingService: MeetingService,
        private router: Router,
        private stomp: StompService) { }

    ngOnInit() {
        this.route.params
            .switchMap((parmas: Params) => this.meetingService.getMeetingDetail(+parmas['id']))
            .subscribe(meetingModel => {
                this.meetingModel = meetingModel
                // console.log(this.meetingModel)

                this.stomp.configure(this.wsConf);
                this.stomp.startConnect().then(() => {
                    console.log('connected');
                    // 订阅当前 议题 的 材料同步 /meeting/next-page/meetingId/topicId/materialId
                    this.subscription = this.stomp.subscribe(`/meeting/next-page/${this.meetingModel.meeting.id}/1/1`, this.response)
                });

            })
    }

    private pageNotice: PageNotice
    //Response
    public response = (page) => {
        if (this.async) {
            console.log("收到的----")
            console.log(page)
            this.pageNotice = page
            console.log("curr page should be: " + this.pageNotice.page)
            this.page = this.pageNotice.page
        }
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

    private currMaterialId: number
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

            this.stomp.send('/app/meeting.change-page',
                JSON.stringify(
                    {
                        'meetingId': this.meetingModel.meeting.id,
                        'topicId': 1,
                        'materialId': 1,
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

            this.stomp.send('/app/meeting.change-page',
                JSON.stringify(
                    {
                        'meetingId': this.meetingModel.meeting.id,
                        'topicId': 1,
                        'materialId': 1,
                        'page': this.page
                    }
                ));
        }
    }

    /**
     * 离开会议
     */
    leave() {
        this.router.navigateByUrl('/meeting/meetingList')
        this.subscription.unsubscribe()
        this.stomp.disconnect().then(() => {
            console.log('Connection closed')
        })
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
    changeMaterial() {
        // 关闭当前同步材料订阅并打开新的材料订阅
    }

    /**
     * 切换议题， 议题切换后，当前议题的状态即置为 已结束
     */
    changeTopic() {
        // 1. 提示是否切换

        // 2. 切换：发送切换议题的请求 --> 关闭当前同步订阅并打开新的订阅
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