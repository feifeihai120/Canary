import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { URLSearchParams } from '@angular/http'
import { Router } from '@angular/router'

import 'rxjs/add/operator/switchMap'

// storage
import { SessionStorage } from 'ng2-webstorage';

import { User } from '../service/user'

import { MeetingService } from '../service/meeting.service'
import { HttpService } from '../service/http.service'
import { Meeting } from '../service/meeting'
import { MeetingPage } from '../service/meeting_page'

@Component({
	moduleId: module.id,
	selector: 'meetingList',
	templateUrl: 'meeting.component.html'
})
export class MeetingComponent implements OnInit {

	private meetingPage: MeetingPage = new MeetingPage()
	@SessionStorage() private currUser: User

	constructor(
		private meetingService: MeetingService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.meetingService.getPageMeeting(1, 10)
			.then(meetingPage => this.meetingPage = meetingPage)
	}

	paginate(event) {
		this.meetingService.getPageMeeting(event.page + 1, event.rows)
			.then(meetingPage => this.meetingPage = meetingPage)
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

	/**
	 * 开启会议
	 */
	openMeeting(id: number) {
		this.meetingService.openMeeting(id)
			.then(it => this.router.navigate(['/runMeeting/pdf', id]))
	}

	deleteMeeting(id: number) {
		this.meetingService.deleteMeeting(id)
			.then(b => {
				this.meetingPage.list = this.meetingPage.list.filter(meeting => meeting.id !== id)
			})
	}

	/**
	 * 进入会议
	 * @param id meetingid
	 */
	enterMeeting(id: number) {
		this.router.navigate(['/runMeeting/pdf', id])
	}

	/**
	 * 申请参加会议
	 * 暂时 用户申请参加一个会议 就会参加所有的 议题
	 * @param meetingId 会议
	 */
	joinMeeting(meetingId: number) {
		this.meetingService.joinMeeting(meetingId)
			.then(b => {
				this.meetingPage.list.forEach(element => {
					if (element.id === meetingId) {
						element.joined = true
					}
				});
			})
	}
}
