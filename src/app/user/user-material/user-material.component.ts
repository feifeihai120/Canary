import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { MeetingMaterialService } from '../../service/meeting_material.service'
import { MeetingMaterialPage } from '../../service/meeting_material_page'


@Component({
    moduleId: module.id,
    selector: 'user-material',
    templateUrl: 'user-material.component.html',
})
export class UserMaterialComponent implements OnInit {

    private meetingMaterialPage: MeetingMaterialPage = new MeetingMaterialPage()
    constructor(
        private meetingMaterialService: MeetingMaterialService,
        private router: Router) { }

    ngOnInit() {
        this.meetingMaterialService.pageUserMaterial(1, 10)
            .then(page => this.meetingMaterialPage = page)
    }

    paginate(event) {
        this.meetingMaterialService.pageUserMaterial(event.page + 1, event.rows)
            .then(page => this.meetingMaterialPage = page)
    }

    lookMaterial(materialId: number) {
        console.log(materialId)
        this.router.navigate(['/lookMaterial/material', materialId])
    }

    downloadMaterial(materialId: number) {
        console.log(materialId)
        this.meetingMaterialService.download(materialId)
    }

    deleteMaterial(materialId: number) {
        this.meetingMaterialService.deleteMaterial(materialId)
            .then(b => {
                console.log('delete success')
            })
    }
}