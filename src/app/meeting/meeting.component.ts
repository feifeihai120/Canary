import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { URLSearchParams } from '@angular/http'
import { Router } from '@angular/router'

import 'rxjs/add/operator/switchMap'

import { MeetingService } from '../service/meeting.service'
import { Meeting } from '../service/meeting'
import { MeetingPage } from '../service/meeting_page'

@Component({
  moduleId: module.id,
  selector: 'meetingList',
  templateUrl: 'meeting.component.html'
})
export class MeetingComponent implements OnInit {

  private meetings: Meeting[]

  private pageNo = 1
  private pageSize = 10
  private total: number
  private pages: number
  private pageNum: string[] = []
  private pageNoStr: string

  constructor(
    private meetingService: MeetingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.meetingService.getPageMeeting(this.getParmas())
      .then(meetingPage => {
        console.log(meetingPage)
        this.total = meetingPage.total
        this.pages = Math.ceil(this.total / this.pageSize)
        this.meetings = meetingPage.list
        this.getPageNum()
      })
    // this.meetingService.getLimitMeetings()
    // .then(meetings => this.meetings = meetings)
  }

  /**
   * 获取 分页数据，更新 this.meetingPage
   */
  getPage(pageNo: number) {
    this.pageNo = pageNo
    this.meetingService.getPageMeeting(this.getParmas())
      .then(meetingPage => {
        this.total = meetingPage.total
        this.pages = Math.ceil(this.total / this.pageSize)
        this.meetings = meetingPage.list
        this.getPageNum()
      })
  }

  /**
   * 下一页
   */
  nextPage() {
    if (this.pageNo < this.pages) {
      this.pageNo += 1
      this.meetingService.getPageMeeting(this.getParmas())
        .then(meetingPage => {
          this.total = meetingPage.total
          this.pages = Math.ceil(this.total / this.pageSize)
          this.meetings = meetingPage.list
          this.getPageNum()
        })
    }
  }

  /**
   * 上一页
   */
  prePage() {
    if (this.pageNo > 1) {
      this.pageNo -= 1
      this.meetingService.getPageMeeting(this.getParmas())
        .then(meetingPage => {
          this.total = meetingPage.total
          this.pages = Math.ceil(this.total / this.pageSize)
          this.meetings = meetingPage.list
          this.getPageNum()
        })
    }
  }

  private getParmas() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('pageNo', this.pageNo.toString());
    params.set('pageSize', this.pageSize.toString());
    return params
  }

  /**
   * 获取 分页的数据 1 2 3 ... 7 8 9
   */
  getPageNum() {
    this.pageNoStr = this.pageNo.toString()
    this.pageNum = []
    if (this.pages <= 6) {
      for (var index = 1; index <= this.pages; index++) {
        this.pageNum.push(index.toString())
      }
    } else {

    }
  }

  /**
   * 跳转到 新建会议界面
   */
  newMeeting() {
    this.router.navigateByUrl('/meeting/newMeeting')
  }

  lookDetail(id: number) {
    this.router.navigate(['/meeting/meetingDetail', id])
  }

  deleteMeeting(id: number) {

  }

  /**
   * 进入会议
   * @param id meetingid
   */
  enterMeeting(id: number) {
    this.router.navigate(['/runMeeting/pdf', id])
  }
}
