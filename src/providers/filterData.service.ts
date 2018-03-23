import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {ALCO_RANGE_FILTER, BEER_PRICE_RANGE_FILTER, BeerProduct} from "../iikoStructures/BeerProduct.class";


export class FilterPossibleValues {
  type: any = null;
  style: any = null;
  filtration: any = null;
  sugar: any = null;
  taste: any = null;
  basis: any = null;
  periodicity: any = null;
  bitterness: any = null;
  origin: any = null;

  // at the moment all price values are not necessary,
  // instead named price ranges are used
  // price: any = null;

  priceRange: any = null;
  alcoRange: any = null;
  tags: string[] = null;
}

@Injectable()
export class FilterDataService {

  ALCO_PROPERTY = 'alco';

  constructor() {
  }


  getItemsByName(nameToSearch: string[], all) {
    if (!nameToSearch || !nameToSearch.length) return [];
    return all.filter(item => nameToSearch.indexOf(item.name) != -1);
  }

  getAlcoFiltersByName(nameToSearch: string[]) {
    return this.getItemsByName(nameToSearch, ALCO_RANGE_FILTER);
  }

  getBeerPriceFiltersByName(nameToSearch: string[]) {
    return this.getItemsByName(nameToSearch, BEER_PRICE_RANGE_FILTER);
  }

  checkParamByFilters(value: any, filters: { name: string, filter: Function }[]) {
    if (!filters || !filters.length) return true;
    if (!value && value !== 0) return false;
    return _.some(filters, (filterItem) => filterItem.filter(value))
  }

  /**
   * Method is async for future possible changes, if we would like take some data from server
   * @param {NomenclatureAPI.NomenclatureResponse} nomenclature
   * @returns {Promise<FilterPossibleValues>}
   */
  getPossibleValuesFromItems(products: BeerProduct[]): Promise<FilterPossibleValues> {
    let valuesAvailable: FilterPossibleValues = new FilterPossibleValues();

    let applyValue = (result, value) => {
      if ((value || value === 0) && result.indexOf(value) === -1) {
        result.push(value);
      }
      return result;
    };

    for (let fieldName in valuesAvailable) {

      valuesAvailable[fieldName] = products.reduce( (result, product) => {
        let value = product[fieldName];
        if (Array.isArray(value)){
          value.reduce((result, subvalue) => applyValue(result, subvalue.trim().toLowerCase()), result);
        }
        else{
          applyValue(result, value);
        }

        return result;
      }, []);

    }

    return Promise.resolve(valuesAvailable);
  }
}
