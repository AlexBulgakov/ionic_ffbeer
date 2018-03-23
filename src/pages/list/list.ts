import {Component, OnInit} from '@angular/core';

import { NavController} from 'ionic-angular';

import {NomenclatureProvider} from "../../providers/nomenclatureProvider";
import {CategoryPage} from "../category/category";
import {BeerProduct} from "../../iikoStructures/BeerProduct.class";
import {LoaderCounterProvider} from "../../providers/loader-counter/loader-counter";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit{
  query: string = "";

  pageTitle: string = 'Каталог';
  products : BeerProduct[] = null;
  productGroups: any = null;

  constructor(private nomenclatureProvider: NomenclatureProvider,
              public loadingCtrl: LoaderCounterProvider,
              private navCtrl: NavController) {
  }

  ngOnInit(){
    this.populate();
  }

  populate(){
    // todo deniso thumbnail-list with categories images
    // https://ionicframework.com/docs/components/#thumbnail-list

    // todo loader

    this.nomenclatureProvider.getAll()
      .then(_p => this.products = _p);


    this.nomenclatureProvider.productGroupsTree().
      then(result => {
      console.table(result);
        this.productGroups = result;
    });
    //todo .catch(this.handleError)


  }

  getFilter(){
    let self = this;
    return (item) => {
      if (self.query){
        let queryTrimmed = self.query.trim().toLowerCase();
        return queryTrimmed && item.name.toLowerCase().indexOf(queryTrimmed) != -1;
      }
    }
  }

  openCategory(group){
    this.loadingCtrl.show();

    this.navCtrl.push(CategoryPage,{ group })
      .then(result => {
        this.loadingCtrl.hide();
        return result;
      });
  }

  getImage(group){
    let data = group;
    let image = data.images && data.images[0] && data.images[0].imageUrl;
    return image;
  }
}
