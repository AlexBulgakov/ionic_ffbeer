import {Injectable} from '@angular/core';
import {iikoBizApi} from "./iikoBizApi.service";
import {UserManager} from "./user";
import {BeerProduct, BeerFactory} from "./../iikoStructures/BeerProduct.class";
import NomenclatureResponse = NomenclatureAPI.NomenclatureResponse;

import * as _ from 'lodash';
import {LoaderCounterProvider} from "./loader-counter/loader-counter";

@Injectable()
export class NomenclatureProvider {

  _rawPromise;
  _allPromise: Promise<BeerProduct[]>;

  products: BeerProduct[] = [];

  constructor(public user: UserManager,
              public iikoBizApi: iikoBizApi,
              public loadingCtrl: LoaderCounterProvider,
              ) {
  }

  /**
   * Nomenclature response returned from server
   * @returns {Promise<NomenclatureAPI.NomenclatureResponse>}
   */
  _getRaw(): Promise<NomenclatureResponse> {
    if (!this._rawPromise){
      this.loadingCtrl.show();

      this._rawPromise =  this.user.getOrganizationFirst().then((organization) => {
        return this.iikoBizApi.api().nomenclature.organizationId({organizationId: organization.id}).get()
          .then(result => {
            this.loadingCtrl.hide();
            return result;
          })
          .then(result => result.body)
          .catch( e => {
            console.error("Failed to get nomenclature: ", e);
            this._rawPromise = null;
          })
      })
      .catch( e => {
        console.error("Failed to get organization for nomenclature: ", e);
        this._rawPromise = null;
      })
    }

    return this._rawPromise;
  }

  getAll() :Promise<BeerProduct[]> {
    if (!this._allPromise){
      this._allPromise = this._getRaw()
        .then( data => this._importRaw(data));
    }

    return this._allPromise;
  }

  _importRaw(nomenclature: NomenclatureResponse) : BeerProduct[]{
    for(let productData of nomenclature.products){
      let beerProduct = BeerFactory(productData);
      if (beerProduct) {
        this.products.push(beerProduct)
      }
    }

    return this.products;
  }

  getFiltered(filter: (productItem: BeerProduct) => BeerProduct): Promise<BeerProduct[]>{
    return this.getAll().then((beerProducts: BeerProduct[]) => {
      let products : BeerProduct[] = beerProducts.map(p => filter(p));
      return _.compact(products);
    });
  }

  _convertNomenclatureToTree(nomenclature: NomenclatureResponse, products: BeerProduct[]) {
    let result = [];

    if (nomenclature){
      let productsGroupped = _.groupBy(products, 'parentGroup');
      console.log('productsGroupped', productsGroupped);

      result /*: NomenclatureCategoryWithNestedProducts[]*/ = _.map(nomenclature.groups,
        (group) => {
          let productsPerGroup = productsGroupped[group.id];
          if (productsPerGroup) {
            group['_products'] = productsPerGroup || [];
            return group;
          }
          else{
            return null;
          }
        });

      result = _.compact(result);
    }

    return result;
  }

  /**
   * Nomenclature categories with nested products
   * @returns {Promise<any>}
   */
  productGroupsTree() : Promise<any> {

    let result = Promise.all([this._getRaw(), this.getAll()]).
      then((result) => {
      let [nomenclature, products] = result;
      return this._convertNomenclatureToTree(nomenclature, products);
    });

    return result;
  }
}
