import { Component, OnInit } from '@angular/core';

import { MeetingMaterialService } from '../../service/meeting_material.service'
import { MeetingMaterialPage } from '../../service/meeting_material_page'


@Component({
    moduleId: module.id,
    selector: 'user-material',
    templateUrl: 'user-material.component.html',
})
export class UserMaterialComponent implements OnInit {

    private meetingMaterialPage: MeetingMaterialPage = new MeetingMaterialPage()
    constructor(private meetingMaterialService: MeetingMaterialService) { }

    ngOnInit() {
        this.meetingMaterialService.pageUserMaterial(1, 10)
            .then(page => this.meetingMaterialPage = page)
    }

    paginate(event) {

    }

    lookMaterial(materialId: number) {

    }

    downloadMaterial(materialId: number) {
        console.log(materialId)
        this.meetingMaterialService.download(materialId)
    }

    deleteMaterial(materialId: number) {

    }
}