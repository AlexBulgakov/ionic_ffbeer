import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'user-selection',
  templateUrl: 'user-selection.html'
})
export class UserSelectionComponent {
  @Input() usersList: any[];
  @Output() onSelectUser: EventEmitter<any> = new EventEmitter();


  text: string;

  constructor() {}

  selectUser() {
    //todo replace hardcoded value
    this.onSelectUser.emit(this.usersList[0]);
  }
}
