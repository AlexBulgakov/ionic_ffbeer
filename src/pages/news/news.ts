import {Component, OnInit} from '@angular/core';
import {NewsAndFaqProvider} from "../../providers/news-and-faq/news-and-faq";

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage implements OnInit {
  pageTitle: string = 'Новости и акции';

  articles : {'title': string, 'detail_picture': string, 'detail_text': string}[] = [];

  constructor(public newsAndFaqProvider: NewsAndFaqProvider) {}

  ngOnInit(){
    this.newsAndFaqProvider.getNews().then(articles => this.articles = articles);
  }
}
