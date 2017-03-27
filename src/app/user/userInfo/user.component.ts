import { Component } from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
})
export class UserComponent {
    constructor() {

    }
}