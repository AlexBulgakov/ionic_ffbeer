import {Component, Input} from '@angular/core';

@Component({
  selector: 'empty-card',
  templateUrl: 'empty-card.html'
})
export class EmptyCardComponent {

  @Input() msg: string;

  constructor() {
  }

  ionViewDidEnter(){
    if (!this.msg) {
      this.msg = "Извините, ничего не найдено";
    }
  }

}
