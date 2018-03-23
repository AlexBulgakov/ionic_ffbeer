import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as _ from 'lodash';
import {BeerProduct} from "../../iikoStructures/BeerProduct.class";

@Component({
  selector: 'products-list',
  templateUrl: 'products-list.html'
})
export class ProductsListComponent implements OnChanges{
  @Input() isChangeMode: boolean;
  @Input() emptyMsg: string;
  @Input() isFavorite: boolean;
  @Input() filter: Function = null;
  @Input() products: BeerProduct[];
  @Input() showInvalid: boolean = false;

  isCorrectAny(){
    let products = this.products;
    let result = products && products.length &&
        _.some(products, (item) => this.isCorrect(item));

    return result;
  }

  isCorrect(...args){
    //console.log("isCorrect");
    if (this.filter === null){
      return true;
    }
    else {
      return this.filter.apply(this, args);
    }
  }

  ngOnChanges(changes: SimpleChanges){
    //console.log("LIST change: ",changes);
  }

  constructor() {
  }
}
