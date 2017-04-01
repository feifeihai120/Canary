import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router'

import 'rxjs/add/operator/switchMap'

import { MeetingService } from '../service/meeting.service'
import { MeetingModel } from '../service/meeting_model'

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
    private rotate: number = 0.0
    constructor(
        private route: ActivatedRoute,
        private meetingService: MeetingService,
        private router: Router) { }

    ngOnInit() {
        this.route.params
            .switchMap((parmas: Params) => this.meetingService.getMeetingDetail(+parmas['id']))
            .subscribe(meetingModel => {
                this.meetingModel = meetingModel
                console.log(this.meetingModel)
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

    /**
     * 离开会议
     */
    leave() {
        this.router.navigateByUrl('/meeting/meetingList')
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