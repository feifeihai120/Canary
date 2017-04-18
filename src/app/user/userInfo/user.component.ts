import { Component } from '@angular/core';

// storage
import { SessionStorage } from 'ng2-webstorage';

// primeng
import { Message } from 'primeng/primeng'

import { UserService } from '../../service/user.service'
import { User } from '../../service/user'

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
})
export class UserComponent {

    @SessionStorage() private currUser: User
    private user: User = this.copy(this.currUser)
    private edited = false
    private showUserInfo = true
    private showChangePwd = false
    private oldPwd
    private newPwd
    private repeatPwd
    constructor(private userService: UserService) {
    }

    changePwd() {
        this.showChangePwd = !this.showChangePwd
        this.showUserInfo = !this.showUserInfo
    }

    edit() {
        this.edited = !this.edited
    }

    save() {
        this.userService.update(this.user)
            .then(b => {
                this.currUser.username = this.user.username
                this.currUser.email = this.user.email
                this.currUser.phone = this.user.phone
                this.edited = !this.edited
                this.msgs.push({ severity: 'success', summary: '信息更新', detail: '恭喜！您的个人信息更新成功' })
            })
    }

    cancel() {
        this.edited = !this.edited
    }

    cancelChangePwd() {
        this.showChangePwd = !this.showChangePwd
        this.showUserInfo = !this.showUserInfo
        this.validatePass = false
        this.notValidatePass = false
        this.newPwd = ''
        this.repeatPwd = ''
        this.oldPwd = ''
    }

    private validatePass = false
    private notValidatePass = false
    validate() {
        this.userService.validate(this.oldPwd)
            .then(b => {
                this.validatePass = b
                this.notValidatePass = !b
            })
    }

    private msgs: Message[] = [];
    saveChangePwd() {
        this.userService.changePwd(this.newPwd)
            .then(b => {
                this.showChangePwd = !this.showChangePwd
                this.showUserInfo = !this.showUserInfo
                this.validatePass = false
                this.notValidatePass = false
                this.newPwd = ''
                this.repeatPwd = ''
                this.oldPwd = ''
                this.msgs.push({ severity: 'success', summary: '密码修改', detail: '恭喜！您的密码修改成功' })
            })
    }

    private validateRepeat = true
    repeat() {
        this.validateRepeat = this.newPwd === this.repeatPwd
    }

    copy(user: User) {
        let u = new User()
        u.avatar = user.avatar
        u.username = user.username
        u.email = user.email
        u.phone = user.phone
        u.orgName = user.orgName
        u.groupName = user.groupName
        return u
    }
}