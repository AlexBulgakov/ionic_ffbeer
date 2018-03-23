import {Component} from '@angular/core';
import { NavParams } from 'ionic-angular';
import NomenclatureResponse = NomenclatureAPI.NomenclatureResponse;

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  products: any[];
  group: any;

  pageTitle: string = 'Категория';
  nomenclature : NomenclatureResponse = null;


  constructor(public navParams: NavParams) {}

  ionViewDidEnter(): void{
    this.group = this.navParams.get('group');
    this.products = this.group._products;
  }
}
