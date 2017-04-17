import { Component, OnInit } from '@angular/core';

// storage
import { SessionStorage } from 'ng2-webstorage';

import { GroupService } from '../service/group.service'
import { GroupPage } from '../service/model/group_page'
import { User } from '../service/user'

@Component({
    moduleId: module.id,
    selector: 'group',
    templateUrl: 'group.component.html',
})
export class GroupComponent implements OnInit {

    @SessionStorage() private currUser: User
    private groupPage: GroupPage = new GroupPage
    constructor(private groupService: GroupService) { }

    ngOnInit() {
        this.groupService.pageOrgGroup(this.currUser.orgId, 1, 10)
            .then(page => this.groupPage = page)
    }

    paginate(event) {

    }

    newGroup() {

    }

    lookGroup(){

    }

    deleteGroupp(){
        
    }
}