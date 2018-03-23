import {Component, Input} from '@angular/core';

@Component({
  selector: 'article-list',
  templateUrl: 'article-list.html'
})
export class ArticleListComponent {
  @Input() itemsList: any[];

  constructor() {
  }
}
