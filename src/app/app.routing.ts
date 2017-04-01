import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 自定义组件
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent} from './layouts/simple-layout.component'
import { RunMeetingLayoutComponent } from './layouts/run-meeting-layout.component'
import { RegisterComponent } from './pages/register.component'
import { LoginComponent } from './pages/login.component'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'meeting',
        loadChildren: './meeting/meeting.module#MeetingModule'
      },
      {
        path: 'meetingMaterial',
        loadChildren: './material/meeting-material.module#MeetingMaterialModule'
      },
      {
        path: 'userInfo',
        loadChildren: './user/userInfo/user.module#UserModule'
      },
      {
        path: 'userMeeting',
        loadChildren: './user/user-meeting/user-meeting.module#UserMeetingModule'
      },
      {
        path: 'userMaterial',
        loadChildren: './user/user-material/user-material.module#UserMaterialModule'
      },
      {
        path: 'group',
        loadChildren: './group/group.module#GroupModule'
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: RunMeetingLayoutComponent,
    data: {
      title: '会议室'
    },
    children: [
      {
        path: 'runMeeting',
        loadChildren: './run-meeting/run-meeting.module#RunMeetingModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
