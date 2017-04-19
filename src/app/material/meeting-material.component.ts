import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { MeetingMaterialPage } from '../service/meeting_material_page'
import { MeetingMaterialService } from '../service/meeting_material.service'

@Component({
    moduleId: module.id,
    selector: 'meeting-material',
    templateUrl: 'meeting-material.component.html',
})
export class MeetingMaterialComponent implements OnInit {

    private meetingMaterialPage: MeetingMaterialPage = new MeetingMaterialPage()
    constructor(private meetingMaterialService: MeetingMaterialService,
        private router: Router) { }

    ngOnInit() {
        this.meetingMaterialService.pageMaterial(1, 10)
            .then(page => this.meetingMaterialPage = page)
    }

    paginate(event) {

    }

    lookMaterial(materialId: number) {
        console.log(materialId)
        this.router.navigate(['/lookMaterial/material', materialId])
    }

    downloadMaterial(materialId: number) {

    }
}