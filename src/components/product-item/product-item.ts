import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserProductsProvider} from "../../providers/userProducts";
import {NavController} from "ionic-angular";
import {ItemDetailsPage} from "../../pages/item-details/item-details";
import {StopListsProvider} from "../../providers/stop-lists/stop-lists";
import {BeerProduct} from "../../iikoStructures/BeerProduct.class";

@Component({
  selector: 'product-item',
  templateUrl: 'product-item.html'
})
export class ProductItemComponent implements OnInit{
  @Output() change:EventEmitter<boolean> = new EventEmitter();

  @Input() data: BeerProduct;
  @Input() isFull: boolean;
  @Input() showInvalid: boolean = false;

  DESCRIPTION_MAX_LENGTH = 100;

  isFavorite: boolean;
  basketAmount: number = 0;

  fieldsToShow = [];

  constructor(public userProducts: UserProductsProvider,
              public stopListsProvider: StopListsProvider,
              private navCtrl: NavController) {}

  descriptionLimited(){
    if (this.isFull){
      return this.data.description;
    }
    else {
      let length = this.data.description.indexOf(' ', this.DESCRIPTION_MAX_LENGTH);
      if (length === -1){
        return this.data.description;
      }
      else{
        return this.data.description.substr(0, length) + '...';
      }
    }
  }

  _setFieldToShow(){
    this.fieldsToShow = [
      ['style', 'Цвет'],
      ['filtration', 'Фильтрованное'],
      ['alco', 'Крепость'],
      ['bitterness', 'Горечь'],
      ['region', 'Регион'],
      ['periodicity', 'Периодичность сорта'],
      ['taste', 'Вкус'],
      ['basis', 'Фруктовая основа'],
      ['sugar', 'Сахар'],
      ['origin', 'Регион'],
      ['made', 'Производитель']
    ];
  }

  get nonEmptyFieldsToShow(){
    let fields = this.fieldsToShow.filter(field => {
      return this.data[field[0]] || this.data[field[0]] === 0;
    });
    return fields;
  }

  fieldValue(name: string){
    return this.data[name];
  }

 ngOnInit(){
    if (this.isFull){
      this._setFieldToShow();
    }

    this.checkIsFavorite();
    this.checkBasketAmount();
  }

  isStopListed(): boolean {
    return this.stopListsProvider.isStopListed(this.data['id']);
  }

  isBasketButtonVisible(){
    return !this.basketAmount;
  }

  toggleFavorites(event: MouseEvent){
    event.stopPropagation();

    this.userProducts.favoritesToggle(this.getId()).
      then(() => this.checkIsFavorite());
  }

  addToBasket(event: MouseEvent) {
    event.stopPropagation();

    this.userProducts.basketAdd(this.getId()).
      then(() => this.checkBasketAmount());
  }

  removeFromBasket(event: MouseEvent){
    event.stopPropagation();

    this.userProducts.basketRemove(this.getId()).
      then(() => this.checkBasketAmount());
  }


  checkIsFavorite(){
    return this.userProducts.isFavorite(this.getId()).then(
      (result) => {
        //this.ref.markForCheck();
        this.isFavorite = result
      }
    );
  }

  checkBasketAmount() {
    return this.userProducts.basketAmount(this.getId()).then(
      (result) => {
        //this.ref.markForCheck();
        this.basketAmount = result
      }
    );
  }

  getImage(){
    let data = this.data;
    return data.images && data.images[0] && data.images[0].imageUrl;
  }

  getId(){
    return this.data['id'];
  }

  openItemFull(){
    if (!this.isFull){
      this.navCtrl.push(ItemDetailsPage, {
        item: this.data
      });
    }
  }
}
