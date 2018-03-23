declare module NomenclatureAPI {

  export interface Group {
    additionalInfo?: any;
    code?: any;
    description?: any;
    id: string;
    isDeleted: boolean;
    name: string;
    seoDescription?: any;
    seoKeywords?: any;
    seoText?: any;
    seoTitle?: any;
    tags?: any;
    images: any[];
    isIncludedInMenu: boolean;
    order: number;
    parentGroup: string;
  }

  export interface ProductCategory {
    id: string;
    name: string;
  }

  export interface Product {
    additionalInfo?: any;
    code: string;
    description: string;
    id: string;
    isDeleted: boolean;
    name: string;
    seoDescription?: any;
    seoKeywords?: any;
    seoText?: any;
    seoTitle?: any;
    tags?: any;
    carbohydrateAmount: number;
    carbohydrateFullAmount: number;
    differentPricesOn: any[];
    doNotPrintInCheque: boolean;
    energyAmount: number;
    energyFullAmount: number;
    fatAmount: number;
    fatFullAmount: number;
    fiberAmount: number;
    fiberFullAmount: number;
    groupId?: any;
    groupModifiers: any[];
    measureUnit: string;
    modifiers: any[];
    price: number;
    productCategoryId: string;
    prohibitedToSaleOn: any[];
    type: string;
    weight: number;
    images: any[];
    isIncludedInMenu: boolean;
    order: number;
    parentGroup: string;
  }

  export interface NomenclatureResponse {
    groups: Group[];
    productCategories: ProductCategory[];
    products: Product[];
    revision: number;
    uploadDate: string;
  }
}
