import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

// storage
import { SessionStorage } from 'ng2-webstorage';
// cookie
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { LoginUser } from '../service/login_user'
import { UserService } from '../service/user.service'
import { User } from '../service/user'

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  private loginUser: LoginUser

  private message: string = ''

  private showMessage: boolean

  @SessionStorage() private currUser: User = new User()

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.loginUser = new LoginUser()
    this.showMessage = false
  }

  login() {
    // console.log('login user: ')
    // console.log(this.loginUser)
    this.check()
    this.setLoginFlag()
    this.userService.login(this.loginUser)
      .then(user => {
        this.currUser = user
        setTimeout(2000)
        this.router.navigateByUrl("/meeting/meetingList")
      })
  }

  /**
   * 校验 用户输入的 数据是否合法
   */
  check() {
    if (this.loginUser.domain === null || this.loginUser.domain.length <= 0) {
      this.showMessage = true
      this.message = "请输入正确的用户名/手机号/邮箱"
    }
    if (this.loginUser.password === null || this.loginUser.password.length <= 0) {
      this.showMessage = true
      this.message = '请输入密码'
    }
  }

  /**
   * 根据用户 输入的 数据 判断用户的登录方式, 暂时现默认 用户名 登录
   */
  setLoginFlag() {
    this.loginUser.flag = 1
  }
}
