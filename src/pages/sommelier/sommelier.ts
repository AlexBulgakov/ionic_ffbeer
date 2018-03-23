import {Component, OnChanges, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NomenclatureProvider} from "../../providers/nomenclatureProvider";
import {FilterDataService, FilterPossibleValues} from "../../providers/filterData.service";
import * as _ from 'lodash';
import {BeerProduct} from "../../iikoStructures/BeerProduct.class";

@Component({
  selector: 'page-sommelier',
  templateUrl: 'sommelier.html',
})

export class SommelierPage implements OnInit, OnChanges{
  pageTitle: string = 'Сомелье';

  //nomenclature: NomenclatureResponse;
  products: BeerProduct[];

  showInvalid = false;

  selectCancelText = 'Отмена';
  selectOkText = 'Выбрать';

  commonTagsFields = ['type', 'filtration', 'periodicity', 'origin', 'alcoRange'];
  classicFields = ['style', 'bitterness'];
  fruitFields = ['taste'];
  citFields = ['sugar', 'basis'];

  _enableDebugMagicValue = "000";

  typeSpecificFields = [... this.classicFields, ... this.fruitFields, ... this.citFields];
  allFields = [...this.commonTagsFields, ...this.typeSpecificFields];

  get isIncompatibleTypeFieldSet(){
    return _.some(this.typeSpecificFields, field => {
      let value = this.filterChoosed[field];
      return value && (value.length || !Array.isArray(value));
    });
  }

  get excludingFields(){
    let fields = [];

    if (!this.isTypeClassicOrNotSet) {
      fields = fields.concat(this.classicFields);
    }

    if (!this.isTypeFruitOrNotSet) {
      fields = fields.concat(this.fruitFields);
    }

    if (!this.isTypeCitOrNotSet) {
      fields = fields.concat(this.citFields);
    }

    return fields;
  }

  filterPossibleValues: FilterPossibleValues;

  autocompleteValues = [];

  filterChoosed = {
    type: null,
    style: null,
    filtration: null,
    taste: null,
    basis: null,
    sugar: null,
    bitterness: null,
    periodicity: null,
    priceRange: null,
    alcoRange: null,
    origin: null,
    volume: null,
    tag: ''
  };

  get isTypeClassicOrNotSet(): boolean {
    let beerType = this.filterChoosed.type;
    if (!beerType) return true;
    return beerType.length === 0 || beerType.indexOf('Классическое') !== -1; //todo deniso user global const
  };

  get isTypeFruitOrNotSet(): boolean {
    let beerType = this.filterChoosed.type;
    if (!beerType) return true;
    return beerType.length === 0 || beerType.indexOf('Фруктовое') !== -1;
  };

  get isTypeCitOrNotSet(): boolean {
    let beerType = this.filterChoosed.type;
    if (!beerType) return true;
    return beerType.length === 0 || beerType.indexOf('Сидр') !== -1;
  };

  getTagValue(){
    return this.filterChoosed.tag// ? this.filterChoosed.tag.substr(1).toLowerCase().trim() : '';
  }

  getFilter(): Function{
    function _getCheckFunction(tag){
      return tagItem => {
        if (tagItem === tag){
          return true;
        }
        else {
          let colonIndex = tagItem.indexOf(':');
          if (colonIndex === -1) {
            return false;
          }
          else{
            return tagItem.substr(colonIndex + 1) === tag;
          }
        }
      }
    }

    return (data) => {
      let filterChoosed = this.filterChoosed;

      let tag = filterChoosed.tag;
      if (tag){
        const isTagFound = _.some(data.tags, _getCheckFunction(tag));
        if (!isTagFound){
          return false;
        }
      }

      let priceRange = [...filterChoosed.priceRange || []];
      if (priceRange.length && !_.some(priceRange, price => data.priceRange.indexOf(price) > -1)){

          return false;

      }

      let excludingTags = this.excludingFields;
      let tagsCheckMap = this.allFields.map(fieldName => {
        if (excludingTags.indexOf(fieldName) !== -1) return true;
        //code is designed for multiple="true" which returns array
        //in order to support multiple="false"  - result is converted to array for sure
        let values = [...this.filterChoosed[fieldName] || []];
        if (values.length == 0) return true;

        return values.indexOf(data[fieldName]) > -1;
      });
      return tagsCheckMap.every(tagCorrect => tagCorrect);
    };
  }

  get isFilterEmpty(){
    let excludingFields = this.excludingFields;

    //todo deniso add tag support? or just remove this func?
    let fieldsEmpty = _.map(this.filterChoosed, (value, name) => {
      if (!value || value.length === 0) return true;
      if (excludingFields.indexOf(name) > -1) return true;
      return false;
    });

    return fieldsEmpty.every(v => v);
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nomenclatureProvider: NomenclatureProvider,
              public filterData: FilterDataService) {
  }

  ngOnChanges(changes): void{
    console.log("ngOnChanges sommelier", changes);
    //this._isFilterEmpty = this.checkFilterEmpty();
  }

  ngOnInit(): void{
    this.init();
  }

  init(): Promise<any>{
    return this.nomenclatureProvider.getAll().then(
      (products: BeerProduct[]) => {
        this.products = products;
        return this.filterData.getPossibleValuesFromItems(products);
      })
    .then(_filterPossible => {
      _filterPossible.priceRange = _filterPossible.priceRange.sort();
      this.filterPossibleValues = _filterPossible;
      this.autocompleteValues = (this.filterPossibleValues.tags || []).map(
        item => {
          let colonsIndex = item.indexOf(':');
          let colonsInTheMiddle = colonsIndex > 0 && colonsIndex < (item.length - 1);
          // return value after colon
          // made for 'страна:бельгия' and so on
          return colonsInTheMiddle ? item.substring(colonsIndex + 1) : item;
        }
      );

      this.autocompleteValues.push(this._enableDebugMagicValue);
    });

  }

  autocompleteChanged(event){
    console.log("event", event);
    let oldValue = this.showInvalid;
    this.showInvalid = event === this._enableDebugMagicValue && !this.showInvalid;
    if (oldValue !== this.showInvalid){
      alert("Показать все: " + (this.showInvalid ? "включено" : "вЫключено"));
      this.filterChoosed.tag = '';
    }
  }
}
