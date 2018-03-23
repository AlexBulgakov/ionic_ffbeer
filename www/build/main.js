webpackJsonp([0],{

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailSenderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var EmailSenderProvider = (function () {
    function EmailSenderProvider() {
    }
    //https://www.emailjs.com/docs/api-reference/emailjs-send/
    EmailSenderProvider.prototype.send = function (template, params) {
        var service = "mailgun";
        return emailjs.send(service, template, params);
    };
    EmailSenderProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], EmailSenderProvider);
    return EmailSenderProvider;
}());

//# sourceMappingURL=email-sender.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ALCO_RANGE_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BEER_PRICE_RANGE_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return BeerProduct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BeerFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BEER_TYPES = {
    "Классическое": "Классическое",
    "Фруктовое": "Фруктовое",
    "Сидр": "Сидр"
};
var BEER_STYLES = {
    "Светлое": "Светлое",
    "Тёмное": "Тёмное"
};
var BEER_FILTRATION = {
    "Фильтрованное": "Фильтрованное",
    "Нефильтрованное": "Нефильтрованное"
};
var BEER_SUGAR = {
    'Сухой': 'Сухой',
    'Полусухой': 'Полусухой',
    'Полусладкий': 'Полусладкий',
    'Сладкий': 'Сладкий'
};
var BEER_BASIS = {
    'Яблоко': 'Яблоко',
    'Груша': 'Груша',
    'Другая основа': 'Другая основа'
};
var ALCO_RANGE_FILTER = [
    { name: 'Безалкогольное - 0', filter: function (v) { return v === 0; } },
    { name: 'Легкое - от 1% до 4%', filter: function (v) { return v > 0 && v < 4; } },
    { name: 'Среднее - от 4% до 6%', filter: function (v) { return v >= 4 && v <= 6; } },
    { name: 'Крепкое - свыше 6%', filter: function (v) { return v > 6; } },
];
var BEER_PRICE_RANGE_FILTER = [
    { name: 'до 200', filter: function (v) { return v <= 200; } },
    { name: 'до 300', filter: function (v) { return v <= 300; } },
    { name: 'до 500', filter: function (v) { return v <= 500; } },
    { name: 'свыше 500', filter: function (v) { return v > 500; } },
];
function getRangeNameForValue(value, ranges, multipleValues) {
    if (value || value === 0) {
        var result = ranges.filter(function (r) { return r.filter(value); });
        if (result.length) {
            var names = result.map(function (r) { return r.name; });
            return multipleValues ? names : names[0];
        }
    }
    return multipleValues ? [] : '';
}
function getLabeledTagValue(tags, label) {
    var origin = tags.find(function (tag) { return tag.toLowerCase().startsWith(label); });
    if (origin) {
        //cut everyting after label
        origin = origin.substr(origin.toLowerCase().indexOf(label) + label.length);
    }
    return origin;
}
var BeerProduct = (function () {
    function BeerProduct(raw) {
        var _this = this;
        this.raw = raw;
        this._generalTags = {
            "type": BEER_TYPES,
            "filtration": BEER_FILTRATION,
            "periodicity": function () { return getLabeledTagValue(_this.raw.tags, "периодичность:"); },
            "origin": function () { return getLabeledTagValue(_this.raw.tags, "страна:"); },
            "made": function () { return getLabeledTagValue(_this.raw.tags, "производитель:"); },
            "alco": function () { return getLabeledTagValue(_this.raw.tags, "алкоголь:"); },
            "alcoRange": function () { return getRangeNameForValue((_this.alco || "").replace("%", ""), ALCO_RANGE_FILTER); },
            "priceRange": function () { return getRangeNameForValue(_this.raw.price, BEER_PRICE_RANGE_FILTER, true); }
        };
        this._importRaw();
    }
    Object.defineProperty(BeerProduct.prototype, "isValid", {
        get: function () {
            return this.emptyFields.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BeerProduct.prototype, "emptyFields", {
        get: function () {
            var _this = this;
            var fields = [];
            var validator = function (fieldValues, name) {
                if (!_this[name] && _this[name] !== 0) {
                    fields.push([name, fieldValues]);
                }
            };
            __WEBPACK_IMPORTED_MODULE_0_lodash__["forEach"](this._generalTags, validator),
                __WEBPACK_IMPORTED_MODULE_0_lodash__["forEach"](this.getCustomTags(), validator);
            return fields;
        },
        enumerable: true,
        configurable: true
    });
    // for child classes
    BeerProduct.prototype.getCustomTags = function () {
        return null;
    };
    ;
    BeerProduct.prototype._importRaw = function () {
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
    };
    BeerProduct.prototype._importTagsAndCalculatedValues = function (fieldsList) {
        if (!fieldsList)
            return;
        for (var fieldName in fieldsList) {
            var valuesToSearch = fieldsList[fieldName];
            if (typeof valuesToSearch == "function") {
                this[fieldName] = valuesToSearch.call(this);
            }
            else {
                this[fieldName] = this._findValueInTags(valuesToSearch);
            }
        }
    };
    BeerProduct.prototype._normalizeTags = function () {
        this.raw.tags = this.raw.tags.map(function (tag) { return tag.trim(); });
    };
    BeerProduct.prototype._findValueInTags = function (valuesSet) {
        var existingValues = this.raw.tags;
        for (var v in valuesSet) {
            if (existingValues.indexOf(v.toLowerCase()) > -1) {
                //same as "return v" by meaning, but better for type checking
                return valuesSet[v];
            }
        }
    };
    return BeerProduct;
}());

var BeerProductClassicClass = (function (_super) {
    __extends(BeerProductClassicClass, _super);
    function BeerProductClassicClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BeerProductClassicClass.prototype.getCustomTags = function () {
        var _this = this;
        return {
            style: BEER_STYLES,
            bitterness: function () { return getLabeledTagValue(_this.raw.tags, "горечь:"); }
        };
    };
    ;
    return BeerProductClassicClass;
}(BeerProduct));
var BeerProductFruitClass = (function (_super) {
    __extends(BeerProductFruitClass, _super);
    function BeerProductFruitClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BeerProductFruitClass.prototype.getCustomTags = function () {
        var _this = this;
        return {
            taste: function () { return getLabeledTagValue(_this.raw.tags, "вкус:"); }
        };
    };
    ;
    return BeerProductFruitClass;
}(BeerProduct));
var BeerProductCitClass = (function (_super) {
    __extends(BeerProductCitClass, _super);
    function BeerProductCitClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BeerProductCitClass.prototype.getCustomTags = function () {
        return {
            sugar: BEER_SUGAR,
            basis: BEER_BASIS
        };
    };
    ;
    return BeerProductCitClass;
}(BeerProduct));
var BeerFactory = function (raw) {
    var tags = raw.tags || [];
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
        console.error("Среди тегов - не найден никакой тип", raw);
    }
};
//# sourceMappingURL=BeerProduct.class.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsAndFaqProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loader_counter_loader_counter__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewsAndFaqProvider = (function () {
    function NewsAndFaqProvider(http, loadingCtrl) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
    }
    NewsAndFaqProvider.prototype._getData = function () {
        var _this = this;
        if (!this._dataPromise) {
            this.loadingCtrl.show();
            this._dataPromise = this.http.get('http://ffbeer.ru/rsst.php').toPromise()
                .then(function (result) {
                if (result['news'] || result['faq']) {
                    //no status available, so just check content
                    return result;
                }
                else {
                    console.error("Failed to get news/faq, bad data: ", result);
                    _this._dataPromise = null;
                }
            })
                .catch(function (e) {
                console.error("Failed to get news/faq: ", e);
                _this._dataPromise = null;
            })
                .then(function (result) {
                _this.loadingCtrl.hide();
                return result;
            });
        }
        return this._dataPromise;
    };
    NewsAndFaqProvider.prototype._postProcess = function (items) {
        var urlPrefix = 'http://ffbeer.ru';
        function _correctUrl(item, propertyName) {
            var propertyValue = (item[propertyName] || "").trim();
            if (propertyValue && propertyValue.indexOf(urlPrefix) === -1) {
                item[propertyName] = urlPrefix + propertyValue;
            }
        }
        items.forEach(function (item) {
            _correctUrl(item, 'detailPicture');
            _correctUrl(item, 'preview_picture');
        });
        return items;
    };
    NewsAndFaqProvider.prototype._getArticles = function (name) {
        var _this = this;
        return this._getData().then(function (result) {
            var articles = result[name] || [];
            var processed = _this._postProcess(articles);
            return processed;
        });
    };
    NewsAndFaqProvider.prototype.getNews = function () {
        return this._getArticles('news');
    };
    NewsAndFaqProvider.prototype.getFaq = function () {
        return this._getArticles('faq');
    };
    NewsAndFaqProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__loader_counter_loader_counter__["a" /* LoaderCounterProvider */]])
    ], NewsAndFaqProvider);
    return NewsAndFaqProvider;
}());

//# sourceMappingURL=news-and-faq.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderCounterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoaderCounterProvider = (function () {
    function LoaderCounterProvider(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
        this._count = 0;
    }
    LoaderCounterProvider.prototype.show = function () {
        if (this._count === 0) {
            this._loading = this.loadingCtrl.create({
                spinner: "dots"
            });
            this._presentPromise = this._loading.present();
        }
        this._count++;
        //this._loading.setContent(this._count + "+");
        return this._presentPromise;
    };
    LoaderCounterProvider.prototype.hide = function () {
        if (this._count === 0)
            return;
        this._count--;
        //this._loading.setContent(this._count + "-");
        if (this._count === 0) {
            return this._loading.dismiss();
        }
        else {
            return Promise.resolve(true);
        }
    };
    LoaderCounterProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], LoaderCounterProvider);
    return LoaderCounterProvider;
}());

//# sourceMappingURL=loader-counter.js.map

/***/ }),

/***/ 170:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 170;

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_iikoBizApi_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_confirm_code_confirm_code__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_md5__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__loader_counter_loader_counter__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__email_sender_email_sender__ = __webpack_require__(133);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Most apps have the concept of a UserManager. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This UserManager provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // UserManager fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
var UserManager = (function () {
    function UserManager(iikoBizApi, loadingCtrl, storage, modalCtrl, emailSender) {
        this.iikoBizApi = iikoBizApi;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.emailSender = emailSender;
        this.STORE_KEYS = {
            GUEST_LOGGED: 'guest_logged',
            LAST_PHONE_LOGGED: 'last_phone_logged',
            CARD_LOGGED: 'card_logged',
            GUEST_USER_INFO: '_guestInfo'
        };
        this._STORE_ON_LOGOUT = ['LAST_PHONE_LOGGED'];
        this._countryCode = '7';
        this._cache = {};
        this._defaultMessage = "Извините, произошла ошибка :( Попробуйте пожалуйста еще раз чуть позже ";
        this._noUserMessage = "Не удалось найти пользователя с таким телефоном и паролем";
        this._noCardMessage = "У пользователя отсутствует информация о пароле, обратитесь пожалуйста в поддержку";
        this.emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    UserManager.prototype._setCache = function (key, value) {
        this._cache[key] = value;
    };
    UserManager.prototype._getCache = function (key) {
        return this._cache[key];
    };
    ;
    UserManager.prototype.init = function () {
        //just for caching
        console.log("UserManager init");
        return this.getOrganizationAll();
    };
    UserManager.prototype.getOrganizationAll = function () {
        var _this = this;
        if (!this._getCache("_organizations")) {
            this.loadingCtrl.show();
            return this.iikoBizApi.api().organization.list.get()
                .then(function (result) {
                //todo process failure of getFirstOrganization
                //todo check with {code: null, description: null, httpStatusCode: 401, message: "Wrong access token"}
                if (result && result.status == 200) {
                    var organizations = result.body;
                    _this._setCache("_organizations", organizations);
                    console.log("Cached organisations: ", _this._getCache("_organizations"));
                }
                return _this._getCache("_organizations") || [];
            })
                .then(function (result) {
                _this.loadingCtrl.hide();
                return result;
            });
        }
        else {
            //todo deniso cache invalidation
            console.log("Organisations from cache: ", this._getCache("_organizations"));
            return Promise.resolve(this._getCache("_organizations"));
        }
    };
    UserManager.prototype.getOrganizationFirst = function () {
        return this.getOrganizationAll().then(function (result) {
            var organization = result[0];
            console.log("org: ", organization);
            return organization;
        });
    };
    UserManager.prototype.getPhoneNumberFormatted = function (phoneNumberRaw) {
        var phoneNumberCleared = (phoneNumberRaw || "").replace(/[^\d+]/g, '');
        var phoneNumberFull;
        switch (phoneNumberCleared.length) {
            case '9991234567'.length:
                phoneNumberFull = "+" + this._countryCode + phoneNumberCleared;
                break;
            case '79991234567'.length:
                phoneNumberFull = "+" + phoneNumberCleared;
                break;
            case '+79991234567'.length:
                phoneNumberFull = phoneNumberCleared;
                break;
            default:
                console.error("Ошибка в номере телефона: ", phoneNumberCleared);
        }
        return phoneNumberFull;
    };
    UserManager.prototype.authByPhone = function (phoneNumber) {
        var _this = this;
        this.loadingCtrl.show();
        return this.getOrganizationFirst().then(function (organization) {
            return _this.iikoBizApi.api().mobileIikoCard5.authenticatePhone.post({
                organizationId: organization.id,
                phoneNumber: phoneNumber
            });
        })
            .then(function (result) {
            _this.loadingCtrl.hide();
            return result;
        });
    };
    UserManager.prototype.getCustomerByPhone = function (phoneNumber) {
        var _this = this;
        this.loadingCtrl.show();
        return this.getOrganizationFirst().then(function (organization) {
            return _this.iikoBizApi.api().customers.getCustomerByPhone.get({
                organization: organization.id,
                phone: phoneNumber
            });
        })
            .then(function (x) {
            console.log(x);
            return x;
        })
            .then(function (result) {
            _this.loadingCtrl.hide();
            return result;
        });
    };
    UserManager.prototype.getUserGreeting = function () {
        var h = (new Date()).getHours();
        var greeting = '';
        if (h > 6 && h < 12) {
            greeting = 'Доброе утро';
        }
        else if (h >= 12 && h < 18) {
            greeting = 'Добрый день';
        }
        else if (h >= 18 && h <= 23) {
            greeting = 'Добрый вечер';
        }
        else {
            greeting = 'Доброй ночи';
        }
        return this.getLoggedUserInfo()
            .then(function (userInfo) { return greeting + (userInfo && userInfo.name ? ", " + userInfo.name : '') + '!'; });
    };
    UserManager.prototype.getLoggedCardInfo = function () {
        return this.storage.get(this.STORE_KEYS.CARD_LOGGED);
    };
    // cached, taken from localStorage
    UserManager.prototype.getLoggedUserInfo = function () {
        var _this = this;
        console.log("getLoggedUserInfo call");
        return this.storage.get(this.STORE_KEYS.GUEST_LOGGED).then(function (value) {
            console.log("getLoggedUserInfo result");
            console.log(_this.STORE_KEYS.GUEST_LOGGED + " = " + JSON.stringify(value));
            return value;
        });
    };
    // net request
    UserManager.prototype.getLoggedGuestInfo = function () {
        var _this = this;
        return this.getLoggedUserInfo()
            .then(function (userInfo) { return userInfo ? _this.getGuestInfoById(userInfo.id) : null; });
    };
    UserManager.prototype.setLastPhoneLogged = function (phone) {
        phone = this.getPhoneNumberFormatted(phone);
        return this.storage.set(this.STORE_KEYS.LAST_PHONE_LOGGED, phone);
    };
    UserManager.prototype.getLastPhoneLogged = function () {
        //return this.getLoggedUserInfo();
        return this.storage.get(this.STORE_KEYS.LAST_PHONE_LOGGED).then(function (value) {
            console.log('getLastPhoneLogged(): ', value);
            return value;
        });
    };
    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    UserManager.prototype.login = function (accountInfo, onUserSelection, onCardSelection) {
        var _this = this;
        var phoneNumber = this.getPhoneNumberFormatted(accountInfo.phone);
        return this.getCustomerByPhone(phoneNumber)
            .then(function (guestResponse) { return _this._processAuth(accountInfo, guestResponse, onCardSelection); });
        /*
          this.user.getCode(this.account).subscribe((resp) => {
          }, (err) => {
            //todo error message
        */
        /*
            let response = new Observable(observer => {
              setTimeout(() => {
                observer.next({
                  success: true,
                  user: {
                    name: 'Denis'
                  }
                })
              }, 500);
            });
    
            return response;
        */
    };
    UserManager.prototype._chooseCardIfMany = function (user, onCardSelection) {
        var cardsList = user.cards;
        var result = { user: user, card: null };
        // alert('todo - card selection');
        result.card = cardsList.pop();
        return Promise.resolve(result);
        /*
            if (cardsList.length < 2) {
            }
            else {
              return onCardSelection(user);
            }
        */
    };
    UserManager.prototype.enterCode = function (guest) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var confirmation = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_confirm_code_confirm_code__["a" /* ConfirmCodePage */]);
            confirmation.onDidDismiss(
            //todo handle reject
            function (data, role) {
                //todo deniso remove debug
                data = guest;
                data ? resolve(data) : reject();
            });
            confirmation.present();
        });
    };
    UserManager.prototype._checkPassword = function (accountInfo, card) {
        if (card) {
            var track = card.Track;
            if (track) {
                if (this.getPasswordValue(accountInfo.password) !== track) {
                    throw this._noUserMessage;
                }
            }
        }
        else {
            throw this._noCardMessage;
        }
    };
    UserManager.prototype._processAuth = function (accountInfo, result, onCardSelection) {
        var _this = this;
        if (result.status == 200) {
            var guest = result.body;
            return this._chooseCardIfMany(guest, onCardSelection)
                .then(function (userAndCard) {
                _this._checkPassword(accountInfo, userAndCard.card);
                _this.storage.set(_this.STORE_KEYS.GUEST_LOGGED, userAndCard.user);
                //todo set
                _this.storage.set(_this.STORE_KEYS.LAST_PHONE_LOGGED, userAndCard.user.phone);
                _this.storage.set(_this.STORE_KEYS.CARD_LOGGED, userAndCard.card);
                _this._setCache(_this.STORE_KEYS.CARD_LOGGED, userAndCard.card);
                return userAndCard;
            });
        }
        else {
            var exception = result.body.exception || "";
            var message = result.body.message;
            if (message) {
                var noUser = "There is no user with phone ";
                if (message.indexOf(noUser) === 0) {
                    message = this._noUserMessage;
                }
                else {
                    message = this._defaultMessage + (exception + " " + message).trim();
                }
            }
            else {
                message = this._defaultMessage;
            }
            console.log(result.body);
            throw message;
        }
    };
    UserManager.prototype.getQrCodeSource = function () {
        return (this._getCache(this.STORE_KEYS.CARD_LOGGED) || {}).id || "";
    };
    UserManager.prototype.getGuestInfoBatch = function (guestsList) {
        var _this = this;
        var guestsInfoPromises = guestsList.map(function (guest) { return _this.getGuestInfoById(guest.id); });
        return Promise.all(guestsInfoPromises);
    };
    UserManager.prototype.getGuestInfoById = function (guestId) {
        var _this = this;
        var guestInfoCacheKey = this.STORE_KEYS.GUEST_USER_INFO;
        var cachedUserInfo = this._getCache(guestInfoCacheKey);
        if (cachedUserInfo) {
            return Promise.resolve(cachedUserInfo);
        }
        else {
            this.loadingCtrl.show();
            return this.getOrganizationFirst()
                .then(function (organization) {
                return _this.iikoBizApi.api().customers.getCustomerById.get({ organization: organization.id, id: guestId });
            })
                .then(function (response) {
                _this._setCache(guestInfoCacheKey, response.body);
                console.log("guest info: ", _this._getCache(guestInfoCacheKey));
                return _this._getCache(guestInfoCacheKey);
            })
                .then(function (result) {
                _this.loadingCtrl.hide();
                return result;
            });
        }
    };
    UserManager.prototype.getCode = function (accountInfo) {
        // example of observable stub
        var response = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"](function (observer) {
            setTimeout(function () {
                observer.next({
                    success: true,
                    user: {
                        name: 'Denis'
                    }
                });
            }, 500);
        });
        return response;
    };
    UserManager.prototype.confirmCode = function (accountInfo) {
        var response = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"](function (observer) {
            setTimeout(function () {
                observer.next({
                    success: true,
                    user: {
                        name: 'Denis'
                    }
                });
            }, 500);
        });
        return response;
    };
    /**
     * Log the user out, which forgets the session
     */
    UserManager.prototype.logout = function () {
        var clearingPromises = [];
        for (var key in this.STORE_KEYS) {
            if (this._STORE_ON_LOGOUT.indexOf(key) != -1) {
                continue;
            }
            console.log(key + " is cleared");
            var p = this.storage.remove(this.STORE_KEYS[key]);
            clearingPromises.push(p);
        }
        //todo deniso send smth to server?
        var promisesBatch = Promise.all(clearingPromises);
        return promisesBatch;
    };
    UserManager.prototype.getPasswordValue = function (password) {
        return __WEBPACK_IMPORTED_MODULE_7_md5__(password);
    };
    UserManager.prototype._createOrUpdate = function (account) {
        var _this = this;
        var phone = this.getPhoneNumberFormatted(account.phone);
        var customer = {
            name: account.name,
            phone: phone,
            //todo remove temp hack
            magnetCardTrack: this.getPasswordValue(account.password),
            magnetCardNumber: phone,
            birthday: "1999-01-01",
            email: account.email,
            middleName: "",
            surName: account.surname || "",
            sex: 0,
        };
        this.loadingCtrl.show();
        return this.getOrganizationFirst()
            .then(function (organization) {
            return _this.iikoBizApi.api().customers.createOrUpdate.post({ organization: organization.id, customer: customer });
        })
            .then(function (result) {
            _this.loadingCtrl.hide();
            return result;
        });
    };
    UserManager.prototype.registerUser = function (account) {
        var _this = this;
        var phone = this.getPhoneNumberFormatted(account.phone);
        return this.getCustomerByPhone(phone).then(function (customerResponse) {
            if (customerResponse.status == 200) {
                throw "Пользователь с номером " + phone + " уже зарегистрирован";
            }
            return _this._createOrUpdate(account);
        });
    };
    UserManager.prototype.updatePassword = function (phoneRaw, newPassword) {
        var _this = this;
        var phone = this.getPhoneNumberFormatted(phoneRaw);
        return this.getCustomerByPhone(phone).then(function (customerResponse) {
            if (customerResponse.status != 200) {
                throw "Пользователь не найден";
            }
            var account = {
                email: customerResponse.body.email,
                phone: customerResponse.body.phone,
                name: customerResponse.body.name,
                password: newPassword
            };
            return _this._createOrUpdate(account);
        });
    };
    UserManager.prototype.getRandomCode = function () {
        var maxCode = 9999;
        var minCode = 1000;
        var code = Math.floor(Math.random() * (maxCode - minCode) + minCode);
        return code;
    };
    UserManager.prototype.sendRecoveryCode = function (phoneRaw) {
        var _this = this;
        var phone = this.getPhoneNumberFormatted(phoneRaw);
        return this.getCustomerByPhone(phone).then(function (customerResponse) {
            if (customerResponse.status !== 200) {
                throw "Пользователь с номером " + phone + " не найден";
            }
            var recoveryCode = _this.getRandomCode();
            var email = customerResponse.body.email || "";
            if (!_this.isEmailValid(email)) {
                return { status: 0, emptyEmail: true };
            }
            var messageParams = {
                "to_addr": email,
                recoveryCode: recoveryCode,
            };
            return _this.emailSender.send("password_recovery", messageParams)
                .then(function () {
                return { status: 200, recoveryCode: recoveryCode, email: email };
            })
                .catch(function () {
                return { status: 0, msg: "Не удалось отправить письмо" };
            });
            //return this._createOrUpdate(account)
        });
    };
    UserManager.prototype.isEmailValid = function (email) {
        return email && this.emailRegEx.test(email);
    };
    UserManager = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_iikoBizApi_service__["a" /* iikoBizApi */],
            __WEBPACK_IMPORTED_MODULE_8__loader_counter_loader_counter__["a" /* LoaderCounterProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_9__email_sender_email_sender__["a" /* EmailSenderProvider */]])
    ], UserManager);
    return UserManager;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 212:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 212;

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmCodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
import { MainPage } from '../../pages/pages';
import { ConfirmCode } from '../../pages/pages';

*/
var ConfirmCodePage = (function () {
    // Our translated text strings
    //private loginErrorString: string;
    function ConfirmCodePage(navCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        // The account fields for the login form.
        // If you're using the username field with or without email, make
        // sure to add it to the type
        this.account = {
            phone: '+7 (999) 1234567',
            code: '1234',
            email: 'test@example.com',
            password: 'test'
        };
        /*
            this.translateService.get('LOGIN_ERROR').subscribe((value) => {
              this.loginErrorString = value;
            })
        */
    }
    ConfirmCodePage.prototype.doLogin = function () {
        this.viewCtrl.dismiss();
    };
    ConfirmCodePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/confirm_code/confirm_code.html"*/'<ion-header>\n\n</ion-header>\n\n\n<ion-content>\n  <img class="loginLogo" src="./assets/img/logo.png">\n  <form (submit)="doLogin()">\n    <p class="confirmCode">SMS с паролем отправлена на ваш номер<br>введите новый пароль в форму ниже</p>\n\n    <ion-list>\n      <ion-item id="accountCodeWrapper">\n        <!--<ion-label fixed></ion-label>-->\n        <ion-input text-center [(ngModel)]="account.code" name="code" id="accountCode"></ion-input>\n      </ion-item>\n\n      <div padding>\n        <button id="enterButtonCode" ion-button color="white" block>{{ \'ВХОД\' }}</button>\n      </div>\n\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/confirm_code/confirm_code.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], ConfirmCodePage);
    return ConfirmCodePage;
}());

//# sourceMappingURL=confirm_code.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_nomenclatureProvider__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__category_category__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loader_counter_loader_counter__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListPage = (function () {
    function ListPage(nomenclatureProvider, loadingCtrl, navCtrl) {
        this.nomenclatureProvider = nomenclatureProvider;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.query = "";
        this.pageTitle = 'Каталог';
        this.products = null;
        this.productGroups = null;
    }
    ListPage.prototype.ngOnInit = function () {
        this.populate();
    };
    ListPage.prototype.populate = function () {
        // todo deniso thumbnail-list with categories images
        // https://ionicframework.com/docs/components/#thumbnail-list
        var _this = this;
        // todo loader
        this.nomenclatureProvider.getAll()
            .then(function (_p) { return _this.products = _p; });
        this.nomenclatureProvider.productGroupsTree().
            then(function (result) {
            console.table(result);
            _this.productGroups = result;
        });
        //todo .catch(this.handleError)
    };
    ListPage.prototype.getFilter = function () {
        var self = this;
        return function (item) {
            if (self.query) {
                var queryTrimmed = self.query.trim().toLowerCase();
                return queryTrimmed && item.name.toLowerCase().indexOf(queryTrimmed) != -1;
            }
        };
    };
    ListPage.prototype.openCategory = function (group) {
        var _this = this;
        this.loadingCtrl.show();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__category_category__["a" /* CategoryPage */], { group: group })
            .then(function (result) {
            _this.loadingCtrl.hide();
            return result;
        });
    };
    ListPage.prototype.getImage = function (group) {
        var data = group;
        var image = data.images && data.images[0] && data.images[0].imageUrl;
        return image;
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-list',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n    <ion-title>{{pageTitle}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid class="catalog">\n    <ion-row>\n      <ion-col col-12>\n        <ion-item id="searchByName">\n          <!-- todo deniso set value="Mort" to  debug wishlist / basket -->\n          <ion-input type="text" placeholder="Поиск по названию" value="" [(ngModel)]="query"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid *ngIf="productGroups && !query" class="catalog">\n    <ion-row *ngFor="let group of productGroups">\n      <ion-col class="catalog_group" text-right col-12 (click)="openCategory(group)" tappable\n               [ngStyle]="{\'background-image\' : \'url(\' + getImage(group) + \')\', \'background-size\': \'cover\', \'background-position\': \'center\'}"\n      >\n<!--{{group.name}} ({{group._products.length}})-->\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <products-list *ngIf="products && query" [products]="products" [filter]="getFilter()"></products-list>\n\n  <!--\n    <ion-list>\n      <ion-item *ngFor="let p of productCategories">\n        &lt;!&ndash; todo deniso category img &ndash;&gt;\n        <ion-icon large item-start name="beer"></ion-icon>\n        <h2>{{ p.name }}</h2>\n        <button  *ngIf="p._products.length" (click)="openCategory(p)" ion-button clear item-end>View</button>\n      </ion-item>\n    </ion-list>\n  -->\n\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_nomenclatureProvider__["a" /* NomenclatureProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loader_counter_loader_counter__["a" /* LoaderCounterProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CategoryPage = (function () {
    function CategoryPage(navParams) {
        this.navParams = navParams;
        this.pageTitle = 'Категория';
        this.nomenclature = null;
    }
    CategoryPage.prototype.ionViewDidEnter = function () {
        this.group = this.navParams.get('group');
        this.products = this.group._products;
    };
    CategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-category',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/category/category.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n    <ion-title>{{pageTitle}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <products-list [products]="products"></products-list>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/category/category.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], CategoryPage);
    return CategoryPage;
}());

//# sourceMappingURL=category.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSelectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserSelectionPage = (function () {
    function UserSelectionPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.usersList = [];
        this.usersList = this.navParams.get('usersList');
    }
    UserSelectionPage.prototype.selectUser = function (user) {
        this.viewCtrl.dismiss(user);
    };
    UserSelectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-user-selection',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/user-selection/user-selection.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Выберите пользователя</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <user-selection [usersList]="usersList" (onSelectUser)="selectUser($event)"></user-selection>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/user-selection/user-selection.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], UserSelectionPage);
    return UserSelectionPage;
}());

//# sourceMappingURL=user-selection.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminkaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_iikoBizApi_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminkaPage = (function () {
    function AdminkaPage(navCtrl, navParams, appVersion, iikoBizApi, device) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appVersion = appVersion;
        this.iikoBizApi = iikoBizApi;
        this.device = device;
        this.appName = null;
        this.packageName = null;
        this.versionCode = null;
        this.versionNumber = null;
        this.window = window;
    }
    AdminkaPage.prototype.ngOnInit = function () {
        this.getAppVersion();
        this.lastReqId = '';
    };
    AdminkaPage.prototype.getAppVersion = function () {
        var _this = this;
        this.appVersion.getAppName()
            .then(function (x) { return _this.appName = x; });
        this.appVersion.getPackageName()
            .then(function (x) { return _this.packageName = x; });
        this.appVersion.getVersionCode()
            .then(function (x) { return _this.versionCode = x; });
        this.appVersion.getVersionNumber()
            .then(function (x) { return _this.versionNumber = x; });
    };
    AdminkaPage.prototype.getApiUserSecret = function () {
        var s = this.iikoBizApi.getUserSecrets();
        var result = "\"" + s.user_id + "\" / \"" + s.user_secret + "\"";
        return result;
    };
    AdminkaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdminkaPage');
    };
    AdminkaPage.prototype.chooseBackground = function (bgNumber) {
        var styleEl = document.createElement('style'), styleSheet;
        document.head.appendChild(styleEl);
        styleSheet = styleEl.sheet;
        styleSheet.insertRule(".content {  background: url(\"./assets/img/bg" + bgNumber + ".png\"); background-size: cover;}", styleSheet.cssRules.length);
    };
    AdminkaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-adminka',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/adminka/adminka.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Вы нашли скрытый уровень! :)</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <b>App version</b>\n  <ion-grid>\n<!--\n    <ion-row>\n      <ion-col>appName</ion-col><ion-col>{{appName}}</ion-col>\n    </ion-row>\n-->\n    <ion-row>\n      <ion-col>packageName</ion-col><ion-col>{{packageName}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>versionCode</ion-col><ion-col>{{versionCode}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>versionNumber</ion-col><ion-col>{{versionNumber}}</ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <b>Device info</b>\n  <ion-grid>\n    <ion-row>\n      <ion-col>Model</ion-col><ion-col>{{device.manufacturer}} - {{device.model}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>OS version</ion-col><ion-col>{{device.platform}} - {{device.version}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>Cordova</ion-col><ion-col>{{device.cordova}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>Resolution</ion-col><ion-col>{{window.screen.width}}px * {{window.screen.height}}px x{{window.devicePixelRatio}}</ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <b>API info</b>\n  <ion-grid>\n    <ion-row>\n      <ion-col>API user/secret</ion-col><ion-col>{{getApiUserSecret()}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>Last request id</ion-col><ion-col>{{lastReqId}}</ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-card class="bg_select bg_select_1">\n    <ion-card-content>\n      <button (click)="chooseBackground(1)" ion-button block>Выбрать фон</button>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card class="bg_select bg_select_2">\n    <ion-card-content>\n      <button (click)="chooseBackground(2)" ion-button block>Выбрать фон</button>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card class="bg_select bg_select_3">\n    <ion-card-content>\n      <button (click)="chooseBackground(3)" ion-button block>Выбрать фон</button>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/adminka/adminka.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__["a" /* AppVersion */],
            __WEBPACK_IMPORTED_MODULE_3__providers_iikoBizApi_service__["a" /* iikoBizApi */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_device__["a" /* Device */]])
    ], AdminkaPage);
    return AdminkaPage;
}());

//# sourceMappingURL=adminka.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rules_rules__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_beer_alert_beer_alert__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegistrationPage = (function () {
    function RegistrationPage(user, navCtrl, beerAlert) {
        this.user = user;
        this.navCtrl = navCtrl;
        this.beerAlert = beerAlert;
        this.account = {
            phone: '',
            email: '',
            password: '',
            name: '',
            surname: ''
        };
        this.ZabirayMenyaSkoreyUvoziZaStoMorey = false;
        this.personalDataOk = false;
        this.rulesOk = false;
    }
    RegistrationPage.prototype.doRegister = function () {
        //todo deniso replace with angular validation
        var _this = this;
        if (!this.account.phone || this.account.phone.trim().length != 10) {
            return this.beerAlert.alert("Введите пожалуйста номер телефона, в формате 9991234567");
        }
        if (!this.account.name) {
            return this.beerAlert.alert("Введите пожалуйста ваше имя");
        }
        if (!this.account.surname) {
            return this.beerAlert.alert("Введите пожалуйста вашу фамилию");
        }
        if (!this.user.isEmailValid(this.account.email)) {
            return this.beerAlert.alert("Введите пожалуйста корректный email");
        }
        if (!this.account.password || (this.account.password.trim().length < 4)) {
            return this.beerAlert.alert("Введите пожалуйста пароль, минимум 4 символа");
        }
        if (!this.ZabirayMenyaSkoreyUvoziZaStoMorey) {
            return this.beerAlert.alert("Регистрация возможна только для лиц старше 18 лет");
        }
        if (!this.personalDataOk) {
            return this.beerAlert.alert("Для регистрации требуется Ваше согласие на обработку персональных данных");
        }
        return this.user.registerUser(this.account).then(function (response) {
            if (response.status == 200) {
                _this.user.setLastPhoneLogged(_this.account.phone);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */])
                    .then(function (_) { return _this.beerAlert.alert('Регистрация прошла успешно, теперь вы можете войти в приложение'); });
            }
            else {
                return _this.beerAlert.alert('Произошла ошибка, пожалуйста попробуйте еще раз');
            }
        }).catch(function (e) {
            return _this.beerAlert.alert("Ошибка: " + e);
        });
    };
    RegistrationPage.prototype.showRules = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__rules_rules__["a" /* RulesPage */]);
    };
    RegistrationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-registration',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/registration/registration.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <img class="loginLogo" src="./assets/img/logo.png">\n  <form id="registrationForm" (submit)="doRegister()">\n    <ion-list>\n\n      <ion-item class="bordered" id="numberPhone">\n        <ion-label no-padding>+7</ion-label>\n        <ion-input mask="(999) 999-9999" no-padding type="tel" [(ngModel)]="account.phone" name="phone"\n                   text-left placeholder="введите телефон" required></ion-input>\n      </ion-item>\n\n      <ion-item class="bordered" id="name">\n        <ion-input no-padding [(ngModel)]="account.name" name="name"\n                   text-left placeholder="введите имя" required></ion-input>\n      </ion-item>\n\n      <ion-item class="bordered" id="surname">\n        <ion-input no-padding [(ngModel)]="account.surname" name="surname"\n                   text-left placeholder="введите фамилию" required></ion-input>\n      </ion-item>\n\n      <ion-item class="bordered" id="email">\n        <ion-input no-padding [(ngModel)]="account.email" name="email"\n                   text-left placeholder="введите email" required></ion-input>\n      </ion-item>\n\n      <ion-item class="bordered" id="password">\n        <!-- label made specially to align login and pwd fields -->\n<!--\n        <ion-label no-padding style="visibility: hidden">+7</ion-label>\n-->\n        <ion-input no-padding [(ngModel)]="account.password" name="password"\n                   text-left placeholder="введите пароль"></ion-input>\n      </ion-item>\n\n      <ion-item class="checkboxable">\n        <ion-label>Я подтверждаю, что мне есть 18 лет</ion-label>\n        <ion-checkbox [(ngModel)]="ZabirayMenyaSkoreyUvoziZaStoMorey" name="ZabirayMenyaSkoreyUvoziZaStoMorey"></ion-checkbox>\n      </ion-item>\n\n      <ion-item class="checkboxable">\n        <ion-label>Я даю согласие на обработку персональных данных</ion-label>\n        <ion-checkbox [(ngModel)]="personalDataOk" name="personalDataOk"></ion-checkbox>\n      </ion-item>\n    </ion-list>\n    <div class="standard-font">\n      Регистрируясь вы подтверждаете свое согласие с <a (click)="showRules()">правилами сервиса</a>\n    </div>\n\n    <div>\n      <button id="enterButton" ion-button color="white" block>Зарегистрироваться</button>\n    </div>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/registration/registration.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_user__["a" /* UserManager */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_beer_alert_beer_alert__["a" /* BeerAlertProvider */]])
    ], RegistrationPage);
    return RegistrationPage;
}());

//# sourceMappingURL=registration.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RulesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the RulesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RulesPage = (function () {
    function RulesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RulesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RulesPage');
    };
    RulesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-rules',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/rules/rules.html"*/'<!--\n  Generated template for the RulesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Правила сервиса</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div class="center">\n\n\n    <h1>\n      ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ</h1>\n    <p>\n      Данное пользовательское соглашение (далее – Соглашение) определяет условия приобретения Товара согласно ассортименту, указанному на сайте <a href="http://beerculture.ru/">http://beerculture.ru</a>\n      либо в мобильном приложении, и составлено с учетом требований Федерального закона от 13 марта 2006 года № 38-Ф3 «О рекламе». Данное пользовательское соглашение не является рекламой алкогольной продукции. Сайт <a href="http://beerculture.ru/">beerculture.ru</a>\n      создан для информирования Клиентов об ассортименте Магазинов и учета мнения Клиентов о Товаре с целью оптимизации ассортимента или иных условий продаж в Магазинах под спрос Клиентов, получения заявок, а также сбора статистической информации.\n    </p>\n    <p>\n    </p>\n    <p>\n      1. Основные термины:\n    </p>\n    <p>\n      Клиент: физическое лицо, имеющее намерение оформить и/или оформляющее Заявки, представленные на сайте <a href="http://beerculture.ru/">beerculture.ru</a>\n      и в Приложении, и обладающее необходимым объемом дееспособности в соответствии с законодательством РФ.\n    </p>\n    <p>\n      Продавец: администрация сайта, осуществляющая деятельность по консультациям в алкогольной тематике, в том числе относительно алкогольной продукции и производителей, точек продаж в РФ, а также услуг по доставке алкогольной продукции на основании доверенности.\n    </p>\n    <p>\n      Заявка: должным образом оформленный запрос Клиента, содержащий пожелания Клиента об ассортименте Товара и других свойствах Товара, который Клиент желал бы приобрести в Магазинах Продавцов. Заявка служит для получения Клиентом информации о точной цене Товара и его наличия в Магазинах Продавца. Заявка не влечет возникновения обязательств, связанных с куплей-продажей Товара, а носит информационный характер и учитывается для оптимизации ассортимента Магазинов.\n    </p>\n    <p>\n      Магазин: розничные магазины по продаже алкогольной продукции, принадлежащие Продавцу.\n    </p>\n    <p>\n      Товар: Продукция из ассортимента, представленного на Сайте и в Приложении, в отношении которой осуществляется Заявка.\n    </p>\n    <p>\n      Акционный Товар: Продукция из ассортимента, представленного на сайте, на приобретение которой в течение установленного Продавцами срока распространяются специальные предложения.\n    </p>\n    <p>\n      Сайт: <a href="http://beerculture.ru/">http://beerculture.ru</a>, созданный с целью ознакомления Клиентов с алкогольной продукцией, её производителями, получения Заявок и с целью сбора статистических данных о Товаре для дальнейшей оптимизации ассортимента.\n    </p>\n    <p>\n      Приложение: <a href="http://beerculture.ru/">м</a>обильное приложение Beer Culture для iOs и Android, созданно с целью ознакомления Клиентов с алкогольной продукцией, её производителями, получения Заявок и с целью сбора статистических данных о Товаре для дальнейшей оптимизации ассортимента.\n    </p>\n    <p>\n    </p>\n    <p>\n    </p>\n    <p>\n      2. Общие положения.\n    </p>\n    <p>\n      2.1. Перечень Товара, указанного на сайте (образцы продукции), представлен для ознакомления и не предназначен для реализации посредством дистанционных сделок купли-продажи. Сделки купли-продажи осуществляются на территории розничных магазинов лично Клиентом либо его представителем по доверенности, возможна доставка алкогольной продукции на основании доверенности.\n    </p>\n    <p>\n      2.2. Направляя заявки через Cайт либо Приложение, Клиент соглашается с Правилами Сайта (далее — Условия), изложенными ниже. Настоящее соглашение, представленное на Сайте, является публичной офертой в соответствии со ст. 435 и ч. 2 ст. 437 ГК РФ. Местом продажи Товаров является территория Магазинов Продавца. Продавец оставляет за собой право вносить изменения в настоящее Соглашение.\n    </p>\n    <p>\n    </p>\n    <p>\n      3. Порядок оформления Заявки.\n    </p>\n    <p>\n      3.1. Для оформления Заявки Клиент самостоятельно заполняет регистрационную форму, указанную на Сайте или в Приложении. Клиент может подать заявку и через телефон. Регистрация на сайте либо в Приложении и оформление Заявки, в том числе по телефону, является акцептом и подразумевает под собой полное и безоговорочное согласие Клиента с условиями данного Соглашения. В случае несогласия, Клиент лишается возможности оформления заявок.\n    </p>\n    <p>\n      3.2. Продавец имеет право отказать Покупателю в регистрации либо аннулировать его регистрацию без указания причин.\n    </p>\n    <p>\n      3.3. При оформлении Заявки на Сайте либо в Приложении Клиент предоставляет следующую информацию и соглашается на её использование, обработку и хранение: Фамилия, Имя, адрес электронной почты, контактный телефон, дату рождения. Клиент, указывая на сайте при регистрации свои контактные данные, понимает, что вносимые им данные не являются персональными данными, идентифицирующими Клиента на основании п.1 ст.8 Федерального Закона от 27.07.2006 N 152-ФЗ в ред. Федерального закона от 25.07.2011 N 261-ФЗ, т.е. предоставляются Продавцу в обезличенной форме, добровольно, и в объеме, необходимом и достаточном для исполнения обязательств перед Клиентом. Продавец использует предоставленную информацию для выполнения своих обязательств перед Клиентом в соответствии и на основании Федерального Закона от 27.07.2006 N 152-ФЗ в ред. Федерального закона от 25.07.2011 N 261-ФЗ. Клиент соглашается на передачу Продавцу предоставленной информации агентам и третьим лицам, действующим на основании договоров с Продавцом, для исполнения перед Клиентом обязательств, возникающих из настоящего соглашения и подаваемых через сайт и путем телефонного звонка заявок. Не считается нарушением обязательств разглашение информации в соответствии с обоснованными и применимыми требованиями закона. Клиент соглашается на передачу Продавцу своих данных в целях исполнения заключаемых договоров, в том числе настоящего Соглашения, и принимаемых Продавцом в соответствии с ними обязательств по продаже Клиенту Товара. Согласие Клиента выражается в указании им информации в соответствующих графах при оформлении Заявки. Продавец не несет ответственности за сведения, предоставленные Клиентом на Сайте в общедоступной форме.\n    </p>\n    <p>\n      3.4. Заявка оформляется Клиентом самостоятельно путем заполнения соответствующих граф, либо предоставлением данных Продавцу по телефону. Клиент несет ответственность за достоверность данных, указанных при оформлении Заявки.\n    </p>\n    <p>\n      3.5. В течение 2-х рабочих дней с момента получения Заявки представитель Продавца может связываться с Клиентом для получения уточненной информации по Заявке. На основании заявки Клиента, Продавец может порекомендовать и направить к Клиенту лиц, оказывающих услуги по представлению интересов Клиента с целью заключения договора купли-продажи Товара. В случае согласия Клиента и предварительного непосредственного ознакомления Клиента с Товаром, Клиент может оформить доверенность на своего представителя для совершения в сделки купли-продажи Товара от имени и за счет Клиента.\n    </p>\n    <p>\n    </p>\n    <p>\n      4. Передача Товара.\n    </p>\n    <p>\n      4.1. Приобретение Товара осуществляется на территории магазинов лично Клиентом либо его представителем, действующим на основании доверенности, и включает в себя непосредственное ознакомление с Товаром на территории магазина.\n    </p>\n    <p>\n      4.2. Приобретая Товар в магазинах, Клиент может оформить его доставку.\n    </p>\n    <p>\n      4.3. Продавец не несет ответственности за задержки в доставке Товара, вызванные форс-мажорными обстоятельствами.\n    </p>\n    <p>\n      4.5. Переход права собственности на Товар осуществляется в соответствии с условиями заключенного между Клиентом и Продавцом договора купли-продажи.\n    </p>\n    <p>\n    </p>\n    <p>\n      5. Порядок осуществления оплаты заказанного Товара.\n    </p>\n    <p>\n      5.1. На сайте либо в приложении указывается стоимость Товара без учета стоимости доставки.\n    </p>\n    <p>\n      5.2. Стоимость Товара указывается в российских рублях, которые также являются валютой платежа.\n    </p>\n    <p>\n      5.3. Оплата стоимости Товара может производиться наличным расчетом в момент совершения покупки в магазине Продавца либо путем перечисления предоплаты при помощи банковских карт Visa либо MasterCard.\n    </p>\n    <p>\n      5.4. Для оплаты заказа банковской картой Клиент обязуется по требованию Продавца предоставить ксерокопии двух страниц паспорта ее владельца с фотографией и копию обеих сторон банковской карты для проверки личности владельца и правомочности лица, осуществляющего операцию согласно Правилам международных платежных систем. Из соображений безопасности необходимо скрывать номер карты, за исключением последних четырех цифр.\n    </p>\n    <p>\n    </p>\n    <p>\n      6. Отказ от получения Товара.\n    </p>\n    <p>\n      6.1. Согласно норм Постановления Правительства РФ от 19.01.1998 года № 55 в действующей редакции данный Товар входит в перечень товаров, не подлежащих возврату и обмену. В случае возникновения спорных вопросов относительно качества Товара необходимо обращаться в магазин либо по электронному адресу <a href="mailto:info@beerculture.ru">info@beerculture.ru</a> , с указанием контактных данных Клиента и данных Заявки.\n    </p>\n    <p>\n      6.2. Клиент имеет право полностью либо частично отказаться от Товара в момент его получения. При отказе от получения Товара вследствие наличия внешних повреждений либо несоответствия Товара заказанному стоимость доставки не оплачивается. В случае отказа от получения Товара по иным причинам, не вызванным виной Продавца, стоимость доставки подлежит оплате.\n    </p>\n    <p>\n    </p>\n    <p>\n      7. Рассылки и оповещения.\n    </p>\n    <p>\n      7.1. Оформление Заявки и/или регистрация на сайте считается согласием Клиента на получение от Продавца уведомлений и рассылок, носящих информационный или рекламный характер.\n    </p>\n    <p>\n      7.2. Рассылки могут содержать данные об Акционном товаре, розыгрышах или иных мероприятиях, проводимых Продавцом, а также информационные материалы о различных товарах, производителях и иная информация. Рассылки направляются на электронный адрес либо телефон, указанный Клиентом при регистрации.\n    </p>\n    <p>\n      7.3. Регулировка параметров рассылки осуществляется посредством письменных обращений на электронный адрес: <a href="mailto:info@beerculture.ru">info@beerculture.ru</a>.\n    </p>\n    <p>\n      7.4. Предоставление Клиентом или пользователем Сайта своих контактных данных Продавцу при оформлении Заявки на Сайте либо путем телефонного звонка, а также при подписке на рассылку информационных материалов, заказа обратного звонка и других действий, лицо подтверждает свою дееспособность, в том числе достижение им 18 лет. &nbsp;\n    </p>\n    <p>\n    </p>\n    <p>\n      8. Разрешение споров.\n    </p>\n    <p>\n      8.1. Все возможные споры, вытекающие из данного Соглашения либо связанные с ним, решаются путем переговоров Сторон.\n    </p>\n    <p>\n      8.2. При невозможности достижения согласия споры подлежат разрешению в соответствии с действующим законодательством Российской Федерации.\n    </p>\n    <p>\n    </p>\n    <p>\n      9. Заключительные положения.\n    </p>\n    <p>\n      9.1. Данное Соглашение регулируется и толкуется в соответствии с действующим законодательством Российской Федерации. Все вопросы, не урегулированные данным соглашением, подлежат разрешению согласно законодательству Российской Федерации.\n    </p>\n    <p>\n      9.2. Данное Соглашение вступает в силу для Клиента с момента регистрации на сайте и действует в течение неопределенного срока.\n    </p>\n    <p>\n      9.3. Если по каким-либо причинам один либо несколько пунктов данного Соглашения утратят юридическую силу либо будут признаны недействительными, это не повлияет на действительность остальных положений Соглашения.\n    </p>\n    <p>\n      9.4. Продавец оставляет за собой право вносить изменения в данное Соглашение в одностороннем порядке.\n    </p>\n    <p>\n      <br>\n    </p>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/rules/rules.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], RulesPage);
    return RulesPage;
}());

//# sourceMappingURL=rules.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordRecoveryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loader_counter_loader_counter__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_beer_alert_beer_alert__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PasswordRecoveryPage = (function () {
    function PasswordRecoveryPage(navCtrl, navParams, user, beerAlert, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = user;
        this.beerAlert = beerAlert;
        this.loadingCtrl = loadingCtrl;
        this.tryTimeoutSeconds = 60;
    }
    PasswordRecoveryPage.prototype.ionViewWillEnter = function () {
        this.phone = this.navParams.get('phone');
    };
    PasswordRecoveryPage.prototype.sentCode = function () {
        var _this = this;
        this.loadingCtrl.show();
        return this.user.sendRecoveryCode(this.phone).then(function (response) {
            if (response.status == 200) {
                _this.codeSent = response.recoveryCode;
                _this.email = response.email;
                _this.runTryTimeout();
            }
            else {
                if (response.emptyEmail) {
                    return _this.beerAlert.alert('Для восстановления пароля - обратитесь пожалуйста к сотруднику на кассе ресторана');
                }
                else {
                    return _this.beerAlert.alert('Произошла ошибка, пожалуйста попробуйте еще раз');
                }
            }
        })
            .catch(function (e) {
            return _this.beerAlert.alert("Ошибка: " + e);
        })
            .then(function (_) { return _this.loadingCtrl.hide(); });
    };
    PasswordRecoveryPage.prototype.runTryTimeout = function () {
        var _this = this;
        this.tryTimeoutCountdownSeconds = this.tryTimeoutSeconds;
        this.tryTimeoutId = setInterval(function () {
            _this.tryTimeoutCountdownSeconds--;
            if (_this.tryTimeoutCountdownSeconds <= 0) {
                _this.clearTryTimeout();
            }
        }, 1000);
    };
    PasswordRecoveryPage.prototype.clearTryTimeout = function () {
        clearInterval(this.tryTimeoutId);
        this.tryTimeoutId = 0;
        this.tryTimeoutCountdownSeconds = 0;
    };
    PasswordRecoveryPage.prototype.giveNextTry = function () {
        this.codeSent = 0;
    };
    PasswordRecoveryPage.prototype.resetPassword = function () {
        var _this = this;
        if (!this.codeEntered) {
            return this.beerAlert.alert('Пожалуйста введите код подтверждения из письма');
        }
        if (this.codeEntered != this.codeSent) {
            return this.beerAlert.alert('Введен неверный код подтверждения');
        }
        if (!this.password || (this.password.trim().length < 4)) {
            return this.beerAlert.alert("Введите пожалуйста пароль, минимум 4 символа");
        }
        this.user.updatePassword(this.phone, this.password).then(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */])
                .then(function (_) { return _this.beerAlert.alert('Пароль изменен, теперь вы можете войти в приложение'); });
        });
    };
    PasswordRecoveryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-password-recovery',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/password-recovery/password-recovery.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <img class="loginLogo" src="./assets/img/logo.png">\n  <form *ngIf="!codeSent" class="beerForm" (submit)="sentCode()">\n    <ion-list>\n      <ion-item class="bordered" id="numberPhone">\n        <ion-label no-padding>+7</ion-label>\n        <ion-input mask="(999) 999-9999" no-padding type="tel" [(ngModel)]="phone" name="phone"\n                   text-left placeholder="введите телефон" required></ion-input>\n      </ion-item>\n      <!--<div padding class="standard-font">Код будет отправлен на адрес электронной почты указанный вами при регистрации</div>-->\n      <div>\n        <button class="enterButton" ion-button color="white" block>Отправить код на email</button>\n      </div>\n    </ion-list>\n  </form>\n\n  <form *ngIf="codeSent" class="beerForm" (submit)="resetPassword()">\n    <ion-list>\n      <ion-item class="bordered" id="resetCode">\n        <ion-label no-padding>Код из письма</ion-label>\n        <ion-input no-padding [(ngModel)]="codeEntered" name="code"\n                   text-left placeholder="введите код"></ion-input>\n      </ion-item>\n\n      <ion-item class="bordered" id="password">\n        <ion-label no-padding>Новый пароль</ion-label>\n        <ion-input no-padding [(ngModel)]="password" name="password"\n                   text-left placeholder="введите пароль"></ion-input>\n      </ion-item>\n\n      <div>\n        <button class="enterButton" ion-button color="white" block>Сменить пароль</button>\n      </div>\n    </ion-list>\n  </form>\n\n  <div padding *ngIf="tryTimeoutId">\n    Код отправлен на почту <b>{{email}}</b>.<br/><br/>\n    Через <b>{{tryTimeoutCountdownSeconds}}</b> секунд вы сможете отправить код повторно.\n  </div>\n\n  <div padding *ngIf="!tryTimeoutId && codeSent">\n    <a (click)="giveNextTry()" href="#">Отправить код еще раз</a>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/password-recovery/password-recovery.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user__["a" /* UserManager */],
            __WEBPACK_IMPORTED_MODULE_5__providers_beer_alert_beer_alert__["a" /* BeerAlertProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loader_counter_loader_counter__["a" /* LoaderCounterProvider */]])
    ], PasswordRecoveryPage);
    return PasswordRecoveryPage;
}());

//# sourceMappingURL=password-recovery.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapJsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_user__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_iikoBizApi_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agm_core__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_geocoder_service__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_loader_counter_loader_counter__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_beer_alert_beer_alert__ = __webpack_require__(33);
// https://www.joshmorony.com/ionic-2-how-to-use-google-maps-geolocation-video-tutorial/
// https://www.joshmorony.com/creating-an-advanced-google-maps-component-in-ionic-2/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MapJsPage = (function () {
    function MapJsPage(navCtrl, loadingCtrl, iikoBizApi, user, geo, _zone, sanitizer, beerAlert) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.iikoBizApi = iikoBizApi;
        this.user = user;
        this.geo = geo;
        this._zone = _zone;
        this.sanitizer = sanitizer;
        this.beerAlert = beerAlert;
        //Saint Petersburg
        this.defaultPoint = {
            lat: 59.9343,
            lng: 30.3351
        };
        this.lat = this.defaultPoint.lat;
        this.lng = this.defaultPoint.lng;
        // default is 8
        // experimentally picked value for SPb = 11
        this.zoom = 11;
        this.mapItems = [];
        this.pageType = "mappedItems";
    }
    MapJsPage.prototype.ngOnInit = function () {
        this.loadingCtrl.show();
    };
    MapJsPage.prototype.getMarkers = function () {
        //debug
        //return Promise.resolve(this._mapItemsStub);
        var _this = this;
        this.loadingCtrl.show();
        return this.user.getOrganizationFirst().then(function (o) {
            return _this.iikoBizApi.api().deliverySettings.getDeliveryTerminals.get({
                organization: o.id
            })
                .then(function (result) {
                _this.loadingCtrl.hide();
                return result;
            })
                .then(function (result) { return result.body; });
        });
    };
    MapJsPage.prototype.mapReady = function () {
        var _this = this;
        this.loadingCtrl.hide();
        var placeServicePromise = new Promise(function (resolve, reject) {
            _this.map["_mapsWrapper"].getNativeMap().then(function (nativeMap) {
                _this.placesService = _this.geo.getPlacesService(nativeMap);
                resolve();
            });
        });
        var markersPromise = this.getMarkers();
        Promise.all([markersPromise, placeServicePromise])
            .then(function (result) {
            var markersResponse = result[0];
            var additionalInfoPromises = [];
            for (var _i = 0, _a = markersResponse.deliveryTerminals; _i < _a.length; _i++) {
                var marker = _a[_i];
                var promise = _this.getAdditionalMarkerInfo(marker).then(function (mapItemExt) {
                    _this._zone.run(function (_) {
                        console.log("mapItemExt: ", mapItemExt);
                        if (mapItemExt) {
                            _this.mapItems.push(mapItemExt);
                        }
                    });
                });
                additionalInfoPromises.push(promise);
            }
            return Promise.all(additionalInfoPromises);
        })
            .then(function (_) {
            if (_this.mapItems.length == 0) {
                _this.beerAlert.alert("Не найдены маркеры для отображения на карте");
            }
        });
    };
    MapJsPage.prototype.getAdditionalMarkerInfo = function (marker) {
        //debug
        //marker.technicalInformation = "ChIJOW1DflpKtUYRF8gLIoMaAiM";
        var _this = this;
        if (!marker.technicalInformation) {
            console.error("Поле marker.technicalInformation пусто. Оно должно содержать placeId для Google Places Service", marker);
            return Promise.resolve(null);
        }
        var request = { placeId: marker.technicalInformation };
        var promisePlace = new Promise(function (resolve, reject) {
            return _this.placesService.getDetails(request, function (place, status) {
                return status == _this.geo.PlacesServiceStatusOK ? resolve(place) : reject();
            });
        });
        return promisePlace.then(function (place) {
            var address = place['vicinity'];
            var addrParts = address.split(",");
            if (addrParts.length) {
                //move city from end to the beginning
                address = [].concat(addrParts.pop(), addrParts).join(', ');
            }
            var mapItem = {
                title: marker.name,
                address: address,
                openingHours: _this.convertOpeningHoursToHumanReadable(place['opening_hours'].periods),
                lat: place['geometry'].location.lat(),
                lng: place['geometry'].location.lng(),
                place: place
            };
            return mapItem;
        })
            .catch(function (e) {
            console.error("Ошибка при получении места из Google Places Service", request, e);
        });
    };
    MapJsPage.prototype.hideMarker = function () {
        this.selectedMarker = null;
    };
    MapJsPage.prototype.sanitize = function (url) {
        return;
    };
    MapJsPage.prototype.calltoUrl = function () {
        var url = 'tel:' + this.selectedMarker.place.international_phone_number.replace(/\s/g, '-');
        return this.sanitizer.bypassSecurityTrustUrl(url);
    };
    MapJsPage.prototype.onMarkerClick = function (markerData) {
        this.selectedMarker = markerData;
        this.lat = markerData.lat;
        this.lng = markerData.lng;
    };
    MapJsPage.prototype.convertOpeningHoursToHumanReadable = function (openingHoursPeriods) {
        var weekDaysNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
        console.log("openingHoursPeriods", openingHoursPeriods);
        var humarRedablePeriods = [];
        var firstDay;
        var lastDay = '';
        var prevPeriod;
        var isSameTimeChecker = function (time1, time2) { return time1.hours == time2.hours && time1.minutes == time2.minutes; };
        var opensLength = openingHoursPeriods.length;
        for (var i = 0; i < opensLength; i++) {
            var nowPeriod = openingHoursPeriods[i];
            var nowWeekDay = weekDaysNames[i];
            if (!firstDay) {
                firstDay = nowWeekDay;
                //continue;
            }
            else {
                prevPeriod = openingHoursPeriods[i - 1];
                var isSameTime = isSameTimeChecker(nowPeriod.open, prevPeriod.open) && isSameTimeChecker(nowPeriod.close, prevPeriod.close);
                if (isSameTime) {
                    lastDay = nowWeekDay;
                    //continue;
                }
                else {
                    humarRedablePeriods.push({ firstDay: firstDay, lastDay: lastDay, period: prevPeriod });
                    firstDay = nowWeekDay;
                    lastDay = null;
                }
            }
        }
        humarRedablePeriods.push({ firstDay: firstDay, lastDay: lastDay, period: prevPeriod, closed: false });
        // todo maybe push also days missing in open periods ( == closed)
        console.log("humarRedablePeriods", humarRedablePeriods);
        return humarRedablePeriods;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Content */])
    ], MapJsPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__agm_core__["b" /* AgmMap */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__agm_core__["b" /* AgmMap */])
    ], MapJsPage.prototype, "map", void 0);
    MapJsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-map-js',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/map-js/map-js-page.html"*/'<ion-header>\n  <!-- todo deniso no-border-bottom -->\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n    <ion-title>Карта бутиков</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <agm-map *ngIf="pageType == \'mappedItems\'"\n           [usePanning]="true"\n           (mapReady)="mapReady()"\n           (mapClick)="hideMarker()"\n           [latitude]="lat" [longitude]="lng" [zoom]="zoom">\n    <agm-marker *ngFor="let markerItem of mapItems"\n        (markerClick)="onMarkerClick(markerItem)"\n        [latitude]="markerItem.lat" [longitude]="markerItem.lng"\n        [title]="markerItem.title"\n    >\n<!--\n      <agm-snazzy-info-window [maxWidth]="200" [closeWhenOthersOpen]="true">\n        <ng-template>\n          <map-item-baloon [data]="markerItem"></map-item-baloon>\n        </ng-template>\n      </agm-snazzy-info-window>\n-->\n    </agm-marker>\n  </agm-map>\n\n</ion-content>\n\n<!--\n<ion-pullup *ngIf="selectedMarker && pageType == \'mappedItems\'" #pullup\n            (onExpand)="footerExpanded()" (onCollapse)="footerCollapsed()"\n            [(state)]="footerState" [initialState]="pullupInitialState"\n            [maxHeight]="pullupMaxHeight">\n\n&lt;!&ndash;  <ion-pullup-tab [footer]="pullup" (tap)="toggleFooter()">\n    <ion-icon name="arrow-up" *ngIf="footerState == 0"></ion-icon><ion-icon name="arrow-down" *ngIf="footerState == 1"></ion-icon>\n  </ion-pullup-tab>&ndash;&gt;\n  <ion-toolbar class="addressToolbar" (tap)="toggleFooter()">\n    <p class="addressTitle">{{selectedMarker.title}}</p>\n    <span class="addressString">{{selectedMarker.address}}</span>\n    <span class="addressString">{{selectedMarker.place.formatted_phone_number}}</span>\n  </ion-toolbar>\n  <ion-content>\n    <map-item-description [data]="selectedMarker"></map-item-description>\n  </ion-content>\n</ion-pullup>\n-->\n\n<ion-footer *ngIf="selectedMarker" padding-horizontal>\n  <ion-toolbar class="mapToolbar" *ngIf="selectedMarker">\n    <p class="addr">{{selectedMarker.address}}</p>\n    <div class="details">\n      <img class="photo" float-left src="{{selectedMarker.place.photos[0].getUrl({\'maxWidth\': 300, \'maxHeight\': 150})}}" />\n      <div class="open_hours" float-right>\n        <p *ngFor="let timePeriod of selectedMarker.openingHours">\n          {{timePeriod.firstDay + (timePeriod.lastDay ? "-" + timePeriod.lastDay : "")}}\n          {{timePeriod.period.open.hours}}:{{\n            timePeriod.period.open.minutes ? timePeriod.period.open.minutes : "00"}}-{{\n            timePeriod.period.close.hours}}:{{\n          timePeriod.period.close.minutes ? timePeriod.period.close.minutes : "00"}}\n        </p>\n        <p class="is_open_now">{{selectedMarker.place.opening_hours.open_now ? "Открыто" : "Закрыто"}}</p>\n      </div>\n    </div>\n    <a class="call_now" text-center [href]="calltoUrl()">ПОЗВОНИТЬ</a>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/map-js/map-js-page.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_loader_counter_loader_counter__["a" /* LoaderCounterProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_iikoBizApi_service__["a" /* iikoBizApi */],
            __WEBPACK_IMPORTED_MODULE_1__providers_user__["a" /* UserManager */],
            __WEBPACK_IMPORTED_MODULE_5__providers_geocoder_service__["a" /* GeocoderService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_8__providers_beer_alert_beer_alert__["a" /* BeerAlertProvider */]])
    ], MapJsPage);
    return MapJsPage;
}());

//# sourceMappingURL=map-js-page.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeocoderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GeocoderService = (function () {
    function GeocoderService() {
    }
    Object.defineProperty(GeocoderService.prototype, "PlacesServiceStatusOK", {
        get: function () {
            return google.maps.places.PlacesServiceStatus.OK;
        },
        enumerable: true,
        configurable: true
    });
    GeocoderService.prototype.getLatLan = function (address) {
        console.log('Getting Address - ', address);
        var geocoder = new google.maps.Geocoder();
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].geometry.location);
                    observer.complete();
                }
                else {
                    //todo deniso error handling
                    /*
                              console.log('Error - ', results, ' & Status - ', status);
                              observer.next({});
                              observer.complete();
                    */
                }
            });
        });
    };
    GeocoderService.prototype.getPlacesService = function (nativeMap) {
        return new google.maps.places.PlacesService(nativeMap);
    };
    GeocoderService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], GeocoderService);
    return GeocoderService;
}());

//# sourceMappingURL=geocoder.service.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasketPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_userProducts__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_confirmation_order_confirmation__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BasketPage = (function () {
    function BasketPage(navCtrl, navParams, userProducts) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProducts = userProducts;
        this.pageTitle = 'Корзина';
        this.products = null;
        this.init();
    }
    BasketPage.prototype.getFilter = function () {
        var _this = this;
        return function (data) {
            return _this.userProducts.basketAmountCached(data.id) > 0;
        };
    };
    ;
    BasketPage.prototype.gotoConfirmation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__order_confirmation_order_confirmation__["a" /* OrderConfirmationPage */]);
    };
    BasketPage.prototype.init = function () {
        var _this = this;
        return this.userProducts.getBasketProducts().
            then(function (ps) { return _this.products = ps; });
    };
    BasketPage.prototype.isBasketFilled = function () {
        if (!this.products)
            return false;
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["some"](this.products, this.getFilter());
    };
    BasketPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-basket',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/basket/basket.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n    <ion-title>{{pageTitle}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <products-list *ngIf="products" [products]="products" [filter]="getFilter()" emptyMsg="в корзине пусто"></products-list>\n</ion-content>\n\n<ion-footer padding *ngIf="isBasketFilled()">\n  <ion-toolbar>\n    <button block color="light" ion-button (click)="gotoConfirmation()">Оформить заказ</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/basket/basket.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_userProducts__["a" /* UserProductsProvider */]])
    ], BasketPage);
    return BasketPage;
}());

//# sourceMappingURL=basket.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderConfirmationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_userProducts__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_iikoBizApi_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__order_info_order_info__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_loader_counter_loader_counter__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_beer_alert_beer_alert__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var OrderConfirmationPage = (function () {
    function OrderConfirmationPage(userProducts, user, beerAlert, loadingCtrl, navCtrl, iikoBizApi) {
        this.userProducts = userProducts;
        this.user = user;
        this.beerAlert = beerAlert;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.iikoBizApi = iikoBizApi;
        this.totalAmount = 0;
        this.init();
    }
    OrderConfirmationPage.prototype.doFilter = function (data) {
        return this.userProducts.basketAmountCached(data.id) > 0;
    };
    ;
    OrderConfirmationPage.prototype.getAmount = function (data) {
        return this.userProducts.basketAmountCached(data.id);
    };
    OrderConfirmationPage.prototype.init = function () {
        var _this = this;
        return this.userProducts.getBasketProducts()
            .then(function (_products) { return _this.products = _products; })
            .then(this._getTotalAmount.bind(this));
    };
    OrderConfirmationPage.prototype._getTotalAmount = function (products) {
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var product = products_1[_i];
            if (this.doFilter(product)) {
                this.totalAmount += product.price * this.getAmount(product);
            }
        }
        this.totalAmountRub = Math.round(this.totalAmount);
        this.totalAmountKop = this.totalAmount - this.totalAmountRub;
    };
    OrderConfirmationPage.prototype.doOrder = function () {
        var _this = this;
        return Promise.all([
            this.user.getOrganizationFirst(),
            this.user.getLoggedGuestInfo(),
            this.userProducts.getBasketProducts(),
        ]).then(function (result) {
            var organization = result[0], userInfo = result[1], basketProducts = result[2];
            return _this.generateOrderRequest(organization, userInfo, basketProducts);
        });
    };
    OrderConfirmationPage.prototype.generateOrderRequest = function (organization, userInfo, basketProducts) {
        var _this = this;
        var orderRequest = {
            organization: null,
            customer: null,
            customerId: null,
            order: null
        };
        orderRequest.organization = organization.id;
        orderRequest.customer = {
            id: userInfo.id,
            name: userInfo.name,
            phone: userInfo.phone,
        };
        orderRequest.order = {
            id: null,
            isSelfService: true,
            phone: userInfo.phone,
            fullSum: this.totalAmount,
            date: null,
            comment: '',
            items: basketProducts.filter(function (product) { return _this.userProducts.basketAmountCached(product.id); }).map(function (product) {
                return {
                    id: product.id,
                    name: product.name,
                    amount: _this.userProducts.basketAmountCached(product.id)
                };
            })
        };
        this.loadingCtrl.show();
        return this.iikoBizApi.api().orders.add.post(orderRequest)
            .then(function (result) {
            _this.loadingCtrl.hide();
            return result;
        })
            .then(this.processOrderResponse.bind(this));
    };
    OrderConfirmationPage.prototype.processOrderResponse = function (response) {
        var _this = this;
        if (response && response.status == 200) {
            var orderInfo_1 = response.body;
            this.userProducts.clearBasket().then(function () {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__order_info_order_info__["a" /* OrderInfoPage */], { orderInfo: orderInfo_1 });
            });
        }
        else {
            return this.beerAlert.alert('Извините, произошла ошибка. Попробуйте заказать еще раз позже');
        }
    };
    OrderConfirmationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order-confirmation',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/order-confirmation/order-confirmation.html"*/'<!--\n  Generated template for the OrderConfirmationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Заказ</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card *ngIf="products" class="justWideCard">\n    <ion-card-content>\n      <ol>\n          <div *ngFor="let product of products">\n            <li text-right *ngIf="doFilter(product)">\n              <div style="font-weight: bold" text-right>{{product.name}}</div>\n              <div text-right>{{product.weight}} л. x {{getAmount(product)}} шт.</div>\n              <div text-right>{{product.price}}x{{getAmount(product)}}={{product.price*getAmount(product)}} РУБ.</div>\n            </li>\n          </div>\n      </ol>\n      <div padding-top text-right *ngIf="totalAmount">ИТОГО: <b>{{totalAmountRub}}</b> РУБЛЕЙ <b>{{totalAmountKop ||\n        "00"}}</b> КОПЕЕК\n      </div>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n\n<ion-footer padding>\n  <ion-toolbar>\n    <button block color="light" ion-button (click)="doOrder()">ПОДТВЕРДИТЬ</button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/order-confirmation/order-confirmation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_userProducts__["a" /* UserProductsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user__["a" /* UserManager */],
            __WEBPACK_IMPORTED_MODULE_7__providers_beer_alert_beer_alert__["a" /* BeerAlertProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_loader_counter_loader_counter__["a" /* LoaderCounterProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_iikoBizApi_service__["a" /* iikoBizApi */]])
    ], OrderConfirmationPage);
    return OrderConfirmationPage;
}());

//# sourceMappingURL=order-confirmation.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_index_page__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the OrderInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrderInfoPage = (function () {
    function OrderInfoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    OrderInfoPage.prototype.ionViewDidEnter = function () {
        if (this.navParams.data && this.navParams.data.orderInfo) {
            this.orderInfo = this.navParams.data.orderInfo;
        }
    };
    OrderInfoPage.prototype.close = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__index_index_page__["a" /* IndexPage */]);
    };
    OrderInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order-info',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/order-info/order-info.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Информация о заказе</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card class="justWideCard">\n    <ion-card-title text-center>Спасибо за ваш заказ!</ion-card-title>\n    <ion-card-content *ngIf="orderInfo && orderInfo.deliveryTerminal">\n      Вы можете забрать Ваш заказ в рабочее время по адресу\n      <!--//todo deniso fix addr && time -->\n      <!--<div><b>{{orderInfo.deliveryTerminal.address}}</b></div>-->\n      <div><b>Санкт-Петербург, ул. Кременчугская 11 корпус 1</b></div>\n    </ion-card-content>\n  </ion-card>\n  <button ion-button block color="light" (click)="close()">Закрыть</button>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/order-info/order-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], OrderInfoPage);
    return OrderInfoPage;
}());

//# sourceMappingURL=order-info.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SommelierPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_nomenclatureProvider__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_filterData_service__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SommelierPage = (function () {
    function SommelierPage(navCtrl, navParams, nomenclatureProvider, filterData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nomenclatureProvider = nomenclatureProvider;
        this.filterData = filterData;
        this.pageTitle = 'Сомелье';
        this.showInvalid = false;
        this.selectCancelText = 'Отмена';
        this.selectOkText = 'Выбрать';
        this.commonTagsFields = ['type', 'filtration', 'periodicity', 'origin', 'alcoRange'];
        this.classicFields = ['style', 'bitterness'];
        this.fruitFields = ['taste'];
        this.citFields = ['sugar', 'basis'];
        this._enableDebugMagicValue = "000";
        this.typeSpecificFields = this.classicFields.concat(this.fruitFields, this.citFields);
        this.allFields = this.commonTagsFields.concat(this.typeSpecificFields);
        this.autocompleteValues = [];
        this.filterChoosed = {
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
    }
    Object.defineProperty(SommelierPage.prototype, "isIncompatibleTypeFieldSet", {
        get: function () {
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_4_lodash__["some"](this.typeSpecificFields, function (field) {
                var value = _this.filterChoosed[field];
                return value && (value.length || !Array.isArray(value));
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SommelierPage.prototype, "excludingFields", {
        get: function () {
            var fields = [];
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SommelierPage.prototype, "isTypeClassicOrNotSet", {
        get: function () {
            var beerType = this.filterChoosed.type;
            if (!beerType)
                return true;
            return beerType.length === 0 || beerType.indexOf('Классическое') !== -1; //todo deniso user global const
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(SommelierPage.prototype, "isTypeFruitOrNotSet", {
        get: function () {
            var beerType = this.filterChoosed.type;
            if (!beerType)
                return true;
            return beerType.length === 0 || beerType.indexOf('Фруктовое') !== -1;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(SommelierPage.prototype, "isTypeCitOrNotSet", {
        get: function () {
            var beerType = this.filterChoosed.type;
            if (!beerType)
                return true;
            return beerType.length === 0 || beerType.indexOf('Сидр') !== -1;
        },
        enumerable: true,
        configurable: true
    });
    ;
    SommelierPage.prototype.getTagValue = function () {
        return this.filterChoosed.tag; // ? this.filterChoosed.tag.substr(1).toLowerCase().trim() : '';
    };
    SommelierPage.prototype.getFilter = function () {
        var _this = this;
        function _getCheckFunction(tag) {
            return function (tagItem) {
                if (tagItem === tag) {
                    return true;
                }
                else {
                    var colonIndex = tagItem.indexOf(':');
                    if (colonIndex === -1) {
                        return false;
                    }
                    else {
                        return tagItem.substr(colonIndex + 1) === tag;
                    }
                }
            };
        }
        return function (data) {
            var filterChoosed = _this.filterChoosed;
            var tag = filterChoosed.tag;
            if (tag) {
                var isTagFound = __WEBPACK_IMPORTED_MODULE_4_lodash__["some"](data.tags, _getCheckFunction(tag));
                if (!isTagFound) {
                    return false;
                }
            }
            var priceRange = (filterChoosed.priceRange || []).slice();
            if (priceRange.length && !__WEBPACK_IMPORTED_MODULE_4_lodash__["some"](priceRange, function (price) { return data.priceRange.indexOf(price) > -1; })) {
                return false;
            }
            var excludingTags = _this.excludingFields;
            var tagsCheckMap = _this.allFields.map(function (fieldName) {
                if (excludingTags.indexOf(fieldName) !== -1)
                    return true;
                //code is designed for multiple="true" which returns array
                //in order to support multiple="false"  - result is converted to array for sure
                var values = (_this.filterChoosed[fieldName] || []).slice();
                if (values.length == 0)
                    return true;
                return values.indexOf(data[fieldName]) > -1;
            });
            return tagsCheckMap.every(function (tagCorrect) { return tagCorrect; });
        };
    };
    Object.defineProperty(SommelierPage.prototype, "isFilterEmpty", {
        get: function () {
            var excludingFields = this.excludingFields;
            //todo deniso add tag support? or just remove this func?
            var fieldsEmpty = __WEBPACK_IMPORTED_MODULE_4_lodash__["map"](this.filterChoosed, function (value, name) {
                if (!value || value.length === 0)
                    return true;
                if (excludingFields.indexOf(name) > -1)
                    return true;
                return false;
            });
            return fieldsEmpty.every(function (v) { return v; });
        },
        enumerable: true,
        configurable: true
    });
    SommelierPage.prototype.ngOnChanges = function (changes) {
        console.log("ngOnChanges sommelier", changes);
        //this._isFilterEmpty = this.checkFilterEmpty();
    };
    SommelierPage.prototype.ngOnInit = function () {
        this.init();
    };
    SommelierPage.prototype.init = function () {
        var _this = this;
        return this.nomenclatureProvider.getAll().then(function (products) {
            _this.products = products;
            return _this.filterData.getPossibleValuesFromItems(products);
        })
            .then(function (_filterPossible) {
            _filterPossible.priceRange = _filterPossible.priceRange.sort();
            _this.filterPossibleValues = _filterPossible;
            _this.autocompleteValues = (_this.filterPossibleValues.tags || []).map(function (item) {
                var colonsIndex = item.indexOf(':');
                var colonsInTheMiddle = colonsIndex > 0 && colonsIndex < (item.length - 1);
                // return value after colon
                // made for 'страна:бельгия' and so on
                return colonsInTheMiddle ? item.substring(colonsIndex + 1) : item;
            });
            _this.autocompleteValues.push(_this._enableDebugMagicValue);
        });
    };
    SommelierPage.prototype.autocompleteChanged = function (event) {
        console.log("event", event);
        var oldValue = this.showInvalid;
        this.showInvalid = event === this._enableDebugMagicValue && !this.showInvalid;
        if (oldValue !== this.showInvalid) {
            alert("Показать все: " + (this.showInvalid ? "включено" : "вЫключено"));
            this.filterChoosed.tag = '';
        }
    };
    SommelierPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sommelier',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/sommelier/sommelier.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n    <ion-title>{{pageTitle}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <input class="auto-complete" auto-complete [(ngModel)]="filterChoosed.tag" [source]="autocompleteValues"\n  [open-on-focus]="false" [no-match-found-text]="\'Извините, ничего не найдено\'" (valueChanged)="autocompleteChanged($event)"/>\n\n  <form *ngIf="filterPossibleValues" (changes)="doFilter()" (submit)="doFilter()" class="formAttribute">\n    <div padding-vertical>\n      <ion-segment [(ngModel)]="filterChoosed.type" name="beerType" color="light" [disabled]="isIncompatibleTypeFieldSet">\n        <ion-segment-button *ngFor="let obj of filterPossibleValues.type" [value]="obj">\n          {{obj == \'Классическое\' ? \'Пиво\' : \'Сидр\'}}\n        </ion-segment-button>\n      </ion-segment>\n    </div>\n\n    <ion-item>\n      <ion-label>Цвет</ion-label>\n      <ion-select [(ngModel)]="filterChoosed.style" name="beerStyle" [disabled]="!isTypeClassicOrNotSet"\n                  [multiple]="true" [okText]="selectOkText" [cancelText]="selectCancelText">\n      <ion-option *ngFor="let obj of filterPossibleValues.style" [value]="obj">{{obj}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Фильтрованое</ion-label>\n      <ion-select [(ngModel)]="filterChoosed.filtration" name="beerFiltration"\n                  [multiple]="true" [okText]="selectOkText" [cancelText]="selectCancelText">\n      <ion-option *ngFor="let obj of filterPossibleValues.filtration" [value]="obj">{{obj}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Крепость</ion-label>\n      <ion-select [(ngModel)]="filterChoosed.alcoRange" name="BeerAlcoRanges"\n                  [multiple]="true" [okText]="selectOkText" [cancelText]="selectCancelText">\n        <ion-option *ngFor="let obj of filterPossibleValues.alcoRange" [value]="obj">{{obj}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Горечь</ion-label>\n      <ion-select [(ngModel)]="filterChoosed.bitterness" name="beerBitterness" [disabled]="!isTypeClassicOrNotSet"\n                  [multiple]="true" [okText]="selectOkText" [cancelText]="selectCancelText">\n      <ion-option *ngFor="let obj of filterPossibleValues.bitterness" [value]="obj">{{obj}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Цена</ion-label>\n      <ion-select [(ngModel)]="filterChoosed.priceRange" name="beerPriceRanges"\n                  [multiple]="true" [okText]="selectOkText" [cancelText]="selectCancelText">\n        <ion-option *ngFor="let obj of filterPossibleValues.priceRange" [value]="obj">{{obj}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Регион</ion-label>\n      <ion-select [(ngModel)]="filterChoosed.origin" name="beerOrigin"\n                  [multiple]="true" [okText]="selectOkText" [cancelText]="selectCancelText">\n        <ion-option *ngFor="let obj of filterPossibleValues.origin" [value]="obj">{{obj}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Периодичность сорта</ion-label>\n      <ion-select [(ngModel)]="filterChoosed.periodicity" name="beerPeriodicity"\n                  [multiple]="true" [okText]="selectOkText" [cancelText]="selectCancelText">\n      <ion-option *ngFor="let obj of filterPossibleValues.periodicity" [value]="obj">{{obj}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Вкус</ion-label>\n      <ion-select [(ngModel)]="filterChoosed.taste" name="beerTaste" [disabled]="!isTypeFruitOrNotSet"\n                  [multiple]="true" [okText]="selectOkText" [cancelText]="selectCancelText">\n      <ion-option *ngFor="let obj of filterPossibleValues.taste" [value]="obj">{{obj}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Основа</ion-label>\n      <ion-select [(ngModel)]="filterChoosed.basis" name="beerBasis" [disabled]="!isTypeCitOrNotSet"\n                  [multiple]="true" [okText]="selectOkText" [cancelText]="selectCancelText">\n      <ion-option *ngFor="let obj of filterPossibleValues.basis" [value]="obj">{{obj}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Сахар</ion-label>\n      <ion-select [(ngModel)]="filterChoosed.sugar" name="beerSugar" [disabled]="!isTypeCitOrNotSet"\n                  [multiple]="true" [okText]="selectOkText" [cancelText]="selectCancelText">\n      <ion-option *ngFor="let obj of filterPossibleValues.sugar" [value]="obj">{{obj}}</ion-option>\n      </ion-select>\n    </ion-item>\n  </form>\n\n  <!-- if filter is untouched - do not display anything -->\n   <products-list *ngIf="!isFilterEmpty || showInvalid" [products]="products" [filter]="getFilter()" [showInvalid]="showInvalid"></products-list>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/sommelier/sommelier.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_nomenclatureProvider__["a" /* NomenclatureProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_filterData_service__["a" /* FilterDataService */]])
    ], SommelierPage);
    return SommelierPage;
}());

//# sourceMappingURL=sommelier.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export FilterPossibleValues */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterDataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iikoStructures_BeerProduct_class__ = __webpack_require__(135);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FilterPossibleValues = (function () {
    function FilterPossibleValues() {
        this.type = null;
        this.style = null;
        this.filtration = null;
        this.sugar = null;
        this.taste = null;
        this.basis = null;
        this.periodicity = null;
        this.bitterness = null;
        this.origin = null;
        // at the moment all price values are not necessary,
        // instead named price ranges are used
        // price: any = null;
        this.priceRange = null;
        this.alcoRange = null;
        this.tags = null;
    }
    return FilterPossibleValues;
}());

var FilterDataService = (function () {
    function FilterDataService() {
        this.ALCO_PROPERTY = 'alco';
    }
    FilterDataService.prototype.getItemsByName = function (nameToSearch, all) {
        if (!nameToSearch || !nameToSearch.length)
            return [];
        return all.filter(function (item) { return nameToSearch.indexOf(item.name) != -1; });
    };
    FilterDataService.prototype.getAlcoFiltersByName = function (nameToSearch) {
        return this.getItemsByName(nameToSearch, __WEBPACK_IMPORTED_MODULE_2__iikoStructures_BeerProduct_class__["a" /* ALCO_RANGE_FILTER */]);
    };
    FilterDataService.prototype.getBeerPriceFiltersByName = function (nameToSearch) {
        return this.getItemsByName(nameToSearch, __WEBPACK_IMPORTED_MODULE_2__iikoStructures_BeerProduct_class__["b" /* BEER_PRICE_RANGE_FILTER */]);
    };
    FilterDataService.prototype.checkParamByFilters = function (value, filters) {
        if (!filters || !filters.length)
            return true;
        if (!value && value !== 0)
            return false;
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["some"](filters, function (filterItem) { return filterItem.filter(value); });
    };
    /**
     * Method is async for future possible changes, if we would like take some data from server
     * @param {NomenclatureAPI.NomenclatureResponse} nomenclature
     * @returns {Promise<FilterPossibleValues>}
     */
    FilterDataService.prototype.getPossibleValuesFromItems = function (products) {
        var valuesAvailable = new FilterPossibleValues();
        var applyValue = function (result, value) {
            if ((value || value === 0) && result.indexOf(value) === -1) {
                result.push(value);
            }
            return result;
        };
        var _loop_1 = function (fieldName) {
            valuesAvailable[fieldName] = products.reduce(function (result, product) {
                var value = product[fieldName];
                if (Array.isArray(value)) {
                    value.reduce(function (result, subvalue) { return applyValue(result, subvalue.trim().toLowerCase()); }, result);
                }
                else {
                    applyValue(result, value);
                }
                return result;
            }, []);
        };
        for (var fieldName in valuesAvailable) {
            _loop_1(fieldName);
        }
        return Promise.resolve(valuesAvailable);
    };
    FilterDataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], FilterDataService);
    return FilterDataService;
}());

//# sourceMappingURL=filterData.service.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WishlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_userProducts__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WishlistPage = (function () {
    function WishlistPage(userProducts) {
        this.userProducts = userProducts;
        this.pageTitle = 'Wishlist';
        this.products = null;
    }
    WishlistPage.prototype.getFilter = function () {
        var self = this;
        return function (data) {
            return self.userProducts.isFavoriteCached(data.id);
        };
    };
    ;
    WishlistPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        return this.userProducts.getFavoritesProducts().
            then(function (ps) { return _this.products = ps; });
    };
    WishlistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-wishlist',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/wishlist/wishlist.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n    <ion-title>{{pageTitle}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <products-list *ngIf="products" [products]="products" [filter]="getFilter()" emptyMsg="в избранном пусто"></products-list>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/wishlist/wishlist.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_userProducts__["a" /* UserProductsProvider */]])
    ], WishlistPage);
    return WishlistPage;
}());

//# sourceMappingURL=wishlist.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loader_counter_loader_counter__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_email_sender_email_sender__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_beer_alert_beer_alert__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FeedbackPage = (function () {
    function FeedbackPage(navCtrl, navParams, loadingCtrl, emailSender, beerAlert, user) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.emailSender = emailSender;
        this.beerAlert = beerAlert;
        this.user = user;
        this.pageTitle = 'Напишите нам';
    }
    //todo deniso maybe enable captcha
    FeedbackPage.prototype.send = function () {
        var _this = this;
        if (!this.form.valid) {
            this._showToast('Пожалуйста, заполните все поля формы');
            return;
        }
        this.user.getLoggedUserInfo().then(function (userInfo) {
            var value = _this.form.value;
            var messageParams = {
                from_name: userInfo.name + " " + userInfo.surname + " " + userInfo.phone + " " + userInfo.email,
                title: value.title,
                message: value.message,
            };
            _this._showLoading();
            _this.emailSender.send("feedback_template", messageParams).then(_this._onSuccess.bind(_this)).catch(_this._onError.bind(_this)).then(_this._hideLoading.bind(_this));
        });
    };
    FeedbackPage.prototype._showLoading = function () {
        this.loadingCtrl.show();
    };
    FeedbackPage.prototype._hideLoading = function () {
        this.loadingCtrl.hide();
    };
    FeedbackPage.prototype._onSuccess = function () {
        this.form.reset();
        var message = 'Спасибо, ваше сообщение отправлен и скоро мы ответим на него!';
        this._showToast(message);
    };
    FeedbackPage.prototype._onError = function (err) {
        var message = 'Произошла ошибка при отправке, попробуйте еще раз пожалуйста. \n' + err;
        this._showToast(message);
    };
    FeedbackPage.prototype._showToast = function (message) {
        return this.beerAlert.alert(message);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2__angular_forms__["NgForm"]),
        __metadata("design:type", Object)
    ], FeedbackPage.prototype, "form", void 0);
    FeedbackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-feedback',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/feedback/feedback.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n    <ion-title>{{pageTitle}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <form #f="ngForm" (ngSubmit)="send(f)" >\n    <ion-item>\n      <ion-label class="subject" floating>Тема</ion-label>\n      <ion-input floating ngModel required type="text" name="title" class="theme"></ion-input>\n    </ion-item>\n    <ion-item class="message">\n      <ion-label floating>Сообщение</ion-label>\n      <ion-textarea ngModel required name="message"></ion-textarea>\n    </ion-item>\n    <button ion-button type="submit" color="light" block>Отправить</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/feedback/feedback.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loader_counter_loader_counter__["a" /* LoaderCounterProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_email_sender_email_sender__["a" /* EmailSenderProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_beer_alert_beer_alert__["a" /* BeerAlertProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_user__["a" /* UserManager */]])
    ], FeedbackPage);
    return FeedbackPage;
}());

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_news_and_faq_news_and_faq__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NewsPage = (function () {
    function NewsPage(newsAndFaqProvider) {
        this.newsAndFaqProvider = newsAndFaqProvider;
        this.pageTitle = 'Новости и акции';
        this.articles = [];
    }
    NewsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.newsAndFaqProvider.getNews().then(function (articles) { return _this.articles = articles; });
    };
    NewsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-news',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/news/news.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n    <ion-title>{{pageTitle}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <article-list [itemsList]="articles"></article-list>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/news/news.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_news_and_faq_news_and_faq__["a" /* NewsAndFaqProvider */]])
    ], NewsPage);
    return NewsPage;
}());

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_news_and_faq_news_and_faq__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FaqPage = (function () {
    function FaqPage(newsAndFaqProvider) {
        this.newsAndFaqProvider = newsAndFaqProvider;
        this.pageTitle = 'FAQ';
        this.articles = [];
    }
    FaqPage.prototype.ngOnInit = function () {
        var _this = this;
        this.newsAndFaqProvider.getFaq().then(function (articles) { return _this.articles = articles; });
    };
    FaqPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-faq',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/faq/faq.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n    <ion-title>{{pageTitle}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <article-list [itemsList]="articles"></article-list>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/faq/faq.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_news_and_faq_news_and_faq__["a" /* NewsAndFaqProvider */]])
    ], FaqPage);
    return FaqPage;
}());

//# sourceMappingURL=faq.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ItemDetailsPage = (function () {
    function ItemDetailsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.selectedItem = navParams.get('item');
    }
    ItemDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-item-details',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/item-details/item-details.html"*/'<ion-header>\n  <ion-navbar>\n    <button menuToggle *ngIf="!selectedItem">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <!--<ion-title>{{selectedItem.name}}</ion-title>-->\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding-horizontal>\n  <product-item [isFull]="true" [data]="selectedItem"></product-item>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/item-details/item-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ItemDetailsPage);
    return ItemDetailsPage;
}());

//# sourceMappingURL=item-details.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticlePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ArticlePage = (function () {
    function ArticlePage(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
    }
    ArticlePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ArticlePage.prototype.ionViewDidEnter = function () {
        var data = this.navParams.data;
        if (data && data.item) {
            this.item = data.item;
        }
    };
    ArticlePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-article',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/article/article.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Статья\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text id="textSpanButton" showWhen="ios">Закрыть</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n  <article-single *ngIf="item" [item]="item"></article-single>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/article/article.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ArticlePage);
    return ArticlePage;
}());

//# sourceMappingURL=article.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return iikoBizApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_iikobiz_serverapi_raml_build_js_client_index_js__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_iikobiz_serverapi_raml_build_js_client_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_iikobiz_serverapi_raml_build_js_client_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loader_counter_loader_counter__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var iikoBizApi = (function () {
    function iikoBizApi(loadingCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.serverURLInApp = 'http://78.47.168.234/'; //'https://iiko.biz:9900/';  // URL to web api
        this.serverUrlWeb = 'http://biz.labex.pro/'; // URL necessary only to match proxy rule in ionic config or nginx conf
        this.serverURLDebug = '/'; // URL necessary only to match proxy rule in ionic config or nginx conf
        //private headers = {'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest'};
        this.queryParamsToCache = ['organizationId'];
        this.cache = {};
        var serverAddr = this.getApiAddr();
        this.client = new __WEBPACK_IMPORTED_MODULE_1_iikobiz_serverapi_raml_build_js_client_index_js__({
            //todo logic to use prod url for builds
            baseUri: serverAddr,
            user: {
                sign: this.signRequest.bind(this)
            }
        });
    }
    iikoBizApi.prototype.getApiAddr = function () {
        var serverAddr;
        if (document.URL.startsWith('http')) {
            if (document.location.href.indexOf('://localhost') == -1) {
                serverAddr = this.serverUrlWeb;
            }
            else {
                serverAddr = this.serverURLDebug;
            }
        }
        else {
            serverAddr = this.serverURLInApp;
        }
        return serverAddr;
    };
    iikoBizApi.prototype.api = function () {
        return this.client.api['0'];
    };
    iikoBizApi.prototype.getUserSecrets = function () {
        return {
            //      user_id: 'APIe.ivanov@open-s.info',
            //      user_secret: 'H0Lj3m6B'
            user_id: 'FF_Consumer',
            user_secret: 'FF_Consumer'
        };
    };
    iikoBizApi.prototype.init = function () {
        var _this = this;
        //todo what if token expires?
        var userSecrets = this.getUserSecrets();
        var accessToken;
        var accessTokenQuery;
        this.loadingCtrl.show();
        return this.api().auth.accessToken.get(userSecrets)
            .then(function (result) {
            _this.loadingCtrl.hide();
            return result;
        })
            .then(function (result) {
            console.log(result.body);
            _this.accessToken = result.body;
            accessTokenQuery = { 'access_token': accessToken };
        });
    };
    iikoBizApi.prototype.getLast = function (paramName) {
        return this.cache[paramName];
    };
    iikoBizApi.prototype._doCache = function (requestParams) {
        for (var i = 0; i < this.queryParamsToCache.length; i++) {
            var paramName = this.queryParamsToCache[i];
            if (requestParams.hasOwnProperty(paramName)) {
                this.cache[paramName] = requestParams[paramName];
            }
        }
    };
    iikoBizApi.prototype._getRequestParams = function (options) {
        var requestParams;
        if (options.method == 'get') {
            requestParams = options.query;
        }
        else if (options.method == 'post') {
            requestParams = options.body;
        }
        else {
            throw "unknown request type - " + options.method;
        }
        return requestParams;
    };
    iikoBizApi.prototype._setRequestParams = function (options, requestParams) {
        if (options.method == 'get') {
            options.query = requestParams;
        }
        else if (options.method == 'post') {
            options.body = requestParams;
        }
    };
    iikoBizApi.prototype.signRequest = function (options) {
        var requestParams = this._getRequestParams(options);
        if (requestParams) {
            this._doCache(requestParams);
        }
        // even in case of empty query - we may need to add token if exists
        //todo list of method that should not be signed ?
        if (this.accessToken) {
            requestParams = requestParams || {};
            var checkingUrl = options.url.substr(options.url.indexOf('/api/'));
            console.log("SIGNING_REQUEST: '" + checkingUrl + "'ß");
            //todo deniso remove this hack
            var isProblematicUrl = ["/api/0/customers/create_or_update", "/api/0/orders/add"].indexOf(checkingUrl) > -1;
            if (isProblematicUrl) {
                if (!options.query) {
                    options.query = {};
                }
                options.query.access_token = this.accessToken;
                options.query.organization = options.body.organization;
            }
            //api has some troubles :)
            requestParams.access_token = this.accessToken;
            requestParams.accessToken = this.accessToken;
        }
        this._setRequestParams(options, requestParams);
        return options;
    };
    iikoBizApi = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__loader_counter_loader_counter__["a" /* LoaderCounterProvider */]])
    ], iikoBizApi);
    return iikoBizApi;
}());

//# sourceMappingURL=iikoBizApi.service.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(322);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_index_index_page__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_item_details_item_details__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_iikoBizApi_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ngx_translate_http_loader__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_user__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_confirm_code_confirm_code__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ionic_image_loader__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_storage__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_map_map_page__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_map_js_map_js_page__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_nomenclatureProvider__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_category_category__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_user_selection_user_selection__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_user_selection_user_selection__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_adminka_adminka__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_app_version__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_device__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_products_list_products_list__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_basket_basket__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_product_item_product_item__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_news_news__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_sommelier_sommelier__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_feedback_feedback__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_faq_faq__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_wishlist_wishlist__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_userProducts__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_appConfig_service__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__providers_filterData_service__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_article_list_article_list__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_article_single_article_single__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pipes_keep_html_keep_html__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_article_article__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__providers_geocoder_service__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__providers_stop_lists_stop_lists__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__agm_core__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_registration_registration__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_order_confirmation_order_confirmation__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_order_info_order_info__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ngui_auto_complete__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ngui_auto_complete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_48__ngui_auto_complete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_rules_rules__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__providers_loader_counter_loader_counter__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__components_empty_card_empty_card__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__providers_news_and_faq_news_and_faq__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_password_recovery_password_recovery__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__providers_email_sender_email_sender__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__providers_beer_alert_beer_alert__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















//import {GoogleMaps} from "@ionic-native/google-maps";

























// add these imports












// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_13__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_24__pages_adminka_adminka__["a" /* AdminkaPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_index_index_page__["a" /* IndexPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_registration_registration__["a" /* RegistrationPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_password_recovery_password_recovery__["a" /* PasswordRecoveryPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_rules_rules__["a" /* RulesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_confirm_code_confirm_code__["a" /* ConfirmCodePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_item_details_item_details__["a" /* ItemDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_map_map_page__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_map_js_map_js_page__["a" /* MapJsPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_basket_basket__["a" /* BasketPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_22__components_user_selection_user_selection__["a" /* UserSelectionComponent */],
                __WEBPACK_IMPORTED_MODULE_51__components_empty_card_empty_card__["a" /* EmptyCardComponent */],
                __WEBPACK_IMPORTED_MODULE_23__pages_user_selection_user_selection__["a" /* UserSelectionPage */],
                __WEBPACK_IMPORTED_MODULE_27__components_products_list_products_list__["a" /* ProductsListComponent */],
                __WEBPACK_IMPORTED_MODULE_29__components_product_item_product_item__["a" /* ProductItemComponent */],
                __WEBPACK_IMPORTED_MODULE_30__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_sommelier_sommelier__["a" /* SommelierPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_feedback_feedback__["a" /* FeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_faq_faq__["a" /* FaqPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_wishlist_wishlist__["a" /* WishlistPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_order_confirmation_order_confirmation__["a" /* OrderConfirmationPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_order_info_order_info__["a" /* OrderInfoPage */],
                __WEBPACK_IMPORTED_MODULE_38__components_article_list_article_list__["a" /* ArticleListComponent */],
                __WEBPACK_IMPORTED_MODULE_39__components_article_single_article_single__["a" /* ArticleSingleComponent */],
                __WEBPACK_IMPORTED_MODULE_40__pipes_keep_html_keep_html__["a" /* KeepHtmlPipe */],
                __WEBPACK_IMPORTED_MODULE_41__pages_article_article__["a" /* ArticlePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_48__ngui_auto_complete__["NguiAutoCompleteModule"],
                __WEBPACK_IMPORTED_MODULE_16_ionic_image_loader__["a" /* IonicImageLoader */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_17__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: HttpLoaderFactory,
                        deps: [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_44__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyDvcQWs0GzzB13UkCMYTgvMXyVBite6O1M',
                    libraries: ['places']
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_index_index_page__["a" /* IndexPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_adminka_adminka__["a" /* AdminkaPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_registration_registration__["a" /* RegistrationPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_password_recovery_password_recovery__["a" /* PasswordRecoveryPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_rules_rules__["a" /* RulesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_confirm_code_confirm_code__["a" /* ConfirmCodePage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_item_details_item_details__["a" /* ItemDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_map_map_page__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_map_js_map_js_page__["a" /* MapJsPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_basket_basket__["a" /* BasketPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_category_category__["a" /* CategoryPage */],
                __WEBPACK_IMPORTED_MODULE_22__components_user_selection_user_selection__["a" /* UserSelectionComponent */],
                __WEBPACK_IMPORTED_MODULE_51__components_empty_card_empty_card__["a" /* EmptyCardComponent */],
                __WEBPACK_IMPORTED_MODULE_23__pages_user_selection_user_selection__["a" /* UserSelectionPage */],
                __WEBPACK_IMPORTED_MODULE_27__components_products_list_products_list__["a" /* ProductsListComponent */],
                __WEBPACK_IMPORTED_MODULE_30__pages_news_news__["a" /* NewsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_sommelier_sommelier__["a" /* SommelierPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_feedback_feedback__["a" /* FeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_faq_faq__["a" /* FaqPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_wishlist_wishlist__["a" /* WishlistPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_order_confirmation_order_confirmation__["a" /* OrderConfirmationPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_order_info_order_info__["a" /* OrderInfoPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_article_article__["a" /* ArticlePage */]
            ],
            providers: [
                //GoogleMaps,
                __WEBPACK_IMPORTED_MODULE_14__providers_user__["a" /* UserManager */],
                __WEBPACK_IMPORTED_MODULE_10__providers_iikoBizApi_service__["a" /* iikoBizApi */],
                __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_20__providers_nomenclatureProvider__["a" /* NomenclatureProvider */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_35__providers_userProducts__["a" /* UserProductsProvider */],
                __WEBPACK_IMPORTED_MODULE_36__providers_appConfig_service__["a" /* AppDebugConfigServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_37__providers_filterData_service__["a" /* FilterDataService */],
                __WEBPACK_IMPORTED_MODULE_42__providers_geocoder_service__["a" /* GeocoderService */],
                __WEBPACK_IMPORTED_MODULE_43__providers_stop_lists_stop_lists__["a" /* StopListsProvider */],
                __WEBPACK_IMPORTED_MODULE_50__providers_loader_counter_loader_counter__["a" /* LoaderCounterProvider */],
                __WEBPACK_IMPORTED_MODULE_52__providers_news_and_faq_news_and_faq__["a" /* NewsAndFaqProvider */],
                __WEBPACK_IMPORTED_MODULE_54__providers_email_sender_email_sender__["a" /* EmailSenderProvider */],
                __WEBPACK_IMPORTED_MODULE_55__providers_beer_alert_beer_alert__["a" /* BeerAlertProvider */]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BeerAlertProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BeerAlertProvider = (function () {
    function BeerAlertProvider(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    BeerAlertProvider.prototype.alert = function (msg, handler) {
        var alertWindow = this.alertCtrl.create({
            title: 'Пивная Культура',
            message: msg,
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        if (handler) {
                            return handler();
                        }
                    }
                }
            ]
        });
        return alertWindow.present();
    };
    BeerAlertProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], BeerAlertProvider);
    return BeerAlertProvider;
}());

//# sourceMappingURL=beer-alert.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_index_index_page__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_list_list__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_iikoBizApi_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_user__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_map_js_map_js_page__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_basket_basket__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_sommelier_sommelier__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_wishlist_wishlist__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_feedback_feedback__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_userProducts__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_stop_lists_stop_lists__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_loader_counter_loader_counter__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_news_news__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_faq_faq__ = __webpack_require__(303);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var MyApp = (function () {
    function MyApp(platform, menu, statusBar, splashScreen, userProducts, stopListsProvider, translate, config, iikoBizApi, userManager, loadingCtrl) {
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.userProducts = userProducts;
        this.stopListsProvider = stopListsProvider;
        this.translate = translate;
        this.config = config;
        this.iikoBizApi = iikoBizApi;
        this.userManager = userManager;
        this.loadingCtrl = loadingCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
        this.afterLoginPage = __WEBPACK_IMPORTED_MODULE_2__pages_index_index_page__["a" /* IndexPage */];
        this.faqPageMenuItem = { title: 'FAQ', component: __WEBPACK_IMPORTED_MODULE_19__pages_faq_faq__["a" /* FaqPage */] };
        this.initTranslate();
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Главная', component: __WEBPACK_IMPORTED_MODULE_2__pages_index_index_page__["a" /* IndexPage */] },
            // todo deniso func rss
            { title: 'Новости и акции', component: __WEBPACK_IMPORTED_MODULE_18__pages_news_news__["a" /* NewsPage */] },
            { title: 'Геолокация', component: __WEBPACK_IMPORTED_MODULE_10__pages_map_js_map_js_page__["a" /* MapJsPage */] },
            { title: 'Каталог', component: __WEBPACK_IMPORTED_MODULE_3__pages_list_list__["a" /* ListPage */] },
            { title: 'Подбор пива', component: __WEBPACK_IMPORTED_MODULE_12__pages_sommelier_sommelier__["a" /* SommelierPage */] },
            { title: 'Корзина', component: __WEBPACK_IMPORTED_MODULE_11__pages_basket_basket__["a" /* BasketPage */] },
            { title: 'Избранное', component: __WEBPACK_IMPORTED_MODULE_13__pages_wishlist_wishlist__["a" /* WishlistPage */] },
            { title: 'Напиши нам', component: __WEBPACK_IMPORTED_MODULE_14__pages_feedback_feedback__["a" /* FeedbackPage */] },
        ];
    }
    MyApp.prototype.initTranslate = function () {
        var _this = this;
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('ru');
        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        }
        else {
            this.translate.use('en'); // Set your language here
        }
        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(function (values) {
            _this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.loadingCtrl.show();
            _this.iikoBizApi.init()
                .then(function () { return _this.userManager.getLoggedUserInfo(); })
                .then(function (loggedInfo) {
                if (loggedInfo) {
                    _this.nav.setRoot(_this.afterLoginPage);
                    return _this.userManager.getGuestInfoById(loggedInfo.id);
                }
            })
                .then(function () { return _this.userManager.init(); })
                .then(function (userInfo) { return _this.initStopLists(userInfo); })
                .then(function () { return _this.loadingCtrl.hide(); });
        });
    };
    MyApp.prototype.initStopLists = function (userInfo) {
        console.log("initStopLists");
        if (userInfo) {
            this.stopListsProvider.getDeliveryStopList();
            //todo deniso remove debug, enable code
            // then(()=> this.userProducts.checkStopListItems())
        }
    };
    MyApp.prototype.logout = function () {
        var _this = this;
        this.userManager.logout().
            then(function (_) { return _this.menu.close(); }).
            then(function (_) { return _this.nav.setRoot(_this.rootPage); });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        // close the menu when clicking a link from the menu
        this.menu.close().then(function (_) {
            // navigate to the new page if it is not the current page
            return _this.nav.setRoot(page.component);
        });
    };
    MyApp.prototype.menuItemSubject = function (p) {
        var subj = this.userProducts.subjects[p.component.name];
        if (subj) {
            var value = subj.getValue();
            if (value) {
                return subj;
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/app/app.html"*/'<ion-menu id="mainMenu" [content]="content">\n  <ion-content>\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        &#183; {{p.title}}\n          <span *ngIf="menuItemSubject(p)" class="circle">{{menuItemSubject(p) | async}}</span>\n      </button>\n      <img class="logoMenu" src="./assets/img/logo.png">\n      <button ion-item id="faq" (click)="openPage(faqPageMenuItem)">\n        &#183; FAQ\n      </button>\n      <button ion-item id="exitButton" (click)="logout()">\n        &#183; Выйти\n      </button>\n\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_15__providers_userProducts__["a" /* UserProductsProvider */],
            __WEBPACK_IMPORTED_MODULE_16__providers_stop_lists_stop_lists__["a" /* StopListsProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Config */],
            __WEBPACK_IMPORTED_MODULE_6__providers_iikoBizApi_service__["a" /* iikoBizApi */],
            __WEBPACK_IMPORTED_MODULE_9__providers_user__["a" /* UserManager */],
            __WEBPACK_IMPORTED_MODULE_17__providers_loader_counter_loader_counter__["a" /* LoaderCounterProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProductsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nomenclatureProvider__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__stop_lists_stop_lists__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__beer_alert_beer_alert__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UserProductsProvider = (function () {
    function UserProductsProvider(storage, nomenclatureProvider, stopListsProvider, beerAlert) {
        var _this = this;
        this.storage = storage;
        this.nomenclatureProvider = nomenclatureProvider;
        this.stopListsProvider = stopListsProvider;
        this.beerAlert = beerAlert;
        this.products = null;
        this.basketAmountSubject = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](0);
        this.favoritesAmountSubject = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](0);
        this.subjects = {
            BasketPage: this.basketAmountSubject,
            WishlistPage: this.favoritesAmountSubject
        };
        this._cache = {
            favorites: null,
            basket: null
        };
        this.STORE_KEYS = {
            'FAVORITES': 'favorites',
            'BASKET': 'basket'
        };
        this._getBasket().then(function (data) {
            _this._cache.basket = data;
            _this.basketAmountSubject.next(_this._getBasketSizeCached());
        });
        this._getFavorites().then(function (data) {
            _this._cache.favorites = data;
            _this.favoritesAmountSubject.next(_this._getFavoritesSizeCached());
        });
    }
    UserProductsProvider.prototype._showMsg = function (msg) {
        return this.beerAlert.alert(msg);
    };
    ;
    UserProductsProvider.prototype._checkStopListedFavorites = function () {
        var _this = this;
        return this._getFavorites().then(function (result) {
            var someMoved = false;
            for (var itemId in result) {
                //todo deniso remove empty values
                if (!result[itemId]) {
                    continue;
                }
                //todo deniso check that exists in nomenclature
                if (_this.stopListsProvider.isStopListed(itemId) == false) {
                    _this.basketAdd(itemId, 1);
                    _this.favoritesToggle(itemId);
                    someMoved = true;
                }
            }
            return someMoved;
        });
    };
    UserProductsProvider.prototype._checkStopListedBasket = function () {
        var _this = this;
        return this._getBasket().then(function (result) {
            var someMoved = false;
            for (var itemId in result) {
                //todo deniso remove empty values
                if (!result[itemId]) {
                    continue;
                }
                //todo deniso check that exists in nomenclature
                if (_this.stopListsProvider.isStopListed(itemId) == true) {
                    _this.basketRemove(itemId, true);
                    //todo deeniso better use something like "add" instead of "toggle"
                    _this.favoritesToggle(itemId);
                    someMoved = true;
                }
            }
            return someMoved;
        });
    };
    UserProductsProvider.prototype.checkStopListItems = function () {
        var _this = this;
        this._checkStopListedFavorites().then(function (favoritesMoved) {
            return _this._showMsg("Покупки из Wishlist появились в продаже, проверьте корзину.");
        });
        this._checkStopListedBasket().then(function (basketMoved) {
            return _this._showMsg("К сожалению, некоторые позиции корзины пропали из продажи и временно перенесены в Wishlist.");
        });
    };
    UserProductsProvider.prototype._getFavoritesSizeCached = function () {
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["size"](__WEBPACK_IMPORTED_MODULE_4_lodash__["compact"](__WEBPACK_IMPORTED_MODULE_4_lodash__["values"](this._cache.favorites)));
    };
    UserProductsProvider.prototype._getFavorites = function () {
        var _this = this;
        return this.storage.get(this.STORE_KEYS.FAVORITES).
            then(function (x) {
            _this._cache.favorites = x || {};
            var size = _this._getFavoritesSizeCached();
            _this.favoritesAmountSubject.next(size);
            return _this._cache.favorites;
        });
    };
    UserProductsProvider.prototype._getBasketSizeCached = function () {
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["size"](__WEBPACK_IMPORTED_MODULE_4_lodash__["compact"](__WEBPACK_IMPORTED_MODULE_4_lodash__["values"](this._cache.basket)));
    };
    UserProductsProvider.prototype._getBasket = function () {
        var _this = this;
        return this.storage.get(this.STORE_KEYS.BASKET).
            then(function (x) {
            _this._cache.basket = x || {};
            var size = _this._getBasketSizeCached();
            _this.basketAmountSubject.next(size);
            return _this._cache.basket;
        });
    };
    UserProductsProvider.prototype.clearBasket = function () {
        this._cache.basket = {};
        this.basketAmountSubject.next(0);
        return this.storage.remove(this.STORE_KEYS.BASKET);
    };
    UserProductsProvider.prototype.isFavoriteCached = function (productId) {
        return this._cache.favorites[productId];
    };
    UserProductsProvider.prototype.isFavorite = function (productId) {
        return this._getFavorites().
            then(function (result) { return result[productId]; });
    };
    UserProductsProvider.prototype.favoritesToggle = function (productId) {
        var _this = this;
        return this._getFavorites().
            then(function (result) {
            result[productId] = !result[productId];
            _this._cache.favorites = result;
            return _this.storage.set(_this.STORE_KEYS.FAVORITES, result);
        });
    };
    UserProductsProvider.prototype.basketAmountCached = function (productId) {
        return this._cache.basket[productId] || 0;
    };
    UserProductsProvider.prototype.basketAmount = function (productId) {
        return this._getBasket().
            then(function (result) { return result[productId]; });
    };
    UserProductsProvider.prototype.basketAdd = function (productId, amount) {
        var _this = this;
        return this._getBasket().
            then(function (result) {
            if (amount) {
                result[productId] = amount;
            }
            else {
                result[productId] = result[productId] ? ++result[productId] : 1;
            }
            _this._cache.basket = result;
            return _this.storage.set(_this.STORE_KEYS.BASKET, result);
        });
    };
    UserProductsProvider.prototype.basketRemove = function (productId, totally) {
        var _this = this;
        return this._getBasket().
            then(function (result) {
            if (totally) {
                result[productId] = 0;
            }
            else {
                result[productId] = result[productId] ? --result[productId] : 0;
            }
            _this._cache.basket = result;
            return _this.storage.set(_this.STORE_KEYS.BASKET, result);
        });
    };
    UserProductsProvider.prototype.getBasketProducts = function () {
        var _this = this;
        return this._getBasket().
            then(function (ids) {
            return _this.nomenclatureProvider.getFiltered(function (beer) {
                var amount = ids[beer['id']];
                return amount !== 0 ? beer : null;
            });
        });
    };
    UserProductsProvider.prototype.getFavoritesProducts = function () {
        var _this = this;
        return this._getFavorites().
            then(function (ids) {
            return _this.nomenclatureProvider.getFiltered(function (beer) {
                var isFavorite = ids[beer['id']];
                return isFavorite ? beer : null;
            });
        });
    };
    UserProductsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1__nomenclatureProvider__["a" /* NomenclatureProvider */],
            __WEBPACK_IMPORTED_MODULE_5__stop_lists_stop_lists__["a" /* StopListsProvider */],
            __WEBPACK_IMPORTED_MODULE_6__beer_alert_beer_alert__["a" /* BeerAlertProvider */]])
    ], UserProductsProvider);
    return UserProductsProvider;
}());

//# sourceMappingURL=userProducts.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/*
  In case of empty map - most likely this is problems with API key.
  It is wrong, or necessary service is not enabled in Google API Console.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
import { UserManager } from "../../providers/user";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
*/
var MapPage = (function () {
    function MapPage() {
    }
    // Load map only after view is initialized
    MapPage.prototype.ngAfterViewInit = function () {
        this.loadMap();
    };
    MapPage.prototype.loadMap = function () {
        // make sure to create following structure in your view.html file
        // and add a height (for example 100%) to it, else the map won't be visible
        // <ion-content>
        //  <div #map id="map" style="height:100%;"></div>
        // </ion-content>
        // create a new map by passing HTMLElement
        // let element: HTMLElement = this.mapElement.nativeElement;
        var map;
        //let map: GoogleMap = this.googleMaps.create(element);
        // listen to MAP_READY event
        // You must wait for this event to fire before adding something to the map or modifying it in anyway
        /*
        map.one(GoogleMapsEvent.MAP_READY).then(
          () => {
            console.log('Map is ready!');
            // Now you can add elements to the map like the marker
          }
        );
        */
        // create CameraPosition
        var position = {
            target: {
                lat: 43.0741904,
                lng: -89.3809802
            },
            zoom: 18,
            tilt: 30
        };
        // move the map's camera to position
        map.moveCamera(position);
        var ionic = null; //new LatLng(43.0741904, -89.3809802);
        // create new marker
        var markerOptions = {
            position: ionic,
            title: 'Ionic'
        };
        map.addMarker(markerOptions)
            .then(function (marker /*: Marker*/) { return marker.showInfoWindow(); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", Object)
    ], MapPage.prototype, "mapElement", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-map',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/map/map-page.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Карта бутиков Native</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div #map id="map" style="height:100%;"></div>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/map/map-page.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map-page.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSelectionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserSelectionComponent = (function () {
    function UserSelectionComponent() {
        this.onSelectUser = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    UserSelectionComponent.prototype.selectUser = function () {
        //todo replace hardcoded value
        this.onSelectUser.emit(this.usersList[0]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], UserSelectionComponent.prototype, "usersList", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], UserSelectionComponent.prototype, "onSelectUser", void 0);
    UserSelectionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'user-selection',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/user-selection/user-selection.html"*/'<div>\n<ion-list radio-group>\n  <ion-item *ngFor="let u of usersList">\n    <ion-label>\n      {{ u.id }}\n    </ion-label>\n<!--\n    //todo how to put here multiline ?\n    <div item-content end>\n      {{ u.id }}<br />\n      {{ u.email }}\n    </div>\n-->\n    <ion-radio [value]="u.id"></ion-radio>\n  </ion-item>\n</ion-list>\n\n<button ion-button color="primary" (click)="selectUser()">Select</button>\n</div>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/user-selection/user-selection.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], UserSelectionComponent);
    return UserSelectionComponent;
}());

//# sourceMappingURL=user-selection.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProductsListComponent = (function () {
    function ProductsListComponent() {
        this.filter = null;
        this.showInvalid = false;
    }
    ProductsListComponent.prototype.isCorrectAny = function () {
        var _this = this;
        var products = this.products;
        var result = products && products.length &&
            __WEBPACK_IMPORTED_MODULE_1_lodash__["some"](products, function (item) { return _this.isCorrect(item); });
        return result;
    };
    ProductsListComponent.prototype.isCorrect = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        //console.log("isCorrect");
        if (this.filter === null) {
            return true;
        }
        else {
            return this.filter.apply(this, args);
        }
    };
    ProductsListComponent.prototype.ngOnChanges = function (changes) {
        //console.log("LIST change: ",changes);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProductsListComponent.prototype, "isChangeMode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], ProductsListComponent.prototype, "emptyMsg", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProductsListComponent.prototype, "isFavorite", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Function)
    ], ProductsListComponent.prototype, "filter", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], ProductsListComponent.prototype, "products", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProductsListComponent.prototype, "showInvalid", void 0);
    ProductsListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'products-list',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/products-list/products-list.html"*/'<ion-list class="catalog" *ngIf="isCorrectAny(); else sorryEmpty" >\n\n  <div *ngFor="let product of products">\n    <product-item *ngIf="isCorrect(product)" [data]="product" [showInvalid]="showInvalid"></product-item>\n  </div>\n</ion-list>\n<ng-template #sorryEmpty>\n  <div text-center>{{emptyMsg}}</div>\n  <!--<empty-card [msg]="emptyMsg"></empty-card>-->\n</ng-template>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/products-list/products-list.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ProductsListComponent);
    return ProductsListComponent;
}());

//# sourceMappingURL=products-list.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_userProducts__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_item_details_item_details__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_stop_lists_stop_lists__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__iikoStructures_BeerProduct_class__ = __webpack_require__(135);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProductItemComponent = (function () {
    function ProductItemComponent(userProducts, stopListsProvider, navCtrl) {
        this.userProducts = userProducts;
        this.stopListsProvider = stopListsProvider;
        this.navCtrl = navCtrl;
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.showInvalid = false;
        this.DESCRIPTION_MAX_LENGTH = 100;
        this.basketAmount = 0;
        this.fieldsToShow = [];
    }
    ProductItemComponent.prototype.descriptionLimited = function () {
        if (this.isFull) {
            return this.data.description;
        }
        else {
            var length_1 = this.data.description.indexOf(' ', this.DESCRIPTION_MAX_LENGTH);
            if (length_1 === -1) {
                return this.data.description;
            }
            else {
                return this.data.description.substr(0, length_1) + '...';
            }
        }
    };
    ProductItemComponent.prototype._setFieldToShow = function () {
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
    };
    Object.defineProperty(ProductItemComponent.prototype, "nonEmptyFieldsToShow", {
        get: function () {
            var _this = this;
            var fields = this.fieldsToShow.filter(function (field) {
                return _this.data[field[0]] || _this.data[field[0]] === 0;
            });
            return fields;
        },
        enumerable: true,
        configurable: true
    });
    ProductItemComponent.prototype.fieldValue = function (name) {
        return this.data[name];
    };
    ProductItemComponent.prototype.ngOnInit = function () {
        if (this.isFull) {
            this._setFieldToShow();
        }
        this.checkIsFavorite();
        this.checkBasketAmount();
    };
    ProductItemComponent.prototype.isStopListed = function () {
        return this.stopListsProvider.isStopListed(this.data['id']);
    };
    ProductItemComponent.prototype.isBasketButtonVisible = function () {
        return !this.basketAmount;
    };
    ProductItemComponent.prototype.toggleFavorites = function (event) {
        var _this = this;
        event.stopPropagation();
        this.userProducts.favoritesToggle(this.getId()).
            then(function () { return _this.checkIsFavorite(); });
    };
    ProductItemComponent.prototype.addToBasket = function (event) {
        var _this = this;
        event.stopPropagation();
        this.userProducts.basketAdd(this.getId()).
            then(function () { return _this.checkBasketAmount(); });
    };
    ProductItemComponent.prototype.removeFromBasket = function (event) {
        var _this = this;
        event.stopPropagation();
        this.userProducts.basketRemove(this.getId()).
            then(function () { return _this.checkBasketAmount(); });
    };
    ProductItemComponent.prototype.checkIsFavorite = function () {
        var _this = this;
        return this.userProducts.isFavorite(this.getId()).then(function (result) {
            //this.ref.markForCheck();
            _this.isFavorite = result;
        });
    };
    ProductItemComponent.prototype.checkBasketAmount = function () {
        var _this = this;
        return this.userProducts.basketAmount(this.getId()).then(function (result) {
            //this.ref.markForCheck();
            _this.basketAmount = result;
        });
    };
    ProductItemComponent.prototype.getImage = function () {
        var data = this.data;
        return data.images && data.images[0] && data.images[0].imageUrl;
    };
    ProductItemComponent.prototype.getId = function () {
        return this.data['id'];
    };
    ProductItemComponent.prototype.openItemFull = function () {
        if (!this.isFull) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_item_details_item_details__["a" /* ItemDetailsPage */], {
                item: this.data
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ProductItemComponent.prototype, "change", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__iikoStructures_BeerProduct_class__["d" /* BeerProduct */])
    ], ProductItemComponent.prototype, "data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProductItemComponent.prototype, "isFull", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProductItemComponent.prototype, "showInvalid", void 0);
    ProductItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'product-item',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/product-item/product-item.html"*/'<ion-card (click)="openItemFull()" tappable [ngClass]="{\'ffbeer-card-height\': !isFull, \'invalid-record\': !data.isValid && showInvalid}">\n  <ion-grid>\n    <ion-row [ngClass]="{\'favorite\': isFavorite}">\n      <ion-col text-center col-3>\n        <img *ngIf="getImage()" item-left src="{{getImage()}}" class="bottlePreview">\n      </ion-col>\n      <ion-col text-right col-9>\n\n        <ion-card-title text-left>{{data.name}}</ion-card-title>\n\n        <ion-item class="bottombuttons">\n          <span item-left>{{data.price}} руб</span>\n          <ion-icon *ngIf="!isFull"\n                    class="fav" (click)="toggleFavorites($event)" name="heart"></ion-icon>\n\n          <span *ngIf="!isStopListed() && !isBasketButtonVisible()"\n                item-right class="amounter">\n            <ion-icon class="remove" (click)="removeFromBasket($event)" item-left name="remove-circle"></ion-icon><span class="amount">{{basketAmount}}</span><ion-icon class="add" (click)="addToBasket($event)" item-right name="add-circle"></ion-icon>\n          </span>\n          <span *ngIf="!isStopListed() && isBasketButtonVisible() && !isFull"\n                item-right class="addtobasket cur_pnt"\n                (click)="addToBasket($event)">В корзину\n          </span>\n        </ion-item>\n\n        <p *ngIf="!isFull" class="description item-desc">{{descriptionLimited()}}</p>\n\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngIf="isFull">\n      <ion-col class="bottombuttons downBasket" text-right>\n        <span *ngIf="!isStopListed()" item-left\n               class="addtobasket cur_pnt left"\n               (click)="toggleFavorites($event)">В избраное</span>\n        <span item-right\n              class="addtobasket cur_pnt right"\n              (click)="addToBasket($event)">В&nbsp;корзину</span>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col *ngIf="isFull" >\n        <p class="description item-desc">{{descriptionLimited()}}</p>\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngFor="let field of nonEmptyFieldsToShow">\n      <ion-col col-6 class="col-named">{{field[1]}}: </ion-col><ion-col col-6>{{fieldValue(field[0])}}</ion-col>\n    </ion-row>\n\n    <ion-row *ngIf="!data.isValid && showInvalid">\n      <ion-col col-12>\n        Теги: {{data.tags}}\n      </ion-col>\n      <ion-col col-12>\n        Пустые поля:\n        <p *ngFor="let field of data.emptyFields">\n          {{field[0]}}\n        </p>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-card>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/product-item/product-item.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_userProducts__["a" /* UserProductsProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_stop_lists_stop_lists__["a" /* StopListsProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */]])
    ], ProductItemComponent);
    return ProductItemComponent;
}());

//# sourceMappingURL=product-item.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppDebugConfigServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppDebugConfigServiceProvider = (function () {
    function AppDebugConfigServiceProvider() {
    }
    AppDebugConfigServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AppDebugConfigServiceProvider);
    return AppDebugConfigServiceProvider;
}());

//# sourceMappingURL=appConfig.service.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ArticleListComponent = (function () {
    function ArticleListComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], ArticleListComponent.prototype, "itemsList", void 0);
    ArticleListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'article-list',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/article-list/article-list.html"*/'<div>\n  <ion-list>\n    <article-single *ngFor="let item of itemsList"\n        [item]="item" [isPreview]="true"></article-single>\n  </ion-list>\n</div>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/article-list/article-list.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ArticleListComponent);
    return ArticleListComponent;
}());

//# sourceMappingURL=article-list.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleSingleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_article_article__ = __webpack_require__(308);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ArticleSingleComponent = (function () {
    function ArticleSingleComponent(modalCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.isPreview = false;
        this.item = null;
    }
    ArticleSingleComponent.prototype.presentPopover = function () {
        if (this.isPreview) {
            var popover = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_article_article__["a" /* ArticlePage */], {
                item: this.item
            });
            popover.present();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ArticleSingleComponent.prototype, "isPreview", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ArticleSingleComponent.prototype, "item", void 0);
    ArticleSingleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'article-single',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/article-single/article-single.html"*/'<ion-card *ngIf="item" (click)="presentPopover()" [ngClass]="{\'ffbeer-card-height\': isPreview}">\n  <img *ngIf="item.preview_picture" [src]="item.preview_picture"/>\n  <ion-card-content>\n    <ion-card-title>\n      {{item.title}}\n    </ion-card-title>\n    <!--[class.text-preview]="isPreview"-->\n    <p *ngIf="!isPreview" [innerHTML]="item.detail_text | keepHtml"></p>\n  </ion-card-content>\n</ion-card>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/article-single/article-single.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ArticleSingleComponent);
    return ArticleSingleComponent;
}());

//# sourceMappingURL=article-single.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeepHtmlPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  with some minor changes
  https://medium.com/@AAlakkad/angular-2-display-html-without-sanitizing-filtering-17499024b079
 */
var KeepHtmlPipe = (function () {
    function KeepHtmlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    KeepHtmlPipe.prototype.transform = function (content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    };
    KeepHtmlPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'keepHtml',
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], KeepHtmlPipe);
    return KeepHtmlPipe;
}());

//# sourceMappingURL=keep-html.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmptyCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmptyCardComponent = (function () {
    function EmptyCardComponent() {
    }
    EmptyCardComponent.prototype.ionViewDidEnter = function () {
        if (!this.msg) {
            this.msg = "Извините, ничего не найдено";
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], EmptyCardComponent.prototype, "msg", void 0);
    EmptyCardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'empty-card',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/empty-card/empty-card.html"*/'<ion-card class="ffbeer-card-height">\n  <ion-card-content text-center>\n    {{msg}}\n  </ion-card-content>\n</ion-card>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/components/empty-card/empty-card.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], EmptyCardComponent);
    return EmptyCardComponent;
}());

//# sourceMappingURL=empty-card.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_user__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_qrcode__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_qrcode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_qrcode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var IndexPage = (function () {
    function IndexPage(user) {
        this.user = user;
        //should be empty
        this.pageTitle = '';
        this.qrDone = false;
        this.qrError = "";
        this.bonuses = 0;
    }
    Object.defineProperty(IndexPage.prototype, "bonusesPlural", {
        get: function () {
            return this._declOfNum(this.bonuses, ['бонус', 'бонуса', 'бонусов']);
        },
        enumerable: true,
        configurable: true
    });
    ;
    // https://gist.github.com/realmyst/1262561
    IndexPage.prototype._declOfNum = function (number, titles) {
        number = Math.floor(number);
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    };
    IndexPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.user.getLoggedGuestInfo().then(function (user) {
            if (user && user.walletBalances && user.walletBalances[0]) {
                _this.bonuses = user.walletBalances[0].balance;
            }
        });
        this.user.getUserGreeting().then(function (greeting) { return _this.greeting = greeting; });
        this.user.getLoggedCardInfo().then(function (cardInfo) {
            var qrCodeSource = cardInfo && cardInfo.Track;
            if (qrCodeSource) {
                _this.drawQrCode(qrCodeSource);
            }
            else {
                _this.qrError = "Извините, у пользователя отсутствует информация о картах :( \n"
                    + "Обратитесь, пожалуйста, в тех поддержку.";
            }
        });
    };
    IndexPage.prototype.drawQrCode = function (code) {
        //if (this.qrDone) return;
        //todo deniso remove hardcode
        var qrVersion = 3; //empirical
        var qrModules = 37; //for ver=3? but should be for 5
        var paddingWidth = 20;
        var contentWidth = this.content.contentWidth - paddingWidth;
        var contentHeight = this.content.contentHeight - paddingWidth;
        var contentMinEdge = Math.min(contentWidth, Math.round(contentHeight / 2));
        var scale = Math.floor(contentMinEdge / qrModules);
        var maxScale = 8;
        scale = scale > maxScale ? maxScale : scale;
        console.log("scale: ", scale);
        var options = {
            version: qrVersion,
            scale: scale,
            color: {
                dark: '#000',
                light: '#0000' // Transparent background
            }
        };
        __WEBPACK_IMPORTED_MODULE_2_qrcode__["toCanvas"](this.QRCodeCanvas.nativeElement, code, options, function (error) {
            if (error)
                console.error(error);
        });
        this.qrDone = true;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Content */])
    ], IndexPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('QRCodeCanvas'),
        __metadata("design:type", Object)
    ], IndexPage.prototype, "QRCodeCanvas", void 0);
    IndexPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-index',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/index/index-page.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" id="menuIcon"></ion-icon>\n    </button>\n    <ion-title>{{pageTitle}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div class="qrCodeBox">\n    <p text-center class="hello">{{greeting}}</p>\n    <p *ngIf="bonuses" text-center class="helloLast">\n      У Вас\n      <span class="bonusCounter">{{bonuses}}</span>\n      {{bonusesPlural}}.\n    </p>\n    <canvas *ngIf="!qrError" #QRCodeCanvas id="QRCodeCanvas" class="qrCode"></canvas>\n    <h2 *ngIf="qrError" id="qrError" text-center>{{qrError}}</h2>\n  </div>\n  <div class="logoIndex">\n    <img src="./assets/img/logo.png" />\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/index/index-page.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_user__["a" /* UserManager */]])
    ], IndexPage);
    return IndexPage;
}());

//# sourceMappingURL=index-page.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NomenclatureProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iikoBizApi_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__iikoStructures_BeerProduct_class__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loader_counter_loader_counter__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NomenclatureProvider = (function () {
    function NomenclatureProvider(user, iikoBizApi, loadingCtrl) {
        this.user = user;
        this.iikoBizApi = iikoBizApi;
        this.loadingCtrl = loadingCtrl;
        this.products = [];
    }
    /**
     * Nomenclature response returned from server
     * @returns {Promise<NomenclatureAPI.NomenclatureResponse>}
     */
    NomenclatureProvider.prototype._getRaw = function () {
        var _this = this;
        if (!this._rawPromise) {
            this.loadingCtrl.show();
            this._rawPromise = this.user.getOrganizationFirst().then(function (organization) {
                return _this.iikoBizApi.api().nomenclature.organizationId({ organizationId: organization.id }).get()
                    .then(function (result) {
                    _this.loadingCtrl.hide();
                    return result;
                })
                    .then(function (result) { return result.body; })
                    .catch(function (e) {
                    console.error("Failed to get nomenclature: ", e);
                    _this._rawPromise = null;
                });
            })
                .catch(function (e) {
                console.error("Failed to get organization for nomenclature: ", e);
                _this._rawPromise = null;
            });
        }
        return this._rawPromise;
    };
    NomenclatureProvider.prototype.getAll = function () {
        var _this = this;
        if (!this._allPromise) {
            this._allPromise = this._getRaw()
                .then(function (data) { return _this._importRaw(data); });
        }
        return this._allPromise;
    };
    NomenclatureProvider.prototype._importRaw = function (nomenclature) {
        for (var _i = 0, _a = nomenclature.products; _i < _a.length; _i++) {
            var productData = _a[_i];
            var beerProduct = Object(__WEBPACK_IMPORTED_MODULE_3__iikoStructures_BeerProduct_class__["c" /* BeerFactory */])(productData);
            if (beerProduct) {
                this.products.push(beerProduct);
            }
        }
        return this.products;
    };
    NomenclatureProvider.prototype.getFiltered = function (filter) {
        return this.getAll().then(function (beerProducts) {
            var products = beerProducts.map(function (p) { return filter(p); });
            return __WEBPACK_IMPORTED_MODULE_4_lodash__["compact"](products);
        });
    };
    NomenclatureProvider.prototype._convertNomenclatureToTree = function (nomenclature, products) {
        var result = [];
        if (nomenclature) {
            var productsGroupped_1 = __WEBPACK_IMPORTED_MODULE_4_lodash__["groupBy"](products, 'parentGroup');
            console.log('productsGroupped', productsGroupped_1);
            result /*: NomenclatureCategoryWithNestedProducts[]*/ = __WEBPACK_IMPORTED_MODULE_4_lodash__["map"](nomenclature.groups, function (group) {
                var productsPerGroup = productsGroupped_1[group.id];
                if (productsPerGroup) {
                    group['_products'] = productsPerGroup || [];
                    return group;
                }
                else {
                    return null;
                }
            });
            result = __WEBPACK_IMPORTED_MODULE_4_lodash__["compact"](result);
        }
        return result;
    };
    /**
     * Nomenclature categories with nested products
     * @returns {Promise<any>}
     */
    NomenclatureProvider.prototype.productGroupsTree = function () {
        var _this = this;
        var result = Promise.all([this._getRaw(), this.getAll()]).
            then(function (result) {
            var nomenclature = result[0], products = result[1];
            return _this._convertNomenclatureToTree(nomenclature, products);
        });
        return result;
    };
    NomenclatureProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user__["a" /* UserManager */],
            __WEBPACK_IMPORTED_MODULE_1__iikoBizApi_service__["a" /* iikoBizApi */],
            __WEBPACK_IMPORTED_MODULE_5__loader_counter_loader_counter__["a" /* LoaderCounterProvider */]])
    ], NomenclatureProvider);
    return NomenclatureProvider;
}());

//# sourceMappingURL=nomenclatureProvider.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_index_page__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_selection_user_selection__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__adminka_adminka__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__registration_registration__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__password_recovery_password_recovery__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_beer_alert_beer_alert__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = (function () {
    // Our translated text strings
    //private loginErrorString: string;
    function LoginPage(navCtrl, modalCtrl, user, menu, beerAlert) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.user = user;
        this.menu = menu;
        this.beerAlert = beerAlert;
        // The account fields for the login form.
        // If you're using the username field with or without email, make
        // sure to add it to the type
        this.defaultPhone = '(999)1234567';
        this.account = {
            phone: '',
            email: 'test@example.com',
            password: ''
        };
        /*
            this.translateService.get('LOGIN_ERROR').subscribe((value) => {
              this.loginErrorString = value;
            })
        */
    }
    //todo deinso may be during optimization replace with ionViewDidEnter ?
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        this.user.getLastPhoneLogged().then(function (phone) {
            console.log("LAST PHONE: " + phone);
            if (phone) {
                var phoneMasked = phone.replace(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/, '($1) $2-$3-$4');
                if (phoneMasked) {
                    _this.account.phone = phoneMasked;
                }
                else {
                    console.log("No phone masked");
                }
            }
        });
    };
    LoginPage.prototype.onUserSelection = function (usersList) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var userSelection = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__user_selection_user_selection__["a" /* UserSelectionPage */], { usersList: usersList });
            userSelection.onDidDismiss(
            //todo handle reject
            function (data, role) { return data ? resolve(data) : reject(); });
            userSelection.present();
        });
    };
    LoginPage.prototype.onCardSelection = function (cardsList) {
        return Promise.resolve(cardsList[0]);
    };
    // Attempt to login in through our UserManager service
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        var showErr = function (err) {
            return _this.beerAlert.alert(err);
        };
        var phoneNumberCleared = (this.account.phone || "").replace(/[^\d+]/g, '');
        if (phoneNumberCleared == '000') {
            this.account.phone = this.defaultPhone;
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__adminka_adminka__["a" /* AdminkaPage */]);
        }
        else {
            if (!this.account.phone || (this.account.phone.length < 10 && this.account.phone.length !== 3)) {
                //todo deniso make proper validation
                //https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/
                return this.beerAlert.alert('Пожалуйста, введите номер телефона');
            }
            this.user.login(this.account, this.onUserSelection.bind(this), this.onCardSelection.bind(this))
                .then(function () { return _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__index_index_page__["a" /* IndexPage */]); })
                .catch(function (msg) {
                showErr(msg);
            });
        }
    };
    LoginPage.prototype.registration = function () {
        //wtf? seems to be accidentally copied code
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__registration_registration__["a" /* RegistrationPage */]);
    };
    LoginPage.prototype.restoreRassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__password_recovery_password_recovery__["a" /* PasswordRecoveryPage */], { phone: this.account.phone });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/login/login.html"*/'<ion-content>\n  <img class="loginLogo" src="./assets/img/logo.png">\n  <form id="loginForm" (submit)="doLogin()">\n    <ion-list>\n\n      <ion-item id="numberPhone">\n        <ion-label no-padding>+7</ion-label>\n        <ion-input #phone required minlength="14"\n                   no-padding type="tel" [(ngModel)]="account.phone" name="phone"\n                   text-left placeholder="введите телефон"></ion-input>\n      </ion-item>\n\n      <div text-center *ngIf="phone.invalid"\n           class="ffbeer-error-hint">Введите пожалуйста телефон <br/> в формате +7 (999) 1234567</div>\n\n      <ion-item id="password">\n        <!-- label made specially to align login and pwd fields -->\n        <ion-label no-padding style="visibility: hidden">+7</ion-label>\n        <ion-input no-padding [(ngModel)]="account.password" name="password"\n                   text-left placeholder="введите пароль" type="password"></ion-input>\n      </ion-item>\n\n      <div>\n        <button id="enterButton" ion-button color="white" block>ВОЙТИ</button>\n      </div>\n    </ion-list>\n  </form>\n\n  <div id="additionalButtons">\n    <a href="#" float-left (click)="registration()">Регистрация</a>\n    <a href="#" float-right (click)="restoreRassword()">Забыл пароль</a>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/alex/Development/ffbeer/first-federation-mobile-app/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user__["a" /* UserManager */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_8__providers_beer_alert_beer_alert__["a" /* BeerAlertProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StopListsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iikoBizApi_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loader_counter_loader_counter__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StopListsProvider = (function () {
    function StopListsProvider(user, loadingCtrl, iikoBizApi) {
        this.user = user;
        this.loadingCtrl = loadingCtrl;
        this.iikoBizApi = iikoBizApi;
        this._isStopListPresent = false;
    }
    StopListsProvider.prototype.getDeliveryStopList = function () {
        var _this = this;
        console.log("getDeliveryStopList");
        if (typeof this._rawCache !== "undefined") {
            console.log("getDeliveryStopList - cached");
            return Promise.resolve(this._rawCache);
        }
        else {
            console.log("getDeliveryStopList - loader show");
            this.loadingCtrl.show();
            return this.user.getOrganizationFirst().then(function (organization) {
                return _this.iikoBizApi.api().stopLists.getDeliveryStopList.get({ organization: organization.id })
                    .then(function (result) {
                    console.log("getDeliveryStopList - really got it");
                    _this._rawCache = result.body;
                    _this._isStopListPresent = !!(_this._rawCache.stopList || [])[0];
                    return _this._rawCache;
                });
            })
                .then(function (result) {
                console.log("getDeliveryStopList - loader hide");
                _this.loadingCtrl.hide();
                return result;
            });
        }
    };
    StopListsProvider.prototype.isStopListed = function (productId) {
        if (!this._isStopListPresent) {
            return false;
        }
        //todo deniso - summarize all stoplists to get union items
        var result = productId && __WEBPACK_IMPORTED_MODULE_3_lodash__["some"](this._rawCache.stopList[0].items, function (item) {
            return item['productId'] == productId;
        });
        return result;
    };
    StopListsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user__["a" /* UserManager */],
            __WEBPACK_IMPORTED_MODULE_4__loader_counter_loader_counter__["a" /* LoaderCounterProvider */],
            __WEBPACK_IMPORTED_MODULE_1__iikoBizApi_service__["a" /* iikoBizApi */]])
    ], StopListsProvider);
    return StopListsProvider;
}());

//# sourceMappingURL=stop-lists.js.map

/***/ })

},[310]);
//# sourceMappingURL=main.js.map