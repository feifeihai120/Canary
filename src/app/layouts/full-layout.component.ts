import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

// storage
import { SessionStorage } from 'ng2-webstorage';

import { User } from '../service/user'
import { UserService } from '../service/user.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };

  @SessionStorage() private currUser: User

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void { }

  logout() {
    this.userService.logout()
      .then(b => this.router.navigateByUrl("/login"))
  }
}
