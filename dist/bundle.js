/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller_lottoController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/lottoController */ "./src/js/controller/lottoController.js");

new _controller_lottoController__WEBPACK_IMPORTED_MODULE_0__["default"]();

/***/ }),

/***/ "./src/js/controller/constants.js":
/*!****************************************!*\
  !*** ./src/js/controller/constants.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ERROR_MESSAGE": () => (/* binding */ ERROR_MESSAGE),
/* harmony export */   "MONEY_INPUT": () => (/* binding */ MONEY_INPUT),
/* harmony export */   "LOTTO_PRICE": () => (/* binding */ LOTTO_PRICE),
/* harmony export */   "WINNING_LOTTO_DIGIT": () => (/* binding */ WINNING_LOTTO_DIGIT),
/* harmony export */   "WINNING_RANK_SIZE": () => (/* binding */ WINNING_RANK_SIZE),
/* harmony export */   "MATCHED_COUNT": () => (/* binding */ MATCHED_COUNT),
/* harmony export */   "LOTTO_INDEX": () => (/* binding */ LOTTO_INDEX),
/* harmony export */   "PRIZE": () => (/* binding */ PRIZE)
/* harmony export */ });
var ERROR_MESSAGE = {
  INVALID_MONEY_INPUT: '금액은 1000의 배수이고 1000원 이상 10000원 이하여야 합니다.',
  DUPLICATED_WINNING_INPUT: '당첨 번호는 중복되어서는 안 됩니다.'
};
var MONEY_INPUT = {
  MIN_PRICE: 1000,
  MAX_PRICE: 10000
};
var LOTTO_PRICE = 1000;
var WINNING_LOTTO_DIGIT = 7;
var WINNING_RANK_SIZE = 5;
var MATCHED_COUNT = {
  MIN: 3,
  FIVE_MATCHED: 5,
  SIX_MATCHED: 6
};
var LOTTO_INDEX = {
  BONUS: 6
};
var PRIZE = {
  FIFTH_PLACE: 5000,
  FOURTH_PLACE: 50000,
  THIRD_PLACE: 1500000,
  SEONCD_PLACE: 30000000,
  FIRST_PLACE: 2000000000
};

/***/ }),

/***/ "./src/js/controller/lottoController.js":
/*!**********************************************!*\
  !*** ./src/js/controller/lottoController.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LottoController)
/* harmony export */ });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./src/js/utils/dom.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/js/controller/constants.js");
/* harmony import */ var _validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validator */ "./src/js/controller/validator.js");
/* harmony import */ var _model_Lotto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/Lotto */ "./src/js/model/Lotto.js");
/* harmony import */ var _view_lottoView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/lottoView */ "./src/js/view/lottoView.js");
/* harmony import */ var _utils_maxLengthHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/maxLengthHandler */ "./src/js/utils/maxLengthHandler.js");
/* harmony import */ var _view_modalView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../view/modalView */ "./src/js/view/modalView.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var LottoController = /*#__PURE__*/_createClass(function LottoController() {
  var _this = this;

  _classCallCheck(this, LottoController);

  _defineProperty(this, "resetLotto", function () {
    _this.lottos = [];
    _this.winningLottos = [];
    (0,_view_lottoView__WEBPACK_IMPORTED_MODULE_4__.resetView)();
  });

  _defineProperty(this, "getLottos", function (moneyInput) {
    var numberOfLottos = parseInt(moneyInput / _constants__WEBPACK_IMPORTED_MODULE_1__.LOTTO_PRICE);

    for (var i = 0; i < numberOfLottos; i += 1) {
      _this.lottos.push(new _model_Lotto__WEBPACK_IMPORTED_MODULE_3__["default"]());
    }
  });

  _defineProperty(this, "purchaseHandler", function (e) {
    e.preventDefault();
    var moneyInput = Number((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.money-input').value);

    if (!(0,_validator__WEBPACK_IMPORTED_MODULE_2__.isValidMoneyInput)(moneyInput)) {
      alert(_constants__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }

    _this.getLottos(moneyInput);

    (0,_view_lottoView__WEBPACK_IMPORTED_MODULE_4__.showResult)(_this.lottos);
  });

  _defineProperty(this, "getHowManyMatched", function (lotto) {
    var matchedCount = 0;

    _this.winningLottos.forEach(function (winningNumber, index) {
      if (index === _constants__WEBPACK_IMPORTED_MODULE_1__.LOTTO_INDEX.BONUS) return;

      if (lotto.find(function (number) {
        return number === winningNumber;
      })) {
        matchedCount += 1;
      }
    });

    return matchedCount;
  });

  _defineProperty(this, "saveMatchedCount", function () {
    _this.lottos.forEach(function (lotto) {
      var matchedCount = _this.getHowManyMatched(lotto.lottoNumbers);

      if (matchedCount >= _constants__WEBPACK_IMPORTED_MODULE_1__.MATCHED_COUNT.MIN) {
        lotto.matchedCount = matchedCount;
      }
    });
  });

  _defineProperty(this, "isSecondPlace", function (winner) {
    return winner.matchedCount === _constants__WEBPACK_IMPORTED_MODULE_1__.MATCHED_COUNT.FIVE_MATCHED && winner.lottoNumbers.find(function (number) {
      return number === _this.winningLottos[_constants__WEBPACK_IMPORTED_MODULE_1__.LOTTO_INDEX.BONUS];
    });
  });

  _defineProperty(this, "isFirstPlace", function (matchedCount) {
    return matchedCount === _constants__WEBPACK_IMPORTED_MODULE_1__.MATCHED_COUNT.SIX_MATCHED;
  });

  _defineProperty(this, "getWinnerStatistic", function () {
    var winnerStatistic = new Array(_constants__WEBPACK_IMPORTED_MODULE_1__.WINNING_RANK_SIZE).fill(0);

    var winners = _this.lottos.filter(function (lotto) {
      return lotto.matchedCount >= _constants__WEBPACK_IMPORTED_MODULE_1__.MATCHED_COUNT.MIN;
    });

    winners.forEach(function (winner) {
      if (_this.isSecondPlace(winner) || _this.isFirstPlace(winner.matchedCount)) {
        winnerStatistic[winner.matchedCount - 2] += 1;
        return;
      }

      winnerStatistic[winner.matchedCount - 3] += 1;
    });
    return winnerStatistic;
  });

  _defineProperty(this, "getEarningsRate", function (winnerStatistic) {
    var cost = Number((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.money-input').value);
    var prizes = [_constants__WEBPACK_IMPORTED_MODULE_1__.PRIZE.FIFTH_PLACE, _constants__WEBPACK_IMPORTED_MODULE_1__.PRIZE.FOURTH_PLACE, _constants__WEBPACK_IMPORTED_MODULE_1__.PRIZE.THIRD_PLACE, _constants__WEBPACK_IMPORTED_MODULE_1__.PRIZE.SEONCD_PLACE, _constants__WEBPACK_IMPORTED_MODULE_1__.PRIZE.FIRST_PLACE];
    var profit = winnerStatistic.map(function (matchedCount, index) {
      return matchedCount * prizes[index];
    }).reduce(function (sum, currentValue) {
      return sum + currentValue;
    }, 0);
    return Math.round((profit - cost) / cost * 100);
  });

  _defineProperty(this, "winningLottoHandler", function (e) {
    e.preventDefault();
    var winningNumbers = Array.prototype.slice.call((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$$)('.winning-numbers')).map(function (input) {
      return input.value;
    });

    if ((0,_validator__WEBPACK_IMPORTED_MODULE_2__.isDuplicatedLottos)(winningNumbers)) {
      alert(_constants__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGE.DUPLICATED_WINNING_INPUT);
      return;
    }

    _this.winningLottos = winningNumbers.map(function (number) {
      return +number;
    });

    _this.saveMatchedCount();

    var winnerStatistic = _this.getWinnerStatistic();

    var earningsRate = _this.getEarningsRate(winnerStatistic);

    (0,_view_modalView__WEBPACK_IMPORTED_MODULE_6__.showWinnerModal)(winnerStatistic, earningsRate);
  });

  this.lottos = [];
  this.winningLottos = [];
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.purchase-form').addEventListener('submit', this.purchaseHandler);
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.cm-toggle').addEventListener('click', _view_lottoView__WEBPACK_IMPORTED_MODULE_4__.toggleNumberDetail);
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.winning-numbers-form').addEventListener('submit', this.winningLottoHandler);
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$$)('.winning-numbers').forEach(function (input) {
    return input.addEventListener('input', _utils_maxLengthHandler__WEBPACK_IMPORTED_MODULE_5__.maxLengthHandler);
  });
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.modal-closer').addEventListener('click', _view_modalView__WEBPACK_IMPORTED_MODULE_6__.closeModal);
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.restart').addEventListener('click', this.resetLotto);
});



/***/ }),

/***/ "./src/js/controller/validator.js":
/*!****************************************!*\
  !*** ./src/js/controller/validator.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isThousandMultiple": () => (/* binding */ isThousandMultiple),
/* harmony export */   "isOverThouand": () => (/* binding */ isOverThouand),
/* harmony export */   "isUnderTenThousand": () => (/* binding */ isUnderTenThousand),
/* harmony export */   "isValidMoneyRange": () => (/* binding */ isValidMoneyRange),
/* harmony export */   "isValidMoneyInput": () => (/* binding */ isValidMoneyInput),
/* harmony export */   "isDuplicatedLottos": () => (/* binding */ isDuplicatedLottos)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/controller/constants.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var isThousandMultiple = function isThousandMultiple(money) {
  return money % _constants__WEBPACK_IMPORTED_MODULE_0__.MONEY_INPUT.MIN_PRICE === 0;
};
var isOverThouand = function isOverThouand(money) {
  return money >= _constants__WEBPACK_IMPORTED_MODULE_0__.MONEY_INPUT.MIN_PRICE;
};
var isUnderTenThousand = function isUnderTenThousand(money) {
  return money <= _constants__WEBPACK_IMPORTED_MODULE_0__.MONEY_INPUT.MAX_PRICE;
};
var isValidMoneyRange = function isValidMoneyRange(money) {
  return isOverThouand(money) && isUnderTenThousand(money);
};
var isValidMoneyInput = function isValidMoneyInput(money) {
  return isThousandMultiple(money) && isValidMoneyRange(money);
};
var isDuplicatedLottos = function isDuplicatedLottos(lottos) {
  return new Set(_toConsumableArray(lottos)).size !== _constants__WEBPACK_IMPORTED_MODULE_0__.WINNING_LOTTO_DIGIT;
};

/***/ }),

/***/ "./src/js/model/Lotto.js":
/*!*******************************!*\
  !*** ./src/js/model/Lotto.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Lotto)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/model/constants.js");
/* harmony import */ var _utils_number__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/number */ "./src/js/utils/number.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Lotto = /*#__PURE__*/_createClass(function Lotto() {
  var _this = this;

  _classCallCheck(this, Lotto);

  _defineProperty(this, "generateLottoNumbers", function () {
    while (_this.lottoNumbers.length < _constants__WEBPACK_IMPORTED_MODULE_0__.LOTTO_DIGIT) {
      var randomNumber = (0,_utils_number__WEBPACK_IMPORTED_MODULE_1__.generateRandomNumber)();

      if (!_this.lottoNumbers.includes(randomNumber)) {
        _this.lottoNumbers.push(randomNumber);
      }
    }
  });

  this.lottoNumbers = [];
  this.matchedCount = 0;
  this.generateLottoNumbers();
});



/***/ }),

/***/ "./src/js/model/constants.js":
/*!***********************************!*\
  !*** ./src/js/model/constants.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LOTTO_DIGIT": () => (/* binding */ LOTTO_DIGIT)
/* harmony export */ });
var LOTTO_DIGIT = 6;

/***/ }),

/***/ "./src/js/utils/dom.js":
/*!*****************************!*\
  !*** ./src/js/utils/dom.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ $),
/* harmony export */   "$$": () => (/* binding */ $$)
/* harmony export */ });
var $ = function $(selector) {
  var baseElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return baseElement.querySelector(selector);
};
var $$ = function $$(selector) {
  var baseElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return baseElement.querySelectorAll(selector);
};

/***/ }),

/***/ "./src/js/utils/maxLengthHandler.js":
/*!******************************************!*\
  !*** ./src/js/utils/maxLengthHandler.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "maxLengthHandler": () => (/* binding */ maxLengthHandler)
/* harmony export */ });
var LOTTO_NUMBER_MAX_LENGTH = 2;
var maxLengthHandler = function maxLengthHandler(event) {
  if (event.target.value.length > LOTTO_NUMBER_MAX_LENGTH) {
    event.target.value = event.target.value.slice(0, LOTTO_NUMBER_MAX_LENGTH);
  }
};

/***/ }),

/***/ "./src/js/utils/number.js":
/*!********************************!*\
  !*** ./src/js/utils/number.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateRandomNumber": () => (/* binding */ generateRandomNumber)
/* harmony export */ });
var LOTTO_MAX_NUMBER = 45;
var generateRandomNumber = function generateRandomNumber() {
  return Math.floor(Math.random() * LOTTO_MAX_NUMBER) + 1;
};

/***/ }),

/***/ "./src/js/view/lottoView.js":
/*!**********************************!*\
  !*** ./src/js/view/lottoView.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resetView": () => (/* binding */ resetView),
/* harmony export */   "toggleNumberDetail": () => (/* binding */ toggleNumberDetail),
/* harmony export */   "showResult": () => (/* binding */ showResult)
/* harmony export */ });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./src/js/utils/dom.js");
/* harmony import */ var _modalView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modalView */ "./src/js/view/modalView.js");



var hideResultElements = function hideResultElements() {
  var lottoGrid = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.lotto-grid');
  lottoGrid.innerHTML = '';
  lottoGrid.classList.remove('lotto-grid-detail');
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$$)('.result').forEach(function (element) {
    return element.classList.add('d-none');
  });
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.inform-text').remove();
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.cm-toggle').checked = false;
};

var activateForm = function activateForm() {
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.money-input').removeAttribute('disabled');
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.purchase-button').removeAttribute('disabled');
};

var resetInputValue = function resetInputValue() {
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.money-input').value = '';
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$$)('.winning-numbers').forEach(function (element) {
    return element.value = '';
  });
};

var resetView = function resetView() {
  (0,_modalView__WEBPACK_IMPORTED_MODULE_1__.closeModal)();
  hideResultElements();
  activateForm();
  resetInputValue();
};

var showNumberOfLottos = function showNumberOfLottos(length) {
  var template = "<span class=\"inform-text\">\uCD1D ".concat(length, "\uAC1C\uB97C \uAD6C\uB9E4\uD558\uC600\uC2B5\uB2C8\uB2E4.</span>");
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.purchase-status-container').insertAdjacentHTML('afterbegin', template);
};

var showResultElements = function showResultElements() {
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$$)('.result').forEach(function (element) {
    return element.classList.remove('d-none');
  });
};

var showLottoImage = function showLottoImage(lottos) {
  var template = lottos.map(function (lotto) {
    return "<div class=\"lotto-img\">\n      \uD83C\uDF9F\uFE0F<span class=\"lotto-number-detail d-none\">".concat(lotto.lottoNumbers.join(', '), "</span>\n    </div>");
  }).join('');
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.lotto-grid').insertAdjacentHTML('beforeend', template);
};

var toggleNumberDetail = function toggleNumberDetail() {
  var lottoGrid = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.lotto-grid');
  lottoGrid.classList.toggle('lotto-grid-detail');
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$$)('.lotto-number-detail').forEach(function (element) {
    element.classList.toggle('d-none');
  });
};

var deactivateForm = function deactivateForm() {
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.money-input').setAttribute('disabled', true);
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.purchase-button').setAttribute('disabled', true);
};

var showResult = function showResult(lottos) {
  deactivateForm();
  showResultElements();
  showNumberOfLottos(lottos.length);
  showLottoImage(lottos);
};

/***/ }),

/***/ "./src/js/view/modalView.js":
/*!**********************************!*\
  !*** ./src/js/view/modalView.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "showWinnerModal": () => (/* binding */ showWinnerModal)
/* harmony export */ });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./src/js/utils/dom.js");

var closeModal = function closeModal() {
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.modal-container').classList.add('d-none');
};

var showWinningCount = function showWinningCount(winnersStatistic) {
  var winningCountElements = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$$)('.winning-count');
  winningCountElements.forEach(function (element, index) {
    element.textContent = "".concat(winnersStatistic[index], "\uAC1C");
  });
};

var showEarningsRate = function showEarningsRate(earningsRate) {
  var earningsRateElement = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.earnings-rate');
  earningsRateElement.textContent = earningsRate;
};

var showWinnerModal = function showWinnerModal(winnerStatistic, earningsRate) {
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.$)('.modal-container').classList.remove('d-none');
  showWinningCount(winnerStatistic);
  showEarningsRate(earningsRate);
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/index.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/index.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background: #F9F9F9;\n}\n\n#app {\n  position: absolute;\n  left: 50%;\n  transform: translate(-50%, 0);\n  padding: 20px;\n  background: #FFFFFF;\n  font-family: Roboto;\n}\n\nheader {\n  padding: 20px;\n}\n\nheader h1 {\n  font-style: normal;\n  font-weight: 600;\n  font-size: 34px;\n  line-height: 36px;\n  text-align: center;\n}\n\n.money-input-text {\n  font-style: normal;\n  font-weight: normal;\n  font-size: 15px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n  margin-bottom: 5px;\n}\n\n.money-input {\n  width: 310px;\n  height: 36px;\n  border: 1px solid #B4B4B4;\n  box-sizing: border-box;\n  border-radius: 4px;\n  flex: none;\n  order: 1;\n  align-self: stretch;\n  flex-grow: 0;\n  margin: 4px 0px;\n}\n\n.purchase-button {\n  width: 56px;\n  height: 36px;\n  background: #00BCD4;\n  border-radius: 4px;\n  color: #FFFFFF;\n  border: none;\n  margin-left: 10px;\n}\n\n.purchase-button:hover {\n  cursor: pointer;\n}\n\n.purchase-status-container {\n  margin-top: 28px;\n  display: flex;\n  justify-content: space-between;\n}\n\n.lotto-grid {\n  display: grid;\n  margin: 10px 0px 30px 0px;\n  grid-template-columns: repeat(5, 1fr);\n}\n\n.lotto-grid-detail {\n  display: flex;\n  flex-direction: column;\n}\n\n.lotto-number-detail {\n  font-weight: normal;\n  font-size: 15px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n  margin-left: 8px;\n}\n\n.lotto-grid div {\n  padding-right: 3px;\n}\n\n.lotto-container {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 12px;\n}\n\n.lotto-img {\n  font-size: 34px;\n  display: flex;\n  align-items: center;\n  margin-right: 8px;\n}\n\n/* Toggle Button */\n.cm-toggle {\n  height: 20px;\n\t-webkit-appearance: none;\n\t-webkit-tap-highlight-color: transparent;\n\tposition: relative;\n\tborder: 0;\n\toutline: 0;\n\tcursor: pointer;\n\tmargin: 10px;\n  opacity: 0.4;\n  padding-top: 6px;\n}\n\n/* To create surface of toggle button */\n.cm-toggle:after {\n  content: '';\n  width: 44px;\n  height: 18px;\n  display: inline-block;\n  background: rgba(33, 33, 33, 0.08);\n  border-radius: 18px;\n  clear: both;\n}\n\n/* Contents before checkbox to create toggle handle */\n.cm-toggle:before {\n  content: '';\n  width: 23px;\n  height: 23px;\n  display: block;\n  position: absolute;\n  left: -1px;\n  top: 3px;\n  border-radius: 50%;\n  background: #EDEDED;\n  box-shadow: 1px 1px 3px rgb(0 0 0 / 60%);\n}\n\n/* Shift the handle to left on check event */\n.cm-toggle:checked:before {\n  left: 20px;\n  box-shadow: -1px 1px 3px rgb(0 0 0 / 60%);\n  background: #00BCD4;\n}\n/* Background color when toggle button will be active */\n.cm-toggle:checked:after {\n\tbackground: #80DEEA;\n}\n\nh2 {\n  font-style: normal;\n  font-weight: 400;\n  font-size: 15px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n\n.winning-text-contatiner {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 8px;\n}\n\n.winning-numbers {\n  width: 34px;\n  height: 36px;\n  border-radius: 4px;\n  border: 1px solid #B4B4B4;\n  box-sizing: border-box;\n  margin-right: 8px;\n}\n\n.winning-numbers-container {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 8px;\n}\n\n#show-result {\n  width: 382px;\n  height: 36px;\n  padding: 6px 6px 6px 8px;\n  margin-top: 34px;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  line-height: 16px;\n  letter-spacing: 1.25px;\n  text-transform: uppercase;\n  background: #00BCD4;\n  color: #FFFFFF;\n}\n\n#show-result {\n  cursor: pointer;\n}\n\n#bonus-number {\n  margin-right: 0;\n}\n\n.d-none {\n  display: none;\n}\n\n.modal-container {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 422px;\n  height: 787px;\n  background:rgba(0, 0, 0, 0.5);\n}\n\n.modal {\n  width: 350px;\n  height: 500px;\n  position: absolute;\n  border-radius: 4px;\n  left: calc((414px - 350px) / 2);\n  top: 110px;\n  background-color: white;\n  opacity: 1;\n}\n\n.modal-title {\n  margin-top: 10px;\n}\n\n.modal-closer {\n  margin-left: 92%;\n  padding-top: 16px;\n}\n\n.modal-closer:hover {\n  cursor: pointer;\n}\n\nh3 {\n  font-weight: 600;\n  font-size: 20px;\n  line-height: 24px;\n  text-align: center;\n  letter-spacing: 0.15px;\n}\n\n.content-container {\n  margin-top: 32px;\n  padding: 0 16px 0 16px;\n}\n\n.content-row {\n  border-top: 1px solid #DCDCDC;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 8px 0 8px 0;\n  height: 24px;\n}\n\n.content-text {\n  font-size: 15px;\n  line-height: 24px;\n  text-align: center;\n  width: calc(318px / 3);\n}\n\n.result-container {\n  justify-content: center;\n  padding-top: 16px;\n}\n\n.content-title {\n  font-weight: 600;\n  width: 100%;\n}\n\n.winning-count {\n  font-size: 15px;\n  line-height: 18px;\n}\n\n.restart-container {\n  display: flex;\n  justify-content: center;\n  margin-top: 24px;\n}\n\n.restart {\n  line-height: 16px;\n  width: 152px;\n  height: 36px;\n  background: #00BCD4;\n  border-radius: 4px;\n  padding: 6px 6px 6px 8px;\n  border-style: none;\n  color: white;\n  font-size: 14px;\n  font-weight: bold;\n  letter-spacing: 1.25px;\n}\n\n.restart:hover {\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["webpack://./src/css/index.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,6BAA6B;EAC7B,aAAa;EACb,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,iBAAiB;EACjB,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,yBAAyB;EACzB,sBAAsB;EACtB,kBAAkB;EAClB,UAAU;EACV,QAAQ;EACR,mBAAmB;EACnB,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,kBAAkB;EAClB,cAAc;EACd,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,qCAAqC;AACvC;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,mBAAmB;EACnB,eAAe;EACf,iBAAiB;EACjB,qBAAqB;EACrB,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA,kBAAkB;AAClB;EACE,YAAY;CACb,wBAAwB;CACxB,wCAAwC;CACxC,kBAAkB;CAClB,SAAS;CACT,UAAU;CACV,eAAe;CACf,YAAY;EACX,YAAY;EACZ,gBAAgB;AAClB;;AAEA,uCAAuC;AACvC;EACE,WAAW;EACX,WAAW;EACX,YAAY;EACZ,qBAAqB;EACrB,kCAAkC;EAClC,mBAAmB;EACnB,WAAW;AACb;;AAEA,qDAAqD;AACrD;EACE,WAAW;EACX,WAAW;EACX,YAAY;EACZ,cAAc;EACd,kBAAkB;EAClB,UAAU;EACV,QAAQ;EACR,kBAAkB;EAClB,mBAAmB;EACnB,wCAAwC;AAC1C;;AAEA,4CAA4C;AAC5C;EACE,UAAU;EACV,yCAAyC;EACzC,mBAAmB;AACrB;AACA,uDAAuD;AACvD;CACC,mBAAmB;AACpB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,iBAAiB;EACjB,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,eAAe;AACjB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,yBAAyB;EACzB,sBAAsB;EACtB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,wBAAwB;EACxB,gBAAgB;EAChB,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,sBAAsB;EACtB,yBAAyB;EACzB,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,MAAM;EACN,YAAY;EACZ,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,kBAAkB;EAClB,+BAA+B;EAC/B,UAAU;EACV,uBAAuB;EACvB,UAAU;AACZ;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;EACE,gBAAgB;EAChB,sBAAsB;AACxB;;AAEA;EACE,6BAA6B;EAC7B,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,oBAAoB;EACpB,YAAY;AACd;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;EACE,uBAAuB;EACvB,iBAAiB;AACnB;;AAEA;EACE,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,YAAY;EACZ,YAAY;EACZ,mBAAmB;EACnB,kBAAkB;EAClB,wBAAwB;EACxB,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;EACE,eAAe;AACjB","sourcesContent":["body {\n  background: #F9F9F9;\n}\n\n#app {\n  position: absolute;\n  left: 50%;\n  transform: translate(-50%, 0);\n  padding: 20px;\n  background: #FFFFFF;\n  font-family: Roboto;\n}\n\nheader {\n  padding: 20px;\n}\n\nheader h1 {\n  font-style: normal;\n  font-weight: 600;\n  font-size: 34px;\n  line-height: 36px;\n  text-align: center;\n}\n\n.money-input-text {\n  font-style: normal;\n  font-weight: normal;\n  font-size: 15px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n  margin-bottom: 5px;\n}\n\n.money-input {\n  width: 310px;\n  height: 36px;\n  border: 1px solid #B4B4B4;\n  box-sizing: border-box;\n  border-radius: 4px;\n  flex: none;\n  order: 1;\n  align-self: stretch;\n  flex-grow: 0;\n  margin: 4px 0px;\n}\n\n.purchase-button {\n  width: 56px;\n  height: 36px;\n  background: #00BCD4;\n  border-radius: 4px;\n  color: #FFFFFF;\n  border: none;\n  margin-left: 10px;\n}\n\n.purchase-button:hover {\n  cursor: pointer;\n}\n\n.purchase-status-container {\n  margin-top: 28px;\n  display: flex;\n  justify-content: space-between;\n}\n\n.lotto-grid {\n  display: grid;\n  margin: 10px 0px 30px 0px;\n  grid-template-columns: repeat(5, 1fr);\n}\n\n.lotto-grid-detail {\n  display: flex;\n  flex-direction: column;\n}\n\n.lotto-number-detail {\n  font-weight: normal;\n  font-size: 15px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n  margin-left: 8px;\n}\n\n.lotto-grid div {\n  padding-right: 3px;\n}\n\n.lotto-container {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 12px;\n}\n\n.lotto-img {\n  font-size: 34px;\n  display: flex;\n  align-items: center;\n  margin-right: 8px;\n}\n\n/* Toggle Button */\n.cm-toggle {\n  height: 20px;\n\t-webkit-appearance: none;\n\t-webkit-tap-highlight-color: transparent;\n\tposition: relative;\n\tborder: 0;\n\toutline: 0;\n\tcursor: pointer;\n\tmargin: 10px;\n  opacity: 0.4;\n  padding-top: 6px;\n}\n\n/* To create surface of toggle button */\n.cm-toggle:after {\n  content: '';\n  width: 44px;\n  height: 18px;\n  display: inline-block;\n  background: rgba(33, 33, 33, 0.08);\n  border-radius: 18px;\n  clear: both;\n}\n\n/* Contents before checkbox to create toggle handle */\n.cm-toggle:before {\n  content: '';\n  width: 23px;\n  height: 23px;\n  display: block;\n  position: absolute;\n  left: -1px;\n  top: 3px;\n  border-radius: 50%;\n  background: #EDEDED;\n  box-shadow: 1px 1px 3px rgb(0 0 0 / 60%);\n}\n\n/* Shift the handle to left on check event */\n.cm-toggle:checked:before {\n  left: 20px;\n  box-shadow: -1px 1px 3px rgb(0 0 0 / 60%);\n  background: #00BCD4;\n}\n/* Background color when toggle button will be active */\n.cm-toggle:checked:after {\n\tbackground: #80DEEA;\n}\n\nh2 {\n  font-style: normal;\n  font-weight: 400;\n  font-size: 15px;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n\n.winning-text-contatiner {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 8px;\n}\n\n.winning-numbers {\n  width: 34px;\n  height: 36px;\n  border-radius: 4px;\n  border: 1px solid #B4B4B4;\n  box-sizing: border-box;\n  margin-right: 8px;\n}\n\n.winning-numbers-container {\n  display: flex;\n  justify-content: space-between;\n  margin-top: 8px;\n}\n\n#show-result {\n  width: 382px;\n  height: 36px;\n  padding: 6px 6px 6px 8px;\n  margin-top: 34px;\n  border: none;\n  border-radius: 4px;\n  font-size: 14px;\n  line-height: 16px;\n  letter-spacing: 1.25px;\n  text-transform: uppercase;\n  background: #00BCD4;\n  color: #FFFFFF;\n}\n\n#show-result {\n  cursor: pointer;\n}\n\n#bonus-number {\n  margin-right: 0;\n}\n\n.d-none {\n  display: none;\n}\n\n.modal-container {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 422px;\n  height: 787px;\n  background:rgba(0, 0, 0, 0.5);\n}\n\n.modal {\n  width: 350px;\n  height: 500px;\n  position: absolute;\n  border-radius: 4px;\n  left: calc((414px - 350px) / 2);\n  top: 110px;\n  background-color: white;\n  opacity: 1;\n}\n\n.modal-title {\n  margin-top: 10px;\n}\n\n.modal-closer {\n  margin-left: 92%;\n  padding-top: 16px;\n}\n\n.modal-closer:hover {\n  cursor: pointer;\n}\n\nh3 {\n  font-weight: 600;\n  font-size: 20px;\n  line-height: 24px;\n  text-align: center;\n  letter-spacing: 0.15px;\n}\n\n.content-container {\n  margin-top: 32px;\n  padding: 0 16px 0 16px;\n}\n\n.content-row {\n  border-top: 1px solid #DCDCDC;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 8px 0 8px 0;\n  height: 24px;\n}\n\n.content-text {\n  font-size: 15px;\n  line-height: 24px;\n  text-align: center;\n  width: calc(318px / 3);\n}\n\n.result-container {\n  justify-content: center;\n  padding-top: 16px;\n}\n\n.content-title {\n  font-weight: 600;\n  width: 100%;\n}\n\n.winning-count {\n  font-size: 15px;\n  line-height: 18px;\n}\n\n.restart-container {\n  display: flex;\n  justify-content: center;\n  margin-top: 24px;\n}\n\n.restart {\n  line-height: 16px;\n  width: 152px;\n  height: 36px;\n  background: #00BCD4;\n  border-radius: 4px;\n  padding: 6px 6px 6px 8px;\n  border-style: none;\n  color: white;\n  font-size: 14px;\n  font-weight: bold;\n  letter-spacing: 1.25px;\n}\n\n.restart:hover {\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/reset.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/reset.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}", "",{"version":3,"sources":["webpack://./src/css/reset.css"],"names":[],"mappings":"AAAA;;;CAGC;;AAED;;;;;;;;;;;;;CAaC,SAAS;CACT,UAAU;CACV,SAAS;CACT,eAAe;CACf,aAAa;CACb,wBAAwB;AACzB;AACA,gDAAgD;AAChD;;CAEC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,gBAAgB;AACjB;AACA;CACC,YAAY;AACb;AACA;;CAEC,WAAW;CACX,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,iBAAiB;AAClB","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./images/closer.svg":
/*!***************************!*\
  !*** ./images/closer.svg ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "closer.svg");

/***/ }),

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/css/reset.css":
/*!***************************!*\
  !*** ./src/css/reset.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./reset.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/reset.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_reset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/reset */ "./src/css/reset.css");
/* harmony import */ var _css_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/index */ "./src/css/index.css");
/* harmony import */ var _images_closer_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../images/closer.svg */ "./images/closer.svg");
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/app */ "./src/js/app.js");




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map