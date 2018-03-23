import {Component, Input} from '@angular/core';
import {ModalController, NavParams} from "ionic-angular";
import {ArticlePage} from "../../pages/article/article";

@Component({
  selector: 'article-single',
  templateUrl: 'article-single.html'
})
export class ArticleSingleComponent {
  @Input() isPreview : boolean = false;
  @Input() item : any = null;


  constructor(public modalCtrl: ModalController,
    public navParams: NavParams) {
  }

  presentPopover() {
    if (this.isPreview){
      let popover = this.modalCtrl.create(ArticlePage,
        {
          item: this.item
        });
      popover.present();
    }
  }
}
