import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router, ActivatedRoute, Params } from '@angular/router'

import 'rxjs/add/operator/switchMap'

// primeng
import { Message } from 'primeng/primeng'

import { MeetingMaterial } from '../service/meeting_material'
import { MeetingMaterialService } from '../service/meeting_material.service'

@Component({
    moduleId: module.id,
    selector: 'look-material',
    templateUrl: 'look-material.component.html',
})
export class LookMaterialComponent implements OnInit {

    private pdfSrc: string = 'http://localhost:9009/api/file/files/HDKQHrP8qZvMb315uZk3_1492570601915.pdf'
    private page: number = 1
    private scale: number = 1.5
    private zoom: number = 1.5
    private rotate: number = 0.0

    private meetingMaterial: MeetingMaterial = new MeetingMaterial()
    constructor(
        private route: ActivatedRoute,
        private meetingMaterialService: MeetingMaterialService,
        private location: Location) { }

    ngOnInit() {
        this.route.params
            .switchMap((parmas: Params) => this.meetingMaterialService.getMaterial(+parmas['id']))
            .subscribe(material => {
                console.log(material)
                this.meetingMaterial = material
            })
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
        }
    }

    private lastPage() {
        if (this.page <= 1) {
            this.msgs.push({ severity: 'warn', summary: '', detail: '已经到第一页了' })
        } else {
            this.page -= 1
        }
    }

    leave() {
        this.location.back()
    }
}