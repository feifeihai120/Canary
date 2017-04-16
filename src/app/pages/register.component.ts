import { Component } from '@angular/core';

import { UserService } from '../service/user.service'
import { RegisterUser } from '../service/model/register_user'

@Component({
	selector: 'register',
	templateUrl: 'register.component.html'
})
export class RegisterComponent {


	private registerUser: RegisterUser = new RegisterUser()
	private repeatPass: string
	constructor(private userService: UserService) { }

	register() {
		this.userService.register(this.registerUser)
			.then(b => b ? console.log('yes') : console.log('no'))
	}
}
