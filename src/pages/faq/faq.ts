import { Component } from '@angular/core';
import {NewsAndFaqProvider} from "../../providers/news-and-faq/news-and-faq";

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  pageTitle: string = 'FAQ';

  articles : {'title': string, 'detail_picture': string, 'detail_text': string}[] = [];

  constructor(public newsAndFaqProvider: NewsAndFaqProvider) {}

  ngOnInit(){
    this.newsAndFaqProvider.getFaq().then(articles => this.articles = articles);
  }
}
