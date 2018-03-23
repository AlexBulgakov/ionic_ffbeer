import * as _ from 'lodash';

//todo deniso check how to avoid duplicates - http://www.chriskrycho.com/2016/keyof-and-mapped-types-in-typescript-21.html

type UnionKeyToValue<U extends string> = {
  [K in U]: K
  };

type BeerTypeUnion = "Классическое" | "Фруктовое" | "Сидр";
const BEER_TYPES: UnionKeyToValue<BeerTypeUnion> = {
  "Классическое": "Классическое",
  "Фруктовое": "Фруктовое",
  "Сидр": "Сидр"
};

type BeerStyleUnion = "Светлое" | "Тёмное";
const BEER_STYLES: UnionKeyToValue<BeerStyleUnion> = {
  "Светлое": "Светлое",
  "Тёмное": "Тёмное"
};

type BeerFiltrationUnion = "Фильтрованное" | "Нефильтрованное";
const BEER_FILTRATION: UnionKeyToValue<BeerFiltrationUnion> = {
  "Фильтрованное": "Фильтрованное",
  "Нефильтрованное": "Нефильтрованное"
};

type BeerSugarUnion = 'Сухой' | 'Полусухой' | 'Полусладкий' | 'Сладкий';
const BEER_SUGAR: UnionKeyToValue<BeerSugarUnion> = {
  'Сухой': 'Сухой',
  'Полусухой': 'Полусухой',
  'Полусладкий': 'Полусладкий',
  'Сладкий': 'Сладкий'
};

type BeerBasisUnion = 'Яблоко' | 'Груша' | 'Другая основа';
const BEER_BASIS: UnionKeyToValue<BeerBasisUnion> = {
  'Яблоко': 'Яблоко',
  'Груша': 'Груша',
  'Другая основа': 'Другая основа'
};

interface RangeFilterAndName {
  name: string,
  filter: (x: number|string) => boolean
}

export const ALCO_RANGE_FILTER: RangeFilterAndName[] = [
  {name: 'Безалкогольное - 0', filter: (v) => v === 0},
  {name: 'Легкое - от 1% до 4%', filter: (v) => v > 0 && v < 4},
  {name: 'Среднее - от 4% до 6%', filter: (v) => v >= 4 && v <= 6},
  {name: 'Крепкое - свыше 6%', filter: (v) => v > 6},
];

export const BEER_PRICE_RANGE_FILTER: RangeFilterAndName[] = [
  {name: 'до 200', filter: (v) => v <= 200},
  {name: 'до 300', filter: (v) => v <= 300},
  {name: 'до 500', filter: (v) => v <= 500},
  {name: 'свыше 500', filter: (v) => v > 500},
];

function getRangeNameForValue(value: number|string, ranges: RangeFilterAndName[], multipleValues?): string | string[]{
  if (value || value === 0) {
    let result = ranges.filter(r => r.filter(value));
    if (result.length) {
      let names = result.map(r => r.name);
      return multipleValues ? names : names[0];
    }
  }
  return multipleValues ? [] : '';
}

function getLabeledTagValue(tags: string[], label: string): string{
  let origin = tags.find(tag => tag.toLowerCase().startsWith(label));
  if (origin) {
    //cut everyting after label
    origin = origin.substr(origin.toLowerCase().indexOf(label) + label.length);
  }
  return origin;
}

export class BeerProduct {
  type: BeerTypeUnion;
  filtration: BeerFiltrationUnion;
  periodicity: string;

  price: number;
  weight: string;
  id: string;
  parentGroup: string;
  name: string;
  description: string;
  images: { imageUrl: string }[];
  tags: string[];
  alco: string;
  alcoRange: string;
  priceRange: string;
  made: string;

  get isValid(): boolean {
    return this.emptyFields.length === 0;
  }

  get emptyFields(): any[] {
    let fields = [];

    let validator = (fieldValues, name) => {
      if (!this[name] && this[name] !== 0){
        fields.push([name, fieldValues])
      }
    };

    _.forEach(this._generalTags, validator),
    _.forEach(this.getCustomTags(), validator);

    return fields;
  }

  _generalTags = {
    "type": BEER_TYPES,
    "filtration": BEER_FILTRATION,
    "periodicity": () => getLabeledTagValue(this.raw.tags, "периодичность:"),
    "origin": () => getLabeledTagValue(this.raw.tags, "страна:"),
    "made": () => getLabeledTagValue(this.raw.tags, "производитель:"),
    "alco": () => getLabeledTagValue(this.raw.tags, "алкоголь:"),
    "alcoRange": () => getRangeNameForValue((this.alco||"").replace("%",""), ALCO_RANGE_FILTER),
    "priceRange": () => getRangeNameForValue(this.raw.price, BEER_PRICE_RANGE_FILTER, true)
  };

  // for child classes
  getCustomTags() {
    return null;
  };

  constructor(public raw: any) {
    this._importRaw();
  }

  _importRaw() {
    this._normalizeTags();

    this._importTagsAndCalculatedValues(this._generalTags);
    this._importTagsAndCalculatedValues(this.getCustomTags());

    this.price = this.raw.price;
    this.weight = this.raw.weight;
    this.id = this.raw.id;
    this.name = this.raw.name;
    this.description = this.raw.description;
    this.parentGroup = this.raw.parentGroup;
    this.tags = this.raw.tags;

    this.images = this.raw.images;
  }

  _importTagsAndCalculatedValues(fieldsList) {
    if (!fieldsList) return;

    for (let fieldName in fieldsList) {
      let valuesToSearch = fieldsList[fieldName];
      if (typeof valuesToSearch == "function") {
        this[fieldName] = valuesToSearch.call(this);
      }
      else {
        this[fieldName] = this._findValueInTags(valuesToSearch);
      }
    }
  }

  _normalizeTags(): void {
    this.raw.tags = this.raw.tags.map(tag => tag.trim());
  }

  _findValueInTags<T>(valuesSet): keyof T {
    let existingValues = this.raw.tags;

    for (let v in valuesSet) {
      if (existingValues.indexOf(v.toLowerCase()) > -1) {
        //same as "return v" by meaning, but better for type checking
        return valuesSet[v];
      }
    }
  }
}

class BeerProductClassicClass extends BeerProduct {
  style: BeerStyleUnion;
  bitterness: string;

  getCustomTags() {
    return {
      style: BEER_STYLES,
      bitterness: () => getLabeledTagValue(this.raw.tags, "горечь:")
    };
  };
}

class BeerProductFruitClass extends BeerProduct {
  taste: string;

  getCustomTags() {
    return {
      taste: () => getLabeledTagValue(this.raw.tags, "вкус:")
    };
  };
}

class BeerProductCitClass extends BeerProduct {
  sugar: BeerSugarUnion;
  basis: BeerBasisUnion;

  getCustomTags() {
    return {
      sugar: BEER_SUGAR,
      basis: BEER_BASIS
    };
  };
}

export let BeerFactory = (raw): BeerProduct => {
  let tags = raw.tags || [];
  if (tags.indexOf(BEER_TYPES.Классическое.toLowerCase()) > -1) {
    return new BeerProductClassicClass(raw);
  }
  if (tags.indexOf(BEER_TYPES.Фруктовое.toLowerCase()) > -1) {
    return new BeerProductFruitClass(raw);
  }
  if (tags.indexOf(BEER_TYPES.Сидр.toLowerCase()) > -1) {
    return new BeerProductCitClass(raw);
  }
  else {
    console.error("Среди тегов - не найден никакой тип", raw)

  }
};
