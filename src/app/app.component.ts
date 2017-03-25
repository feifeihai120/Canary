import { Component } from '@angular/core';

// 导入 angular 2 的 
import { LocalStorageService } from "angular2-localstorage/LocalStorageEmitter";

@Component({
  // tslint:disable-next-line
  selector: 'my-app',
  template: '<router-outlet></router-outlet>',
  providers: [LocalStorageService]
})
export class AppComponent {
  constructor(storageService: LocalStorageService) { }
}
