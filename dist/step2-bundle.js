/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./src/constants/delimiters.js":
/*!*************************************!*\
  !*** ./src/constants/delimiters.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NUMBER_DELIMITER: () => (/* binding */ NUMBER_DELIMITER)
/* harmony export */ });
var NUMBER_DELIMITER = ',';

/***/ }),

/***/ "./src/constants/index.js":
/*!********************************!*\
  !*** ./src/constants/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERROR_MESSAGES: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_1__.ERROR_MESSAGES),
/* harmony export */   ERROR_PREFIX: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_1__.ERROR_PREFIX),
/* harmony export */   INPUT_MESSAGES: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_1__.INPUT_MESSAGES),
/* harmony export */   LOTTO_RULE: () => (/* reexport safe */ _rules__WEBPACK_IMPORTED_MODULE_2__.LOTTO_RULE),
/* harmony export */   NUMBER_DELIMITER: () => (/* reexport safe */ _delimiters__WEBPACK_IMPORTED_MODULE_0__.NUMBER_DELIMITER),
/* harmony export */   OUTPUT_MESSAGES: () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_1__.OUTPUT_MESSAGES),
/* harmony export */   RANDOM_NUMBER_RULE: () => (/* reexport safe */ _rules__WEBPACK_IMPORTED_MODULE_2__.RANDOM_NUMBER_RULE),
/* harmony export */   RANK_HAS_BONUS: () => (/* reexport safe */ _rules__WEBPACK_IMPORTED_MODULE_2__.RANK_HAS_BONUS),
/* harmony export */   RESTART_KEY: () => (/* reexport safe */ _rules__WEBPACK_IMPORTED_MODULE_2__.RESTART_KEY),
/* harmony export */   WINNING_RULE: () => (/* reexport safe */ _rules__WEBPACK_IMPORTED_MODULE_2__.WINNING_RULE)
/* harmony export */ });
/* harmony import */ var _delimiters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delimiters */ "./src/constants/delimiters.js");
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./messages */ "./src/constants/messages.js");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rules */ "./src/constants/rules.js");




/***/ }),

/***/ "./src/constants/messages.js":
/*!***********************************!*\
  !*** ./src/constants/messages.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERROR_MESSAGES: () => (/* binding */ ERROR_MESSAGES),
/* harmony export */   ERROR_PREFIX: () => (/* binding */ ERROR_PREFIX),
/* harmony export */   INPUT_MESSAGES: () => (/* binding */ INPUT_MESSAGES),
/* harmony export */   OUTPUT_MESSAGES: () => (/* binding */ OUTPUT_MESSAGES)
/* harmony export */ });
/* harmony import */ var _delimiters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delimiters */ "./src/constants/delimiters.js");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rules */ "./src/constants/rules.js");


var INPUT_QUERY_PREFIX = '> ';
var INPUT_MESSAGES = Object.freeze({
  paymentAmount: "\n".concat(INPUT_QUERY_PREFIX, "\uAD6C\uC785\uAE08\uC561\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.\n"),
  winningLottoNumbers: "\n".concat(INPUT_QUERY_PREFIX, "\uB2F9\uCCA8 \uBC88\uD638\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.\n"),
  bonusNumber: "\n".concat(INPUT_QUERY_PREFIX, "\uBCF4\uB108\uC2A4 \uBC88\uD638\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.\n"),
  restart: "\n".concat(INPUT_QUERY_PREFIX, "\uB2E4\uC2DC \uC2DC\uC791\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C? (").concat(_rules__WEBPACK_IMPORTED_MODULE_1__.RESTART_KEY.restart, "/").concat(_rules__WEBPACK_IMPORTED_MODULE_1__.RESTART_KEY.end, ")\n")
});
var OUTPUT_MESSAGES = Object.freeze({
  purchasedLottoTickets: '\n<구매 내역>\n',
  lottoTickets: '\n<당첨 통계>',
  divider: '--------------------',
  moneyUnit: '원',
  countUnit: '개',
  profitUnit: '%',
  restartGame: '\n---게임 재시작! 😚🎮---\n',
  endGame: '\n---게임 종료 🤗---'
});
var ERROR_PREFIX = '[ERROR]';
var ERROR_MESSAGES = Object.freeze({
  isUndefinedInputValue: "".concat(ERROR_PREFIX, " \uC785\uB825\uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."),
  inValidWInningNumbersForm: "".concat(ERROR_PREFIX, " \uB2F9\uCCA8 \uBC88\uD638\uB294 \uC27C\uD45C(\"").concat(_delimiters__WEBPACK_IMPORTED_MODULE_0__.NUMBER_DELIMITER, "\")\uB85C \uAD6C\uBD84\uD558\uC5EC \uC785\uB825\uD574 \uC8FC\uC138\uC694.\n"),
  alreadyInLottoNumber: "".concat(ERROR_PREFIX, " \uBCF4\uB108\uC2A4 \uBC88\uD638\uB294 \uB2F9\uCCA8 \uBC88\uD638\uC5D0 \uC5C6\uB294 \uBC88\uD638\uC5EC\uC57C \uD569\uB2C8\uB2E4.\n"),
  notInteger: "".concat(ERROR_PREFIX, " \uC815\uC218\uAC00 \uC544\uB2D9\uB2C8\uB2E4.\n"),
  inDivisibleByPrice: "".concat(ERROR_PREFIX, " \uAD6C\uB9E4 \uAE08\uC561\uC774 ").concat(_rules__WEBPACK_IMPORTED_MODULE_1__.LOTTO_RULE.price.toLocaleString('ko-KR')).concat(OUTPUT_MESSAGES.moneyUnit, " \uB2E8\uC704\uAC00 \uC544\uB2D9\uB2C8\uB2E4.\n"),
  inValidNumbersOfTickets: "".concat(ERROR_PREFIX, " \uB85C\uB610 \uD2F0\uCF13\uC740 ").concat(_rules__WEBPACK_IMPORTED_MODULE_1__.LOTTO_RULE.numbersOfTickets.min, "\uC7A5 \uC774\uC0C1 ").concat(_rules__WEBPACK_IMPORTED_MODULE_1__.LOTTO_RULE.numbersOfTickets.max, "\uC774\uD558\uB85C \uAD6C\uB9E4\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4.\n"),
  invalidLottoNumberCount: "".concat(ERROR_PREFIX, " \uB85C\uB610 \uBC88\uD638 \uAC1C\uC218\uB294 ").concat(_rules__WEBPACK_IMPORTED_MODULE_1__.LOTTO_RULE.length, "\uAC1C \uC5EC\uC57C \uD569\uB2C8\uB2E4.\n"),
  duplicatedLottoNumber: "".concat(ERROR_PREFIX, " \uB85C\uB610 \uBC88\uD638\uB294 \uC911\uBCF5\uB420 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.\n"),
  invalidLottoNumberRange: "".concat(ERROR_PREFIX, " \uBC88\uD638\uB294 ").concat(_rules__WEBPACK_IMPORTED_MODULE_1__.LOTTO_RULE.range.start, " \uC774\uC0C1 ").concat(_rules__WEBPACK_IMPORTED_MODULE_1__.LOTTO_RULE.range.end, " \uC774\uD558\uC758 \uC22B\uC790\uB85C \uC774\uB8E8\uC5B4\uC838\uC57C\uD569\uB2C8\uB2E4.\n"),
  invalidRestartInputForm: "".concat(ERROR_PREFIX, " ").concat(_rules__WEBPACK_IMPORTED_MODULE_1__.RESTART_KEY.restart, " \uB610\uB294 ").concat(_rules__WEBPACK_IMPORTED_MODULE_1__.RESTART_KEY.end, "\uB85C \uC785\uB825\uD574 \uC8FC\uC138\uC694.\n")
});

/***/ }),

/***/ "./src/constants/rules.js":
/*!********************************!*\
  !*** ./src/constants/rules.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LOTTO_RULE: () => (/* binding */ LOTTO_RULE),
/* harmony export */   RANDOM_NUMBER_RULE: () => (/* binding */ RANDOM_NUMBER_RULE),
/* harmony export */   RANK_HAS_BONUS: () => (/* binding */ RANK_HAS_BONUS),
/* harmony export */   RESTART_KEY: () => (/* binding */ RESTART_KEY),
/* harmony export */   WINNING_RULE: () => (/* binding */ WINNING_RULE)
/* harmony export */ });
var RANDOM_NUMBER_RULE = Object.freeze({
  range: Object.freeze({
    start: 1,
    end: 45
  })
});
var LOTTO_RULE = Object.freeze({
  range: RANDOM_NUMBER_RULE.range,
  length: 6,
  price: 1000,
  numbersOfTickets: Object.freeze({
    min: 1,
    max: 50
  })
});
var RANK_HAS_BONUS = 2;
var WINNING_RULE = Object.freeze(new Map([[5, {
  matchedCount: 3,
  isBonus: false,
  money: 5000
}], [4, {
  matchedCount: 4,
  isBonus: false,
  money: 50000
}], [3, {
  matchedCount: 5,
  isBonus: false,
  money: 1500000
}], [RANK_HAS_BONUS, {
  matchedCount: 5,
  isBonus: true,
  money: 30000000
}], [1, {
  matchedCount: 6,
  isBonus: false,
  money: 2000000000
}]]));
var RESTART_KEY = Object.freeze({
  restart: 'y',
  end: 'n'
});

/***/ }),

/***/ "./src/domains/Bonus.js":
/*!******************************!*\
  !*** ./src/domains/Bonus.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");
/* harmony import */ var _utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validatorsUtils */ "./src/utils/validatorsUtils.js");
/* harmony import */ var _LottoNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LottoNumber */ "./src/domains/LottoNumber.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



var _number = /*#__PURE__*/new WeakMap();
var _validateBonusNumber = /*#__PURE__*/new WeakSet();
var Bonus = /*#__PURE__*/function () {
  /**
   * @param {string} bonusNumberInput
   * @param {number[]} winningLottoNumbers
   */
  function Bonus(_bonusNumberInput, _winningLottoNumbers) {
    _classCallCheck(this, Bonus);
    _classPrivateMethodInitSpec(this, _validateBonusNumber);
    _classPrivateFieldInitSpec(this, _number, {
      writable: true,
      value: void 0
    });
    _classPrivateMethodGet(this, _validateBonusNumber, _validateBonusNumber2).call(this, _bonusNumberInput, _winningLottoNumbers);
  }

  /**
   * @param {string} bonusNumberInput
   * @param {number[]} WinningLottoNumbers
   */
  _createClass(Bonus, [{
    key: "isMatchingNumber",
    value:
    /**
     *
     * @param {number[]} lottoNumbers
     */
    function isMatchingNumber(lottoNumbers) {
      return lottoNumbers.includes(_classPrivateFieldGet(this, _number));
    }
  }]);
  return Bonus;
}();
function _validateBonusNumber2(bonusNumberInput, winningLottoNumbers) {
  (0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__.checkDefinedInputValue)(bonusNumberInput);
  var _LottoNumber = new _LottoNumber__WEBPACK_IMPORTED_MODULE_2__["default"](Number(bonusNumberInput)),
    number = _LottoNumber.number;
  if (!(0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__.isBonusNumberUnique)(winningLottoNumbers, number)) {
    throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.alreadyInLottoNumber);
  }
  _classPrivateFieldSet(this, _number, new _LottoNumber__WEBPACK_IMPORTED_MODULE_2__["default"](number).number);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bonus);

/***/ }),

/***/ "./src/domains/Lotto.js":
/*!******************************!*\
  !*** ./src/domains/Lotto.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");
/* harmony import */ var _utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validatorsUtils */ "./src/utils/validatorsUtils.js");
/* harmony import */ var _LottoNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LottoNumber */ "./src/domains/LottoNumber.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



var _numbers = /*#__PURE__*/new WeakMap();
var _validateLottoNumbers = /*#__PURE__*/new WeakSet();
var Lotto = /*#__PURE__*/function () {
  /**
   * @param {number[]} numbers
   */
  function Lotto(_numbers2) {
    _classCallCheck(this, Lotto);
    _classPrivateMethodInitSpec(this, _validateLottoNumbers);
    _classPrivateFieldInitSpec(this, _numbers, {
      writable: true,
      value: void 0
    });
    _classPrivateMethodGet(this, _validateLottoNumbers, _validateLottoNumbers2).call(this, _numbers2);
  }
  _createClass(Lotto, [{
    key: "numbers",
    get: function get() {
      return _toConsumableArray(_classPrivateFieldGet(this, _numbers));
    }

    /**
     * @param {number[]} numbers
     */
  }]);
  return Lotto;
}();
function _validateLottoNumbers2(numbers) {
  var lottoNumbers = numbers.map(function (number) {
    return new _LottoNumber__WEBPACK_IMPORTED_MODULE_2__["default"](number).number;
  });
  if (!(0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__.isValidLottoNumberCount)(lottoNumbers)) throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.invalidLottoNumberCount);
  if (!(0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__.isNotDuplicatedLottoNumber)(lottoNumbers)) throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.duplicatedLottoNumber);
  _classPrivateFieldSet(this, _numbers, lottoNumbers);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lotto);

/***/ }),

/***/ "./src/domains/LottoMachine.js":
/*!*************************************!*\
  !*** ./src/domains/LottoMachine.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");
/* harmony import */ var _utils_RandomNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/RandomNumber */ "./src/utils/RandomNumber.js");
/* harmony import */ var _utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/validatorsUtils */ "./src/utils/validatorsUtils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



var _lottoTickets = /*#__PURE__*/new WeakMap();
var _paymentAmount = /*#__PURE__*/new WeakMap();
var _validatePaymentAmount = /*#__PURE__*/new WeakSet();
var _issueLottoTickets = /*#__PURE__*/new WeakSet();
var LottoMachine = /*#__PURE__*/function () {
  /**
   * 발행되는 로또 번호의 이중배열
   * @property {number[][]|[]}
   */

  /**
   * @param {string} paymentAmount
   */
  function LottoMachine(_paymentAmountInput) {
    _classCallCheck(this, LottoMachine);
    _classPrivateMethodInitSpec(this, _issueLottoTickets);
    _classPrivateMethodInitSpec(this, _validatePaymentAmount);
    _classPrivateFieldInitSpec(this, _lottoTickets, {
      writable: true,
      value: []
    });
    _classPrivateFieldInitSpec(this, _paymentAmount, {
      writable: true,
      value: 0
    });
    _classPrivateMethodGet(this, _validatePaymentAmount, _validatePaymentAmount2).call(this, _paymentAmountInput);
    _classPrivateMethodGet(this, _issueLottoTickets, _issueLottoTickets2).call(this);
  }
  _createClass(LottoMachine, [{
    key: "lottoTickets",
    get: function get() {
      return JSON.parse(JSON.stringify(_classPrivateFieldGet(this, _lottoTickets)));
    }
  }, {
    key: "paymentAmount",
    get: function get() {
      return _classPrivateFieldGet(this, _paymentAmount);
    }

    /**
     * @param {string} paymentAmount
     */
  }]);
  return LottoMachine;
}();
function _validatePaymentAmount2(paymentAmountInput) {
  (0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_2__.checkDefinedInputValue)(paymentAmountInput);
  var number = Number(paymentAmountInput);
  if (!(0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_2__.isInteger)(number)) throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.notInteger);
  if (!(0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_2__.isValidNumbersOfTickets)(number)) throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.inValidNumbersOfTickets);
  if (!(0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_2__.isDivisibleByPrice)(number)) throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.inDivisibleByPrice);
  _classPrivateFieldSet(this, _paymentAmount, number);
}
function _issueLottoTickets2() {
  var range = _constants__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.range,
    price = _constants__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.price;
  var numbersOfTickets = _classPrivateFieldGet(this, _paymentAmount) / price;
  _classPrivateFieldSet(this, _lottoTickets, Array.from({
    length: numbersOfTickets
  }, function () {
    return _utils_RandomNumber__WEBPACK_IMPORTED_MODULE_1__["default"].pickUniqueNumbersInRange(range, _constants__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.length);
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LottoMachine);

/***/ }),

/***/ "./src/domains/LottoNumber.js":
/*!************************************!*\
  !*** ./src/domains/LottoNumber.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");
/* harmony import */ var _utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validatorsUtils */ "./src/utils/validatorsUtils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }


var _number = /*#__PURE__*/new WeakMap();
var _validateLottoNumber = /*#__PURE__*/new WeakSet();
var LottoNumber = /*#__PURE__*/function () {
  /**
   * @param {number} number
   */
  function LottoNumber(_number2) {
    _classCallCheck(this, LottoNumber);
    _classPrivateMethodInitSpec(this, _validateLottoNumber);
    _classPrivateFieldInitSpec(this, _number, {
      writable: true,
      value: void 0
    });
    _classPrivateMethodGet(this, _validateLottoNumber, _validateLottoNumber2).call(this, _number2);
  }
  _createClass(LottoNumber, [{
    key: "number",
    get: function get() {
      return _classPrivateFieldGet(this, _number);
    }

    /**
     * @param {number} number
     */
  }]);
  return LottoNumber;
}();
function _validateLottoNumber2(number) {
  if (!(0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__.isInteger)(number)) throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.notInteger);
  if (!(0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__.isLottoNumberInRange)(number)) throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.invalidLottoNumberRange);
  _classPrivateFieldSet(this, _number, number);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LottoNumber);

/***/ }),

/***/ "./src/domains/LottoResultsHelper.js":
/*!*******************************************!*\
  !*** ./src/domains/LottoResultsHelper.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Bonus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bonus */ "./src/domains/Bonus.js");
/* harmony import */ var _LottoMachine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LottoMachine */ "./src/domains/LottoMachine.js");
/* harmony import */ var _WinningLotto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WinningLotto */ "./src/domains/WinningLotto.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _lottoMachine = /*#__PURE__*/new WeakMap();
var _winningData = /*#__PURE__*/new WeakMap();
var LottoResultsHelper = /*#__PURE__*/function () {
  function LottoResultsHelper() {
    _classCallCheck(this, LottoResultsHelper);
    _classPrivateFieldInitSpec(this, _lottoMachine, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _winningData, {
      writable: true,
      value: {
        winningLotto: undefined,
        bonus: undefined,
        results: undefined
      }
    });
  }
  _createClass(LottoResultsHelper, [{
    key: "paymentAmount",
    get: function get() {
      return _classPrivateFieldGet(this, _lottoMachine).paymentAmount;
    }
  }, {
    key: "lottoTickets",
    get: function get() {
      return JSON.parse(JSON.stringify(_classPrivateFieldGet(this, _lottoMachine).lottoTickets));
    }
  }, {
    key: "results",
    get: function get() {
      return _classPrivateFieldGet(this, _winningData).results;
    }

    /**
     * @param {string|undefined} paymentAmountInput
     */
  }, {
    key: "generateLottoMachine",
    value: function generateLottoMachine(paymentAmountInput) {
      _classPrivateFieldSet(this, _lottoMachine, new _LottoMachine__WEBPACK_IMPORTED_MODULE_1__["default"](paymentAmountInput));
    }

    /**
     * @param {string} lottoNumbersInput
     */
  }, {
    key: "generateWinningLotto",
    value: function generateWinningLotto(lottoNumbersInput) {
      _classPrivateFieldGet(this, _winningData).winningLotto = new _WinningLotto__WEBPACK_IMPORTED_MODULE_2__["default"](lottoNumbersInput);
    }

    /**
     * @param {string} bonusNumberInput
     */
  }, {
    key: "generateBonus",
    value: function generateBonus(bonusNumberInput) {
      _classPrivateFieldGet(this, _winningData).bonus = new _Bonus__WEBPACK_IMPORTED_MODULE_0__["default"](bonusNumberInput, _classPrivateFieldGet(this, _winningData).winningLotto.lottoNumbers);
    }

    /**
     *
     * @return {{isBonus:boolean, matchedCount:number}[]} result
     */
  }, {
    key: "calculateMatchingResults",
    value: function calculateMatchingResults() {
      var _this = this;
      var results = _classPrivateFieldGet(this, _lottoMachine).lottoTickets.map(function (lottoTicket) {
        return _classPrivateFieldGet(_this, _winningData).winningLotto.compareLotto(lottoTicket, _classPrivateFieldGet(_this, _winningData).bonus);
      });
      _classPrivateFieldGet(this, _winningData).results = results;
      return results;
    }
  }]);
  return LottoResultsHelper;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LottoResultsHelper);

/***/ }),

/***/ "./src/domains/Statistics.js":
/*!***********************************!*\
  !*** ./src/domains/Statistics.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _ranks = /*#__PURE__*/new WeakMap();
var _reward = /*#__PURE__*/new WeakMap();
var _makeInitialStatisticsResult = /*#__PURE__*/new WeakSet();
var _getStatisticsResult = /*#__PURE__*/new WeakSet();
var _matchResultsToRank = /*#__PURE__*/new WeakSet();
var _matchResultToRank = /*#__PURE__*/new WeakSet();
var _calculateProfitRate = /*#__PURE__*/new WeakSet();
var _calculateTotalPrize = /*#__PURE__*/new WeakSet();
var Statistics = /*#__PURE__*/function () {
  /**
   * @param {{isBonus: boolean,matchedCount: number}[]} matchingResults
   * @param {number} paymentAmount
   */
  function Statistics(matchingResults, _paymentAmount) {
    _classCallCheck(this, Statistics);
    _classPrivateMethodInitSpec(this, _calculateTotalPrize);
    _classPrivateMethodInitSpec(this, _calculateProfitRate);
    _classPrivateMethodInitSpec(this, _matchResultToRank);
    _classPrivateMethodInitSpec(this, _matchResultsToRank);
    _classPrivateMethodInitSpec(this, _getStatisticsResult);
    _classPrivateMethodInitSpec(this, _makeInitialStatisticsResult);
    _classPrivateFieldInitSpec(this, _ranks, {
      writable: true,
      value: []
    });
    _classPrivateFieldInitSpec(this, _reward, {
      writable: true,
      value: {
        totalPrizes: 0,
        profitRate: 0
      }
    });
    _classPrivateMethodGet(this, _matchResultsToRank, _matchResultsToRank2).call(this, matchingResults);
    _classPrivateMethodGet(this, _calculateProfitRate, _calculateProfitRate2).call(this, _paymentAmount);
  }
  _createClass(Statistics, [{
    key: "lottoAnalytics",
    get: function get() {
      return {
        profitRate: _classPrivateFieldGet(this, _reward).profitRate,
        statisticsResult: _classPrivateMethodGet(this, _getStatisticsResult, _getStatisticsResult2).call(this)
      };
    }

    /**
     *
     * @returns  {{l:0, 2:0,3:0,4:0,5:0}}
     */
  }]);
  return Statistics;
}();
function _makeInitialStatisticsResult2() {
  var initialStatisticsResult = {};
  _constants__WEBPACK_IMPORTED_MODULE_0__.WINNING_RULE.forEach(function (_, key) {
    initialStatisticsResult[key] = 0;
  });
  return initialStatisticsResult;
}
function _getStatisticsResult2() {
  return _classPrivateFieldGet(this, _ranks).reduce(function (acc, rank) {
    acc[rank] += 1;
    return acc;
  }, _classPrivateMethodGet(this, _makeInitialStatisticsResult, _makeInitialStatisticsResult2).call(this));
}
function _matchResultsToRank2(results) {
  var _this = this;
  results.forEach(function (result) {
    return _classPrivateMethodGet(_this, _matchResultToRank, _matchResultToRank2).call(_this, result);
  });
}
function _matchResultToRank2(result) {
  var _this2 = this;
  _constants__WEBPACK_IMPORTED_MODULE_0__.WINNING_RULE.forEach(function (value, key) {
    var matchedCount = value.matchedCount,
      isBonus = value.isBonus;
    var isBonusMatchRequired = matchedCount === _constants__WEBPACK_IMPORTED_MODULE_0__.WINNING_RULE.get(_constants__WEBPACK_IMPORTED_MODULE_0__.RANK_HAS_BONUS).matchedCount;
    var isMatchingCount = matchedCount === result.matchedCount;
    var isMatchingOnlyCount = !isBonusMatchRequired && isMatchingCount;
    var isMatchingBonusAndCount = isBonusMatchRequired && isBonus === result.isBonus;
    if (!isMatchingCount) return;
    if (isMatchingOnlyCount || isMatchingBonusAndCount) {
      _classPrivateFieldGet(_this2, _ranks).push(key);
    }
  });
}
function _calculateProfitRate2(paymentAmount) {
  _classPrivateMethodGet(this, _calculateTotalPrize, _calculateTotalPrize2).call(this);
  _classPrivateFieldGet(this, _reward).profitRate = Number((_classPrivateFieldGet(this, _reward).totalPrizes / paymentAmount * 100).toFixed(1));
}
function _calculateTotalPrize2() {
  _classPrivateFieldGet(this, _reward).totalPrizes = _classPrivateFieldGet(this, _ranks).reduce(function (totalPrizes, rank) {
    return totalPrizes + _constants__WEBPACK_IMPORTED_MODULE_0__.WINNING_RULE.get(rank).money;
  }, 0);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Statistics);

/***/ }),

/***/ "./src/domains/WinningLotto.js":
/*!*************************************!*\
  !*** ./src/domains/WinningLotto.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");
/* harmony import */ var _utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validatorsUtils */ "./src/utils/validatorsUtils.js");
/* harmony import */ var _Lotto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lotto */ "./src/domains/Lotto.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



var _lottoNumbers = /*#__PURE__*/new WeakMap();
var _countMatchedNumber = /*#__PURE__*/new WeakSet();
var _validateWinningLottoNumbers = /*#__PURE__*/new WeakSet();
var WinningLotto = /*#__PURE__*/function () {
  /**
   * @property {number[]}
   */

  /**
   * @param {string} lottoNumbersInput
   */
  function WinningLotto(_lottoNumbersInput) {
    _classCallCheck(this, WinningLotto);
    _classPrivateMethodInitSpec(this, _validateWinningLottoNumbers);
    _classPrivateMethodInitSpec(this, _countMatchedNumber);
    _classPrivateFieldInitSpec(this, _lottoNumbers, {
      writable: true,
      value: []
    });
    _classPrivateMethodGet(this, _validateWinningLottoNumbers, _validateWinningLottoNumbers2).call(this, _lottoNumbersInput);
  }
  _createClass(WinningLotto, [{
    key: "lottoNumbers",
    get: function get() {
      return _toConsumableArray(_classPrivateFieldGet(this, _lottoNumbers));
    }

    /**
     * @param {number[]} lottoNumbers
     * @param {Bonus} bonus
     */
  }, {
    key: "compareLotto",
    value: function compareLotto(lottoNumbers, bonus) {
      return {
        isBonus: bonus.isMatchingNumber(lottoNumbers),
        matchedCount: _classPrivateMethodGet(this, _countMatchedNumber, _countMatchedNumber2).call(this, lottoNumbers)
      };
    }

    /**
     *  @param {number[]} lottoNumbers
     */
  }]);
  return WinningLotto;
}();
function _countMatchedNumber2(lottoNumbers) {
  var _this = this;
  return lottoNumbers.filter(function (number) {
    return _classPrivateFieldGet(_this, _lottoNumbers).includes(number);
  }).length;
}
function _validateWinningLottoNumbers2(lottoNumbersInput) {
  (0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__.checkDefinedInputValue)(lottoNumbersInput);
  if (!(0,_utils_validatorsUtils__WEBPACK_IMPORTED_MODULE_1__.isValidWinningNumbersForm)(lottoNumbersInput)) throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.inValidWInningNumbersForm);
  var numbers = lottoNumbersInput.split(_constants__WEBPACK_IMPORTED_MODULE_0__.NUMBER_DELIMITER).map(function (value) {
    return Number(value);
  });
  _classPrivateFieldSet(this, _lottoNumbers, new _Lotto__WEBPACK_IMPORTED_MODULE_2__["default"](numbers).numbers);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WinningLotto);

/***/ }),

/***/ "./src/step2-index.js":
/*!****************************!*\
  !*** ./src/step2-index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _web_css_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web/css/main.css */ "./src/web/css/main.css");
/* harmony import */ var _web_js_WebLottoGameController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./web/js/WebLottoGameController */ "./src/web/js/WebLottoGameController.js");
/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */



// eslint-disable-next-line
var web = new _web_js_WebLottoGameController__WEBPACK_IMPORTED_MODULE_1__["default"]();

/***/ }),

/***/ "./src/utils/RandomNumber.js":
/*!***********************************!*\
  !*** ./src/utils/RandomNumber.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var RandomNumber = /*#__PURE__*/function () {
  function RandomNumber() {
    _classCallCheck(this, RandomNumber);
  }
  _createClass(RandomNumber, null, [{
    key: "pickNumberInRange",
    value:
    /**
     * @param {number} start
     * @param {number} end
     */
    function pickNumberInRange(start, end) {
      var range = [start, end].sort(function (a, b) {
        return a < b;
      });
      var _range = _slicedToArray(range, 2),
        firstNumber = _range[0],
        lastNumber = _range[1];
      return Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber;
    }

    /**
     * @param {{start:number , end:number}} range
     * @param {number} length
     * @returns
     */
  }, {
    key: "pickUniqueNumbersInRange",
    value: function pickUniqueNumbersInRange(range, length) {
      var numbers = new Set();
      while (numbers.size < length) {
        var randomNumber = this.pickNumberInRange(range.start, range.end);
        numbers.add(randomNumber);
      }
      return _toConsumableArray(numbers);
    }
  }]);
  return RandomNumber;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RandomNumber);

/***/ }),

/***/ "./src/utils/validatorsUtils.js":
/*!**************************************!*\
  !*** ./src/utils/validatorsUtils.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkDefinedInputValue: () => (/* binding */ checkDefinedInputValue),
/* harmony export */   isBonusNumberUnique: () => (/* binding */ isBonusNumberUnique),
/* harmony export */   isDivisibleByPrice: () => (/* binding */ isDivisibleByPrice),
/* harmony export */   isInteger: () => (/* binding */ isInteger),
/* harmony export */   isLottoNumberInRange: () => (/* binding */ isLottoNumberInRange),
/* harmony export */   isNotDuplicatedLottoNumber: () => (/* binding */ isNotDuplicatedLottoNumber),
/* harmony export */   isValidLottoNumberCount: () => (/* binding */ isValidLottoNumberCount),
/* harmony export */   isValidNumbersOfTickets: () => (/* binding */ isValidNumbersOfTickets),
/* harmony export */   isValidRestartInputForm: () => (/* binding */ isValidRestartInputForm),
/* harmony export */   isValidWinningNumbersForm: () => (/* binding */ isValidWinningNumbersForm)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants/index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var checkDefinedInputValue = function checkDefinedInputValue(inputValue) {
  if (!inputValue) {
    throw new Error(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_MESSAGES.isUndefinedInputValue);
  }
};
/**
 * @param {number} number
 */
var isInteger = function isInteger(number) {
  return Number.isInteger(number);
};

// 로또 넘버
/**
 * 번호 배열의 갯수가 로또 번호들의 갯수과 같은지 여부
 * @param {number[]} numbers
 */
var isValidLottoNumberCount = function isValidLottoNumberCount(numbers) {
  var length = _constants__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.length;
  return numbers.length === length;
};
/**
 * 로또 번호들이 중복되지 않는 지 여부
 * @param {number[]} numbers
 */
var isNotDuplicatedLottoNumber = function isNotDuplicatedLottoNumber(numbers) {
  return numbers.length === new Set(numbers).size;
};
/**
 * 로또 번호들이 유효한 범위안의 숫자인지 여부
 * @param {number} number
 */
var isLottoNumberInRange = function isLottoNumberInRange(number) {
  var _RANDOM_NUMBER_RULE$r = _constants__WEBPACK_IMPORTED_MODULE_0__.RANDOM_NUMBER_RULE.range,
    start = _RANDOM_NUMBER_RULE$r.start,
    end = _RANDOM_NUMBER_RULE$r.end;
  return start <= number && number <= end;
};
/**
 * 보너스 번호가 로또 번호들 다른 지 여부
 * @param {number[]} lottoNumbers
 * @param {number} bonusNumber
 */
var isBonusNumberUnique = function isBonusNumberUnique(lottoNumbers, bonusNumber) {
  return !lottoNumbers.includes(bonusNumber);
};

// 구매 금액
/**
 * 구매금액이 로또 가격으로 나누어 떨어지는 지 여부
 *  @param {number} money
 */
var isDivisibleByPrice = function isDivisibleByPrice(money) {
  return money % _constants__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.price === 0;
};

/**
 * 구매 금액으로 살 수 있는 로또 티켓 장수가 유효한 범위에 있는 지 여부
 *  @param {number} money
 */
var isValidNumbersOfTickets = function isValidNumbersOfTickets(money) {
  var price = _constants__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.price,
    numbersOfTickets = _constants__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.numbersOfTickets;
  var min = numbersOfTickets.min,
    max = numbersOfTickets.max;
  var tickets = money / price;
  return tickets >= min && tickets <= max;
};
/**
 * 당첨번호에 대한 입력값이 숫자들로 이루어지며 숫자들이 쉼표로 구분되저 있는지 여부
 * @param {string} numberInput
 */
var isValidWinningNumbersForm = function isValidWinningNumbersForm(numberInput) {
  if (!numberInput.includes(_constants__WEBPACK_IMPORTED_MODULE_0__.NUMBER_DELIMITER)) {
    return false;
  }
  var numbersOfDelimiter = _toConsumableArray(numberInput.matchAll(_constants__WEBPACK_IMPORTED_MODULE_0__.NUMBER_DELIMITER)).length;
  var isValidNumberDelimiter = numbersOfDelimiter === numberInput.split(_constants__WEBPACK_IMPORTED_MODULE_0__.NUMBER_DELIMITER).length - 1;
  return isValidNumberDelimiter;
};
/**
 * 게임 재시작 여부에 대한 입력값이 게임 재시작 키값들과 같은 지 여부
 * @param {string} numberInput
 */
var isValidRestartInputForm = function isValidRestartInputForm(restartInput) {
  var restart = _constants__WEBPACK_IMPORTED_MODULE_0__.RESTART_KEY.restart,
    end = _constants__WEBPACK_IMPORTED_MODULE_0__.RESTART_KEY.end;
  var regex = new RegExp("^[".concat(restart).concat(end, "]{1}$"));
  return regex.test(restartInput);
};

/***/ }),

/***/ "./src/web/constants/gameStep.js":
/*!***************************************!*\
  !*** ./src/web/constants/gameStep.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GAME_STEP: () => (/* binding */ GAME_STEP)
/* harmony export */ });
var STEP_PREFIX = 'step-';
var GAME_STEP = Object.freeze({
  payment: "".concat(STEP_PREFIX, "payment"),
  winning: "".concat(STEP_PREFIX, "winning"),
  statistics: "".concat(STEP_PREFIX, "statistics")
});

/***/ }),

/***/ "./src/web/js/HtmlTextInjectorWithConstants.js":
/*!*****************************************************!*\
  !*** ./src/web/js/HtmlTextInjectorWithConstants.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/index.js */ "./src/constants/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var HtmlTextInjectorWithConstants = {
  injectorText: function injectorText() {
    this.private_injectPaymentAmountInput();
    this.private_injectInputForWinningLottoNumbers();
    this.private_injectBonusInput();
    this.private_injectPaymentAmountRule();
    this.private_injectWinningCriteriaRule();
  },
  private_injectPaymentAmountInput: function private_injectPaymentAmountInput() {
    var parentDivElement = document.querySelector('.payment-amount__form div');
    var price = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.price,
      numbersOfTickets = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.numbersOfTickets;
    var maxPayment = price * numbersOfTickets.max;
    var attributes = {
      id: 'input-payment-amount',
      min: price * numbersOfTickets.min,
      max: maxPayment,
      step: price,
      type: 'number',
      name: 'paymentAmount',
      maxLength: maxPayment.toString().length,
      placeholder: '금액',
      required: true
    };
    var paymentAmountInputElement = document.createElement('input');
    Object.entries(attributes).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      paymentAmountInputElement.setAttribute(key, value);
    });
    parentDivElement.insertBefore(paymentAmountInputElement, parentDivElement.firstChild);
  },
  /**
   *
   * @param {DocumentFragment} fragment
   * @param {{type: string, min: number, max: number}} numberInputAttributes
   */
  private_makeLottoNumberInputAndLabel: function private_makeLottoNumberInputAndLabel(fragment, numberInputAttributes) {
    Array.from({
      length: _constants_index_js__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.length
    }).forEach(function (_, index) {
      var labelElement = document.createElement('label');
      var numberInputElement = document.createElement('input');
      var inputElementId = "input-lottoNumber".concat(index + 1);
      labelElement.setAttribute('for', inputElementId);
      labelElement.className = 'screen-reader-only';
      labelElement.textContent = '당첨 번호를 입력해주세요.';
      numberInputElement.id = inputElementId;
      Object.entries(numberInputAttributes).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        numberInputElement.setAttribute(key, value);
      });
      numberInputElement.name = inputElementId.replace('input-', '');
      fragment.appendChild(labelElement);
      fragment.appendChild(numberInputElement);
    });
  },
  private_injectInputForWinningLottoNumbers: function private_injectInputForWinningLottoNumbers() {
    var _LOTTO_RULE$range = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.range,
      start = _LOTTO_RULE$range.start,
      end = _LOTTO_RULE$range.end;
    var inputGroupElement = document.querySelector('.winning-criteria__form-lotto-numbers .input-group');
    var fragment = document.createDocumentFragment();
    var numberInputAttributes = {
      type: 'number',
      min: start,
      max: end,
      maxLength: end.toString().length
    };
    this.private_makeLottoNumberInputAndLabel(fragment, numberInputAttributes);
    inputGroupElement.appendChild(fragment);
  },
  private_injectBonusInput: function private_injectBonusInput() {
    var bonusFormElement = document.querySelector('.winning-criteria__form-bonus-number');
    var _LOTTO_RULE$range2 = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.range,
      start = _LOTTO_RULE$range2.start,
      end = _LOTTO_RULE$range2.end;
    var bonusInput = document.createElement('input');
    var attributes = {
      id: 'input-bonus-number',
      min: start,
      max: end,
      maxLength: end.toString().length,
      type: 'number'
    };
    Object.entries(attributes).forEach(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        value = _ref6[1];
      bonusInput.setAttribute(key, value);
    });
    bonusFormElement.appendChild(bonusInput);
  },
  private_getPaymentAmountRuleHtml: function private_getPaymentAmountRuleHtml() {
    var price = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.price;
    var _LOTTO_RULE$numbersOf = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.numbersOfTickets,
      min = _LOTTO_RULE$numbersOf.min,
      max = _LOTTO_RULE$numbersOf.max;
    return "\n    <ul class=\"rule rule-payment-amount shadow \">\n      <li>\n        \uB85C\uB610 \uAC00\uACA9\uC740 ".concat(price, "\uC6D0\uC774\uC5D0\uC694.\n      </li>\n      <li>\uAD6C\uB9E4 \uAE08\uC561\uC740 ").concat(price, "\uC6D0 \uB2E8\uC704\uB85C \uC785\uB825\uD574\uC8FC\uC138\uC694.</li>\n      <li>\uAD6C\uB9E4 \uAC00\uB2A5\uD55C \uB85C\uB610\uB294 \uCD5C\uC18C ").concat(min, "\uC7A5, \uCD5C\uB300 ").concat(max, "\uC7A5\uC774\uC5D0\uC694.</li>\n    </ul>\n    ");
  },
  private_injectPaymentAmountRule: function private_injectPaymentAmountRule() {
    var parentElement = document.querySelector('.payment-amount__explanation');
    parentElement.insertAdjacentHTML('beforeend', this.private_getPaymentAmountRuleHtml());
  },
  private_getWinningCriteriaRuleHtml: function private_getWinningCriteriaRuleHtml() {
    var _RANDOM_NUMBER_RULE$r = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM_NUMBER_RULE.range,
      start = _RANDOM_NUMBER_RULE$r.start,
      end = _RANDOM_NUMBER_RULE$r.end;
    var length = _constants_index_js__WEBPACK_IMPORTED_MODULE_0__.LOTTO_RULE.length;
    return "\n    <ul class=\"rule rule-winning-criteria shadow \">\n      <li>\uBC88\uD638\uB294\n        ".concat(start, "~").concat(end, "\uC758 \uC815\uC218\uC5EC\uC57C \uD574\uC694.\n      </li>\n      <li>\n        \uB2F9\uCCA8 \uBC88\uD638\uB294 \uC911\uBCF5 \uC5C6\uB294 ").concat(length, "\uAC1C \uC5EC\uC57C\uD574\uC694.\n      </li>\n      <li>\uBCF4\uB108\uC2A4 \uBC88\uD638\uB294 \uB2F9\uCCA8 \uBC88\uD638\uC640 \uC911\uBCF5\uB418\uC9C0 \uC54A\uC544\uC57C\uD574\uC694. </li>\n    </ul>\n    ");
  },
  private_injectWinningCriteriaRule: function private_injectWinningCriteriaRule() {
    var parentElement = document.querySelector('.winning-criteria__explanation');
    var winningCriteriaRuleHtml = this.private_getWinningCriteriaRuleHtml();
    parentElement.insertAdjacentHTML('beforeend', winningCriteriaRuleHtml);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HtmlTextInjectorWithConstants);

/***/ }),

/***/ "./src/web/js/HtmlTextInjectorWithGameResults.js":
/*!*******************************************************!*\
  !*** ./src/web/js/HtmlTextInjectorWithGameResults.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./src/constants/index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var HtmlTextInjectorWithGameResults = {
  /**
   *
   * @param {number[][]} lottoTickets
   */
  injectorLottoTickets: function injectorLottoTickets(lottoTickets) {
    var _this = this;
    var issuedLottosElement = document.querySelector('.issued-lottos');
    var lottosCountElement = document.querySelector('#purchase-history__lottos-count__number');
    var fragment = document.createDocumentFragment();
    lottosCountElement.textContent = lottoTickets.length;
    lottoTickets.forEach(function (ticket) {
      _this.private_makeElementForIssuedLotto(ticket, fragment);
    });
    issuedLottosElement.replaceChildren(fragment);
  },
  /**
   * @param {{1:number,2:number,3:number,4:number,5:number}} statisticsResult
   */
  injectStatisticsTable: function injectStatisticsTable(statisticsResult) {
    var rateStatisticsElement = document.querySelector('.rank-statistics');
    this.private_removePreviousTable();
    rateStatisticsElement.insertAdjacentHTML('afterbegin', this.private_getTableHtml(statisticsResult));
  },
  /**
   * @param {number} profitRate
   */
  injectProfitRate: function injectProfitRate(profitRate) {
    var profitRateElement = document.querySelector('#profit-rate');
    profitRateElement.textContent = profitRate;
  },
  /**
   * @param {{1:number,2:number,3:number,4:number,5:number}} statisticsResult
   */
  private_getTableTrArray: function private_getTableTrArray(statisticsResult) {
    return Array.from(_constants__WEBPACK_IMPORTED_MODULE_0__.WINNING_RULE).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      return "\n      <tr id=\"rank".concat(key, "\">\n        <th scope=\"row\">").concat(value.matchedCount, "\uAC1C</th>\n        <td class=\"prize\">").concat(value.money.toLocaleString('ko-KR'), "</td>\n        <td class=\"count\">").concat(statisticsResult[key], "</td>\n      </tr>");
    }).join('');
  },
  private_removePreviousTable: function private_removePreviousTable() {
    var targetTableElement = document.querySelector('#rank-statistics__table');
    targetTableElement === null || targetTableElement === void 0 ? void 0 : targetTableElement.remove();
  },
  /**
   * @param {{1:number,2:number,3:number,4:number,5:number}} statisticsResult
   */
  private_getTableHtml: function private_getTableHtml(statisticsResult) {
    return "\n    <table id=\"rank-statistics__table\">\n      <caption class=\"screen-reader-only\">\uB85C\uB610 \uB2F9\uCCA8 \uACB0\uACFC</caption>\n      <thead>\n        <tr>\n          <th scope=\"col\">\uC77C\uCE58 \uAC2F\uC218</th>\n          <th scope=\"col\">\uB2F9\uCCA8\uAE08</th>\n          <th scope=\"col\">\uB2F9\uCCA8 \uAC2F\uC218</th>\n        </tr>\n      </thead>\n      <tbody>\n        ".concat(this.private_getTableTrArray(statisticsResult), "\n      </tbody>\n    </table>\n    ");
  },
  /**
   * @param {number[]} ticket
   * @param {DocumentFragment} fragment
   */
  private_makeElementForIssuedLotto: function private_makeElementForIssuedLotto(ticket, fragment) {
    var li = document.createElement('li');
    li.className = 'lotto';
    var textAboutLottoNumbers = ticket.sort(function (prev, current) {
      return prev - current;
    });

    // 화면 상에서 숫자들의 영을 맞추지 위해 div로 감싸기
    var otherChildrenOfLi = _toConsumableArray(textAboutLottoNumbers).map(function (string) {
      return "\n    <div class= 'number'>\n      ".concat(string, "\n    </div>\n    ");
    }).join('');
    var childrenHtml = "<div class=\"icon-ticket\">\uD83C\uDF9F\uFE0F</div>".concat(otherChildrenOfLi);
    li.insertAdjacentHTML('beforeEnd', childrenHtml);
    fragment.appendChild(li);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HtmlTextInjectorWithGameResults);

/***/ }),

/***/ "./src/web/js/LottoMachineGenerator.js":
/*!*********************************************!*\
  !*** ./src/web/js/LottoMachineGenerator.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HtmlTextInjectorWithGameResults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HtmlTextInjectorWithGameResults */ "./src/web/js/HtmlTextInjectorWithGameResults.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/web/js/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }


var _lottoResultsHelper = /*#__PURE__*/new WeakMap();
var _addEvent = /*#__PURE__*/new WeakSet();
var _handleSubmitToIssueLottos = /*#__PURE__*/new WeakSet();
var LottoMachineGenerator = /*#__PURE__*/_createClass(
/**
 *
 * @param {LottoResultHelper} lottoResultsHelper
 */
function LottoMachineGenerator(lottoResultsHelper) {
  _classCallCheck(this, LottoMachineGenerator);
  _classPrivateMethodInitSpec(this, _handleSubmitToIssueLottos);
  _classPrivateMethodInitSpec(this, _addEvent);
  _classPrivateFieldInitSpec(this, _lottoResultsHelper, {
    writable: true,
    value: void 0
  });
  _defineProperty(this, "$paymentFormElement", document.querySelector('.payment-amount__form'));
  _classPrivateFieldSet(this, _lottoResultsHelper, lottoResultsHelper);
  _classPrivateMethodGet(this, _addEvent, _addEvent2).call(this);
});
function _addEvent2() {
  var _this = this;
  this.$paymentFormElement.addEventListener('submit', function (event) {
    return _classPrivateMethodGet(_this, _handleSubmitToIssueLottos, _handleSubmitToIssueLottos2).call(_this, event);
  });
}
function _handleSubmitToIssueLottos2(event) {
  event.preventDefault();
  (0,_utils__WEBPACK_IMPORTED_MODULE_1__.recoveryInitialStateExceptPayment)();
  var currentTarget = event.currentTarget;
  var paymentAmountInputEl = currentTarget.elements.paymentAmount;
  var value = paymentAmountInputEl.value;
  var errorMessageElement = document.querySelector('.payment-amount .message-error');
  try {
    _classPrivateFieldGet(this, _lottoResultsHelper).generateLottoMachine(value);
    _HtmlTextInjectorWithGameResults__WEBPACK_IMPORTED_MODULE_0__["default"].injectorLottoTickets(_classPrivateFieldGet(this, _lottoResultsHelper).lottoTickets);
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.changeClassAboutGameStep)('winning');
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.handleErrorMessage)(errorMessageElement);
  } catch (error) {
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.handleErrorMessage)(errorMessageElement, error);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LottoMachineGenerator);

/***/ }),

/***/ "./src/web/js/StatisticsPopupController.js":
/*!*************************************************!*\
  !*** ./src/web/js/StatisticsPopupController.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _domains_Statistics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../domains/Statistics */ "./src/domains/Statistics.js");
/* harmony import */ var _HtmlTextInjectorWithGameResults__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HtmlTextInjectorWithGameResults */ "./src/web/js/HtmlTextInjectorWithGameResults.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/web/js/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }



var _lottoAnalytics = /*#__PURE__*/new WeakMap();
var _getLottoAnalytics = /*#__PURE__*/new WeakSet();
var _openPopup = /*#__PURE__*/new WeakSet();
var _assignElement = /*#__PURE__*/new WeakSet();
var _addEvent = /*#__PURE__*/new WeakSet();
var _hidePopup = /*#__PURE__*/new WeakSet();
var _restartGame = /*#__PURE__*/new WeakSet();
var StatisticsPopupController = /*#__PURE__*/_createClass(
/**
 *
 * @param {LottoResultHelper} lottoResultsHelper
 */
function StatisticsPopupController(_lottoResultsHelper) {
  _classCallCheck(this, StatisticsPopupController);
  _classPrivateMethodInitSpec(this, _restartGame);
  _classPrivateMethodInitSpec(this, _hidePopup);
  _classPrivateMethodInitSpec(this, _addEvent);
  _classPrivateMethodInitSpec(this, _assignElement);
  _classPrivateMethodInitSpec(this, _openPopup);
  _classPrivateMethodInitSpec(this, _getLottoAnalytics);
  _defineProperty(this, "$element", {
    popupElement: undefined,
    btnClosePopupElement: undefined,
    btnRestartElement: undefined
  });
  _classPrivateFieldInitSpec(this, _lottoAnalytics, {
    writable: true,
    value: void 0
  });
  _classPrivateMethodGet(this, _assignElement, _assignElement2).call(this);
  _classPrivateMethodGet(this, _getLottoAnalytics, _getLottoAnalytics2).call(this, _lottoResultsHelper);
  _classPrivateMethodGet(this, _openPopup, _openPopup2).call(this);
  _classPrivateMethodGet(this, _addEvent, _addEvent2).call(this);
}

/**
 *
 * @param {LottoResultHelper} lottoResultsHelper
 */);
function _getLottoAnalytics2(lottoResultsHelper) {
  var statistics = new _domains_Statistics__WEBPACK_IMPORTED_MODULE_0__["default"](lottoResultsHelper.results, lottoResultsHelper.paymentAmount);
  _classPrivateFieldSet(this, _lottoAnalytics, statistics.lottoAnalytics);
}
function _openPopup2() {
  _HtmlTextInjectorWithGameResults__WEBPACK_IMPORTED_MODULE_1__["default"].injectStatisticsTable(_classPrivateFieldGet(this, _lottoAnalytics).statisticsResult);
  _HtmlTextInjectorWithGameResults__WEBPACK_IMPORTED_MODULE_1__["default"].injectProfitRate(_classPrivateFieldGet(this, _lottoAnalytics).profitRate);
  this.$element.popupElement.classList.remove('hidden');
}
function _assignElement2() {
  this.$element = {
    popupElement: document.querySelector('.popup'),
    btnClosePopupElement: document.querySelector('.btn-close-popup'),
    btnRestartElement: document.querySelector('.btn-restart')
  };
}
function _addEvent2() {
  var _this = this;
  this.$element.btnClosePopupElement.addEventListener('click', function (event) {
    return _classPrivateMethodGet(_this, _hidePopup, _hidePopup2).call(_this, event);
  });
  this.$element.btnRestartElement.addEventListener('click', function (event) {
    return _classPrivateMethodGet(_this, _restartGame, _restartGame2).call(_this, event);
  });
}
function _hidePopup2(event) {
  event.stopPropagation();
  (0,_utils__WEBPACK_IMPORTED_MODULE_2__.changeClassAboutGameStep)('winning');
}
function _restartGame2(event) {
  event.stopPropagation();
  (0,_utils__WEBPACK_IMPORTED_MODULE_2__.recoveryInitialStateExceptPayment)();
  document.querySelector('.payment-amount__form').reset();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatisticsPopupController);

/***/ }),

/***/ "./src/web/js/WebLottoGameController.js":
/*!**********************************************!*\
  !*** ./src/web/js/WebLottoGameController.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _domains_LottoResultsHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../domains/LottoResultsHelper */ "./src/domains/LottoResultsHelper.js");
/* harmony import */ var _HtmlTextInjectorWithConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HtmlTextInjectorWithConstants */ "./src/web/js/HtmlTextInjectorWithConstants.js");
/* harmony import */ var _LottoMachineGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LottoMachineGenerator */ "./src/web/js/LottoMachineGenerator.js");
/* harmony import */ var _WinningLottoAndBonusGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WinningLottoAndBonusGenerator */ "./src/web/js/WinningLottoAndBonusGenerator.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }




var _lottoResultsHelper = /*#__PURE__*/new WeakMap();
var _setTextContextWithConstants = /*#__PURE__*/new WeakSet();
var _handleLottoMachineGenerator = /*#__PURE__*/new WeakSet();
var WebLottoGameController = /*#__PURE__*/_createClass(function WebLottoGameController() {
  _classCallCheck(this, WebLottoGameController);
  _classPrivateMethodInitSpec(this, _handleLottoMachineGenerator);
  _classPrivateMethodInitSpec(this, _setTextContextWithConstants);
  _classPrivateFieldInitSpec(this, _lottoResultsHelper, {
    writable: true,
    value: new _domains_LottoResultsHelper__WEBPACK_IMPORTED_MODULE_0__["default"]()
  });
  _classPrivateMethodGet(this, _setTextContextWithConstants, _setTextContextWithConstants2).call(this);
  _classPrivateMethodGet(this, _handleLottoMachineGenerator, _handleLottoMachineGenerator2).call(this);
});
function _setTextContextWithConstants2() {
  _HtmlTextInjectorWithConstants__WEBPACK_IMPORTED_MODULE_1__["default"].injectorText();
}
function _handleLottoMachineGenerator2() {
  new _LottoMachineGenerator__WEBPACK_IMPORTED_MODULE_2__["default"](_classPrivateFieldGet(this, _lottoResultsHelper));
  new _WinningLottoAndBonusGenerator__WEBPACK_IMPORTED_MODULE_3__["default"](_classPrivateFieldGet(this, _lottoResultsHelper));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebLottoGameController);

/***/ }),

/***/ "./src/web/js/WinningLottoAndBonusGenerator.js":
/*!*****************************************************!*\
  !*** ./src/web/js/WinningLottoAndBonusGenerator.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./src/constants/index.js");
/* harmony import */ var _StatisticsPopupController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StatisticsPopupController */ "./src/web/js/StatisticsPopupController.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/web/js/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



var _lottoResultsHelper = /*#__PURE__*/new WeakMap();
var _getNumbers = /*#__PURE__*/new WeakSet();
var _generateWinningLottoAndBonus = /*#__PURE__*/new WeakSet();
var _addEvent = /*#__PURE__*/new WeakSet();
var _moveScrollToTop = /*#__PURE__*/new WeakSet();
var _handleSubmitToGetStatistics = /*#__PURE__*/new WeakSet();
var WinningLottoAndBonusGenerator = /*#__PURE__*/_createClass(
/**
 *
 * @param {lottoResultsHelper} lottoResultsHelper
 */
function WinningLottoAndBonusGenerator(lottoResultsHelper) {
  _classCallCheck(this, WinningLottoAndBonusGenerator);
  _classPrivateMethodInitSpec(this, _handleSubmitToGetStatistics);
  _classPrivateMethodInitSpec(this, _moveScrollToTop);
  _classPrivateMethodInitSpec(this, _addEvent);
  _classPrivateMethodInitSpec(this, _generateWinningLottoAndBonus);
  _classPrivateMethodInitSpec(this, _getNumbers);
  _classPrivateFieldInitSpec(this, _lottoResultsHelper, {
    writable: true,
    value: void 0
  });
  _defineProperty(this, "$winningCriteriaFormElement", document.querySelector('.winning-criteria__form'));
  _classPrivateFieldSet(this, _lottoResultsHelper, lottoResultsHelper);
  _classPrivateMethodGet(this, _addEvent, _addEvent2).call(this);
});
function _getNumbers2() {
  var lottoNumberValues = Array.from(document.querySelectorAll('.winning-criteria__form-lotto-numbers input')).map(function (input) {
    return input.value;
  });
  return {
    lottoNumberValues: lottoNumberValues.join(_constants__WEBPACK_IMPORTED_MODULE_0__.NUMBER_DELIMITER),
    bonusNumberValues: document.querySelector('#input-bonus-number').value
  };
}
function _generateWinningLottoAndBonus2() {
  var _classPrivateMethodGe = _classPrivateMethodGet(this, _getNumbers, _getNumbers2).call(this),
    lottoNumberValues = _classPrivateMethodGe.lottoNumberValues,
    bonusNumberValues = _classPrivateMethodGe.bonusNumberValues;
  var errorMessageElement = document.querySelector('.winning-criteria .message-error');
  try {
    _classPrivateFieldGet(this, _lottoResultsHelper).generateWinningLotto(lottoNumberValues);
    _classPrivateFieldGet(this, _lottoResultsHelper).generateBonus(bonusNumberValues);
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.handleErrorMessage)(errorMessageElement);
    _classPrivateFieldGet(this, _lottoResultsHelper).calculateMatchingResults();
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.changeClassAboutGameStep)('statistics');
    new _StatisticsPopupController__WEBPACK_IMPORTED_MODULE_1__["default"](_classPrivateFieldGet(this, _lottoResultsHelper));
  } catch (error) {
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.handleErrorMessage)(errorMessageElement, error);
  }
}
function _addEvent2() {
  var _this = this;
  this.$winningCriteriaFormElement.addEventListener('submit', function (event) {
    return _classPrivateMethodGet(_this, _handleSubmitToGetStatistics, _handleSubmitToGetStatistics2).call(_this, event);
  });
}
function _moveScrollToTop2() {
  document.querySelector('html').scrollTop = 0;
}
function _handleSubmitToGetStatistics2(event) {
  event.preventDefault();
  _classPrivateMethodGet(this, _moveScrollToTop, _moveScrollToTop2).call(this);
  _classPrivateMethodGet(this, _generateWinningLottoAndBonus, _generateWinningLottoAndBonus2).call(this);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WinningLottoAndBonusGenerator);

/***/ }),

/***/ "./src/web/js/utils.js":
/*!*****************************!*\
  !*** ./src/web/js/utils.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeClassAboutGameStep: () => (/* binding */ changeClassAboutGameStep),
/* harmony export */   handleErrorMessage: () => (/* binding */ handleErrorMessage),
/* harmony export */   recoveryInitialStateExceptPayment: () => (/* binding */ recoveryInitialStateExceptPayment)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./src/constants/index.js");
/* harmony import */ var _constants_gameStep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/gameStep */ "./src/web/constants/gameStep.js");



/**
 *
 * @param {Element} element
 * @param {Error|undefined} error
 */
var handleErrorMessage = function handleErrorMessage(element, error) {
  var text = error ? error.message.replace(_constants__WEBPACK_IMPORTED_MODULE_0__.ERROR_PREFIX, '') : '';
  // eslint-disable-next-line
  element.textContent = text;
};

/**
 * @param {"payment"|"winning"|"statistics"} step
 */
var changeClassAboutGameStep = function changeClassAboutGameStep(step) {
  var appInnerElement = document.querySelector('#app .inner');
  appInnerElement.className = "inner ".concat(_constants_gameStep__WEBPACK_IMPORTED_MODULE_1__.GAME_STEP[step]);
};

/**
 * 구매 금액이 달라졌거나, 게임을 초기화 할때 구매금액을 제외한 나머지들을 초기 상태로 돌리는 로직
 */
var recoveryInitialStateExceptPayment = function recoveryInitialStateExceptPayment() {
  if (!document.querySelector('#app .inner').classList.contains(_constants_gameStep__WEBPACK_IMPORTED_MODULE_1__.GAME_STEP.payment)) {
    var _document$querySelect;
    changeClassAboutGameStep('payment');
    (_document$querySelect = document.querySelector('.winning-criteria__form')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.reset();
  }
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_app.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/css/_app.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#app {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
  max-width: 1440px;
  min-height: 1024px;
  margin: auto;
  font-family: var(--lotto-fontFamily);
  font-size: var(--lotto-bodyAndPlaceholder-fontSize);
  font-weight: var(--lotto-bodyAndPlaceholder-fontWeight);
  line-height: var(--lotto-bodyAndPlaceholder-lineHeight);
  color: var(--lotto-greyScale5-color);
  line-height: 24px;
  z-index: 0;
}

#app > .inner {
  position: relative;
  width: inherit;
  height: inherit;
  min-height: inherit;
  max-width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#app > .inner > header {
  display: flex;
  align-items: center;
  background-color: var(--lotto-primary-color);
  height: 64px;

  h1 {
    margin-left: 130px;
    font-size: var(--lotto-title-fontSize);
    font-weight: var(--lotto-title-fontWeight);
    line-height: var(--lotto-title-lineHeight);
    color: var(--lotto-greyScale1-color);
  }
}
#app footer {
  line-height: 80px;
  height: 80px;
  margin-top: auto;
  border-top: 1px solid rgba(var(--lotto-primary-color-rgb), 0.2);
  text-align: center;
  color: var(--lotto-primary-color);
  font-size: var(--lotto-caption-fontSize);
  font-weight: var(--lotto-caption-fontWeight);
}

@media screen and (max-width: 768px) {
  #app {
    overflow-x: hidden;
    min-height: 100vh;
  }

  #app > .inner > header {
    justify-content: center;
  }

  #app .popup {
    height: calc(100vh + 50px);
  }
}
`, "",{"version":3,"sources":["webpack://./src/web/css/_app.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,2BAA2B;EAC3B,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,kBAAkB;EAClB,YAAY;EACZ,oCAAoC;EACpC,mDAAmD;EACnD,uDAAuD;EACvD,uDAAuD;EACvD,oCAAoC;EACpC,iBAAiB;EACjB,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,cAAc;EACd,eAAe;EACf,mBAAmB;EACnB,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,2BAA2B;AAC7B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,4CAA4C;EAC5C,YAAY;;EAEZ;IACE,kBAAkB;IAClB,sCAAsC;IACtC,0CAA0C;IAC1C,0CAA0C;IAC1C,oCAAoC;EACtC;AACF;AACA;EACE,iBAAiB;EACjB,YAAY;EACZ,gBAAgB;EAChB,+DAA+D;EAC/D,kBAAkB;EAClB,iCAAiC;EACjC,wCAAwC;EACxC,4CAA4C;AAC9C;;AAEA;EACE;IACE,kBAAkB;IAClB,iBAAiB;EACnB;;EAEA;IACE,uBAAuB;EACzB;;EAEA;IACE,0BAA0B;EAC5B;AACF","sourcesContent":["#app {\r\n  position: relative;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: flex-start;\r\n  width: 100vw;\r\n  height: 100vh;\r\n  max-width: 1440px;\r\n  min-height: 1024px;\r\n  margin: auto;\r\n  font-family: var(--lotto-fontFamily);\r\n  font-size: var(--lotto-bodyAndPlaceholder-fontSize);\r\n  font-weight: var(--lotto-bodyAndPlaceholder-fontWeight);\r\n  line-height: var(--lotto-bodyAndPlaceholder-lineHeight);\r\n  color: var(--lotto-greyScale5-color);\r\n  line-height: 24px;\r\n  z-index: 0;\r\n}\r\n\r\n#app > .inner {\r\n  position: relative;\r\n  width: inherit;\r\n  height: inherit;\r\n  min-height: inherit;\r\n  max-width: inherit;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: flex-start;\r\n}\r\n\r\n#app > .inner > header {\r\n  display: flex;\r\n  align-items: center;\r\n  background-color: var(--lotto-primary-color);\r\n  height: 64px;\r\n\r\n  h1 {\r\n    margin-left: 130px;\r\n    font-size: var(--lotto-title-fontSize);\r\n    font-weight: var(--lotto-title-fontWeight);\r\n    line-height: var(--lotto-title-lineHeight);\r\n    color: var(--lotto-greyScale1-color);\r\n  }\r\n}\r\n#app footer {\r\n  line-height: 80px;\r\n  height: 80px;\r\n  margin-top: auto;\r\n  border-top: 1px solid rgba(var(--lotto-primary-color-rgb), 0.2);\r\n  text-align: center;\r\n  color: var(--lotto-primary-color);\r\n  font-size: var(--lotto-caption-fontSize);\r\n  font-weight: var(--lotto-caption-fontWeight);\r\n}\r\n\r\n@media screen and (max-width: 768px) {\r\n  #app {\r\n    overflow-x: hidden;\r\n    min-height: 100vh;\r\n  }\r\n\r\n  #app > .inner > header {\r\n    justify-content: center;\r\n  }\r\n\r\n  #app .popup {\r\n    height: calc(100vh + 50px);\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_common.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/css/_common.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `button {
  background-color: var(--lotto-primary-color);
  color: var(--lotto-greyScale1-color);
  padding: 6px 6px 6px 8px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
}

button:disabled {
  background-color: var(--lotto-greyScale3-color);
}

input {
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid var(--lotto-greyScale3-color);
}

form label {
  margin-bottom: 4px;
}
.hidden {
  display: none;
}

.message-error {
  height: 20px;
  margin: 5px 0;
  font-size: 12px;
  font-weight: var(lotto-caption-fontWeight);
  line-height: var(lotto-caption-lineHeight);
  color: rgb(236, 84, 84);
}

.shadow {
  -webkit-box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.19);
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.19);
}

.screen-reader-only {
  position: absolute;
  top: -9999px;
  left: -9999px;
}
`, "",{"version":3,"sources":["webpack://./src/web/css/_common.css"],"names":[],"mappings":"AAAA;EACE,4CAA4C;EAC5C,oCAAoC;EACpC,wBAAwB;EACxB,YAAY;EACZ,kBAAkB;EAClB,sBAAsB;AACxB;;AAEA;EACE,+CAA+C;AACjD;;AAEA;EACE,sBAAsB;EACtB,kBAAkB;EAClB,+CAA+C;AACjD;;AAEA;EACE,kBAAkB;AACpB;AACA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,eAAe;EACf,0CAA0C;EAC1C,0CAA0C;EAC1C,uBAAuB;AACzB;;AAEA;EACE,wDAAwD;EACxD,gDAAgD;AAClD;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,aAAa;AACf","sourcesContent":["button {\r\n  background-color: var(--lotto-primary-color);\r\n  color: var(--lotto-greyScale1-color);\r\n  padding: 6px 6px 6px 8px;\r\n  border: none;\r\n  border-radius: 4px;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbutton:disabled {\r\n  background-color: var(--lotto-greyScale3-color);\r\n}\r\n\r\ninput {\r\n  box-sizing: border-box;\r\n  border-radius: 4px;\r\n  border: 1px solid var(--lotto-greyScale3-color);\r\n}\r\n\r\nform label {\r\n  margin-bottom: 4px;\r\n}\r\n.hidden {\r\n  display: none;\r\n}\r\n\r\n.message-error {\r\n  height: 20px;\r\n  margin: 5px 0;\r\n  font-size: 12px;\r\n  font-weight: var(lotto-caption-fontWeight);\r\n  line-height: var(lotto-caption-lineHeight);\r\n  color: rgb(236, 84, 84);\r\n}\r\n\r\n.shadow {\r\n  -webkit-box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.19);\r\n  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.19);\r\n}\r\n\r\n.screen-reader-only {\r\n  position: absolute;\r\n  top: -9999px;\r\n  left: -9999px;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_contents.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/css/_contents.css ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_constants_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./_style-constants.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_style-constants.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_style_constants_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `main {
  width: inherit;
  min-height: fit-content;
  max-width: inherit;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--lotto-greyScale2-color);
}

main .contents {
  position: relative;
  width: var(--contents-width);
  height: 727px;
  background-color: var(--lotto-greyScale1-color);
  border: 1px solid #0000001f;
  padding: 0 16px;
  box-sizing: border-box;
}

main .contents > section {
  width: calc(var(--contents-width) - 16px * 2);
}

main .contents > header {
  font-weight: var(--lotto-title-fontWeight);
  font-size: var(--lotto-title-fontSize);
  line-height: var(--lotto-title-lineHeight);
  padding-top: 40px;
  padding-bottom: 28px;
  text-align: center;
}

.icon-toggle-rule {
  background-color: initial;
  padding: 0;
  width: max-content;
}

.payment-amount {
  position: relative;
  height: 64px;
  .inputForm {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  input,
  .btn-pay-lotto {
    height: 36px;
  }

  input {
    width: 310px;
    padding: 4px 8px;
  }

  input::placeholder {
    color: var(--lotto-greyScale4-color);
    height: 24px;
    margin: auto;
  }

  .icon-toggle-rule {
    position: absolute;
    top: -5px;
    right: 16px;
  }
}

.payment-amount__explanation {
  position: absolute;
  top: 0;
  right: -17px;
}

.payment-amount__form > div {
  display: flex;
  justify-content: space-between;
}

.purchase-history {
  margin-top: 28px;
  .issued-lottos {
    margin-top: 8px;
    max-height: 260px;
    height: fit-content;
    box-sizing: border-box;
    overflow-y: auto;
  }

  li {
    height: 36px;
    line-height: 36px;
    display: flex;
  }

  .number {
    width: 32px;
    text-align: center;
  }

  .number::before {
    content: ',';
  }

  .number:nth-child(2) {
    margin-left: 2px;
  }

  .number:nth-child(2)::before {
    content: '';
  }
}

.winning-criteria {
  margin-top: 24px;
  position: absolute;
  bottom: 27px;
}

.winning-criteria > div:nth-child(2) {
  position: relative;
  height: 24px;
}

.winning-criteria__explanation {
  position: absolute;
  top: 0;
  right: 0;
}

.winning-criteria__explanation div:nth-child(2) {
  position: relative;
  height: 24px;
}

.winning-criteria__form {
  section {
    height: 68px;
    header {
      font-size: var(--lotto-bodyAndPlaceholder-fontSize);
      font-weight: var(--lotto-bodyAndPlaceholder-fontWeight);
      line-height: var(--lotto-bodyAndPlaceholder-lineHeight);
    }

    input {
      width: 40px;
      height: 36px;
      padding-left: 5px;
    }
  }
}

.winning-criteria__input-group-container {
  display: flex;
  justify-content: space-between;
}

.winning-criteria__form-lotto-numbers {
  width: fit-content;
  margin-top: 4px;
  .input-group {
    display: flex;
    width: inherit;
    margin-top: 8px;
  }

  .input-group {
    width: fit-content;
  }

  input {
    margin-right: 8px;
  }

  input:last-child {
    margin-right: 0;
  }
}

.winning-criteria__form-bonus-number {
  position: relative;
  width: 90px;

  input {
    position: absolute;
    top: calc(24px + 8px);
    right: 0;
  }
}

.issued-lottos {
  li {
    margin-bottom: 1px;
  }
}

.btn-check-result {
  width: 100%;
}

@media screen and (max-width: 425px) {
  main .contents {
    width: var(--contents-small-mobile-width);
    padding: 0 7px;
  }

  main .contents > section {
    width: calc(var(--contents-small-mobile-width) - 14px);
  }

  .payment-amount input {
    width: 280px;
  }

  .winning-criteria {
    bottom: 10px;
  }

  .winning-criteria__form section header {
    font-size: 14px;
  }

  .winning-criteria__form section input {
    width: 38px;
    padding-left: 3px;
  }
}
`, "",{"version":3,"sources":["webpack://./src/web/css/_contents.css"],"names":[],"mappings":"AAEA;EACE,cAAc;EACd,uBAAuB;EACvB,kBAAkB;EAClB,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,+CAA+C;AACjD;;AAEA;EACE,kBAAkB;EAClB,4BAA4B;EAC5B,aAAa;EACb,+CAA+C;EAC/C,2BAA2B;EAC3B,eAAe;EACf,sBAAsB;AACxB;;AAEA;EACE,6CAA6C;AAC/C;;AAEA;EACE,0CAA0C;EAC1C,sCAAsC;EACtC,0CAA0C;EAC1C,iBAAiB;EACjB,oBAAoB;EACpB,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ;IACE,aAAa;IACb,sBAAsB;IACtB,8BAA8B;EAChC;;EAEA;;IAEE,YAAY;EACd;;EAEA;IACE,YAAY;IACZ,gBAAgB;EAClB;;EAEA;IACE,oCAAoC;IACpC,YAAY;IACZ,YAAY;EACd;;EAEA;IACE,kBAAkB;IAClB,SAAS;IACT,WAAW;EACb;AACF;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,YAAY;AACd;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,gBAAgB;EAChB;IACE,eAAe;IACf,iBAAiB;IACjB,mBAAmB;IACnB,sBAAsB;IACtB,gBAAgB;EAClB;;EAEA;IACE,YAAY;IACZ,iBAAiB;IACjB,aAAa;EACf;;EAEA;IACE,WAAW;IACX,kBAAkB;EACpB;;EAEA;IACE,YAAY;EACd;;EAEA;IACE,gBAAgB;EAClB;;EAEA;IACE,WAAW;EACb;AACF;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,QAAQ;AACV;;AAEA;EACE,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE;IACE,YAAY;IACZ;MACE,mDAAmD;MACnD,uDAAuD;MACvD,uDAAuD;IACzD;;IAEA;MACE,WAAW;MACX,YAAY;MACZ,iBAAiB;IACnB;EACF;AACF;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf;IACE,aAAa;IACb,cAAc;IACd,eAAe;EACjB;;EAEA;IACE,kBAAkB;EACpB;;EAEA;IACE,iBAAiB;EACnB;;EAEA;IACE,eAAe;EACjB;AACF;;AAEA;EACE,kBAAkB;EAClB,WAAW;;EAEX;IACE,kBAAkB;IAClB,qBAAqB;IACrB,QAAQ;EACV;AACF;;AAEA;EACE;IACE,kBAAkB;EACpB;AACF;;AAEA;EACE,WAAW;AACb;;AAEA;EACE;IACE,yCAAyC;IACzC,cAAc;EAChB;;EAEA;IACE,sDAAsD;EACxD;;EAEA;IACE,YAAY;EACd;;EAEA;IACE,YAAY;EACd;;EAEA;IACE,eAAe;EACjB;;EAEA;IACE,WAAW;IACX,iBAAiB;EACnB;AACF","sourcesContent":["@import './_style-constants.css';\r\n\r\nmain {\r\n  width: inherit;\r\n  min-height: fit-content;\r\n  max-width: inherit;\r\n  flex-grow: 1;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background-color: var(--lotto-greyScale2-color);\r\n}\r\n\r\nmain .contents {\r\n  position: relative;\r\n  width: var(--contents-width);\r\n  height: 727px;\r\n  background-color: var(--lotto-greyScale1-color);\r\n  border: 1px solid #0000001f;\r\n  padding: 0 16px;\r\n  box-sizing: border-box;\r\n}\r\n\r\nmain .contents > section {\r\n  width: calc(var(--contents-width) - 16px * 2);\r\n}\r\n\r\nmain .contents > header {\r\n  font-weight: var(--lotto-title-fontWeight);\r\n  font-size: var(--lotto-title-fontSize);\r\n  line-height: var(--lotto-title-lineHeight);\r\n  padding-top: 40px;\r\n  padding-bottom: 28px;\r\n  text-align: center;\r\n}\r\n\r\n.icon-toggle-rule {\r\n  background-color: initial;\r\n  padding: 0;\r\n  width: max-content;\r\n}\r\n\r\n.payment-amount {\r\n  position: relative;\r\n  height: 64px;\r\n  .inputForm {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: space-between;\r\n  }\r\n\r\n  input,\r\n  .btn-pay-lotto {\r\n    height: 36px;\r\n  }\r\n\r\n  input {\r\n    width: 310px;\r\n    padding: 4px 8px;\r\n  }\r\n\r\n  input::placeholder {\r\n    color: var(--lotto-greyScale4-color);\r\n    height: 24px;\r\n    margin: auto;\r\n  }\r\n\r\n  .icon-toggle-rule {\r\n    position: absolute;\r\n    top: -5px;\r\n    right: 16px;\r\n  }\r\n}\r\n\r\n.payment-amount__explanation {\r\n  position: absolute;\r\n  top: 0;\r\n  right: -17px;\r\n}\r\n\r\n.payment-amount__form > div {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.purchase-history {\r\n  margin-top: 28px;\r\n  .issued-lottos {\r\n    margin-top: 8px;\r\n    max-height: 260px;\r\n    height: fit-content;\r\n    box-sizing: border-box;\r\n    overflow-y: auto;\r\n  }\r\n\r\n  li {\r\n    height: 36px;\r\n    line-height: 36px;\r\n    display: flex;\r\n  }\r\n\r\n  .number {\r\n    width: 32px;\r\n    text-align: center;\r\n  }\r\n\r\n  .number::before {\r\n    content: ',';\r\n  }\r\n\r\n  .number:nth-child(2) {\r\n    margin-left: 2px;\r\n  }\r\n\r\n  .number:nth-child(2)::before {\r\n    content: '';\r\n  }\r\n}\r\n\r\n.winning-criteria {\r\n  margin-top: 24px;\r\n  position: absolute;\r\n  bottom: 27px;\r\n}\r\n\r\n.winning-criteria > div:nth-child(2) {\r\n  position: relative;\r\n  height: 24px;\r\n}\r\n\r\n.winning-criteria__explanation {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n}\r\n\r\n.winning-criteria__explanation div:nth-child(2) {\r\n  position: relative;\r\n  height: 24px;\r\n}\r\n\r\n.winning-criteria__form {\r\n  section {\r\n    height: 68px;\r\n    header {\r\n      font-size: var(--lotto-bodyAndPlaceholder-fontSize);\r\n      font-weight: var(--lotto-bodyAndPlaceholder-fontWeight);\r\n      line-height: var(--lotto-bodyAndPlaceholder-lineHeight);\r\n    }\r\n\r\n    input {\r\n      width: 40px;\r\n      height: 36px;\r\n      padding-left: 5px;\r\n    }\r\n  }\r\n}\r\n\r\n.winning-criteria__input-group-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n}\r\n\r\n.winning-criteria__form-lotto-numbers {\r\n  width: fit-content;\r\n  margin-top: 4px;\r\n  .input-group {\r\n    display: flex;\r\n    width: inherit;\r\n    margin-top: 8px;\r\n  }\r\n\r\n  .input-group {\r\n    width: fit-content;\r\n  }\r\n\r\n  input {\r\n    margin-right: 8px;\r\n  }\r\n\r\n  input:last-child {\r\n    margin-right: 0;\r\n  }\r\n}\r\n\r\n.winning-criteria__form-bonus-number {\r\n  position: relative;\r\n  width: 90px;\r\n\r\n  input {\r\n    position: absolute;\r\n    top: calc(24px + 8px);\r\n    right: 0;\r\n  }\r\n}\r\n\r\n.issued-lottos {\r\n  li {\r\n    margin-bottom: 1px;\r\n  }\r\n}\r\n\r\n.btn-check-result {\r\n  width: 100%;\r\n}\r\n\r\n@media screen and (max-width: 425px) {\r\n  main .contents {\r\n    width: var(--contents-small-mobile-width);\r\n    padding: 0 7px;\r\n  }\r\n\r\n  main .contents > section {\r\n    width: calc(var(--contents-small-mobile-width) - 14px);\r\n  }\r\n\r\n  .payment-amount input {\r\n    width: 280px;\r\n  }\r\n\r\n  .winning-criteria {\r\n    bottom: 10px;\r\n  }\r\n\r\n  .winning-criteria__form section header {\r\n    font-size: 14px;\r\n  }\r\n\r\n  .winning-criteria__form section input {\r\n    width: 38px;\r\n    padding-left: 3px;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_gameStep.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/css/_gameStep.css ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.step-payment {
  .purchase-history,
  .winning-criteria,
  .popup {
    display: none;
  }
}

.step-winning {
  .popup {
    display: none;
  }
}

.step-statistics {
  .popup {
    display: flex;
  }
}
`, "",{"version":3,"sources":["webpack://./src/web/css/_gameStep.css"],"names":[],"mappings":"AAAA;EACE;;;IAGE,aAAa;EACf;AACF;;AAEA;EACE;IACE,aAAa;EACf;AACF;;AAEA;EACE;IACE,aAAa;EACf;AACF","sourcesContent":[".step-payment {\r\n  .purchase-history,\r\n  .winning-criteria,\r\n  .popup {\r\n    display: none;\r\n  }\r\n}\r\n\r\n.step-winning {\r\n  .popup {\r\n    display: none;\r\n  }\r\n}\r\n\r\n.step-statistics {\r\n  .popup {\r\n    display: flex;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_popup.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/css/_popup.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.popup {
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  max-width: inherit;
  height: inherit;
  min-height: inherit;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(var(--lotto-greyScale5-color-rgb), 20%);

  .popup__inner {
    position: relative;
    width: 350px;
    height: 500px;
    padding: 32px 16px 40px 16px;
    box-sizing: border-box;
    background-color: var(--lotto-greyScale2-color);
  }

  .btn-close-popup {
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: inherit;
    color: var(--lotto-greyScale5-color);
  }
}

.popup__contents {
  header {
    font-size: var(--lotto-subtitle-fontSize);
    font-weight: var(--lotto-subtitle-fontWeight);
    line-height: var(--lotto-subtitle-lineHeight);
    text-align: center;
  }
}

.rank-statistics {
  width: 100%;
  margin-top: 33px;

  table {
    width: 100%;
    height: 274px;
    border-top: 1px solid var(--lotto-table-line-color);
    border-bottom: 1px solid var(--lotto-table-line-color);
  }

  thead th {
    font-weight: 600;
  }

  tr {
    border-bottom: 1px solid var(--lotto-table-line-color);
    height: calc(24px + 16px);
    line-height: calc(24px + 16px);
    text-align: center;
  }

  tbody tr:last-child {
    border: none;
  }
}

.profit-rate-container,
.btn-restart {
  width: 100%;
  margin-top: 32px;
}

.profit-rate-container {
  text-align: center;
}
`, "",{"version":3,"sources":["webpack://./src/web/css/_popup.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,cAAc;EACd,kBAAkB;EAClB,eAAe;EACf,mBAAmB;EACnB,WAAW;EACX,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,8DAA8D;;EAE9D;IACE,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,4BAA4B;IAC5B,sBAAsB;IACtB,+CAA+C;EACjD;;EAEA;IACE,kBAAkB;IAClB,QAAQ;IACR,UAAU;IACV,yBAAyB;IACzB,oCAAoC;EACtC;AACF;;AAEA;EACE;IACE,yCAAyC;IACzC,6CAA6C;IAC7C,6CAA6C;IAC7C,kBAAkB;EACpB;AACF;;AAEA;EACE,WAAW;EACX,gBAAgB;;EAEhB;IACE,WAAW;IACX,aAAa;IACb,mDAAmD;IACnD,sDAAsD;EACxD;;EAEA;IACE,gBAAgB;EAClB;;EAEA;IACE,sDAAsD;IACtD,yBAAyB;IACzB,8BAA8B;IAC9B,kBAAkB;EACpB;;EAEA;IACE,YAAY;EACd;AACF;;AAEA;;EAEE,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":[".popup {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: inherit;\r\n  max-width: inherit;\r\n  height: inherit;\r\n  min-height: inherit;\r\n  z-index: 10;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  background-color: rgba(var(--lotto-greyScale5-color-rgb), 20%);\r\n\r\n  .popup__inner {\r\n    position: relative;\r\n    width: 350px;\r\n    height: 500px;\r\n    padding: 32px 16px 40px 16px;\r\n    box-sizing: border-box;\r\n    background-color: var(--lotto-greyScale2-color);\r\n  }\r\n\r\n  .btn-close-popup {\r\n    position: absolute;\r\n    top: 8px;\r\n    right: 8px;\r\n    background-color: inherit;\r\n    color: var(--lotto-greyScale5-color);\r\n  }\r\n}\r\n\r\n.popup__contents {\r\n  header {\r\n    font-size: var(--lotto-subtitle-fontSize);\r\n    font-weight: var(--lotto-subtitle-fontWeight);\r\n    line-height: var(--lotto-subtitle-lineHeight);\r\n    text-align: center;\r\n  }\r\n}\r\n\r\n.rank-statistics {\r\n  width: 100%;\r\n  margin-top: 33px;\r\n\r\n  table {\r\n    width: 100%;\r\n    height: 274px;\r\n    border-top: 1px solid var(--lotto-table-line-color);\r\n    border-bottom: 1px solid var(--lotto-table-line-color);\r\n  }\r\n\r\n  thead th {\r\n    font-weight: 600;\r\n  }\r\n\r\n  tr {\r\n    border-bottom: 1px solid var(--lotto-table-line-color);\r\n    height: calc(24px + 16px);\r\n    line-height: calc(24px + 16px);\r\n    text-align: center;\r\n  }\r\n\r\n  tbody tr:last-child {\r\n    border: none;\r\n  }\r\n}\r\n\r\n.profit-rate-container,\r\n.btn-restart {\r\n  width: 100%;\r\n  margin-top: 32px;\r\n}\r\n\r\n.profit-rate-container {\r\n  text-align: center;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_reset.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/css/_reset.css ***!
  \**********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
`, "",{"version":3,"sources":["webpack://./src/web/css/_reset.css"],"names":[],"mappings":"AAAA;;;CAGC;;AAED;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAiFE,SAAS;EACT,UAAU;EACV,SAAS;EACT,eAAe;EACf,aAAa;EACb,wBAAwB;AAC1B;AACA,gDAAgD;AAChD;;;;;;;;;;;EAWE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,YAAY;AACd;AACA;;;;EAIE,WAAW;EACX,aAAa;AACf;AACA;EACE,yBAAyB;EACzB,iBAAiB;AACnB","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml,\r\nbody,\r\ndiv,\r\nspan,\r\napplet,\r\nobject,\r\niframe,\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6,\r\np,\r\nblockquote,\r\npre,\r\na,\r\nabbr,\r\nacronym,\r\naddress,\r\nbig,\r\ncite,\r\ncode,\r\ndel,\r\ndfn,\r\nem,\r\nimg,\r\nins,\r\nkbd,\r\nq,\r\ns,\r\nsamp,\r\nsmall,\r\nstrike,\r\nstrong,\r\nsub,\r\nsup,\r\ntt,\r\nvar,\r\nb,\r\nu,\r\ni,\r\ncenter,\r\ndl,\r\ndt,\r\ndd,\r\nol,\r\nul,\r\nli,\r\nfieldset,\r\nform,\r\nlabel,\r\nlegend,\r\ntable,\r\ncaption,\r\ntbody,\r\ntfoot,\r\nthead,\r\ntr,\r\nth,\r\ntd,\r\narticle,\r\naside,\r\ncanvas,\r\ndetails,\r\nembed,\r\nfigure,\r\nfigcaption,\r\nfooter,\r\nheader,\r\nhgroup,\r\nmenu,\r\nnav,\r\noutput,\r\nruby,\r\nsection,\r\nsummary,\r\ntime,\r\nmark,\r\naudio,\r\nvideo {\r\n  margin: 0;\r\n  padding: 0;\r\n  border: 0;\r\n  font-size: 100%;\r\n  font: inherit;\r\n  vertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle,\r\naside,\r\ndetails,\r\nfigcaption,\r\nfigure,\r\nfooter,\r\nheader,\r\nhgroup,\r\nmenu,\r\nnav,\r\nsection {\r\n  display: block;\r\n}\r\nbody {\r\n  line-height: 1;\r\n}\r\nol,\r\nul {\r\n  list-style: none;\r\n}\r\nblockquote,\r\nq {\r\n  quotes: none;\r\n}\r\nblockquote:before,\r\nblockquote:after,\r\nq:before,\r\nq:after {\r\n  content: '';\r\n  content: none;\r\n}\r\ntable {\r\n  border-collapse: collapse;\r\n  border-spacing: 0;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_rule.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/css/_rule.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./_common.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_common.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.explanation {
  z-index: 1;
  width: fit-content;
}

.explanation:hover {
  .rule {
    display: block;
  }
}

.rule {
  display: none;
  position: absolute;
  top: calc(17px + 7px);
  right: 0;
  background-color: var(--lotto-greyScale1-color);
  max-width: 600px;
  min-width: 300px;
  border-radius: 10px;
  font-size: 12px;
  padding: 5px;
  box-sizing: border-box;

  li {
    list-style: circle;
    margin-left: 16px;
  }
}

.icon-toggle-rule {
  font-size: 14px;
}

.payment-amount__explanation .rule {
  right: 16px;
}

@media screen and (max-width: 425px) {
  .rule {
    right: 15px;
  }
}
`, "",{"version":3,"sources":["webpack://./src/web/css/_rule.css"],"names":[],"mappings":"AAEA;EACE,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE;IACE,cAAc;EAChB;AACF;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,qBAAqB;EACrB,QAAQ;EACR,+CAA+C;EAC/C,gBAAgB;EAChB,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,YAAY;EACZ,sBAAsB;;EAEtB;IACE,kBAAkB;IAClB,iBAAiB;EACnB;AACF;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE;IACE,WAAW;EACb;AACF","sourcesContent":["@import './_common.css';\r\n\r\n.explanation {\r\n  z-index: 1;\r\n  width: fit-content;\r\n}\r\n\r\n.explanation:hover {\r\n  .rule {\r\n    display: block;\r\n  }\r\n}\r\n\r\n.rule {\r\n  display: none;\r\n  position: absolute;\r\n  top: calc(17px + 7px);\r\n  right: 0;\r\n  background-color: var(--lotto-greyScale1-color);\r\n  max-width: 600px;\r\n  min-width: 300px;\r\n  border-radius: 10px;\r\n  font-size: 12px;\r\n  padding: 5px;\r\n  box-sizing: border-box;\r\n\r\n  li {\r\n    list-style: circle;\r\n    margin-left: 16px;\r\n  }\r\n}\r\n\r\n.icon-toggle-rule {\r\n  font-size: 14px;\r\n}\r\n\r\n.payment-amount__explanation .rule {\r\n  right: 16px;\r\n}\r\n\r\n@media screen and (max-width: 425px) {\r\n  .rule {\r\n    right: 15px;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_style-constants.css":
/*!********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/css/_style-constants.css ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  --lotto-primary-color: #4e5ba6;
  --lotto-primary-color-rgb: 78, 91, 166;
  --lotto-greyScale1-color: #ffffff;
  --lotto-greyScale2-color: #fcfcfd;
  --lotto-greyScale3-color: #b4b4b4;
  --lotto-greyScale4-color: #8b8b8b;
  --lotto-greyScale5-color: #000000;
  --lotto-greyScale5-color-rgb: 0, 0, 0;
  --lotto-fontFamily: 'Roboto';
  --lotto-title-fontWeight: 800;
  --lotto-title-fontSize: 24px;
  --lotto-title-lineHeight: 36px;
  --lotto-subtitle-fontWeight: 600;
  --lotto-subtitle-fontSize: 20px;
  --lotto-subtitle-lineHeight: 24px;
  --lotto-bodyAndPlaceholder-fontWeight: 400;
  --lotto-bodyAndPlaceholder-fontSize: 15px;
  --lotto-bodyAndPlaceholder-lineHeight: 24px;
  --lotto-caption-fontWeight: 700;
  --lotto-caption-fontSize: 14px;
  --lotto-caption-lineHeight: 16px;
  --lotto-table-line-color: rgba(var(--lotto-greyScale5-color-rgb), 12%);
  --contents-width: 420px;
  --contents-small-mobile-width: 360px;
}
`, "",{"version":3,"sources":["webpack://./src/web/css/_style-constants.css"],"names":[],"mappings":"AAAA;EACE,8BAA8B;EAC9B,sCAAsC;EACtC,iCAAiC;EACjC,iCAAiC;EACjC,iCAAiC;EACjC,iCAAiC;EACjC,iCAAiC;EACjC,qCAAqC;EACrC,4BAA4B;EAC5B,6BAA6B;EAC7B,4BAA4B;EAC5B,8BAA8B;EAC9B,gCAAgC;EAChC,+BAA+B;EAC/B,iCAAiC;EACjC,0CAA0C;EAC1C,yCAAyC;EACzC,2CAA2C;EAC3C,+BAA+B;EAC/B,8BAA8B;EAC9B,gCAAgC;EAChC,sEAAsE;EACtE,uBAAuB;EACvB,oCAAoC;AACtC","sourcesContent":[":root {\r\n  --lotto-primary-color: #4e5ba6;\r\n  --lotto-primary-color-rgb: 78, 91, 166;\r\n  --lotto-greyScale1-color: #ffffff;\r\n  --lotto-greyScale2-color: #fcfcfd;\r\n  --lotto-greyScale3-color: #b4b4b4;\r\n  --lotto-greyScale4-color: #8b8b8b;\r\n  --lotto-greyScale5-color: #000000;\r\n  --lotto-greyScale5-color-rgb: 0, 0, 0;\r\n  --lotto-fontFamily: 'Roboto';\r\n  --lotto-title-fontWeight: 800;\r\n  --lotto-title-fontSize: 24px;\r\n  --lotto-title-lineHeight: 36px;\r\n  --lotto-subtitle-fontWeight: 600;\r\n  --lotto-subtitle-fontSize: 20px;\r\n  --lotto-subtitle-lineHeight: 24px;\r\n  --lotto-bodyAndPlaceholder-fontWeight: 400;\r\n  --lotto-bodyAndPlaceholder-fontSize: 15px;\r\n  --lotto-bodyAndPlaceholder-lineHeight: 24px;\r\n  --lotto-caption-fontWeight: 700;\r\n  --lotto-caption-fontSize: 14px;\r\n  --lotto-caption-lineHeight: 16px;\r\n  --lotto-table-line-color: rgba(var(--lotto-greyScale5-color-rgb), 12%);\r\n  --contents-width: 420px;\r\n  --contents-small-mobile-width: 360px;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/web/css/main.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/web/css/main.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./_app.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_app.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./_common.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_common.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_contents_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./_contents.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_contents.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_gameStep_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./_gameStep.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_gameStep.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./_popup.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_popup.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./_reset.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_reset.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_rule_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./_rule.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/_rule.css");
// Imports









var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_contents_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_gameStep_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_7__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_rule_css__WEBPACK_IMPORTED_MODULE_8__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `
`, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
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
  };

  // import a list of modules into the list
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

"use strict";


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
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
var encodeRegExps = {
    specialChars: /[<>'"&]/g,
    nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
};
var defaultEncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};
/** Encodes all the necessary (specified by `level`) characters in the text */
function encode(text, _a) {
    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
    if (!text) {
        return '';
    }
    var encodeRegExp = encodeRegExps[mode];
    var references = allNamedReferences[level].characters;
    var isHex = numeric === 'hexadecimal';
    encodeRegExp.lastIndex = 0;
    var _b = encodeRegExp.exec(text);
    var _c;
    if (_b) {
        _c = '';
        var _d = 0;
        do {
            if (_d !== _b.index) {
                _c += text.substring(_d, _b.index);
            }
            var _e = _b[0];
            var result_1 = references[_e];
            if (!result_1) {
                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
            }
            _c += result_1;
            _d = _b.index + _e.length;
        } while ((_b = encodeRegExp.exec(text)));
        if (_d !== text.length) {
            _c += text.substring(_d);
        }
    }
    else {
        _c =
            text;
    }
    return _c;
}
exports.encode = encode;
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
    level: 'all'
};
/** Decodes a single entity */
function decodeEntity(entity, _a) {
    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
    if (!entity) {
        return '';
    }
    var _b = entity;
    var decodeEntityLastChar_1 = entity[entity.length - 1];
    if (false) {}
    else if (false) {}
    else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
            _b = decodeResultByReference_1;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar_1 = entity[2];
            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            _b =
                decodeCode_1 >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode_1 > 65535
                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
    }
    return _b;
}
exports.decodeEntity = decodeEntity;
/** Decodes all entities in the text */
function decode(text, _a) {
    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    decodeRegExp.lastIndex = 0;
    var replaceMatch_1 = decodeRegExp.exec(text);
    var replaceResult_1;
    if (replaceMatch_1) {
        replaceResult_1 = '';
        var replaceLastIndex_1 = 0;
        do {
            if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
            }
            var replaceInput_1 = replaceMatch_1[0];
            var decodeResult_1 = replaceInput_1;
            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
            if (isAttribute
                && decodeEntityLastChar_2 === '=') {
                decodeResult_1 = replaceInput_1;
            }
            else if (isStrict
                && decodeEntityLastChar_2 !== ';') {
                decodeResult_1 = replaceInput_1;
            }
            else {
                var decodeResultByReference_2 = references[replaceInput_1];
                if (decodeResultByReference_2) {
                    decodeResult_1 = decodeResultByReference_2;
                }
                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                    var decodeSecondChar_2 = replaceInput_1[2];
                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                        ? parseInt(replaceInput_1.substr(3), 16)
                        : parseInt(replaceInput_1.substr(2));
                    decodeResult_1 =
                        decodeCode_2 >= 0x10ffff
                            ? outOfBoundsChar
                            : decodeCode_2 > 65535
                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                }
            }
            replaceResult_1 += decodeResult_1;
            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while ((replaceMatch_1 = decodeRegExp.exec(text)));
        if (replaceLastIndex_1 !== text.length) {
            replaceResult_1 += text.substring(replaceLastIndex_1);
        }
    }
    else {
        replaceResult_1 =
            text;
    }
    return replaceResult_1;
}
exports.decode = decode;


/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

/***/ }),

/***/ "./src/web/css/main.css":
/*!******************************!*\
  !*** ./src/web/css/main.css ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);


if (true) {
  if (!_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }
  var p;
  for (p in a) {
    if (isNamedExport && p === "default") {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (a[p] !== b[p]) {
      return false;
    }
  }
  for (p in b) {
    if (isNamedExport && p === "default") {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (!a[p]) {
      return false;
    }
  }
  return true;
};
    var isNamedExport = !_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals;
    var oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

    module.hot.accept(
      /*! !!../../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/main.css",
      __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/web/css/main.css");
(function () {
        if (!isEqualLocals(oldLocals, isNamedExport ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals, isNamedExport)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

              update(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}



       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


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

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
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

"use strict";


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

"use strict";


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

"use strict";


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
  }

  // For old IE
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
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
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

"use strict";


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

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);

    this.client = new WebSocket(url);

    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }
  /**
   * @param {(...args: any[]) => void} f
   */


  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }
    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    } // call f with the message string as the first argument

    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);

  return WebSocketClient;
}();



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=9000&pathname=%2Fws&logging=info&reconnect=10":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=9000&pathname=%2Fws&logging=info&reconnect=10 ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=9000&pathname=%2Fws&logging=info&reconnect=10";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/strip-ansi/index.js */ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js");
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />









/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | { warnings?: boolean, errors?: boolean }} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @type {Status}
 */

var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
};
/** @type {Options} */

var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);

if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
}

if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
}

if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}

if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}
/**
 * @param {string} level
 */


function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}

if (options.logging) {
  setAllLogLevel(options.logging);
}

self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }

    options.hot = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }

    options.liveReload = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling..."); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },

  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,

  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }

    options.overlay = value;
  },

  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }

    options.reconnect = value;
  },

  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },

  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'

  /**
   * @param {string} file
   */
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");

    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
          header = _formatProblem.header,
          body = _formatProblem.body;

      return "".concat(header, "\n").concat(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);

    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }

    var needShowOverlayForWarnings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;

    if (needShowOverlayForWarnings) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("warning", _warnings);
    }

    if (params && params.preventReloading) {
      return;
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },

  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");

    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
          header = _formatProblem2.header,
          body = _formatProblem2.body;

      return "".concat(header, "\n").concat(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);

    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }

    var needShowOverlayForErrors = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;

    if (needShowOverlayForErrors) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("error", _errors);
    }
  },

  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/SyncBailHookFake.js":
/*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/
/***/ (function(module) {


/**
 * Client stub for tapable SyncBailHook
 */

module.exports = function clientTapableSyncBailHook() {
  return {
    call: function call() {}
  };
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var LogType = Object.freeze({
  error:
  /** @type {"error"} */
  "error",
  // message, c style arguments
  warn:
  /** @type {"warn"} */
  "warn",
  // message, c style arguments
  info:
  /** @type {"info"} */
  "info",
  // message, c style arguments
  log:
  /** @type {"log"} */
  "log",
  // message, c style arguments
  debug:
  /** @type {"debug"} */
  "debug",
  // message, c style arguments
  trace:
  /** @type {"trace"} */
  "trace",
  // no arguments
  group:
  /** @type {"group"} */
  "group",
  // [label]
  groupCollapsed:
  /** @type {"groupCollapsed"} */
  "groupCollapsed",
  // [label]
  groupEnd:
  /** @type {"groupEnd"} */
  "groupEnd",
  // [label]
  profile:
  /** @type {"profile"} */
  "profile",
  // [profileName]
  profileEnd:
  /** @type {"profileEnd"} */
  "profileEnd",
  // [profileName]
  time:
  /** @type {"time"} */
  "time",
  // name, time as [seconds, nanoseconds]
  clear:
  /** @type {"clear"} */
  "clear",
  // no arguments
  status:
  /** @type {"status"} */
  "status" // message, arguments

});
exports.LogType = LogType;
/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");

var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);

    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }

  _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }

      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);

      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }

      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);

  return WebpackLogger;
}();

exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_10785__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var _require = __nested_webpack_require_10785__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    LogType = _require.LogType;
/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */

/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */

/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */


var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace( // eslint-disable-next-line no-useless-escape
    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }

  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }

  if (typeof item === "function") {
    return item;
  }

  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};
/**
 * @enum {number}
 */


var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};
/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */

module.exports = function (_ref) {
  var _ref$level = _ref.level,
      level = _ref$level === void 0 ? "info" : _ref$level,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug,
      console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] :
  /** @type {FilterItemTypes[]} */
  [].concat(debug).map(filterToFunction);
  /** @type {number} */

  var loglevel = LogLevel["".concat(level)] || 0;
  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */

  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };

    var debug = debugFilters.some(function (f) {
      return f(name);
    });

    switch (type) {
      case LogType.debug:
        if (!debug) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.debug === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;

      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;

        if (!debug && loglevel > LogLevel.verbose) {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.groupCollapsed === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }

          break;
        }

      // falls through

      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.group === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.groupEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.groupEnd();
        }

        break;

      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");

          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }

          break;
        }

      case LogType.profile:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profile === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.profileEnd:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profileEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.clear === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.clear();
        }

        break;

      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;

        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }

        break;

      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };

  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_20872__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var SyncBailHook = __nested_webpack_require_20872__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");

var _require = __nested_webpack_require_20872__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    Logger = _require.Logger;

var createConsoleLogger = __nested_webpack_require_20872__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");
/** @type {createConsoleLogger.LoggerOptions} */


var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */

exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};
/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */


exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);

  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};

exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_22988__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_22988__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_22988__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_22988__.o(definition, key) && !__nested_webpack_require_22988__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_22988__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_22988__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_22988__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_22988__.d(__nested_webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22988__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];
if(__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_368__) {

__nested_webpack_require_368__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_368__.d(__nested_webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stripAnsi; }
/* harmony export */ });
/* harmony import */ var ansi_regex__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_368__(/*! ansi-regex */ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js");

function stripAnsi(string) {
  if (typeof string !== 'string') {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }

  return string.replace((0,ansi_regex__WEBPACK_IMPORTED_MODULE_0__["default"])(), '');
}

/***/ }),

/***/ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/strip-ansi/node_modules/ansi-regex/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __nested_webpack_exports__, __nested_webpack_require_1387__) {

__nested_webpack_require_1387__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_1387__.d(__nested_webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ansiRegex; }
/* harmony export */ });
function ansiRegex() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$onlyFirst = _ref.onlyFirst,
      onlyFirst = _ref$onlyFirst === void 0 ? false : _ref$onlyFirst;

  var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
  return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_2352__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_2352__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_2352__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_2352__.o(definition, key) && !__nested_webpack_require_2352__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_2352__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_2352__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************************************!*\
  !*** ./client-src/modules/strip-ansi/index.js ***!
  \************************************************/
__nested_webpack_require_2352__.r(__nested_webpack_exports__);
/* harmony import */ var strip_ansi__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_2352__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

/* harmony default export */ __nested_webpack_exports__["default"] = (strip_ansi__WEBPACK_IMPORTED_MODULE_0__["default"]);
}();
var __webpack_export_target__ = exports;
for(var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];
if(__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatProblem: () => (/* binding */ formatProblem),
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   show: () => (/* binding */ show)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_1__);
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).


var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
/** @type {HTMLIFrameElement | null | undefined} */

var iframeContainerElement;
/** @type {HTMLDivElement | null | undefined} */

var containerElement;
/** @type {Array<(element: HTMLDivElement) => void>} */

var onLoadQueue = [];
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

function createContainer() {
  iframeContainerElement = document.createElement("iframe");
  iframeContainerElement.id = "webpack-dev-server-client-overlay";
  iframeContainerElement.src = "about:blank";
  iframeContainerElement.style.position = "fixed";
  iframeContainerElement.style.left = 0;
  iframeContainerElement.style.top = 0;
  iframeContainerElement.style.right = 0;
  iframeContainerElement.style.bottom = 0;
  iframeContainerElement.style.width = "100vw";
  iframeContainerElement.style.height = "100vh";
  iframeContainerElement.style.border = "none";
  iframeContainerElement.style.zIndex = 9999999999;

  iframeContainerElement.onload = function () {
    containerElement =
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.createElement("div");
    containerElement.id = "webpack-dev-server-client-overlay-div";
    containerElement.style.position = "fixed";
    containerElement.style.boxSizing = "border-box";
    containerElement.style.left = 0;
    containerElement.style.top = 0;
    containerElement.style.right = 0;
    containerElement.style.bottom = 0;
    containerElement.style.width = "100vw";
    containerElement.style.height = "100vh";
    containerElement.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    containerElement.style.color = "#E8E8E8";
    containerElement.style.fontFamily = "Menlo, Consolas, monospace";
    containerElement.style.fontSize = "large";
    containerElement.style.padding = "2rem";
    containerElement.style.lineHeight = "1.2";
    containerElement.style.whiteSpace = "pre-wrap";
    containerElement.style.overflow = "auto";
    var headerElement = document.createElement("span");
    headerElement.innerText = "Compiled with problems:";
    var closeButtonElement = document.createElement("button");
    closeButtonElement.innerText = "X";
    closeButtonElement.style.background = "transparent";
    closeButtonElement.style.border = "none";
    closeButtonElement.style.fontSize = "20px";
    closeButtonElement.style.fontWeight = "bold";
    closeButtonElement.style.color = "white";
    closeButtonElement.style.cursor = "pointer";
    closeButtonElement.style.cssFloat = "right"; // @ts-ignore

    closeButtonElement.style.styleFloat = "right";
    closeButtonElement.addEventListener("click", function () {
      hide();
    });
    containerElement.appendChild(headerElement);
    containerElement.appendChild(closeButtonElement);
    containerElement.appendChild(document.createElement("br"));
    containerElement.appendChild(document.createElement("br"));
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.body.appendChild(containerElement);
    onLoadQueue.forEach(function (onLoad) {
      onLoad(
      /** @type {HTMLDivElement} */
      containerElement);
    });
    onLoadQueue = [];
    /** @type {HTMLIFrameElement} */

    iframeContainerElement.onload = null;
  };

  document.body.appendChild(iframeContainerElement);
}
/**
 * @param {(element: HTMLDivElement) => void} callback
 */


function ensureOverlayExists(callback) {
  if (containerElement) {
    // Everything is ready, call the callback right away.
    callback(containerElement);
    return;
  }

  onLoadQueue.push(callback);

  if (iframeContainerElement) {
    return;
  }

  createContainer();
} // Successful compilation.


function hide() {
  if (!iframeContainerElement) {
    return;
  } // Clean up and reset internal state.


  document.body.removeChild(iframeContainerElement);
  iframeContainerElement = null;
  containerElement = null;
}
/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string }} item
 * @returns {{ header: string, body: string }}
 */


function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";

  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || ""; // eslint-disable-next-line no-nested-ternary

    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }

  return {
    header: header,
    body: body
  };
} // Compilation with errors (e.g. syntax error or missing modules).

/**
 * @param {string} type
 * @param {Array<string  | { file?: string, moduleName?: string, loc?: string, message?: string }>} messages
 */


function show(type, messages) {
  ensureOverlayExists(function () {
    messages.forEach(function (message) {
      var entryElement = document.createElement("div");
      var typeElement = document.createElement("span");

      var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;

      typeElement.innerText = header;
      typeElement.style.color = "#".concat(colors.red); // Make it look similar to our terminal.

      var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_1__.encode)(body));
      var messageTextNode = document.createElement("div");
      messageTextNode.innerHTML = text;
      entryElement.appendChild(typeElement);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(messageTextNode);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      /** @type {HTMLDivElement} */

      containerElement.appendChild(entryElement);
    });
  });
}



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */

 // this WebsocketClient is here as a default fallback, in case the client is not injected

/* eslint-disable camelcase */

var Client = // eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;
var client = null;
/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */

var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;

    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);

    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";

  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }

  var auth = objURL.auth || "";

  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }

  var host = "";

  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));

    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }

  var pathname = objURL.pathname || "";

  if (objURL.slashes) {
    host = "//".concat(host || "");

    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }

  var search = objURL.search || "";

  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }

  var hash = objURL.hash || "";

  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }

  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}
/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */


function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname; // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'

  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]"; // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384

  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }

  var socketURLProtocol = parsedURL.protocol || self.location.protocol; // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.

  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }

  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = ""; // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them

  if (parsedURL.username) {
    socketURLAuth = parsedURL.username; // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.

    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  } // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided


  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;

  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  } // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.


  var socketURLPathname = "/ws";

  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }

  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  } // Fallback to getting all scripts running in the document.


  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });

  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  } // Fail as there was no script to use.


  throw new Error("[webpack-dev-server] Failed to get current script source.");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server"; // default level is set on the client side, so it does not need
// to be set by the CLI or API

var defaultLevel = "info"; // options new options, merge with old options

/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */

function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}

setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */

function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};

  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.substr(1).split("&");

    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;

    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {// URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }

    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }

  return options;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");


/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */

function reloadApp(_ref, status) {
  var hot = _ref.hot,
      liveReload = _ref.liveReload;

  if (status.isUnloading) {
    return;
  }

  var currentHash = status.currentHash,
      previousHash = status.previousHash;
  var isInitial = currentHash.indexOf(
  /** @type {string} */
  previousHash) >= 0;

  if (isInitial) {
    return;
  }
  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */


  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }

  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;

  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);

    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;

        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */
// Send messages to the outside, so plugins can consume it.

/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
	/** @type {undefined|string} */
	var lastHash;
	var upToDate = function upToDate() {
		return /** @type {string} */ (lastHash).indexOf(__webpack_require__.h()) >= 0;
	};
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
	var check = function check() {
		module.hot
			.check(true)
			.then(function (updatedModules) {
				if (!updatedModules) {
					log(
						"warning",
						"[HMR] Cannot find update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log(
						"warning",
						"[HMR] (Probably because of restarting the webpack-dev-server)"
					);
					if (typeof window !== "undefined") {
						window.location.reload();
					}
					return;
				}

				if (!upToDate()) {
					check();
				}

				__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

				if (upToDate()) {
					log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function (err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log(
						"warning",
						"[HMR] Cannot apply update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log("warning", "[HMR] " + log.formatError(err));
					if (typeof window !== "undefined") {
						window.location.reload();
					}
				} else {
					log("warning", "[HMR] Update failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			log("info", "[HMR] Checking for updates on the server...");
			check();
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {}


/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";

function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


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
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
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
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("d1d02665fb0956652c11")
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
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "javascript-lotto:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatejavascript_lotto"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=9000&pathname=%2Fws&logging=info&reconnect=10");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/step2-index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyw0RkFBNEYsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FB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NkJBQTZCLDZCQUE2Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qiw2QkFBNkIsMkJBQTJCLHlCQUF5Qix5QkFBeUIsdUJBQXVCLHFCQUFxQixxQkFBcUIsY0FBYyxjQUFjLGVBQWUsZUFBZSxhQUFhLGFBQWEsY0FBYyxhQUFhLGFBQWEsZUFBZSxhQUFhLFlBQVksWUFBWSxZQUFZLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsYUFBYSxhQUFhLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsWUFBWSxjQUFjLGFBQWEsY0FBYyxlQUFlLFdBQVcsV0FBVyxXQUFXLGdCQUFnQixXQUFXLFlBQVksY0FBYyxZQUFZLGdCQUFnQixZQUFZLFlBQVksWUFBWSxjQUFjLGNBQWMsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsWUFBWSxjQUFjLGFBQWEsY0FBYyxlQUFlLFdBQVcsV0FBVyxXQUFXLGdCQUFnQixXQUFXLFlBQVksZUFBZSxjQUFjLFlBQVksZ0JBQWdCLFlBQVksWUFBWSxZQUFZLGNBQWMsaUJBQWlCLGNBQWMsWUFBWSxhQUFhLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsYUFBYSxjQUFjLGdCQUFnQixhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsY0FBYyxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsZUFBZSxhQUFhLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxXQUFXLGFBQWEsWUFBWSxjQUFjLGVBQWUsY0FBYyxhQUFhLGNBQWMsWUFBWSxZQUFZLFdBQVcsWUFBWSxZQUFZLFlBQVksZUFBZSxZQUFZLGFBQWEsY0FBYyxXQUFXLGNBQWMsV0FBVyxXQUFXLFlBQVksWUFBWSxhQUFhLGFBQWEsYUFBYSxjQUFjLGVBQWUsYUFBYSxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxhQUFhLFlBQVksZUFBZSxjQUFjLGVBQWUsY0FBYyxNQUFNLGFBQWEsV0FBVyxhQUFhLGNBQWMsYUFBYSxjQUFjLGVBQWUsWUFBWSxlQUFlLGFBQWEsWUFBWSxhQUFhLGFBQWEsY0FBYyxZQUFZLFlBQVksWUFBWSxhQUFhLFlBQVksZUFBZSxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsZUFBZSxjQUFjLGFBQWEsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGFBQWEsZUFBZSxlQUFlLGNBQWMsYUFBYSxZQUFZLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxhQUFhLGVBQWUsY0FBYyxjQUFjLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxhQUFhLGVBQWUsZUFBZSxjQUFjLGFBQWEsWUFBWSxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsYUFBYSxlQUFlLGVBQWUsZUFBZSxlQUFlLGNBQWMsYUFBYSxlQUFlLGNBQWMsYUFBYSxhQUFhLFlBQVksV0FBVyxXQUFXLGNBQWMsY0FBYyxlQUFlLGVBQWUsYUFBYSxhQUFhLGNBQWMsYUFBYSxhQUFhLGVBQWUsYUFBYSxZQUFZLFlBQVksWUFBWSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGFBQWEsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixhQUFhLFlBQVksY0FBYyxhQUFhLGNBQWMsZUFBZSxXQUFXLFdBQVcsV0FBVyxnQkFBZ0IsV0FBVyxZQUFZLGNBQWMsWUFBWSxnQkFBZ0IsWUFBWSxZQUFZLFlBQVksY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixhQUFhLFlBQVksY0FBYyxhQUFhLGNBQWMsZUFBZSxXQUFXLFdBQVcsV0FBVyxnQkFBZ0IsV0FBVyxZQUFZLGVBQWUsY0FBYyxZQUFZLGdCQUFnQixZQUFZLFlBQVksWUFBWSxjQUFjLGlCQUFpQixjQUFjLFlBQVksYUFBYSxl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ZSxjQUFjLGFBQWEsbUJBQW1CLGFBQWEseUJBQXlCLGFBQWEsY0FBYyxjQUFjLGNBQWMsbUJBQW1CLGNBQWMsYUFBYSxjQUFjLGFBQWEsaUJBQWlCLGdCQUFnQixnQkFBZ0IsY0FBYyxnQkFBZ0IsY0FBYyxjQUFjLGVBQWUsYUFBYSxjQUFjLGFBQWEsWUFBWSxjQUFjLGVBQWUsYUFBYSxhQUFhLGFBQWEsYUFBYSwwQkFBMEIsZUFBZSxlQUFlLGFBQWEsY0FBYyxjQUFjLGVBQWUsY0FBYyxlQUFlLGFBQWEsY0FBYyxjQUFjLGFBQWEsV0FBVyxjQUFjLGNBQWMsYUFBYSxhQUFhLGFBQWEsZUFBZSxjQUFjLFlBQVksYUFBYSxjQUFjLGNBQWMsYUFBYSxhQUFhLGVBQWUsZUFBZSxZQUFZLGFBQWEsYUFBYSxlQUFlLGlCQUFpQixjQUFjLGVBQWUsZUFBZSxlQUFlLGFBQWEsWUFBWSxjQUFjLFlBQVksY0FBYyxhQUFhLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsYUFBYSxpQkFBaUIsYUFBYSxjQUFjLGFBQWEsc0JBQXNCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGlCQUFpQixpQkFBaUIsaUJBQWlCLGlCQUFpQixpQkFBaUIsY0FBYyxnQkFBZ0IsaUJBQWlCLGVBQWUsZ0JBQWdCLGNBQWMsY0FBYyxZQUFZLGVBQWUsaUJBQWlCLGFBQWEsYUFBYSxjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGlCQUFpQixpQkFBaUIsWUFBWSxlQUFlLGdCQUFnQixhQUFhLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGNBQWMsY0FBYyxlQUFlLGNBQWMsYUFBYSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxhQUFhLGlCQUFpQixhQUFhLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxhQUFhLGNBQWMsY0FBYyxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxpQkFBaUIsZUFBZSxjQUFjLGVBQWUsWUFBWSxlQUFlLGlCQUFpQixlQUFlLGVBQWUsZUFBZSxjQUFjLGNBQWMsY0FBYyxlQUFlLGVBQWUsY0FBYyxjQUFjLGdCQUFnQixhQUFhLGdCQUFnQixhQUFhLGFBQWEsYUFBYSxrQkFBa0IsWUFBWSxZQUFZLGFBQWEsYUFBYSxhQUFhLGNBQWMsY0FBYyxXQUFXLGFBQWEsYUFBYSxjQUFjLGlCQUFpQixlQUFlLGdCQUFnQixpQkFBaUIsY0FBYyxjQUFjLGVBQWUsbUJBQW1CLGdCQUFnQixjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsYUFBYSxjQUFjLGFBQWEsY0FBYyxjQUFjLGdCQUFnQixnQkFBZ0Isb0JBQW9CLG9CQUFvQix1QkFBdUIsZ0JBQWdCLFlBQVksaUJBQWlCLGVBQWUsZUFBZSxlQUFlLGNBQWMsY0FBYyx3QkFBd0IsZ0JBQWdCLGNBQWMsY0FBYyxlQUFlLGNBQWMsZUFBZSxhQUFhLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxZQUFZLHVCQUF1QixjQUFjLFlBQVksY0FBYyxnQkFBZ0IsZUFBZSxhQUFhLGNBQWMsZUFBZSxjQUFjLGVBQWUsZUFBZSxhQUFhLGlCQUFpQixlQUFlLGFBQWEsY0FBYyxhQUFhLGVBQWUsZUFBZSxjQUFjLGlCQUFpQixlQUFlLGNBQWMsYUFBYSxhQUFhLGVBQWUsY0FBYyxxQkFBcUIsZ0JBQWdCLGFBQWEsaUJBQWlCLGVBQWUsZUFBZSxlQUFlLGVBQWUsY0FBYyxnQkFBZ0IsWUFBWSxhQUFhLHNCQUFzQixhQUFhLFdBQVcsZUFBZSxtQkFBbUIsZUFBZSxXQUFXLGlCQUFpQixZQUFZLG9CQUFvQixlQUFlLGNBQWMsbUJBQW1CLGVBQWUsZUFBZSxhQUFhLFlBQVksYUFBYSxjQUFjLGNBQWMsYUFBYSxlQUFlLGNBQWMsZ0JBQWdCLG1CQUFtQixlQUFlLGdCQUFnQixnQkFBZ0IsaUJBQWlCLHFCQUFxQixjQUFjLGFBQWEsWUFBWSxZQUFZLGFBQWEsYUFBYSxhQUFhLFlBQVksZUFBZSxlQUFlLGNBQWMsZUFBZSxhQUFhLGNBQWMsYUFBYSxhQUFhLGNBQWMsY0FBYyxhQUFhLGNBQWMsa0JBQWtCLGNBQWMsaUJBQWlCLGFBQWEsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGVBQWUsZUFBZSxlQUFlLGNBQWMsZUFBZSxjQUFjLG1CQUFtQixlQUFlLGNBQWMsa0JBQWtCLGVBQWUsY0FBYyxZQUFZLGFBQWEsY0FBYyxlQUFlLGdCQUFnQixpQkFBaUIsY0FBYyxlQUFlLGFBQWEsY0FBYyxhQUFhLFlBQVksWUFBWSxZQUFZLGNBQWMsaUJBQWlCLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxlQUFlLGVBQWUsZ0JBQWdCLGVBQWUsY0FBYyxlQUFlLGdCQUFnQiw0QkFBNEIsZUFBZSxjQUFjLGtCQUFrQixhQUFhLGVBQWUsYUFBYSxlQUFlLGVBQWUsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLGVBQWUsY0FBYyxlQUFlLGVBQWUsZUFBZSxjQUFjLFlBQVksYUFBYSxjQUFjLGFBQWEsZUFBZSxhQUFhLGFBQWEsZUFBZSxjQUFjLGNBQWMsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGNBQWMsaUJBQWlCLGlCQUFpQixpQkFBaUIsY0FBYyxhQUFhLGNBQWMsY0FBYyxhQUFhLGVBQWUsY0FBYyxjQUFjLGdCQUFnQixjQUFjLGVBQWUsZUFBZSxjQUFjLGFBQWEsY0FBYyxZQUFZLGFBQWEsY0FBYyxjQUFjLGNBQWMsZUFBZSxjQUFjLGNBQWMsaUJBQWlCLGVBQWUsWUFBWSxhQUFhLGVBQWUsYUFBYSxhQUFhLGNBQWMsY0FBYyxlQUFlLGNBQWMsbUJBQW1CLGFBQWEsZUFBZSxpQkFBaUIsZUFBZSxjQUFjLG1CQUFtQixjQUFjLGdCQUFnQixlQUFlLHNCQUFzQixlQUFlLGdCQUFnQixzQkFBc0IsWUFBWSxlQUFlLGFBQWEsZUFBZSxjQUFjLGNBQWMsSUFBSSxTQUFTLGFBQWEsY0FBYyxnQkFBZ0IsZ0JBQWdCLGVBQWUsZUFBZSxZQUFZLGFBQWEsZ0JBQWdCLGlCQUFpQixhQUFhLFlBQVksY0FBYyxlQUFlLGNBQWMsZUFBZSxnQkFBZ0IsaUJBQWlCLGNBQWMsZUFBZSxjQUFjLGVBQWUsYUFBYSxZQUFZLGVBQWUsY0FBYyxhQUFhLGVBQWUsY0FBYyxlQUFlLG1CQUFtQixjQUFjLGlCQUFpQixhQUFhLGNBQWMsY0FBYyxjQUFjLGFBQWEsZUFBZSxjQUFjLGNBQWMsZUFBZSxnQkFBZ0IsZUFBZSxnQkFBZ0IsYUFBYSxlQUFlLGVBQWUsWUFBWSxjQUFjLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGVBQWUsZ0JBQWdCLGVBQWUscUJBQXFCLGlCQUFpQixnQkFBZ0IsY0FBYyxjQUFjLGNBQWMsYUFBYSxnQkFBZ0IsZUFBZSxlQUFlLFlBQVksY0FBYyxhQUFhLFlBQVksY0FBYyxlQUFlLGNBQWMsZ0JBQWdCLGFBQWEsZUFBZSxjQUFjLGNBQWMsV0FBVyxjQUFjLGFBQWEsYUFBYSxjQUFjLGNBQWMsYUFBYSxhQUFhLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxjQUFjLGVBQWUsY0FBYyxnQkFBZ0IsYUFBYSxlQUFlLGVBQWUsa0JBQWtCLGFBQWEsWUFBWSxjQUFjLGNBQWMsZUFBZSxlQUFlLGFBQWEsYUFBYSx3QkFBd0IsY0FBYyxZQUFZLGFBQWEsYUFBYSxlQUFlLG1CQUFtQixhQUFhLGNBQWMsWUFBWSxnQkFBZ0Isa0JBQWtCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZUFBZSxnQkFBZ0Isb0JBQW9CLGdCQUFnQixnQkFBZ0IsY0FBYyxhQUFhLG9CQUFvQixhQUFhLG9CQUFvQixlQUFlLFdBQVcsWUFBWSxlQUFlLGNBQWMsZUFBZSxlQUFlLGNBQWMsZUFBZSxjQUFjLGNBQWMsZ0JBQWdCLGVBQWUsY0FBYyxjQUFjLGlCQUFpQixlQUFlLGlCQUFpQixlQUFlLGNBQWMsZUFBZSxlQUFlLGVBQWUsY0FBYyxZQUFZLGVBQWUsYUFBYSxlQUFlLGNBQWMsY0FBYyxhQUFhLGFBQWEsZUFBZSxZQUFZLGNBQWMsY0FBYyxnQkFBZ0IsWUFBWSxjQUFjLGNBQWMsZ0JBQWdCLGFBQWEsY0FBYyxhQUFhLGNBQWMsWUFBWSxZQUFZLGFBQWEsYUFBYSxhQUFhLGVBQWUsYUFBYSxnQkFBZ0IsWUFBWSxlQUFlLGFBQWEsZUFBZSxpQkFBaUIsYUFBYSxjQUFjLGFBQWEsZUFBZSxjQUFjLFlBQVksZUFBZSxlQUFlLGVBQWUsZ0JBQWdCLGFBQWEsWUFBWSxlQUFlLGNBQWMsV0FBVyxjQUFjLGdCQUFnQixhQUFhLGlCQUFpQixnQkFBZ0IsZUFBZSxjQUFjLGdCQUFnQixnQkFBZ0IsaUJBQWlCLGNBQWMsY0FBYyxZQUFZLG1CQUFtQixjQUFjLGFBQWEsZUFBZSxjQUFjLGlCQUFpQixpQkFBaUIsaUJBQWlCLGVBQWUsY0FBYyxZQUFZLGVBQWUsYUFBYSxjQUFjLGVBQWUsY0FBYyxnQkFBZ0IsY0FBYyxlQUFlLGFBQWEsY0FBYyxlQUFlLGlCQUFpQixjQUFjLGNBQWMsY0FBYyxlQUFlLGdCQUFnQixjQUFjLGVBQWUsZUFBZSxnQkFBZ0IsdUJBQXVCLHdCQUF3QixlQUFlLGNBQWMsY0FBYyxJQUFJLFNBQVMsYUFBYSxjQUFjLGdCQUFnQixnQkFBZ0IsZUFBZSxlQUFlLFlBQVksYUFBYSxnQkFBZ0IsYUFBYSxhQUFhLGVBQWUsYUFBYSxlQUFlLFlBQVksZUFBZSxjQUFjLGVBQWUsYUFBYSxZQUFZLG1CQUFtQixjQUFjLGNBQWMsY0FBYyxjQUFjLGNBQWMsZUFBZSxnQkFBZ0IsYUFBYSxlQUFlLGlCQUFpQixlQUFlLGNBQWMsZUFBZSxzQkFBc0IsaUJBQWlCLGdCQUFnQixXQUFXLGVBQWUsWUFBWSxtQkFBbUIsZUFBZSxlQUFlLGNBQWMsaUJBQWlCLG9CQUFvQixpQkFBaUIsaUJBQWlCLFlBQVksYUFBYSxjQUFjLGNBQWMsYUFBYSxJQUFJLFNBQVMsYUFBYSxhQUFhLGFBQWEsY0FBYyxlQUFlLGFBQWEsWUFBWSxjQUFjLGlCQUFpQixlQUFlLGFBQWEsY0FBYyxhQUFhLGNBQWMsY0FBYyxnQkFBZ0IsZ0JBQWdCLGVBQWUsaUJBQWlCLGVBQWUsWUFBWSxhQUFhLGVBQWUsZUFBZSxZQUFZLGFBQWEsZUFBZSxjQUFjLGtCQUFrQixnQkFBZ0IsZ0JBQWdCLGNBQWMsYUFBYSxlQUFlLGtCQUFrQixlQUFlLGdCQUFnQixnQkFBZ0IsbUJBQW1CLGtCQUFrQixnQkFBZ0IsZ0JBQWdCLGVBQWUsZUFBZSxlQUFlLGFBQWEsYUFBYSxhQUFhLGFBQWEsa0JBQWtCLGVBQWUsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsbUJBQW1CLGtCQUFrQixnQkFBZ0IsZUFBZSxlQUFlLGVBQWUsY0FBYyxlQUFlLGNBQWMsZUFBZSxZQUFZLGVBQWUsZUFBZSxZQUFZLGVBQWUsYUFBYSxjQUFjLGlCQUFpQixjQUFjLGNBQWMsaUJBQWlCLGVBQWUsZUFBZSxlQUFlLGNBQWMsZ0JBQWdCLGVBQWUsYUFBYSxhQUFhLGVBQWUsaUJBQWlCLGdCQUFnQixjQUFjLGdCQUFnQixpQkFBaUIsY0FBYyxhQUFhLGNBQWMsZUFBZSxhQUFhLGVBQWUsY0FBYyxlQUFlLGNBQWMsWUFBWSxlQUFlLGVBQWUsYUFBYSxlQUFlLGNBQWMsaUJBQWlCLGVBQWUsY0FBYyxjQUFjLGNBQWMsY0FBYyxnQkFBZ0IsY0FBYyxpQkFBaUIsZUFBZSxjQUFjLGNBQWMsY0FBYyxjQUFjLGVBQWUsYUFBYSxnQkFBZ0IsYUFBYSxjQUFjLGVBQWUsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLFlBQVksZUFBZSxjQUFjLGVBQWUsYUFBYSxjQUFjLGNBQWMsZ0JBQWdCLGNBQWMsZUFBZSxlQUFlLFdBQVcsYUFBYSxjQUFjLGNBQWMsYUFBYSxXQUFXLGFBQWEsY0FBYyxjQUFjLGVBQWUs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QUk7V0FDSjs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBLElBQUk7V0FDSjs7V0FFQTtXQUNBO1dBQ0EsR0FBRztXQUNILEVBQUU7V0FDRjs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxJQUFJO1dBQ0osR0FBRztXQUNIO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ25ZQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxtQkFBbUIsMkJBQTJCO1dBQzlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTs7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QUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFLElBQUk7V0FDTjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0Esc0NBQXNDO1dBQ3RDO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7O1dBRUE7O1dBRUE7Ozs7O1dDOWZBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvYW5zaS1odG1sLWNvbW11bml0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vc3JjL2NvbnN0YW50cy9kZWxpbWl0ZXJzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvY29uc3RhbnRzL2luZGV4LmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvY29uc3RhbnRzL21lc3NhZ2VzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvY29uc3RhbnRzL3J1bGVzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvZG9tYWlucy9Cb251cy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vc3JjL2RvbWFpbnMvTG90dG8uanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL3NyYy9kb21haW5zL0xvdHRvTWFjaGluZS5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vc3JjL2RvbWFpbnMvTG90dG9OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL3NyYy9kb21haW5zL0xvdHRvUmVzdWx0c0hlbHBlci5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vc3JjL2RvbWFpbnMvU3RhdGlzdGljcy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vc3JjL2RvbWFpbnMvV2lubmluZ0xvdHRvLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvc3RlcDItaW5kZXguanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL3NyYy91dGlscy9SYW5kb21OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL3NyYy91dGlscy92YWxpZGF0b3JzVXRpbHMuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL3NyYy93ZWIvY29uc3RhbnRzL2dhbWVTdGVwLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvd2ViL2pzL0h0bWxUZXh0SW5qZWN0b3JXaXRoQ29uc3RhbnRzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvd2ViL2pzL0h0bWxUZXh0SW5qZWN0b3JXaXRoR2FtZVJlc3VsdHMuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL3NyYy93ZWIvanMvTG90dG9NYWNoaW5lR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvd2ViL2pzL1N0YXRpc3RpY3NQb3B1cENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL3NyYy93ZWIvanMvV2ViTG90dG9HYW1lQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vc3JjL3dlYi9qcy9XaW5uaW5nTG90dG9BbmRCb251c0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vc3JjL3dlYi9qcy91dGlscy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vc3JjL3dlYi9jc3MvX2FwcC5jc3MiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL3NyYy93ZWIvY3NzL19jb21tb24uY3NzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvd2ViL2Nzcy9fY29udGVudHMuY3NzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvd2ViL2Nzcy9fZ2FtZVN0ZXAuY3NzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvd2ViL2Nzcy9fcG9wdXAuY3NzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvd2ViL2Nzcy9fcmVzZXQuY3NzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvd2ViL2Nzcy9fcnVsZS5jc3MiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL3NyYy93ZWIvY3NzL19zdHlsZS1jb25zdGFudHMuY3NzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9zcmMvd2ViL2Nzcy9tYWluLmNzcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi9uYW1lZC1yZWZlcmVuY2VzLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvbnVtZXJpYy11bmljb2RlLW1hcC5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vbm9kZV9tb2R1bGVzL2h0bWwtZW50aXRpZXMvbGliL3N1cnJvZ2F0ZS1wYWlycy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vc3JjL3dlYi9jc3MvbWFpbi5jc3M/NzUxMiIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9jbGllbnRzL1dlYlNvY2tldENsaWVudC5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L21vZHVsZXMvbG9nZ2VyL2luZGV4LmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L292ZXJsYXkuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3NvY2tldC5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvdXRpbHMvY3JlYXRlU29ja2V0VVJMLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9nZXRDdXJyZW50U2NyaXB0U291cmNlLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9sb2cuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3BhcnNlVVJMLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudC91dGlscy9yZWxvYWRBcHAuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50L3V0aWxzL3NlbmRNZXNzYWdlLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvZGV2LXNlcnZlci5qcyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvLy4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by8uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2ctYXBwbHktcmVzdWx0LmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3QvbG9nLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCB1cGRhdGUgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by93ZWJwYWNrL3J1bnRpbWUvZ2V0IHVwZGF0ZSBtYW5pZmVzdCBmaWxlbmFtZSIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvL3dlYnBhY2svcnVudGltZS9ob3QgbW9kdWxlIHJlcGxhY2VtZW50Iiwid2VicGFjazovL2phdmFzY3JpcHQtbG90dG8vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWxvdHRvL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1sb3R0by93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gYW5zaUhUTUxcblxuLy8gUmVmZXJlbmNlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvYW5zaS1yZWdleFxudmFyIF9yZWdBTlNJID0gLyg/Oig/OlxcdTAwMWJcXFspfFxcdTAwOWIpKD86KD86WzAtOV17MSwzfSk/KD86KD86O1swLTldezAsM30pKik/W0EtTXxmLW1dKXxcXHUwMDFiW0EtTV0vXG5cbnZhciBfZGVmQ29sb3JzID0ge1xuICByZXNldDogWydmZmYnLCAnMDAwJ10sIC8vIFtGT1JFR1JPVURfQ09MT1IsIEJBQ0tHUk9VTkRfQ09MT1JdXG4gIGJsYWNrOiAnMDAwJyxcbiAgcmVkOiAnZmYwMDAwJyxcbiAgZ3JlZW46ICcyMDk4MDUnLFxuICB5ZWxsb3c6ICdlOGJmMDMnLFxuICBibHVlOiAnMDAwMGZmJyxcbiAgbWFnZW50YTogJ2ZmMDBmZicsXG4gIGN5YW46ICcwMGZmZWUnLFxuICBsaWdodGdyZXk6ICdmMGYwZjAnLFxuICBkYXJrZ3JleTogJzg4OCdcbn1cbnZhciBfc3R5bGVzID0ge1xuICAzMDogJ2JsYWNrJyxcbiAgMzE6ICdyZWQnLFxuICAzMjogJ2dyZWVuJyxcbiAgMzM6ICd5ZWxsb3cnLFxuICAzNDogJ2JsdWUnLFxuICAzNTogJ21hZ2VudGEnLFxuICAzNjogJ2N5YW4nLFxuICAzNzogJ2xpZ2h0Z3JleSdcbn1cbnZhciBfb3BlblRhZ3MgPSB7XG4gICcxJzogJ2ZvbnQtd2VpZ2h0OmJvbGQnLCAvLyBib2xkXG4gICcyJzogJ29wYWNpdHk6MC41JywgLy8gZGltXG4gICczJzogJzxpPicsIC8vIGl0YWxpY1xuICAnNCc6ICc8dT4nLCAvLyB1bmRlcnNjb3JlXG4gICc4JzogJ2Rpc3BsYXk6bm9uZScsIC8vIGhpZGRlblxuICAnOSc6ICc8ZGVsPicgLy8gZGVsZXRlXG59XG52YXIgX2Nsb3NlVGFncyA9IHtcbiAgJzIzJzogJzwvaT4nLCAvLyByZXNldCBpdGFsaWNcbiAgJzI0JzogJzwvdT4nLCAvLyByZXNldCB1bmRlcnNjb3JlXG4gICcyOSc6ICc8L2RlbD4nIC8vIHJlc2V0IGRlbGV0ZVxufVxuXG47WzAsIDIxLCAyMiwgMjcsIDI4LCAzOSwgNDldLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgX2Nsb3NlVGFnc1tuXSA9ICc8L3NwYW4+J1xufSlcblxuLyoqXG4gKiBDb252ZXJ0cyB0ZXh0IHdpdGggQU5TSSBjb2xvciBjb2RlcyB0byBIVE1MIG1hcmt1cC5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gYW5zaUhUTUwgKHRleHQpIHtcbiAgLy8gUmV0dXJucyB0aGUgdGV4dCBpZiB0aGUgc3RyaW5nIGhhcyBubyBBTlNJIGVzY2FwZSBjb2RlLlxuICBpZiAoIV9yZWdBTlNJLnRlc3QodGV4dCkpIHtcbiAgICByZXR1cm4gdGV4dFxuICB9XG5cbiAgLy8gQ2FjaGUgb3BlbmVkIHNlcXVlbmNlLlxuICB2YXIgYW5zaUNvZGVzID0gW11cbiAgLy8gUmVwbGFjZSB3aXRoIG1hcmt1cC5cbiAgdmFyIHJldCA9IHRleHQucmVwbGFjZSgvXFwwMzNcXFsoXFxkKyltL2csIGZ1bmN0aW9uIChtYXRjaCwgc2VxKSB7XG4gICAgdmFyIG90ID0gX29wZW5UYWdzW3NlcV1cbiAgICBpZiAob3QpIHtcbiAgICAgIC8vIElmIGN1cnJlbnQgc2VxdWVuY2UgaGFzIGJlZW4gb3BlbmVkLCBjbG9zZSBpdC5cbiAgICAgIGlmICghIX5hbnNpQ29kZXMuaW5kZXhPZihzZXEpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXh0cmEtYm9vbGVhbi1jYXN0XG4gICAgICAgIGFuc2lDb2Rlcy5wb3AoKVxuICAgICAgICByZXR1cm4gJzwvc3Bhbj4nXG4gICAgICB9XG4gICAgICAvLyBPcGVuIHRhZy5cbiAgICAgIGFuc2lDb2Rlcy5wdXNoKHNlcSlcbiAgICAgIHJldHVybiBvdFswXSA9PT0gJzwnID8gb3QgOiAnPHNwYW4gc3R5bGU9XCInICsgb3QgKyAnO1wiPidcbiAgICB9XG5cbiAgICB2YXIgY3QgPSBfY2xvc2VUYWdzW3NlcV1cbiAgICBpZiAoY3QpIHtcbiAgICAgIC8vIFBvcCBzZXF1ZW5jZVxuICAgICAgYW5zaUNvZGVzLnBvcCgpXG4gICAgICByZXR1cm4gY3RcbiAgICB9XG4gICAgcmV0dXJuICcnXG4gIH0pXG5cbiAgLy8gTWFrZSBzdXJlIHRhZ3MgYXJlIGNsb3NlZC5cbiAgdmFyIGwgPSBhbnNpQ29kZXMubGVuZ3RoXG4gIDsobCA+IDApICYmIChyZXQgKz0gQXJyYXkobCArIDEpLmpvaW4oJzwvc3Bhbj4nKSlcblxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogQ3VzdG9taXplIGNvbG9ycy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb2xvcnMgcmVmZXJlbmNlIHRvIF9kZWZDb2xvcnNcbiAqL1xuYW5zaUhUTUwuc2V0Q29sb3JzID0gZnVuY3Rpb24gKGNvbG9ycykge1xuICBpZiAodHlwZW9mIGNvbG9ycyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bjb2xvcnNgIHBhcmFtZXRlciBtdXN0IGJlIGFuIE9iamVjdC4nKVxuICB9XG5cbiAgdmFyIF9maW5hbENvbG9ycyA9IHt9XG4gIGZvciAodmFyIGtleSBpbiBfZGVmQ29sb3JzKSB7XG4gICAgdmFyIGhleCA9IGNvbG9ycy5oYXNPd25Qcm9wZXJ0eShrZXkpID8gY29sb3JzW2tleV0gOiBudWxsXG4gICAgaWYgKCFoZXgpIHtcbiAgICAgIF9maW5hbENvbG9yc1trZXldID0gX2RlZkNvbG9yc1trZXldXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZiAoJ3Jlc2V0JyA9PT0ga2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGhleCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaGV4ID0gW2hleF1cbiAgICAgIH1cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShoZXgpIHx8IGhleC5sZW5ndGggPT09IDAgfHwgaGV4LnNvbWUoZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBoICE9PSAnc3RyaW5nJ1xuICAgICAgfSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGFuIEFycmF5IGFuZCBlYWNoIGl0ZW0gY291bGQgb25seSBiZSBhIGhleCBzdHJpbmcsIGUuZy46IEZGMDAwMCcpXG4gICAgICB9XG4gICAgICB2YXIgZGVmSGV4Q29sb3IgPSBfZGVmQ29sb3JzW2tleV1cbiAgICAgIGlmICghaGV4WzBdKSB7XG4gICAgICAgIGhleFswXSA9IGRlZkhleENvbG9yWzBdXG4gICAgICB9XG4gICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gMSB8fCAhaGV4WzFdKSB7XG4gICAgICAgIGhleCA9IFtoZXhbMF1dXG4gICAgICAgIGhleC5wdXNoKGRlZkhleENvbG9yWzFdKVxuICAgICAgfVxuXG4gICAgICBoZXggPSBoZXguc2xpY2UoMCwgMilcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYSBoZXggc3RyaW5nLCBlLmcuOiBGRjAwMDAnKVxuICAgIH1cbiAgICBfZmluYWxDb2xvcnNba2V5XSA9IGhleFxuICB9XG4gIF9zZXRUYWdzKF9maW5hbENvbG9ycylcbn1cblxuLyoqXG4gKiBSZXNldCBjb2xvcnMuXG4gKi9cbmFuc2lIVE1MLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICBfc2V0VGFncyhfZGVmQ29sb3JzKVxufVxuXG4vKipcbiAqIEV4cG9zZSB0YWdzLCBpbmNsdWRpbmcgb3BlbiBhbmQgY2xvc2UuXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5hbnNpSFRNTC50YWdzID0ge31cblxuaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ29wZW4nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfb3BlblRhZ3MgfVxuICB9KVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYW5zaUhUTUwudGFncywgJ2Nsb3NlJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2Nsb3NlVGFncyB9XG4gIH0pXG59IGVsc2Uge1xuICBhbnNpSFRNTC50YWdzLm9wZW4gPSBfb3BlblRhZ3NcbiAgYW5zaUhUTUwudGFncy5jbG9zZSA9IF9jbG9zZVRhZ3Ncbn1cblxuZnVuY3Rpb24gX3NldFRhZ3MgKGNvbG9ycykge1xuICAvLyByZXNldCBhbGxcbiAgX29wZW5UYWdzWycwJ10gPSAnZm9udC13ZWlnaHQ6bm9ybWFsO29wYWNpdHk6MTtjb2xvcjojJyArIGNvbG9ycy5yZXNldFswXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFsxXVxuICAvLyBpbnZlcnNlXG4gIF9vcGVuVGFnc1snNyddID0gJ2NvbG9yOiMnICsgY29sb3JzLnJlc2V0WzFdICsgJztiYWNrZ3JvdW5kOiMnICsgY29sb3JzLnJlc2V0WzBdXG4gIC8vIGRhcmsgZ3JleVxuICBfb3BlblRhZ3NbJzkwJ10gPSAnY29sb3I6IycgKyBjb2xvcnMuZGFya2dyZXlcblxuICBmb3IgKHZhciBjb2RlIGluIF9zdHlsZXMpIHtcbiAgICB2YXIgY29sb3IgPSBfc3R5bGVzW2NvZGVdXG4gICAgdmFyIG9yaUNvbG9yID0gY29sb3JzW2NvbG9yXSB8fCAnMDAwJ1xuICAgIF9vcGVuVGFnc1tjb2RlXSA9ICdjb2xvcjojJyArIG9yaUNvbG9yXG4gICAgY29kZSA9IHBhcnNlSW50KGNvZGUpXG4gICAgX29wZW5UYWdzWyhjb2RlICsgMTApLnRvU3RyaW5nKCldID0gJ2JhY2tncm91bmQ6IycgKyBvcmlDb2xvclxuICB9XG59XG5cbmFuc2lIVE1MLnJlc2V0KClcbiIsImV4cG9ydCBjb25zdCBOVU1CRVJfREVMSU1JVEVSID0gJywnO1xyXG4iLCJleHBvcnQgKiBmcm9tICcuL2RlbGltaXRlcnMnO1xyXG5leHBvcnQgKiBmcm9tICcuL21lc3NhZ2VzJztcclxuZXhwb3J0ICogZnJvbSAnLi9ydWxlcyc7XHJcbiIsImltcG9ydCB7IE5VTUJFUl9ERUxJTUlURVIgfSBmcm9tICcuL2RlbGltaXRlcnMnO1xyXG5pbXBvcnQgeyBMT1RUT19SVUxFLCBSRVNUQVJUX0tFWSB9IGZyb20gJy4vcnVsZXMnO1xyXG5cclxuY29uc3QgSU5QVVRfUVVFUllfUFJFRklYID0gJz4gJztcclxuXHJcbmV4cG9ydCBjb25zdCBJTlBVVF9NRVNTQUdFUyA9IE9iamVjdC5mcmVlemUoe1xyXG4gIHBheW1lbnRBbW91bnQ6IGBcXG4ke0lOUFVUX1FVRVJZX1BSRUZJWH3qtazsnoXquIjslaHsnYQg7J6F66Cl7ZW0IOyjvOyEuOyalC5cXG5gLFxyXG4gIHdpbm5pbmdMb3R0b051bWJlcnM6IGBcXG4ke0lOUFVUX1FVRVJZX1BSRUZJWH3ri7nssqgg67KI7Zi466W8IOyeheugpe2VtCDso7zshLjsmpQuXFxuYCxcclxuICBib251c051bWJlcjogYFxcbiR7SU5QVVRfUVVFUllfUFJFRklYfeuztOuEiOyKpCDrsojtmLjrpbwg7J6F66Cl7ZW0IOyjvOyEuOyalC5cXG5gLFxyXG4gIHJlc3RhcnQ6IGBcXG4ke0lOUFVUX1FVRVJZX1BSRUZJWH3ri6Tsi5wg7Iuc7J6R7ZWY7Iuc6rKg7Iq164uI6rmMPyAoJHtSRVNUQVJUX0tFWS5yZXN0YXJ0fS8ke1JFU1RBUlRfS0VZLmVuZH0pXFxuYCxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgT1VUUFVUX01FU1NBR0VTID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgcHVyY2hhc2VkTG90dG9UaWNrZXRzOiAnXFxuPOq1rOunpCDrgrTsl60+XFxuJyxcclxuICBsb3R0b1RpY2tldHM6ICdcXG4864u57LKoIO2GteqzhD4nLFxyXG4gIGRpdmlkZXI6ICctLS0tLS0tLS0tLS0tLS0tLS0tLScsXHJcbiAgbW9uZXlVbml0OiAn7JuQJyxcclxuICBjb3VudFVuaXQ6ICfqsJwnLFxyXG4gIHByb2ZpdFVuaXQ6ICclJyxcclxuICByZXN0YXJ0R2FtZTogJ1xcbi0tLeqyjOyehCDsnqzsi5zsnpEhIPCfmJrwn46uLS0tXFxuJyxcclxuICBlbmRHYW1lOiAnXFxuLS0t6rKM7J6EIOyiheujjCDwn6SXLS0tJyxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgRVJST1JfUFJFRklYID0gJ1tFUlJPUl0nO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SX01FU1NBR0VTID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgaXNVbmRlZmluZWRJbnB1dFZhbHVlOiBgJHtFUlJPUl9QUkVGSVh9IOyeheugpeqwkuydtCDsl4bsirXri4jri6QuYCxcclxuICBpblZhbGlkV0lubmluZ051bWJlcnNGb3JtOiBgJHtFUlJPUl9QUkVGSVh9IOuLueyyqCDrsojtmLjripQg7Im87ZGcKFwiJHtOVU1CRVJfREVMSU1JVEVSfVwiKeuhnCDqtazrtoTtlZjsl6wg7J6F66Cl7ZW0IOyjvOyEuOyalC5cXG5gLFxyXG4gIGFscmVhZHlJbkxvdHRvTnVtYmVyOiBgJHtFUlJPUl9QUkVGSVh9IOuztOuEiOyKpCDrsojtmLjripQg64u57LKoIOuyiO2YuOyXkCDsl4bripQg67KI7Zi47Jes7JW8IO2VqeuLiOuLpC5cXG5gLFxyXG4gIG5vdEludGVnZXI6IGAke0VSUk9SX1BSRUZJWH0g7KCV7IiY6rCAIOyVhOuLmeuLiOuLpC5cXG5gLFxyXG4gIGluRGl2aXNpYmxlQnlQcmljZTogYCR7RVJST1JfUFJFRklYfSDqtazrp6Qg6riI7JWh7J20ICR7TE9UVE9fUlVMRS5wcmljZS50b0xvY2FsZVN0cmluZygna28tS1InKX0ke09VVFBVVF9NRVNTQUdFUy5tb25leVVuaXR9IOuLqOychOqwgCDslYTri5nri4jri6QuXFxuYCxcclxuICBpblZhbGlkTnVtYmVyc09mVGlja2V0czogYCR7RVJST1JfUFJFRklYfSDroZzrmJAg7Yuw7LyT7J2AICR7TE9UVE9fUlVMRS5udW1iZXJzT2ZUaWNrZXRzLm1pbn3snqUg7J207IOBICR7TE9UVE9fUlVMRS5udW1iZXJzT2ZUaWNrZXRzLm1heH3snbTtlZjroZwg6rWs66ek7ZWY7IukIOyImCDsnojsirXri4jri6QuXFxuYCxcclxuICBpbnZhbGlkTG90dG9OdW1iZXJDb3VudDogYCR7RVJST1JfUFJFRklYfSDroZzrmJAg67KI7Zi4IOqwnOyImOuKlCAke0xPVFRPX1JVTEUubGVuZ3RofeqwnCDsl6zslbwg7ZWp64uI64ukLlxcbmAsXHJcbiAgZHVwbGljYXRlZExvdHRvTnVtYmVyOiBgJHtFUlJPUl9QUkVGSVh9IOuhnOuYkCDrsojtmLjripQg7KSR67O165CgIOyImCDsl4bsirXri4jri6QuXFxuYCxcclxuICBpbnZhbGlkTG90dG9OdW1iZXJSYW5nZTogYCR7RVJST1JfUFJFRklYfSDrsojtmLjripQgJHtMT1RUT19SVUxFLnJhbmdlLnN0YXJ0fSDsnbTsg4EgJHtMT1RUT19SVUxFLnJhbmdlLmVuZH0g7J207ZWY7J2YIOyIq+yekOuhnCDsnbTro6jslrTsoLjslbztlanri4jri6QuXFxuYCxcclxuICBpbnZhbGlkUmVzdGFydElucHV0Rm9ybTogYCR7RVJST1JfUFJFRklYfSAke1JFU1RBUlRfS0VZLnJlc3RhcnR9IOuYkOuKlCAke1JFU1RBUlRfS0VZLmVuZH3roZwg7J6F66Cl7ZW0IOyjvOyEuOyalC5cXG5gLFxyXG59KTtcclxuIiwiZXhwb3J0IGNvbnN0IFJBTkRPTV9OVU1CRVJfUlVMRSA9IE9iamVjdC5mcmVlemUoe1xyXG4gIHJhbmdlOiBPYmplY3QuZnJlZXplKHtcclxuICAgIHN0YXJ0OiAxLFxyXG4gICAgZW5kOiA0NSxcclxuICB9KSxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgTE9UVE9fUlVMRSA9IE9iamVjdC5mcmVlemUoe1xyXG4gIHJhbmdlOiBSQU5ET01fTlVNQkVSX1JVTEUucmFuZ2UsXHJcbiAgbGVuZ3RoOiA2LFxyXG4gIHByaWNlOiAxXzAwMCxcclxuICBudW1iZXJzT2ZUaWNrZXRzOiBPYmplY3QuZnJlZXplKHtcclxuICAgIG1pbjogMSxcclxuICAgIG1heDogNTAsXHJcbiAgfSksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJBTktfSEFTX0JPTlVTID0gMjtcclxuXHJcbmV4cG9ydCBjb25zdCBXSU5OSU5HX1JVTEUgPSBPYmplY3QuZnJlZXplKFxyXG4gIG5ldyBNYXAoW1xyXG4gICAgWzUsIHsgbWF0Y2hlZENvdW50OiAzLCBpc0JvbnVzOiBmYWxzZSwgbW9uZXk6IDVfMDAwIH1dLFxyXG4gICAgWzQsIHsgbWF0Y2hlZENvdW50OiA0LCBpc0JvbnVzOiBmYWxzZSwgbW9uZXk6IDUwXzAwMCB9XSxcclxuICAgIFszLCB7IG1hdGNoZWRDb3VudDogNSwgaXNCb251czogZmFsc2UsIG1vbmV5OiAxXzUwMF8wMDAgfV0sXHJcbiAgICBbUkFOS19IQVNfQk9OVVMsIHsgbWF0Y2hlZENvdW50OiA1LCBpc0JvbnVzOiB0cnVlLCBtb25leTogMzBfMDAwXzAwMCB9XSxcclxuICAgIFsxLCB7IG1hdGNoZWRDb3VudDogNiwgaXNCb251czogZmFsc2UsIG1vbmV5OiAyXzAwMF8wMDBfMDAwIH1dLFxyXG4gIF0pLFxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJFU1RBUlRfS0VZID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgcmVzdGFydDogJ3knLFxyXG4gIGVuZDogJ24nLFxyXG59KTtcclxuIiwiaW1wb3J0IHsgRVJST1JfTUVTU0FHRVMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQge1xyXG4gIGNoZWNrRGVmaW5lZElucHV0VmFsdWUsXHJcbiAgaXNCb251c051bWJlclVuaXF1ZSxcclxufSBmcm9tICcuLi91dGlscy92YWxpZGF0b3JzVXRpbHMnO1xyXG5pbXBvcnQgTG90dG9OdW1iZXIgZnJvbSAnLi9Mb3R0b051bWJlcic7XHJcblxyXG5jbGFzcyBCb251cyB7XHJcbiAgI251bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGJvbnVzTnVtYmVySW5wdXRcclxuICAgKiBAcGFyYW0ge251bWJlcltdfSB3aW5uaW5nTG90dG9OdW1iZXJzXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoYm9udXNOdW1iZXJJbnB1dCwgd2lubmluZ0xvdHRvTnVtYmVycykge1xyXG4gICAgdGhpcy4jdmFsaWRhdGVCb251c051bWJlcihib251c051bWJlcklucHV0LCB3aW5uaW5nTG90dG9OdW1iZXJzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBib251c051bWJlcklucHV0XHJcbiAgICogQHBhcmFtIHtudW1iZXJbXX0gV2lubmluZ0xvdHRvTnVtYmVyc1xyXG4gICAqL1xyXG4gICN2YWxpZGF0ZUJvbnVzTnVtYmVyKGJvbnVzTnVtYmVySW5wdXQsIHdpbm5pbmdMb3R0b051bWJlcnMpIHtcclxuICAgIGNoZWNrRGVmaW5lZElucHV0VmFsdWUoYm9udXNOdW1iZXJJbnB1dCk7XHJcblxyXG4gICAgY29uc3QgeyBudW1iZXIgfSA9IG5ldyBMb3R0b051bWJlcihOdW1iZXIoYm9udXNOdW1iZXJJbnB1dCkpO1xyXG5cclxuICAgIGlmICghaXNCb251c051bWJlclVuaXF1ZSh3aW5uaW5nTG90dG9OdW1iZXJzLCBudW1iZXIpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5hbHJlYWR5SW5Mb3R0b051bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy4jbnVtYmVyID0gbmV3IExvdHRvTnVtYmVyKG51bWJlcikubnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcltdfSBsb3R0b051bWJlcnNcclxuICAgKi9cclxuICBpc01hdGNoaW5nTnVtYmVyKGxvdHRvTnVtYmVycykge1xyXG4gICAgcmV0dXJuIGxvdHRvTnVtYmVycy5pbmNsdWRlcyh0aGlzLiNudW1iZXIpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQm9udXM7XHJcbiIsImltcG9ydCB7IEVSUk9SX01FU1NBR0VTIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHtcclxuICBpc05vdER1cGxpY2F0ZWRMb3R0b051bWJlcixcclxuICBpc1ZhbGlkTG90dG9OdW1iZXJDb3VudCxcclxufSBmcm9tICcuLi91dGlscy92YWxpZGF0b3JzVXRpbHMnO1xyXG5pbXBvcnQgTG90dG9OdW1iZXIgZnJvbSAnLi9Mb3R0b051bWJlcic7XHJcblxyXG5jbGFzcyBMb3R0byB7XHJcbiAgI251bWJlcnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyW119IG51bWJlcnNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihudW1iZXJzKSB7XHJcbiAgICB0aGlzLiN2YWxpZGF0ZUxvdHRvTnVtYmVycyhudW1iZXJzKTtcclxuICB9XHJcblxyXG4gIGdldCBudW1iZXJzKCkge1xyXG4gICAgcmV0dXJuIFsuLi50aGlzLiNudW1iZXJzXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyW119IG51bWJlcnNcclxuICAgKi9cclxuICAjdmFsaWRhdGVMb3R0b051bWJlcnMobnVtYmVycykge1xyXG4gICAgY29uc3QgbG90dG9OdW1iZXJzID0gbnVtYmVycy5tYXAoXHJcbiAgICAgIChudW1iZXIpID0+IG5ldyBMb3R0b051bWJlcihudW1iZXIpLm51bWJlcixcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFpc1ZhbGlkTG90dG9OdW1iZXJDb3VudChsb3R0b051bWJlcnMpKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuaW52YWxpZExvdHRvTnVtYmVyQ291bnQpO1xyXG5cclxuICAgIGlmICghaXNOb3REdXBsaWNhdGVkTG90dG9OdW1iZXIobG90dG9OdW1iZXJzKSlcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmR1cGxpY2F0ZWRMb3R0b051bWJlcik7XHJcblxyXG4gICAgdGhpcy4jbnVtYmVycyA9IGxvdHRvTnVtYmVycztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvdHRvO1xyXG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUywgTE9UVE9fUlVMRSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCBSYW5kb21OdW1iZXIgZnJvbSAnLi4vdXRpbHMvUmFuZG9tTnVtYmVyJztcclxuaW1wb3J0IHtcclxuICBjaGVja0RlZmluZWRJbnB1dFZhbHVlLFxyXG4gIGlzRGl2aXNpYmxlQnlQcmljZSxcclxuICBpc0ludGVnZXIsXHJcbiAgaXNWYWxpZE51bWJlcnNPZlRpY2tldHMsXHJcbn0gZnJvbSAnLi4vdXRpbHMvdmFsaWRhdG9yc1V0aWxzJztcclxuXHJcbmNsYXNzIExvdHRvTWFjaGluZSB7XHJcbiAgLyoqXHJcbiAgICog67Cc7ZaJ65CY64qUIOuhnOuYkCDrsojtmLjsnZgg7J207KSR67Cw7Je0XHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJbXVtdfFtdfVxyXG4gICAqL1xyXG4gICNsb3R0b1RpY2tldHMgPSBbXTtcclxuXHJcbiAgI3BheW1lbnRBbW91bnQgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF5bWVudEFtb3VudFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHBheW1lbnRBbW91bnRJbnB1dCkge1xyXG4gICAgdGhpcy4jdmFsaWRhdGVQYXltZW50QW1vdW50KHBheW1lbnRBbW91bnRJbnB1dCk7XHJcbiAgICB0aGlzLiNpc3N1ZUxvdHRvVGlja2V0cygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxvdHRvVGlja2V0cygpIHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuI2xvdHRvVGlja2V0cykpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBheW1lbnRBbW91bnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jcGF5bWVudEFtb3VudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXltZW50QW1vdW50XHJcbiAgICovXHJcbiAgI3ZhbGlkYXRlUGF5bWVudEFtb3VudChwYXltZW50QW1vdW50SW5wdXQpIHtcclxuICAgIGNoZWNrRGVmaW5lZElucHV0VmFsdWUocGF5bWVudEFtb3VudElucHV0KTtcclxuXHJcbiAgICBjb25zdCBudW1iZXIgPSBOdW1iZXIocGF5bWVudEFtb3VudElucHV0KTtcclxuXHJcbiAgICBpZiAoIWlzSW50ZWdlcihudW1iZXIpKSB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMubm90SW50ZWdlcik7XHJcblxyXG4gICAgaWYgKCFpc1ZhbGlkTnVtYmVyc09mVGlja2V0cyhudW1iZXIpKVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1JfTUVTU0FHRVMuaW5WYWxpZE51bWJlcnNPZlRpY2tldHMpO1xyXG5cclxuICAgIGlmICghaXNEaXZpc2libGVCeVByaWNlKG51bWJlcikpXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5pbkRpdmlzaWJsZUJ5UHJpY2UpO1xyXG5cclxuICAgIHRoaXMuI3BheW1lbnRBbW91bnQgPSBudW1iZXI7XHJcbiAgfVxyXG5cclxuICAjaXNzdWVMb3R0b1RpY2tldHMoKSB7XHJcbiAgICBjb25zdCB7IHJhbmdlLCBwcmljZSB9ID0gTE9UVE9fUlVMRTtcclxuICAgIGNvbnN0IG51bWJlcnNPZlRpY2tldHMgPSB0aGlzLiNwYXltZW50QW1vdW50IC8gcHJpY2U7XHJcblxyXG4gICAgdGhpcy4jbG90dG9UaWNrZXRzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogbnVtYmVyc09mVGlja2V0cyB9LCAoKSA9PlxyXG4gICAgICBSYW5kb21OdW1iZXIucGlja1VuaXF1ZU51bWJlcnNJblJhbmdlKHJhbmdlLCBMT1RUT19SVUxFLmxlbmd0aCksXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG90dG9NYWNoaW5lO1xyXG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGlzSW50ZWdlciwgaXNMb3R0b051bWJlckluUmFuZ2UgfSBmcm9tICcuLi91dGlscy92YWxpZGF0b3JzVXRpbHMnO1xyXG5cclxuY2xhc3MgTG90dG9OdW1iZXIge1xyXG4gICNudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihudW1iZXIpIHtcclxuICAgIHRoaXMuI3ZhbGlkYXRlTG90dG9OdW1iZXIobnVtYmVyKTtcclxuICB9XHJcblxyXG4gIGdldCBudW1iZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlclxyXG4gICAqL1xyXG4gICN2YWxpZGF0ZUxvdHRvTnVtYmVyKG51bWJlcikge1xyXG4gICAgaWYgKCFpc0ludGVnZXIobnVtYmVyKSkgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLm5vdEludGVnZXIpO1xyXG5cclxuICAgIGlmICghaXNMb3R0b051bWJlckluUmFuZ2UobnVtYmVyKSlcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmludmFsaWRMb3R0b051bWJlclJhbmdlKTtcclxuXHJcbiAgICB0aGlzLiNudW1iZXIgPSBudW1iZXI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb3R0b051bWJlcjtcclxuIiwiaW1wb3J0IEJvbnVzIGZyb20gJy4vQm9udXMnO1xyXG5pbXBvcnQgTG90dG9NYWNoaW5lIGZyb20gJy4vTG90dG9NYWNoaW5lJztcclxuaW1wb3J0IFdpbm5pbmdMb3R0byBmcm9tICcuL1dpbm5pbmdMb3R0byc7XHJcblxyXG5jbGFzcyBMb3R0b1Jlc3VsdHNIZWxwZXIge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbXtMb3R0b01hY2hpbmV9IGxvdHRvTWFjaGluZVxyXG4gICAqL1xyXG4gICNsb3R0b01hY2hpbmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7e1xyXG4gICAqIHdpbm5pbmdMb3R0bzpXaW5uaW5nTG90dG98dW5kZWZpbmVkLFxyXG4gICAqIGJvbnVzOkJvbnVzfHVuZGVmaW5lZFxyXG4gICAqIH19IHdpbm5pbmdEYXRhXHJcbiAgICovXHJcbiAgI3dpbm5pbmdEYXRhID0ge1xyXG4gICAgd2lubmluZ0xvdHRvOiB1bmRlZmluZWQsXHJcbiAgICBib251czogdW5kZWZpbmVkLFxyXG4gICAgcmVzdWx0czogdW5kZWZpbmVkLFxyXG4gIH07XHJcblxyXG4gIGdldCBwYXltZW50QW1vdW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI2xvdHRvTWFjaGluZS5wYXltZW50QW1vdW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxvdHRvVGlja2V0cygpIHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuI2xvdHRvTWFjaGluZS5sb3R0b1RpY2tldHMpKTtcclxuICB9XHJcblxyXG4gIGdldCByZXN1bHRzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI3dpbm5pbmdEYXRhLnJlc3VsdHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ3x1bmRlZmluZWR9IHBheW1lbnRBbW91bnRJbnB1dFxyXG4gICAqL1xyXG4gIGdlbmVyYXRlTG90dG9NYWNoaW5lKHBheW1lbnRBbW91bnRJbnB1dCkge1xyXG4gICAgdGhpcy4jbG90dG9NYWNoaW5lID0gbmV3IExvdHRvTWFjaGluZShwYXltZW50QW1vdW50SW5wdXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxvdHRvTnVtYmVyc0lucHV0XHJcbiAgICovXHJcbiAgZ2VuZXJhdGVXaW5uaW5nTG90dG8obG90dG9OdW1iZXJzSW5wdXQpIHtcclxuICAgIHRoaXMuI3dpbm5pbmdEYXRhLndpbm5pbmdMb3R0byA9IG5ldyBXaW5uaW5nTG90dG8obG90dG9OdW1iZXJzSW5wdXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGJvbnVzTnVtYmVySW5wdXRcclxuICAgKi9cclxuICBnZW5lcmF0ZUJvbnVzKGJvbnVzTnVtYmVySW5wdXQpIHtcclxuICAgIHRoaXMuI3dpbm5pbmdEYXRhLmJvbnVzID0gbmV3IEJvbnVzKFxyXG4gICAgICBib251c051bWJlcklucHV0LFxyXG4gICAgICB0aGlzLiN3aW5uaW5nRGF0YS53aW5uaW5nTG90dG8ubG90dG9OdW1iZXJzLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7e2lzQm9udXM6Ym9vbGVhbiwgbWF0Y2hlZENvdW50Om51bWJlcn1bXX0gcmVzdWx0XHJcbiAgICovXHJcbiAgY2FsY3VsYXRlTWF0Y2hpbmdSZXN1bHRzKCkge1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IHRoaXMuI2xvdHRvTWFjaGluZS5sb3R0b1RpY2tldHMubWFwKChsb3R0b1RpY2tldCkgPT5cclxuICAgICAgdGhpcy4jd2lubmluZ0RhdGEud2lubmluZ0xvdHRvLmNvbXBhcmVMb3R0byhcclxuICAgICAgICBsb3R0b1RpY2tldCxcclxuICAgICAgICB0aGlzLiN3aW5uaW5nRGF0YS5ib251cyxcclxuICAgICAgKSxcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy4jd2lubmluZ0RhdGEucmVzdWx0cyA9IHJlc3VsdHM7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb3R0b1Jlc3VsdHNIZWxwZXI7XHJcbiIsImltcG9ydCB7IFJBTktfSEFTX0JPTlVTLCBXSU5OSU5HX1JVTEUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5cclxuY2xhc3MgU3RhdGlzdGljcyB7XHJcbiAgI3JhbmtzID0gW107XHJcblxyXG4gICNyZXdhcmQgPSB7XHJcbiAgICB0b3RhbFByaXplczogMCxcclxuICAgIHByb2ZpdFJhdGU6IDAsXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHt7aXNCb251czogYm9vbGVhbixtYXRjaGVkQ291bnQ6IG51bWJlcn1bXX0gbWF0Y2hpbmdSZXN1bHRzXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBheW1lbnRBbW91bnRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihtYXRjaGluZ1Jlc3VsdHMsIHBheW1lbnRBbW91bnQpIHtcclxuICAgIHRoaXMuI21hdGNoUmVzdWx0c1RvUmFuayhtYXRjaGluZ1Jlc3VsdHMpO1xyXG4gICAgdGhpcy4jY2FsY3VsYXRlUHJvZml0UmF0ZShwYXltZW50QW1vdW50KTtcclxuICB9XHJcblxyXG4gIGdldCBsb3R0b0FuYWx5dGljcygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHByb2ZpdFJhdGU6IHRoaXMuI3Jld2FyZC5wcm9maXRSYXRlLFxyXG4gICAgICBzdGF0aXN0aWNzUmVzdWx0OiB0aGlzLiNnZXRTdGF0aXN0aWNzUmVzdWx0KCksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyAge3tsOjAsIDI6MCwzOjAsNDowLDU6MH19XHJcbiAgICovXHJcbiAgI21ha2VJbml0aWFsU3RhdGlzdGljc1Jlc3VsdCgpIHtcclxuICAgIGNvbnN0IGluaXRpYWxTdGF0aXN0aWNzUmVzdWx0ID0ge307XHJcblxyXG4gICAgV0lOTklOR19SVUxFLmZvckVhY2goKF8sIGtleSkgPT4ge1xyXG4gICAgICBpbml0aWFsU3RhdGlzdGljc1Jlc3VsdFtrZXldID0gMDtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBpbml0aWFsU3RhdGlzdGljc1Jlc3VsdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEByZXR1cm5zIHt7MTpudW1iZXIsIDI6bnVtYmVyICwzOm51bWJlciwgNDpudW1iZXIsIDU6bnVtYmVyfX1cclxuICAgKi9cclxuICAjZ2V0U3RhdGlzdGljc1Jlc3VsdCgpIHtcclxuICAgIHJldHVybiB0aGlzLiNyYW5rcy5yZWR1Y2UoKGFjYywgcmFuaykgPT4ge1xyXG4gICAgICBhY2NbcmFua10gKz0gMTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHRoaXMuI21ha2VJbml0aWFsU3RhdGlzdGljc1Jlc3VsdCgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHt7aXNCb251czpib29sZWFuLCBtYXRjaGVkQ291bnQ6bnVtYmVyfVtdfSByZXN1bHRcclxuICAgKi9cclxuICAjbWF0Y2hSZXN1bHRzVG9SYW5rKHJlc3VsdHMpIHtcclxuICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0KSA9PiB0aGlzLiNtYXRjaFJlc3VsdFRvUmFuayhyZXN1bHQpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHt7aXNCb251czpib29sZWFuLCBtYXRjaGVkQ291bnQ6bnVtYmVyfX0gcmVzdWx0XHJcbiAgICovXHJcbiAgI21hdGNoUmVzdWx0VG9SYW5rKHJlc3VsdCkge1xyXG4gICAgV0lOTklOR19SVUxFLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgY29uc3QgeyBtYXRjaGVkQ291bnQsIGlzQm9udXMgfSA9IHZhbHVlO1xyXG5cclxuICAgICAgY29uc3QgaXNCb251c01hdGNoUmVxdWlyZWQgPVxyXG4gICAgICAgIG1hdGNoZWRDb3VudCA9PT0gV0lOTklOR19SVUxFLmdldChSQU5LX0hBU19CT05VUykubWF0Y2hlZENvdW50O1xyXG4gICAgICBjb25zdCBpc01hdGNoaW5nQ291bnQgPSBtYXRjaGVkQ291bnQgPT09IHJlc3VsdC5tYXRjaGVkQ291bnQ7XHJcbiAgICAgIGNvbnN0IGlzTWF0Y2hpbmdPbmx5Q291bnQgPSAhaXNCb251c01hdGNoUmVxdWlyZWQgJiYgaXNNYXRjaGluZ0NvdW50O1xyXG4gICAgICBjb25zdCBpc01hdGNoaW5nQm9udXNBbmRDb3VudCA9XHJcbiAgICAgICAgaXNCb251c01hdGNoUmVxdWlyZWQgJiYgaXNCb251cyA9PT0gcmVzdWx0LmlzQm9udXM7XHJcblxyXG4gICAgICBpZiAoIWlzTWF0Y2hpbmdDb3VudCkgcmV0dXJuO1xyXG4gICAgICBpZiAoaXNNYXRjaGluZ09ubHlDb3VudCB8fCBpc01hdGNoaW5nQm9udXNBbmRDb3VudCkge1xyXG4gICAgICAgIHRoaXMuI3JhbmtzLnB1c2goa2V5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge251bWJlcn0gcGF5bWVudEFtb3VudFxyXG4gICAqL1xyXG4gICNjYWxjdWxhdGVQcm9maXRSYXRlKHBheW1lbnRBbW91bnQpIHtcclxuICAgIHRoaXMuI2NhbGN1bGF0ZVRvdGFsUHJpemUoKTtcclxuICAgIHRoaXMuI3Jld2FyZC5wcm9maXRSYXRlID0gTnVtYmVyKFxyXG4gICAgICAoKHRoaXMuI3Jld2FyZC50b3RhbFByaXplcyAvIHBheW1lbnRBbW91bnQpICogMTAwKS50b0ZpeGVkKDEpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gICNjYWxjdWxhdGVUb3RhbFByaXplKCkge1xyXG4gICAgdGhpcy4jcmV3YXJkLnRvdGFsUHJpemVzID0gdGhpcy4jcmFua3MucmVkdWNlKFxyXG4gICAgICAodG90YWxQcml6ZXMsIHJhbmspID0+IHRvdGFsUHJpemVzICsgV0lOTklOR19SVUxFLmdldChyYW5rKS5tb25leSxcclxuICAgICAgMCxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0aXN0aWNzO1xyXG4iLCJpbXBvcnQgeyBFUlJPUl9NRVNTQUdFUywgTlVNQkVSX0RFTElNSVRFUiB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7XHJcbiAgY2hlY2tEZWZpbmVkSW5wdXRWYWx1ZSxcclxuICBpc1ZhbGlkV2lubmluZ051bWJlcnNGb3JtLFxyXG59IGZyb20gJy4uL3V0aWxzL3ZhbGlkYXRvcnNVdGlscyc7XHJcbmltcG9ydCBMb3R0byBmcm9tICcuL0xvdHRvJztcclxuXHJcbmNsYXNzIFdpbm5pbmdMb3R0byB7XHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJbXX1cclxuICAgKi9cclxuICAjbG90dG9OdW1iZXJzID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsb3R0b051bWJlcnNJbnB1dFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGxvdHRvTnVtYmVyc0lucHV0KSB7XHJcbiAgICB0aGlzLiN2YWxpZGF0ZVdpbm5pbmdMb3R0b051bWJlcnMobG90dG9OdW1iZXJzSW5wdXQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxvdHRvTnVtYmVycygpIHtcclxuICAgIHJldHVybiBbLi4udGhpcy4jbG90dG9OdW1iZXJzXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyW119IGxvdHRvTnVtYmVyc1xyXG4gICAqIEBwYXJhbSB7Qm9udXN9IGJvbnVzXHJcbiAgICovXHJcbiAgY29tcGFyZUxvdHRvKGxvdHRvTnVtYmVycywgYm9udXMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlzQm9udXM6IGJvbnVzLmlzTWF0Y2hpbmdOdW1iZXIobG90dG9OdW1iZXJzKSxcclxuICAgICAgbWF0Y2hlZENvdW50OiB0aGlzLiNjb3VudE1hdGNoZWROdW1iZXIobG90dG9OdW1iZXJzKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiAgQHBhcmFtIHtudW1iZXJbXX0gbG90dG9OdW1iZXJzXHJcbiAgICovXHJcbiAgI2NvdW50TWF0Y2hlZE51bWJlcihsb3R0b051bWJlcnMpIHtcclxuICAgIHJldHVybiBsb3R0b051bWJlcnMuZmlsdGVyKChudW1iZXIpID0+IHRoaXMuI2xvdHRvTnVtYmVycy5pbmNsdWRlcyhudW1iZXIpKVxyXG4gICAgICAubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxvdHRvTnVtYmVyc0lucHV0XHJcbiAgICovXHJcbiAgI3ZhbGlkYXRlV2lubmluZ0xvdHRvTnVtYmVycyhsb3R0b051bWJlcnNJbnB1dCkge1xyXG4gICAgY2hlY2tEZWZpbmVkSW5wdXRWYWx1ZShsb3R0b051bWJlcnNJbnB1dCk7XHJcblxyXG4gICAgaWYgKCFpc1ZhbGlkV2lubmluZ051bWJlcnNGb3JtKGxvdHRvTnVtYmVyc0lucHV0KSlcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SX01FU1NBR0VTLmluVmFsaWRXSW5uaW5nTnVtYmVyc0Zvcm0pO1xyXG5cclxuICAgIGNvbnN0IG51bWJlcnMgPSBsb3R0b051bWJlcnNJbnB1dFxyXG4gICAgICAuc3BsaXQoTlVNQkVSX0RFTElNSVRFUilcclxuICAgICAgLm1hcCgodmFsdWUpID0+IE51bWJlcih2YWx1ZSkpO1xyXG5cclxuICAgIHRoaXMuI2xvdHRvTnVtYmVycyA9IG5ldyBMb3R0byhudW1iZXJzKS5udW1iZXJzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2lubmluZ0xvdHRvO1xyXG4iLCIvKipcclxuICogc3RlcCAy7J2YIOyLnOyekeygkOydtCDrkJjripQg7YyM7J287J6F64uI64ukLlxyXG4gKiDrhbjrk5wg7ZmY6rK97JeQ7IScIOyCrOyaqe2VmOuKlCByZWFkbGluZSDrk7HsnYQg67aI65+s7JisIOqyveyasCDsoJXsg4HsoIHsnLzroZwg67mM65Oc7ZWgIOyImCDsl4bsirXri4jri6QuXHJcbiAqL1xyXG5pbXBvcnQgJy4vd2ViL2Nzcy9tYWluLmNzcyc7XHJcbmltcG9ydCBXZWJMb3R0b0dhbWVDb250cm9sbGVyIGZyb20gJy4vd2ViL2pzL1dlYkxvdHRvR2FtZUNvbnRyb2xsZXInO1xyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbmNvbnN0IHdlYiA9IG5ldyBXZWJMb3R0b0dhbWVDb250cm9sbGVyKCk7XHJcbiIsImNsYXNzIFJhbmRvbU51bWJlciB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGVuZFxyXG4gICAqL1xyXG4gIHN0YXRpYyBwaWNrTnVtYmVySW5SYW5nZShzdGFydCwgZW5kKSB7XHJcbiAgICBjb25zdCByYW5nZSA9IFtzdGFydCwgZW5kXS5zb3J0KChhLCBiKSA9PiBhIDwgYik7XHJcbiAgICBjb25zdCBbZmlyc3ROdW1iZXIsIGxhc3ROdW1iZXJdID0gcmFuZ2U7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGxhc3ROdW1iZXIgLSBmaXJzdE51bWJlciArIDEpKSArIGZpcnN0TnVtYmVyXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHt7c3RhcnQ6bnVtYmVyICwgZW5kOm51bWJlcn19IHJhbmdlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgc3RhdGljIHBpY2tVbmlxdWVOdW1iZXJzSW5SYW5nZShyYW5nZSwgbGVuZ3RoKSB7XHJcbiAgICBjb25zdCBudW1iZXJzID0gbmV3IFNldCgpO1xyXG5cclxuICAgIHdoaWxlIChudW1iZXJzLnNpemUgPCBsZW5ndGgpIHtcclxuICAgICAgY29uc3QgcmFuZG9tTnVtYmVyID0gdGhpcy5waWNrTnVtYmVySW5SYW5nZShyYW5nZS5zdGFydCwgcmFuZ2UuZW5kKTtcclxuXHJcbiAgICAgIG51bWJlcnMuYWRkKHJhbmRvbU51bWJlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gWy4uLm51bWJlcnNdO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmFuZG9tTnVtYmVyO1xyXG4iLCJpbXBvcnQge1xyXG4gIEVSUk9SX01FU1NBR0VTLFxyXG4gIExPVFRPX1JVTEUsXHJcbiAgTlVNQkVSX0RFTElNSVRFUixcclxuICBSQU5ET01fTlVNQkVSX1JVTEUsXHJcbiAgUkVTVEFSVF9LRVksXHJcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBjaGVja0RlZmluZWRJbnB1dFZhbHVlID0gKGlucHV0VmFsdWUpID0+IHtcclxuICBpZiAoIWlucHV0VmFsdWUpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihFUlJPUl9NRVNTQUdFUy5pc1VuZGVmaW5lZElucHV0VmFsdWUpO1xyXG4gIH1cclxufTtcclxuLyoqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJcclxuICovXHJcbmV4cG9ydCBjb25zdCBpc0ludGVnZXIgPSAobnVtYmVyKSA9PiBOdW1iZXIuaXNJbnRlZ2VyKG51bWJlcik7XHJcblxyXG4vLyDroZzrmJAg64SY67KEXHJcbi8qKlxyXG4gKiDrsojtmLgg67Cw7Je07J2YIOqwr+yImOqwgCDroZzrmJAg67KI7Zi465Ok7J2YIOqwr+yImOqzvCDqsJnsnYDsp4Ag7Jes67aAXHJcbiAqIEBwYXJhbSB7bnVtYmVyW119IG51bWJlcnNcclxuICovXHJcbmV4cG9ydCBjb25zdCBpc1ZhbGlkTG90dG9OdW1iZXJDb3VudCA9IChudW1iZXJzKSA9PiB7XHJcbiAgY29uc3QgeyBsZW5ndGggfSA9IExPVFRPX1JVTEU7XHJcblxyXG4gIHJldHVybiBudW1iZXJzLmxlbmd0aCA9PT0gbGVuZ3RoO1xyXG59O1xyXG4vKipcclxuICog66Gc65iQIOuyiO2YuOuTpOydtCDspJHrs7XrkJjsp4Ag7JWK64qUIOyngCDsl6zrtoBcclxuICogQHBhcmFtIHtudW1iZXJbXX0gbnVtYmVyc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzTm90RHVwbGljYXRlZExvdHRvTnVtYmVyID0gKG51bWJlcnMpID0+XHJcbiAgbnVtYmVycy5sZW5ndGggPT09IG5ldyBTZXQobnVtYmVycykuc2l6ZTtcclxuLyoqXHJcbiAqIOuhnOuYkCDrsojtmLjrk6TsnbQg7Jyg7Zqo7ZWcIOuylOychOyViOydmCDsiKvsnpDsnbjsp4Ag7Jes67aAXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJcclxuICovXHJcbmV4cG9ydCBjb25zdCBpc0xvdHRvTnVtYmVySW5SYW5nZSA9IChudW1iZXIpID0+IHtcclxuICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IFJBTkRPTV9OVU1CRVJfUlVMRS5yYW5nZTtcclxuXHJcbiAgcmV0dXJuIHN0YXJ0IDw9IG51bWJlciAmJiBudW1iZXIgPD0gZW5kO1xyXG59O1xyXG4vKipcclxuICog67O064SI7IqkIOuyiO2YuOqwgCDroZzrmJAg67KI7Zi465OkIOuLpOuluCDsp4Ag7Jes67aAXHJcbiAqIEBwYXJhbSB7bnVtYmVyW119IGxvdHRvTnVtYmVyc1xyXG4gKiBAcGFyYW0ge251bWJlcn0gYm9udXNOdW1iZXJcclxuICovXHJcbmV4cG9ydCBjb25zdCBpc0JvbnVzTnVtYmVyVW5pcXVlID0gKGxvdHRvTnVtYmVycywgYm9udXNOdW1iZXIpID0+XHJcbiAgIWxvdHRvTnVtYmVycy5pbmNsdWRlcyhib251c051bWJlcik7XHJcblxyXG4vLyDqtazrp6Qg6riI7JWhXHJcbi8qKlxyXG4gKiDqtazrp6TquIjslaHsnbQg66Gc65iQIOqwgOqyqeycvOuhnCDrgpjriITslrQg65ao7Ja07KeA64qUIOyngCDsl6zrtoBcclxuICogIEBwYXJhbSB7bnVtYmVyfSBtb25leVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzRGl2aXNpYmxlQnlQcmljZSA9IChtb25leSkgPT4gbW9uZXkgJSBMT1RUT19SVUxFLnByaWNlID09PSAwO1xyXG5cclxuLyoqXHJcbiAqIOq1rOunpCDquIjslaHsnLzroZwg7IK0IOyImCDsnojripQg66Gc65iQIO2LsOy8kyDsnqXsiJjqsIAg7Jyg7Zqo7ZWcIOuylOychOyXkCDsnojripQg7KeAIOyXrOu2gFxyXG4gKiAgQHBhcmFtIHtudW1iZXJ9IG1vbmV5XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNWYWxpZE51bWJlcnNPZlRpY2tldHMgPSAobW9uZXkpID0+IHtcclxuICBjb25zdCB7IHByaWNlLCBudW1iZXJzT2ZUaWNrZXRzIH0gPSBMT1RUT19SVUxFO1xyXG4gIGNvbnN0IHsgbWluLCBtYXggfSA9IG51bWJlcnNPZlRpY2tldHM7XHJcbiAgY29uc3QgdGlja2V0cyA9IG1vbmV5IC8gcHJpY2U7XHJcblxyXG4gIHJldHVybiB0aWNrZXRzID49IG1pbiAmJiB0aWNrZXRzIDw9IG1heDtcclxufTtcclxuLyoqXHJcbiAqIOuLueyyqOuyiO2YuOyXkCDrjIDtlZwg7J6F66Cl6rCS7J20IOyIq+yekOuTpOuhnCDsnbTro6jslrTsp4DrqbAg7Iir7J6Q65Ok7J20IOyJvO2RnOuhnCDqtazrtoTrkJjsoIAg7J6I64qU7KeAIOyXrOu2gFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbnVtYmVySW5wdXRcclxuICovXHJcbmV4cG9ydCBjb25zdCBpc1ZhbGlkV2lubmluZ051bWJlcnNGb3JtID0gKG51bWJlcklucHV0KSA9PiB7XHJcbiAgaWYgKCFudW1iZXJJbnB1dC5pbmNsdWRlcyhOVU1CRVJfREVMSU1JVEVSKSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbnVtYmVyc09mRGVsaW1pdGVyID0gWy4uLm51bWJlcklucHV0Lm1hdGNoQWxsKE5VTUJFUl9ERUxJTUlURVIpXS5sZW5ndGg7XHJcblxyXG4gIGNvbnN0IGlzVmFsaWROdW1iZXJEZWxpbWl0ZXIgPVxyXG4gICAgbnVtYmVyc09mRGVsaW1pdGVyID09PSBudW1iZXJJbnB1dC5zcGxpdChOVU1CRVJfREVMSU1JVEVSKS5sZW5ndGggLSAxO1xyXG5cclxuICByZXR1cm4gaXNWYWxpZE51bWJlckRlbGltaXRlcjtcclxufTtcclxuLyoqXHJcbiAqIOqyjOyehCDsnqzsi5zsnpEg7Jes67aA7JeQIOuMgO2VnCDsnoXroKXqsJLsnbQg6rKM7J6EIOyerOyLnOyekSDtgqTqsJLrk6Tqs7wg6rCZ7J2AIOyngCDsl6zrtoBcclxuICogQHBhcmFtIHtzdHJpbmd9IG51bWJlcklucHV0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNWYWxpZFJlc3RhcnRJbnB1dEZvcm0gPSAocmVzdGFydElucHV0KSA9PiB7XHJcbiAgY29uc3QgeyByZXN0YXJ0LCBlbmQgfSA9IFJFU1RBUlRfS0VZO1xyXG4gIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgXlske3Jlc3RhcnR9JHtlbmR9XXsxfSRgKTtcclxuXHJcbiAgcmV0dXJuIHJlZ2V4LnRlc3QocmVzdGFydElucHV0KTtcclxufTtcclxuIiwiY29uc3QgU1RFUF9QUkVGSVggPSAnc3RlcC0nO1xyXG5cclxuZXhwb3J0IGNvbnN0IEdBTUVfU1RFUCA9IE9iamVjdC5mcmVlemUoe1xyXG4gIHBheW1lbnQ6IGAke1NURVBfUFJFRklYfXBheW1lbnRgLFxyXG4gIHdpbm5pbmc6IGAke1NURVBfUFJFRklYfXdpbm5pbmdgLFxyXG4gIHN0YXRpc3RpY3M6IGAke1NURVBfUFJFRklYfXN0YXRpc3RpY3NgLFxyXG59KTtcclxuIiwiaW1wb3J0IHsgTE9UVE9fUlVMRSwgUkFORE9NX05VTUJFUl9SVUxFIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2luZGV4LmpzJztcclxuXHJcbmNvbnN0IEh0bWxUZXh0SW5qZWN0b3JXaXRoQ29uc3RhbnRzID0ge1xyXG4gIGluamVjdG9yVGV4dCgpIHtcclxuICAgIHRoaXMucHJpdmF0ZV9pbmplY3RQYXltZW50QW1vdW50SW5wdXQoKTtcclxuICAgIHRoaXMucHJpdmF0ZV9pbmplY3RJbnB1dEZvcldpbm5pbmdMb3R0b051bWJlcnMoKTtcclxuICAgIHRoaXMucHJpdmF0ZV9pbmplY3RCb251c0lucHV0KCk7XHJcbiAgICB0aGlzLnByaXZhdGVfaW5qZWN0UGF5bWVudEFtb3VudFJ1bGUoKTtcclxuICAgIHRoaXMucHJpdmF0ZV9pbmplY3RXaW5uaW5nQ3JpdGVyaWFSdWxlKCk7XHJcbiAgfSxcclxuXHJcbiAgcHJpdmF0ZV9pbmplY3RQYXltZW50QW1vdW50SW5wdXQoKSB7XHJcbiAgICBjb25zdCBwYXJlbnREaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJy5wYXltZW50LWFtb3VudF9fZm9ybSBkaXYnLFxyXG4gICAgKTtcclxuICAgIGNvbnN0IHsgcHJpY2UsIG51bWJlcnNPZlRpY2tldHMgfSA9IExPVFRPX1JVTEU7XHJcblxyXG4gICAgY29uc3QgbWF4UGF5bWVudCA9IHByaWNlICogbnVtYmVyc09mVGlja2V0cy5tYXg7XHJcblxyXG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHtcclxuICAgICAgaWQ6ICdpbnB1dC1wYXltZW50LWFtb3VudCcsXHJcbiAgICAgIG1pbjogcHJpY2UgKiBudW1iZXJzT2ZUaWNrZXRzLm1pbixcclxuICAgICAgbWF4OiBtYXhQYXltZW50LFxyXG4gICAgICBzdGVwOiBwcmljZSxcclxuICAgICAgdHlwZTogJ251bWJlcicsXHJcbiAgICAgIG5hbWU6ICdwYXltZW50QW1vdW50JyxcclxuICAgICAgbWF4TGVuZ3RoOiBtYXhQYXltZW50LnRvU3RyaW5nKCkubGVuZ3RoLFxyXG4gICAgICBwbGFjZWhvbGRlcjogJ+q4iOyVoScsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBwYXltZW50QW1vdW50SW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHJcbiAgICBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgcGF5bWVudEFtb3VudElucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwYXJlbnREaXZFbGVtZW50Lmluc2VydEJlZm9yZShcclxuICAgICAgcGF5bWVudEFtb3VudElucHV0RWxlbWVudCxcclxuICAgICAgcGFyZW50RGl2RWxlbWVudC5maXJzdENoaWxkLFxyXG4gICAgKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnbWVudFxyXG4gICAqIEBwYXJhbSB7e3R5cGU6IHN0cmluZywgbWluOiBudW1iZXIsIG1heDogbnVtYmVyfX0gbnVtYmVySW5wdXRBdHRyaWJ1dGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZV9tYWtlTG90dG9OdW1iZXJJbnB1dEFuZExhYmVsKGZyYWdtZW50LCBudW1iZXJJbnB1dEF0dHJpYnV0ZXMpIHtcclxuICAgIEFycmF5LmZyb20oeyBsZW5ndGg6IExPVFRPX1JVTEUubGVuZ3RoIH0pLmZvckVhY2goKF8sIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGxhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgIGNvbnN0IG51bWJlcklucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcblxyXG4gICAgICBjb25zdCBpbnB1dEVsZW1lbnRJZCA9IGBpbnB1dC1sb3R0b051bWJlciR7aW5kZXggKyAxfWA7XHJcblxyXG4gICAgICBsYWJlbEVsZW1lbnQuc2V0QXR0cmlidXRlKCdmb3InLCBpbnB1dEVsZW1lbnRJZCk7XHJcbiAgICAgIGxhYmVsRWxlbWVudC5jbGFzc05hbWUgPSAnc2NyZWVuLXJlYWRlci1vbmx5JztcclxuICAgICAgbGFiZWxFbGVtZW50LnRleHRDb250ZW50ID0gJ+uLueyyqCDrsojtmLjrpbwg7J6F66Cl7ZW07KO87IS47JqULic7XHJcblxyXG4gICAgICBudW1iZXJJbnB1dEVsZW1lbnQuaWQgPSBpbnB1dEVsZW1lbnRJZDtcclxuXHJcbiAgICAgIE9iamVjdC5lbnRyaWVzKG51bWJlcklucHV0QXR0cmlidXRlcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgbnVtYmVySW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG51bWJlcklucHV0RWxlbWVudC5uYW1lID0gaW5wdXRFbGVtZW50SWQucmVwbGFjZSgnaW5wdXQtJywgJycpO1xyXG5cclxuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobGFiZWxFbGVtZW50KTtcclxuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQobnVtYmVySW5wdXRFbGVtZW50KTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIHByaXZhdGVfaW5qZWN0SW5wdXRGb3JXaW5uaW5nTG90dG9OdW1iZXJzKCkge1xyXG4gICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSBMT1RUT19SVUxFLnJhbmdlO1xyXG5cclxuICAgIGNvbnN0IGlucHV0R3JvdXBFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJy53aW5uaW5nLWNyaXRlcmlhX19mb3JtLWxvdHRvLW51bWJlcnMgLmlucHV0LWdyb3VwJyxcclxuICAgICk7XHJcbiAgICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgICBjb25zdCBudW1iZXJJbnB1dEF0dHJpYnV0ZXMgPSB7XHJcbiAgICAgIHR5cGU6ICdudW1iZXInLFxyXG4gICAgICBtaW46IHN0YXJ0LFxyXG4gICAgICBtYXg6IGVuZCxcclxuICAgICAgbWF4TGVuZ3RoOiBlbmQudG9TdHJpbmcoKS5sZW5ndGgsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucHJpdmF0ZV9tYWtlTG90dG9OdW1iZXJJbnB1dEFuZExhYmVsKGZyYWdtZW50LCBudW1iZXJJbnB1dEF0dHJpYnV0ZXMpO1xyXG5cclxuICAgIGlucHV0R3JvdXBFbGVtZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICB9LFxyXG5cclxuICBwcml2YXRlX2luamVjdEJvbnVzSW5wdXQoKSB7XHJcbiAgICBjb25zdCBib251c0Zvcm1FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJy53aW5uaW5nLWNyaXRlcmlhX19mb3JtLWJvbnVzLW51bWJlcicsXHJcbiAgICApO1xyXG4gICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSBMT1RUT19SVUxFLnJhbmdlO1xyXG5cclxuICAgIGNvbnN0IGJvbnVzSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cclxuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7XHJcbiAgICAgIGlkOiAnaW5wdXQtYm9udXMtbnVtYmVyJyxcclxuICAgICAgbWluOiBzdGFydCxcclxuICAgICAgbWF4OiBlbmQsXHJcbiAgICAgIG1heExlbmd0aDogZW5kLnRvU3RyaW5nKCkubGVuZ3RoLFxyXG4gICAgICB0eXBlOiAnbnVtYmVyJyxcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIGJvbnVzSW5wdXQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYm9udXNGb3JtRWxlbWVudC5hcHBlbmRDaGlsZChib251c0lucHV0KTtcclxuICB9LFxyXG5cclxuICBwcml2YXRlX2dldFBheW1lbnRBbW91bnRSdWxlSHRtbCgpIHtcclxuICAgIGNvbnN0IHsgcHJpY2UgfSA9IExPVFRPX1JVTEU7XHJcbiAgICBjb25zdCB7IG1pbiwgbWF4IH0gPSBMT1RUT19SVUxFLm51bWJlcnNPZlRpY2tldHM7XHJcblxyXG4gICAgcmV0dXJuIGBcclxuICAgIDx1bCBjbGFzcz1cInJ1bGUgcnVsZS1wYXltZW50LWFtb3VudCBzaGFkb3cgXCI+XHJcbiAgICAgIDxsaT5cclxuICAgICAgICDroZzrmJAg6rCA6rKp7J2AICR7cHJpY2V97JuQ7J207JeQ7JqULlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGk+6rWs66ekIOq4iOyVoeydgCAke3ByaWNlfeybkCDri6jsnITroZwg7J6F66Cl7ZW07KO87IS47JqULjwvbGk+XHJcbiAgICAgIDxsaT7qtazrp6Qg6rCA64ql7ZWcIOuhnOuYkOuKlCDstZzshowgJHttaW597J6lLCDstZzrjIAgJHttYXh97J6l7J207JeQ7JqULjwvbGk+XHJcbiAgICA8L3VsPlxyXG4gICAgYDtcclxuICB9LFxyXG5cclxuICBwcml2YXRlX2luamVjdFBheW1lbnRBbW91bnRSdWxlKCkge1xyXG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcucGF5bWVudC1hbW91bnRfX2V4cGxhbmF0aW9uJyxcclxuICAgICk7XHJcblxyXG4gICAgcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXHJcbiAgICAgICdiZWZvcmVlbmQnLFxyXG4gICAgICB0aGlzLnByaXZhdGVfZ2V0UGF5bWVudEFtb3VudFJ1bGVIdG1sKCksXHJcbiAgICApO1xyXG4gIH0sXHJcblxyXG4gIHByaXZhdGVfZ2V0V2lubmluZ0NyaXRlcmlhUnVsZUh0bWwoKSB7XHJcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IFJBTkRPTV9OVU1CRVJfUlVMRS5yYW5nZTtcclxuICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSBMT1RUT19SVUxFO1xyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICA8dWwgY2xhc3M9XCJydWxlIHJ1bGUtd2lubmluZy1jcml0ZXJpYSBzaGFkb3cgXCI+XHJcbiAgICAgIDxsaT7rsojtmLjripRcclxuICAgICAgICAke3N0YXJ0fX4ke2VuZH3snZgg7KCV7IiY7Jes7JW8IO2VtOyalC5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpPlxyXG4gICAgICAgIOuLueyyqCDrsojtmLjripQg7KSR67O1IOyXhuuKlCAke2xlbmd0aH3qsJwg7Jes7JW87ZW07JqULlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGk+67O064SI7IqkIOuyiO2YuOuKlCDri7nssqgg67KI7Zi47JmAIOykkeuzteuQmOyngCDslYrslYTslbztlbTsmpQuIDwvbGk+XHJcbiAgICA8L3VsPlxyXG4gICAgYDtcclxuICB9LFxyXG5cclxuICBwcml2YXRlX2luamVjdFdpbm5pbmdDcml0ZXJpYVJ1bGUoKSB7XHJcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJy53aW5uaW5nLWNyaXRlcmlhX19leHBsYW5hdGlvbicsXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHdpbm5pbmdDcml0ZXJpYVJ1bGVIdG1sID0gdGhpcy5wcml2YXRlX2dldFdpbm5pbmdDcml0ZXJpYVJ1bGVIdG1sKCk7XHJcblxyXG4gICAgcGFyZW50RWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHdpbm5pbmdDcml0ZXJpYVJ1bGVIdG1sKTtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSHRtbFRleHRJbmplY3RvcldpdGhDb25zdGFudHM7XHJcbiIsImltcG9ydCB7IFdJTk5JTkdfUlVMRSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcblxyXG5jb25zdCBIdG1sVGV4dEluamVjdG9yV2l0aEdhbWVSZXN1bHRzID0ge1xyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJbXVtdfSBsb3R0b1RpY2tldHNcclxuICAgKi9cclxuICBpbmplY3RvckxvdHRvVGlja2V0cyhsb3R0b1RpY2tldHMpIHtcclxuICAgIGNvbnN0IGlzc3VlZExvdHRvc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaXNzdWVkLWxvdHRvcycpO1xyXG4gICAgY29uc3QgbG90dG9zQ291bnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJyNwdXJjaGFzZS1oaXN0b3J5X19sb3R0b3MtY291bnRfX251bWJlcicsXHJcbiAgICApO1xyXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG4gICAgbG90dG9zQ291bnRFbGVtZW50LnRleHRDb250ZW50ID0gbG90dG9UaWNrZXRzLmxlbmd0aDtcclxuXHJcbiAgICBsb3R0b1RpY2tldHMuZm9yRWFjaCgodGlja2V0KSA9PiB7XHJcbiAgICAgIHRoaXMucHJpdmF0ZV9tYWtlRWxlbWVudEZvcklzc3VlZExvdHRvKHRpY2tldCwgZnJhZ21lbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXNzdWVkTG90dG9zRWxlbWVudC5yZXBsYWNlQ2hpbGRyZW4oZnJhZ21lbnQpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHt7MTpudW1iZXIsMjpudW1iZXIsMzpudW1iZXIsNDpudW1iZXIsNTpudW1iZXJ9fSBzdGF0aXN0aWNzUmVzdWx0XHJcbiAgICovXHJcbiAgaW5qZWN0U3RhdGlzdGljc1RhYmxlKHN0YXRpc3RpY3NSZXN1bHQpIHtcclxuICAgIGNvbnN0IHJhdGVTdGF0aXN0aWNzRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5rLXN0YXRpc3RpY3MnKTtcclxuXHJcbiAgICB0aGlzLnByaXZhdGVfcmVtb3ZlUHJldmlvdXNUYWJsZSgpO1xyXG5cclxuICAgIHJhdGVTdGF0aXN0aWNzRWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXHJcbiAgICAgICdhZnRlcmJlZ2luJyxcclxuICAgICAgdGhpcy5wcml2YXRlX2dldFRhYmxlSHRtbChzdGF0aXN0aWNzUmVzdWx0KSxcclxuICAgICk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHByb2ZpdFJhdGVcclxuICAgKi9cclxuICBpbmplY3RQcm9maXRSYXRlKHByb2ZpdFJhdGUpIHtcclxuICAgIGNvbnN0IHByb2ZpdFJhdGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2ZpdC1yYXRlJyk7XHJcblxyXG4gICAgcHJvZml0UmF0ZUVsZW1lbnQudGV4dENvbnRlbnQgPSBwcm9maXRSYXRlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7ezE6bnVtYmVyLDI6bnVtYmVyLDM6bnVtYmVyLDQ6bnVtYmVyLDU6bnVtYmVyfX0gc3RhdGlzdGljc1Jlc3VsdFxyXG4gICAqL1xyXG4gIHByaXZhdGVfZ2V0VGFibGVUckFycmF5KHN0YXRpc3RpY3NSZXN1bHQpIHtcclxuICAgIHJldHVybiBBcnJheS5mcm9tKFdJTk5JTkdfUlVMRSlcclxuICAgICAgLm1hcChcclxuICAgICAgICAoW2tleSwgdmFsdWVdKSA9PiBgXHJcbiAgICAgIDx0ciBpZD1cInJhbmske2tleX1cIj5cclxuICAgICAgICA8dGggc2NvcGU9XCJyb3dcIj4ke3ZhbHVlLm1hdGNoZWRDb3VudH3qsJw8L3RoPlxyXG4gICAgICAgIDx0ZCBjbGFzcz1cInByaXplXCI+JHt2YWx1ZS5tb25leS50b0xvY2FsZVN0cmluZygna28tS1InKX08L3RkPlxyXG4gICAgICAgIDx0ZCBjbGFzcz1cImNvdW50XCI+JHtzdGF0aXN0aWNzUmVzdWx0W2tleV19PC90ZD5cclxuICAgICAgPC90cj5gLFxyXG4gICAgICApXHJcbiAgICAgIC5qb2luKCcnKTtcclxuICB9LFxyXG5cclxuICBwcml2YXRlX3JlbW92ZVByZXZpb3VzVGFibGUoKSB7XHJcbiAgICBjb25zdCB0YXJnZXRUYWJsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnI3Jhbmstc3RhdGlzdGljc19fdGFibGUnLFxyXG4gICAgKTtcclxuXHJcbiAgICB0YXJnZXRUYWJsZUVsZW1lbnQ/LnJlbW92ZSgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7ezE6bnVtYmVyLDI6bnVtYmVyLDM6bnVtYmVyLDQ6bnVtYmVyLDU6bnVtYmVyfX0gc3RhdGlzdGljc1Jlc3VsdFxyXG4gICAqL1xyXG4gIHByaXZhdGVfZ2V0VGFibGVIdG1sKHN0YXRpc3RpY3NSZXN1bHQpIHtcclxuICAgIHJldHVybiBgXHJcbiAgICA8dGFibGUgaWQ9XCJyYW5rLXN0YXRpc3RpY3NfX3RhYmxlXCI+XHJcbiAgICAgIDxjYXB0aW9uIGNsYXNzPVwic2NyZWVuLXJlYWRlci1vbmx5XCI+66Gc65iQIOuLueyyqCDqsrDqs7w8L2NhcHRpb24+XHJcbiAgICAgIDx0aGVhZD5cclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj7snbzsuZgg6rCv7IiYPC90aD5cclxuICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiPuuLueyyqOq4iDwvdGg+XHJcbiAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIj7ri7nssqgg6rCv7IiYPC90aD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICA8L3RoZWFkPlxyXG4gICAgICA8dGJvZHk+XHJcbiAgICAgICAgJHt0aGlzLnByaXZhdGVfZ2V0VGFibGVUckFycmF5KHN0YXRpc3RpY3NSZXN1bHQpfVxyXG4gICAgICA8L3Rib2R5PlxyXG4gICAgPC90YWJsZT5cclxuICAgIGA7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtudW1iZXJbXX0gdGlja2V0XHJcbiAgICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnbWVudFxyXG4gICAqL1xyXG4gIHByaXZhdGVfbWFrZUVsZW1lbnRGb3JJc3N1ZWRMb3R0byh0aWNrZXQsIGZyYWdtZW50KSB7XHJcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICBsaS5jbGFzc05hbWUgPSAnbG90dG8nO1xyXG5cclxuICAgIGNvbnN0IHRleHRBYm91dExvdHRvTnVtYmVycyA9IHRpY2tldC5zb3J0KFxyXG4gICAgICAocHJldiwgY3VycmVudCkgPT4gcHJldiAtIGN1cnJlbnQsXHJcbiAgICApO1xyXG5cclxuICAgIC8vIO2ZlOuptCDsg4Hsl5DshJwg7Iir7J6Q65Ok7J2YIOyYgeydhCDrp57stpTsp4Ag7JyE7ZW0IGRpduuhnCDqsJDsi7jquLBcclxuICAgIGNvbnN0IG90aGVyQ2hpbGRyZW5PZkxpID0gWy4uLnRleHRBYm91dExvdHRvTnVtYmVyc11cclxuICAgICAgLm1hcChcclxuICAgICAgICAoc3RyaW5nKSA9PiBgXHJcbiAgICA8ZGl2IGNsYXNzPSAnbnVtYmVyJz5cclxuICAgICAgJHtzdHJpbmd9XHJcbiAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICAgIClcclxuICAgICAgLmpvaW4oJycpO1xyXG5cclxuICAgIGNvbnN0IGNoaWxkcmVuSHRtbCA9IGA8ZGl2IGNsYXNzPVwiaWNvbi10aWNrZXRcIj7wn46f77iPPC9kaXY+JHtvdGhlckNoaWxkcmVuT2ZMaX1gO1xyXG5cclxuICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlRW5kJywgY2hpbGRyZW5IdG1sKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEh0bWxUZXh0SW5qZWN0b3JXaXRoR2FtZVJlc3VsdHM7XHJcbiIsImltcG9ydCBIdG1sVGV4dEluamVjdG9yV2l0aEdhbWVSZXN1bHRzIGZyb20gJy4vSHRtbFRleHRJbmplY3RvcldpdGhHYW1lUmVzdWx0cyc7XHJcbmltcG9ydCB7XHJcbiAgY2hhbmdlQ2xhc3NBYm91dEdhbWVTdGVwLFxyXG4gIGhhbmRsZUVycm9yTWVzc2FnZSxcclxuICByZWNvdmVyeUluaXRpYWxTdGF0ZUV4Y2VwdFBheW1lbnQsXHJcbn0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5jbGFzcyBMb3R0b01hY2hpbmVHZW5lcmF0b3Ige1xyXG4gICNsb3R0b1Jlc3VsdHNIZWxwZXI7XHJcblxyXG4gICRwYXltZW50Rm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGF5bWVudC1hbW91bnRfX2Zvcm0nKTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0xvdHRvUmVzdWx0SGVscGVyfSBsb3R0b1Jlc3VsdHNIZWxwZXJcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihsb3R0b1Jlc3VsdHNIZWxwZXIpIHtcclxuICAgIHRoaXMuI2xvdHRvUmVzdWx0c0hlbHBlciA9IGxvdHRvUmVzdWx0c0hlbHBlcjtcclxuICAgIHRoaXMuI2FkZEV2ZW50KCk7XHJcbiAgfVxyXG5cclxuICAjYWRkRXZlbnQoKSB7XHJcbiAgICB0aGlzLiRwYXltZW50Rm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PlxyXG4gICAgICB0aGlzLiNoYW5kbGVTdWJtaXRUb0lzc3VlTG90dG9zKGV2ZW50KSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDqtazrp6Qg6riI7JWh7J2EIOyngOy2nO2VmOuptCDsnKDtmqjshLEg6rKA7IKs66W8IO2GteqzvO2VmOuptCDrsJztlonrkJwg66Gc65iQ65Ok7J2EIO2ZlOuptOyXkCDstpzroKXtlZjqs6Ag7Ya16rO87ZWY7KeAIOuqu+2VmOuptCDsmKTrpZgg66mU7IS47KeA66W8IO2ZlOuptOyXkCDstpzroKXtlZzri6QuXHJcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcclxuICAgKi9cclxuICAjaGFuZGxlU3VibWl0VG9Jc3N1ZUxvdHRvcyhldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHJlY292ZXJ5SW5pdGlhbFN0YXRlRXhjZXB0UGF5bWVudCgpO1xyXG4gICAgY29uc3QgeyBjdXJyZW50VGFyZ2V0IH0gPSBldmVudDtcclxuICAgIGNvbnN0IHBheW1lbnRBbW91bnRJbnB1dEVsID0gY3VycmVudFRhcmdldC5lbGVtZW50cy5wYXltZW50QW1vdW50O1xyXG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gcGF5bWVudEFtb3VudElucHV0RWw7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJy5wYXltZW50LWFtb3VudCAubWVzc2FnZS1lcnJvcicsXHJcbiAgICApO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMuI2xvdHRvUmVzdWx0c0hlbHBlci5nZW5lcmF0ZUxvdHRvTWFjaGluZSh2YWx1ZSk7XHJcblxyXG4gICAgICBIdG1sVGV4dEluamVjdG9yV2l0aEdhbWVSZXN1bHRzLmluamVjdG9yTG90dG9UaWNrZXRzKFxyXG4gICAgICAgIHRoaXMuI2xvdHRvUmVzdWx0c0hlbHBlci5sb3R0b1RpY2tldHMsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBjaGFuZ2VDbGFzc0Fib3V0R2FtZVN0ZXAoJ3dpbm5pbmcnKTtcclxuICAgICAgaGFuZGxlRXJyb3JNZXNzYWdlKGVycm9yTWVzc2FnZUVsZW1lbnQpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgaGFuZGxlRXJyb3JNZXNzYWdlKGVycm9yTWVzc2FnZUVsZW1lbnQsIGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvdHRvTWFjaGluZUdlbmVyYXRvcjtcclxuIiwiaW1wb3J0IFN0YXRpc3RpY3MgZnJvbSAnLi4vLi4vZG9tYWlucy9TdGF0aXN0aWNzJztcclxuaW1wb3J0IEh0bWxUZXh0SW5qZWN0b3JXaXRoR2FtZVJlc3VsdHMgZnJvbSAnLi9IdG1sVGV4dEluamVjdG9yV2l0aEdhbWVSZXN1bHRzJztcclxuaW1wb3J0IHtcclxuICBjaGFuZ2VDbGFzc0Fib3V0R2FtZVN0ZXAsXHJcbiAgcmVjb3ZlcnlJbml0aWFsU3RhdGVFeGNlcHRQYXltZW50LFxyXG59IGZyb20gJy4vdXRpbHMnO1xyXG5cclxuY2xhc3MgU3RhdGlzdGljc1BvcHVwQ29udHJvbGxlciB7XHJcbiAgJGVsZW1lbnQgPSB7XHJcbiAgICBwb3B1cEVsZW1lbnQ6IHVuZGVmaW5lZCxcclxuICAgIGJ0bkNsb3NlUG9wdXBFbGVtZW50OiB1bmRlZmluZWQsXHJcbiAgICBidG5SZXN0YXJ0RWxlbWVudDogdW5kZWZpbmVkLFxyXG4gIH07XHJcblxyXG4gICNsb3R0b0FuYWx5dGljcztcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0xvdHRvUmVzdWx0SGVscGVyfSBsb3R0b1Jlc3VsdHNIZWxwZXJcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihsb3R0b1Jlc3VsdHNIZWxwZXIpIHtcclxuICAgIHRoaXMuI2Fzc2lnbkVsZW1lbnQoKTtcclxuICAgIHRoaXMuI2dldExvdHRvQW5hbHl0aWNzKGxvdHRvUmVzdWx0c0hlbHBlcik7XHJcbiAgICB0aGlzLiNvcGVuUG9wdXAoKTtcclxuICAgIHRoaXMuI2FkZEV2ZW50KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TG90dG9SZXN1bHRIZWxwZXJ9IGxvdHRvUmVzdWx0c0hlbHBlclxyXG4gICAqL1xyXG4gICNnZXRMb3R0b0FuYWx5dGljcyhsb3R0b1Jlc3VsdHNIZWxwZXIpIHtcclxuICAgIGNvbnN0IHN0YXRpc3RpY3MgPSBuZXcgU3RhdGlzdGljcyhcclxuICAgICAgbG90dG9SZXN1bHRzSGVscGVyLnJlc3VsdHMsXHJcbiAgICAgIGxvdHRvUmVzdWx0c0hlbHBlci5wYXltZW50QW1vdW50LFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLiNsb3R0b0FuYWx5dGljcyA9IHN0YXRpc3RpY3MubG90dG9BbmFseXRpY3M7XHJcbiAgfVxyXG5cclxuICAjb3BlblBvcHVwKCkge1xyXG4gICAgSHRtbFRleHRJbmplY3RvcldpdGhHYW1lUmVzdWx0cy5pbmplY3RTdGF0aXN0aWNzVGFibGUoXHJcbiAgICAgIHRoaXMuI2xvdHRvQW5hbHl0aWNzLnN0YXRpc3RpY3NSZXN1bHQsXHJcbiAgICApO1xyXG4gICAgSHRtbFRleHRJbmplY3RvcldpdGhHYW1lUmVzdWx0cy5pbmplY3RQcm9maXRSYXRlKFxyXG4gICAgICB0aGlzLiNsb3R0b0FuYWx5dGljcy5wcm9maXRSYXRlLFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLiRlbGVtZW50LnBvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICB9XHJcblxyXG4gICNhc3NpZ25FbGVtZW50KCkge1xyXG4gICAgdGhpcy4kZWxlbWVudCA9IHtcclxuICAgICAgcG9wdXBFbGVtZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKSxcclxuICAgICAgYnRuQ2xvc2VQb3B1cEVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tY2xvc2UtcG9wdXAnKSxcclxuICAgICAgYnRuUmVzdGFydEVsZW1lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tcmVzdGFydCcpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gICNhZGRFdmVudCgpIHtcclxuICAgIHRoaXMuJGVsZW1lbnQuYnRuQ2xvc2VQb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+XHJcbiAgICAgIHRoaXMuI2hpZGVQb3B1cChldmVudCksXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuJGVsZW1lbnQuYnRuUmVzdGFydEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+XHJcbiAgICAgIHRoaXMuI3Jlc3RhcnRHYW1lKGV2ZW50KSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHJcbiAgICovXHJcbiAgI2hpZGVQb3B1cChldmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBjaGFuZ2VDbGFzc0Fib3V0R2FtZVN0ZXAoJ3dpbm5pbmcnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcclxuICAgKi9cclxuICAjcmVzdGFydEdhbWUoZXZlbnQpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgIHJlY292ZXJ5SW5pdGlhbFN0YXRlRXhjZXB0UGF5bWVudCgpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBheW1lbnQtYW1vdW50X19mb3JtJykucmVzZXQoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFN0YXRpc3RpY3NQb3B1cENvbnRyb2xsZXI7XHJcbiIsImltcG9ydCBMb3R0b1Jlc3VsdHNIZWxwZXIgZnJvbSAnLi4vLi4vZG9tYWlucy9Mb3R0b1Jlc3VsdHNIZWxwZXInO1xyXG5pbXBvcnQgSHRtbFRleHRJbmplY3RvcldpdGhDb25zdGFudHMgZnJvbSAnLi9IdG1sVGV4dEluamVjdG9yV2l0aENvbnN0YW50cyc7XHJcbmltcG9ydCBMb3R0b01hY2hpbmVHZW5lcmF0b3IgZnJvbSAnLi9Mb3R0b01hY2hpbmVHZW5lcmF0b3InO1xyXG5pbXBvcnQgV2lubmluZ0xvdHRvQW5kQm9udXNHZW5lcmF0b3IgZnJvbSAnLi9XaW5uaW5nTG90dG9BbmRCb251c0dlbmVyYXRvcic7XHJcblxyXG5jbGFzcyBXZWJMb3R0b0dhbWVDb250cm9sbGVyIHtcclxuICAjbG90dG9SZXN1bHRzSGVscGVyID0gbmV3IExvdHRvUmVzdWx0c0hlbHBlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuI3NldFRleHRDb250ZXh0V2l0aENvbnN0YW50cygpO1xyXG4gICAgdGhpcy4jaGFuZGxlTG90dG9NYWNoaW5lR2VuZXJhdG9yKCk7XHJcbiAgfVxyXG5cclxuICAjc2V0VGV4dENvbnRleHRXaXRoQ29uc3RhbnRzKCkge1xyXG4gICAgSHRtbFRleHRJbmplY3RvcldpdGhDb25zdGFudHMuaW5qZWN0b3JUZXh0KCk7XHJcbiAgfVxyXG5cclxuICAjaGFuZGxlTG90dG9NYWNoaW5lR2VuZXJhdG9yKCkge1xyXG4gICAgbmV3IExvdHRvTWFjaGluZUdlbmVyYXRvcih0aGlzLiNsb3R0b1Jlc3VsdHNIZWxwZXIpO1xyXG4gICAgbmV3IFdpbm5pbmdMb3R0b0FuZEJvbnVzR2VuZXJhdG9yKHRoaXMuI2xvdHRvUmVzdWx0c0hlbHBlcik7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFdlYkxvdHRvR2FtZUNvbnRyb2xsZXI7XHJcbiIsImltcG9ydCB7IE5VTUJFUl9ERUxJTUlURVIgfSBmcm9tICcuLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgU3RhdGlzdGljc1BvcHVwQ29udHJvbGxlciBmcm9tICcuL1N0YXRpc3RpY3NQb3B1cENvbnRyb2xsZXInO1xyXG5cclxuaW1wb3J0IHsgY2hhbmdlQ2xhc3NBYm91dEdhbWVTdGVwLCBoYW5kbGVFcnJvck1lc3NhZ2UgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmNsYXNzIFdpbm5pbmdMb3R0b0FuZEJvbnVzR2VuZXJhdG9yIHtcclxuICAjbG90dG9SZXN1bHRzSGVscGVyO1xyXG5cclxuICAkd2lubmluZ0NyaXRlcmlhRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgJy53aW5uaW5nLWNyaXRlcmlhX19mb3JtJyxcclxuICApO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bG90dG9SZXN1bHRzSGVscGVyfSBsb3R0b1Jlc3VsdHNIZWxwZXJcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihsb3R0b1Jlc3VsdHNIZWxwZXIpIHtcclxuICAgIHRoaXMuI2xvdHRvUmVzdWx0c0hlbHBlciA9IGxvdHRvUmVzdWx0c0hlbHBlcjtcclxuICAgIHRoaXMuI2FkZEV2ZW50KCk7XHJcbiAgfVxyXG5cclxuICAjZ2V0TnVtYmVycygpIHtcclxuICAgIGNvbnN0IGxvdHRvTnVtYmVyVmFsdWVzID0gQXJyYXkuZnJvbShcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndpbm5pbmctY3JpdGVyaWFfX2Zvcm0tbG90dG8tbnVtYmVycyBpbnB1dCcpLFxyXG4gICAgKS5tYXAoKGlucHV0KSA9PiBpbnB1dC52YWx1ZSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbG90dG9OdW1iZXJWYWx1ZXM6IGxvdHRvTnVtYmVyVmFsdWVzLmpvaW4oTlVNQkVSX0RFTElNSVRFUiksXHJcbiAgICAgIGJvbnVzTnVtYmVyVmFsdWVzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXQtYm9udXMtbnVtYmVyJykudmFsdWUsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgI2dlbmVyYXRlV2lubmluZ0xvdHRvQW5kQm9udXMoKSB7XHJcbiAgICBjb25zdCB7IGxvdHRvTnVtYmVyVmFsdWVzLCBib251c051bWJlclZhbHVlcyB9ID0gdGhpcy4jZ2V0TnVtYmVycygpO1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcud2lubmluZy1jcml0ZXJpYSAubWVzc2FnZS1lcnJvcicsXHJcbiAgICApO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMuI2xvdHRvUmVzdWx0c0hlbHBlci5nZW5lcmF0ZVdpbm5pbmdMb3R0byhsb3R0b051bWJlclZhbHVlcyk7XHJcbiAgICAgIHRoaXMuI2xvdHRvUmVzdWx0c0hlbHBlci5nZW5lcmF0ZUJvbnVzKGJvbnVzTnVtYmVyVmFsdWVzKTtcclxuXHJcbiAgICAgIGhhbmRsZUVycm9yTWVzc2FnZShlcnJvck1lc3NhZ2VFbGVtZW50KTtcclxuXHJcbiAgICAgIHRoaXMuI2xvdHRvUmVzdWx0c0hlbHBlci5jYWxjdWxhdGVNYXRjaGluZ1Jlc3VsdHMoKTtcclxuXHJcbiAgICAgIGNoYW5nZUNsYXNzQWJvdXRHYW1lU3RlcCgnc3RhdGlzdGljcycpO1xyXG4gICAgICBuZXcgU3RhdGlzdGljc1BvcHVwQ29udHJvbGxlcih0aGlzLiNsb3R0b1Jlc3VsdHNIZWxwZXIpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgaGFuZGxlRXJyb3JNZXNzYWdlKGVycm9yTWVzc2FnZUVsZW1lbnQsIGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICNhZGRFdmVudCgpIHtcclxuICAgIHRoaXMuJHdpbm5pbmdDcml0ZXJpYUZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT5cclxuICAgICAgdGhpcy4jaGFuZGxlU3VibWl0VG9HZXRTdGF0aXN0aWNzKGV2ZW50KSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAjbW92ZVNjcm9sbFRvVG9wKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLnNjcm9sbFRvcCA9IDA7XHJcbiAgfVxyXG5cclxuICAjaGFuZGxlU3VibWl0VG9HZXRTdGF0aXN0aWNzKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHRoaXMuI21vdmVTY3JvbGxUb1RvcCgpO1xyXG4gICAgdGhpcy4jZ2VuZXJhdGVXaW5uaW5nTG90dG9BbmRCb251cygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2lubmluZ0xvdHRvQW5kQm9udXNHZW5lcmF0b3I7XHJcbiIsImltcG9ydCB7IEVSUk9SX1BSRUZJWCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEdBTUVfU1RFUCB9IGZyb20gJy4uL2NvbnN0YW50cy9nYW1lU3RlcCc7XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSB7RXJyb3J8dW5kZWZpbmVkfSBlcnJvclxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGhhbmRsZUVycm9yTWVzc2FnZSA9IChlbGVtZW50LCBlcnJvcikgPT4ge1xyXG4gIGNvbnN0IHRleHQgPSBlcnJvciA/IGVycm9yLm1lc3NhZ2UucmVwbGFjZShFUlJPUl9QUkVGSVgsICcnKSA6ICcnO1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gIGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7XCJwYXltZW50XCJ8XCJ3aW5uaW5nXCJ8XCJzdGF0aXN0aWNzXCJ9IHN0ZXBcclxuICovXHJcbmV4cG9ydCBjb25zdCBjaGFuZ2VDbGFzc0Fib3V0R2FtZVN0ZXAgPSAoc3RlcCkgPT4ge1xyXG4gIGNvbnN0IGFwcElubmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAgLmlubmVyJyk7XHJcblxyXG4gIGFwcElubmVyRWxlbWVudC5jbGFzc05hbWUgPSBgaW5uZXIgJHtHQU1FX1NURVBbc3RlcF19YDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDqtazrp6Qg6riI7JWh7J20IOuLrOudvOyhjOqxsOuCmCwg6rKM7J6E7J2EIOy0iOq4sO2ZlCDtlaDrlYwg6rWs66ek6riI7JWh7J2EIOygnOyZuO2VnCDrgpjrqLjsp4Drk6TsnYQg7LSI6riwIOyDge2DnOuhnCDrj4zrpqzripQg66Gc7KeBXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVjb3ZlcnlJbml0aWFsU3RhdGVFeGNlcHRQYXltZW50ID0gKCkgPT4ge1xyXG4gIGlmIChcclxuICAgICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwIC5pbm5lcicpLmNsYXNzTGlzdC5jb250YWlucyhHQU1FX1NURVAucGF5bWVudClcclxuICApIHtcclxuICAgIGNoYW5nZUNsYXNzQWJvdXRHYW1lU3RlcCgncGF5bWVudCcpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbm5pbmctY3JpdGVyaWFfX2Zvcm0nKT8ucmVzZXQoKTtcclxuICB9XHJcbn07XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAjYXBwIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICB3aWR0aDogMTAwdnc7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICBtYXgtd2lkdGg6IDE0NDBweDtcclxuICBtaW4taGVpZ2h0OiAxMDI0cHg7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1sb3R0by1mb250RmFtaWx5KTtcclxuICBmb250LXNpemU6IHZhcigtLWxvdHRvLWJvZHlBbmRQbGFjZWhvbGRlci1mb250U2l6ZSk7XHJcbiAgZm9udC13ZWlnaHQ6IHZhcigtLWxvdHRvLWJvZHlBbmRQbGFjZWhvbGRlci1mb250V2VpZ2h0KTtcclxuICBsaW5lLWhlaWdodDogdmFyKC0tbG90dG8tYm9keUFuZFBsYWNlaG9sZGVyLWxpbmVIZWlnaHQpO1xyXG4gIGNvbG9yOiB2YXIoLS1sb3R0by1ncmV5U2NhbGU1LWNvbG9yKTtcclxuICBsaW5lLWhlaWdodDogMjRweDtcclxuICB6LWluZGV4OiAwO1xyXG59XHJcblxyXG4jYXBwID4gLmlubmVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgd2lkdGg6IGluaGVyaXQ7XHJcbiAgaGVpZ2h0OiBpbmhlcml0O1xyXG4gIG1pbi1oZWlnaHQ6IGluaGVyaXQ7XHJcbiAgbWF4LXdpZHRoOiBpbmhlcml0O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbn1cclxuXHJcbiNhcHAgPiAuaW5uZXIgPiBoZWFkZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb3R0by1wcmltYXJ5LWNvbG9yKTtcclxuICBoZWlnaHQ6IDY0cHg7XHJcblxyXG4gIGgxIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMzBweDtcclxuICAgIGZvbnQtc2l6ZTogdmFyKC0tbG90dG8tdGl0bGUtZm9udFNpemUpO1xyXG4gICAgZm9udC13ZWlnaHQ6IHZhcigtLWxvdHRvLXRpdGxlLWZvbnRXZWlnaHQpO1xyXG4gICAgbGluZS1oZWlnaHQ6IHZhcigtLWxvdHRvLXRpdGxlLWxpbmVIZWlnaHQpO1xyXG4gICAgY29sb3I6IHZhcigtLWxvdHRvLWdyZXlTY2FsZTEtY29sb3IpO1xyXG4gIH1cclxufVxyXG4jYXBwIGZvb3RlciB7XHJcbiAgbGluZS1oZWlnaHQ6IDgwcHg7XHJcbiAgaGVpZ2h0OiA4MHB4O1xyXG4gIG1hcmdpbi10b3A6IGF1dG87XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEodmFyKC0tbG90dG8tcHJpbWFyeS1jb2xvci1yZ2IpLCAwLjIpO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogdmFyKC0tbG90dG8tcHJpbWFyeS1jb2xvcik7XHJcbiAgZm9udC1zaXplOiB2YXIoLS1sb3R0by1jYXB0aW9uLWZvbnRTaXplKTtcclxuICBmb250LXdlaWdodDogdmFyKC0tbG90dG8tY2FwdGlvbi1mb250V2VpZ2h0KTtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAjYXBwIHtcclxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgIG1pbi1oZWlnaHQ6IDEwMHZoO1xyXG4gIH1cclxuXHJcbiAgI2FwcCA+IC5pbm5lciA+IGhlYWRlciB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB9XHJcblxyXG4gICNhcHAgLnBvcHVwIHtcclxuICAgIGhlaWdodDogY2FsYygxMDB2aCArIDUwcHgpO1xyXG4gIH1cclxufVxyXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy93ZWIvY3NzL19hcHAuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsMkJBQTJCO0VBQzNCLFlBQVk7RUFDWixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osb0NBQW9DO0VBQ3BDLG1EQUFtRDtFQUNuRCx1REFBdUQ7RUFDdkQsdURBQXVEO0VBQ3ZELG9DQUFvQztFQUNwQyxpQkFBaUI7RUFDakIsVUFBVTtBQUNaOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsNENBQTRDO0VBQzVDLFlBQVk7O0VBRVo7SUFDRSxrQkFBa0I7SUFDbEIsc0NBQXNDO0lBQ3RDLDBDQUEwQztJQUMxQywwQ0FBMEM7SUFDMUMsb0NBQW9DO0VBQ3RDO0FBQ0Y7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQixZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLCtEQUErRDtFQUMvRCxrQkFBa0I7RUFDbEIsaUNBQWlDO0VBQ2pDLHdDQUF3QztFQUN4Qyw0Q0FBNEM7QUFDOUM7O0FBRUE7RUFDRTtJQUNFLGtCQUFrQjtJQUNsQixpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSx1QkFBdUI7RUFDekI7O0VBRUE7SUFDRSwwQkFBMEI7RUFDNUI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIjYXBwIHtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gIG1heC13aWR0aDogMTQ0MHB4O1xcclxcbiAgbWluLWhlaWdodDogMTAyNHB4O1xcclxcbiAgbWFyZ2luOiBhdXRvO1xcclxcbiAgZm9udC1mYW1pbHk6IHZhcigtLWxvdHRvLWZvbnRGYW1pbHkpO1xcclxcbiAgZm9udC1zaXplOiB2YXIoLS1sb3R0by1ib2R5QW5kUGxhY2Vob2xkZXItZm9udFNpemUpO1xcclxcbiAgZm9udC13ZWlnaHQ6IHZhcigtLWxvdHRvLWJvZHlBbmRQbGFjZWhvbGRlci1mb250V2VpZ2h0KTtcXHJcXG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS1sb3R0by1ib2R5QW5kUGxhY2Vob2xkZXItbGluZUhlaWdodCk7XFxyXFxuICBjb2xvcjogdmFyKC0tbG90dG8tZ3JleVNjYWxlNS1jb2xvcik7XFxyXFxuICBsaW5lLWhlaWdodDogMjRweDtcXHJcXG4gIHotaW5kZXg6IDA7XFxyXFxufVxcclxcblxcclxcbiNhcHAgPiAuaW5uZXIge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgd2lkdGg6IGluaGVyaXQ7XFxyXFxuICBoZWlnaHQ6IGluaGVyaXQ7XFxyXFxuICBtaW4taGVpZ2h0OiBpbmhlcml0O1xcclxcbiAgbWF4LXdpZHRoOiBpbmhlcml0O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxyXFxufVxcclxcblxcclxcbiNhcHAgPiAuaW5uZXIgPiBoZWFkZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb3R0by1wcmltYXJ5LWNvbG9yKTtcXHJcXG4gIGhlaWdodDogNjRweDtcXHJcXG5cXHJcXG4gIGgxIHtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDEzMHB4O1xcclxcbiAgICBmb250LXNpemU6IHZhcigtLWxvdHRvLXRpdGxlLWZvbnRTaXplKTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IHZhcigtLWxvdHRvLXRpdGxlLWZvbnRXZWlnaHQpO1xcclxcbiAgICBsaW5lLWhlaWdodDogdmFyKC0tbG90dG8tdGl0bGUtbGluZUhlaWdodCk7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1sb3R0by1ncmV5U2NhbGUxLWNvbG9yKTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuI2FwcCBmb290ZXIge1xcclxcbiAgbGluZS1oZWlnaHQ6IDgwcHg7XFxyXFxuICBoZWlnaHQ6IDgwcHg7XFxyXFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcclxcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEodmFyKC0tbG90dG8tcHJpbWFyeS1jb2xvci1yZ2IpLCAwLjIpO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgY29sb3I6IHZhcigtLWxvdHRvLXByaW1hcnktY29sb3IpO1xcclxcbiAgZm9udC1zaXplOiB2YXIoLS1sb3R0by1jYXB0aW9uLWZvbnRTaXplKTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiB2YXIoLS1sb3R0by1jYXB0aW9uLWZvbnRXZWlnaHQpO1xcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xcclxcbiAgI2FwcCB7XFxyXFxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcXHJcXG4gICAgbWluLWhlaWdodDogMTAwdmg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjYXBwID4gLmlubmVyID4gaGVhZGVyIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjYXBwIC5wb3B1cCB7XFxyXFxuICAgIGhlaWdodDogY2FsYygxMDB2aCArIDUwcHgpO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGJ1dHRvbiB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbG90dG8tcHJpbWFyeS1jb2xvcik7XHJcbiAgY29sb3I6IHZhcigtLWxvdHRvLWdyZXlTY2FsZTEtY29sb3IpO1xyXG4gIHBhZGRpbmc6IDZweCA2cHggNnB4IDhweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbmJ1dHRvbjpkaXNhYmxlZCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbG90dG8tZ3JleVNjYWxlMy1jb2xvcik7XHJcbn1cclxuXHJcbmlucHV0IHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1sb3R0by1ncmV5U2NhbGUzLWNvbG9yKTtcclxufVxyXG5cclxuZm9ybSBsYWJlbCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xyXG59XHJcbi5oaWRkZW4ge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi5tZXNzYWdlLWVycm9yIHtcclxuICBoZWlnaHQ6IDIwcHg7XHJcbiAgbWFyZ2luOiA1cHggMDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgZm9udC13ZWlnaHQ6IHZhcihsb3R0by1jYXB0aW9uLWZvbnRXZWlnaHQpO1xyXG4gIGxpbmUtaGVpZ2h0OiB2YXIobG90dG8tY2FwdGlvbi1saW5lSGVpZ2h0KTtcclxuICBjb2xvcjogcmdiKDIzNiwgODQsIDg0KTtcclxufVxyXG5cclxuLnNoYWRvdyB7XHJcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMHB4IDE1cHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xOSk7XHJcbiAgYm94LXNoYWRvdzogMHB4IDBweCAxNXB4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTkpO1xyXG59XHJcblxyXG4uc2NyZWVuLXJlYWRlci1vbmx5IHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAtOTk5OXB4O1xyXG4gIGxlZnQ6IC05OTk5cHg7XHJcbn1cclxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvd2ViL2Nzcy9fY29tbW9uLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLDRDQUE0QztFQUM1QyxvQ0FBb0M7RUFDcEMsd0JBQXdCO0VBQ3hCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsK0NBQStDO0FBQ2pEOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQiwrQ0FBK0M7QUFDakQ7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsZUFBZTtFQUNmLDBDQUEwQztFQUMxQywwQ0FBMEM7RUFDMUMsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0Usd0RBQXdEO0VBQ3hELGdEQUFnRDtBQUNsRDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJ1dHRvbiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb3R0by1wcmltYXJ5LWNvbG9yKTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1sb3R0by1ncmV5U2NhbGUxLWNvbG9yKTtcXHJcXG4gIHBhZGRpbmc6IDZweCA2cHggNnB4IDhweDtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbmJ1dHRvbjpkaXNhYmxlZCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb3R0by1ncmV5U2NhbGUzLWNvbG9yKTtcXHJcXG59XFxyXFxuXFxyXFxuaW5wdXQge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWxvdHRvLWdyZXlTY2FsZTMtY29sb3IpO1xcclxcbn1cXHJcXG5cXHJcXG5mb3JtIGxhYmVsIHtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDRweDtcXHJcXG59XFxyXFxuLmhpZGRlbiB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVzc2FnZS1lcnJvciB7XFxyXFxuICBoZWlnaHQ6IDIwcHg7XFxyXFxuICBtYXJnaW46IDVweCAwO1xcclxcbiAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgZm9udC13ZWlnaHQ6IHZhcihsb3R0by1jYXB0aW9uLWZvbnRXZWlnaHQpO1xcclxcbiAgbGluZS1oZWlnaHQ6IHZhcihsb3R0by1jYXB0aW9uLWxpbmVIZWlnaHQpO1xcclxcbiAgY29sb3I6IHJnYigyMzYsIDg0LCA4NCk7XFxyXFxufVxcclxcblxcclxcbi5zaGFkb3cge1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMHB4IDE1cHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xOSk7XFxyXFxuICBib3gtc2hhZG93OiAwcHggMHB4IDE1cHggNXB4IHJnYmEoMCwgMCwgMCwgMC4xOSk7XFxyXFxufVxcclxcblxcclxcbi5zY3JlZW4tcmVhZGVyLW9ubHkge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgdG9wOiAtOTk5OXB4O1xcclxcbiAgbGVmdDogLTk5OTlweDtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL19zdHlsZS1jb25zdGFudHMuY3NzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYG1haW4ge1xyXG4gIHdpZHRoOiBpbmhlcml0O1xyXG4gIG1pbi1oZWlnaHQ6IGZpdC1jb250ZW50O1xyXG4gIG1heC13aWR0aDogaW5oZXJpdDtcclxuICBmbGV4LWdyb3c6IDE7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxvdHRvLWdyZXlTY2FsZTItY29sb3IpO1xyXG59XHJcblxyXG5tYWluIC5jb250ZW50cyB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiB2YXIoLS1jb250ZW50cy13aWR0aCk7XHJcbiAgaGVpZ2h0OiA3MjdweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb3R0by1ncmV5U2NhbGUxLWNvbG9yKTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjMDAwMDAwMWY7XHJcbiAgcGFkZGluZzogMCAxNnB4O1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbm1haW4gLmNvbnRlbnRzID4gc2VjdGlvbiB7XHJcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGVudHMtd2lkdGgpIC0gMTZweCAqIDIpO1xyXG59XHJcblxyXG5tYWluIC5jb250ZW50cyA+IGhlYWRlciB7XHJcbiAgZm9udC13ZWlnaHQ6IHZhcigtLWxvdHRvLXRpdGxlLWZvbnRXZWlnaHQpO1xyXG4gIGZvbnQtc2l6ZTogdmFyKC0tbG90dG8tdGl0bGUtZm9udFNpemUpO1xyXG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS1sb3R0by10aXRsZS1saW5lSGVpZ2h0KTtcclxuICBwYWRkaW5nLXRvcDogNDBweDtcclxuICBwYWRkaW5nLWJvdHRvbTogMjhweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5pY29uLXRvZ2dsZS1ydWxlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBpbml0aWFsO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgd2lkdGg6IG1heC1jb250ZW50O1xyXG59XHJcblxyXG4ucGF5bWVudC1hbW91bnQge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBoZWlnaHQ6IDY0cHg7XHJcbiAgLmlucHV0Rm9ybSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICB9XHJcblxyXG4gIGlucHV0LFxyXG4gIC5idG4tcGF5LWxvdHRvIHtcclxuICAgIGhlaWdodDogMzZweDtcclxuICB9XHJcblxyXG4gIGlucHV0IHtcclxuICAgIHdpZHRoOiAzMTBweDtcclxuICAgIHBhZGRpbmc6IDRweCA4cHg7XHJcbiAgfVxyXG5cclxuICBpbnB1dDo6cGxhY2Vob2xkZXIge1xyXG4gICAgY29sb3I6IHZhcigtLWxvdHRvLWdyZXlTY2FsZTQtY29sb3IpO1xyXG4gICAgaGVpZ2h0OiAyNHB4O1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gIH1cclxuXHJcbiAgLmljb24tdG9nZ2xlLXJ1bGUge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAtNXB4O1xyXG4gICAgcmlnaHQ6IDE2cHg7XHJcbiAgfVxyXG59XHJcblxyXG4ucGF5bWVudC1hbW91bnRfX2V4cGxhbmF0aW9uIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIHJpZ2h0OiAtMTdweDtcclxufVxyXG5cclxuLnBheW1lbnQtYW1vdW50X19mb3JtID4gZGl2IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuLnB1cmNoYXNlLWhpc3Rvcnkge1xyXG4gIG1hcmdpbi10b3A6IDI4cHg7XHJcbiAgLmlzc3VlZC1sb3R0b3Mge1xyXG4gICAgbWFyZ2luLXRvcDogOHB4O1xyXG4gICAgbWF4LWhlaWdodDogMjYwcHg7XHJcbiAgICBoZWlnaHQ6IGZpdC1jb250ZW50O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgfVxyXG5cclxuICBsaSB7XHJcbiAgICBoZWlnaHQ6IDM2cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMzZweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgfVxyXG5cclxuICAubnVtYmVyIHtcclxuICAgIHdpZHRoOiAzMnB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLm51bWJlcjo6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6ICcsJztcclxuICB9XHJcblxyXG4gIC5udW1iZXI6bnRoLWNoaWxkKDIpIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAycHg7XHJcbiAgfVxyXG5cclxuICAubnVtYmVyOm50aC1jaGlsZCgyKTo6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gIH1cclxufVxyXG5cclxuLndpbm5pbmctY3JpdGVyaWEge1xyXG4gIG1hcmdpbi10b3A6IDI0cHg7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvdHRvbTogMjdweDtcclxufVxyXG5cclxuLndpbm5pbmctY3JpdGVyaWEgPiBkaXY6bnRoLWNoaWxkKDIpIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG4ud2lubmluZy1jcml0ZXJpYV9fZXhwbGFuYXRpb24ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgcmlnaHQ6IDA7XHJcbn1cclxuXHJcbi53aW5uaW5nLWNyaXRlcmlhX19leHBsYW5hdGlvbiBkaXY6bnRoLWNoaWxkKDIpIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgaGVpZ2h0OiAyNHB4O1xyXG59XHJcblxyXG4ud2lubmluZy1jcml0ZXJpYV9fZm9ybSB7XHJcbiAgc2VjdGlvbiB7XHJcbiAgICBoZWlnaHQ6IDY4cHg7XHJcbiAgICBoZWFkZXIge1xyXG4gICAgICBmb250LXNpemU6IHZhcigtLWxvdHRvLWJvZHlBbmRQbGFjZWhvbGRlci1mb250U2l6ZSk7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1sb3R0by1ib2R5QW5kUGxhY2Vob2xkZXItZm9udFdlaWdodCk7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS1sb3R0by1ib2R5QW5kUGxhY2Vob2xkZXItbGluZUhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQge1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDVweDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi53aW5uaW5nLWNyaXRlcmlhX19pbnB1dC1ncm91cC1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG59XHJcblxyXG4ud2lubmluZy1jcml0ZXJpYV9fZm9ybS1sb3R0by1udW1iZXJzIHtcclxuICB3aWR0aDogZml0LWNvbnRlbnQ7XHJcbiAgbWFyZ2luLXRvcDogNHB4O1xyXG4gIC5pbnB1dC1ncm91cCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgd2lkdGg6IGluaGVyaXQ7XHJcbiAgICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgfVxyXG5cclxuICAuaW5wdXQtZ3JvdXAge1xyXG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xyXG4gIH1cclxuXHJcbiAgaW5wdXQge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbiAgfVxyXG5cclxuICBpbnB1dDpsYXN0LWNoaWxkIHtcclxuICAgIG1hcmdpbi1yaWdodDogMDtcclxuICB9XHJcbn1cclxuXHJcbi53aW5uaW5nLWNyaXRlcmlhX19mb3JtLWJvbnVzLW51bWJlciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiA5MHB4O1xyXG5cclxuICBpbnB1dCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IGNhbGMoMjRweCArIDhweCk7XHJcbiAgICByaWdodDogMDtcclxuICB9XHJcbn1cclxuXHJcbi5pc3N1ZWQtbG90dG9zIHtcclxuICBsaSB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxcHg7XHJcbiAgfVxyXG59XHJcblxyXG4uYnRuLWNoZWNrLXJlc3VsdCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQyNXB4KSB7XHJcbiAgbWFpbiAuY29udGVudHMge1xyXG4gICAgd2lkdGg6IHZhcigtLWNvbnRlbnRzLXNtYWxsLW1vYmlsZS13aWR0aCk7XHJcbiAgICBwYWRkaW5nOiAwIDdweDtcclxuICB9XHJcblxyXG4gIG1haW4gLmNvbnRlbnRzID4gc2VjdGlvbiB7XHJcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250ZW50cy1zbWFsbC1tb2JpbGUtd2lkdGgpIC0gMTRweCk7XHJcbiAgfVxyXG5cclxuICAucGF5bWVudC1hbW91bnQgaW5wdXQge1xyXG4gICAgd2lkdGg6IDI4MHB4O1xyXG4gIH1cclxuXHJcbiAgLndpbm5pbmctY3JpdGVyaWEge1xyXG4gICAgYm90dG9tOiAxMHB4O1xyXG4gIH1cclxuXHJcbiAgLndpbm5pbmctY3JpdGVyaWFfX2Zvcm0gc2VjdGlvbiBoZWFkZXIge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gIH1cclxuXHJcbiAgLndpbm5pbmctY3JpdGVyaWFfX2Zvcm0gc2VjdGlvbiBpbnB1dCB7XHJcbiAgICB3aWR0aDogMzhweDtcclxuICAgIHBhZGRpbmctbGVmdDogM3B4O1xyXG4gIH1cclxufVxyXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy93ZWIvY3NzL19jb250ZW50cy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSxjQUFjO0VBQ2QsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsK0NBQStDO0FBQ2pEOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLDRCQUE0QjtFQUM1QixhQUFhO0VBQ2IsK0NBQStDO0VBQy9DLDJCQUEyQjtFQUMzQixlQUFlO0VBQ2Ysc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsNkNBQTZDO0FBQy9DOztBQUVBO0VBQ0UsMENBQTBDO0VBQzFDLHNDQUFzQztFQUN0QywwQ0FBMEM7RUFDMUMsaUJBQWlCO0VBQ2pCLG9CQUFvQjtFQUNwQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsVUFBVTtFQUNWLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1o7SUFDRSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLDhCQUE4QjtFQUNoQzs7RUFFQTs7SUFFRSxZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxZQUFZO0lBQ1osZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0Usb0NBQW9DO0lBQ3BDLFlBQVk7SUFDWixZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULFdBQVc7RUFDYjtBQUNGOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCO0lBQ0UsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGdCQUFnQjtFQUNsQjs7RUFFQTtJQUNFLFlBQVk7SUFDWixpQkFBaUI7SUFDakIsYUFBYTtFQUNmOztFQUVBO0lBQ0UsV0FBVztJQUNYLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLFlBQVk7RUFDZDs7RUFFQTtJQUNFLGdCQUFnQjtFQUNsQjs7RUFFQTtJQUNFLFdBQVc7RUFDYjtBQUNGOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtBQUNkOztBQUVBO0VBQ0U7SUFDRSxZQUFZO0lBQ1o7TUFDRSxtREFBbUQ7TUFDbkQsdURBQXVEO01BQ3ZELHVEQUF1RDtJQUN6RDs7SUFFQTtNQUNFLFdBQVc7TUFDWCxZQUFZO01BQ1osaUJBQWlCO0lBQ25CO0VBQ0Y7QUFDRjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtFQUNmO0lBQ0UsYUFBYTtJQUNiLGNBQWM7SUFDZCxlQUFlO0VBQ2pCOztFQUVBO0lBQ0Usa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsZUFBZTtFQUNqQjtBQUNGOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7O0VBRVg7SUFDRSxrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLFFBQVE7RUFDVjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxrQkFBa0I7RUFDcEI7QUFDRjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFO0lBQ0UseUNBQXlDO0lBQ3pDLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSxzREFBc0Q7RUFDeEQ7O0VBRUE7SUFDRSxZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsV0FBVztJQUNYLGlCQUFpQjtFQUNuQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgJy4vX3N0eWxlLWNvbnN0YW50cy5jc3MnO1xcclxcblxcclxcbm1haW4ge1xcclxcbiAgd2lkdGg6IGluaGVyaXQ7XFxyXFxuICBtaW4taGVpZ2h0OiBmaXQtY29udGVudDtcXHJcXG4gIG1heC13aWR0aDogaW5oZXJpdDtcXHJcXG4gIGZsZXgtZ3JvdzogMTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb3R0by1ncmV5U2NhbGUyLWNvbG9yKTtcXHJcXG59XFxyXFxuXFxyXFxubWFpbiAuY29udGVudHMge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgd2lkdGg6IHZhcigtLWNvbnRlbnRzLXdpZHRoKTtcXHJcXG4gIGhlaWdodDogNzI3cHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb3R0by1ncmV5U2NhbGUxLWNvbG9yKTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDAwMDAxZjtcXHJcXG4gIHBhZGRpbmc6IDAgMTZweDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbm1haW4gLmNvbnRlbnRzID4gc2VjdGlvbiB7XFxyXFxuICB3aWR0aDogY2FsYyh2YXIoLS1jb250ZW50cy13aWR0aCkgLSAxNnB4ICogMik7XFxyXFxufVxcclxcblxcclxcbm1haW4gLmNvbnRlbnRzID4gaGVhZGVyIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiB2YXIoLS1sb3R0by10aXRsZS1mb250V2VpZ2h0KTtcXHJcXG4gIGZvbnQtc2l6ZTogdmFyKC0tbG90dG8tdGl0bGUtZm9udFNpemUpO1xcclxcbiAgbGluZS1oZWlnaHQ6IHZhcigtLWxvdHRvLXRpdGxlLWxpbmVIZWlnaHQpO1xcclxcbiAgcGFkZGluZy10b3A6IDQwcHg7XFxyXFxuICBwYWRkaW5nLWJvdHRvbTogMjhweDtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmljb24tdG9nZ2xlLXJ1bGUge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogaW5pdGlhbDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICB3aWR0aDogbWF4LWNvbnRlbnQ7XFxyXFxufVxcclxcblxcclxcbi5wYXltZW50LWFtb3VudCB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBoZWlnaHQ6IDY0cHg7XFxyXFxuICAuaW5wdXRGb3JtIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgfVxcclxcblxcclxcbiAgaW5wdXQsXFxyXFxuICAuYnRuLXBheS1sb3R0byB7XFxyXFxuICAgIGhlaWdodDogMzZweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIGlucHV0IHtcXHJcXG4gICAgd2lkdGg6IDMxMHB4O1xcclxcbiAgICBwYWRkaW5nOiA0cHggOHB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgaW5wdXQ6OnBsYWNlaG9sZGVyIHtcXHJcXG4gICAgY29sb3I6IHZhcigtLWxvdHRvLWdyZXlTY2FsZTQtY29sb3IpO1xcclxcbiAgICBoZWlnaHQ6IDI0cHg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5pY29uLXRvZ2dsZS1ydWxlIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IC01cHg7XFxyXFxuICAgIHJpZ2h0OiAxNnB4O1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4ucGF5bWVudC1hbW91bnRfX2V4cGxhbmF0aW9uIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIHJpZ2h0OiAtMTdweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBheW1lbnQtYW1vdW50X19mb3JtID4gZGl2IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxufVxcclxcblxcclxcbi5wdXJjaGFzZS1oaXN0b3J5IHtcXHJcXG4gIG1hcmdpbi10b3A6IDI4cHg7XFxyXFxuICAuaXNzdWVkLWxvdHRvcyB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDhweDtcXHJcXG4gICAgbWF4LWhlaWdodDogMjYwcHg7XFxyXFxuICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICAgIG92ZXJmbG93LXk6IGF1dG87XFxyXFxuICB9XFxyXFxuXFxyXFxuICBsaSB7XFxyXFxuICAgIGhlaWdodDogMzZweDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDM2cHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubnVtYmVyIHtcXHJcXG4gICAgd2lkdGg6IDMycHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5udW1iZXI6OmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6ICcsJztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5udW1iZXI6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDJweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5udW1iZXI6bnRoLWNoaWxkKDIpOjpiZWZvcmUge1xcclxcbiAgICBjb250ZW50OiAnJztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLndpbm5pbmctY3JpdGVyaWEge1xcclxcbiAgbWFyZ2luLXRvcDogMjRweDtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIGJvdHRvbTogMjdweDtcXHJcXG59XFxyXFxuXFxyXFxuLndpbm5pbmctY3JpdGVyaWEgPiBkaXY6bnRoLWNoaWxkKDIpIHtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGhlaWdodDogMjRweDtcXHJcXG59XFxyXFxuXFxyXFxuLndpbm5pbmctY3JpdGVyaWFfX2V4cGxhbmF0aW9uIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIHJpZ2h0OiAwO1xcclxcbn1cXHJcXG5cXHJcXG4ud2lubmluZy1jcml0ZXJpYV9fZXhwbGFuYXRpb24gZGl2Om50aC1jaGlsZCgyKSB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBoZWlnaHQ6IDI0cHg7XFxyXFxufVxcclxcblxcclxcbi53aW5uaW5nLWNyaXRlcmlhX19mb3JtIHtcXHJcXG4gIHNlY3Rpb24ge1xcclxcbiAgICBoZWlnaHQ6IDY4cHg7XFxyXFxuICAgIGhlYWRlciB7XFxyXFxuICAgICAgZm9udC1zaXplOiB2YXIoLS1sb3R0by1ib2R5QW5kUGxhY2Vob2xkZXItZm9udFNpemUpO1xcclxcbiAgICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1sb3R0by1ib2R5QW5kUGxhY2Vob2xkZXItZm9udFdlaWdodCk7XFxyXFxuICAgICAgbGluZS1oZWlnaHQ6IHZhcigtLWxvdHRvLWJvZHlBbmRQbGFjZWhvbGRlci1saW5lSGVpZ2h0KTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBpbnB1dCB7XFxyXFxuICAgICAgd2lkdGg6IDQwcHg7XFxyXFxuICAgICAgaGVpZ2h0OiAzNnB4O1xcclxcbiAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi53aW5uaW5nLWNyaXRlcmlhX19pbnB1dC1ncm91cC1jb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG59XFxyXFxuXFxyXFxuLndpbm5pbmctY3JpdGVyaWFfX2Zvcm0tbG90dG8tbnVtYmVycyB7XFxyXFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxyXFxuICBtYXJnaW4tdG9wOiA0cHg7XFxyXFxuICAuaW5wdXQtZ3JvdXAge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICB3aWR0aDogaW5oZXJpdDtcXHJcXG4gICAgbWFyZ2luLXRvcDogOHB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmlucHV0LWdyb3VwIHtcXHJcXG4gICAgd2lkdGg6IGZpdC1jb250ZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgaW5wdXQge1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDhweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIGlucHV0Omxhc3QtY2hpbGQge1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi53aW5uaW5nLWNyaXRlcmlhX19mb3JtLWJvbnVzLW51bWJlciB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB3aWR0aDogOTBweDtcXHJcXG5cXHJcXG4gIGlucHV0IHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IGNhbGMoMjRweCArIDhweCk7XFxyXFxuICAgIHJpZ2h0OiAwO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4uaXNzdWVkLWxvdHRvcyB7XFxyXFxuICBsaSB7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDFweDtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLmJ0bi1jaGVjay1yZXN1bHQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQyNXB4KSB7XFxyXFxuICBtYWluIC5jb250ZW50cyB7XFxyXFxuICAgIHdpZHRoOiB2YXIoLS1jb250ZW50cy1zbWFsbC1tb2JpbGUtd2lkdGgpO1xcclxcbiAgICBwYWRkaW5nOiAwIDdweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIG1haW4gLmNvbnRlbnRzID4gc2VjdGlvbiB7XFxyXFxuICAgIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRlbnRzLXNtYWxsLW1vYmlsZS13aWR0aCkgLSAxNHB4KTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5wYXltZW50LWFtb3VudCBpbnB1dCB7XFxyXFxuICAgIHdpZHRoOiAyODBweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC53aW5uaW5nLWNyaXRlcmlhIHtcXHJcXG4gICAgYm90dG9tOiAxMHB4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLndpbm5pbmctY3JpdGVyaWFfX2Zvcm0gc2VjdGlvbiBoZWFkZXIge1xcclxcbiAgICBmb250LXNpemU6IDE0cHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAud2lubmluZy1jcml0ZXJpYV9fZm9ybSBzZWN0aW9uIGlucHV0IHtcXHJcXG4gICAgd2lkdGg6IDM4cHg7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogM3B4O1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC5zdGVwLXBheW1lbnQge1xyXG4gIC5wdXJjaGFzZS1oaXN0b3J5LFxyXG4gIC53aW5uaW5nLWNyaXRlcmlhLFxyXG4gIC5wb3B1cCB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxufVxyXG5cclxuLnN0ZXAtd2lubmluZyB7XHJcbiAgLnBvcHVwIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG59XHJcblxyXG4uc3RlcC1zdGF0aXN0aWNzIHtcclxuICAucG9wdXAge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICB9XHJcbn1cclxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvd2ViL2Nzcy9fZ2FtZVN0ZXAuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0U7OztJQUdFLGFBQWE7RUFDZjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxhQUFhO0VBQ2Y7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtFQUNmO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnN0ZXAtcGF5bWVudCB7XFxyXFxuICAucHVyY2hhc2UtaGlzdG9yeSxcXHJcXG4gIC53aW5uaW5nLWNyaXRlcmlhLFxcclxcbiAgLnBvcHVwIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLnN0ZXAtd2lubmluZyB7XFxyXFxuICAucG9wdXAge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4uc3RlcC1zdGF0aXN0aWNzIHtcXHJcXG4gIC5wb3B1cCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB9XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLnBvcHVwIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IGluaGVyaXQ7XHJcbiAgbWF4LXdpZHRoOiBpbmhlcml0O1xyXG4gIGhlaWdodDogaW5oZXJpdDtcclxuICBtaW4taGVpZ2h0OiBpbmhlcml0O1xyXG4gIHotaW5kZXg6IDEwO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLWxvdHRvLWdyZXlTY2FsZTUtY29sb3ItcmdiKSwgMjAlKTtcclxuXHJcbiAgLnBvcHVwX19pbm5lciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogMzUwcHg7XHJcbiAgICBoZWlnaHQ6IDUwMHB4O1xyXG4gICAgcGFkZGluZzogMzJweCAxNnB4IDQwcHggMTZweDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb3R0by1ncmV5U2NhbGUyLWNvbG9yKTtcclxuICB9XHJcblxyXG4gIC5idG4tY2xvc2UtcG9wdXAge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA4cHg7XHJcbiAgICByaWdodDogOHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcclxuICAgIGNvbG9yOiB2YXIoLS1sb3R0by1ncmV5U2NhbGU1LWNvbG9yKTtcclxuICB9XHJcbn1cclxuXHJcbi5wb3B1cF9fY29udGVudHMge1xyXG4gIGhlYWRlciB7XHJcbiAgICBmb250LXNpemU6IHZhcigtLWxvdHRvLXN1YnRpdGxlLWZvbnRTaXplKTtcclxuICAgIGZvbnQtd2VpZ2h0OiB2YXIoLS1sb3R0by1zdWJ0aXRsZS1mb250V2VpZ2h0KTtcclxuICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS1sb3R0by1zdWJ0aXRsZS1saW5lSGVpZ2h0KTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbn1cclxuXHJcbi5yYW5rLXN0YXRpc3RpY3Mge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbi10b3A6IDMzcHg7XHJcblxyXG4gIHRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAyNzRweDtcclxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1sb3R0by10YWJsZS1saW5lLWNvbG9yKTtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1sb3R0by10YWJsZS1saW5lLWNvbG9yKTtcclxuICB9XHJcblxyXG4gIHRoZWFkIHRoIHtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgfVxyXG5cclxuICB0ciB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbG90dG8tdGFibGUtbGluZS1jb2xvcik7XHJcbiAgICBoZWlnaHQ6IGNhbGMoMjRweCArIDE2cHgpO1xyXG4gICAgbGluZS1oZWlnaHQ6IGNhbGMoMjRweCArIDE2cHgpO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgdGJvZHkgdHI6bGFzdC1jaGlsZCB7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgfVxyXG59XHJcblxyXG4ucHJvZml0LXJhdGUtY29udGFpbmVyLFxyXG4uYnRuLXJlc3RhcnQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbi10b3A6IDMycHg7XHJcbn1cclxuXHJcbi5wcm9maXQtcmF0ZS1jb250YWluZXIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy93ZWIvY3NzL19wb3B1cC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87RUFDUCxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLDhEQUE4RDs7RUFFOUQ7SUFDRSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGFBQWE7SUFDYiw0QkFBNEI7SUFDNUIsc0JBQXNCO0lBQ3RCLCtDQUErQztFQUNqRDs7RUFFQTtJQUNFLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsVUFBVTtJQUNWLHlCQUF5QjtJQUN6QixvQ0FBb0M7RUFDdEM7QUFDRjs7QUFFQTtFQUNFO0lBQ0UseUNBQXlDO0lBQ3pDLDZDQUE2QztJQUM3Qyw2Q0FBNkM7SUFDN0Msa0JBQWtCO0VBQ3BCO0FBQ0Y7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCOztFQUVoQjtJQUNFLFdBQVc7SUFDWCxhQUFhO0lBQ2IsbURBQW1EO0lBQ25ELHNEQUFzRDtFQUN4RDs7RUFFQTtJQUNFLGdCQUFnQjtFQUNsQjs7RUFFQTtJQUNFLHNEQUFzRDtJQUN0RCx5QkFBeUI7SUFDekIsOEJBQThCO0lBQzlCLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLFlBQVk7RUFDZDtBQUNGOztBQUVBOztFQUVFLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnBvcHVwIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICB3aWR0aDogaW5oZXJpdDtcXHJcXG4gIG1heC13aWR0aDogaW5oZXJpdDtcXHJcXG4gIGhlaWdodDogaW5oZXJpdDtcXHJcXG4gIG1pbi1oZWlnaHQ6IGluaGVyaXQ7XFxyXFxuICB6LWluZGV4OiAxMDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLWxvdHRvLWdyZXlTY2FsZTUtY29sb3ItcmdiKSwgMjAlKTtcXHJcXG5cXHJcXG4gIC5wb3B1cF9faW5uZXIge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiAzNTBweDtcXHJcXG4gICAgaGVpZ2h0OiA1MDBweDtcXHJcXG4gICAgcGFkZGluZzogMzJweCAxNnB4IDQwcHggMTZweDtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbG90dG8tZ3JleVNjYWxlMi1jb2xvcik7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuYnRuLWNsb3NlLXBvcHVwIHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDhweDtcXHJcXG4gICAgcmlnaHQ6IDhweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgY29sb3I6IHZhcigtLWxvdHRvLWdyZXlTY2FsZTUtY29sb3IpO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4ucG9wdXBfX2NvbnRlbnRzIHtcXHJcXG4gIGhlYWRlciB7XFxyXFxuICAgIGZvbnQtc2l6ZTogdmFyKC0tbG90dG8tc3VidGl0bGUtZm9udFNpemUpO1xcclxcbiAgICBmb250LXdlaWdodDogdmFyKC0tbG90dG8tc3VidGl0bGUtZm9udFdlaWdodCk7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS1sb3R0by1zdWJ0aXRsZS1saW5lSGVpZ2h0KTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4ucmFuay1zdGF0aXN0aWNzIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWFyZ2luLXRvcDogMzNweDtcXHJcXG5cXHJcXG4gIHRhYmxlIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMjc0cHg7XFxyXFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1sb3R0by10YWJsZS1saW5lLWNvbG9yKTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWxvdHRvLXRhYmxlLWxpbmUtY29sb3IpO1xcclxcbiAgfVxcclxcblxcclxcbiAgdGhlYWQgdGgge1xcclxcbiAgICBmb250LXdlaWdodDogNjAwO1xcclxcbiAgfVxcclxcblxcclxcbiAgdHIge1xcclxcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tbG90dG8tdGFibGUtbGluZS1jb2xvcik7XFxyXFxuICAgIGhlaWdodDogY2FsYygyNHB4ICsgMTZweCk7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiBjYWxjKDI0cHggKyAxNnB4KTtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgfVxcclxcblxcclxcbiAgdGJvZHkgdHI6bGFzdC1jaGlsZCB7XFxyXFxuICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLnByb2ZpdC1yYXRlLWNvbnRhaW5lcixcXHJcXG4uYnRuLXJlc3RhcnQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBtYXJnaW4tdG9wOiAzMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucHJvZml0LXJhdGUtY29udGFpbmVyIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcclxuICAgdjIuMCB8IDIwMTEwMTI2XHJcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXHJcbiovXHJcblxyXG5odG1sLFxyXG5ib2R5LFxyXG5kaXYsXHJcbnNwYW4sXHJcbmFwcGxldCxcclxub2JqZWN0LFxyXG5pZnJhbWUsXHJcbmgxLFxyXG5oMixcclxuaDMsXHJcbmg0LFxyXG5oNSxcclxuaDYsXHJcbnAsXHJcbmJsb2NrcXVvdGUsXHJcbnByZSxcclxuYSxcclxuYWJicixcclxuYWNyb255bSxcclxuYWRkcmVzcyxcclxuYmlnLFxyXG5jaXRlLFxyXG5jb2RlLFxyXG5kZWwsXHJcbmRmbixcclxuZW0sXHJcbmltZyxcclxuaW5zLFxyXG5rYmQsXHJcbnEsXHJcbnMsXHJcbnNhbXAsXHJcbnNtYWxsLFxyXG5zdHJpa2UsXHJcbnN0cm9uZyxcclxuc3ViLFxyXG5zdXAsXHJcbnR0LFxyXG52YXIsXHJcbmIsXHJcbnUsXHJcbmksXHJcbmNlbnRlcixcclxuZGwsXHJcbmR0LFxyXG5kZCxcclxub2wsXHJcbnVsLFxyXG5saSxcclxuZmllbGRzZXQsXHJcbmZvcm0sXHJcbmxhYmVsLFxyXG5sZWdlbmQsXHJcbnRhYmxlLFxyXG5jYXB0aW9uLFxyXG50Ym9keSxcclxudGZvb3QsXHJcbnRoZWFkLFxyXG50cixcclxudGgsXHJcbnRkLFxyXG5hcnRpY2xlLFxyXG5hc2lkZSxcclxuY2FudmFzLFxyXG5kZXRhaWxzLFxyXG5lbWJlZCxcclxuZmlndXJlLFxyXG5maWdjYXB0aW9uLFxyXG5mb290ZXIsXHJcbmhlYWRlcixcclxuaGdyb3VwLFxyXG5tZW51LFxyXG5uYXYsXHJcbm91dHB1dCxcclxucnVieSxcclxuc2VjdGlvbixcclxuc3VtbWFyeSxcclxudGltZSxcclxubWFyayxcclxuYXVkaW8sXHJcbnZpZGVvIHtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxuICBib3JkZXI6IDA7XHJcbiAgZm9udC1zaXplOiAxMDAlO1xyXG4gIGZvbnQ6IGluaGVyaXQ7XHJcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xyXG59XHJcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cclxuYXJ0aWNsZSxcclxuYXNpZGUsXHJcbmRldGFpbHMsXHJcbmZpZ2NhcHRpb24sXHJcbmZpZ3VyZSxcclxuZm9vdGVyLFxyXG5oZWFkZXIsXHJcbmhncm91cCxcclxubWVudSxcclxubmF2LFxyXG5zZWN0aW9uIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5ib2R5IHtcclxuICBsaW5lLWhlaWdodDogMTtcclxufVxyXG5vbCxcclxudWwge1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbn1cclxuYmxvY2txdW90ZSxcclxucSB7XHJcbiAgcXVvdGVzOiBub25lO1xyXG59XHJcbmJsb2NrcXVvdGU6YmVmb3JlLFxyXG5ibG9ja3F1b3RlOmFmdGVyLFxyXG5xOmJlZm9yZSxcclxucTphZnRlciB7XHJcbiAgY29udGVudDogJyc7XHJcbiAgY29udGVudDogbm9uZTtcclxufVxyXG50YWJsZSB7XHJcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcclxuICBib3JkZXItc3BhY2luZzogMDtcclxufVxyXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy93ZWIvY3NzL19yZXNldC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUdDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFpRkUsU0FBUztFQUNULFVBQVU7RUFDVixTQUFTO0VBQ1QsZUFBZTtFQUNmLGFBQWE7RUFDYix3QkFBd0I7QUFDMUI7QUFDQSxnREFBZ0Q7QUFDaEQ7Ozs7Ozs7Ozs7O0VBV0UsY0FBYztBQUNoQjtBQUNBO0VBQ0UsY0FBYztBQUNoQjtBQUNBOztFQUVFLGdCQUFnQjtBQUNsQjtBQUNBOztFQUVFLFlBQVk7QUFDZDtBQUNBOzs7O0VBSUUsV0FBVztFQUNYLGFBQWE7QUFDZjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLGlCQUFpQjtBQUNuQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXHJcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXHJcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcclxcbiovXFxyXFxuXFxyXFxuaHRtbCxcXHJcXG5ib2R5LFxcclxcbmRpdixcXHJcXG5zcGFuLFxcclxcbmFwcGxldCxcXHJcXG5vYmplY3QsXFxyXFxuaWZyYW1lLFxcclxcbmgxLFxcclxcbmgyLFxcclxcbmgzLFxcclxcbmg0LFxcclxcbmg1LFxcclxcbmg2LFxcclxcbnAsXFxyXFxuYmxvY2txdW90ZSxcXHJcXG5wcmUsXFxyXFxuYSxcXHJcXG5hYmJyLFxcclxcbmFjcm9ueW0sXFxyXFxuYWRkcmVzcyxcXHJcXG5iaWcsXFxyXFxuY2l0ZSxcXHJcXG5jb2RlLFxcclxcbmRlbCxcXHJcXG5kZm4sXFxyXFxuZW0sXFxyXFxuaW1nLFxcclxcbmlucyxcXHJcXG5rYmQsXFxyXFxucSxcXHJcXG5zLFxcclxcbnNhbXAsXFxyXFxuc21hbGwsXFxyXFxuc3RyaWtlLFxcclxcbnN0cm9uZyxcXHJcXG5zdWIsXFxyXFxuc3VwLFxcclxcbnR0LFxcclxcbnZhcixcXHJcXG5iLFxcclxcbnUsXFxyXFxuaSxcXHJcXG5jZW50ZXIsXFxyXFxuZGwsXFxyXFxuZHQsXFxyXFxuZGQsXFxyXFxub2wsXFxyXFxudWwsXFxyXFxubGksXFxyXFxuZmllbGRzZXQsXFxyXFxuZm9ybSxcXHJcXG5sYWJlbCxcXHJcXG5sZWdlbmQsXFxyXFxudGFibGUsXFxyXFxuY2FwdGlvbixcXHJcXG50Ym9keSxcXHJcXG50Zm9vdCxcXHJcXG50aGVhZCxcXHJcXG50cixcXHJcXG50aCxcXHJcXG50ZCxcXHJcXG5hcnRpY2xlLFxcclxcbmFzaWRlLFxcclxcbmNhbnZhcyxcXHJcXG5kZXRhaWxzLFxcclxcbmVtYmVkLFxcclxcbmZpZ3VyZSxcXHJcXG5maWdjYXB0aW9uLFxcclxcbmZvb3RlcixcXHJcXG5oZWFkZXIsXFxyXFxuaGdyb3VwLFxcclxcbm1lbnUsXFxyXFxubmF2LFxcclxcbm91dHB1dCxcXHJcXG5ydWJ5LFxcclxcbnNlY3Rpb24sXFxyXFxuc3VtbWFyeSxcXHJcXG50aW1lLFxcclxcbm1hcmssXFxyXFxuYXVkaW8sXFxyXFxudmlkZW8ge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGJvcmRlcjogMDtcXHJcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXHJcXG4gIGZvbnQ6IGluaGVyaXQ7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxufVxcclxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXHJcXG5hcnRpY2xlLFxcclxcbmFzaWRlLFxcclxcbmRldGFpbHMsXFxyXFxuZmlnY2FwdGlvbixcXHJcXG5maWd1cmUsXFxyXFxuZm9vdGVyLFxcclxcbmhlYWRlcixcXHJcXG5oZ3JvdXAsXFxyXFxubWVudSxcXHJcXG5uYXYsXFxyXFxuc2VjdGlvbiB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuICBsaW5lLWhlaWdodDogMTtcXHJcXG59XFxyXFxub2wsXFxyXFxudWwge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZSxcXHJcXG5xIHtcXHJcXG4gIHF1b3Rlczogbm9uZTtcXHJcXG59XFxyXFxuYmxvY2txdW90ZTpiZWZvcmUsXFxyXFxuYmxvY2txdW90ZTphZnRlcixcXHJcXG5xOmJlZm9yZSxcXHJcXG5xOmFmdGVyIHtcXHJcXG4gIGNvbnRlbnQ6ICcnO1xcclxcbiAgY29udGVudDogbm9uZTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BVF9SVUxFX0lNUE9SVF8wX19fIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vX2NvbW1vbi5jc3NcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLmkoX19fQ1NTX0xPQURFUl9BVF9SVUxFX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLmV4cGxhbmF0aW9uIHtcclxuICB6LWluZGV4OiAxO1xyXG4gIHdpZHRoOiBmaXQtY29udGVudDtcclxufVxyXG5cclxuLmV4cGxhbmF0aW9uOmhvdmVyIHtcclxuICAucnVsZSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcbn1cclxuXHJcbi5ydWxlIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IGNhbGMoMTdweCArIDdweCk7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbG90dG8tZ3JleVNjYWxlMS1jb2xvcik7XHJcbiAgbWF4LXdpZHRoOiA2MDBweDtcclxuICBtaW4td2lkdGg6IDMwMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDVweDtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cclxuICBsaSB7XHJcbiAgICBsaXN0LXN0eWxlOiBjaXJjbGU7XHJcbiAgICBtYXJnaW4tbGVmdDogMTZweDtcclxuICB9XHJcbn1cclxuXHJcbi5pY29uLXRvZ2dsZS1ydWxlIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5wYXltZW50LWFtb3VudF9fZXhwbGFuYXRpb24gLnJ1bGUge1xyXG4gIHJpZ2h0OiAxNnB4O1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0MjVweCkge1xyXG4gIC5ydWxlIHtcclxuICAgIHJpZ2h0OiAxNXB4O1xyXG4gIH1cclxufVxyXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy93ZWIvY3NzL19ydWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLFVBQVU7RUFDVixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRTtJQUNFLGNBQWM7RUFDaEI7QUFDRjs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLFFBQVE7RUFDUiwrQ0FBK0M7RUFDL0MsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLFlBQVk7RUFDWixzQkFBc0I7O0VBRXRCO0lBQ0Usa0JBQWtCO0lBQ2xCLGlCQUFpQjtFQUNuQjtBQUNGOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCAnLi9fY29tbW9uLmNzcyc7XFxyXFxuXFxyXFxuLmV4cGxhbmF0aW9uIHtcXHJcXG4gIHotaW5kZXg6IDE7XFxyXFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxyXFxufVxcclxcblxcclxcbi5leHBsYW5hdGlvbjpob3ZlciB7XFxyXFxuICAucnVsZSB7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4ucnVsZSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgdG9wOiBjYWxjKDE3cHggKyA3cHgpO1xcclxcbiAgcmlnaHQ6IDA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb3R0by1ncmV5U2NhbGUxLWNvbG9yKTtcXHJcXG4gIG1heC13aWR0aDogNjAwcHg7XFxyXFxuICBtaW4td2lkdGg6IDMwMHB4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gIHBhZGRpbmc6IDVweDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuXFxyXFxuICBsaSB7XFxyXFxuICAgIGxpc3Qtc3R5bGU6IGNpcmNsZTtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDE2cHg7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5pY29uLXRvZ2dsZS1ydWxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBheW1lbnQtYW1vdW50X19leHBsYW5hdGlvbiAucnVsZSB7XFxyXFxuICByaWdodDogMTZweDtcXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDI1cHgpIHtcXHJcXG4gIC5ydWxlIHtcXHJcXG4gICAgcmlnaHQ6IDE1cHg7XFxyXFxuICB9XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgOnJvb3Qge1xyXG4gIC0tbG90dG8tcHJpbWFyeS1jb2xvcjogIzRlNWJhNjtcclxuICAtLWxvdHRvLXByaW1hcnktY29sb3ItcmdiOiA3OCwgOTEsIDE2NjtcclxuICAtLWxvdHRvLWdyZXlTY2FsZTEtY29sb3I6ICNmZmZmZmY7XHJcbiAgLS1sb3R0by1ncmV5U2NhbGUyLWNvbG9yOiAjZmNmY2ZkO1xyXG4gIC0tbG90dG8tZ3JleVNjYWxlMy1jb2xvcjogI2I0YjRiNDtcclxuICAtLWxvdHRvLWdyZXlTY2FsZTQtY29sb3I6ICM4YjhiOGI7XHJcbiAgLS1sb3R0by1ncmV5U2NhbGU1LWNvbG9yOiAjMDAwMDAwO1xyXG4gIC0tbG90dG8tZ3JleVNjYWxlNS1jb2xvci1yZ2I6IDAsIDAsIDA7XHJcbiAgLS1sb3R0by1mb250RmFtaWx5OiAnUm9ib3RvJztcclxuICAtLWxvdHRvLXRpdGxlLWZvbnRXZWlnaHQ6IDgwMDtcclxuICAtLWxvdHRvLXRpdGxlLWZvbnRTaXplOiAyNHB4O1xyXG4gIC0tbG90dG8tdGl0bGUtbGluZUhlaWdodDogMzZweDtcclxuICAtLWxvdHRvLXN1YnRpdGxlLWZvbnRXZWlnaHQ6IDYwMDtcclxuICAtLWxvdHRvLXN1YnRpdGxlLWZvbnRTaXplOiAyMHB4O1xyXG4gIC0tbG90dG8tc3VidGl0bGUtbGluZUhlaWdodDogMjRweDtcclxuICAtLWxvdHRvLWJvZHlBbmRQbGFjZWhvbGRlci1mb250V2VpZ2h0OiA0MDA7XHJcbiAgLS1sb3R0by1ib2R5QW5kUGxhY2Vob2xkZXItZm9udFNpemU6IDE1cHg7XHJcbiAgLS1sb3R0by1ib2R5QW5kUGxhY2Vob2xkZXItbGluZUhlaWdodDogMjRweDtcclxuICAtLWxvdHRvLWNhcHRpb24tZm9udFdlaWdodDogNzAwO1xyXG4gIC0tbG90dG8tY2FwdGlvbi1mb250U2l6ZTogMTRweDtcclxuICAtLWxvdHRvLWNhcHRpb24tbGluZUhlaWdodDogMTZweDtcclxuICAtLWxvdHRvLXRhYmxlLWxpbmUtY29sb3I6IHJnYmEodmFyKC0tbG90dG8tZ3JleVNjYWxlNS1jb2xvci1yZ2IpLCAxMiUpO1xyXG4gIC0tY29udGVudHMtd2lkdGg6IDQyMHB4O1xyXG4gIC0tY29udGVudHMtc21hbGwtbW9iaWxlLXdpZHRoOiAzNjBweDtcclxufVxyXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy93ZWIvY3NzL19zdHlsZS1jb25zdGFudHMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsOEJBQThCO0VBQzlCLHNDQUFzQztFQUN0QyxpQ0FBaUM7RUFDakMsaUNBQWlDO0VBQ2pDLGlDQUFpQztFQUNqQyxpQ0FBaUM7RUFDakMsaUNBQWlDO0VBQ2pDLHFDQUFxQztFQUNyQyw0QkFBNEI7RUFDNUIsNkJBQTZCO0VBQzdCLDRCQUE0QjtFQUM1Qiw4QkFBOEI7RUFDOUIsZ0NBQWdDO0VBQ2hDLCtCQUErQjtFQUMvQixpQ0FBaUM7RUFDakMsMENBQTBDO0VBQzFDLHlDQUF5QztFQUN6QywyQ0FBMkM7RUFDM0MsK0JBQStCO0VBQy9CLDhCQUE4QjtFQUM5QixnQ0FBZ0M7RUFDaEMsc0VBQXNFO0VBQ3RFLHVCQUF1QjtFQUN2QixvQ0FBb0M7QUFDdENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcclxcbiAgLS1sb3R0by1wcmltYXJ5LWNvbG9yOiAjNGU1YmE2O1xcclxcbiAgLS1sb3R0by1wcmltYXJ5LWNvbG9yLXJnYjogNzgsIDkxLCAxNjY7XFxyXFxuICAtLWxvdHRvLWdyZXlTY2FsZTEtY29sb3I6ICNmZmZmZmY7XFxyXFxuICAtLWxvdHRvLWdyZXlTY2FsZTItY29sb3I6ICNmY2ZjZmQ7XFxyXFxuICAtLWxvdHRvLWdyZXlTY2FsZTMtY29sb3I6ICNiNGI0YjQ7XFxyXFxuICAtLWxvdHRvLWdyZXlTY2FsZTQtY29sb3I6ICM4YjhiOGI7XFxyXFxuICAtLWxvdHRvLWdyZXlTY2FsZTUtY29sb3I6ICMwMDAwMDA7XFxyXFxuICAtLWxvdHRvLWdyZXlTY2FsZTUtY29sb3ItcmdiOiAwLCAwLCAwO1xcclxcbiAgLS1sb3R0by1mb250RmFtaWx5OiAnUm9ib3RvJztcXHJcXG4gIC0tbG90dG8tdGl0bGUtZm9udFdlaWdodDogODAwO1xcclxcbiAgLS1sb3R0by10aXRsZS1mb250U2l6ZTogMjRweDtcXHJcXG4gIC0tbG90dG8tdGl0bGUtbGluZUhlaWdodDogMzZweDtcXHJcXG4gIC0tbG90dG8tc3VidGl0bGUtZm9udFdlaWdodDogNjAwO1xcclxcbiAgLS1sb3R0by1zdWJ0aXRsZS1mb250U2l6ZTogMjBweDtcXHJcXG4gIC0tbG90dG8tc3VidGl0bGUtbGluZUhlaWdodDogMjRweDtcXHJcXG4gIC0tbG90dG8tYm9keUFuZFBsYWNlaG9sZGVyLWZvbnRXZWlnaHQ6IDQwMDtcXHJcXG4gIC0tbG90dG8tYm9keUFuZFBsYWNlaG9sZGVyLWZvbnRTaXplOiAxNXB4O1xcclxcbiAgLS1sb3R0by1ib2R5QW5kUGxhY2Vob2xkZXItbGluZUhlaWdodDogMjRweDtcXHJcXG4gIC0tbG90dG8tY2FwdGlvbi1mb250V2VpZ2h0OiA3MDA7XFxyXFxuICAtLWxvdHRvLWNhcHRpb24tZm9udFNpemU6IDE0cHg7XFxyXFxuICAtLWxvdHRvLWNhcHRpb24tbGluZUhlaWdodDogMTZweDtcXHJcXG4gIC0tbG90dG8tdGFibGUtbGluZS1jb2xvcjogcmdiYSh2YXIoLS1sb3R0by1ncmV5U2NhbGU1LWNvbG9yLXJnYiksIDEyJSk7XFxyXFxuICAtLWNvbnRlbnRzLXdpZHRoOiA0MjBweDtcXHJcXG4gIC0tY29udGVudHMtc21hbGwtbW9iaWxlLXdpZHRoOiAzNjBweDtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL19hcHAuY3NzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BVF9SVUxFX0lNUE9SVF8xX19fIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vX2NvbW1vbi5jc3NcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzJfX18gZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9fY29udGVudHMuY3NzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BVF9SVUxFX0lNUE9SVF8zX19fIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vX2dhbWVTdGVwLmNzc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfNF9fXyBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL19wb3B1cC5jc3NcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzVfX18gZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9fcmVzZXQuY3NzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BVF9SVUxFX0lNUE9SVF82X19fIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vX3J1bGUuY3NzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMV9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMl9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfM19fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfNF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfNV9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfNl9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYFxyXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJcIixcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBuYW1lZF9yZWZlcmVuY2VzXzEgPSByZXF1aXJlKFwiLi9uYW1lZC1yZWZlcmVuY2VzXCIpO1xudmFyIG51bWVyaWNfdW5pY29kZV9tYXBfMSA9IHJlcXVpcmUoXCIuL251bWVyaWMtdW5pY29kZS1tYXBcIik7XG52YXIgc3Vycm9nYXRlX3BhaXJzXzEgPSByZXF1aXJlKFwiLi9zdXJyb2dhdGUtcGFpcnNcIik7XG52YXIgYWxsTmFtZWRSZWZlcmVuY2VzID0gX19hc3NpZ24oX19hc3NpZ24oe30sIG5hbWVkX3JlZmVyZW5jZXNfMS5uYW1lZFJlZmVyZW5jZXMpLCB7IGFsbDogbmFtZWRfcmVmZXJlbmNlc18xLm5hbWVkUmVmZXJlbmNlcy5odG1sNSB9KTtcbnZhciBlbmNvZGVSZWdFeHBzID0ge1xuICAgIHNwZWNpYWxDaGFyczogL1s8PidcIiZdL2csXG4gICAgbm9uQXNjaWk6IC8oPzpbPD4nXCImXFx1MDA4MC1cXHVEN0ZGXFx1RTAwMC1cXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdKS9nLFxuICAgIG5vbkFzY2lpUHJpbnRhYmxlOiAvKD86Wzw+J1wiJlxceDAxLVxceDA4XFx4MTEtXFx4MTVcXHgxNy1cXHgxRlxceDdmLVxcdUQ3RkZcXHVFMDAwLVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0pL2csXG4gICAgZXh0ZW5zaXZlOiAvKD86W1xceDAxLVxceDBjXFx4MGUtXFx4MWZcXHgyMS1cXHgyY1xceDJlLVxceDJmXFx4M2EtXFx4NDBcXHg1Yi1cXHg2MFxceDdiLVxceDdkXFx4N2YtXFx1RDdGRlxcdUUwMDAtXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXSkvZ1xufTtcbnZhciBkZWZhdWx0RW5jb2RlT3B0aW9ucyA9IHtcbiAgICBtb2RlOiAnc3BlY2lhbENoYXJzJyxcbiAgICBsZXZlbDogJ2FsbCcsXG4gICAgbnVtZXJpYzogJ2RlY2ltYWwnXG59O1xuLyoqIEVuY29kZXMgYWxsIHRoZSBuZWNlc3NhcnkgKHNwZWNpZmllZCBieSBgbGV2ZWxgKSBjaGFyYWN0ZXJzIGluIHRoZSB0ZXh0ICovXG5mdW5jdGlvbiBlbmNvZGUodGV4dCwgX2EpIHtcbiAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8gZGVmYXVsdEVuY29kZU9wdGlvbnMgOiBfYSwgX2MgPSBfYi5tb2RlLCBtb2RlID0gX2MgPT09IHZvaWQgMCA/ICdzcGVjaWFsQ2hhcnMnIDogX2MsIF9kID0gX2IubnVtZXJpYywgbnVtZXJpYyA9IF9kID09PSB2b2lkIDAgPyAnZGVjaW1hbCcgOiBfZCwgX2UgPSBfYi5sZXZlbCwgbGV2ZWwgPSBfZSA9PT0gdm9pZCAwID8gJ2FsbCcgOiBfZTtcbiAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB2YXIgZW5jb2RlUmVnRXhwID0gZW5jb2RlUmVnRXhwc1ttb2RlXTtcbiAgICB2YXIgcmVmZXJlbmNlcyA9IGFsbE5hbWVkUmVmZXJlbmNlc1tsZXZlbF0uY2hhcmFjdGVycztcbiAgICB2YXIgaXNIZXggPSBudW1lcmljID09PSAnaGV4YWRlY2ltYWwnO1xuICAgIGVuY29kZVJlZ0V4cC5sYXN0SW5kZXggPSAwO1xuICAgIHZhciBfYiA9IGVuY29kZVJlZ0V4cC5leGVjKHRleHQpO1xuICAgIHZhciBfYztcbiAgICBpZiAoX2IpIHtcbiAgICAgICAgX2MgPSAnJztcbiAgICAgICAgdmFyIF9kID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKF9kICE9PSBfYi5pbmRleCkge1xuICAgICAgICAgICAgICAgIF9jICs9IHRleHQuc3Vic3RyaW5nKF9kLCBfYi5pbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX2UgPSBfYlswXTtcbiAgICAgICAgICAgIHZhciByZXN1bHRfMSA9IHJlZmVyZW5jZXNbX2VdO1xuICAgICAgICAgICAgaWYgKCFyZXN1bHRfMSkge1xuICAgICAgICAgICAgICAgIHZhciBjb2RlXzEgPSBfZS5sZW5ndGggPiAxID8gc3Vycm9nYXRlX3BhaXJzXzEuZ2V0Q29kZVBvaW50KF9lLCAwKSA6IF9lLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0XzEgPSAoaXNIZXggPyAnJiN4JyArIGNvZGVfMS50b1N0cmluZygxNikgOiAnJiMnICsgY29kZV8xKSArICc7JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jICs9IHJlc3VsdF8xO1xuICAgICAgICAgICAgX2QgPSBfYi5pbmRleCArIF9lLmxlbmd0aDtcbiAgICAgICAgfSB3aGlsZSAoKF9iID0gZW5jb2RlUmVnRXhwLmV4ZWModGV4dCkpKTtcbiAgICAgICAgaWYgKF9kICE9PSB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgX2MgKz0gdGV4dC5zdWJzdHJpbmcoX2QpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfYyA9XG4gICAgICAgICAgICB0ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gX2M7XG59XG5leHBvcnRzLmVuY29kZSA9IGVuY29kZTtcbnZhciBkZWZhdWx0RGVjb2RlT3B0aW9ucyA9IHtcbiAgICBzY29wZTogJ2JvZHknLFxuICAgIGxldmVsOiAnYWxsJ1xufTtcbnZhciBzdHJpY3QgPSAvJig/OiNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKyk7L2c7XG52YXIgYXR0cmlidXRlID0gLyYoPzojXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspWzs9XT8vZztcbnZhciBiYXNlRGVjb2RlUmVnRXhwcyA9IHtcbiAgICB4bWw6IHtcbiAgICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLFxuICAgICAgICBib2R5OiBuYW1lZF9yZWZlcmVuY2VzXzEuYm9keVJlZ0V4cHMueG1sXG4gICAgfSxcbiAgICBodG1sNDoge1xuICAgICAgICBzdHJpY3Q6IHN0cmljdCxcbiAgICAgICAgYXR0cmlidXRlOiBhdHRyaWJ1dGUsXG4gICAgICAgIGJvZHk6IG5hbWVkX3JlZmVyZW5jZXNfMS5ib2R5UmVnRXhwcy5odG1sNFxuICAgIH0sXG4gICAgaHRtbDU6IHtcbiAgICAgICAgc3RyaWN0OiBzdHJpY3QsXG4gICAgICAgIGF0dHJpYnV0ZTogYXR0cmlidXRlLFxuICAgICAgICBib2R5OiBuYW1lZF9yZWZlcmVuY2VzXzEuYm9keVJlZ0V4cHMuaHRtbDVcbiAgICB9XG59O1xudmFyIGRlY29kZVJlZ0V4cHMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgYmFzZURlY29kZVJlZ0V4cHMpLCB7IGFsbDogYmFzZURlY29kZVJlZ0V4cHMuaHRtbDUgfSk7XG52YXIgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcbnZhciBvdXRPZkJvdW5kc0NoYXIgPSBmcm9tQ2hhckNvZGUoNjU1MzMpO1xudmFyIGRlZmF1bHREZWNvZGVFbnRpdHlPcHRpb25zID0ge1xuICAgIGxldmVsOiAnYWxsJ1xufTtcbi8qKiBEZWNvZGVzIGEgc2luZ2xlIGVudGl0eSAqL1xuZnVuY3Rpb24gZGVjb2RlRW50aXR5KGVudGl0eSwgX2EpIHtcbiAgICB2YXIgX2IgPSAoX2EgPT09IHZvaWQgMCA/IGRlZmF1bHREZWNvZGVFbnRpdHlPcHRpb25zIDogX2EpLmxldmVsLCBsZXZlbCA9IF9iID09PSB2b2lkIDAgPyAnYWxsJyA6IF9iO1xuICAgIGlmICghZW50aXR5KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgdmFyIF9iID0gZW50aXR5O1xuICAgIHZhciBkZWNvZGVFbnRpdHlMYXN0Q2hhcl8xID0gZW50aXR5W2VudGl0eS5sZW5ndGggLSAxXTtcbiAgICBpZiAoZmFsc2VcbiAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMSA9PT0gJz0nKSB7XG4gICAgICAgIF9iID1cbiAgICAgICAgICAgIGVudGl0eTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZmFsc2VcbiAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMSAhPT0gJzsnKSB7XG4gICAgICAgIF9iID1cbiAgICAgICAgICAgIGVudGl0eTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8xID0gYWxsTmFtZWRSZWZlcmVuY2VzW2xldmVsXS5lbnRpdGllc1tlbnRpdHldO1xuICAgICAgICBpZiAoZGVjb2RlUmVzdWx0QnlSZWZlcmVuY2VfMSkge1xuICAgICAgICAgICAgX2IgPSBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVudGl0eVswXSA9PT0gJyYnICYmIGVudGl0eVsxXSA9PT0gJyMnKSB7XG4gICAgICAgICAgICB2YXIgZGVjb2RlU2Vjb25kQ2hhcl8xID0gZW50aXR5WzJdO1xuICAgICAgICAgICAgdmFyIGRlY29kZUNvZGVfMSA9IGRlY29kZVNlY29uZENoYXJfMSA9PSAneCcgfHwgZGVjb2RlU2Vjb25kQ2hhcl8xID09ICdYJ1xuICAgICAgICAgICAgICAgID8gcGFyc2VJbnQoZW50aXR5LnN1YnN0cigzKSwgMTYpXG4gICAgICAgICAgICAgICAgOiBwYXJzZUludChlbnRpdHkuc3Vic3RyKDIpKTtcbiAgICAgICAgICAgIF9iID1cbiAgICAgICAgICAgICAgICBkZWNvZGVDb2RlXzEgPj0gMHgxMGZmZmZcbiAgICAgICAgICAgICAgICAgICAgPyBvdXRPZkJvdW5kc0NoYXJcbiAgICAgICAgICAgICAgICAgICAgOiBkZWNvZGVDb2RlXzEgPiA2NTUzNVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzdXJyb2dhdGVfcGFpcnNfMS5mcm9tQ29kZVBvaW50KGRlY29kZUNvZGVfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZnJvbUNoYXJDb2RlKG51bWVyaWNfdW5pY29kZV9tYXBfMS5udW1lcmljVW5pY29kZU1hcFtkZWNvZGVDb2RlXzFdIHx8IGRlY29kZUNvZGVfMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9iO1xufVxuZXhwb3J0cy5kZWNvZGVFbnRpdHkgPSBkZWNvZGVFbnRpdHk7XG4vKiogRGVjb2RlcyBhbGwgZW50aXRpZXMgaW4gdGhlIHRleHQgKi9cbmZ1bmN0aW9uIGRlY29kZSh0ZXh0LCBfYSkge1xuICAgIHZhciBkZWNvZGVTZWNvbmRDaGFyXzEgPSBfYSA9PT0gdm9pZCAwID8gZGVmYXVsdERlY29kZU9wdGlvbnMgOiBfYSwgZGVjb2RlQ29kZV8xID0gZGVjb2RlU2Vjb25kQ2hhcl8xLmxldmVsLCBsZXZlbCA9IGRlY29kZUNvZGVfMSA9PT0gdm9pZCAwID8gJ2FsbCcgOiBkZWNvZGVDb2RlXzEsIF9iID0gZGVjb2RlU2Vjb25kQ2hhcl8xLnNjb3BlLCBzY29wZSA9IF9iID09PSB2b2lkIDAgPyBsZXZlbCA9PT0gJ3htbCcgPyAnc3RyaWN0JyA6ICdib2R5JyA6IF9iO1xuICAgIGlmICghdGV4dCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHZhciBkZWNvZGVSZWdFeHAgPSBkZWNvZGVSZWdFeHBzW2xldmVsXVtzY29wZV07XG4gICAgdmFyIHJlZmVyZW5jZXMgPSBhbGxOYW1lZFJlZmVyZW5jZXNbbGV2ZWxdLmVudGl0aWVzO1xuICAgIHZhciBpc0F0dHJpYnV0ZSA9IHNjb3BlID09PSAnYXR0cmlidXRlJztcbiAgICB2YXIgaXNTdHJpY3QgPSBzY29wZSA9PT0gJ3N0cmljdCc7XG4gICAgZGVjb2RlUmVnRXhwLmxhc3RJbmRleCA9IDA7XG4gICAgdmFyIHJlcGxhY2VNYXRjaF8xID0gZGVjb2RlUmVnRXhwLmV4ZWModGV4dCk7XG4gICAgdmFyIHJlcGxhY2VSZXN1bHRfMTtcbiAgICBpZiAocmVwbGFjZU1hdGNoXzEpIHtcbiAgICAgICAgcmVwbGFjZVJlc3VsdF8xID0gJyc7XG4gICAgICAgIHZhciByZXBsYWNlTGFzdEluZGV4XzEgPSAwO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAocmVwbGFjZUxhc3RJbmRleF8xICE9PSByZXBsYWNlTWF0Y2hfMS5pbmRleCkge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VSZXN1bHRfMSArPSB0ZXh0LnN1YnN0cmluZyhyZXBsYWNlTGFzdEluZGV4XzEsIHJlcGxhY2VNYXRjaF8xLmluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXBsYWNlSW5wdXRfMSA9IHJlcGxhY2VNYXRjaF8xWzBdO1xuICAgICAgICAgICAgdmFyIGRlY29kZVJlc3VsdF8xID0gcmVwbGFjZUlucHV0XzE7XG4gICAgICAgICAgICB2YXIgZGVjb2RlRW50aXR5TGFzdENoYXJfMiA9IHJlcGxhY2VJbnB1dF8xW3JlcGxhY2VJbnB1dF8xLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKGlzQXR0cmlidXRlXG4gICAgICAgICAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMiA9PT0gJz0nKSB7XG4gICAgICAgICAgICAgICAgZGVjb2RlUmVzdWx0XzEgPSByZXBsYWNlSW5wdXRfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzU3RyaWN0XG4gICAgICAgICAgICAgICAgJiYgZGVjb2RlRW50aXR5TGFzdENoYXJfMiAhPT0gJzsnKSB7XG4gICAgICAgICAgICAgICAgZGVjb2RlUmVzdWx0XzEgPSByZXBsYWNlSW5wdXRfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8yID0gcmVmZXJlbmNlc1tyZXBsYWNlSW5wdXRfMV07XG4gICAgICAgICAgICAgICAgaWYgKGRlY29kZVJlc3VsdEJ5UmVmZXJlbmNlXzIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjb2RlUmVzdWx0XzEgPSBkZWNvZGVSZXN1bHRCeVJlZmVyZW5jZV8yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXBsYWNlSW5wdXRfMVswXSA9PT0gJyYnICYmIHJlcGxhY2VJbnB1dF8xWzFdID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlY29kZVNlY29uZENoYXJfMiA9IHJlcGxhY2VJbnB1dF8xWzJdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVjb2RlQ29kZV8yID0gZGVjb2RlU2Vjb25kQ2hhcl8yID09ICd4JyB8fCBkZWNvZGVTZWNvbmRDaGFyXzIgPT0gJ1gnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KHJlcGxhY2VJbnB1dF8xLnN1YnN0cigzKSwgMTYpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHBhcnNlSW50KHJlcGxhY2VJbnB1dF8xLnN1YnN0cigyKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlY29kZVJlc3VsdF8xID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY29kZUNvZGVfMiA+PSAweDEwZmZmZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gb3V0T2ZCb3VuZHNDaGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkZWNvZGVDb2RlXzIgPiA2NTUzNVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHN1cnJvZ2F0ZV9wYWlyc18xLmZyb21Db2RlUG9pbnQoZGVjb2RlQ29kZV8yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZyb21DaGFyQ29kZShudW1lcmljX3VuaWNvZGVfbWFwXzEubnVtZXJpY1VuaWNvZGVNYXBbZGVjb2RlQ29kZV8yXSB8fCBkZWNvZGVDb2RlXzIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcGxhY2VSZXN1bHRfMSArPSBkZWNvZGVSZXN1bHRfMTtcbiAgICAgICAgICAgIHJlcGxhY2VMYXN0SW5kZXhfMSA9IHJlcGxhY2VNYXRjaF8xLmluZGV4ICsgcmVwbGFjZUlucHV0XzEubGVuZ3RoO1xuICAgICAgICB9IHdoaWxlICgocmVwbGFjZU1hdGNoXzEgPSBkZWNvZGVSZWdFeHAuZXhlYyh0ZXh0KSkpO1xuICAgICAgICBpZiAocmVwbGFjZUxhc3RJbmRleF8xICE9PSB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmVwbGFjZVJlc3VsdF8xICs9IHRleHQuc3Vic3RyaW5nKHJlcGxhY2VMYXN0SW5kZXhfMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlcGxhY2VSZXN1bHRfMSA9XG4gICAgICAgICAgICB0ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gcmVwbGFjZVJlc3VsdF8xO1xufVxuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuYm9keVJlZ0V4cHM9e3htbDovJig/OiNcXGQrfCNbeFhdW1xcZGEtZkEtRl0rfFswLTlhLXpBLVpdKyk7Py9nLGh0bWw0Oi8mKD86bmJzcHxpZXhjbHxjZW50fHBvdW5kfGN1cnJlbnx5ZW58YnJ2YmFyfHNlY3R8dW1sfGNvcHl8b3JkZnxsYXF1b3xub3R8c2h5fHJlZ3xtYWNyfGRlZ3xwbHVzbW58c3VwMnxzdXAzfGFjdXRlfG1pY3JvfHBhcmF8bWlkZG90fGNlZGlsfHN1cDF8b3JkbXxyYXF1b3xmcmFjMTR8ZnJhYzEyfGZyYWMzNHxpcXVlc3R8QWdyYXZlfEFhY3V0ZXxBY2lyY3xBdGlsZGV8QXVtbHxBcmluZ3xBRWxpZ3xDY2VkaWx8RWdyYXZlfEVhY3V0ZXxFY2lyY3xFdW1sfElncmF2ZXxJYWN1dGV8SWNpcmN8SXVtbHxFVEh8TnRpbGRlfE9ncmF2ZXxPYWN1dGV8T2NpcmN8T3RpbGRlfE91bWx8dGltZXN8T3NsYXNofFVncmF2ZXxVYWN1dGV8VWNpcmN8VXVtbHxZYWN1dGV8VEhPUk58c3psaWd8YWdyYXZlfGFhY3V0ZXxhY2lyY3xhdGlsZGV8YXVtbHxhcmluZ3xhZWxpZ3xjY2VkaWx8ZWdyYXZlfGVhY3V0ZXxlY2lyY3xldW1sfGlncmF2ZXxpYWN1dGV8aWNpcmN8aXVtbHxldGh8bnRpbGRlfG9ncmF2ZXxvYWN1dGV8b2NpcmN8b3RpbGRlfG91bWx8ZGl2aWRlfG9zbGFzaHx1Z3JhdmV8dWFjdXRlfHVjaXJjfHV1bWx8eWFjdXRlfHRob3JufHl1bWx8cXVvdHxhbXB8bHR8Z3R8I1xcZCt8I1t4WF1bXFxkYS1mQS1GXSt8WzAtOWEtekEtWl0rKTs/L2csaHRtbDU6LyYoPzpBRWxpZ3xBTVB8QWFjdXRlfEFjaXJjfEFncmF2ZXxBcmluZ3xBdGlsZGV8QXVtbHxDT1BZfENjZWRpbHxFVEh8RWFjdXRlfEVjaXJjfEVncmF2ZXxFdW1sfEdUfElhY3V0ZXxJY2lyY3xJZ3JhdmV8SXVtbHxMVHxOdGlsZGV8T2FjdXRlfE9jaXJjfE9ncmF2ZXxPc2xhc2h8T3RpbGRlfE91bWx8UVVPVHxSRUd8VEhPUk58VWFjdXRlfFVjaXJjfFVncmF2ZXxVdW1sfFlhY3V0ZXxhYWN1dGV8YWNpcmN8YWN1dGV8YWVsaWd8YWdyYXZlfGFtcHxhcmluZ3xhdGlsZGV8YXVtbHxicnZiYXJ8Y2NlZGlsfGNlZGlsfGNlbnR8Y29weXxjdXJyZW58ZGVnfGRpdmlkZXxlYWN1dGV8ZWNpcmN8ZWdyYXZlfGV0aHxldW1sfGZyYWMxMnxmcmFjMTR8ZnJhYzM0fGd0fGlhY3V0ZXxpY2lyY3xpZXhjbHxpZ3JhdmV8aXF1ZXN0fGl1bWx8bGFxdW98bHR8bWFjcnxtaWNyb3xtaWRkb3R8bmJzcHxub3R8bnRpbGRlfG9hY3V0ZXxvY2lyY3xvZ3JhdmV8b3JkZnxvcmRtfG9zbGFzaHxvdGlsZGV8b3VtbHxwYXJhfHBsdXNtbnxwb3VuZHxxdW90fHJhcXVvfHJlZ3xzZWN0fHNoeXxzdXAxfHN1cDJ8c3VwM3xzemxpZ3x0aG9ybnx0aW1lc3x1YWN1dGV8dWNpcmN8dWdyYXZlfHVtbHx1dW1sfHlhY3V0ZXx5ZW58eXVtbHwjXFxkK3wjW3hYXVtcXGRhLWZBLUZdK3xbMC05YS16QS1aXSspOz8vZ307ZXhwb3J0cy5uYW1lZFJlZmVyZW5jZXM9e3htbDp7ZW50aXRpZXM6e1wiJmx0O1wiOlwiPFwiLFwiJmd0O1wiOlwiPlwiLFwiJnF1b3Q7XCI6J1wiJyxcIiZhcG9zO1wiOlwiJ1wiLFwiJmFtcDtcIjpcIiZcIn0sY2hhcmFjdGVyczp7XCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJmFwb3M7XCIsXCImXCI6XCImYW1wO1wifX0saHRtbDQ6e2VudGl0aWVzOntcIiZhcG9zO1wiOlwiJ1wiLFwiJm5ic3BcIjpcIsKgXCIsXCImbmJzcDtcIjpcIsKgXCIsXCImaWV4Y2xcIjpcIsKhXCIsXCImaWV4Y2w7XCI6XCLCoVwiLFwiJmNlbnRcIjpcIsKiXCIsXCImY2VudDtcIjpcIsKiXCIsXCImcG91bmRcIjpcIsKjXCIsXCImcG91bmQ7XCI6XCLCo1wiLFwiJmN1cnJlblwiOlwiwqRcIixcIiZjdXJyZW47XCI6XCLCpFwiLFwiJnllblwiOlwiwqVcIixcIiZ5ZW47XCI6XCLCpVwiLFwiJmJydmJhclwiOlwiwqZcIixcIiZicnZiYXI7XCI6XCLCplwiLFwiJnNlY3RcIjpcIsKnXCIsXCImc2VjdDtcIjpcIsKnXCIsXCImdW1sXCI6XCLCqFwiLFwiJnVtbDtcIjpcIsKoXCIsXCImY29weVwiOlwiwqlcIixcIiZjb3B5O1wiOlwiwqlcIixcIiZvcmRmXCI6XCLCqlwiLFwiJm9yZGY7XCI6XCLCqlwiLFwiJmxhcXVvXCI6XCLCq1wiLFwiJmxhcXVvO1wiOlwiwqtcIixcIiZub3RcIjpcIsKsXCIsXCImbm90O1wiOlwiwqxcIixcIiZzaHlcIjpcIsKtXCIsXCImc2h5O1wiOlwiwq1cIixcIiZyZWdcIjpcIsKuXCIsXCImcmVnO1wiOlwiwq5cIixcIiZtYWNyXCI6XCLCr1wiLFwiJm1hY3I7XCI6XCLCr1wiLFwiJmRlZ1wiOlwiwrBcIixcIiZkZWc7XCI6XCLCsFwiLFwiJnBsdXNtblwiOlwiwrFcIixcIiZwbHVzbW47XCI6XCLCsVwiLFwiJnN1cDJcIjpcIsKyXCIsXCImc3VwMjtcIjpcIsKyXCIsXCImc3VwM1wiOlwiwrNcIixcIiZzdXAzO1wiOlwiwrNcIixcIiZhY3V0ZVwiOlwiwrRcIixcIiZhY3V0ZTtcIjpcIsK0XCIsXCImbWljcm9cIjpcIsK1XCIsXCImbWljcm87XCI6XCLCtVwiLFwiJnBhcmFcIjpcIsK2XCIsXCImcGFyYTtcIjpcIsK2XCIsXCImbWlkZG90XCI6XCLCt1wiLFwiJm1pZGRvdDtcIjpcIsK3XCIsXCImY2VkaWxcIjpcIsK4XCIsXCImY2VkaWw7XCI6XCLCuFwiLFwiJnN1cDFcIjpcIsK5XCIsXCImc3VwMTtcIjpcIsK5XCIsXCImb3JkbVwiOlwiwrpcIixcIiZvcmRtO1wiOlwiwrpcIixcIiZyYXF1b1wiOlwiwrtcIixcIiZyYXF1bztcIjpcIsK7XCIsXCImZnJhYzE0XCI6XCLCvFwiLFwiJmZyYWMxNDtcIjpcIsK8XCIsXCImZnJhYzEyXCI6XCLCvVwiLFwiJmZyYWMxMjtcIjpcIsK9XCIsXCImZnJhYzM0XCI6XCLCvlwiLFwiJmZyYWMzNDtcIjpcIsK+XCIsXCImaXF1ZXN0XCI6XCLCv1wiLFwiJmlxdWVzdDtcIjpcIsK/XCIsXCImQWdyYXZlXCI6XCLDgFwiLFwiJkFncmF2ZTtcIjpcIsOAXCIsXCImQWFjdXRlXCI6XCLDgVwiLFwiJkFhY3V0ZTtcIjpcIsOBXCIsXCImQWNpcmNcIjpcIsOCXCIsXCImQWNpcmM7XCI6XCLDglwiLFwiJkF0aWxkZVwiOlwiw4NcIixcIiZBdGlsZGU7XCI6XCLDg1wiLFwiJkF1bWxcIjpcIsOEXCIsXCImQXVtbDtcIjpcIsOEXCIsXCImQXJpbmdcIjpcIsOFXCIsXCImQXJpbmc7XCI6XCLDhVwiLFwiJkFFbGlnXCI6XCLDhlwiLFwiJkFFbGlnO1wiOlwiw4ZcIixcIiZDY2VkaWxcIjpcIsOHXCIsXCImQ2NlZGlsO1wiOlwiw4dcIixcIiZFZ3JhdmVcIjpcIsOIXCIsXCImRWdyYXZlO1wiOlwiw4hcIixcIiZFYWN1dGVcIjpcIsOJXCIsXCImRWFjdXRlO1wiOlwiw4lcIixcIiZFY2lyY1wiOlwiw4pcIixcIiZFY2lyYztcIjpcIsOKXCIsXCImRXVtbFwiOlwiw4tcIixcIiZFdW1sO1wiOlwiw4tcIixcIiZJZ3JhdmVcIjpcIsOMXCIsXCImSWdyYXZlO1wiOlwiw4xcIixcIiZJYWN1dGVcIjpcIsONXCIsXCImSWFjdXRlO1wiOlwiw41cIixcIiZJY2lyY1wiOlwiw45cIixcIiZJY2lyYztcIjpcIsOOXCIsXCImSXVtbFwiOlwiw49cIixcIiZJdW1sO1wiOlwiw49cIixcIiZFVEhcIjpcIsOQXCIsXCImRVRIO1wiOlwiw5BcIixcIiZOdGlsZGVcIjpcIsORXCIsXCImTnRpbGRlO1wiOlwiw5FcIixcIiZPZ3JhdmVcIjpcIsOSXCIsXCImT2dyYXZlO1wiOlwiw5JcIixcIiZPYWN1dGVcIjpcIsOTXCIsXCImT2FjdXRlO1wiOlwiw5NcIixcIiZPY2lyY1wiOlwiw5RcIixcIiZPY2lyYztcIjpcIsOUXCIsXCImT3RpbGRlXCI6XCLDlVwiLFwiJk90aWxkZTtcIjpcIsOVXCIsXCImT3VtbFwiOlwiw5ZcIixcIiZPdW1sO1wiOlwiw5ZcIixcIiZ0aW1lc1wiOlwiw5dcIixcIiZ0aW1lcztcIjpcIsOXXCIsXCImT3NsYXNoXCI6XCLDmFwiLFwiJk9zbGFzaDtcIjpcIsOYXCIsXCImVWdyYXZlXCI6XCLDmVwiLFwiJlVncmF2ZTtcIjpcIsOZXCIsXCImVWFjdXRlXCI6XCLDmlwiLFwiJlVhY3V0ZTtcIjpcIsOaXCIsXCImVWNpcmNcIjpcIsObXCIsXCImVWNpcmM7XCI6XCLDm1wiLFwiJlV1bWxcIjpcIsOcXCIsXCImVXVtbDtcIjpcIsOcXCIsXCImWWFjdXRlXCI6XCLDnVwiLFwiJllhY3V0ZTtcIjpcIsOdXCIsXCImVEhPUk5cIjpcIsOeXCIsXCImVEhPUk47XCI6XCLDnlwiLFwiJnN6bGlnXCI6XCLDn1wiLFwiJnN6bGlnO1wiOlwiw59cIixcIiZhZ3JhdmVcIjpcIsOgXCIsXCImYWdyYXZlO1wiOlwiw6BcIixcIiZhYWN1dGVcIjpcIsOhXCIsXCImYWFjdXRlO1wiOlwiw6FcIixcIiZhY2lyY1wiOlwiw6JcIixcIiZhY2lyYztcIjpcIsOiXCIsXCImYXRpbGRlXCI6XCLDo1wiLFwiJmF0aWxkZTtcIjpcIsOjXCIsXCImYXVtbFwiOlwiw6RcIixcIiZhdW1sO1wiOlwiw6RcIixcIiZhcmluZ1wiOlwiw6VcIixcIiZhcmluZztcIjpcIsOlXCIsXCImYWVsaWdcIjpcIsOmXCIsXCImYWVsaWc7XCI6XCLDplwiLFwiJmNjZWRpbFwiOlwiw6dcIixcIiZjY2VkaWw7XCI6XCLDp1wiLFwiJmVncmF2ZVwiOlwiw6hcIixcIiZlZ3JhdmU7XCI6XCLDqFwiLFwiJmVhY3V0ZVwiOlwiw6lcIixcIiZlYWN1dGU7XCI6XCLDqVwiLFwiJmVjaXJjXCI6XCLDqlwiLFwiJmVjaXJjO1wiOlwiw6pcIixcIiZldW1sXCI6XCLDq1wiLFwiJmV1bWw7XCI6XCLDq1wiLFwiJmlncmF2ZVwiOlwiw6xcIixcIiZpZ3JhdmU7XCI6XCLDrFwiLFwiJmlhY3V0ZVwiOlwiw61cIixcIiZpYWN1dGU7XCI6XCLDrVwiLFwiJmljaXJjXCI6XCLDrlwiLFwiJmljaXJjO1wiOlwiw65cIixcIiZpdW1sXCI6XCLDr1wiLFwiJml1bWw7XCI6XCLDr1wiLFwiJmV0aFwiOlwiw7BcIixcIiZldGg7XCI6XCLDsFwiLFwiJm50aWxkZVwiOlwiw7FcIixcIiZudGlsZGU7XCI6XCLDsVwiLFwiJm9ncmF2ZVwiOlwiw7JcIixcIiZvZ3JhdmU7XCI6XCLDslwiLFwiJm9hY3V0ZVwiOlwiw7NcIixcIiZvYWN1dGU7XCI6XCLDs1wiLFwiJm9jaXJjXCI6XCLDtFwiLFwiJm9jaXJjO1wiOlwiw7RcIixcIiZvdGlsZGVcIjpcIsO1XCIsXCImb3RpbGRlO1wiOlwiw7VcIixcIiZvdW1sXCI6XCLDtlwiLFwiJm91bWw7XCI6XCLDtlwiLFwiJmRpdmlkZVwiOlwiw7dcIixcIiZkaXZpZGU7XCI6XCLDt1wiLFwiJm9zbGFzaFwiOlwiw7hcIixcIiZvc2xhc2g7XCI6XCLDuFwiLFwiJnVncmF2ZVwiOlwiw7lcIixcIiZ1Z3JhdmU7XCI6XCLDuVwiLFwiJnVhY3V0ZVwiOlwiw7pcIixcIiZ1YWN1dGU7XCI6XCLDulwiLFwiJnVjaXJjXCI6XCLDu1wiLFwiJnVjaXJjO1wiOlwiw7tcIixcIiZ1dW1sXCI6XCLDvFwiLFwiJnV1bWw7XCI6XCLDvFwiLFwiJnlhY3V0ZVwiOlwiw71cIixcIiZ5YWN1dGU7XCI6XCLDvVwiLFwiJnRob3JuXCI6XCLDvlwiLFwiJnRob3JuO1wiOlwiw75cIixcIiZ5dW1sXCI6XCLDv1wiLFwiJnl1bWw7XCI6XCLDv1wiLFwiJnF1b3RcIjonXCInLFwiJnF1b3Q7XCI6J1wiJyxcIiZhbXBcIjpcIiZcIixcIiZhbXA7XCI6XCImXCIsXCImbHRcIjpcIjxcIixcIiZsdDtcIjpcIjxcIixcIiZndFwiOlwiPlwiLFwiJmd0O1wiOlwiPlwiLFwiJk9FbGlnO1wiOlwixZJcIixcIiZvZWxpZztcIjpcIsWTXCIsXCImU2Nhcm9uO1wiOlwixaBcIixcIiZzY2Fyb247XCI6XCLFoVwiLFwiJll1bWw7XCI6XCLFuFwiLFwiJmNpcmM7XCI6XCLLhlwiLFwiJnRpbGRlO1wiOlwiy5xcIixcIiZlbnNwO1wiOlwi4oCCXCIsXCImZW1zcDtcIjpcIuKAg1wiLFwiJnRoaW5zcDtcIjpcIuKAiVwiLFwiJnp3bmo7XCI6XCLigIxcIixcIiZ6d2o7XCI6XCLigI1cIixcIiZscm07XCI6XCLigI5cIixcIiZybG07XCI6XCLigI9cIixcIiZuZGFzaDtcIjpcIuKAk1wiLFwiJm1kYXNoO1wiOlwi4oCUXCIsXCImbHNxdW87XCI6XCLigJhcIixcIiZyc3F1bztcIjpcIuKAmVwiLFwiJnNicXVvO1wiOlwi4oCaXCIsXCImbGRxdW87XCI6XCLigJxcIixcIiZyZHF1bztcIjpcIuKAnVwiLFwiJmJkcXVvO1wiOlwi4oCeXCIsXCImZGFnZ2VyO1wiOlwi4oCgXCIsXCImRGFnZ2VyO1wiOlwi4oChXCIsXCImcGVybWlsO1wiOlwi4oCwXCIsXCImbHNhcXVvO1wiOlwi4oC5XCIsXCImcnNhcXVvO1wiOlwi4oC6XCIsXCImZXVybztcIjpcIuKCrFwiLFwiJmZub2Y7XCI6XCLGklwiLFwiJkFscGhhO1wiOlwizpFcIixcIiZCZXRhO1wiOlwizpJcIixcIiZHYW1tYTtcIjpcIs6TXCIsXCImRGVsdGE7XCI6XCLOlFwiLFwiJkVwc2lsb247XCI6XCLOlVwiLFwiJlpldGE7XCI6XCLOllwiLFwiJkV0YTtcIjpcIs6XXCIsXCImVGhldGE7XCI6XCLOmFwiLFwiJklvdGE7XCI6XCLOmVwiLFwiJkthcHBhO1wiOlwizppcIixcIiZMYW1iZGE7XCI6XCLOm1wiLFwiJk11O1wiOlwizpxcIixcIiZOdTtcIjpcIs6dXCIsXCImWGk7XCI6XCLOnlwiLFwiJk9taWNyb247XCI6XCLOn1wiLFwiJlBpO1wiOlwizqBcIixcIiZSaG87XCI6XCLOoVwiLFwiJlNpZ21hO1wiOlwizqNcIixcIiZUYXU7XCI6XCLOpFwiLFwiJlVwc2lsb247XCI6XCLOpVwiLFwiJlBoaTtcIjpcIs6mXCIsXCImQ2hpO1wiOlwizqdcIixcIiZQc2k7XCI6XCLOqFwiLFwiJk9tZWdhO1wiOlwizqlcIixcIiZhbHBoYTtcIjpcIs6xXCIsXCImYmV0YTtcIjpcIs6yXCIsXCImZ2FtbWE7XCI6XCLOs1wiLFwiJmRlbHRhO1wiOlwizrRcIixcIiZlcHNpbG9uO1wiOlwizrVcIixcIiZ6ZXRhO1wiOlwizrZcIixcIiZldGE7XCI6XCLOt1wiLFwiJnRoZXRhO1wiOlwizrhcIixcIiZpb3RhO1wiOlwizrlcIixcIiZrYXBwYTtcIjpcIs66XCIsXCImbGFtYmRhO1wiOlwizrtcIixcIiZtdTtcIjpcIs68XCIsXCImbnU7XCI6XCLOvVwiLFwiJnhpO1wiOlwizr5cIixcIiZvbWljcm9uO1wiOlwizr9cIixcIiZwaTtcIjpcIs+AXCIsXCImcmhvO1wiOlwiz4FcIixcIiZzaWdtYWY7XCI6XCLPglwiLFwiJnNpZ21hO1wiOlwiz4NcIixcIiZ0YXU7XCI6XCLPhFwiLFwiJnVwc2lsb247XCI6XCLPhVwiLFwiJnBoaTtcIjpcIs+GXCIsXCImY2hpO1wiOlwiz4dcIixcIiZwc2k7XCI6XCLPiFwiLFwiJm9tZWdhO1wiOlwiz4lcIixcIiZ0aGV0YXN5bTtcIjpcIs+RXCIsXCImdXBzaWg7XCI6XCLPklwiLFwiJnBpdjtcIjpcIs+WXCIsXCImYnVsbDtcIjpcIuKAolwiLFwiJmhlbGxpcDtcIjpcIuKAplwiLFwiJnByaW1lO1wiOlwi4oCyXCIsXCImUHJpbWU7XCI6XCLigLNcIixcIiZvbGluZTtcIjpcIuKAvlwiLFwiJmZyYXNsO1wiOlwi4oGEXCIsXCImd2VpZXJwO1wiOlwi4oSYXCIsXCImaW1hZ2U7XCI6XCLihJFcIixcIiZyZWFsO1wiOlwi4oScXCIsXCImdHJhZGU7XCI6XCLihKJcIixcIiZhbGVmc3ltO1wiOlwi4oS1XCIsXCImbGFycjtcIjpcIuKGkFwiLFwiJnVhcnI7XCI6XCLihpFcIixcIiZyYXJyO1wiOlwi4oaSXCIsXCImZGFycjtcIjpcIuKGk1wiLFwiJmhhcnI7XCI6XCLihpRcIixcIiZjcmFycjtcIjpcIuKGtVwiLFwiJmxBcnI7XCI6XCLih5BcIixcIiZ1QXJyO1wiOlwi4oeRXCIsXCImckFycjtcIjpcIuKHklwiLFwiJmRBcnI7XCI6XCLih5NcIixcIiZoQXJyO1wiOlwi4oeUXCIsXCImZm9yYWxsO1wiOlwi4oiAXCIsXCImcGFydDtcIjpcIuKIglwiLFwiJmV4aXN0O1wiOlwi4oiDXCIsXCImZW1wdHk7XCI6XCLiiIVcIixcIiZuYWJsYTtcIjpcIuKIh1wiLFwiJmlzaW47XCI6XCLiiIhcIixcIiZub3RpbjtcIjpcIuKIiVwiLFwiJm5pO1wiOlwi4oiLXCIsXCImcHJvZDtcIjpcIuKIj1wiLFwiJnN1bTtcIjpcIuKIkVwiLFwiJm1pbnVzO1wiOlwi4oiSXCIsXCImbG93YXN0O1wiOlwi4oiXXCIsXCImcmFkaWM7XCI6XCLiiJpcIixcIiZwcm9wO1wiOlwi4oidXCIsXCImaW5maW47XCI6XCLiiJ5cIixcIiZhbmc7XCI6XCLiiKBcIixcIiZhbmQ7XCI6XCLiiKdcIixcIiZvcjtcIjpcIuKIqFwiLFwiJmNhcDtcIjpcIuKIqVwiLFwiJmN1cDtcIjpcIuKIqlwiLFwiJmludDtcIjpcIuKIq1wiLFwiJnRoZXJlNDtcIjpcIuKItFwiLFwiJnNpbTtcIjpcIuKIvFwiLFwiJmNvbmc7XCI6XCLiiYVcIixcIiZhc3ltcDtcIjpcIuKJiFwiLFwiJm5lO1wiOlwi4omgXCIsXCImZXF1aXY7XCI6XCLiiaFcIixcIiZsZTtcIjpcIuKJpFwiLFwiJmdlO1wiOlwi4omlXCIsXCImc3ViO1wiOlwi4oqCXCIsXCImc3VwO1wiOlwi4oqDXCIsXCImbnN1YjtcIjpcIuKKhFwiLFwiJnN1YmU7XCI6XCLiioZcIixcIiZzdXBlO1wiOlwi4oqHXCIsXCImb3BsdXM7XCI6XCLiipVcIixcIiZvdGltZXM7XCI6XCLiipdcIixcIiZwZXJwO1wiOlwi4oqlXCIsXCImc2RvdDtcIjpcIuKLhVwiLFwiJmxjZWlsO1wiOlwi4oyIXCIsXCImcmNlaWw7XCI6XCLijIlcIixcIiZsZmxvb3I7XCI6XCLijIpcIixcIiZyZmxvb3I7XCI6XCLijItcIixcIiZsYW5nO1wiOlwi4oypXCIsXCImcmFuZztcIjpcIuKMqlwiLFwiJmxvejtcIjpcIuKXilwiLFwiJnNwYWRlcztcIjpcIuKZoFwiLFwiJmNsdWJzO1wiOlwi4pmjXCIsXCImaGVhcnRzO1wiOlwi4pmlXCIsXCImZGlhbXM7XCI6XCLimaZcIn0sY2hhcmFjdGVyczp7XCInXCI6XCImYXBvcztcIixcIsKgXCI6XCImbmJzcDtcIixcIsKhXCI6XCImaWV4Y2w7XCIsXCLColwiOlwiJmNlbnQ7XCIsXCLCo1wiOlwiJnBvdW5kO1wiLFwiwqRcIjpcIiZjdXJyZW47XCIsXCLCpVwiOlwiJnllbjtcIixcIsKmXCI6XCImYnJ2YmFyO1wiLFwiwqdcIjpcIiZzZWN0O1wiLFwiwqhcIjpcIiZ1bWw7XCIsXCLCqVwiOlwiJmNvcHk7XCIsXCLCqlwiOlwiJm9yZGY7XCIsXCLCq1wiOlwiJmxhcXVvO1wiLFwiwqxcIjpcIiZub3Q7XCIsXCLCrVwiOlwiJnNoeTtcIixcIsKuXCI6XCImcmVnO1wiLFwiwq9cIjpcIiZtYWNyO1wiLFwiwrBcIjpcIiZkZWc7XCIsXCLCsVwiOlwiJnBsdXNtbjtcIixcIsKyXCI6XCImc3VwMjtcIixcIsKzXCI6XCImc3VwMztcIixcIsK0XCI6XCImYWN1dGU7XCIsXCLCtVwiOlwiJm1pY3JvO1wiLFwiwrZcIjpcIiZwYXJhO1wiLFwiwrdcIjpcIiZtaWRkb3Q7XCIsXCLCuFwiOlwiJmNlZGlsO1wiLFwiwrlcIjpcIiZzdXAxO1wiLFwiwrpcIjpcIiZvcmRtO1wiLFwiwrtcIjpcIiZyYXF1bztcIixcIsK8XCI6XCImZnJhYzE0O1wiLFwiwr1cIjpcIiZmcmFjMTI7XCIsXCLCvlwiOlwiJmZyYWMzNDtcIixcIsK/XCI6XCImaXF1ZXN0O1wiLFwiw4BcIjpcIiZBZ3JhdmU7XCIsXCLDgVwiOlwiJkFhY3V0ZTtcIixcIsOCXCI6XCImQWNpcmM7XCIsXCLDg1wiOlwiJkF0aWxkZTtcIixcIsOEXCI6XCImQXVtbDtcIixcIsOFXCI6XCImQXJpbmc7XCIsXCLDhlwiOlwiJkFFbGlnO1wiLFwiw4dcIjpcIiZDY2VkaWw7XCIsXCLDiFwiOlwiJkVncmF2ZTtcIixcIsOJXCI6XCImRWFjdXRlO1wiLFwiw4pcIjpcIiZFY2lyYztcIixcIsOLXCI6XCImRXVtbDtcIixcIsOMXCI6XCImSWdyYXZlO1wiLFwiw41cIjpcIiZJYWN1dGU7XCIsXCLDjlwiOlwiJkljaXJjO1wiLFwiw49cIjpcIiZJdW1sO1wiLFwiw5BcIjpcIiZFVEg7XCIsXCLDkVwiOlwiJk50aWxkZTtcIixcIsOSXCI6XCImT2dyYXZlO1wiLFwiw5NcIjpcIiZPYWN1dGU7XCIsXCLDlFwiOlwiJk9jaXJjO1wiLFwiw5VcIjpcIiZPdGlsZGU7XCIsXCLDllwiOlwiJk91bWw7XCIsXCLDl1wiOlwiJnRpbWVzO1wiLFwiw5hcIjpcIiZPc2xhc2g7XCIsXCLDmVwiOlwiJlVncmF2ZTtcIixcIsOaXCI6XCImVWFjdXRlO1wiLFwiw5tcIjpcIiZVY2lyYztcIixcIsOcXCI6XCImVXVtbDtcIixcIsOdXCI6XCImWWFjdXRlO1wiLFwiw55cIjpcIiZUSE9STjtcIixcIsOfXCI6XCImc3psaWc7XCIsXCLDoFwiOlwiJmFncmF2ZTtcIixcIsOhXCI6XCImYWFjdXRlO1wiLFwiw6JcIjpcIiZhY2lyYztcIixcIsOjXCI6XCImYXRpbGRlO1wiLFwiw6RcIjpcIiZhdW1sO1wiLFwiw6VcIjpcIiZhcmluZztcIixcIsOmXCI6XCImYWVsaWc7XCIsXCLDp1wiOlwiJmNjZWRpbDtcIixcIsOoXCI6XCImZWdyYXZlO1wiLFwiw6lcIjpcIiZlYWN1dGU7XCIsXCLDqlwiOlwiJmVjaXJjO1wiLFwiw6tcIjpcIiZldW1sO1wiLFwiw6xcIjpcIiZpZ3JhdmU7XCIsXCLDrVwiOlwiJmlhY3V0ZTtcIixcIsOuXCI6XCImaWNpcmM7XCIsXCLDr1wiOlwiJml1bWw7XCIsXCLDsFwiOlwiJmV0aDtcIixcIsOxXCI6XCImbnRpbGRlO1wiLFwiw7JcIjpcIiZvZ3JhdmU7XCIsXCLDs1wiOlwiJm9hY3V0ZTtcIixcIsO0XCI6XCImb2NpcmM7XCIsXCLDtVwiOlwiJm90aWxkZTtcIixcIsO2XCI6XCImb3VtbDtcIixcIsO3XCI6XCImZGl2aWRlO1wiLFwiw7hcIjpcIiZvc2xhc2g7XCIsXCLDuVwiOlwiJnVncmF2ZTtcIixcIsO6XCI6XCImdWFjdXRlO1wiLFwiw7tcIjpcIiZ1Y2lyYztcIixcIsO8XCI6XCImdXVtbDtcIixcIsO9XCI6XCImeWFjdXRlO1wiLFwiw75cIjpcIiZ0aG9ybjtcIixcIsO/XCI6XCImeXVtbDtcIiwnXCInOlwiJnF1b3Q7XCIsXCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLFwixZJcIjpcIiZPRWxpZztcIixcIsWTXCI6XCImb2VsaWc7XCIsXCLFoFwiOlwiJlNjYXJvbjtcIixcIsWhXCI6XCImc2Nhcm9uO1wiLFwixbhcIjpcIiZZdW1sO1wiLFwiy4ZcIjpcIiZjaXJjO1wiLFwiy5xcIjpcIiZ0aWxkZTtcIixcIuKAglwiOlwiJmVuc3A7XCIsXCLigINcIjpcIiZlbXNwO1wiLFwi4oCJXCI6XCImdGhpbnNwO1wiLFwi4oCMXCI6XCImenduajtcIixcIuKAjVwiOlwiJnp3ajtcIixcIuKAjlwiOlwiJmxybTtcIixcIuKAj1wiOlwiJnJsbTtcIixcIuKAk1wiOlwiJm5kYXNoO1wiLFwi4oCUXCI6XCImbWRhc2g7XCIsXCLigJhcIjpcIiZsc3F1bztcIixcIuKAmVwiOlwiJnJzcXVvO1wiLFwi4oCaXCI6XCImc2JxdW87XCIsXCLigJxcIjpcIiZsZHF1bztcIixcIuKAnVwiOlwiJnJkcXVvO1wiLFwi4oCeXCI6XCImYmRxdW87XCIsXCLigKBcIjpcIiZkYWdnZXI7XCIsXCLigKFcIjpcIiZEYWdnZXI7XCIsXCLigLBcIjpcIiZwZXJtaWw7XCIsXCLigLlcIjpcIiZsc2FxdW87XCIsXCLigLpcIjpcIiZyc2FxdW87XCIsXCLigqxcIjpcIiZldXJvO1wiLFwixpJcIjpcIiZmbm9mO1wiLFwizpFcIjpcIiZBbHBoYTtcIixcIs6SXCI6XCImQmV0YTtcIixcIs6TXCI6XCImR2FtbWE7XCIsXCLOlFwiOlwiJkRlbHRhO1wiLFwizpVcIjpcIiZFcHNpbG9uO1wiLFwizpZcIjpcIiZaZXRhO1wiLFwizpdcIjpcIiZFdGE7XCIsXCLOmFwiOlwiJlRoZXRhO1wiLFwizplcIjpcIiZJb3RhO1wiLFwizppcIjpcIiZLYXBwYTtcIixcIs6bXCI6XCImTGFtYmRhO1wiLFwizpxcIjpcIiZNdTtcIixcIs6dXCI6XCImTnU7XCIsXCLOnlwiOlwiJlhpO1wiLFwizp9cIjpcIiZPbWljcm9uO1wiLFwizqBcIjpcIiZQaTtcIixcIs6hXCI6XCImUmhvO1wiLFwizqNcIjpcIiZTaWdtYTtcIixcIs6kXCI6XCImVGF1O1wiLFwizqVcIjpcIiZVcHNpbG9uO1wiLFwizqZcIjpcIiZQaGk7XCIsXCLOp1wiOlwiJkNoaTtcIixcIs6oXCI6XCImUHNpO1wiLFwizqlcIjpcIiZPbWVnYTtcIixcIs6xXCI6XCImYWxwaGE7XCIsXCLOslwiOlwiJmJldGE7XCIsXCLOs1wiOlwiJmdhbW1hO1wiLFwizrRcIjpcIiZkZWx0YTtcIixcIs61XCI6XCImZXBzaWxvbjtcIixcIs62XCI6XCImemV0YTtcIixcIs63XCI6XCImZXRhO1wiLFwizrhcIjpcIiZ0aGV0YTtcIixcIs65XCI6XCImaW90YTtcIixcIs66XCI6XCIma2FwcGE7XCIsXCLOu1wiOlwiJmxhbWJkYTtcIixcIs68XCI6XCImbXU7XCIsXCLOvVwiOlwiJm51O1wiLFwizr5cIjpcIiZ4aTtcIixcIs6/XCI6XCImb21pY3JvbjtcIixcIs+AXCI6XCImcGk7XCIsXCLPgVwiOlwiJnJobztcIixcIs+CXCI6XCImc2lnbWFmO1wiLFwiz4NcIjpcIiZzaWdtYTtcIixcIs+EXCI6XCImdGF1O1wiLFwiz4VcIjpcIiZ1cHNpbG9uO1wiLFwiz4ZcIjpcIiZwaGk7XCIsXCLPh1wiOlwiJmNoaTtcIixcIs+IXCI6XCImcHNpO1wiLFwiz4lcIjpcIiZvbWVnYTtcIixcIs+RXCI6XCImdGhldGFzeW07XCIsXCLPklwiOlwiJnVwc2loO1wiLFwiz5ZcIjpcIiZwaXY7XCIsXCLigKJcIjpcIiZidWxsO1wiLFwi4oCmXCI6XCImaGVsbGlwO1wiLFwi4oCyXCI6XCImcHJpbWU7XCIsXCLigLNcIjpcIiZQcmltZTtcIixcIuKAvlwiOlwiJm9saW5lO1wiLFwi4oGEXCI6XCImZnJhc2w7XCIsXCLihJhcIjpcIiZ3ZWllcnA7XCIsXCLihJFcIjpcIiZpbWFnZTtcIixcIuKEnFwiOlwiJnJlYWw7XCIsXCLihKJcIjpcIiZ0cmFkZTtcIixcIuKEtVwiOlwiJmFsZWZzeW07XCIsXCLihpBcIjpcIiZsYXJyO1wiLFwi4oaRXCI6XCImdWFycjtcIixcIuKGklwiOlwiJnJhcnI7XCIsXCLihpNcIjpcIiZkYXJyO1wiLFwi4oaUXCI6XCImaGFycjtcIixcIuKGtVwiOlwiJmNyYXJyO1wiLFwi4oeQXCI6XCImbEFycjtcIixcIuKHkVwiOlwiJnVBcnI7XCIsXCLih5JcIjpcIiZyQXJyO1wiLFwi4oeTXCI6XCImZEFycjtcIixcIuKHlFwiOlwiJmhBcnI7XCIsXCLiiIBcIjpcIiZmb3JhbGw7XCIsXCLiiIJcIjpcIiZwYXJ0O1wiLFwi4oiDXCI6XCImZXhpc3Q7XCIsXCLiiIVcIjpcIiZlbXB0eTtcIixcIuKIh1wiOlwiJm5hYmxhO1wiLFwi4oiIXCI6XCImaXNpbjtcIixcIuKIiVwiOlwiJm5vdGluO1wiLFwi4oiLXCI6XCImbmk7XCIsXCLiiI9cIjpcIiZwcm9kO1wiLFwi4oiRXCI6XCImc3VtO1wiLFwi4oiSXCI6XCImbWludXM7XCIsXCLiiJdcIjpcIiZsb3dhc3Q7XCIsXCLiiJpcIjpcIiZyYWRpYztcIixcIuKInVwiOlwiJnByb3A7XCIsXCLiiJ5cIjpcIiZpbmZpbjtcIixcIuKIoFwiOlwiJmFuZztcIixcIuKIp1wiOlwiJmFuZDtcIixcIuKIqFwiOlwiJm9yO1wiLFwi4oipXCI6XCImY2FwO1wiLFwi4oiqXCI6XCImY3VwO1wiLFwi4oirXCI6XCImaW50O1wiLFwi4oi0XCI6XCImdGhlcmU0O1wiLFwi4oi8XCI6XCImc2ltO1wiLFwi4omFXCI6XCImY29uZztcIixcIuKJiFwiOlwiJmFzeW1wO1wiLFwi4omgXCI6XCImbmU7XCIsXCLiiaFcIjpcIiZlcXVpdjtcIixcIuKJpFwiOlwiJmxlO1wiLFwi4omlXCI6XCImZ2U7XCIsXCLiioJcIjpcIiZzdWI7XCIsXCLiioNcIjpcIiZzdXA7XCIsXCLiioRcIjpcIiZuc3ViO1wiLFwi4oqGXCI6XCImc3ViZTtcIixcIuKKh1wiOlwiJnN1cGU7XCIsXCLiipVcIjpcIiZvcGx1cztcIixcIuKKl1wiOlwiJm90aW1lcztcIixcIuKKpVwiOlwiJnBlcnA7XCIsXCLii4VcIjpcIiZzZG90O1wiLFwi4oyIXCI6XCImbGNlaWw7XCIsXCLijIlcIjpcIiZyY2VpbDtcIixcIuKMilwiOlwiJmxmbG9vcjtcIixcIuKMi1wiOlwiJnJmbG9vcjtcIixcIuKMqVwiOlwiJmxhbmc7XCIsXCLijKpcIjpcIiZyYW5nO1wiLFwi4peKXCI6XCImbG96O1wiLFwi4pmgXCI6XCImc3BhZGVzO1wiLFwi4pmjXCI6XCImY2x1YnM7XCIsXCLimaVcIjpcIiZoZWFydHM7XCIsXCLimaZcIjpcIiZkaWFtcztcIn19LGh0bWw1OntlbnRpdGllczp7XCImQUVsaWdcIjpcIsOGXCIsXCImQUVsaWc7XCI6XCLDhlwiLFwiJkFNUFwiOlwiJlwiLFwiJkFNUDtcIjpcIiZcIixcIiZBYWN1dGVcIjpcIsOBXCIsXCImQWFjdXRlO1wiOlwiw4FcIixcIiZBYnJldmU7XCI6XCLEglwiLFwiJkFjaXJjXCI6XCLDglwiLFwiJkFjaXJjO1wiOlwiw4JcIixcIiZBY3k7XCI6XCLQkFwiLFwiJkFmcjtcIjpcIvCdlIRcIixcIiZBZ3JhdmVcIjpcIsOAXCIsXCImQWdyYXZlO1wiOlwiw4BcIixcIiZBbHBoYTtcIjpcIs6RXCIsXCImQW1hY3I7XCI6XCLEgFwiLFwiJkFuZDtcIjpcIuKpk1wiLFwiJkFvZ29uO1wiOlwixIRcIixcIiZBb3BmO1wiOlwi8J2UuFwiLFwiJkFwcGx5RnVuY3Rpb247XCI6XCLigaFcIixcIiZBcmluZ1wiOlwiw4VcIixcIiZBcmluZztcIjpcIsOFXCIsXCImQXNjcjtcIjpcIvCdkpxcIixcIiZBc3NpZ247XCI6XCLiiZRcIixcIiZBdGlsZGVcIjpcIsODXCIsXCImQXRpbGRlO1wiOlwiw4NcIixcIiZBdW1sXCI6XCLDhFwiLFwiJkF1bWw7XCI6XCLDhFwiLFwiJkJhY2tzbGFzaDtcIjpcIuKIllwiLFwiJkJhcnY7XCI6XCLiq6dcIixcIiZCYXJ3ZWQ7XCI6XCLijIZcIixcIiZCY3k7XCI6XCLQkVwiLFwiJkJlY2F1c2U7XCI6XCLiiLVcIixcIiZCZXJub3VsbGlzO1wiOlwi4oSsXCIsXCImQmV0YTtcIjpcIs6SXCIsXCImQmZyO1wiOlwi8J2UhVwiLFwiJkJvcGY7XCI6XCLwnZS5XCIsXCImQnJldmU7XCI6XCLLmFwiLFwiJkJzY3I7XCI6XCLihKxcIixcIiZCdW1wZXE7XCI6XCLiiY5cIixcIiZDSGN5O1wiOlwi0KdcIixcIiZDT1BZXCI6XCLCqVwiLFwiJkNPUFk7XCI6XCLCqVwiLFwiJkNhY3V0ZTtcIjpcIsSGXCIsXCImQ2FwO1wiOlwi4ouSXCIsXCImQ2FwaXRhbERpZmZlcmVudGlhbEQ7XCI6XCLihYVcIixcIiZDYXlsZXlzO1wiOlwi4oStXCIsXCImQ2Nhcm9uO1wiOlwixIxcIixcIiZDY2VkaWxcIjpcIsOHXCIsXCImQ2NlZGlsO1wiOlwiw4dcIixcIiZDY2lyYztcIjpcIsSIXCIsXCImQ2NvbmludDtcIjpcIuKIsFwiLFwiJkNkb3Q7XCI6XCLEilwiLFwiJkNlZGlsbGE7XCI6XCLCuFwiLFwiJkNlbnRlckRvdDtcIjpcIsK3XCIsXCImQ2ZyO1wiOlwi4oStXCIsXCImQ2hpO1wiOlwizqdcIixcIiZDaXJjbGVEb3Q7XCI6XCLiiplcIixcIiZDaXJjbGVNaW51cztcIjpcIuKKllwiLFwiJkNpcmNsZVBsdXM7XCI6XCLiipVcIixcIiZDaXJjbGVUaW1lcztcIjpcIuKKl1wiLFwiJkNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbDtcIjpcIuKIslwiLFwiJkNsb3NlQ3VybHlEb3VibGVRdW90ZTtcIjpcIuKAnVwiLFwiJkNsb3NlQ3VybHlRdW90ZTtcIjpcIuKAmVwiLFwiJkNvbG9uO1wiOlwi4oi3XCIsXCImQ29sb25lO1wiOlwi4qm0XCIsXCImQ29uZ3J1ZW50O1wiOlwi4omhXCIsXCImQ29uaW50O1wiOlwi4oivXCIsXCImQ29udG91ckludGVncmFsO1wiOlwi4oiuXCIsXCImQ29wZjtcIjpcIuKEglwiLFwiJkNvcHJvZHVjdDtcIjpcIuKIkFwiLFwiJkNvdW50ZXJDbG9ja3dpc2VDb250b3VySW50ZWdyYWw7XCI6XCLiiLNcIixcIiZDcm9zcztcIjpcIuKor1wiLFwiJkNzY3I7XCI6XCLwnZKeXCIsXCImQ3VwO1wiOlwi4ouTXCIsXCImQ3VwQ2FwO1wiOlwi4omNXCIsXCImREQ7XCI6XCLihYVcIixcIiZERG90cmFoZDtcIjpcIuKkkVwiLFwiJkRKY3k7XCI6XCLQglwiLFwiJkRTY3k7XCI6XCLQhVwiLFwiJkRaY3k7XCI6XCLQj1wiLFwiJkRhZ2dlcjtcIjpcIuKAoVwiLFwiJkRhcnI7XCI6XCLihqFcIixcIiZEYXNodjtcIjpcIuKrpFwiLFwiJkRjYXJvbjtcIjpcIsSOXCIsXCImRGN5O1wiOlwi0JRcIixcIiZEZWw7XCI6XCLiiIdcIixcIiZEZWx0YTtcIjpcIs6UXCIsXCImRGZyO1wiOlwi8J2Uh1wiLFwiJkRpYWNyaXRpY2FsQWN1dGU7XCI6XCLCtFwiLFwiJkRpYWNyaXRpY2FsRG90O1wiOlwiy5lcIixcIiZEaWFjcml0aWNhbERvdWJsZUFjdXRlO1wiOlwiy51cIixcIiZEaWFjcml0aWNhbEdyYXZlO1wiOlwiYFwiLFwiJkRpYWNyaXRpY2FsVGlsZGU7XCI6XCLLnFwiLFwiJkRpYW1vbmQ7XCI6XCLii4RcIixcIiZEaWZmZXJlbnRpYWxEO1wiOlwi4oWGXCIsXCImRG9wZjtcIjpcIvCdlLtcIixcIiZEb3Q7XCI6XCLCqFwiLFwiJkRvdERvdDtcIjpcIuKDnFwiLFwiJkRvdEVxdWFsO1wiOlwi4omQXCIsXCImRG91YmxlQ29udG91ckludGVncmFsO1wiOlwi4oivXCIsXCImRG91YmxlRG90O1wiOlwiwqhcIixcIiZEb3VibGVEb3duQXJyb3c7XCI6XCLih5NcIixcIiZEb3VibGVMZWZ0QXJyb3c7XCI6XCLih5BcIixcIiZEb3VibGVMZWZ0UmlnaHRBcnJvdztcIjpcIuKHlFwiLFwiJkRvdWJsZUxlZnRUZWU7XCI6XCLiq6RcIixcIiZEb3VibGVMb25nTGVmdEFycm93O1wiOlwi4p+4XCIsXCImRG91YmxlTG9uZ0xlZnRSaWdodEFycm93O1wiOlwi4p+6XCIsXCImRG91YmxlTG9uZ1JpZ2h0QXJyb3c7XCI6XCLin7lcIixcIiZEb3VibGVSaWdodEFycm93O1wiOlwi4oeSXCIsXCImRG91YmxlUmlnaHRUZWU7XCI6XCLiiqhcIixcIiZEb3VibGVVcEFycm93O1wiOlwi4oeRXCIsXCImRG91YmxlVXBEb3duQXJyb3c7XCI6XCLih5VcIixcIiZEb3VibGVWZXJ0aWNhbEJhcjtcIjpcIuKIpVwiLFwiJkRvd25BcnJvdztcIjpcIuKGk1wiLFwiJkRvd25BcnJvd0JhcjtcIjpcIuKkk1wiLFwiJkRvd25BcnJvd1VwQXJyb3c7XCI6XCLih7VcIixcIiZEb3duQnJldmU7XCI6XCLMkVwiLFwiJkRvd25MZWZ0UmlnaHRWZWN0b3I7XCI6XCLipZBcIixcIiZEb3duTGVmdFRlZVZlY3RvcjtcIjpcIuKlnlwiLFwiJkRvd25MZWZ0VmVjdG9yO1wiOlwi4oa9XCIsXCImRG93bkxlZnRWZWN0b3JCYXI7XCI6XCLipZZcIixcIiZEb3duUmlnaHRUZWVWZWN0b3I7XCI6XCLipZ9cIixcIiZEb3duUmlnaHRWZWN0b3I7XCI6XCLih4FcIixcIiZEb3duUmlnaHRWZWN0b3JCYXI7XCI6XCLipZdcIixcIiZEb3duVGVlO1wiOlwi4oqkXCIsXCImRG93blRlZUFycm93O1wiOlwi4oanXCIsXCImRG93bmFycm93O1wiOlwi4oeTXCIsXCImRHNjcjtcIjpcIvCdkp9cIixcIiZEc3Ryb2s7XCI6XCLEkFwiLFwiJkVORztcIjpcIsWKXCIsXCImRVRIXCI6XCLDkFwiLFwiJkVUSDtcIjpcIsOQXCIsXCImRWFjdXRlXCI6XCLDiVwiLFwiJkVhY3V0ZTtcIjpcIsOJXCIsXCImRWNhcm9uO1wiOlwixJpcIixcIiZFY2lyY1wiOlwiw4pcIixcIiZFY2lyYztcIjpcIsOKXCIsXCImRWN5O1wiOlwi0K1cIixcIiZFZG90O1wiOlwixJZcIixcIiZFZnI7XCI6XCLwnZSIXCIsXCImRWdyYXZlXCI6XCLDiFwiLFwiJkVncmF2ZTtcIjpcIsOIXCIsXCImRWxlbWVudDtcIjpcIuKIiFwiLFwiJkVtYWNyO1wiOlwixJJcIixcIiZFbXB0eVNtYWxsU3F1YXJlO1wiOlwi4pe7XCIsXCImRW1wdHlWZXJ5U21hbGxTcXVhcmU7XCI6XCLilqtcIixcIiZFb2dvbjtcIjpcIsSYXCIsXCImRW9wZjtcIjpcIvCdlLxcIixcIiZFcHNpbG9uO1wiOlwizpVcIixcIiZFcXVhbDtcIjpcIuKptVwiLFwiJkVxdWFsVGlsZGU7XCI6XCLiiYJcIixcIiZFcXVpbGlicml1bTtcIjpcIuKHjFwiLFwiJkVzY3I7XCI6XCLihLBcIixcIiZFc2ltO1wiOlwi4qmzXCIsXCImRXRhO1wiOlwizpdcIixcIiZFdW1sXCI6XCLDi1wiLFwiJkV1bWw7XCI6XCLDi1wiLFwiJkV4aXN0cztcIjpcIuKIg1wiLFwiJkV4cG9uZW50aWFsRTtcIjpcIuKFh1wiLFwiJkZjeTtcIjpcItCkXCIsXCImRmZyO1wiOlwi8J2UiVwiLFwiJkZpbGxlZFNtYWxsU3F1YXJlO1wiOlwi4pe8XCIsXCImRmlsbGVkVmVyeVNtYWxsU3F1YXJlO1wiOlwi4paqXCIsXCImRm9wZjtcIjpcIvCdlL1cIixcIiZGb3JBbGw7XCI6XCLiiIBcIixcIiZGb3VyaWVydHJmO1wiOlwi4oSxXCIsXCImRnNjcjtcIjpcIuKEsVwiLFwiJkdKY3k7XCI6XCLQg1wiLFwiJkdUXCI6XCI+XCIsXCImR1Q7XCI6XCI+XCIsXCImR2FtbWE7XCI6XCLOk1wiLFwiJkdhbW1hZDtcIjpcIs+cXCIsXCImR2JyZXZlO1wiOlwixJ5cIixcIiZHY2VkaWw7XCI6XCLEolwiLFwiJkdjaXJjO1wiOlwixJxcIixcIiZHY3k7XCI6XCLQk1wiLFwiJkdkb3Q7XCI6XCLEoFwiLFwiJkdmcjtcIjpcIvCdlIpcIixcIiZHZztcIjpcIuKLmVwiLFwiJkdvcGY7XCI6XCLwnZS+XCIsXCImR3JlYXRlckVxdWFsO1wiOlwi4omlXCIsXCImR3JlYXRlckVxdWFsTGVzcztcIjpcIuKLm1wiLFwiJkdyZWF0ZXJGdWxsRXF1YWw7XCI6XCLiiadcIixcIiZHcmVhdGVyR3JlYXRlcjtcIjpcIuKqolwiLFwiJkdyZWF0ZXJMZXNzO1wiOlwi4om3XCIsXCImR3JlYXRlclNsYW50RXF1YWw7XCI6XCLiqb5cIixcIiZHcmVhdGVyVGlsZGU7XCI6XCLiibNcIixcIiZHc2NyO1wiOlwi8J2SolwiLFwiJkd0O1wiOlwi4omrXCIsXCImSEFSRGN5O1wiOlwi0KpcIixcIiZIYWNlaztcIjpcIsuHXCIsXCImSGF0O1wiOlwiXlwiLFwiJkhjaXJjO1wiOlwixKRcIixcIiZIZnI7XCI6XCLihIxcIixcIiZIaWxiZXJ0U3BhY2U7XCI6XCLihItcIixcIiZIb3BmO1wiOlwi4oSNXCIsXCImSG9yaXpvbnRhbExpbmU7XCI6XCLilIBcIixcIiZIc2NyO1wiOlwi4oSLXCIsXCImSHN0cm9rO1wiOlwixKZcIixcIiZIdW1wRG93bkh1bXA7XCI6XCLiiY5cIixcIiZIdW1wRXF1YWw7XCI6XCLiiY9cIixcIiZJRWN5O1wiOlwi0JVcIixcIiZJSmxpZztcIjpcIsSyXCIsXCImSU9jeTtcIjpcItCBXCIsXCImSWFjdXRlXCI6XCLDjVwiLFwiJklhY3V0ZTtcIjpcIsONXCIsXCImSWNpcmNcIjpcIsOOXCIsXCImSWNpcmM7XCI6XCLDjlwiLFwiJkljeTtcIjpcItCYXCIsXCImSWRvdDtcIjpcIsSwXCIsXCImSWZyO1wiOlwi4oSRXCIsXCImSWdyYXZlXCI6XCLDjFwiLFwiJklncmF2ZTtcIjpcIsOMXCIsXCImSW07XCI6XCLihJFcIixcIiZJbWFjcjtcIjpcIsSqXCIsXCImSW1hZ2luYXJ5STtcIjpcIuKFiFwiLFwiJkltcGxpZXM7XCI6XCLih5JcIixcIiZJbnQ7XCI6XCLiiKxcIixcIiZJbnRlZ3JhbDtcIjpcIuKIq1wiLFwiJkludGVyc2VjdGlvbjtcIjpcIuKLglwiLFwiJkludmlzaWJsZUNvbW1hO1wiOlwi4oGjXCIsXCImSW52aXNpYmxlVGltZXM7XCI6XCLigaJcIixcIiZJb2dvbjtcIjpcIsSuXCIsXCImSW9wZjtcIjpcIvCdlYBcIixcIiZJb3RhO1wiOlwizplcIixcIiZJc2NyO1wiOlwi4oSQXCIsXCImSXRpbGRlO1wiOlwixKhcIixcIiZJdWtjeTtcIjpcItCGXCIsXCImSXVtbFwiOlwiw49cIixcIiZJdW1sO1wiOlwiw49cIixcIiZKY2lyYztcIjpcIsS0XCIsXCImSmN5O1wiOlwi0JlcIixcIiZKZnI7XCI6XCLwnZSNXCIsXCImSm9wZjtcIjpcIvCdlYFcIixcIiZKc2NyO1wiOlwi8J2SpVwiLFwiJkpzZXJjeTtcIjpcItCIXCIsXCImSnVrY3k7XCI6XCLQhFwiLFwiJktIY3k7XCI6XCLQpVwiLFwiJktKY3k7XCI6XCLQjFwiLFwiJkthcHBhO1wiOlwizppcIixcIiZLY2VkaWw7XCI6XCLEtlwiLFwiJktjeTtcIjpcItCaXCIsXCImS2ZyO1wiOlwi8J2UjlwiLFwiJktvcGY7XCI6XCLwnZWCXCIsXCImS3NjcjtcIjpcIvCdkqZcIixcIiZMSmN5O1wiOlwi0IlcIixcIiZMVFwiOlwiPFwiLFwiJkxUO1wiOlwiPFwiLFwiJkxhY3V0ZTtcIjpcIsS5XCIsXCImTGFtYmRhO1wiOlwizptcIixcIiZMYW5nO1wiOlwi4p+qXCIsXCImTGFwbGFjZXRyZjtcIjpcIuKEklwiLFwiJkxhcnI7XCI6XCLihp5cIixcIiZMY2Fyb247XCI6XCLEvVwiLFwiJkxjZWRpbDtcIjpcIsS7XCIsXCImTGN5O1wiOlwi0JtcIixcIiZMZWZ0QW5nbGVCcmFja2V0O1wiOlwi4p+oXCIsXCImTGVmdEFycm93O1wiOlwi4oaQXCIsXCImTGVmdEFycm93QmFyO1wiOlwi4oekXCIsXCImTGVmdEFycm93UmlnaHRBcnJvdztcIjpcIuKHhlwiLFwiJkxlZnRDZWlsaW5nO1wiOlwi4oyIXCIsXCImTGVmdERvdWJsZUJyYWNrZXQ7XCI6XCLin6ZcIixcIiZMZWZ0RG93blRlZVZlY3RvcjtcIjpcIuKloVwiLFwiJkxlZnREb3duVmVjdG9yO1wiOlwi4oeDXCIsXCImTGVmdERvd25WZWN0b3JCYXI7XCI6XCLipZlcIixcIiZMZWZ0Rmxvb3I7XCI6XCLijIpcIixcIiZMZWZ0UmlnaHRBcnJvdztcIjpcIuKGlFwiLFwiJkxlZnRSaWdodFZlY3RvcjtcIjpcIuKljlwiLFwiJkxlZnRUZWU7XCI6XCLiiqNcIixcIiZMZWZ0VGVlQXJyb3c7XCI6XCLihqRcIixcIiZMZWZ0VGVlVmVjdG9yO1wiOlwi4qWaXCIsXCImTGVmdFRyaWFuZ2xlO1wiOlwi4oqyXCIsXCImTGVmdFRyaWFuZ2xlQmFyO1wiOlwi4qePXCIsXCImTGVmdFRyaWFuZ2xlRXF1YWw7XCI6XCLiirRcIixcIiZMZWZ0VXBEb3duVmVjdG9yO1wiOlwi4qWRXCIsXCImTGVmdFVwVGVlVmVjdG9yO1wiOlwi4qWgXCIsXCImTGVmdFVwVmVjdG9yO1wiOlwi4oa/XCIsXCImTGVmdFVwVmVjdG9yQmFyO1wiOlwi4qWYXCIsXCImTGVmdFZlY3RvcjtcIjpcIuKGvFwiLFwiJkxlZnRWZWN0b3JCYXI7XCI6XCLipZJcIixcIiZMZWZ0YXJyb3c7XCI6XCLih5BcIixcIiZMZWZ0cmlnaHRhcnJvdztcIjpcIuKHlFwiLFwiJkxlc3NFcXVhbEdyZWF0ZXI7XCI6XCLii5pcIixcIiZMZXNzRnVsbEVxdWFsO1wiOlwi4ommXCIsXCImTGVzc0dyZWF0ZXI7XCI6XCLiibZcIixcIiZMZXNzTGVzcztcIjpcIuKqoVwiLFwiJkxlc3NTbGFudEVxdWFsO1wiOlwi4qm9XCIsXCImTGVzc1RpbGRlO1wiOlwi4omyXCIsXCImTGZyO1wiOlwi8J2Uj1wiLFwiJkxsO1wiOlwi4ouYXCIsXCImTGxlZnRhcnJvdztcIjpcIuKHmlwiLFwiJkxtaWRvdDtcIjpcIsS/XCIsXCImTG9uZ0xlZnRBcnJvdztcIjpcIuKftVwiLFwiJkxvbmdMZWZ0UmlnaHRBcnJvdztcIjpcIuKft1wiLFwiJkxvbmdSaWdodEFycm93O1wiOlwi4p+2XCIsXCImTG9uZ2xlZnRhcnJvdztcIjpcIuKfuFwiLFwiJkxvbmdsZWZ0cmlnaHRhcnJvdztcIjpcIuKfulwiLFwiJkxvbmdyaWdodGFycm93O1wiOlwi4p+5XCIsXCImTG9wZjtcIjpcIvCdlYNcIixcIiZMb3dlckxlZnRBcnJvdztcIjpcIuKGmVwiLFwiJkxvd2VyUmlnaHRBcnJvdztcIjpcIuKGmFwiLFwiJkxzY3I7XCI6XCLihJJcIixcIiZMc2g7XCI6XCLihrBcIixcIiZMc3Ryb2s7XCI6XCLFgVwiLFwiJkx0O1wiOlwi4omqXCIsXCImTWFwO1wiOlwi4qSFXCIsXCImTWN5O1wiOlwi0JxcIixcIiZNZWRpdW1TcGFjZTtcIjpcIuKBn1wiLFwiJk1lbGxpbnRyZjtcIjpcIuKEs1wiLFwiJk1mcjtcIjpcIvCdlJBcIixcIiZNaW51c1BsdXM7XCI6XCLiiJNcIixcIiZNb3BmO1wiOlwi8J2VhFwiLFwiJk1zY3I7XCI6XCLihLNcIixcIiZNdTtcIjpcIs6cXCIsXCImTkpjeTtcIjpcItCKXCIsXCImTmFjdXRlO1wiOlwixYNcIixcIiZOY2Fyb247XCI6XCLFh1wiLFwiJk5jZWRpbDtcIjpcIsWFXCIsXCImTmN5O1wiOlwi0J1cIixcIiZOZWdhdGl2ZU1lZGl1bVNwYWNlO1wiOlwi4oCLXCIsXCImTmVnYXRpdmVUaGlja1NwYWNlO1wiOlwi4oCLXCIsXCImTmVnYXRpdmVUaGluU3BhY2U7XCI6XCLigItcIixcIiZOZWdhdGl2ZVZlcnlUaGluU3BhY2U7XCI6XCLigItcIixcIiZOZXN0ZWRHcmVhdGVyR3JlYXRlcjtcIjpcIuKJq1wiLFwiJk5lc3RlZExlc3NMZXNzO1wiOlwi4omqXCIsXCImTmV3TGluZTtcIjpcIlxcblwiLFwiJk5mcjtcIjpcIvCdlJFcIixcIiZOb0JyZWFrO1wiOlwi4oGgXCIsXCImTm9uQnJlYWtpbmdTcGFjZTtcIjpcIsKgXCIsXCImTm9wZjtcIjpcIuKElVwiLFwiJk5vdDtcIjpcIuKrrFwiLFwiJk5vdENvbmdydWVudDtcIjpcIuKJolwiLFwiJk5vdEN1cENhcDtcIjpcIuKJrVwiLFwiJk5vdERvdWJsZVZlcnRpY2FsQmFyO1wiOlwi4oimXCIsXCImTm90RWxlbWVudDtcIjpcIuKIiVwiLFwiJk5vdEVxdWFsO1wiOlwi4omgXCIsXCImTm90RXF1YWxUaWxkZTtcIjpcIuKJgsy4XCIsXCImTm90RXhpc3RzO1wiOlwi4oiEXCIsXCImTm90R3JlYXRlcjtcIjpcIuKJr1wiLFwiJk5vdEdyZWF0ZXJFcXVhbDtcIjpcIuKJsVwiLFwiJk5vdEdyZWF0ZXJGdWxsRXF1YWw7XCI6XCLiiafMuFwiLFwiJk5vdEdyZWF0ZXJHcmVhdGVyO1wiOlwi4omrzLhcIixcIiZOb3RHcmVhdGVyTGVzcztcIjpcIuKJuVwiLFwiJk5vdEdyZWF0ZXJTbGFudEVxdWFsO1wiOlwi4qm+zLhcIixcIiZOb3RHcmVhdGVyVGlsZGU7XCI6XCLiibVcIixcIiZOb3RIdW1wRG93bkh1bXA7XCI6XCLiiY7MuFwiLFwiJk5vdEh1bXBFcXVhbDtcIjpcIuKJj8y4XCIsXCImTm90TGVmdFRyaWFuZ2xlO1wiOlwi4ouqXCIsXCImTm90TGVmdFRyaWFuZ2xlQmFyO1wiOlwi4qePzLhcIixcIiZOb3RMZWZ0VHJpYW5nbGVFcXVhbDtcIjpcIuKLrFwiLFwiJk5vdExlc3M7XCI6XCLiia5cIixcIiZOb3RMZXNzRXF1YWw7XCI6XCLiibBcIixcIiZOb3RMZXNzR3JlYXRlcjtcIjpcIuKJuFwiLFwiJk5vdExlc3NMZXNzO1wiOlwi4omqzLhcIixcIiZOb3RMZXNzU2xhbnRFcXVhbDtcIjpcIuKpvcy4XCIsXCImTm90TGVzc1RpbGRlO1wiOlwi4om0XCIsXCImTm90TmVzdGVkR3JlYXRlckdyZWF0ZXI7XCI6XCLiqqLMuFwiLFwiJk5vdE5lc3RlZExlc3NMZXNzO1wiOlwi4qqhzLhcIixcIiZOb3RQcmVjZWRlcztcIjpcIuKKgFwiLFwiJk5vdFByZWNlZGVzRXF1YWw7XCI6XCLiqq/MuFwiLFwiJk5vdFByZWNlZGVzU2xhbnRFcXVhbDtcIjpcIuKLoFwiLFwiJk5vdFJldmVyc2VFbGVtZW50O1wiOlwi4oiMXCIsXCImTm90UmlnaHRUcmlhbmdsZTtcIjpcIuKLq1wiLFwiJk5vdFJpZ2h0VHJpYW5nbGVCYXI7XCI6XCLip5DMuFwiLFwiJk5vdFJpZ2h0VHJpYW5nbGVFcXVhbDtcIjpcIuKLrVwiLFwiJk5vdFNxdWFyZVN1YnNldDtcIjpcIuKKj8y4XCIsXCImTm90U3F1YXJlU3Vic2V0RXF1YWw7XCI6XCLii6JcIixcIiZOb3RTcXVhcmVTdXBlcnNldDtcIjpcIuKKkMy4XCIsXCImTm90U3F1YXJlU3VwZXJzZXRFcXVhbDtcIjpcIuKLo1wiLFwiJk5vdFN1YnNldDtcIjpcIuKKguKDklwiLFwiJk5vdFN1YnNldEVxdWFsO1wiOlwi4oqIXCIsXCImTm90U3VjY2VlZHM7XCI6XCLiioFcIixcIiZOb3RTdWNjZWVkc0VxdWFsO1wiOlwi4qqwzLhcIixcIiZOb3RTdWNjZWVkc1NsYW50RXF1YWw7XCI6XCLii6FcIixcIiZOb3RTdWNjZWVkc1RpbGRlO1wiOlwi4om/zLhcIixcIiZOb3RTdXBlcnNldDtcIjpcIuKKg+KDklwiLFwiJk5vdFN1cGVyc2V0RXF1YWw7XCI6XCLiiolcIixcIiZOb3RUaWxkZTtcIjpcIuKJgVwiLFwiJk5vdFRpbGRlRXF1YWw7XCI6XCLiiYRcIixcIiZOb3RUaWxkZUZ1bGxFcXVhbDtcIjpcIuKJh1wiLFwiJk5vdFRpbGRlVGlsZGU7XCI6XCLiiYlcIixcIiZOb3RWZXJ0aWNhbEJhcjtcIjpcIuKIpFwiLFwiJk5zY3I7XCI6XCLwnZKpXCIsXCImTnRpbGRlXCI6XCLDkVwiLFwiJk50aWxkZTtcIjpcIsORXCIsXCImTnU7XCI6XCLOnVwiLFwiJk9FbGlnO1wiOlwixZJcIixcIiZPYWN1dGVcIjpcIsOTXCIsXCImT2FjdXRlO1wiOlwiw5NcIixcIiZPY2lyY1wiOlwiw5RcIixcIiZPY2lyYztcIjpcIsOUXCIsXCImT2N5O1wiOlwi0J5cIixcIiZPZGJsYWM7XCI6XCLFkFwiLFwiJk9mcjtcIjpcIvCdlJJcIixcIiZPZ3JhdmVcIjpcIsOSXCIsXCImT2dyYXZlO1wiOlwiw5JcIixcIiZPbWFjcjtcIjpcIsWMXCIsXCImT21lZ2E7XCI6XCLOqVwiLFwiJk9taWNyb247XCI6XCLOn1wiLFwiJk9vcGY7XCI6XCLwnZWGXCIsXCImT3BlbkN1cmx5RG91YmxlUXVvdGU7XCI6XCLigJxcIixcIiZPcGVuQ3VybHlRdW90ZTtcIjpcIuKAmFwiLFwiJk9yO1wiOlwi4qmUXCIsXCImT3NjcjtcIjpcIvCdkqpcIixcIiZPc2xhc2hcIjpcIsOYXCIsXCImT3NsYXNoO1wiOlwiw5hcIixcIiZPdGlsZGVcIjpcIsOVXCIsXCImT3RpbGRlO1wiOlwiw5VcIixcIiZPdGltZXM7XCI6XCLiqLdcIixcIiZPdW1sXCI6XCLDllwiLFwiJk91bWw7XCI6XCLDllwiLFwiJk92ZXJCYXI7XCI6XCLigL5cIixcIiZPdmVyQnJhY2U7XCI6XCLij55cIixcIiZPdmVyQnJhY2tldDtcIjpcIuKOtFwiLFwiJk92ZXJQYXJlbnRoZXNpcztcIjpcIuKPnFwiLFwiJlBhcnRpYWxEO1wiOlwi4oiCXCIsXCImUGN5O1wiOlwi0J9cIixcIiZQZnI7XCI6XCLwnZSTXCIsXCImUGhpO1wiOlwizqZcIixcIiZQaTtcIjpcIs6gXCIsXCImUGx1c01pbnVzO1wiOlwiwrFcIixcIiZQb2luY2FyZXBsYW5lO1wiOlwi4oSMXCIsXCImUG9wZjtcIjpcIuKEmVwiLFwiJlByO1wiOlwi4qq7XCIsXCImUHJlY2VkZXM7XCI6XCLiibpcIixcIiZQcmVjZWRlc0VxdWFsO1wiOlwi4qqvXCIsXCImUHJlY2VkZXNTbGFudEVxdWFsO1wiOlwi4om8XCIsXCImUHJlY2VkZXNUaWxkZTtcIjpcIuKJvlwiLFwiJlByaW1lO1wiOlwi4oCzXCIsXCImUHJvZHVjdDtcIjpcIuKIj1wiLFwiJlByb3BvcnRpb247XCI6XCLiiLdcIixcIiZQcm9wb3J0aW9uYWw7XCI6XCLiiJ1cIixcIiZQc2NyO1wiOlwi8J2Sq1wiLFwiJlBzaTtcIjpcIs6oXCIsXCImUVVPVFwiOidcIicsXCImUVVPVDtcIjonXCInLFwiJlFmcjtcIjpcIvCdlJRcIixcIiZRb3BmO1wiOlwi4oSaXCIsXCImUXNjcjtcIjpcIvCdkqxcIixcIiZSQmFycjtcIjpcIuKkkFwiLFwiJlJFR1wiOlwiwq5cIixcIiZSRUc7XCI6XCLCrlwiLFwiJlJhY3V0ZTtcIjpcIsWUXCIsXCImUmFuZztcIjpcIuKfq1wiLFwiJlJhcnI7XCI6XCLihqBcIixcIiZSYXJydGw7XCI6XCLipJZcIixcIiZSY2Fyb247XCI6XCLFmFwiLFwiJlJjZWRpbDtcIjpcIsWWXCIsXCImUmN5O1wiOlwi0KBcIixcIiZSZTtcIjpcIuKEnFwiLFwiJlJldmVyc2VFbGVtZW50O1wiOlwi4oiLXCIsXCImUmV2ZXJzZUVxdWlsaWJyaXVtO1wiOlwi4oeLXCIsXCImUmV2ZXJzZVVwRXF1aWxpYnJpdW07XCI6XCLipa9cIixcIiZSZnI7XCI6XCLihJxcIixcIiZSaG87XCI6XCLOoVwiLFwiJlJpZ2h0QW5nbGVCcmFja2V0O1wiOlwi4p+pXCIsXCImUmlnaHRBcnJvdztcIjpcIuKGklwiLFwiJlJpZ2h0QXJyb3dCYXI7XCI6XCLih6VcIixcIiZSaWdodEFycm93TGVmdEFycm93O1wiOlwi4oeEXCIsXCImUmlnaHRDZWlsaW5nO1wiOlwi4oyJXCIsXCImUmlnaHREb3VibGVCcmFja2V0O1wiOlwi4p+nXCIsXCImUmlnaHREb3duVGVlVmVjdG9yO1wiOlwi4qWdXCIsXCImUmlnaHREb3duVmVjdG9yO1wiOlwi4oeCXCIsXCImUmlnaHREb3duVmVjdG9yQmFyO1wiOlwi4qWVXCIsXCImUmlnaHRGbG9vcjtcIjpcIuKMi1wiLFwiJlJpZ2h0VGVlO1wiOlwi4oqiXCIsXCImUmlnaHRUZWVBcnJvdztcIjpcIuKGplwiLFwiJlJpZ2h0VGVlVmVjdG9yO1wiOlwi4qWbXCIsXCImUmlnaHRUcmlhbmdsZTtcIjpcIuKKs1wiLFwiJlJpZ2h0VHJpYW5nbGVCYXI7XCI6XCLip5BcIixcIiZSaWdodFRyaWFuZ2xlRXF1YWw7XCI6XCLiirVcIixcIiZSaWdodFVwRG93blZlY3RvcjtcIjpcIuKlj1wiLFwiJlJpZ2h0VXBUZWVWZWN0b3I7XCI6XCLipZxcIixcIiZSaWdodFVwVmVjdG9yO1wiOlwi4oa+XCIsXCImUmlnaHRVcFZlY3RvckJhcjtcIjpcIuKllFwiLFwiJlJpZ2h0VmVjdG9yO1wiOlwi4oeAXCIsXCImUmlnaHRWZWN0b3JCYXI7XCI6XCLipZNcIixcIiZSaWdodGFycm93O1wiOlwi4oeSXCIsXCImUm9wZjtcIjpcIuKEnVwiLFwiJlJvdW5kSW1wbGllcztcIjpcIuKlsFwiLFwiJlJyaWdodGFycm93O1wiOlwi4oebXCIsXCImUnNjcjtcIjpcIuKEm1wiLFwiJlJzaDtcIjpcIuKGsVwiLFwiJlJ1bGVEZWxheWVkO1wiOlwi4qe0XCIsXCImU0hDSGN5O1wiOlwi0KlcIixcIiZTSGN5O1wiOlwi0KhcIixcIiZTT0ZUY3k7XCI6XCLQrFwiLFwiJlNhY3V0ZTtcIjpcIsWaXCIsXCImU2M7XCI6XCLiqrxcIixcIiZTY2Fyb247XCI6XCLFoFwiLFwiJlNjZWRpbDtcIjpcIsWeXCIsXCImU2NpcmM7XCI6XCLFnFwiLFwiJlNjeTtcIjpcItChXCIsXCImU2ZyO1wiOlwi8J2UllwiLFwiJlNob3J0RG93bkFycm93O1wiOlwi4oaTXCIsXCImU2hvcnRMZWZ0QXJyb3c7XCI6XCLihpBcIixcIiZTaG9ydFJpZ2h0QXJyb3c7XCI6XCLihpJcIixcIiZTaG9ydFVwQXJyb3c7XCI6XCLihpFcIixcIiZTaWdtYTtcIjpcIs6jXCIsXCImU21hbGxDaXJjbGU7XCI6XCLiiJhcIixcIiZTb3BmO1wiOlwi8J2VilwiLFwiJlNxcnQ7XCI6XCLiiJpcIixcIiZTcXVhcmU7XCI6XCLilqFcIixcIiZTcXVhcmVJbnRlcnNlY3Rpb247XCI6XCLiipNcIixcIiZTcXVhcmVTdWJzZXQ7XCI6XCLiio9cIixcIiZTcXVhcmVTdWJzZXRFcXVhbDtcIjpcIuKKkVwiLFwiJlNxdWFyZVN1cGVyc2V0O1wiOlwi4oqQXCIsXCImU3F1YXJlU3VwZXJzZXRFcXVhbDtcIjpcIuKKklwiLFwiJlNxdWFyZVVuaW9uO1wiOlwi4oqUXCIsXCImU3NjcjtcIjpcIvCdkq5cIixcIiZTdGFyO1wiOlwi4ouGXCIsXCImU3ViO1wiOlwi4ouQXCIsXCImU3Vic2V0O1wiOlwi4ouQXCIsXCImU3Vic2V0RXF1YWw7XCI6XCLiioZcIixcIiZTdWNjZWVkcztcIjpcIuKJu1wiLFwiJlN1Y2NlZWRzRXF1YWw7XCI6XCLiqrBcIixcIiZTdWNjZWVkc1NsYW50RXF1YWw7XCI6XCLiib1cIixcIiZTdWNjZWVkc1RpbGRlO1wiOlwi4om/XCIsXCImU3VjaFRoYXQ7XCI6XCLiiItcIixcIiZTdW07XCI6XCLiiJFcIixcIiZTdXA7XCI6XCLii5FcIixcIiZTdXBlcnNldDtcIjpcIuKKg1wiLFwiJlN1cGVyc2V0RXF1YWw7XCI6XCLiiodcIixcIiZTdXBzZXQ7XCI6XCLii5FcIixcIiZUSE9STlwiOlwiw55cIixcIiZUSE9STjtcIjpcIsOeXCIsXCImVFJBREU7XCI6XCLihKJcIixcIiZUU0hjeTtcIjpcItCLXCIsXCImVFNjeTtcIjpcItCmXCIsXCImVGFiO1wiOlwiXFx0XCIsXCImVGF1O1wiOlwizqRcIixcIiZUY2Fyb247XCI6XCLFpFwiLFwiJlRjZWRpbDtcIjpcIsWiXCIsXCImVGN5O1wiOlwi0KJcIixcIiZUZnI7XCI6XCLwnZSXXCIsXCImVGhlcmVmb3JlO1wiOlwi4oi0XCIsXCImVGhldGE7XCI6XCLOmFwiLFwiJlRoaWNrU3BhY2U7XCI6XCLigZ/igIpcIixcIiZUaGluU3BhY2U7XCI6XCLigIlcIixcIiZUaWxkZTtcIjpcIuKIvFwiLFwiJlRpbGRlRXF1YWw7XCI6XCLiiYNcIixcIiZUaWxkZUZ1bGxFcXVhbDtcIjpcIuKJhVwiLFwiJlRpbGRlVGlsZGU7XCI6XCLiiYhcIixcIiZUb3BmO1wiOlwi8J2Vi1wiLFwiJlRyaXBsZURvdDtcIjpcIuKDm1wiLFwiJlRzY3I7XCI6XCLwnZKvXCIsXCImVHN0cm9rO1wiOlwixaZcIixcIiZVYWN1dGVcIjpcIsOaXCIsXCImVWFjdXRlO1wiOlwiw5pcIixcIiZVYXJyO1wiOlwi4oafXCIsXCImVWFycm9jaXI7XCI6XCLipYlcIixcIiZVYnJjeTtcIjpcItCOXCIsXCImVWJyZXZlO1wiOlwixaxcIixcIiZVY2lyY1wiOlwiw5tcIixcIiZVY2lyYztcIjpcIsObXCIsXCImVWN5O1wiOlwi0KNcIixcIiZVZGJsYWM7XCI6XCLFsFwiLFwiJlVmcjtcIjpcIvCdlJhcIixcIiZVZ3JhdmVcIjpcIsOZXCIsXCImVWdyYXZlO1wiOlwiw5lcIixcIiZVbWFjcjtcIjpcIsWqXCIsXCImVW5kZXJCYXI7XCI6XCJfXCIsXCImVW5kZXJCcmFjZTtcIjpcIuKPn1wiLFwiJlVuZGVyQnJhY2tldDtcIjpcIuKOtVwiLFwiJlVuZGVyUGFyZW50aGVzaXM7XCI6XCLij51cIixcIiZVbmlvbjtcIjpcIuKLg1wiLFwiJlVuaW9uUGx1cztcIjpcIuKKjlwiLFwiJlVvZ29uO1wiOlwixbJcIixcIiZVb3BmO1wiOlwi8J2VjFwiLFwiJlVwQXJyb3c7XCI6XCLihpFcIixcIiZVcEFycm93QmFyO1wiOlwi4qSSXCIsXCImVXBBcnJvd0Rvd25BcnJvdztcIjpcIuKHhVwiLFwiJlVwRG93bkFycm93O1wiOlwi4oaVXCIsXCImVXBFcXVpbGlicml1bTtcIjpcIuKlrlwiLFwiJlVwVGVlO1wiOlwi4oqlXCIsXCImVXBUZWVBcnJvdztcIjpcIuKGpVwiLFwiJlVwYXJyb3c7XCI6XCLih5FcIixcIiZVcGRvd25hcnJvdztcIjpcIuKHlVwiLFwiJlVwcGVyTGVmdEFycm93O1wiOlwi4oaWXCIsXCImVXBwZXJSaWdodEFycm93O1wiOlwi4oaXXCIsXCImVXBzaTtcIjpcIs+SXCIsXCImVXBzaWxvbjtcIjpcIs6lXCIsXCImVXJpbmc7XCI6XCLFrlwiLFwiJlVzY3I7XCI6XCLwnZKwXCIsXCImVXRpbGRlO1wiOlwixahcIixcIiZVdW1sXCI6XCLDnFwiLFwiJlV1bWw7XCI6XCLDnFwiLFwiJlZEYXNoO1wiOlwi4oqrXCIsXCImVmJhcjtcIjpcIuKrq1wiLFwiJlZjeTtcIjpcItCSXCIsXCImVmRhc2g7XCI6XCLiiqlcIixcIiZWZGFzaGw7XCI6XCLiq6ZcIixcIiZWZWU7XCI6XCLii4FcIixcIiZWZXJiYXI7XCI6XCLigJZcIixcIiZWZXJ0O1wiOlwi4oCWXCIsXCImVmVydGljYWxCYXI7XCI6XCLiiKNcIixcIiZWZXJ0aWNhbExpbmU7XCI6XCJ8XCIsXCImVmVydGljYWxTZXBhcmF0b3I7XCI6XCLinZhcIixcIiZWZXJ0aWNhbFRpbGRlO1wiOlwi4omAXCIsXCImVmVyeVRoaW5TcGFjZTtcIjpcIuKAilwiLFwiJlZmcjtcIjpcIvCdlJlcIixcIiZWb3BmO1wiOlwi8J2VjVwiLFwiJlZzY3I7XCI6XCLwnZKxXCIsXCImVnZkYXNoO1wiOlwi4oqqXCIsXCImV2NpcmM7XCI6XCLFtFwiLFwiJldlZGdlO1wiOlwi4ouAXCIsXCImV2ZyO1wiOlwi8J2UmlwiLFwiJldvcGY7XCI6XCLwnZWOXCIsXCImV3NjcjtcIjpcIvCdkrJcIixcIiZYZnI7XCI6XCLwnZSbXCIsXCImWGk7XCI6XCLOnlwiLFwiJlhvcGY7XCI6XCLwnZWPXCIsXCImWHNjcjtcIjpcIvCdkrNcIixcIiZZQWN5O1wiOlwi0K9cIixcIiZZSWN5O1wiOlwi0IdcIixcIiZZVWN5O1wiOlwi0K5cIixcIiZZYWN1dGVcIjpcIsOdXCIsXCImWWFjdXRlO1wiOlwiw51cIixcIiZZY2lyYztcIjpcIsW2XCIsXCImWWN5O1wiOlwi0KtcIixcIiZZZnI7XCI6XCLwnZScXCIsXCImWW9wZjtcIjpcIvCdlZBcIixcIiZZc2NyO1wiOlwi8J2StFwiLFwiJll1bWw7XCI6XCLFuFwiLFwiJlpIY3k7XCI6XCLQllwiLFwiJlphY3V0ZTtcIjpcIsW5XCIsXCImWmNhcm9uO1wiOlwixb1cIixcIiZaY3k7XCI6XCLQl1wiLFwiJlpkb3Q7XCI6XCLFu1wiLFwiJlplcm9XaWR0aFNwYWNlO1wiOlwi4oCLXCIsXCImWmV0YTtcIjpcIs6WXCIsXCImWmZyO1wiOlwi4oSoXCIsXCImWm9wZjtcIjpcIuKEpFwiLFwiJlpzY3I7XCI6XCLwnZK1XCIsXCImYWFjdXRlXCI6XCLDoVwiLFwiJmFhY3V0ZTtcIjpcIsOhXCIsXCImYWJyZXZlO1wiOlwixINcIixcIiZhYztcIjpcIuKIvlwiLFwiJmFjRTtcIjpcIuKIvsyzXCIsXCImYWNkO1wiOlwi4oi/XCIsXCImYWNpcmNcIjpcIsOiXCIsXCImYWNpcmM7XCI6XCLDolwiLFwiJmFjdXRlXCI6XCLCtFwiLFwiJmFjdXRlO1wiOlwiwrRcIixcIiZhY3k7XCI6XCLQsFwiLFwiJmFlbGlnXCI6XCLDplwiLFwiJmFlbGlnO1wiOlwiw6ZcIixcIiZhZjtcIjpcIuKBoVwiLFwiJmFmcjtcIjpcIvCdlJ5cIixcIiZhZ3JhdmVcIjpcIsOgXCIsXCImYWdyYXZlO1wiOlwiw6BcIixcIiZhbGVmc3ltO1wiOlwi4oS1XCIsXCImYWxlcGg7XCI6XCLihLVcIixcIiZhbHBoYTtcIjpcIs6xXCIsXCImYW1hY3I7XCI6XCLEgVwiLFwiJmFtYWxnO1wiOlwi4qi/XCIsXCImYW1wXCI6XCImXCIsXCImYW1wO1wiOlwiJlwiLFwiJmFuZDtcIjpcIuKIp1wiLFwiJmFuZGFuZDtcIjpcIuKplVwiLFwiJmFuZGQ7XCI6XCLiqZxcIixcIiZhbmRzbG9wZTtcIjpcIuKpmFwiLFwiJmFuZHY7XCI6XCLiqZpcIixcIiZhbmc7XCI6XCLiiKBcIixcIiZhbmdlO1wiOlwi4qakXCIsXCImYW5nbGU7XCI6XCLiiKBcIixcIiZhbmdtc2Q7XCI6XCLiiKFcIixcIiZhbmdtc2RhYTtcIjpcIuKmqFwiLFwiJmFuZ21zZGFiO1wiOlwi4qapXCIsXCImYW5nbXNkYWM7XCI6XCLipqpcIixcIiZhbmdtc2RhZDtcIjpcIuKmq1wiLFwiJmFuZ21zZGFlO1wiOlwi4qasXCIsXCImYW5nbXNkYWY7XCI6XCLipq1cIixcIiZhbmdtc2RhZztcIjpcIuKmrlwiLFwiJmFuZ21zZGFoO1wiOlwi4qavXCIsXCImYW5ncnQ7XCI6XCLiiJ9cIixcIiZhbmdydHZiO1wiOlwi4oq+XCIsXCImYW5ncnR2YmQ7XCI6XCLipp1cIixcIiZhbmdzcGg7XCI6XCLiiKJcIixcIiZhbmdzdDtcIjpcIsOFXCIsXCImYW5nemFycjtcIjpcIuKNvFwiLFwiJmFvZ29uO1wiOlwixIVcIixcIiZhb3BmO1wiOlwi8J2VklwiLFwiJmFwO1wiOlwi4omIXCIsXCImYXBFO1wiOlwi4qmwXCIsXCImYXBhY2lyO1wiOlwi4qmvXCIsXCImYXBlO1wiOlwi4omKXCIsXCImYXBpZDtcIjpcIuKJi1wiLFwiJmFwb3M7XCI6XCInXCIsXCImYXBwcm94O1wiOlwi4omIXCIsXCImYXBwcm94ZXE7XCI6XCLiiYpcIixcIiZhcmluZ1wiOlwiw6VcIixcIiZhcmluZztcIjpcIsOlXCIsXCImYXNjcjtcIjpcIvCdkrZcIixcIiZhc3Q7XCI6XCIqXCIsXCImYXN5bXA7XCI6XCLiiYhcIixcIiZhc3ltcGVxO1wiOlwi4omNXCIsXCImYXRpbGRlXCI6XCLDo1wiLFwiJmF0aWxkZTtcIjpcIsOjXCIsXCImYXVtbFwiOlwiw6RcIixcIiZhdW1sO1wiOlwiw6RcIixcIiZhd2NvbmludDtcIjpcIuKIs1wiLFwiJmF3aW50O1wiOlwi4qiRXCIsXCImYk5vdDtcIjpcIuKrrVwiLFwiJmJhY2tjb25nO1wiOlwi4omMXCIsXCImYmFja2Vwc2lsb247XCI6XCLPtlwiLFwiJmJhY2twcmltZTtcIjpcIuKAtVwiLFwiJmJhY2tzaW07XCI6XCLiiL1cIixcIiZiYWNrc2ltZXE7XCI6XCLii41cIixcIiZiYXJ2ZWU7XCI6XCLiir1cIixcIiZiYXJ3ZWQ7XCI6XCLijIVcIixcIiZiYXJ3ZWRnZTtcIjpcIuKMhVwiLFwiJmJicms7XCI6XCLijrVcIixcIiZiYnJrdGJyaztcIjpcIuKOtlwiLFwiJmJjb25nO1wiOlwi4omMXCIsXCImYmN5O1wiOlwi0LFcIixcIiZiZHF1bztcIjpcIuKAnlwiLFwiJmJlY2F1cztcIjpcIuKItVwiLFwiJmJlY2F1c2U7XCI6XCLiiLVcIixcIiZiZW1wdHl2O1wiOlwi4qawXCIsXCImYmVwc2k7XCI6XCLPtlwiLFwiJmJlcm5vdTtcIjpcIuKErFwiLFwiJmJldGE7XCI6XCLOslwiLFwiJmJldGg7XCI6XCLihLZcIixcIiZiZXR3ZWVuO1wiOlwi4omsXCIsXCImYmZyO1wiOlwi8J2Un1wiLFwiJmJpZ2NhcDtcIjpcIuKLglwiLFwiJmJpZ2NpcmM7XCI6XCLil69cIixcIiZiaWdjdXA7XCI6XCLii4NcIixcIiZiaWdvZG90O1wiOlwi4qiAXCIsXCImYmlnb3BsdXM7XCI6XCLiqIFcIixcIiZiaWdvdGltZXM7XCI6XCLiqIJcIixcIiZiaWdzcWN1cDtcIjpcIuKohlwiLFwiJmJpZ3N0YXI7XCI6XCLimIVcIixcIiZiaWd0cmlhbmdsZWRvd247XCI6XCLilr1cIixcIiZiaWd0cmlhbmdsZXVwO1wiOlwi4pazXCIsXCImYmlndXBsdXM7XCI6XCLiqIRcIixcIiZiaWd2ZWU7XCI6XCLii4FcIixcIiZiaWd3ZWRnZTtcIjpcIuKLgFwiLFwiJmJrYXJvdztcIjpcIuKkjVwiLFwiJmJsYWNrbG96ZW5nZTtcIjpcIuKnq1wiLFwiJmJsYWNrc3F1YXJlO1wiOlwi4paqXCIsXCImYmxhY2t0cmlhbmdsZTtcIjpcIuKWtFwiLFwiJmJsYWNrdHJpYW5nbGVkb3duO1wiOlwi4pa+XCIsXCImYmxhY2t0cmlhbmdsZWxlZnQ7XCI6XCLil4JcIixcIiZibGFja3RyaWFuZ2xlcmlnaHQ7XCI6XCLilrhcIixcIiZibGFuaztcIjpcIuKQo1wiLFwiJmJsazEyO1wiOlwi4paSXCIsXCImYmxrMTQ7XCI6XCLilpFcIixcIiZibGszNDtcIjpcIuKWk1wiLFwiJmJsb2NrO1wiOlwi4paIXCIsXCImYm5lO1wiOlwiPeKDpVwiLFwiJmJuZXF1aXY7XCI6XCLiiaHig6VcIixcIiZibm90O1wiOlwi4oyQXCIsXCImYm9wZjtcIjpcIvCdlZNcIixcIiZib3Q7XCI6XCLiiqVcIixcIiZib3R0b207XCI6XCLiiqVcIixcIiZib3d0aWU7XCI6XCLii4hcIixcIiZib3hETDtcIjpcIuKVl1wiLFwiJmJveERSO1wiOlwi4pWUXCIsXCImYm94RGw7XCI6XCLilZZcIixcIiZib3hEcjtcIjpcIuKVk1wiLFwiJmJveEg7XCI6XCLilZBcIixcIiZib3hIRDtcIjpcIuKVplwiLFwiJmJveEhVO1wiOlwi4pWpXCIsXCImYm94SGQ7XCI6XCLilaRcIixcIiZib3hIdTtcIjpcIuKVp1wiLFwiJmJveFVMO1wiOlwi4pWdXCIsXCImYm94VVI7XCI6XCLilZpcIixcIiZib3hVbDtcIjpcIuKVnFwiLFwiJmJveFVyO1wiOlwi4pWZXCIsXCImYm94VjtcIjpcIuKVkVwiLFwiJmJveFZIO1wiOlwi4pWsXCIsXCImYm94Vkw7XCI6XCLilaNcIixcIiZib3hWUjtcIjpcIuKVoFwiLFwiJmJveFZoO1wiOlwi4pWrXCIsXCImYm94Vmw7XCI6XCLilaJcIixcIiZib3hWcjtcIjpcIuKVn1wiLFwiJmJveGJveDtcIjpcIuKniVwiLFwiJmJveGRMO1wiOlwi4pWVXCIsXCImYm94ZFI7XCI6XCLilZJcIixcIiZib3hkbDtcIjpcIuKUkFwiLFwiJmJveGRyO1wiOlwi4pSMXCIsXCImYm94aDtcIjpcIuKUgFwiLFwiJmJveGhEO1wiOlwi4pWlXCIsXCImYm94aFU7XCI6XCLilahcIixcIiZib3hoZDtcIjpcIuKUrFwiLFwiJmJveGh1O1wiOlwi4pS0XCIsXCImYm94bWludXM7XCI6XCLiip9cIixcIiZib3hwbHVzO1wiOlwi4oqeXCIsXCImYm94dGltZXM7XCI6XCLiiqBcIixcIiZib3h1TDtcIjpcIuKVm1wiLFwiJmJveHVSO1wiOlwi4pWYXCIsXCImYm94dWw7XCI6XCLilJhcIixcIiZib3h1cjtcIjpcIuKUlFwiLFwiJmJveHY7XCI6XCLilIJcIixcIiZib3h2SDtcIjpcIuKVqlwiLFwiJmJveHZMO1wiOlwi4pWhXCIsXCImYm94dlI7XCI6XCLilZ5cIixcIiZib3h2aDtcIjpcIuKUvFwiLFwiJmJveHZsO1wiOlwi4pSkXCIsXCImYm94dnI7XCI6XCLilJxcIixcIiZicHJpbWU7XCI6XCLigLVcIixcIiZicmV2ZTtcIjpcIsuYXCIsXCImYnJ2YmFyXCI6XCLCplwiLFwiJmJydmJhcjtcIjpcIsKmXCIsXCImYnNjcjtcIjpcIvCdkrdcIixcIiZic2VtaTtcIjpcIuKBj1wiLFwiJmJzaW07XCI6XCLiiL1cIixcIiZic2ltZTtcIjpcIuKLjVwiLFwiJmJzb2w7XCI6XCJcXFxcXCIsXCImYnNvbGI7XCI6XCLip4VcIixcIiZic29saHN1YjtcIjpcIuKfiFwiLFwiJmJ1bGw7XCI6XCLigKJcIixcIiZidWxsZXQ7XCI6XCLigKJcIixcIiZidW1wO1wiOlwi4omOXCIsXCImYnVtcEU7XCI6XCLiqq5cIixcIiZidW1wZTtcIjpcIuKJj1wiLFwiJmJ1bXBlcTtcIjpcIuKJj1wiLFwiJmNhY3V0ZTtcIjpcIsSHXCIsXCImY2FwO1wiOlwi4oipXCIsXCImY2FwYW5kO1wiOlwi4qmEXCIsXCImY2FwYnJjdXA7XCI6XCLiqYlcIixcIiZjYXBjYXA7XCI6XCLiqYtcIixcIiZjYXBjdXA7XCI6XCLiqYdcIixcIiZjYXBkb3Q7XCI6XCLiqYBcIixcIiZjYXBzO1wiOlwi4oip77iAXCIsXCImY2FyZXQ7XCI6XCLigYFcIixcIiZjYXJvbjtcIjpcIsuHXCIsXCImY2NhcHM7XCI6XCLiqY1cIixcIiZjY2Fyb247XCI6XCLEjVwiLFwiJmNjZWRpbFwiOlwiw6dcIixcIiZjY2VkaWw7XCI6XCLDp1wiLFwiJmNjaXJjO1wiOlwixIlcIixcIiZjY3VwcztcIjpcIuKpjFwiLFwiJmNjdXBzc207XCI6XCLiqZBcIixcIiZjZG90O1wiOlwixItcIixcIiZjZWRpbFwiOlwiwrhcIixcIiZjZWRpbDtcIjpcIsK4XCIsXCImY2VtcHR5djtcIjpcIuKmslwiLFwiJmNlbnRcIjpcIsKiXCIsXCImY2VudDtcIjpcIsKiXCIsXCImY2VudGVyZG90O1wiOlwiwrdcIixcIiZjZnI7XCI6XCLwnZSgXCIsXCImY2hjeTtcIjpcItGHXCIsXCImY2hlY2s7XCI6XCLinJNcIixcIiZjaGVja21hcms7XCI6XCLinJNcIixcIiZjaGk7XCI6XCLPh1wiLFwiJmNpcjtcIjpcIuKXi1wiLFwiJmNpckU7XCI6XCLip4NcIixcIiZjaXJjO1wiOlwiy4ZcIixcIiZjaXJjZXE7XCI6XCLiiZdcIixcIiZjaXJjbGVhcnJvd2xlZnQ7XCI6XCLihrpcIixcIiZjaXJjbGVhcnJvd3JpZ2h0O1wiOlwi4oa7XCIsXCImY2lyY2xlZFI7XCI6XCLCrlwiLFwiJmNpcmNsZWRTO1wiOlwi4pOIXCIsXCImY2lyY2xlZGFzdDtcIjpcIuKKm1wiLFwiJmNpcmNsZWRjaXJjO1wiOlwi4oqaXCIsXCImY2lyY2xlZGRhc2g7XCI6XCLiip1cIixcIiZjaXJlO1wiOlwi4omXXCIsXCImY2lyZm5pbnQ7XCI6XCLiqJBcIixcIiZjaXJtaWQ7XCI6XCLiq69cIixcIiZjaXJzY2lyO1wiOlwi4qeCXCIsXCImY2x1YnM7XCI6XCLimaNcIixcIiZjbHVic3VpdDtcIjpcIuKZo1wiLFwiJmNvbG9uO1wiOlwiOlwiLFwiJmNvbG9uZTtcIjpcIuKJlFwiLFwiJmNvbG9uZXE7XCI6XCLiiZRcIixcIiZjb21tYTtcIjpcIixcIixcIiZjb21tYXQ7XCI6XCJAXCIsXCImY29tcDtcIjpcIuKIgVwiLFwiJmNvbXBmbjtcIjpcIuKImFwiLFwiJmNvbXBsZW1lbnQ7XCI6XCLiiIFcIixcIiZjb21wbGV4ZXM7XCI6XCLihIJcIixcIiZjb25nO1wiOlwi4omFXCIsXCImY29uZ2RvdDtcIjpcIuKprVwiLFwiJmNvbmludDtcIjpcIuKIrlwiLFwiJmNvcGY7XCI6XCLwnZWUXCIsXCImY29wcm9kO1wiOlwi4oiQXCIsXCImY29weVwiOlwiwqlcIixcIiZjb3B5O1wiOlwiwqlcIixcIiZjb3B5c3I7XCI6XCLihJdcIixcIiZjcmFycjtcIjpcIuKGtVwiLFwiJmNyb3NzO1wiOlwi4pyXXCIsXCImY3NjcjtcIjpcIvCdkrhcIixcIiZjc3ViO1wiOlwi4quPXCIsXCImY3N1YmU7XCI6XCLiq5FcIixcIiZjc3VwO1wiOlwi4quQXCIsXCImY3N1cGU7XCI6XCLiq5JcIixcIiZjdGRvdDtcIjpcIuKLr1wiLFwiJmN1ZGFycmw7XCI6XCLipLhcIixcIiZjdWRhcnJyO1wiOlwi4qS1XCIsXCImY3VlcHI7XCI6XCLii55cIixcIiZjdWVzYztcIjpcIuKLn1wiLFwiJmN1bGFycjtcIjpcIuKGtlwiLFwiJmN1bGFycnA7XCI6XCLipL1cIixcIiZjdXA7XCI6XCLiiKpcIixcIiZjdXBicmNhcDtcIjpcIuKpiFwiLFwiJmN1cGNhcDtcIjpcIuKphlwiLFwiJmN1cGN1cDtcIjpcIuKpilwiLFwiJmN1cGRvdDtcIjpcIuKKjVwiLFwiJmN1cG9yO1wiOlwi4qmFXCIsXCImY3VwcztcIjpcIuKIqu+4gFwiLFwiJmN1cmFycjtcIjpcIuKGt1wiLFwiJmN1cmFycm07XCI6XCLipLxcIixcIiZjdXJseWVxcHJlYztcIjpcIuKLnlwiLFwiJmN1cmx5ZXFzdWNjO1wiOlwi4oufXCIsXCImY3VybHl2ZWU7XCI6XCLii45cIixcIiZjdXJseXdlZGdlO1wiOlwi4ouPXCIsXCImY3VycmVuXCI6XCLCpFwiLFwiJmN1cnJlbjtcIjpcIsKkXCIsXCImY3VydmVhcnJvd2xlZnQ7XCI6XCLihrZcIixcIiZjdXJ2ZWFycm93cmlnaHQ7XCI6XCLihrdcIixcIiZjdXZlZTtcIjpcIuKLjlwiLFwiJmN1d2VkO1wiOlwi4ouPXCIsXCImY3djb25pbnQ7XCI6XCLiiLJcIixcIiZjd2ludDtcIjpcIuKIsVwiLFwiJmN5bGN0eTtcIjpcIuKMrVwiLFwiJmRBcnI7XCI6XCLih5NcIixcIiZkSGFyO1wiOlwi4qWlXCIsXCImZGFnZ2VyO1wiOlwi4oCgXCIsXCImZGFsZXRoO1wiOlwi4oS4XCIsXCImZGFycjtcIjpcIuKGk1wiLFwiJmRhc2g7XCI6XCLigJBcIixcIiZkYXNodjtcIjpcIuKKo1wiLFwiJmRia2Fyb3c7XCI6XCLipI9cIixcIiZkYmxhYztcIjpcIsudXCIsXCImZGNhcm9uO1wiOlwixI9cIixcIiZkY3k7XCI6XCLQtFwiLFwiJmRkO1wiOlwi4oWGXCIsXCImZGRhZ2dlcjtcIjpcIuKAoVwiLFwiJmRkYXJyO1wiOlwi4oeKXCIsXCImZGRvdHNlcTtcIjpcIuKpt1wiLFwiJmRlZ1wiOlwiwrBcIixcIiZkZWc7XCI6XCLCsFwiLFwiJmRlbHRhO1wiOlwizrRcIixcIiZkZW1wdHl2O1wiOlwi4qaxXCIsXCImZGZpc2h0O1wiOlwi4qW/XCIsXCImZGZyO1wiOlwi8J2UoVwiLFwiJmRoYXJsO1wiOlwi4oeDXCIsXCImZGhhcnI7XCI6XCLih4JcIixcIiZkaWFtO1wiOlwi4ouEXCIsXCImZGlhbW9uZDtcIjpcIuKLhFwiLFwiJmRpYW1vbmRzdWl0O1wiOlwi4pmmXCIsXCImZGlhbXM7XCI6XCLimaZcIixcIiZkaWU7XCI6XCLCqFwiLFwiJmRpZ2FtbWE7XCI6XCLPnVwiLFwiJmRpc2luO1wiOlwi4ouyXCIsXCImZGl2O1wiOlwiw7dcIixcIiZkaXZpZGVcIjpcIsO3XCIsXCImZGl2aWRlO1wiOlwiw7dcIixcIiZkaXZpZGVvbnRpbWVzO1wiOlwi4ouHXCIsXCImZGl2b254O1wiOlwi4ouHXCIsXCImZGpjeTtcIjpcItGSXCIsXCImZGxjb3JuO1wiOlwi4oyeXCIsXCImZGxjcm9wO1wiOlwi4oyNXCIsXCImZG9sbGFyO1wiOlwiJFwiLFwiJmRvcGY7XCI6XCLwnZWVXCIsXCImZG90O1wiOlwiy5lcIixcIiZkb3RlcTtcIjpcIuKJkFwiLFwiJmRvdGVxZG90O1wiOlwi4omRXCIsXCImZG90bWludXM7XCI6XCLiiLhcIixcIiZkb3RwbHVzO1wiOlwi4oiUXCIsXCImZG90c3F1YXJlO1wiOlwi4oqhXCIsXCImZG91YmxlYmFyd2VkZ2U7XCI6XCLijIZcIixcIiZkb3duYXJyb3c7XCI6XCLihpNcIixcIiZkb3duZG93bmFycm93cztcIjpcIuKHilwiLFwiJmRvd25oYXJwb29ubGVmdDtcIjpcIuKHg1wiLFwiJmRvd25oYXJwb29ucmlnaHQ7XCI6XCLih4JcIixcIiZkcmJrYXJvdztcIjpcIuKkkFwiLFwiJmRyY29ybjtcIjpcIuKMn1wiLFwiJmRyY3JvcDtcIjpcIuKMjFwiLFwiJmRzY3I7XCI6XCLwnZK5XCIsXCImZHNjeTtcIjpcItGVXCIsXCImZHNvbDtcIjpcIuKntlwiLFwiJmRzdHJvaztcIjpcIsSRXCIsXCImZHRkb3Q7XCI6XCLii7FcIixcIiZkdHJpO1wiOlwi4pa/XCIsXCImZHRyaWY7XCI6XCLilr5cIixcIiZkdWFycjtcIjpcIuKHtVwiLFwiJmR1aGFyO1wiOlwi4qWvXCIsXCImZHdhbmdsZTtcIjpcIuKmplwiLFwiJmR6Y3k7XCI6XCLRn1wiLFwiJmR6aWdyYXJyO1wiOlwi4p+/XCIsXCImZUREb3Q7XCI6XCLiqbdcIixcIiZlRG90O1wiOlwi4omRXCIsXCImZWFjdXRlXCI6XCLDqVwiLFwiJmVhY3V0ZTtcIjpcIsOpXCIsXCImZWFzdGVyO1wiOlwi4qmuXCIsXCImZWNhcm9uO1wiOlwixJtcIixcIiZlY2lyO1wiOlwi4omWXCIsXCImZWNpcmNcIjpcIsOqXCIsXCImZWNpcmM7XCI6XCLDqlwiLFwiJmVjb2xvbjtcIjpcIuKJlVwiLFwiJmVjeTtcIjpcItGNXCIsXCImZWRvdDtcIjpcIsSXXCIsXCImZWU7XCI6XCLihYdcIixcIiZlZkRvdDtcIjpcIuKJklwiLFwiJmVmcjtcIjpcIvCdlKJcIixcIiZlZztcIjpcIuKqmlwiLFwiJmVncmF2ZVwiOlwiw6hcIixcIiZlZ3JhdmU7XCI6XCLDqFwiLFwiJmVncztcIjpcIuKqllwiLFwiJmVnc2RvdDtcIjpcIuKqmFwiLFwiJmVsO1wiOlwi4qqZXCIsXCImZWxpbnRlcnM7XCI6XCLij6dcIixcIiZlbGw7XCI6XCLihJNcIixcIiZlbHM7XCI6XCLiqpVcIixcIiZlbHNkb3Q7XCI6XCLiqpdcIixcIiZlbWFjcjtcIjpcIsSTXCIsXCImZW1wdHk7XCI6XCLiiIVcIixcIiZlbXB0eXNldDtcIjpcIuKIhVwiLFwiJmVtcHR5djtcIjpcIuKIhVwiLFwiJmVtc3AxMztcIjpcIuKAhFwiLFwiJmVtc3AxNDtcIjpcIuKAhVwiLFwiJmVtc3A7XCI6XCLigINcIixcIiZlbmc7XCI6XCLFi1wiLFwiJmVuc3A7XCI6XCLigIJcIixcIiZlb2dvbjtcIjpcIsSZXCIsXCImZW9wZjtcIjpcIvCdlZZcIixcIiZlcGFyO1wiOlwi4ouVXCIsXCImZXBhcnNsO1wiOlwi4qejXCIsXCImZXBsdXM7XCI6XCLiqbFcIixcIiZlcHNpO1wiOlwizrVcIixcIiZlcHNpbG9uO1wiOlwizrVcIixcIiZlcHNpdjtcIjpcIs+1XCIsXCImZXFjaXJjO1wiOlwi4omWXCIsXCImZXFjb2xvbjtcIjpcIuKJlVwiLFwiJmVxc2ltO1wiOlwi4omCXCIsXCImZXFzbGFudGd0cjtcIjpcIuKqllwiLFwiJmVxc2xhbnRsZXNzO1wiOlwi4qqVXCIsXCImZXF1YWxzO1wiOlwiPVwiLFwiJmVxdWVzdDtcIjpcIuKJn1wiLFwiJmVxdWl2O1wiOlwi4omhXCIsXCImZXF1aXZERDtcIjpcIuKpuFwiLFwiJmVxdnBhcnNsO1wiOlwi4qelXCIsXCImZXJEb3Q7XCI6XCLiiZNcIixcIiZlcmFycjtcIjpcIuKlsVwiLFwiJmVzY3I7XCI6XCLihK9cIixcIiZlc2RvdDtcIjpcIuKJkFwiLFwiJmVzaW07XCI6XCLiiYJcIixcIiZldGE7XCI6XCLOt1wiLFwiJmV0aFwiOlwiw7BcIixcIiZldGg7XCI6XCLDsFwiLFwiJmV1bWxcIjpcIsOrXCIsXCImZXVtbDtcIjpcIsOrXCIsXCImZXVybztcIjpcIuKCrFwiLFwiJmV4Y2w7XCI6XCIhXCIsXCImZXhpc3Q7XCI6XCLiiINcIixcIiZleHBlY3RhdGlvbjtcIjpcIuKEsFwiLFwiJmV4cG9uZW50aWFsZTtcIjpcIuKFh1wiLFwiJmZhbGxpbmdkb3RzZXE7XCI6XCLiiZJcIixcIiZmY3k7XCI6XCLRhFwiLFwiJmZlbWFsZTtcIjpcIuKZgFwiLFwiJmZmaWxpZztcIjpcIu+sg1wiLFwiJmZmbGlnO1wiOlwi76yAXCIsXCImZmZsbGlnO1wiOlwi76yEXCIsXCImZmZyO1wiOlwi8J2Uo1wiLFwiJmZpbGlnO1wiOlwi76yBXCIsXCImZmpsaWc7XCI6XCJmalwiLFwiJmZsYXQ7XCI6XCLima1cIixcIiZmbGxpZztcIjpcIu+sglwiLFwiJmZsdG5zO1wiOlwi4paxXCIsXCImZm5vZjtcIjpcIsaSXCIsXCImZm9wZjtcIjpcIvCdlZdcIixcIiZmb3JhbGw7XCI6XCLiiIBcIixcIiZmb3JrO1wiOlwi4ouUXCIsXCImZm9ya3Y7XCI6XCLiq5lcIixcIiZmcGFydGludDtcIjpcIuKojVwiLFwiJmZyYWMxMlwiOlwiwr1cIixcIiZmcmFjMTI7XCI6XCLCvVwiLFwiJmZyYWMxMztcIjpcIuKFk1wiLFwiJmZyYWMxNFwiOlwiwrxcIixcIiZmcmFjMTQ7XCI6XCLCvFwiLFwiJmZyYWMxNTtcIjpcIuKFlVwiLFwiJmZyYWMxNjtcIjpcIuKFmVwiLFwiJmZyYWMxODtcIjpcIuKFm1wiLFwiJmZyYWMyMztcIjpcIuKFlFwiLFwiJmZyYWMyNTtcIjpcIuKFllwiLFwiJmZyYWMzNFwiOlwiwr5cIixcIiZmcmFjMzQ7XCI6XCLCvlwiLFwiJmZyYWMzNTtcIjpcIuKFl1wiLFwiJmZyYWMzODtcIjpcIuKFnFwiLFwiJmZyYWM0NTtcIjpcIuKFmFwiLFwiJmZyYWM1NjtcIjpcIuKFmlwiLFwiJmZyYWM1ODtcIjpcIuKFnVwiLFwiJmZyYWM3ODtcIjpcIuKFnlwiLFwiJmZyYXNsO1wiOlwi4oGEXCIsXCImZnJvd247XCI6XCLijKJcIixcIiZmc2NyO1wiOlwi8J2Su1wiLFwiJmdFO1wiOlwi4omnXCIsXCImZ0VsO1wiOlwi4qqMXCIsXCImZ2FjdXRlO1wiOlwix7VcIixcIiZnYW1tYTtcIjpcIs6zXCIsXCImZ2FtbWFkO1wiOlwiz51cIixcIiZnYXA7XCI6XCLiqoZcIixcIiZnYnJldmU7XCI6XCLEn1wiLFwiJmdjaXJjO1wiOlwixJ1cIixcIiZnY3k7XCI6XCLQs1wiLFwiJmdkb3Q7XCI6XCLEoVwiLFwiJmdlO1wiOlwi4omlXCIsXCImZ2VsO1wiOlwi4oubXCIsXCImZ2VxO1wiOlwi4omlXCIsXCImZ2VxcTtcIjpcIuKJp1wiLFwiJmdlcXNsYW50O1wiOlwi4qm+XCIsXCImZ2VzO1wiOlwi4qm+XCIsXCImZ2VzY2M7XCI6XCLiqqlcIixcIiZnZXNkb3Q7XCI6XCLiqoBcIixcIiZnZXNkb3RvO1wiOlwi4qqCXCIsXCImZ2VzZG90b2w7XCI6XCLiqoRcIixcIiZnZXNsO1wiOlwi4oub77iAXCIsXCImZ2VzbGVzO1wiOlwi4qqUXCIsXCImZ2ZyO1wiOlwi8J2UpFwiLFwiJmdnO1wiOlwi4omrXCIsXCImZ2dnO1wiOlwi4ouZXCIsXCImZ2ltZWw7XCI6XCLihLdcIixcIiZnamN5O1wiOlwi0ZNcIixcIiZnbDtcIjpcIuKJt1wiLFwiJmdsRTtcIjpcIuKqklwiLFwiJmdsYTtcIjpcIuKqpVwiLFwiJmdsajtcIjpcIuKqpFwiLFwiJmduRTtcIjpcIuKJqVwiLFwiJmduYXA7XCI6XCLiqopcIixcIiZnbmFwcHJveDtcIjpcIuKqilwiLFwiJmduZTtcIjpcIuKqiFwiLFwiJmduZXE7XCI6XCLiqohcIixcIiZnbmVxcTtcIjpcIuKJqVwiLFwiJmduc2ltO1wiOlwi4ounXCIsXCImZ29wZjtcIjpcIvCdlZhcIixcIiZncmF2ZTtcIjpcImBcIixcIiZnc2NyO1wiOlwi4oSKXCIsXCImZ3NpbTtcIjpcIuKJs1wiLFwiJmdzaW1lO1wiOlwi4qqOXCIsXCImZ3NpbWw7XCI6XCLiqpBcIixcIiZndFwiOlwiPlwiLFwiJmd0O1wiOlwiPlwiLFwiJmd0Y2M7XCI6XCLiqqdcIixcIiZndGNpcjtcIjpcIuKpulwiLFwiJmd0ZG90O1wiOlwi4ouXXCIsXCImZ3RsUGFyO1wiOlwi4qaVXCIsXCImZ3RxdWVzdDtcIjpcIuKpvFwiLFwiJmd0cmFwcHJveDtcIjpcIuKqhlwiLFwiJmd0cmFycjtcIjpcIuKluFwiLFwiJmd0cmRvdDtcIjpcIuKLl1wiLFwiJmd0cmVxbGVzcztcIjpcIuKLm1wiLFwiJmd0cmVxcWxlc3M7XCI6XCLiqoxcIixcIiZndHJsZXNzO1wiOlwi4om3XCIsXCImZ3Ryc2ltO1wiOlwi4omzXCIsXCImZ3ZlcnRuZXFxO1wiOlwi4omp77iAXCIsXCImZ3ZuRTtcIjpcIuKJqe+4gFwiLFwiJmhBcnI7XCI6XCLih5RcIixcIiZoYWlyc3A7XCI6XCLigIpcIixcIiZoYWxmO1wiOlwiwr1cIixcIiZoYW1pbHQ7XCI6XCLihItcIixcIiZoYXJkY3k7XCI6XCLRilwiLFwiJmhhcnI7XCI6XCLihpRcIixcIiZoYXJyY2lyO1wiOlwi4qWIXCIsXCImaGFycnc7XCI6XCLihq1cIixcIiZoYmFyO1wiOlwi4oSPXCIsXCImaGNpcmM7XCI6XCLEpVwiLFwiJmhlYXJ0cztcIjpcIuKZpVwiLFwiJmhlYXJ0c3VpdDtcIjpcIuKZpVwiLFwiJmhlbGxpcDtcIjpcIuKAplwiLFwiJmhlcmNvbjtcIjpcIuKKuVwiLFwiJmhmcjtcIjpcIvCdlKVcIixcIiZoa3NlYXJvdztcIjpcIuKkpVwiLFwiJmhrc3dhcm93O1wiOlwi4qSmXCIsXCImaG9hcnI7XCI6XCLih79cIixcIiZob210aHQ7XCI6XCLiiLtcIixcIiZob29rbGVmdGFycm93O1wiOlwi4oapXCIsXCImaG9va3JpZ2h0YXJyb3c7XCI6XCLihqpcIixcIiZob3BmO1wiOlwi8J2VmVwiLFwiJmhvcmJhcjtcIjpcIuKAlVwiLFwiJmhzY3I7XCI6XCLwnZK9XCIsXCImaHNsYXNoO1wiOlwi4oSPXCIsXCImaHN0cm9rO1wiOlwixKdcIixcIiZoeWJ1bGw7XCI6XCLigYNcIixcIiZoeXBoZW47XCI6XCLigJBcIixcIiZpYWN1dGVcIjpcIsOtXCIsXCImaWFjdXRlO1wiOlwiw61cIixcIiZpYztcIjpcIuKBo1wiLFwiJmljaXJjXCI6XCLDrlwiLFwiJmljaXJjO1wiOlwiw65cIixcIiZpY3k7XCI6XCLQuFwiLFwiJmllY3k7XCI6XCLQtVwiLFwiJmlleGNsXCI6XCLCoVwiLFwiJmlleGNsO1wiOlwiwqFcIixcIiZpZmY7XCI6XCLih5RcIixcIiZpZnI7XCI6XCLwnZSmXCIsXCImaWdyYXZlXCI6XCLDrFwiLFwiJmlncmF2ZTtcIjpcIsOsXCIsXCImaWk7XCI6XCLihYhcIixcIiZpaWlpbnQ7XCI6XCLiqIxcIixcIiZpaWludDtcIjpcIuKIrVwiLFwiJmlpbmZpbjtcIjpcIuKnnFwiLFwiJmlpb3RhO1wiOlwi4oSpXCIsXCImaWpsaWc7XCI6XCLEs1wiLFwiJmltYWNyO1wiOlwixKtcIixcIiZpbWFnZTtcIjpcIuKEkVwiLFwiJmltYWdsaW5lO1wiOlwi4oSQXCIsXCImaW1hZ3BhcnQ7XCI6XCLihJFcIixcIiZpbWF0aDtcIjpcIsSxXCIsXCImaW1vZjtcIjpcIuKKt1wiLFwiJmltcGVkO1wiOlwixrVcIixcIiZpbjtcIjpcIuKIiFwiLFwiJmluY2FyZTtcIjpcIuKEhVwiLFwiJmluZmluO1wiOlwi4oieXCIsXCImaW5maW50aWU7XCI6XCLip51cIixcIiZpbm9kb3Q7XCI6XCLEsVwiLFwiJmludDtcIjpcIuKIq1wiLFwiJmludGNhbDtcIjpcIuKKulwiLFwiJmludGVnZXJzO1wiOlwi4oSkXCIsXCImaW50ZXJjYWw7XCI6XCLiirpcIixcIiZpbnRsYXJoaztcIjpcIuKol1wiLFwiJmludHByb2Q7XCI6XCLiqLxcIixcIiZpb2N5O1wiOlwi0ZFcIixcIiZpb2dvbjtcIjpcIsSvXCIsXCImaW9wZjtcIjpcIvCdlZpcIixcIiZpb3RhO1wiOlwizrlcIixcIiZpcHJvZDtcIjpcIuKovFwiLFwiJmlxdWVzdFwiOlwiwr9cIixcIiZpcXVlc3Q7XCI6XCLCv1wiLFwiJmlzY3I7XCI6XCLwnZK+XCIsXCImaXNpbjtcIjpcIuKIiFwiLFwiJmlzaW5FO1wiOlwi4ou5XCIsXCImaXNpbmRvdDtcIjpcIuKLtVwiLFwiJmlzaW5zO1wiOlwi4ou0XCIsXCImaXNpbnN2O1wiOlwi4ouzXCIsXCImaXNpbnY7XCI6XCLiiIhcIixcIiZpdDtcIjpcIuKBolwiLFwiJml0aWxkZTtcIjpcIsSpXCIsXCImaXVrY3k7XCI6XCLRllwiLFwiJml1bWxcIjpcIsOvXCIsXCImaXVtbDtcIjpcIsOvXCIsXCImamNpcmM7XCI6XCLEtVwiLFwiJmpjeTtcIjpcItC5XCIsXCImamZyO1wiOlwi8J2Up1wiLFwiJmptYXRoO1wiOlwiyLdcIixcIiZqb3BmO1wiOlwi8J2Vm1wiLFwiJmpzY3I7XCI6XCLwnZK/XCIsXCImanNlcmN5O1wiOlwi0ZhcIixcIiZqdWtjeTtcIjpcItGUXCIsXCIma2FwcGE7XCI6XCLOulwiLFwiJmthcHBhdjtcIjpcIs+wXCIsXCIma2NlZGlsO1wiOlwixLdcIixcIiZrY3k7XCI6XCLQulwiLFwiJmtmcjtcIjpcIvCdlKhcIixcIiZrZ3JlZW47XCI6XCLEuFwiLFwiJmtoY3k7XCI6XCLRhVwiLFwiJmtqY3k7XCI6XCLRnFwiLFwiJmtvcGY7XCI6XCLwnZWcXCIsXCIma3NjcjtcIjpcIvCdk4BcIixcIiZsQWFycjtcIjpcIuKHmlwiLFwiJmxBcnI7XCI6XCLih5BcIixcIiZsQXRhaWw7XCI6XCLipJtcIixcIiZsQmFycjtcIjpcIuKkjlwiLFwiJmxFO1wiOlwi4ommXCIsXCImbEVnO1wiOlwi4qqLXCIsXCImbEhhcjtcIjpcIuKlolwiLFwiJmxhY3V0ZTtcIjpcIsS6XCIsXCImbGFlbXB0eXY7XCI6XCLiprRcIixcIiZsYWdyYW47XCI6XCLihJJcIixcIiZsYW1iZGE7XCI6XCLOu1wiLFwiJmxhbmc7XCI6XCLin6hcIixcIiZsYW5nZDtcIjpcIuKmkVwiLFwiJmxhbmdsZTtcIjpcIuKfqFwiLFwiJmxhcDtcIjpcIuKqhVwiLFwiJmxhcXVvXCI6XCLCq1wiLFwiJmxhcXVvO1wiOlwiwqtcIixcIiZsYXJyO1wiOlwi4oaQXCIsXCImbGFycmI7XCI6XCLih6RcIixcIiZsYXJyYmZzO1wiOlwi4qSfXCIsXCImbGFycmZzO1wiOlwi4qSdXCIsXCImbGFycmhrO1wiOlwi4oapXCIsXCImbGFycmxwO1wiOlwi4oarXCIsXCImbGFycnBsO1wiOlwi4qS5XCIsXCImbGFycnNpbTtcIjpcIuKls1wiLFwiJmxhcnJ0bDtcIjpcIuKGolwiLFwiJmxhdDtcIjpcIuKqq1wiLFwiJmxhdGFpbDtcIjpcIuKkmVwiLFwiJmxhdGU7XCI6XCLiqq1cIixcIiZsYXRlcztcIjpcIuKqre+4gFwiLFwiJmxiYXJyO1wiOlwi4qSMXCIsXCImbGJicms7XCI6XCLinbJcIixcIiZsYnJhY2U7XCI6XCJ7XCIsXCImbGJyYWNrO1wiOlwiW1wiLFwiJmxicmtlO1wiOlwi4qaLXCIsXCImbGJya3NsZDtcIjpcIuKmj1wiLFwiJmxicmtzbHU7XCI6XCLipo1cIixcIiZsY2Fyb247XCI6XCLEvlwiLFwiJmxjZWRpbDtcIjpcIsS8XCIsXCImbGNlaWw7XCI6XCLijIhcIixcIiZsY3ViO1wiOlwie1wiLFwiJmxjeTtcIjpcItC7XCIsXCImbGRjYTtcIjpcIuKktlwiLFwiJmxkcXVvO1wiOlwi4oCcXCIsXCImbGRxdW9yO1wiOlwi4oCeXCIsXCImbGRyZGhhcjtcIjpcIuKlp1wiLFwiJmxkcnVzaGFyO1wiOlwi4qWLXCIsXCImbGRzaDtcIjpcIuKGslwiLFwiJmxlO1wiOlwi4omkXCIsXCImbGVmdGFycm93O1wiOlwi4oaQXCIsXCImbGVmdGFycm93dGFpbDtcIjpcIuKGolwiLFwiJmxlZnRoYXJwb29uZG93bjtcIjpcIuKGvVwiLFwiJmxlZnRoYXJwb29udXA7XCI6XCLihrxcIixcIiZsZWZ0bGVmdGFycm93cztcIjpcIuKHh1wiLFwiJmxlZnRyaWdodGFycm93O1wiOlwi4oaUXCIsXCImbGVmdHJpZ2h0YXJyb3dzO1wiOlwi4oeGXCIsXCImbGVmdHJpZ2h0aGFycG9vbnM7XCI6XCLih4tcIixcIiZsZWZ0cmlnaHRzcXVpZ2Fycm93O1wiOlwi4oatXCIsXCImbGVmdHRocmVldGltZXM7XCI6XCLii4tcIixcIiZsZWc7XCI6XCLii5pcIixcIiZsZXE7XCI6XCLiiaRcIixcIiZsZXFxO1wiOlwi4ommXCIsXCImbGVxc2xhbnQ7XCI6XCLiqb1cIixcIiZsZXM7XCI6XCLiqb1cIixcIiZsZXNjYztcIjpcIuKqqFwiLFwiJmxlc2RvdDtcIjpcIuKpv1wiLFwiJmxlc2RvdG87XCI6XCLiqoFcIixcIiZsZXNkb3RvcjtcIjpcIuKqg1wiLFwiJmxlc2c7XCI6XCLii5rvuIBcIixcIiZsZXNnZXM7XCI6XCLiqpNcIixcIiZsZXNzYXBwcm94O1wiOlwi4qqFXCIsXCImbGVzc2RvdDtcIjpcIuKLllwiLFwiJmxlc3NlcWd0cjtcIjpcIuKLmlwiLFwiJmxlc3NlcXFndHI7XCI6XCLiqotcIixcIiZsZXNzZ3RyO1wiOlwi4om2XCIsXCImbGVzc3NpbTtcIjpcIuKJslwiLFwiJmxmaXNodDtcIjpcIuKlvFwiLFwiJmxmbG9vcjtcIjpcIuKMilwiLFwiJmxmcjtcIjpcIvCdlKlcIixcIiZsZztcIjpcIuKJtlwiLFwiJmxnRTtcIjpcIuKqkVwiLFwiJmxoYXJkO1wiOlwi4oa9XCIsXCImbGhhcnU7XCI6XCLihrxcIixcIiZsaGFydWw7XCI6XCLipapcIixcIiZsaGJsaztcIjpcIuKWhFwiLFwiJmxqY3k7XCI6XCLRmVwiLFwiJmxsO1wiOlwi4omqXCIsXCImbGxhcnI7XCI6XCLih4dcIixcIiZsbGNvcm5lcjtcIjpcIuKMnlwiLFwiJmxsaGFyZDtcIjpcIuKlq1wiLFwiJmxsdHJpO1wiOlwi4pe6XCIsXCImbG1pZG90O1wiOlwixYBcIixcIiZsbW91c3Q7XCI6XCLijrBcIixcIiZsbW91c3RhY2hlO1wiOlwi4o6wXCIsXCImbG5FO1wiOlwi4omoXCIsXCImbG5hcDtcIjpcIuKqiVwiLFwiJmxuYXBwcm94O1wiOlwi4qqJXCIsXCImbG5lO1wiOlwi4qqHXCIsXCImbG5lcTtcIjpcIuKqh1wiLFwiJmxuZXFxO1wiOlwi4omoXCIsXCImbG5zaW07XCI6XCLii6ZcIixcIiZsb2FuZztcIjpcIuKfrFwiLFwiJmxvYXJyO1wiOlwi4oe9XCIsXCImbG9icms7XCI6XCLin6ZcIixcIiZsb25nbGVmdGFycm93O1wiOlwi4p+1XCIsXCImbG9uZ2xlZnRyaWdodGFycm93O1wiOlwi4p+3XCIsXCImbG9uZ21hcHN0bztcIjpcIuKfvFwiLFwiJmxvbmdyaWdodGFycm93O1wiOlwi4p+2XCIsXCImbG9vcGFycm93bGVmdDtcIjpcIuKGq1wiLFwiJmxvb3BhcnJvd3JpZ2h0O1wiOlwi4oasXCIsXCImbG9wYXI7XCI6XCLipoVcIixcIiZsb3BmO1wiOlwi8J2VnVwiLFwiJmxvcGx1cztcIjpcIuKorVwiLFwiJmxvdGltZXM7XCI6XCLiqLRcIixcIiZsb3dhc3Q7XCI6XCLiiJdcIixcIiZsb3diYXI7XCI6XCJfXCIsXCImbG96O1wiOlwi4peKXCIsXCImbG96ZW5nZTtcIjpcIuKXilwiLFwiJmxvemY7XCI6XCLip6tcIixcIiZscGFyO1wiOlwiKFwiLFwiJmxwYXJsdDtcIjpcIuKmk1wiLFwiJmxyYXJyO1wiOlwi4oeGXCIsXCImbHJjb3JuZXI7XCI6XCLijJ9cIixcIiZscmhhcjtcIjpcIuKHi1wiLFwiJmxyaGFyZDtcIjpcIuKlrVwiLFwiJmxybTtcIjpcIuKAjlwiLFwiJmxydHJpO1wiOlwi4oq/XCIsXCImbHNhcXVvO1wiOlwi4oC5XCIsXCImbHNjcjtcIjpcIvCdk4FcIixcIiZsc2g7XCI6XCLihrBcIixcIiZsc2ltO1wiOlwi4omyXCIsXCImbHNpbWU7XCI6XCLiqo1cIixcIiZsc2ltZztcIjpcIuKqj1wiLFwiJmxzcWI7XCI6XCJbXCIsXCImbHNxdW87XCI6XCLigJhcIixcIiZsc3F1b3I7XCI6XCLigJpcIixcIiZsc3Ryb2s7XCI6XCLFglwiLFwiJmx0XCI6XCI8XCIsXCImbHQ7XCI6XCI8XCIsXCImbHRjYztcIjpcIuKqplwiLFwiJmx0Y2lyO1wiOlwi4qm5XCIsXCImbHRkb3Q7XCI6XCLii5ZcIixcIiZsdGhyZWU7XCI6XCLii4tcIixcIiZsdGltZXM7XCI6XCLii4lcIixcIiZsdGxhcnI7XCI6XCLipbZcIixcIiZsdHF1ZXN0O1wiOlwi4qm7XCIsXCImbHRyUGFyO1wiOlwi4qaWXCIsXCImbHRyaTtcIjpcIuKXg1wiLFwiJmx0cmllO1wiOlwi4oq0XCIsXCImbHRyaWY7XCI6XCLil4JcIixcIiZsdXJkc2hhcjtcIjpcIuKlilwiLFwiJmx1cnVoYXI7XCI6XCLipaZcIixcIiZsdmVydG5lcXE7XCI6XCLiiajvuIBcIixcIiZsdm5FO1wiOlwi4omo77iAXCIsXCImbUREb3Q7XCI6XCLiiLpcIixcIiZtYWNyXCI6XCLCr1wiLFwiJm1hY3I7XCI6XCLCr1wiLFwiJm1hbGU7XCI6XCLimYJcIixcIiZtYWx0O1wiOlwi4pygXCIsXCImbWFsdGVzZTtcIjpcIuKcoFwiLFwiJm1hcDtcIjpcIuKGplwiLFwiJm1hcHN0bztcIjpcIuKGplwiLFwiJm1hcHN0b2Rvd247XCI6XCLihqdcIixcIiZtYXBzdG9sZWZ0O1wiOlwi4oakXCIsXCImbWFwc3RvdXA7XCI6XCLihqVcIixcIiZtYXJrZXI7XCI6XCLilq5cIixcIiZtY29tbWE7XCI6XCLiqKlcIixcIiZtY3k7XCI6XCLQvFwiLFwiJm1kYXNoO1wiOlwi4oCUXCIsXCImbWVhc3VyZWRhbmdsZTtcIjpcIuKIoVwiLFwiJm1mcjtcIjpcIvCdlKpcIixcIiZtaG87XCI6XCLihKdcIixcIiZtaWNyb1wiOlwiwrVcIixcIiZtaWNybztcIjpcIsK1XCIsXCImbWlkO1wiOlwi4oijXCIsXCImbWlkYXN0O1wiOlwiKlwiLFwiJm1pZGNpcjtcIjpcIuKrsFwiLFwiJm1pZGRvdFwiOlwiwrdcIixcIiZtaWRkb3Q7XCI6XCLCt1wiLFwiJm1pbnVzO1wiOlwi4oiSXCIsXCImbWludXNiO1wiOlwi4oqfXCIsXCImbWludXNkO1wiOlwi4oi4XCIsXCImbWludXNkdTtcIjpcIuKoqlwiLFwiJm1sY3A7XCI6XCLiq5tcIixcIiZtbGRyO1wiOlwi4oCmXCIsXCImbW5wbHVzO1wiOlwi4oiTXCIsXCImbW9kZWxzO1wiOlwi4oqnXCIsXCImbW9wZjtcIjpcIvCdlZ5cIixcIiZtcDtcIjpcIuKIk1wiLFwiJm1zY3I7XCI6XCLwnZOCXCIsXCImbXN0cG9zO1wiOlwi4oi+XCIsXCImbXU7XCI6XCLOvFwiLFwiJm11bHRpbWFwO1wiOlwi4oq4XCIsXCImbXVtYXA7XCI6XCLiirhcIixcIiZuR2c7XCI6XCLii5nMuFwiLFwiJm5HdDtcIjpcIuKJq+KDklwiLFwiJm5HdHY7XCI6XCLiiavMuFwiLFwiJm5MZWZ0YXJyb3c7XCI6XCLih41cIixcIiZuTGVmdHJpZ2h0YXJyb3c7XCI6XCLih45cIixcIiZuTGw7XCI6XCLii5jMuFwiLFwiJm5MdDtcIjpcIuKJquKDklwiLFwiJm5MdHY7XCI6XCLiiarMuFwiLFwiJm5SaWdodGFycm93O1wiOlwi4oePXCIsXCImblZEYXNoO1wiOlwi4oqvXCIsXCImblZkYXNoO1wiOlwi4oquXCIsXCImbmFibGE7XCI6XCLiiIdcIixcIiZuYWN1dGU7XCI6XCLFhFwiLFwiJm5hbmc7XCI6XCLiiKDig5JcIixcIiZuYXA7XCI6XCLiiYlcIixcIiZuYXBFO1wiOlwi4qmwzLhcIixcIiZuYXBpZDtcIjpcIuKJi8y4XCIsXCImbmFwb3M7XCI6XCLFiVwiLFwiJm5hcHByb3g7XCI6XCLiiYlcIixcIiZuYXR1cjtcIjpcIuKZrlwiLFwiJm5hdHVyYWw7XCI6XCLima5cIixcIiZuYXR1cmFscztcIjpcIuKElVwiLFwiJm5ic3BcIjpcIsKgXCIsXCImbmJzcDtcIjpcIsKgXCIsXCImbmJ1bXA7XCI6XCLiiY7MuFwiLFwiJm5idW1wZTtcIjpcIuKJj8y4XCIsXCImbmNhcDtcIjpcIuKpg1wiLFwiJm5jYXJvbjtcIjpcIsWIXCIsXCImbmNlZGlsO1wiOlwixYZcIixcIiZuY29uZztcIjpcIuKJh1wiLFwiJm5jb25nZG90O1wiOlwi4qmtzLhcIixcIiZuY3VwO1wiOlwi4qmCXCIsXCImbmN5O1wiOlwi0L1cIixcIiZuZGFzaDtcIjpcIuKAk1wiLFwiJm5lO1wiOlwi4omgXCIsXCImbmVBcnI7XCI6XCLih5dcIixcIiZuZWFyaGs7XCI6XCLipKRcIixcIiZuZWFycjtcIjpcIuKGl1wiLFwiJm5lYXJyb3c7XCI6XCLihpdcIixcIiZuZWRvdDtcIjpcIuKJkMy4XCIsXCImbmVxdWl2O1wiOlwi4omiXCIsXCImbmVzZWFyO1wiOlwi4qSoXCIsXCImbmVzaW07XCI6XCLiiYLMuFwiLFwiJm5leGlzdDtcIjpcIuKIhFwiLFwiJm5leGlzdHM7XCI6XCLiiIRcIixcIiZuZnI7XCI6XCLwnZSrXCIsXCImbmdFO1wiOlwi4omnzLhcIixcIiZuZ2U7XCI6XCLiibFcIixcIiZuZ2VxO1wiOlwi4omxXCIsXCImbmdlcXE7XCI6XCLiiafMuFwiLFwiJm5nZXFzbGFudDtcIjpcIuKpvsy4XCIsXCImbmdlcztcIjpcIuKpvsy4XCIsXCImbmdzaW07XCI6XCLiibVcIixcIiZuZ3Q7XCI6XCLiia9cIixcIiZuZ3RyO1wiOlwi4omvXCIsXCImbmhBcnI7XCI6XCLih45cIixcIiZuaGFycjtcIjpcIuKGrlwiLFwiJm5ocGFyO1wiOlwi4quyXCIsXCImbmk7XCI6XCLiiItcIixcIiZuaXM7XCI6XCLii7xcIixcIiZuaXNkO1wiOlwi4ou6XCIsXCImbml2O1wiOlwi4oiLXCIsXCImbmpjeTtcIjpcItGaXCIsXCImbmxBcnI7XCI6XCLih41cIixcIiZubEU7XCI6XCLiiabMuFwiLFwiJm5sYXJyO1wiOlwi4oaaXCIsXCImbmxkcjtcIjpcIuKApVwiLFwiJm5sZTtcIjpcIuKJsFwiLFwiJm5sZWZ0YXJyb3c7XCI6XCLihppcIixcIiZubGVmdHJpZ2h0YXJyb3c7XCI6XCLihq5cIixcIiZubGVxO1wiOlwi4omwXCIsXCImbmxlcXE7XCI6XCLiiabMuFwiLFwiJm5sZXFzbGFudDtcIjpcIuKpvcy4XCIsXCImbmxlcztcIjpcIuKpvcy4XCIsXCImbmxlc3M7XCI6XCLiia5cIixcIiZubHNpbTtcIjpcIuKJtFwiLFwiJm5sdDtcIjpcIuKJrlwiLFwiJm5sdHJpO1wiOlwi4ouqXCIsXCImbmx0cmllO1wiOlwi4ousXCIsXCImbm1pZDtcIjpcIuKIpFwiLFwiJm5vcGY7XCI6XCLwnZWfXCIsXCImbm90XCI6XCLCrFwiLFwiJm5vdDtcIjpcIsKsXCIsXCImbm90aW47XCI6XCLiiIlcIixcIiZub3RpbkU7XCI6XCLii7nMuFwiLFwiJm5vdGluZG90O1wiOlwi4ou1zLhcIixcIiZub3RpbnZhO1wiOlwi4oiJXCIsXCImbm90aW52YjtcIjpcIuKLt1wiLFwiJm5vdGludmM7XCI6XCLii7ZcIixcIiZub3RuaTtcIjpcIuKIjFwiLFwiJm5vdG5pdmE7XCI6XCLiiIxcIixcIiZub3RuaXZiO1wiOlwi4ou+XCIsXCImbm90bml2YztcIjpcIuKLvVwiLFwiJm5wYXI7XCI6XCLiiKZcIixcIiZucGFyYWxsZWw7XCI6XCLiiKZcIixcIiZucGFyc2w7XCI6XCLiq73ig6VcIixcIiZucGFydDtcIjpcIuKIgsy4XCIsXCImbnBvbGludDtcIjpcIuKolFwiLFwiJm5wcjtcIjpcIuKKgFwiLFwiJm5wcmN1ZTtcIjpcIuKLoFwiLFwiJm5wcmU7XCI6XCLiqq/MuFwiLFwiJm5wcmVjO1wiOlwi4oqAXCIsXCImbnByZWNlcTtcIjpcIuKqr8y4XCIsXCImbnJBcnI7XCI6XCLih49cIixcIiZucmFycjtcIjpcIuKGm1wiLFwiJm5yYXJyYztcIjpcIuKks8y4XCIsXCImbnJhcnJ3O1wiOlwi4oadzLhcIixcIiZucmlnaHRhcnJvdztcIjpcIuKGm1wiLFwiJm5ydHJpO1wiOlwi4ourXCIsXCImbnJ0cmllO1wiOlwi4outXCIsXCImbnNjO1wiOlwi4oqBXCIsXCImbnNjY3VlO1wiOlwi4ouhXCIsXCImbnNjZTtcIjpcIuKqsMy4XCIsXCImbnNjcjtcIjpcIvCdk4NcIixcIiZuc2hvcnRtaWQ7XCI6XCLiiKRcIixcIiZuc2hvcnRwYXJhbGxlbDtcIjpcIuKIplwiLFwiJm5zaW07XCI6XCLiiYFcIixcIiZuc2ltZTtcIjpcIuKJhFwiLFwiJm5zaW1lcTtcIjpcIuKJhFwiLFwiJm5zbWlkO1wiOlwi4oikXCIsXCImbnNwYXI7XCI6XCLiiKZcIixcIiZuc3FzdWJlO1wiOlwi4ouiXCIsXCImbnNxc3VwZTtcIjpcIuKLo1wiLFwiJm5zdWI7XCI6XCLiioRcIixcIiZuc3ViRTtcIjpcIuKrhcy4XCIsXCImbnN1YmU7XCI6XCLiiohcIixcIiZuc3Vic2V0O1wiOlwi4oqC4oOSXCIsXCImbnN1YnNldGVxO1wiOlwi4oqIXCIsXCImbnN1YnNldGVxcTtcIjpcIuKrhcy4XCIsXCImbnN1Y2M7XCI6XCLiioFcIixcIiZuc3VjY2VxO1wiOlwi4qqwzLhcIixcIiZuc3VwO1wiOlwi4oqFXCIsXCImbnN1cEU7XCI6XCLiq4bMuFwiLFwiJm5zdXBlO1wiOlwi4oqJXCIsXCImbnN1cHNldDtcIjpcIuKKg+KDklwiLFwiJm5zdXBzZXRlcTtcIjpcIuKKiVwiLFwiJm5zdXBzZXRlcXE7XCI6XCLiq4bMuFwiLFwiJm50Z2w7XCI6XCLiiblcIixcIiZudGlsZGVcIjpcIsOxXCIsXCImbnRpbGRlO1wiOlwiw7FcIixcIiZudGxnO1wiOlwi4om4XCIsXCImbnRyaWFuZ2xlbGVmdDtcIjpcIuKLqlwiLFwiJm50cmlhbmdsZWxlZnRlcTtcIjpcIuKLrFwiLFwiJm50cmlhbmdsZXJpZ2h0O1wiOlwi4ourXCIsXCImbnRyaWFuZ2xlcmlnaHRlcTtcIjpcIuKLrVwiLFwiJm51O1wiOlwizr1cIixcIiZudW07XCI6XCIjXCIsXCImbnVtZXJvO1wiOlwi4oSWXCIsXCImbnVtc3A7XCI6XCLigIdcIixcIiZudkRhc2g7XCI6XCLiiq1cIixcIiZudkhhcnI7XCI6XCLipIRcIixcIiZudmFwO1wiOlwi4omN4oOSXCIsXCImbnZkYXNoO1wiOlwi4oqsXCIsXCImbnZnZTtcIjpcIuKJpeKDklwiLFwiJm52Z3Q7XCI6XCI+4oOSXCIsXCImbnZpbmZpbjtcIjpcIuKnnlwiLFwiJm52bEFycjtcIjpcIuKkglwiLFwiJm52bGU7XCI6XCLiiaTig5JcIixcIiZudmx0O1wiOlwiPOKDklwiLFwiJm52bHRyaWU7XCI6XCLiirTig5JcIixcIiZudnJBcnI7XCI6XCLipINcIixcIiZudnJ0cmllO1wiOlwi4oq14oOSXCIsXCImbnZzaW07XCI6XCLiiLzig5JcIixcIiZud0FycjtcIjpcIuKHllwiLFwiJm53YXJoaztcIjpcIuKko1wiLFwiJm53YXJyO1wiOlwi4oaWXCIsXCImbndhcnJvdztcIjpcIuKGllwiLFwiJm53bmVhcjtcIjpcIuKkp1wiLFwiJm9TO1wiOlwi4pOIXCIsXCImb2FjdXRlXCI6XCLDs1wiLFwiJm9hY3V0ZTtcIjpcIsOzXCIsXCImb2FzdDtcIjpcIuKKm1wiLFwiJm9jaXI7XCI6XCLiippcIixcIiZvY2lyY1wiOlwiw7RcIixcIiZvY2lyYztcIjpcIsO0XCIsXCImb2N5O1wiOlwi0L5cIixcIiZvZGFzaDtcIjpcIuKKnVwiLFwiJm9kYmxhYztcIjpcIsWRXCIsXCImb2RpdjtcIjpcIuKouFwiLFwiJm9kb3Q7XCI6XCLiiplcIixcIiZvZHNvbGQ7XCI6XCLiprxcIixcIiZvZWxpZztcIjpcIsWTXCIsXCImb2ZjaXI7XCI6XCLipr9cIixcIiZvZnI7XCI6XCLwnZSsXCIsXCImb2dvbjtcIjpcIsubXCIsXCImb2dyYXZlXCI6XCLDslwiLFwiJm9ncmF2ZTtcIjpcIsOyXCIsXCImb2d0O1wiOlwi4qeBXCIsXCImb2hiYXI7XCI6XCLiprVcIixcIiZvaG07XCI6XCLOqVwiLFwiJm9pbnQ7XCI6XCLiiK5cIixcIiZvbGFycjtcIjpcIuKGulwiLFwiJm9sY2lyO1wiOlwi4qa+XCIsXCImb2xjcm9zcztcIjpcIuKmu1wiLFwiJm9saW5lO1wiOlwi4oC+XCIsXCImb2x0O1wiOlwi4qeAXCIsXCImb21hY3I7XCI6XCLFjVwiLFwiJm9tZWdhO1wiOlwiz4lcIixcIiZvbWljcm9uO1wiOlwizr9cIixcIiZvbWlkO1wiOlwi4qa2XCIsXCImb21pbnVzO1wiOlwi4oqWXCIsXCImb29wZjtcIjpcIvCdlaBcIixcIiZvcGFyO1wiOlwi4qa3XCIsXCImb3BlcnA7XCI6XCLiprlcIixcIiZvcGx1cztcIjpcIuKKlVwiLFwiJm9yO1wiOlwi4oioXCIsXCImb3JhcnI7XCI6XCLihrtcIixcIiZvcmQ7XCI6XCLiqZ1cIixcIiZvcmRlcjtcIjpcIuKEtFwiLFwiJm9yZGVyb2Y7XCI6XCLihLRcIixcIiZvcmRmXCI6XCLCqlwiLFwiJm9yZGY7XCI6XCLCqlwiLFwiJm9yZG1cIjpcIsK6XCIsXCImb3JkbTtcIjpcIsK6XCIsXCImb3JpZ29mO1wiOlwi4oq2XCIsXCImb3JvcjtcIjpcIuKpllwiLFwiJm9yc2xvcGU7XCI6XCLiqZdcIixcIiZvcnY7XCI6XCLiqZtcIixcIiZvc2NyO1wiOlwi4oS0XCIsXCImb3NsYXNoXCI6XCLDuFwiLFwiJm9zbGFzaDtcIjpcIsO4XCIsXCImb3NvbDtcIjpcIuKKmFwiLFwiJm90aWxkZVwiOlwiw7VcIixcIiZvdGlsZGU7XCI6XCLDtVwiLFwiJm90aW1lcztcIjpcIuKKl1wiLFwiJm90aW1lc2FzO1wiOlwi4qi2XCIsXCImb3VtbFwiOlwiw7ZcIixcIiZvdW1sO1wiOlwiw7ZcIixcIiZvdmJhcjtcIjpcIuKMvVwiLFwiJnBhcjtcIjpcIuKIpVwiLFwiJnBhcmFcIjpcIsK2XCIsXCImcGFyYTtcIjpcIsK2XCIsXCImcGFyYWxsZWw7XCI6XCLiiKVcIixcIiZwYXJzaW07XCI6XCLiq7NcIixcIiZwYXJzbDtcIjpcIuKrvVwiLFwiJnBhcnQ7XCI6XCLiiIJcIixcIiZwY3k7XCI6XCLQv1wiLFwiJnBlcmNudDtcIjpcIiVcIixcIiZwZXJpb2Q7XCI6XCIuXCIsXCImcGVybWlsO1wiOlwi4oCwXCIsXCImcGVycDtcIjpcIuKKpVwiLFwiJnBlcnRlbms7XCI6XCLigLFcIixcIiZwZnI7XCI6XCLwnZStXCIsXCImcGhpO1wiOlwiz4ZcIixcIiZwaGl2O1wiOlwiz5VcIixcIiZwaG1tYXQ7XCI6XCLihLNcIixcIiZwaG9uZTtcIjpcIuKYjlwiLFwiJnBpO1wiOlwiz4BcIixcIiZwaXRjaGZvcms7XCI6XCLii5RcIixcIiZwaXY7XCI6XCLPllwiLFwiJnBsYW5jaztcIjpcIuKEj1wiLFwiJnBsYW5ja2g7XCI6XCLihI5cIixcIiZwbGFua3Y7XCI6XCLihI9cIixcIiZwbHVzO1wiOlwiK1wiLFwiJnBsdXNhY2lyO1wiOlwi4qijXCIsXCImcGx1c2I7XCI6XCLiip5cIixcIiZwbHVzY2lyO1wiOlwi4qiiXCIsXCImcGx1c2RvO1wiOlwi4oiUXCIsXCImcGx1c2R1O1wiOlwi4qilXCIsXCImcGx1c2U7XCI6XCLiqbJcIixcIiZwbHVzbW5cIjpcIsKxXCIsXCImcGx1c21uO1wiOlwiwrFcIixcIiZwbHVzc2ltO1wiOlwi4qimXCIsXCImcGx1c3R3bztcIjpcIuKop1wiLFwiJnBtO1wiOlwiwrFcIixcIiZwb2ludGludDtcIjpcIuKolVwiLFwiJnBvcGY7XCI6XCLwnZWhXCIsXCImcG91bmRcIjpcIsKjXCIsXCImcG91bmQ7XCI6XCLCo1wiLFwiJnByO1wiOlwi4om6XCIsXCImcHJFO1wiOlwi4qqzXCIsXCImcHJhcDtcIjpcIuKqt1wiLFwiJnByY3VlO1wiOlwi4om8XCIsXCImcHJlO1wiOlwi4qqvXCIsXCImcHJlYztcIjpcIuKJulwiLFwiJnByZWNhcHByb3g7XCI6XCLiqrdcIixcIiZwcmVjY3VybHllcTtcIjpcIuKJvFwiLFwiJnByZWNlcTtcIjpcIuKqr1wiLFwiJnByZWNuYXBwcm94O1wiOlwi4qq5XCIsXCImcHJlY25lcXE7XCI6XCLiqrVcIixcIiZwcmVjbnNpbTtcIjpcIuKLqFwiLFwiJnByZWNzaW07XCI6XCLiib5cIixcIiZwcmltZTtcIjpcIuKAslwiLFwiJnByaW1lcztcIjpcIuKEmVwiLFwiJnBybkU7XCI6XCLiqrVcIixcIiZwcm5hcDtcIjpcIuKquVwiLFwiJnBybnNpbTtcIjpcIuKLqFwiLFwiJnByb2Q7XCI6XCLiiI9cIixcIiZwcm9mYWxhcjtcIjpcIuKMrlwiLFwiJnByb2ZsaW5lO1wiOlwi4oySXCIsXCImcHJvZnN1cmY7XCI6XCLijJNcIixcIiZwcm9wO1wiOlwi4oidXCIsXCImcHJvcHRvO1wiOlwi4oidXCIsXCImcHJzaW07XCI6XCLiib5cIixcIiZwcnVyZWw7XCI6XCLiirBcIixcIiZwc2NyO1wiOlwi8J2ThVwiLFwiJnBzaTtcIjpcIs+IXCIsXCImcHVuY3NwO1wiOlwi4oCIXCIsXCImcWZyO1wiOlwi8J2UrlwiLFwiJnFpbnQ7XCI6XCLiqIxcIixcIiZxb3BmO1wiOlwi8J2VolwiLFwiJnFwcmltZTtcIjpcIuKBl1wiLFwiJnFzY3I7XCI6XCLwnZOGXCIsXCImcXVhdGVybmlvbnM7XCI6XCLihI1cIixcIiZxdWF0aW50O1wiOlwi4qiWXCIsXCImcXVlc3Q7XCI6XCI/XCIsXCImcXVlc3RlcTtcIjpcIuKJn1wiLFwiJnF1b3RcIjonXCInLFwiJnF1b3Q7XCI6J1wiJyxcIiZyQWFycjtcIjpcIuKHm1wiLFwiJnJBcnI7XCI6XCLih5JcIixcIiZyQXRhaWw7XCI6XCLipJxcIixcIiZyQmFycjtcIjpcIuKkj1wiLFwiJnJIYXI7XCI6XCLipaRcIixcIiZyYWNlO1wiOlwi4oi9zLFcIixcIiZyYWN1dGU7XCI6XCLFlVwiLFwiJnJhZGljO1wiOlwi4oiaXCIsXCImcmFlbXB0eXY7XCI6XCLiprNcIixcIiZyYW5nO1wiOlwi4p+pXCIsXCImcmFuZ2Q7XCI6XCLippJcIixcIiZyYW5nZTtcIjpcIuKmpVwiLFwiJnJhbmdsZTtcIjpcIuKfqVwiLFwiJnJhcXVvXCI6XCLCu1wiLFwiJnJhcXVvO1wiOlwiwrtcIixcIiZyYXJyO1wiOlwi4oaSXCIsXCImcmFycmFwO1wiOlwi4qW1XCIsXCImcmFycmI7XCI6XCLih6VcIixcIiZyYXJyYmZzO1wiOlwi4qSgXCIsXCImcmFycmM7XCI6XCLipLNcIixcIiZyYXJyZnM7XCI6XCLipJ5cIixcIiZyYXJyaGs7XCI6XCLihqpcIixcIiZyYXJybHA7XCI6XCLihqxcIixcIiZyYXJycGw7XCI6XCLipYVcIixcIiZyYXJyc2ltO1wiOlwi4qW0XCIsXCImcmFycnRsO1wiOlwi4oajXCIsXCImcmFycnc7XCI6XCLihp1cIixcIiZyYXRhaWw7XCI6XCLipJpcIixcIiZyYXRpbztcIjpcIuKItlwiLFwiJnJhdGlvbmFscztcIjpcIuKEmlwiLFwiJnJiYXJyO1wiOlwi4qSNXCIsXCImcmJicms7XCI6XCLinbNcIixcIiZyYnJhY2U7XCI6XCJ9XCIsXCImcmJyYWNrO1wiOlwiXVwiLFwiJnJicmtlO1wiOlwi4qaMXCIsXCImcmJya3NsZDtcIjpcIuKmjlwiLFwiJnJicmtzbHU7XCI6XCLippBcIixcIiZyY2Fyb247XCI6XCLFmVwiLFwiJnJjZWRpbDtcIjpcIsWXXCIsXCImcmNlaWw7XCI6XCLijIlcIixcIiZyY3ViO1wiOlwifVwiLFwiJnJjeTtcIjpcItGAXCIsXCImcmRjYTtcIjpcIuKkt1wiLFwiJnJkbGRoYXI7XCI6XCLipalcIixcIiZyZHF1bztcIjpcIuKAnVwiLFwiJnJkcXVvcjtcIjpcIuKAnVwiLFwiJnJkc2g7XCI6XCLihrNcIixcIiZyZWFsO1wiOlwi4oScXCIsXCImcmVhbGluZTtcIjpcIuKEm1wiLFwiJnJlYWxwYXJ0O1wiOlwi4oScXCIsXCImcmVhbHM7XCI6XCLihJ1cIixcIiZyZWN0O1wiOlwi4patXCIsXCImcmVnXCI6XCLCrlwiLFwiJnJlZztcIjpcIsKuXCIsXCImcmZpc2h0O1wiOlwi4qW9XCIsXCImcmZsb29yO1wiOlwi4oyLXCIsXCImcmZyO1wiOlwi8J2Ur1wiLFwiJnJoYXJkO1wiOlwi4oeBXCIsXCImcmhhcnU7XCI6XCLih4BcIixcIiZyaGFydWw7XCI6XCLipaxcIixcIiZyaG87XCI6XCLPgVwiLFwiJnJob3Y7XCI6XCLPsVwiLFwiJnJpZ2h0YXJyb3c7XCI6XCLihpJcIixcIiZyaWdodGFycm93dGFpbDtcIjpcIuKGo1wiLFwiJnJpZ2h0aGFycG9vbmRvd247XCI6XCLih4FcIixcIiZyaWdodGhhcnBvb251cDtcIjpcIuKHgFwiLFwiJnJpZ2h0bGVmdGFycm93cztcIjpcIuKHhFwiLFwiJnJpZ2h0bGVmdGhhcnBvb25zO1wiOlwi4oeMXCIsXCImcmlnaHRyaWdodGFycm93cztcIjpcIuKHiVwiLFwiJnJpZ2h0c3F1aWdhcnJvdztcIjpcIuKGnVwiLFwiJnJpZ2h0dGhyZWV0aW1lcztcIjpcIuKLjFwiLFwiJnJpbmc7XCI6XCLLmlwiLFwiJnJpc2luZ2RvdHNlcTtcIjpcIuKJk1wiLFwiJnJsYXJyO1wiOlwi4oeEXCIsXCImcmxoYXI7XCI6XCLih4xcIixcIiZybG07XCI6XCLigI9cIixcIiZybW91c3Q7XCI6XCLijrFcIixcIiZybW91c3RhY2hlO1wiOlwi4o6xXCIsXCImcm5taWQ7XCI6XCLiq65cIixcIiZyb2FuZztcIjpcIuKfrVwiLFwiJnJvYXJyO1wiOlwi4oe+XCIsXCImcm9icms7XCI6XCLin6dcIixcIiZyb3BhcjtcIjpcIuKmhlwiLFwiJnJvcGY7XCI6XCLwnZWjXCIsXCImcm9wbHVzO1wiOlwi4qiuXCIsXCImcm90aW1lcztcIjpcIuKotVwiLFwiJnJwYXI7XCI6XCIpXCIsXCImcnBhcmd0O1wiOlwi4qaUXCIsXCImcnBwb2xpbnQ7XCI6XCLiqJJcIixcIiZycmFycjtcIjpcIuKHiVwiLFwiJnJzYXF1bztcIjpcIuKAulwiLFwiJnJzY3I7XCI6XCLwnZOHXCIsXCImcnNoO1wiOlwi4oaxXCIsXCImcnNxYjtcIjpcIl1cIixcIiZyc3F1bztcIjpcIuKAmVwiLFwiJnJzcXVvcjtcIjpcIuKAmVwiLFwiJnJ0aHJlZTtcIjpcIuKLjFwiLFwiJnJ0aW1lcztcIjpcIuKLilwiLFwiJnJ0cmk7XCI6XCLilrlcIixcIiZydHJpZTtcIjpcIuKKtVwiLFwiJnJ0cmlmO1wiOlwi4pa4XCIsXCImcnRyaWx0cmk7XCI6XCLip45cIixcIiZydWx1aGFyO1wiOlwi4qWoXCIsXCImcng7XCI6XCLihJ5cIixcIiZzYWN1dGU7XCI6XCLFm1wiLFwiJnNicXVvO1wiOlwi4oCaXCIsXCImc2M7XCI6XCLiibtcIixcIiZzY0U7XCI6XCLiqrRcIixcIiZzY2FwO1wiOlwi4qq4XCIsXCImc2Nhcm9uO1wiOlwixaFcIixcIiZzY2N1ZTtcIjpcIuKJvVwiLFwiJnNjZTtcIjpcIuKqsFwiLFwiJnNjZWRpbDtcIjpcIsWfXCIsXCImc2NpcmM7XCI6XCLFnVwiLFwiJnNjbkU7XCI6XCLiqrZcIixcIiZzY25hcDtcIjpcIuKqulwiLFwiJnNjbnNpbTtcIjpcIuKLqVwiLFwiJnNjcG9saW50O1wiOlwi4qiTXCIsXCImc2NzaW07XCI6XCLiib9cIixcIiZzY3k7XCI6XCLRgVwiLFwiJnNkb3Q7XCI6XCLii4VcIixcIiZzZG90YjtcIjpcIuKKoVwiLFwiJnNkb3RlO1wiOlwi4qmmXCIsXCImc2VBcnI7XCI6XCLih5hcIixcIiZzZWFyaGs7XCI6XCLipKVcIixcIiZzZWFycjtcIjpcIuKGmFwiLFwiJnNlYXJyb3c7XCI6XCLihphcIixcIiZzZWN0XCI6XCLCp1wiLFwiJnNlY3Q7XCI6XCLCp1wiLFwiJnNlbWk7XCI6XCI7XCIsXCImc2Vzd2FyO1wiOlwi4qSpXCIsXCImc2V0bWludXM7XCI6XCLiiJZcIixcIiZzZXRtbjtcIjpcIuKIllwiLFwiJnNleHQ7XCI6XCLinLZcIixcIiZzZnI7XCI6XCLwnZSwXCIsXCImc2Zyb3duO1wiOlwi4oyiXCIsXCImc2hhcnA7XCI6XCLima9cIixcIiZzaGNoY3k7XCI6XCLRiVwiLFwiJnNoY3k7XCI6XCLRiFwiLFwiJnNob3J0bWlkO1wiOlwi4oijXCIsXCImc2hvcnRwYXJhbGxlbDtcIjpcIuKIpVwiLFwiJnNoeVwiOlwiwq1cIixcIiZzaHk7XCI6XCLCrVwiLFwiJnNpZ21hO1wiOlwiz4NcIixcIiZzaWdtYWY7XCI6XCLPglwiLFwiJnNpZ21hdjtcIjpcIs+CXCIsXCImc2ltO1wiOlwi4oi8XCIsXCImc2ltZG90O1wiOlwi4qmqXCIsXCImc2ltZTtcIjpcIuKJg1wiLFwiJnNpbWVxO1wiOlwi4omDXCIsXCImc2ltZztcIjpcIuKqnlwiLFwiJnNpbWdFO1wiOlwi4qqgXCIsXCImc2ltbDtcIjpcIuKqnVwiLFwiJnNpbWxFO1wiOlwi4qqfXCIsXCImc2ltbmU7XCI6XCLiiYZcIixcIiZzaW1wbHVzO1wiOlwi4qikXCIsXCImc2ltcmFycjtcIjpcIuKlslwiLFwiJnNsYXJyO1wiOlwi4oaQXCIsXCImc21hbGxzZXRtaW51cztcIjpcIuKIllwiLFwiJnNtYXNocDtcIjpcIuKos1wiLFwiJnNtZXBhcnNsO1wiOlwi4qekXCIsXCImc21pZDtcIjpcIuKIo1wiLFwiJnNtaWxlO1wiOlwi4oyjXCIsXCImc210O1wiOlwi4qqqXCIsXCImc210ZTtcIjpcIuKqrFwiLFwiJnNtdGVzO1wiOlwi4qqs77iAXCIsXCImc29mdGN5O1wiOlwi0YxcIixcIiZzb2w7XCI6XCIvXCIsXCImc29sYjtcIjpcIuKnhFwiLFwiJnNvbGJhcjtcIjpcIuKMv1wiLFwiJnNvcGY7XCI6XCLwnZWkXCIsXCImc3BhZGVzO1wiOlwi4pmgXCIsXCImc3BhZGVzdWl0O1wiOlwi4pmgXCIsXCImc3BhcjtcIjpcIuKIpVwiLFwiJnNxY2FwO1wiOlwi4oqTXCIsXCImc3FjYXBzO1wiOlwi4oqT77iAXCIsXCImc3FjdXA7XCI6XCLiipRcIixcIiZzcWN1cHM7XCI6XCLiipTvuIBcIixcIiZzcXN1YjtcIjpcIuKKj1wiLFwiJnNxc3ViZTtcIjpcIuKKkVwiLFwiJnNxc3Vic2V0O1wiOlwi4oqPXCIsXCImc3FzdWJzZXRlcTtcIjpcIuKKkVwiLFwiJnNxc3VwO1wiOlwi4oqQXCIsXCImc3FzdXBlO1wiOlwi4oqSXCIsXCImc3FzdXBzZXQ7XCI6XCLiipBcIixcIiZzcXN1cHNldGVxO1wiOlwi4oqSXCIsXCImc3F1O1wiOlwi4pahXCIsXCImc3F1YXJlO1wiOlwi4pahXCIsXCImc3F1YXJmO1wiOlwi4paqXCIsXCImc3F1ZjtcIjpcIuKWqlwiLFwiJnNyYXJyO1wiOlwi4oaSXCIsXCImc3NjcjtcIjpcIvCdk4hcIixcIiZzc2V0bW47XCI6XCLiiJZcIixcIiZzc21pbGU7XCI6XCLijKNcIixcIiZzc3RhcmY7XCI6XCLii4ZcIixcIiZzdGFyO1wiOlwi4piGXCIsXCImc3RhcmY7XCI6XCLimIVcIixcIiZzdHJhaWdodGVwc2lsb247XCI6XCLPtVwiLFwiJnN0cmFpZ2h0cGhpO1wiOlwiz5VcIixcIiZzdHJucztcIjpcIsKvXCIsXCImc3ViO1wiOlwi4oqCXCIsXCImc3ViRTtcIjpcIuKrhVwiLFwiJnN1YmRvdDtcIjpcIuKqvVwiLFwiJnN1YmU7XCI6XCLiioZcIixcIiZzdWJlZG90O1wiOlwi4quDXCIsXCImc3VibXVsdDtcIjpcIuKrgVwiLFwiJnN1Ym5FO1wiOlwi4quLXCIsXCImc3VibmU7XCI6XCLiiopcIixcIiZzdWJwbHVzO1wiOlwi4qq/XCIsXCImc3VicmFycjtcIjpcIuKluVwiLFwiJnN1YnNldDtcIjpcIuKKglwiLFwiJnN1YnNldGVxO1wiOlwi4oqGXCIsXCImc3Vic2V0ZXFxO1wiOlwi4quFXCIsXCImc3Vic2V0bmVxO1wiOlwi4oqKXCIsXCImc3Vic2V0bmVxcTtcIjpcIuKri1wiLFwiJnN1YnNpbTtcIjpcIuKrh1wiLFwiJnN1YnN1YjtcIjpcIuKrlVwiLFwiJnN1YnN1cDtcIjpcIuKrk1wiLFwiJnN1Y2M7XCI6XCLiibtcIixcIiZzdWNjYXBwcm94O1wiOlwi4qq4XCIsXCImc3VjY2N1cmx5ZXE7XCI6XCLiib1cIixcIiZzdWNjZXE7XCI6XCLiqrBcIixcIiZzdWNjbmFwcHJveDtcIjpcIuKqulwiLFwiJnN1Y2NuZXFxO1wiOlwi4qq2XCIsXCImc3VjY25zaW07XCI6XCLii6lcIixcIiZzdWNjc2ltO1wiOlwi4om/XCIsXCImc3VtO1wiOlwi4oiRXCIsXCImc3VuZztcIjpcIuKZqlwiLFwiJnN1cDFcIjpcIsK5XCIsXCImc3VwMTtcIjpcIsK5XCIsXCImc3VwMlwiOlwiwrJcIixcIiZzdXAyO1wiOlwiwrJcIixcIiZzdXAzXCI6XCLCs1wiLFwiJnN1cDM7XCI6XCLCs1wiLFwiJnN1cDtcIjpcIuKKg1wiLFwiJnN1cEU7XCI6XCLiq4ZcIixcIiZzdXBkb3Q7XCI6XCLiqr5cIixcIiZzdXBkc3ViO1wiOlwi4quYXCIsXCImc3VwZTtcIjpcIuKKh1wiLFwiJnN1cGVkb3Q7XCI6XCLiq4RcIixcIiZzdXBoc29sO1wiOlwi4p+JXCIsXCImc3VwaHN1YjtcIjpcIuKrl1wiLFwiJnN1cGxhcnI7XCI6XCLipbtcIixcIiZzdXBtdWx0O1wiOlwi4quCXCIsXCImc3VwbkU7XCI6XCLiq4xcIixcIiZzdXBuZTtcIjpcIuKKi1wiLFwiJnN1cHBsdXM7XCI6XCLiq4BcIixcIiZzdXBzZXQ7XCI6XCLiioNcIixcIiZzdXBzZXRlcTtcIjpcIuKKh1wiLFwiJnN1cHNldGVxcTtcIjpcIuKrhlwiLFwiJnN1cHNldG5lcTtcIjpcIuKKi1wiLFwiJnN1cHNldG5lcXE7XCI6XCLiq4xcIixcIiZzdXBzaW07XCI6XCLiq4hcIixcIiZzdXBzdWI7XCI6XCLiq5RcIixcIiZzdXBzdXA7XCI6XCLiq5ZcIixcIiZzd0FycjtcIjpcIuKHmVwiLFwiJnN3YXJoaztcIjpcIuKkplwiLFwiJnN3YXJyO1wiOlwi4oaZXCIsXCImc3dhcnJvdztcIjpcIuKGmVwiLFwiJnN3bndhcjtcIjpcIuKkqlwiLFwiJnN6bGlnXCI6XCLDn1wiLFwiJnN6bGlnO1wiOlwiw59cIixcIiZ0YXJnZXQ7XCI6XCLijJZcIixcIiZ0YXU7XCI6XCLPhFwiLFwiJnRicms7XCI6XCLijrRcIixcIiZ0Y2Fyb247XCI6XCLFpVwiLFwiJnRjZWRpbDtcIjpcIsWjXCIsXCImdGN5O1wiOlwi0YJcIixcIiZ0ZG90O1wiOlwi4oObXCIsXCImdGVscmVjO1wiOlwi4oyVXCIsXCImdGZyO1wiOlwi8J2UsVwiLFwiJnRoZXJlNDtcIjpcIuKItFwiLFwiJnRoZXJlZm9yZTtcIjpcIuKItFwiLFwiJnRoZXRhO1wiOlwizrhcIixcIiZ0aGV0YXN5bTtcIjpcIs+RXCIsXCImdGhldGF2O1wiOlwiz5FcIixcIiZ0aGlja2FwcHJveDtcIjpcIuKJiFwiLFwiJnRoaWNrc2ltO1wiOlwi4oi8XCIsXCImdGhpbnNwO1wiOlwi4oCJXCIsXCImdGhrYXA7XCI6XCLiiYhcIixcIiZ0aGtzaW07XCI6XCLiiLxcIixcIiZ0aG9yblwiOlwiw75cIixcIiZ0aG9ybjtcIjpcIsO+XCIsXCImdGlsZGU7XCI6XCLLnFwiLFwiJnRpbWVzXCI6XCLDl1wiLFwiJnRpbWVzO1wiOlwiw5dcIixcIiZ0aW1lc2I7XCI6XCLiiqBcIixcIiZ0aW1lc2JhcjtcIjpcIuKosVwiLFwiJnRpbWVzZDtcIjpcIuKosFwiLFwiJnRpbnQ7XCI6XCLiiK1cIixcIiZ0b2VhO1wiOlwi4qSoXCIsXCImdG9wO1wiOlwi4oqkXCIsXCImdG9wYm90O1wiOlwi4oy2XCIsXCImdG9wY2lyO1wiOlwi4quxXCIsXCImdG9wZjtcIjpcIvCdlaVcIixcIiZ0b3Bmb3JrO1wiOlwi4quaXCIsXCImdG9zYTtcIjpcIuKkqVwiLFwiJnRwcmltZTtcIjpcIuKAtFwiLFwiJnRyYWRlO1wiOlwi4oSiXCIsXCImdHJpYW5nbGU7XCI6XCLilrVcIixcIiZ0cmlhbmdsZWRvd247XCI6XCLilr9cIixcIiZ0cmlhbmdsZWxlZnQ7XCI6XCLil4NcIixcIiZ0cmlhbmdsZWxlZnRlcTtcIjpcIuKKtFwiLFwiJnRyaWFuZ2xlcTtcIjpcIuKJnFwiLFwiJnRyaWFuZ2xlcmlnaHQ7XCI6XCLilrlcIixcIiZ0cmlhbmdsZXJpZ2h0ZXE7XCI6XCLiirVcIixcIiZ0cmlkb3Q7XCI6XCLil6xcIixcIiZ0cmllO1wiOlwi4omcXCIsXCImdHJpbWludXM7XCI6XCLiqLpcIixcIiZ0cmlwbHVzO1wiOlwi4qi5XCIsXCImdHJpc2I7XCI6XCLip41cIixcIiZ0cml0aW1lO1wiOlwi4qi7XCIsXCImdHJwZXppdW07XCI6XCLij6JcIixcIiZ0c2NyO1wiOlwi8J2TiVwiLFwiJnRzY3k7XCI6XCLRhlwiLFwiJnRzaGN5O1wiOlwi0ZtcIixcIiZ0c3Ryb2s7XCI6XCLFp1wiLFwiJnR3aXh0O1wiOlwi4omsXCIsXCImdHdvaGVhZGxlZnRhcnJvdztcIjpcIuKGnlwiLFwiJnR3b2hlYWRyaWdodGFycm93O1wiOlwi4oagXCIsXCImdUFycjtcIjpcIuKHkVwiLFwiJnVIYXI7XCI6XCLipaNcIixcIiZ1YWN1dGVcIjpcIsO6XCIsXCImdWFjdXRlO1wiOlwiw7pcIixcIiZ1YXJyO1wiOlwi4oaRXCIsXCImdWJyY3k7XCI6XCLRnlwiLFwiJnVicmV2ZTtcIjpcIsWtXCIsXCImdWNpcmNcIjpcIsO7XCIsXCImdWNpcmM7XCI6XCLDu1wiLFwiJnVjeTtcIjpcItGDXCIsXCImdWRhcnI7XCI6XCLih4VcIixcIiZ1ZGJsYWM7XCI6XCLFsVwiLFwiJnVkaGFyO1wiOlwi4qWuXCIsXCImdWZpc2h0O1wiOlwi4qW+XCIsXCImdWZyO1wiOlwi8J2UslwiLFwiJnVncmF2ZVwiOlwiw7lcIixcIiZ1Z3JhdmU7XCI6XCLDuVwiLFwiJnVoYXJsO1wiOlwi4oa/XCIsXCImdWhhcnI7XCI6XCLihr5cIixcIiZ1aGJsaztcIjpcIuKWgFwiLFwiJnVsY29ybjtcIjpcIuKMnFwiLFwiJnVsY29ybmVyO1wiOlwi4oycXCIsXCImdWxjcm9wO1wiOlwi4oyPXCIsXCImdWx0cmk7XCI6XCLil7hcIixcIiZ1bWFjcjtcIjpcIsWrXCIsXCImdW1sXCI6XCLCqFwiLFwiJnVtbDtcIjpcIsKoXCIsXCImdW9nb247XCI6XCLFs1wiLFwiJnVvcGY7XCI6XCLwnZWmXCIsXCImdXBhcnJvdztcIjpcIuKGkVwiLFwiJnVwZG93bmFycm93O1wiOlwi4oaVXCIsXCImdXBoYXJwb29ubGVmdDtcIjpcIuKGv1wiLFwiJnVwaGFycG9vbnJpZ2h0O1wiOlwi4oa+XCIsXCImdXBsdXM7XCI6XCLiio5cIixcIiZ1cHNpO1wiOlwiz4VcIixcIiZ1cHNpaDtcIjpcIs+SXCIsXCImdXBzaWxvbjtcIjpcIs+FXCIsXCImdXB1cGFycm93cztcIjpcIuKHiFwiLFwiJnVyY29ybjtcIjpcIuKMnVwiLFwiJnVyY29ybmVyO1wiOlwi4oydXCIsXCImdXJjcm9wO1wiOlwi4oyOXCIsXCImdXJpbmc7XCI6XCLFr1wiLFwiJnVydHJpO1wiOlwi4pe5XCIsXCImdXNjcjtcIjpcIvCdk4pcIixcIiZ1dGRvdDtcIjpcIuKLsFwiLFwiJnV0aWxkZTtcIjpcIsWpXCIsXCImdXRyaTtcIjpcIuKWtVwiLFwiJnV0cmlmO1wiOlwi4pa0XCIsXCImdXVhcnI7XCI6XCLih4hcIixcIiZ1dW1sXCI6XCLDvFwiLFwiJnV1bWw7XCI6XCLDvFwiLFwiJnV3YW5nbGU7XCI6XCLipqdcIixcIiZ2QXJyO1wiOlwi4oeVXCIsXCImdkJhcjtcIjpcIuKrqFwiLFwiJnZCYXJ2O1wiOlwi4qupXCIsXCImdkRhc2g7XCI6XCLiiqhcIixcIiZ2YW5ncnQ7XCI6XCLippxcIixcIiZ2YXJlcHNpbG9uO1wiOlwiz7VcIixcIiZ2YXJrYXBwYTtcIjpcIs+wXCIsXCImdmFybm90aGluZztcIjpcIuKIhVwiLFwiJnZhcnBoaTtcIjpcIs+VXCIsXCImdmFycGk7XCI6XCLPllwiLFwiJnZhcnByb3B0bztcIjpcIuKInVwiLFwiJnZhcnI7XCI6XCLihpVcIixcIiZ2YXJyaG87XCI6XCLPsVwiLFwiJnZhcnNpZ21hO1wiOlwiz4JcIixcIiZ2YXJzdWJzZXRuZXE7XCI6XCLiiorvuIBcIixcIiZ2YXJzdWJzZXRuZXFxO1wiOlwi4quL77iAXCIsXCImdmFyc3Vwc2V0bmVxO1wiOlwi4oqL77iAXCIsXCImdmFyc3Vwc2V0bmVxcTtcIjpcIuKrjO+4gFwiLFwiJnZhcnRoZXRhO1wiOlwiz5FcIixcIiZ2YXJ0cmlhbmdsZWxlZnQ7XCI6XCLiirJcIixcIiZ2YXJ0cmlhbmdsZXJpZ2h0O1wiOlwi4oqzXCIsXCImdmN5O1wiOlwi0LJcIixcIiZ2ZGFzaDtcIjpcIuKKolwiLFwiJnZlZTtcIjpcIuKIqFwiLFwiJnZlZWJhcjtcIjpcIuKKu1wiLFwiJnZlZWVxO1wiOlwi4omaXCIsXCImdmVsbGlwO1wiOlwi4ouuXCIsXCImdmVyYmFyO1wiOlwifFwiLFwiJnZlcnQ7XCI6XCJ8XCIsXCImdmZyO1wiOlwi8J2Us1wiLFwiJnZsdHJpO1wiOlwi4oqyXCIsXCImdm5zdWI7XCI6XCLiioLig5JcIixcIiZ2bnN1cDtcIjpcIuKKg+KDklwiLFwiJnZvcGY7XCI6XCLwnZWnXCIsXCImdnByb3A7XCI6XCLiiJ1cIixcIiZ2cnRyaTtcIjpcIuKKs1wiLFwiJnZzY3I7XCI6XCLwnZOLXCIsXCImdnN1Ym5FO1wiOlwi4quL77iAXCIsXCImdnN1Ym5lO1wiOlwi4oqK77iAXCIsXCImdnN1cG5FO1wiOlwi4quM77iAXCIsXCImdnN1cG5lO1wiOlwi4oqL77iAXCIsXCImdnppZ3phZztcIjpcIuKmmlwiLFwiJndjaXJjO1wiOlwixbVcIixcIiZ3ZWRiYXI7XCI6XCLiqZ9cIixcIiZ3ZWRnZTtcIjpcIuKIp1wiLFwiJndlZGdlcTtcIjpcIuKJmVwiLFwiJndlaWVycDtcIjpcIuKEmFwiLFwiJndmcjtcIjpcIvCdlLRcIixcIiZ3b3BmO1wiOlwi8J2VqFwiLFwiJndwO1wiOlwi4oSYXCIsXCImd3I7XCI6XCLiiYBcIixcIiZ3cmVhdGg7XCI6XCLiiYBcIixcIiZ3c2NyO1wiOlwi8J2TjFwiLFwiJnhjYXA7XCI6XCLii4JcIixcIiZ4Y2lyYztcIjpcIuKXr1wiLFwiJnhjdXA7XCI6XCLii4NcIixcIiZ4ZHRyaTtcIjpcIuKWvVwiLFwiJnhmcjtcIjpcIvCdlLVcIixcIiZ4aEFycjtcIjpcIuKfulwiLFwiJnhoYXJyO1wiOlwi4p+3XCIsXCImeGk7XCI6XCLOvlwiLFwiJnhsQXJyO1wiOlwi4p+4XCIsXCImeGxhcnI7XCI6XCLin7VcIixcIiZ4bWFwO1wiOlwi4p+8XCIsXCImeG5pcztcIjpcIuKLu1wiLFwiJnhvZG90O1wiOlwi4qiAXCIsXCImeG9wZjtcIjpcIvCdlalcIixcIiZ4b3BsdXM7XCI6XCLiqIFcIixcIiZ4b3RpbWU7XCI6XCLiqIJcIixcIiZ4ckFycjtcIjpcIuKfuVwiLFwiJnhyYXJyO1wiOlwi4p+2XCIsXCImeHNjcjtcIjpcIvCdk41cIixcIiZ4c3FjdXA7XCI6XCLiqIZcIixcIiZ4dXBsdXM7XCI6XCLiqIRcIixcIiZ4dXRyaTtcIjpcIuKWs1wiLFwiJnh2ZWU7XCI6XCLii4FcIixcIiZ4d2VkZ2U7XCI6XCLii4BcIixcIiZ5YWN1dGVcIjpcIsO9XCIsXCImeWFjdXRlO1wiOlwiw71cIixcIiZ5YWN5O1wiOlwi0Y9cIixcIiZ5Y2lyYztcIjpcIsW3XCIsXCImeWN5O1wiOlwi0YtcIixcIiZ5ZW5cIjpcIsKlXCIsXCImeWVuO1wiOlwiwqVcIixcIiZ5ZnI7XCI6XCLwnZS2XCIsXCImeWljeTtcIjpcItGXXCIsXCImeW9wZjtcIjpcIvCdlapcIixcIiZ5c2NyO1wiOlwi8J2TjlwiLFwiJnl1Y3k7XCI6XCLRjlwiLFwiJnl1bWxcIjpcIsO/XCIsXCImeXVtbDtcIjpcIsO/XCIsXCImemFjdXRlO1wiOlwixbpcIixcIiZ6Y2Fyb247XCI6XCLFvlwiLFwiJnpjeTtcIjpcItC3XCIsXCImemRvdDtcIjpcIsW8XCIsXCImemVldHJmO1wiOlwi4oSoXCIsXCImemV0YTtcIjpcIs62XCIsXCImemZyO1wiOlwi8J2Ut1wiLFwiJnpoY3k7XCI6XCLQtlwiLFwiJnppZ3JhcnI7XCI6XCLih51cIixcIiZ6b3BmO1wiOlwi8J2Vq1wiLFwiJnpzY3I7XCI6XCLwnZOPXCIsXCImendqO1wiOlwi4oCNXCIsXCImenduajtcIjpcIuKAjFwifSxjaGFyYWN0ZXJzOntcIsOGXCI6XCImQUVsaWc7XCIsXCImXCI6XCImYW1wO1wiLFwiw4FcIjpcIiZBYWN1dGU7XCIsXCLEglwiOlwiJkFicmV2ZTtcIixcIsOCXCI6XCImQWNpcmM7XCIsXCLQkFwiOlwiJkFjeTtcIixcIvCdlIRcIjpcIiZBZnI7XCIsXCLDgFwiOlwiJkFncmF2ZTtcIixcIs6RXCI6XCImQWxwaGE7XCIsXCLEgFwiOlwiJkFtYWNyO1wiLFwi4qmTXCI6XCImQW5kO1wiLFwixIRcIjpcIiZBb2dvbjtcIixcIvCdlLhcIjpcIiZBb3BmO1wiLFwi4oGhXCI6XCImYWY7XCIsXCLDhVwiOlwiJmFuZ3N0O1wiLFwi8J2SnFwiOlwiJkFzY3I7XCIsXCLiiZRcIjpcIiZjb2xvbmVxO1wiLFwiw4NcIjpcIiZBdGlsZGU7XCIsXCLDhFwiOlwiJkF1bWw7XCIsXCLiiJZcIjpcIiZzc2V0bW47XCIsXCLiq6dcIjpcIiZCYXJ2O1wiLFwi4oyGXCI6XCImZG91YmxlYmFyd2VkZ2U7XCIsXCLQkVwiOlwiJkJjeTtcIixcIuKItVwiOlwiJmJlY2F1c2U7XCIsXCLihKxcIjpcIiZiZXJub3U7XCIsXCLOklwiOlwiJkJldGE7XCIsXCLwnZSFXCI6XCImQmZyO1wiLFwi8J2UuVwiOlwiJkJvcGY7XCIsXCLLmFwiOlwiJmJyZXZlO1wiLFwi4omOXCI6XCImYnVtcDtcIixcItCnXCI6XCImQ0hjeTtcIixcIsKpXCI6XCImY29weTtcIixcIsSGXCI6XCImQ2FjdXRlO1wiLFwi4ouSXCI6XCImQ2FwO1wiLFwi4oWFXCI6XCImREQ7XCIsXCLihK1cIjpcIiZDZnI7XCIsXCLEjFwiOlwiJkNjYXJvbjtcIixcIsOHXCI6XCImQ2NlZGlsO1wiLFwixIhcIjpcIiZDY2lyYztcIixcIuKIsFwiOlwiJkNjb25pbnQ7XCIsXCLEilwiOlwiJkNkb3Q7XCIsXCLCuFwiOlwiJmNlZGlsO1wiLFwiwrdcIjpcIiZtaWRkb3Q7XCIsXCLOp1wiOlwiJkNoaTtcIixcIuKKmVwiOlwiJm9kb3Q7XCIsXCLiipZcIjpcIiZvbWludXM7XCIsXCLiipVcIjpcIiZvcGx1cztcIixcIuKKl1wiOlwiJm90aW1lcztcIixcIuKIslwiOlwiJmN3Y29uaW50O1wiLFwi4oCdXCI6XCImcmRxdW9yO1wiLFwi4oCZXCI6XCImcnNxdW9yO1wiLFwi4oi3XCI6XCImUHJvcG9ydGlvbjtcIixcIuKptFwiOlwiJkNvbG9uZTtcIixcIuKJoVwiOlwiJmVxdWl2O1wiLFwi4oivXCI6XCImRG91YmxlQ29udG91ckludGVncmFsO1wiLFwi4oiuXCI6XCImb2ludDtcIixcIuKEglwiOlwiJmNvbXBsZXhlcztcIixcIuKIkFwiOlwiJmNvcHJvZDtcIixcIuKIs1wiOlwiJmF3Y29uaW50O1wiLFwi4qivXCI6XCImQ3Jvc3M7XCIsXCLwnZKeXCI6XCImQ3NjcjtcIixcIuKLk1wiOlwiJkN1cDtcIixcIuKJjVwiOlwiJmFzeW1wZXE7XCIsXCLipJFcIjpcIiZERG90cmFoZDtcIixcItCCXCI6XCImREpjeTtcIixcItCFXCI6XCImRFNjeTtcIixcItCPXCI6XCImRFpjeTtcIixcIuKAoVwiOlwiJmRkYWdnZXI7XCIsXCLihqFcIjpcIiZEYXJyO1wiLFwi4qukXCI6XCImRG91YmxlTGVmdFRlZTtcIixcIsSOXCI6XCImRGNhcm9uO1wiLFwi0JRcIjpcIiZEY3k7XCIsXCLiiIdcIjpcIiZuYWJsYTtcIixcIs6UXCI6XCImRGVsdGE7XCIsXCLwnZSHXCI6XCImRGZyO1wiLFwiwrRcIjpcIiZhY3V0ZTtcIixcIsuZXCI6XCImZG90O1wiLFwiy51cIjpcIiZkYmxhYztcIixcImBcIjpcIiZncmF2ZTtcIixcIsucXCI6XCImdGlsZGU7XCIsXCLii4RcIjpcIiZkaWFtb25kO1wiLFwi4oWGXCI6XCImZGQ7XCIsXCLwnZS7XCI6XCImRG9wZjtcIixcIsKoXCI6XCImdW1sO1wiLFwi4oOcXCI6XCImRG90RG90O1wiLFwi4omQXCI6XCImZXNkb3Q7XCIsXCLih5NcIjpcIiZkQXJyO1wiLFwi4oeQXCI6XCImbEFycjtcIixcIuKHlFwiOlwiJmlmZjtcIixcIuKfuFwiOlwiJnhsQXJyO1wiLFwi4p+6XCI6XCImeGhBcnI7XCIsXCLin7lcIjpcIiZ4ckFycjtcIixcIuKHklwiOlwiJnJBcnI7XCIsXCLiiqhcIjpcIiZ2RGFzaDtcIixcIuKHkVwiOlwiJnVBcnI7XCIsXCLih5VcIjpcIiZ2QXJyO1wiLFwi4oilXCI6XCImc3BhcjtcIixcIuKGk1wiOlwiJmRvd25hcnJvdztcIixcIuKkk1wiOlwiJkRvd25BcnJvd0JhcjtcIixcIuKHtVwiOlwiJmR1YXJyO1wiLFwizJFcIjpcIiZEb3duQnJldmU7XCIsXCLipZBcIjpcIiZEb3duTGVmdFJpZ2h0VmVjdG9yO1wiLFwi4qWeXCI6XCImRG93bkxlZnRUZWVWZWN0b3I7XCIsXCLihr1cIjpcIiZsaGFyZDtcIixcIuKlllwiOlwiJkRvd25MZWZ0VmVjdG9yQmFyO1wiLFwi4qWfXCI6XCImRG93blJpZ2h0VGVlVmVjdG9yO1wiLFwi4oeBXCI6XCImcmlnaHRoYXJwb29uZG93bjtcIixcIuKll1wiOlwiJkRvd25SaWdodFZlY3RvckJhcjtcIixcIuKKpFwiOlwiJnRvcDtcIixcIuKGp1wiOlwiJm1hcHN0b2Rvd247XCIsXCLwnZKfXCI6XCImRHNjcjtcIixcIsSQXCI6XCImRHN0cm9rO1wiLFwixYpcIjpcIiZFTkc7XCIsXCLDkFwiOlwiJkVUSDtcIixcIsOJXCI6XCImRWFjdXRlO1wiLFwixJpcIjpcIiZFY2Fyb247XCIsXCLDilwiOlwiJkVjaXJjO1wiLFwi0K1cIjpcIiZFY3k7XCIsXCLEllwiOlwiJkVkb3Q7XCIsXCLwnZSIXCI6XCImRWZyO1wiLFwiw4hcIjpcIiZFZ3JhdmU7XCIsXCLiiIhcIjpcIiZpc2ludjtcIixcIsSSXCI6XCImRW1hY3I7XCIsXCLil7tcIjpcIiZFbXB0eVNtYWxsU3F1YXJlO1wiLFwi4parXCI6XCImRW1wdHlWZXJ5U21hbGxTcXVhcmU7XCIsXCLEmFwiOlwiJkVvZ29uO1wiLFwi8J2UvFwiOlwiJkVvcGY7XCIsXCLOlVwiOlwiJkVwc2lsb247XCIsXCLiqbVcIjpcIiZFcXVhbDtcIixcIuKJglwiOlwiJmVzaW07XCIsXCLih4xcIjpcIiZybGhhcjtcIixcIuKEsFwiOlwiJmV4cGVjdGF0aW9uO1wiLFwi4qmzXCI6XCImRXNpbTtcIixcIs6XXCI6XCImRXRhO1wiLFwiw4tcIjpcIiZFdW1sO1wiLFwi4oiDXCI6XCImZXhpc3Q7XCIsXCLihYdcIjpcIiZleHBvbmVudGlhbGU7XCIsXCLQpFwiOlwiJkZjeTtcIixcIvCdlIlcIjpcIiZGZnI7XCIsXCLil7xcIjpcIiZGaWxsZWRTbWFsbFNxdWFyZTtcIixcIuKWqlwiOlwiJnNxdWY7XCIsXCLwnZS9XCI6XCImRm9wZjtcIixcIuKIgFwiOlwiJmZvcmFsbDtcIixcIuKEsVwiOlwiJkZzY3I7XCIsXCLQg1wiOlwiJkdKY3k7XCIsXCI+XCI6XCImZ3Q7XCIsXCLOk1wiOlwiJkdhbW1hO1wiLFwiz5xcIjpcIiZHYW1tYWQ7XCIsXCLEnlwiOlwiJkdicmV2ZTtcIixcIsSiXCI6XCImR2NlZGlsO1wiLFwixJxcIjpcIiZHY2lyYztcIixcItCTXCI6XCImR2N5O1wiLFwixKBcIjpcIiZHZG90O1wiLFwi8J2UilwiOlwiJkdmcjtcIixcIuKLmVwiOlwiJmdnZztcIixcIvCdlL5cIjpcIiZHb3BmO1wiLFwi4omlXCI6XCImZ2VxO1wiLFwi4oubXCI6XCImZ3RyZXFsZXNzO1wiLFwi4omnXCI6XCImZ2VxcTtcIixcIuKqolwiOlwiJkdyZWF0ZXJHcmVhdGVyO1wiLFwi4om3XCI6XCImZ3RybGVzcztcIixcIuKpvlwiOlwiJmdlcztcIixcIuKJs1wiOlwiJmd0cnNpbTtcIixcIvCdkqJcIjpcIiZHc2NyO1wiLFwi4omrXCI6XCImZ2c7XCIsXCLQqlwiOlwiJkhBUkRjeTtcIixcIsuHXCI6XCImY2Fyb247XCIsXCJeXCI6XCImSGF0O1wiLFwixKRcIjpcIiZIY2lyYztcIixcIuKEjFwiOlwiJlBvaW5jYXJlcGxhbmU7XCIsXCLihItcIjpcIiZoYW1pbHQ7XCIsXCLihI1cIjpcIiZxdWF0ZXJuaW9ucztcIixcIuKUgFwiOlwiJmJveGg7XCIsXCLEplwiOlwiJkhzdHJvaztcIixcIuKJj1wiOlwiJmJ1bXBlcTtcIixcItCVXCI6XCImSUVjeTtcIixcIsSyXCI6XCImSUpsaWc7XCIsXCLQgVwiOlwiJklPY3k7XCIsXCLDjVwiOlwiJklhY3V0ZTtcIixcIsOOXCI6XCImSWNpcmM7XCIsXCLQmFwiOlwiJkljeTtcIixcIsSwXCI6XCImSWRvdDtcIixcIuKEkVwiOlwiJmltYWdwYXJ0O1wiLFwiw4xcIjpcIiZJZ3JhdmU7XCIsXCLEqlwiOlwiJkltYWNyO1wiLFwi4oWIXCI6XCImaWk7XCIsXCLiiKxcIjpcIiZJbnQ7XCIsXCLiiKtcIjpcIiZpbnQ7XCIsXCLii4JcIjpcIiZ4Y2FwO1wiLFwi4oGjXCI6XCImaWM7XCIsXCLigaJcIjpcIiZpdDtcIixcIsSuXCI6XCImSW9nb247XCIsXCLwnZWAXCI6XCImSW9wZjtcIixcIs6ZXCI6XCImSW90YTtcIixcIuKEkFwiOlwiJmltYWdsaW5lO1wiLFwixKhcIjpcIiZJdGlsZGU7XCIsXCLQhlwiOlwiJkl1a2N5O1wiLFwiw49cIjpcIiZJdW1sO1wiLFwixLRcIjpcIiZKY2lyYztcIixcItCZXCI6XCImSmN5O1wiLFwi8J2UjVwiOlwiJkpmcjtcIixcIvCdlYFcIjpcIiZKb3BmO1wiLFwi8J2SpVwiOlwiJkpzY3I7XCIsXCLQiFwiOlwiJkpzZXJjeTtcIixcItCEXCI6XCImSnVrY3k7XCIsXCLQpVwiOlwiJktIY3k7XCIsXCLQjFwiOlwiJktKY3k7XCIsXCLOmlwiOlwiJkthcHBhO1wiLFwixLZcIjpcIiZLY2VkaWw7XCIsXCLQmlwiOlwiJktjeTtcIixcIvCdlI5cIjpcIiZLZnI7XCIsXCLwnZWCXCI6XCImS29wZjtcIixcIvCdkqZcIjpcIiZLc2NyO1wiLFwi0IlcIjpcIiZMSmN5O1wiLFwiPFwiOlwiJmx0O1wiLFwixLlcIjpcIiZMYWN1dGU7XCIsXCLOm1wiOlwiJkxhbWJkYTtcIixcIuKfqlwiOlwiJkxhbmc7XCIsXCLihJJcIjpcIiZsYWdyYW47XCIsXCLihp5cIjpcIiZ0d29oZWFkbGVmdGFycm93O1wiLFwixL1cIjpcIiZMY2Fyb247XCIsXCLEu1wiOlwiJkxjZWRpbDtcIixcItCbXCI6XCImTGN5O1wiLFwi4p+oXCI6XCImbGFuZ2xlO1wiLFwi4oaQXCI6XCImc2xhcnI7XCIsXCLih6RcIjpcIiZsYXJyYjtcIixcIuKHhlwiOlwiJmxyYXJyO1wiLFwi4oyIXCI6XCImbGNlaWw7XCIsXCLin6ZcIjpcIiZsb2JyaztcIixcIuKloVwiOlwiJkxlZnREb3duVGVlVmVjdG9yO1wiLFwi4oeDXCI6XCImZG93bmhhcnBvb25sZWZ0O1wiLFwi4qWZXCI6XCImTGVmdERvd25WZWN0b3JCYXI7XCIsXCLijIpcIjpcIiZsZmxvb3I7XCIsXCLihpRcIjpcIiZsZWZ0cmlnaHRhcnJvdztcIixcIuKljlwiOlwiJkxlZnRSaWdodFZlY3RvcjtcIixcIuKKo1wiOlwiJmRhc2h2O1wiLFwi4oakXCI6XCImbWFwc3RvbGVmdDtcIixcIuKlmlwiOlwiJkxlZnRUZWVWZWN0b3I7XCIsXCLiirJcIjpcIiZ2bHRyaTtcIixcIuKnj1wiOlwiJkxlZnRUcmlhbmdsZUJhcjtcIixcIuKKtFwiOlwiJnRyaWFuZ2xlbGVmdGVxO1wiLFwi4qWRXCI6XCImTGVmdFVwRG93blZlY3RvcjtcIixcIuKloFwiOlwiJkxlZnRVcFRlZVZlY3RvcjtcIixcIuKGv1wiOlwiJnVwaGFycG9vbmxlZnQ7XCIsXCLipZhcIjpcIiZMZWZ0VXBWZWN0b3JCYXI7XCIsXCLihrxcIjpcIiZsaGFydTtcIixcIuKlklwiOlwiJkxlZnRWZWN0b3JCYXI7XCIsXCLii5pcIjpcIiZsZXNzZXFndHI7XCIsXCLiiaZcIjpcIiZsZXFxO1wiLFwi4om2XCI6XCImbGc7XCIsXCLiqqFcIjpcIiZMZXNzTGVzcztcIixcIuKpvVwiOlwiJmxlcztcIixcIuKJslwiOlwiJmxzaW07XCIsXCLwnZSPXCI6XCImTGZyO1wiLFwi4ouYXCI6XCImTGw7XCIsXCLih5pcIjpcIiZsQWFycjtcIixcIsS/XCI6XCImTG1pZG90O1wiLFwi4p+1XCI6XCImeGxhcnI7XCIsXCLin7dcIjpcIiZ4aGFycjtcIixcIuKftlwiOlwiJnhyYXJyO1wiLFwi8J2Vg1wiOlwiJkxvcGY7XCIsXCLihplcIjpcIiZzd2Fycm93O1wiLFwi4oaYXCI6XCImc2VhcnJvdztcIixcIuKGsFwiOlwiJmxzaDtcIixcIsWBXCI6XCImTHN0cm9rO1wiLFwi4omqXCI6XCImbGw7XCIsXCLipIVcIjpcIiZNYXA7XCIsXCLQnFwiOlwiJk1jeTtcIixcIuKBn1wiOlwiJk1lZGl1bVNwYWNlO1wiLFwi4oSzXCI6XCImcGhtbWF0O1wiLFwi8J2UkFwiOlwiJk1mcjtcIixcIuKIk1wiOlwiJm1wO1wiLFwi8J2VhFwiOlwiJk1vcGY7XCIsXCLOnFwiOlwiJk11O1wiLFwi0IpcIjpcIiZOSmN5O1wiLFwixYNcIjpcIiZOYWN1dGU7XCIsXCLFh1wiOlwiJk5jYXJvbjtcIixcIsWFXCI6XCImTmNlZGlsO1wiLFwi0J1cIjpcIiZOY3k7XCIsXCLigItcIjpcIiZaZXJvV2lkdGhTcGFjZTtcIixcIlxcblwiOlwiJk5ld0xpbmU7XCIsXCLwnZSRXCI6XCImTmZyO1wiLFwi4oGgXCI6XCImTm9CcmVhaztcIixcIsKgXCI6XCImbmJzcDtcIixcIuKElVwiOlwiJm5hdHVyYWxzO1wiLFwi4qusXCI6XCImTm90O1wiLFwi4omiXCI6XCImbmVxdWl2O1wiLFwi4omtXCI6XCImTm90Q3VwQ2FwO1wiLFwi4oimXCI6XCImbnNwYXI7XCIsXCLiiIlcIjpcIiZub3RpbnZhO1wiLFwi4omgXCI6XCImbmU7XCIsXCLiiYLMuFwiOlwiJm5lc2ltO1wiLFwi4oiEXCI6XCImbmV4aXN0cztcIixcIuKJr1wiOlwiJm5ndHI7XCIsXCLiibFcIjpcIiZuZ2VxO1wiLFwi4omnzLhcIjpcIiZuZ2VxcTtcIixcIuKJq8y4XCI6XCImbkd0djtcIixcIuKJuVwiOlwiJm50Z2w7XCIsXCLiqb7MuFwiOlwiJm5nZXM7XCIsXCLiibVcIjpcIiZuZ3NpbTtcIixcIuKJjsy4XCI6XCImbmJ1bXA7XCIsXCLiiY/MuFwiOlwiJm5idW1wZTtcIixcIuKLqlwiOlwiJm50cmlhbmdsZWxlZnQ7XCIsXCLip4/MuFwiOlwiJk5vdExlZnRUcmlhbmdsZUJhcjtcIixcIuKLrFwiOlwiJm50cmlhbmdsZWxlZnRlcTtcIixcIuKJrlwiOlwiJm5sdDtcIixcIuKJsFwiOlwiJm5sZXE7XCIsXCLiibhcIjpcIiZudGxnO1wiLFwi4omqzLhcIjpcIiZuTHR2O1wiLFwi4qm9zLhcIjpcIiZubGVzO1wiLFwi4om0XCI6XCImbmxzaW07XCIsXCLiqqLMuFwiOlwiJk5vdE5lc3RlZEdyZWF0ZXJHcmVhdGVyO1wiLFwi4qqhzLhcIjpcIiZOb3ROZXN0ZWRMZXNzTGVzcztcIixcIuKKgFwiOlwiJm5wcmVjO1wiLFwi4qqvzLhcIjpcIiZucHJlY2VxO1wiLFwi4ougXCI6XCImbnByY3VlO1wiLFwi4oiMXCI6XCImbm90bml2YTtcIixcIuKLq1wiOlwiJm50cmlhbmdsZXJpZ2h0O1wiLFwi4qeQzLhcIjpcIiZOb3RSaWdodFRyaWFuZ2xlQmFyO1wiLFwi4outXCI6XCImbnRyaWFuZ2xlcmlnaHRlcTtcIixcIuKKj8y4XCI6XCImTm90U3F1YXJlU3Vic2V0O1wiLFwi4ouiXCI6XCImbnNxc3ViZTtcIixcIuKKkMy4XCI6XCImTm90U3F1YXJlU3VwZXJzZXQ7XCIsXCLii6NcIjpcIiZuc3FzdXBlO1wiLFwi4oqC4oOSXCI6XCImdm5zdWI7XCIsXCLiiohcIjpcIiZuc3Vic2V0ZXE7XCIsXCLiioFcIjpcIiZuc3VjYztcIixcIuKqsMy4XCI6XCImbnN1Y2NlcTtcIixcIuKLoVwiOlwiJm5zY2N1ZTtcIixcIuKJv8y4XCI6XCImTm90U3VjY2VlZHNUaWxkZTtcIixcIuKKg+KDklwiOlwiJnZuc3VwO1wiLFwi4oqJXCI6XCImbnN1cHNldGVxO1wiLFwi4omBXCI6XCImbnNpbTtcIixcIuKJhFwiOlwiJm5zaW1lcTtcIixcIuKJh1wiOlwiJm5jb25nO1wiLFwi4omJXCI6XCImbmFwcHJveDtcIixcIuKIpFwiOlwiJm5zbWlkO1wiLFwi8J2SqVwiOlwiJk5zY3I7XCIsXCLDkVwiOlwiJk50aWxkZTtcIixcIs6dXCI6XCImTnU7XCIsXCLFklwiOlwiJk9FbGlnO1wiLFwiw5NcIjpcIiZPYWN1dGU7XCIsXCLDlFwiOlwiJk9jaXJjO1wiLFwi0J5cIjpcIiZPY3k7XCIsXCLFkFwiOlwiJk9kYmxhYztcIixcIvCdlJJcIjpcIiZPZnI7XCIsXCLDklwiOlwiJk9ncmF2ZTtcIixcIsWMXCI6XCImT21hY3I7XCIsXCLOqVwiOlwiJm9obTtcIixcIs6fXCI6XCImT21pY3JvbjtcIixcIvCdlYZcIjpcIiZPb3BmO1wiLFwi4oCcXCI6XCImbGRxdW87XCIsXCLigJhcIjpcIiZsc3F1bztcIixcIuKplFwiOlwiJk9yO1wiLFwi8J2SqlwiOlwiJk9zY3I7XCIsXCLDmFwiOlwiJk9zbGFzaDtcIixcIsOVXCI6XCImT3RpbGRlO1wiLFwi4qi3XCI6XCImT3RpbWVzO1wiLFwiw5ZcIjpcIiZPdW1sO1wiLFwi4oC+XCI6XCImb2xpbmU7XCIsXCLij55cIjpcIiZPdmVyQnJhY2U7XCIsXCLijrRcIjpcIiZ0YnJrO1wiLFwi4o+cXCI6XCImT3ZlclBhcmVudGhlc2lzO1wiLFwi4oiCXCI6XCImcGFydDtcIixcItCfXCI6XCImUGN5O1wiLFwi8J2Uk1wiOlwiJlBmcjtcIixcIs6mXCI6XCImUGhpO1wiLFwizqBcIjpcIiZQaTtcIixcIsKxXCI6XCImcG07XCIsXCLihJlcIjpcIiZwcmltZXM7XCIsXCLiqrtcIjpcIiZQcjtcIixcIuKJulwiOlwiJnByZWM7XCIsXCLiqq9cIjpcIiZwcmVjZXE7XCIsXCLiibxcIjpcIiZwcmVjY3VybHllcTtcIixcIuKJvlwiOlwiJnByc2ltO1wiLFwi4oCzXCI6XCImUHJpbWU7XCIsXCLiiI9cIjpcIiZwcm9kO1wiLFwi4oidXCI6XCImdnByb3A7XCIsXCLwnZKrXCI6XCImUHNjcjtcIixcIs6oXCI6XCImUHNpO1wiLCdcIic6XCImcXVvdDtcIixcIvCdlJRcIjpcIiZRZnI7XCIsXCLihJpcIjpcIiZyYXRpb25hbHM7XCIsXCLwnZKsXCI6XCImUXNjcjtcIixcIuKkkFwiOlwiJmRyYmthcm93O1wiLFwiwq5cIjpcIiZyZWc7XCIsXCLFlFwiOlwiJlJhY3V0ZTtcIixcIuKfq1wiOlwiJlJhbmc7XCIsXCLihqBcIjpcIiZ0d29oZWFkcmlnaHRhcnJvdztcIixcIuKkllwiOlwiJlJhcnJ0bDtcIixcIsWYXCI6XCImUmNhcm9uO1wiLFwixZZcIjpcIiZSY2VkaWw7XCIsXCLQoFwiOlwiJlJjeTtcIixcIuKEnFwiOlwiJnJlYWxwYXJ0O1wiLFwi4oiLXCI6XCImbml2O1wiLFwi4oeLXCI6XCImbHJoYXI7XCIsXCLipa9cIjpcIiZkdWhhcjtcIixcIs6hXCI6XCImUmhvO1wiLFwi4p+pXCI6XCImcmFuZ2xlO1wiLFwi4oaSXCI6XCImc3JhcnI7XCIsXCLih6VcIjpcIiZyYXJyYjtcIixcIuKHhFwiOlwiJnJsYXJyO1wiLFwi4oyJXCI6XCImcmNlaWw7XCIsXCLin6dcIjpcIiZyb2JyaztcIixcIuKlnVwiOlwiJlJpZ2h0RG93blRlZVZlY3RvcjtcIixcIuKHglwiOlwiJmRvd25oYXJwb29ucmlnaHQ7XCIsXCLipZVcIjpcIiZSaWdodERvd25WZWN0b3JCYXI7XCIsXCLijItcIjpcIiZyZmxvb3I7XCIsXCLiiqJcIjpcIiZ2ZGFzaDtcIixcIuKGplwiOlwiJm1hcHN0bztcIixcIuKlm1wiOlwiJlJpZ2h0VGVlVmVjdG9yO1wiLFwi4oqzXCI6XCImdnJ0cmk7XCIsXCLip5BcIjpcIiZSaWdodFRyaWFuZ2xlQmFyO1wiLFwi4oq1XCI6XCImdHJpYW5nbGVyaWdodGVxO1wiLFwi4qWPXCI6XCImUmlnaHRVcERvd25WZWN0b3I7XCIsXCLipZxcIjpcIiZSaWdodFVwVGVlVmVjdG9yO1wiLFwi4oa+XCI6XCImdXBoYXJwb29ucmlnaHQ7XCIsXCLipZRcIjpcIiZSaWdodFVwVmVjdG9yQmFyO1wiLFwi4oeAXCI6XCImcmlnaHRoYXJwb29udXA7XCIsXCLipZNcIjpcIiZSaWdodFZlY3RvckJhcjtcIixcIuKEnVwiOlwiJnJlYWxzO1wiLFwi4qWwXCI6XCImUm91bmRJbXBsaWVzO1wiLFwi4oebXCI6XCImckFhcnI7XCIsXCLihJtcIjpcIiZyZWFsaW5lO1wiLFwi4oaxXCI6XCImcnNoO1wiLFwi4qe0XCI6XCImUnVsZURlbGF5ZWQ7XCIsXCLQqVwiOlwiJlNIQ0hjeTtcIixcItCoXCI6XCImU0hjeTtcIixcItCsXCI6XCImU09GVGN5O1wiLFwixZpcIjpcIiZTYWN1dGU7XCIsXCLiqrxcIjpcIiZTYztcIixcIsWgXCI6XCImU2Nhcm9uO1wiLFwixZ5cIjpcIiZTY2VkaWw7XCIsXCLFnFwiOlwiJlNjaXJjO1wiLFwi0KFcIjpcIiZTY3k7XCIsXCLwnZSWXCI6XCImU2ZyO1wiLFwi4oaRXCI6XCImdXBhcnJvdztcIixcIs6jXCI6XCImU2lnbWE7XCIsXCLiiJhcIjpcIiZjb21wZm47XCIsXCLwnZWKXCI6XCImU29wZjtcIixcIuKImlwiOlwiJnJhZGljO1wiLFwi4pahXCI6XCImc3F1YXJlO1wiLFwi4oqTXCI6XCImc3FjYXA7XCIsXCLiio9cIjpcIiZzcXN1YnNldDtcIixcIuKKkVwiOlwiJnNxc3Vic2V0ZXE7XCIsXCLiipBcIjpcIiZzcXN1cHNldDtcIixcIuKKklwiOlwiJnNxc3Vwc2V0ZXE7XCIsXCLiipRcIjpcIiZzcWN1cDtcIixcIvCdkq5cIjpcIiZTc2NyO1wiLFwi4ouGXCI6XCImc3N0YXJmO1wiLFwi4ouQXCI6XCImU3Vic2V0O1wiLFwi4oqGXCI6XCImc3Vic2V0ZXE7XCIsXCLiibtcIjpcIiZzdWNjO1wiLFwi4qqwXCI6XCImc3VjY2VxO1wiLFwi4om9XCI6XCImc3VjY2N1cmx5ZXE7XCIsXCLiib9cIjpcIiZzdWNjc2ltO1wiLFwi4oiRXCI6XCImc3VtO1wiLFwi4ouRXCI6XCImU3Vwc2V0O1wiLFwi4oqDXCI6XCImc3Vwc2V0O1wiLFwi4oqHXCI6XCImc3Vwc2V0ZXE7XCIsXCLDnlwiOlwiJlRIT1JOO1wiLFwi4oSiXCI6XCImdHJhZGU7XCIsXCLQi1wiOlwiJlRTSGN5O1wiLFwi0KZcIjpcIiZUU2N5O1wiLFwiXFx0XCI6XCImVGFiO1wiLFwizqRcIjpcIiZUYXU7XCIsXCLFpFwiOlwiJlRjYXJvbjtcIixcIsWiXCI6XCImVGNlZGlsO1wiLFwi0KJcIjpcIiZUY3k7XCIsXCLwnZSXXCI6XCImVGZyO1wiLFwi4oi0XCI6XCImdGhlcmVmb3JlO1wiLFwizphcIjpcIiZUaGV0YTtcIixcIuKBn+KAilwiOlwiJlRoaWNrU3BhY2U7XCIsXCLigIlcIjpcIiZ0aGluc3A7XCIsXCLiiLxcIjpcIiZ0aGtzaW07XCIsXCLiiYNcIjpcIiZzaW1lcTtcIixcIuKJhVwiOlwiJmNvbmc7XCIsXCLiiYhcIjpcIiZ0aGthcDtcIixcIvCdlYtcIjpcIiZUb3BmO1wiLFwi4oObXCI6XCImdGRvdDtcIixcIvCdkq9cIjpcIiZUc2NyO1wiLFwixaZcIjpcIiZUc3Ryb2s7XCIsXCLDmlwiOlwiJlVhY3V0ZTtcIixcIuKGn1wiOlwiJlVhcnI7XCIsXCLipYlcIjpcIiZVYXJyb2NpcjtcIixcItCOXCI6XCImVWJyY3k7XCIsXCLFrFwiOlwiJlVicmV2ZTtcIixcIsObXCI6XCImVWNpcmM7XCIsXCLQo1wiOlwiJlVjeTtcIixcIsWwXCI6XCImVWRibGFjO1wiLFwi8J2UmFwiOlwiJlVmcjtcIixcIsOZXCI6XCImVWdyYXZlO1wiLFwixapcIjpcIiZVbWFjcjtcIixfOlwiJmxvd2JhcjtcIixcIuKPn1wiOlwiJlVuZGVyQnJhY2U7XCIsXCLijrVcIjpcIiZiYnJrO1wiLFwi4o+dXCI6XCImVW5kZXJQYXJlbnRoZXNpcztcIixcIuKLg1wiOlwiJnhjdXA7XCIsXCLiio5cIjpcIiZ1cGx1cztcIixcIsWyXCI6XCImVW9nb247XCIsXCLwnZWMXCI6XCImVW9wZjtcIixcIuKkklwiOlwiJlVwQXJyb3dCYXI7XCIsXCLih4VcIjpcIiZ1ZGFycjtcIixcIuKGlVwiOlwiJnZhcnI7XCIsXCLipa5cIjpcIiZ1ZGhhcjtcIixcIuKKpVwiOlwiJnBlcnA7XCIsXCLihqVcIjpcIiZtYXBzdG91cDtcIixcIuKGllwiOlwiJm53YXJyb3c7XCIsXCLihpdcIjpcIiZuZWFycm93O1wiLFwiz5JcIjpcIiZ1cHNpaDtcIixcIs6lXCI6XCImVXBzaWxvbjtcIixcIsWuXCI6XCImVXJpbmc7XCIsXCLwnZKwXCI6XCImVXNjcjtcIixcIsWoXCI6XCImVXRpbGRlO1wiLFwiw5xcIjpcIiZVdW1sO1wiLFwi4oqrXCI6XCImVkRhc2g7XCIsXCLiq6tcIjpcIiZWYmFyO1wiLFwi0JJcIjpcIiZWY3k7XCIsXCLiiqlcIjpcIiZWZGFzaDtcIixcIuKrplwiOlwiJlZkYXNobDtcIixcIuKLgVwiOlwiJnh2ZWU7XCIsXCLigJZcIjpcIiZWZXJ0O1wiLFwi4oijXCI6XCImc21pZDtcIixcInxcIjpcIiZ2ZXJ0O1wiLFwi4p2YXCI6XCImVmVydGljYWxTZXBhcmF0b3I7XCIsXCLiiYBcIjpcIiZ3cmVhdGg7XCIsXCLigIpcIjpcIiZoYWlyc3A7XCIsXCLwnZSZXCI6XCImVmZyO1wiLFwi8J2VjVwiOlwiJlZvcGY7XCIsXCLwnZKxXCI6XCImVnNjcjtcIixcIuKKqlwiOlwiJlZ2ZGFzaDtcIixcIsW0XCI6XCImV2NpcmM7XCIsXCLii4BcIjpcIiZ4d2VkZ2U7XCIsXCLwnZSaXCI6XCImV2ZyO1wiLFwi8J2VjlwiOlwiJldvcGY7XCIsXCLwnZKyXCI6XCImV3NjcjtcIixcIvCdlJtcIjpcIiZYZnI7XCIsXCLOnlwiOlwiJlhpO1wiLFwi8J2Vj1wiOlwiJlhvcGY7XCIsXCLwnZKzXCI6XCImWHNjcjtcIixcItCvXCI6XCImWUFjeTtcIixcItCHXCI6XCImWUljeTtcIixcItCuXCI6XCImWVVjeTtcIixcIsOdXCI6XCImWWFjdXRlO1wiLFwixbZcIjpcIiZZY2lyYztcIixcItCrXCI6XCImWWN5O1wiLFwi8J2UnFwiOlwiJllmcjtcIixcIvCdlZBcIjpcIiZZb3BmO1wiLFwi8J2StFwiOlwiJllzY3I7XCIsXCLFuFwiOlwiJll1bWw7XCIsXCLQllwiOlwiJlpIY3k7XCIsXCLFuVwiOlwiJlphY3V0ZTtcIixcIsW9XCI6XCImWmNhcm9uO1wiLFwi0JdcIjpcIiZaY3k7XCIsXCLFu1wiOlwiJlpkb3Q7XCIsXCLOllwiOlwiJlpldGE7XCIsXCLihKhcIjpcIiZ6ZWV0cmY7XCIsXCLihKRcIjpcIiZpbnRlZ2VycztcIixcIvCdkrVcIjpcIiZac2NyO1wiLFwiw6FcIjpcIiZhYWN1dGU7XCIsXCLEg1wiOlwiJmFicmV2ZTtcIixcIuKIvlwiOlwiJm1zdHBvcztcIixcIuKIvsyzXCI6XCImYWNFO1wiLFwi4oi/XCI6XCImYWNkO1wiLFwiw6JcIjpcIiZhY2lyYztcIixcItCwXCI6XCImYWN5O1wiLFwiw6ZcIjpcIiZhZWxpZztcIixcIvCdlJ5cIjpcIiZhZnI7XCIsXCLDoFwiOlwiJmFncmF2ZTtcIixcIuKEtVwiOlwiJmFsZXBoO1wiLFwizrFcIjpcIiZhbHBoYTtcIixcIsSBXCI6XCImYW1hY3I7XCIsXCLiqL9cIjpcIiZhbWFsZztcIixcIuKIp1wiOlwiJndlZGdlO1wiLFwi4qmVXCI6XCImYW5kYW5kO1wiLFwi4qmcXCI6XCImYW5kZDtcIixcIuKpmFwiOlwiJmFuZHNsb3BlO1wiLFwi4qmaXCI6XCImYW5kdjtcIixcIuKIoFwiOlwiJmFuZ2xlO1wiLFwi4qakXCI6XCImYW5nZTtcIixcIuKIoVwiOlwiJm1lYXN1cmVkYW5nbGU7XCIsXCLipqhcIjpcIiZhbmdtc2RhYTtcIixcIuKmqVwiOlwiJmFuZ21zZGFiO1wiLFwi4qaqXCI6XCImYW5nbXNkYWM7XCIsXCLipqtcIjpcIiZhbmdtc2RhZDtcIixcIuKmrFwiOlwiJmFuZ21zZGFlO1wiLFwi4qatXCI6XCImYW5nbXNkYWY7XCIsXCLipq5cIjpcIiZhbmdtc2RhZztcIixcIuKmr1wiOlwiJmFuZ21zZGFoO1wiLFwi4oifXCI6XCImYW5ncnQ7XCIsXCLiir5cIjpcIiZhbmdydHZiO1wiLFwi4qadXCI6XCImYW5ncnR2YmQ7XCIsXCLiiKJcIjpcIiZhbmdzcGg7XCIsXCLijbxcIjpcIiZhbmd6YXJyO1wiLFwixIVcIjpcIiZhb2dvbjtcIixcIvCdlZJcIjpcIiZhb3BmO1wiLFwi4qmwXCI6XCImYXBFO1wiLFwi4qmvXCI6XCImYXBhY2lyO1wiLFwi4omKXCI6XCImYXBwcm94ZXE7XCIsXCLiiYtcIjpcIiZhcGlkO1wiLFwiJ1wiOlwiJmFwb3M7XCIsXCLDpVwiOlwiJmFyaW5nO1wiLFwi8J2StlwiOlwiJmFzY3I7XCIsXCIqXCI6XCImbWlkYXN0O1wiLFwiw6NcIjpcIiZhdGlsZGU7XCIsXCLDpFwiOlwiJmF1bWw7XCIsXCLiqJFcIjpcIiZhd2ludDtcIixcIuKrrVwiOlwiJmJOb3Q7XCIsXCLiiYxcIjpcIiZiY29uZztcIixcIs+2XCI6XCImYmVwc2k7XCIsXCLigLVcIjpcIiZicHJpbWU7XCIsXCLiiL1cIjpcIiZic2ltO1wiLFwi4ouNXCI6XCImYnNpbWU7XCIsXCLiir1cIjpcIiZiYXJ2ZWU7XCIsXCLijIVcIjpcIiZiYXJ3ZWRnZTtcIixcIuKOtlwiOlwiJmJicmt0YnJrO1wiLFwi0LFcIjpcIiZiY3k7XCIsXCLigJ5cIjpcIiZsZHF1b3I7XCIsXCLiprBcIjpcIiZiZW1wdHl2O1wiLFwizrJcIjpcIiZiZXRhO1wiLFwi4oS2XCI6XCImYmV0aDtcIixcIuKJrFwiOlwiJnR3aXh0O1wiLFwi8J2Un1wiOlwiJmJmcjtcIixcIuKXr1wiOlwiJnhjaXJjO1wiLFwi4qiAXCI6XCImeG9kb3Q7XCIsXCLiqIFcIjpcIiZ4b3BsdXM7XCIsXCLiqIJcIjpcIiZ4b3RpbWU7XCIsXCLiqIZcIjpcIiZ4c3FjdXA7XCIsXCLimIVcIjpcIiZzdGFyZjtcIixcIuKWvVwiOlwiJnhkdHJpO1wiLFwi4pazXCI6XCImeHV0cmk7XCIsXCLiqIRcIjpcIiZ4dXBsdXM7XCIsXCLipI1cIjpcIiZyYmFycjtcIixcIuKnq1wiOlwiJmxvemY7XCIsXCLilrRcIjpcIiZ1dHJpZjtcIixcIuKWvlwiOlwiJmR0cmlmO1wiLFwi4peCXCI6XCImbHRyaWY7XCIsXCLilrhcIjpcIiZydHJpZjtcIixcIuKQo1wiOlwiJmJsYW5rO1wiLFwi4paSXCI6XCImYmxrMTI7XCIsXCLilpFcIjpcIiZibGsxNDtcIixcIuKWk1wiOlwiJmJsazM0O1wiLFwi4paIXCI6XCImYmxvY2s7XCIsXCI94oOlXCI6XCImYm5lO1wiLFwi4omh4oOlXCI6XCImYm5lcXVpdjtcIixcIuKMkFwiOlwiJmJub3Q7XCIsXCLwnZWTXCI6XCImYm9wZjtcIixcIuKLiFwiOlwiJmJvd3RpZTtcIixcIuKVl1wiOlwiJmJveERMO1wiLFwi4pWUXCI6XCImYm94RFI7XCIsXCLilZZcIjpcIiZib3hEbDtcIixcIuKVk1wiOlwiJmJveERyO1wiLFwi4pWQXCI6XCImYm94SDtcIixcIuKVplwiOlwiJmJveEhEO1wiLFwi4pWpXCI6XCImYm94SFU7XCIsXCLilaRcIjpcIiZib3hIZDtcIixcIuKVp1wiOlwiJmJveEh1O1wiLFwi4pWdXCI6XCImYm94VUw7XCIsXCLilZpcIjpcIiZib3hVUjtcIixcIuKVnFwiOlwiJmJveFVsO1wiLFwi4pWZXCI6XCImYm94VXI7XCIsXCLilZFcIjpcIiZib3hWO1wiLFwi4pWsXCI6XCImYm94Vkg7XCIsXCLilaNcIjpcIiZib3hWTDtcIixcIuKVoFwiOlwiJmJveFZSO1wiLFwi4pWrXCI6XCImYm94Vmg7XCIsXCLilaJcIjpcIiZib3hWbDtcIixcIuKVn1wiOlwiJmJveFZyO1wiLFwi4qeJXCI6XCImYm94Ym94O1wiLFwi4pWVXCI6XCImYm94ZEw7XCIsXCLilZJcIjpcIiZib3hkUjtcIixcIuKUkFwiOlwiJmJveGRsO1wiLFwi4pSMXCI6XCImYm94ZHI7XCIsXCLilaVcIjpcIiZib3hoRDtcIixcIuKVqFwiOlwiJmJveGhVO1wiLFwi4pSsXCI6XCImYm94aGQ7XCIsXCLilLRcIjpcIiZib3hodTtcIixcIuKKn1wiOlwiJm1pbnVzYjtcIixcIuKKnlwiOlwiJnBsdXNiO1wiLFwi4oqgXCI6XCImdGltZXNiO1wiLFwi4pWbXCI6XCImYm94dUw7XCIsXCLilZhcIjpcIiZib3h1UjtcIixcIuKUmFwiOlwiJmJveHVsO1wiLFwi4pSUXCI6XCImYm94dXI7XCIsXCLilIJcIjpcIiZib3h2O1wiLFwi4pWqXCI6XCImYm94dkg7XCIsXCLilaFcIjpcIiZib3h2TDtcIixcIuKVnlwiOlwiJmJveHZSO1wiLFwi4pS8XCI6XCImYm94dmg7XCIsXCLilKRcIjpcIiZib3h2bDtcIixcIuKUnFwiOlwiJmJveHZyO1wiLFwiwqZcIjpcIiZicnZiYXI7XCIsXCLwnZK3XCI6XCImYnNjcjtcIixcIuKBj1wiOlwiJmJzZW1pO1wiLFwiXFxcXFwiOlwiJmJzb2w7XCIsXCLip4VcIjpcIiZic29sYjtcIixcIuKfiFwiOlwiJmJzb2xoc3ViO1wiLFwi4oCiXCI6XCImYnVsbGV0O1wiLFwi4qquXCI6XCImYnVtcEU7XCIsXCLEh1wiOlwiJmNhY3V0ZTtcIixcIuKIqVwiOlwiJmNhcDtcIixcIuKphFwiOlwiJmNhcGFuZDtcIixcIuKpiVwiOlwiJmNhcGJyY3VwO1wiLFwi4qmLXCI6XCImY2FwY2FwO1wiLFwi4qmHXCI6XCImY2FwY3VwO1wiLFwi4qmAXCI6XCImY2FwZG90O1wiLFwi4oip77iAXCI6XCImY2FwcztcIixcIuKBgVwiOlwiJmNhcmV0O1wiLFwi4qmNXCI6XCImY2NhcHM7XCIsXCLEjVwiOlwiJmNjYXJvbjtcIixcIsOnXCI6XCImY2NlZGlsO1wiLFwixIlcIjpcIiZjY2lyYztcIixcIuKpjFwiOlwiJmNjdXBzO1wiLFwi4qmQXCI6XCImY2N1cHNzbTtcIixcIsSLXCI6XCImY2RvdDtcIixcIuKmslwiOlwiJmNlbXB0eXY7XCIsXCLColwiOlwiJmNlbnQ7XCIsXCLwnZSgXCI6XCImY2ZyO1wiLFwi0YdcIjpcIiZjaGN5O1wiLFwi4pyTXCI6XCImY2hlY2ttYXJrO1wiLFwiz4dcIjpcIiZjaGk7XCIsXCLil4tcIjpcIiZjaXI7XCIsXCLip4NcIjpcIiZjaXJFO1wiLFwiy4ZcIjpcIiZjaXJjO1wiLFwi4omXXCI6XCImY2lyZTtcIixcIuKGulwiOlwiJm9sYXJyO1wiLFwi4oa7XCI6XCImb3JhcnI7XCIsXCLik4hcIjpcIiZvUztcIixcIuKKm1wiOlwiJm9hc3Q7XCIsXCLiippcIjpcIiZvY2lyO1wiLFwi4oqdXCI6XCImb2Rhc2g7XCIsXCLiqJBcIjpcIiZjaXJmbmludDtcIixcIuKrr1wiOlwiJmNpcm1pZDtcIixcIuKnglwiOlwiJmNpcnNjaXI7XCIsXCLimaNcIjpcIiZjbHVic3VpdDtcIixcIjpcIjpcIiZjb2xvbjtcIixcIixcIjpcIiZjb21tYTtcIixcIkBcIjpcIiZjb21tYXQ7XCIsXCLiiIFcIjpcIiZjb21wbGVtZW50O1wiLFwi4qmtXCI6XCImY29uZ2RvdDtcIixcIvCdlZRcIjpcIiZjb3BmO1wiLFwi4oSXXCI6XCImY29weXNyO1wiLFwi4oa1XCI6XCImY3JhcnI7XCIsXCLinJdcIjpcIiZjcm9zcztcIixcIvCdkrhcIjpcIiZjc2NyO1wiLFwi4quPXCI6XCImY3N1YjtcIixcIuKrkVwiOlwiJmNzdWJlO1wiLFwi4quQXCI6XCImY3N1cDtcIixcIuKrklwiOlwiJmNzdXBlO1wiLFwi4ouvXCI6XCImY3Rkb3Q7XCIsXCLipLhcIjpcIiZjdWRhcnJsO1wiLFwi4qS1XCI6XCImY3VkYXJycjtcIixcIuKLnlwiOlwiJmN1cmx5ZXFwcmVjO1wiLFwi4oufXCI6XCImY3VybHllcXN1Y2M7XCIsXCLihrZcIjpcIiZjdXJ2ZWFycm93bGVmdDtcIixcIuKkvVwiOlwiJmN1bGFycnA7XCIsXCLiiKpcIjpcIiZjdXA7XCIsXCLiqYhcIjpcIiZjdXBicmNhcDtcIixcIuKphlwiOlwiJmN1cGNhcDtcIixcIuKpilwiOlwiJmN1cGN1cDtcIixcIuKKjVwiOlwiJmN1cGRvdDtcIixcIuKphVwiOlwiJmN1cG9yO1wiLFwi4oiq77iAXCI6XCImY3VwcztcIixcIuKGt1wiOlwiJmN1cnZlYXJyb3dyaWdodDtcIixcIuKkvFwiOlwiJmN1cmFycm07XCIsXCLii45cIjpcIiZjdXZlZTtcIixcIuKLj1wiOlwiJmN1d2VkO1wiLFwiwqRcIjpcIiZjdXJyZW47XCIsXCLiiLFcIjpcIiZjd2ludDtcIixcIuKMrVwiOlwiJmN5bGN0eTtcIixcIuKlpVwiOlwiJmRIYXI7XCIsXCLigKBcIjpcIiZkYWdnZXI7XCIsXCLihLhcIjpcIiZkYWxldGg7XCIsXCLigJBcIjpcIiZoeXBoZW47XCIsXCLipI9cIjpcIiZyQmFycjtcIixcIsSPXCI6XCImZGNhcm9uO1wiLFwi0LRcIjpcIiZkY3k7XCIsXCLih4pcIjpcIiZkb3duZG93bmFycm93cztcIixcIuKpt1wiOlwiJmVERG90O1wiLFwiwrBcIjpcIiZkZWc7XCIsXCLOtFwiOlwiJmRlbHRhO1wiLFwi4qaxXCI6XCImZGVtcHR5djtcIixcIuKlv1wiOlwiJmRmaXNodDtcIixcIvCdlKFcIjpcIiZkZnI7XCIsXCLimaZcIjpcIiZkaWFtcztcIixcIs+dXCI6XCImZ2FtbWFkO1wiLFwi4ouyXCI6XCImZGlzaW47XCIsXCLDt1wiOlwiJmRpdmlkZTtcIixcIuKLh1wiOlwiJmRpdm9ueDtcIixcItGSXCI6XCImZGpjeTtcIixcIuKMnlwiOlwiJmxsY29ybmVyO1wiLFwi4oyNXCI6XCImZGxjcm9wO1wiLCQ6XCImZG9sbGFyO1wiLFwi8J2VlVwiOlwiJmRvcGY7XCIsXCLiiZFcIjpcIiZlRG90O1wiLFwi4oi4XCI6XCImbWludXNkO1wiLFwi4oiUXCI6XCImcGx1c2RvO1wiLFwi4oqhXCI6XCImc2RvdGI7XCIsXCLijJ9cIjpcIiZscmNvcm5lcjtcIixcIuKMjFwiOlwiJmRyY3JvcDtcIixcIvCdkrlcIjpcIiZkc2NyO1wiLFwi0ZVcIjpcIiZkc2N5O1wiLFwi4qe2XCI6XCImZHNvbDtcIixcIsSRXCI6XCImZHN0cm9rO1wiLFwi4ouxXCI6XCImZHRkb3Q7XCIsXCLilr9cIjpcIiZ0cmlhbmdsZWRvd247XCIsXCLipqZcIjpcIiZkd2FuZ2xlO1wiLFwi0Z9cIjpcIiZkemN5O1wiLFwi4p+/XCI6XCImZHppZ3JhcnI7XCIsXCLDqVwiOlwiJmVhY3V0ZTtcIixcIuKprlwiOlwiJmVhc3RlcjtcIixcIsSbXCI6XCImZWNhcm9uO1wiLFwi4omWXCI6XCImZXFjaXJjO1wiLFwiw6pcIjpcIiZlY2lyYztcIixcIuKJlVwiOlwiJmVxY29sb247XCIsXCLRjVwiOlwiJmVjeTtcIixcIsSXXCI6XCImZWRvdDtcIixcIuKJklwiOlwiJmZhbGxpbmdkb3RzZXE7XCIsXCLwnZSiXCI6XCImZWZyO1wiLFwi4qqaXCI6XCImZWc7XCIsXCLDqFwiOlwiJmVncmF2ZTtcIixcIuKqllwiOlwiJmVxc2xhbnRndHI7XCIsXCLiqphcIjpcIiZlZ3Nkb3Q7XCIsXCLiqplcIjpcIiZlbDtcIixcIuKPp1wiOlwiJmVsaW50ZXJzO1wiLFwi4oSTXCI6XCImZWxsO1wiLFwi4qqVXCI6XCImZXFzbGFudGxlc3M7XCIsXCLiqpdcIjpcIiZlbHNkb3Q7XCIsXCLEk1wiOlwiJmVtYWNyO1wiLFwi4oiFXCI6XCImdmFybm90aGluZztcIixcIuKAhFwiOlwiJmVtc3AxMztcIixcIuKAhVwiOlwiJmVtc3AxNDtcIixcIuKAg1wiOlwiJmVtc3A7XCIsXCLFi1wiOlwiJmVuZztcIixcIuKAglwiOlwiJmVuc3A7XCIsXCLEmVwiOlwiJmVvZ29uO1wiLFwi8J2VllwiOlwiJmVvcGY7XCIsXCLii5VcIjpcIiZlcGFyO1wiLFwi4qejXCI6XCImZXBhcnNsO1wiLFwi4qmxXCI6XCImZXBsdXM7XCIsXCLOtVwiOlwiJmVwc2lsb247XCIsXCLPtVwiOlwiJnZhcmVwc2lsb247XCIsXCI9XCI6XCImZXF1YWxzO1wiLFwi4omfXCI6XCImcXVlc3RlcTtcIixcIuKpuFwiOlwiJmVxdWl2REQ7XCIsXCLip6VcIjpcIiZlcXZwYXJzbDtcIixcIuKJk1wiOlwiJnJpc2luZ2RvdHNlcTtcIixcIuKlsVwiOlwiJmVyYXJyO1wiLFwi4oSvXCI6XCImZXNjcjtcIixcIs63XCI6XCImZXRhO1wiLFwiw7BcIjpcIiZldGg7XCIsXCLDq1wiOlwiJmV1bWw7XCIsXCLigqxcIjpcIiZldXJvO1wiLFwiIVwiOlwiJmV4Y2w7XCIsXCLRhFwiOlwiJmZjeTtcIixcIuKZgFwiOlwiJmZlbWFsZTtcIixcIu+sg1wiOlwiJmZmaWxpZztcIixcIu+sgFwiOlwiJmZmbGlnO1wiLFwi76yEXCI6XCImZmZsbGlnO1wiLFwi8J2Uo1wiOlwiJmZmcjtcIixcIu+sgVwiOlwiJmZpbGlnO1wiLGZqOlwiJmZqbGlnO1wiLFwi4pmtXCI6XCImZmxhdDtcIixcIu+sglwiOlwiJmZsbGlnO1wiLFwi4paxXCI6XCImZmx0bnM7XCIsXCLGklwiOlwiJmZub2Y7XCIsXCLwnZWXXCI6XCImZm9wZjtcIixcIuKLlFwiOlwiJnBpdGNoZm9yaztcIixcIuKrmVwiOlwiJmZvcmt2O1wiLFwi4qiNXCI6XCImZnBhcnRpbnQ7XCIsXCLCvVwiOlwiJmhhbGY7XCIsXCLihZNcIjpcIiZmcmFjMTM7XCIsXCLCvFwiOlwiJmZyYWMxNDtcIixcIuKFlVwiOlwiJmZyYWMxNTtcIixcIuKFmVwiOlwiJmZyYWMxNjtcIixcIuKFm1wiOlwiJmZyYWMxODtcIixcIuKFlFwiOlwiJmZyYWMyMztcIixcIuKFllwiOlwiJmZyYWMyNTtcIixcIsK+XCI6XCImZnJhYzM0O1wiLFwi4oWXXCI6XCImZnJhYzM1O1wiLFwi4oWcXCI6XCImZnJhYzM4O1wiLFwi4oWYXCI6XCImZnJhYzQ1O1wiLFwi4oWaXCI6XCImZnJhYzU2O1wiLFwi4oWdXCI6XCImZnJhYzU4O1wiLFwi4oWeXCI6XCImZnJhYzc4O1wiLFwi4oGEXCI6XCImZnJhc2w7XCIsXCLijKJcIjpcIiZzZnJvd247XCIsXCLwnZK7XCI6XCImZnNjcjtcIixcIuKqjFwiOlwiJmd0cmVxcWxlc3M7XCIsXCLHtVwiOlwiJmdhY3V0ZTtcIixcIs6zXCI6XCImZ2FtbWE7XCIsXCLiqoZcIjpcIiZndHJhcHByb3g7XCIsXCLEn1wiOlwiJmdicmV2ZTtcIixcIsSdXCI6XCImZ2NpcmM7XCIsXCLQs1wiOlwiJmdjeTtcIixcIsShXCI6XCImZ2RvdDtcIixcIuKqqVwiOlwiJmdlc2NjO1wiLFwi4qqAXCI6XCImZ2VzZG90O1wiLFwi4qqCXCI6XCImZ2VzZG90bztcIixcIuKqhFwiOlwiJmdlc2RvdG9sO1wiLFwi4oub77iAXCI6XCImZ2VzbDtcIixcIuKqlFwiOlwiJmdlc2xlcztcIixcIvCdlKRcIjpcIiZnZnI7XCIsXCLihLdcIjpcIiZnaW1lbDtcIixcItGTXCI6XCImZ2pjeTtcIixcIuKqklwiOlwiJmdsRTtcIixcIuKqpVwiOlwiJmdsYTtcIixcIuKqpFwiOlwiJmdsajtcIixcIuKJqVwiOlwiJmduZXFxO1wiLFwi4qqKXCI6XCImZ25hcHByb3g7XCIsXCLiqohcIjpcIiZnbmVxO1wiLFwi4ounXCI6XCImZ25zaW07XCIsXCLwnZWYXCI6XCImZ29wZjtcIixcIuKEilwiOlwiJmdzY3I7XCIsXCLiqo5cIjpcIiZnc2ltZTtcIixcIuKqkFwiOlwiJmdzaW1sO1wiLFwi4qqnXCI6XCImZ3RjYztcIixcIuKpulwiOlwiJmd0Y2lyO1wiLFwi4ouXXCI6XCImZ3RyZG90O1wiLFwi4qaVXCI6XCImZ3RsUGFyO1wiLFwi4qm8XCI6XCImZ3RxdWVzdDtcIixcIuKluFwiOlwiJmd0cmFycjtcIixcIuKJqe+4gFwiOlwiJmd2bkU7XCIsXCLRilwiOlwiJmhhcmRjeTtcIixcIuKliFwiOlwiJmhhcnJjaXI7XCIsXCLihq1cIjpcIiZsZWZ0cmlnaHRzcXVpZ2Fycm93O1wiLFwi4oSPXCI6XCImcGxhbmt2O1wiLFwixKVcIjpcIiZoY2lyYztcIixcIuKZpVwiOlwiJmhlYXJ0c3VpdDtcIixcIuKAplwiOlwiJm1sZHI7XCIsXCLiirlcIjpcIiZoZXJjb247XCIsXCLwnZSlXCI6XCImaGZyO1wiLFwi4qSlXCI6XCImc2VhcmhrO1wiLFwi4qSmXCI6XCImc3dhcmhrO1wiLFwi4oe/XCI6XCImaG9hcnI7XCIsXCLiiLtcIjpcIiZob210aHQ7XCIsXCLihqlcIjpcIiZsYXJyaGs7XCIsXCLihqpcIjpcIiZyYXJyaGs7XCIsXCLwnZWZXCI6XCImaG9wZjtcIixcIuKAlVwiOlwiJmhvcmJhcjtcIixcIvCdkr1cIjpcIiZoc2NyO1wiLFwixKdcIjpcIiZoc3Ryb2s7XCIsXCLigYNcIjpcIiZoeWJ1bGw7XCIsXCLDrVwiOlwiJmlhY3V0ZTtcIixcIsOuXCI6XCImaWNpcmM7XCIsXCLQuFwiOlwiJmljeTtcIixcItC1XCI6XCImaWVjeTtcIixcIsKhXCI6XCImaWV4Y2w7XCIsXCLwnZSmXCI6XCImaWZyO1wiLFwiw6xcIjpcIiZpZ3JhdmU7XCIsXCLiqIxcIjpcIiZxaW50O1wiLFwi4oitXCI6XCImdGludDtcIixcIuKnnFwiOlwiJmlpbmZpbjtcIixcIuKEqVwiOlwiJmlpb3RhO1wiLFwixLNcIjpcIiZpamxpZztcIixcIsSrXCI6XCImaW1hY3I7XCIsXCLEsVwiOlwiJmlub2RvdDtcIixcIuKKt1wiOlwiJmltb2Y7XCIsXCLGtVwiOlwiJmltcGVkO1wiLFwi4oSFXCI6XCImaW5jYXJlO1wiLFwi4oieXCI6XCImaW5maW47XCIsXCLip51cIjpcIiZpbmZpbnRpZTtcIixcIuKKulwiOlwiJmludGVyY2FsO1wiLFwi4qiXXCI6XCImaW50bGFyaGs7XCIsXCLiqLxcIjpcIiZpcHJvZDtcIixcItGRXCI6XCImaW9jeTtcIixcIsSvXCI6XCImaW9nb247XCIsXCLwnZWaXCI6XCImaW9wZjtcIixcIs65XCI6XCImaW90YTtcIixcIsK/XCI6XCImaXF1ZXN0O1wiLFwi8J2SvlwiOlwiJmlzY3I7XCIsXCLii7lcIjpcIiZpc2luRTtcIixcIuKLtVwiOlwiJmlzaW5kb3Q7XCIsXCLii7RcIjpcIiZpc2lucztcIixcIuKLs1wiOlwiJmlzaW5zdjtcIixcIsSpXCI6XCImaXRpbGRlO1wiLFwi0ZZcIjpcIiZpdWtjeTtcIixcIsOvXCI6XCImaXVtbDtcIixcIsS1XCI6XCImamNpcmM7XCIsXCLQuVwiOlwiJmpjeTtcIixcIvCdlKdcIjpcIiZqZnI7XCIsXCLIt1wiOlwiJmptYXRoO1wiLFwi8J2Vm1wiOlwiJmpvcGY7XCIsXCLwnZK/XCI6XCImanNjcjtcIixcItGYXCI6XCImanNlcmN5O1wiLFwi0ZRcIjpcIiZqdWtjeTtcIixcIs66XCI6XCIma2FwcGE7XCIsXCLPsFwiOlwiJnZhcmthcHBhO1wiLFwixLdcIjpcIiZrY2VkaWw7XCIsXCLQulwiOlwiJmtjeTtcIixcIvCdlKhcIjpcIiZrZnI7XCIsXCLEuFwiOlwiJmtncmVlbjtcIixcItGFXCI6XCIma2hjeTtcIixcItGcXCI6XCIma2pjeTtcIixcIvCdlZxcIjpcIiZrb3BmO1wiLFwi8J2TgFwiOlwiJmtzY3I7XCIsXCLipJtcIjpcIiZsQXRhaWw7XCIsXCLipI5cIjpcIiZsQmFycjtcIixcIuKqi1wiOlwiJmxlc3NlcXFndHI7XCIsXCLipaJcIjpcIiZsSGFyO1wiLFwixLpcIjpcIiZsYWN1dGU7XCIsXCLiprRcIjpcIiZsYWVtcHR5djtcIixcIs67XCI6XCImbGFtYmRhO1wiLFwi4qaRXCI6XCImbGFuZ2Q7XCIsXCLiqoVcIjpcIiZsZXNzYXBwcm94O1wiLFwiwqtcIjpcIiZsYXF1bztcIixcIuKkn1wiOlwiJmxhcnJiZnM7XCIsXCLipJ1cIjpcIiZsYXJyZnM7XCIsXCLihqtcIjpcIiZsb29wYXJyb3dsZWZ0O1wiLFwi4qS5XCI6XCImbGFycnBsO1wiLFwi4qWzXCI6XCImbGFycnNpbTtcIixcIuKGolwiOlwiJmxlZnRhcnJvd3RhaWw7XCIsXCLiqqtcIjpcIiZsYXQ7XCIsXCLipJlcIjpcIiZsYXRhaWw7XCIsXCLiqq1cIjpcIiZsYXRlO1wiLFwi4qqt77iAXCI6XCImbGF0ZXM7XCIsXCLipIxcIjpcIiZsYmFycjtcIixcIuKdslwiOlwiJmxiYnJrO1wiLFwie1wiOlwiJmxjdWI7XCIsXCJbXCI6XCImbHNxYjtcIixcIuKmi1wiOlwiJmxicmtlO1wiLFwi4qaPXCI6XCImbGJya3NsZDtcIixcIuKmjVwiOlwiJmxicmtzbHU7XCIsXCLEvlwiOlwiJmxjYXJvbjtcIixcIsS8XCI6XCImbGNlZGlsO1wiLFwi0LtcIjpcIiZsY3k7XCIsXCLipLZcIjpcIiZsZGNhO1wiLFwi4qWnXCI6XCImbGRyZGhhcjtcIixcIuKli1wiOlwiJmxkcnVzaGFyO1wiLFwi4oayXCI6XCImbGRzaDtcIixcIuKJpFwiOlwiJmxlcTtcIixcIuKHh1wiOlwiJmxsYXJyO1wiLFwi4ouLXCI6XCImbHRocmVlO1wiLFwi4qqoXCI6XCImbGVzY2M7XCIsXCLiqb9cIjpcIiZsZXNkb3Q7XCIsXCLiqoFcIjpcIiZsZXNkb3RvO1wiLFwi4qqDXCI6XCImbGVzZG90b3I7XCIsXCLii5rvuIBcIjpcIiZsZXNnO1wiLFwi4qqTXCI6XCImbGVzZ2VzO1wiLFwi4ouWXCI6XCImbHRkb3Q7XCIsXCLipbxcIjpcIiZsZmlzaHQ7XCIsXCLwnZSpXCI6XCImbGZyO1wiLFwi4qqRXCI6XCImbGdFO1wiLFwi4qWqXCI6XCImbGhhcnVsO1wiLFwi4paEXCI6XCImbGhibGs7XCIsXCLRmVwiOlwiJmxqY3k7XCIsXCLipatcIjpcIiZsbGhhcmQ7XCIsXCLil7pcIjpcIiZsbHRyaTtcIixcIsWAXCI6XCImbG1pZG90O1wiLFwi4o6wXCI6XCImbG1vdXN0YWNoZTtcIixcIuKJqFwiOlwiJmxuZXFxO1wiLFwi4qqJXCI6XCImbG5hcHByb3g7XCIsXCLiqodcIjpcIiZsbmVxO1wiLFwi4oumXCI6XCImbG5zaW07XCIsXCLin6xcIjpcIiZsb2FuZztcIixcIuKHvVwiOlwiJmxvYXJyO1wiLFwi4p+8XCI6XCImeG1hcDtcIixcIuKGrFwiOlwiJnJhcnJscDtcIixcIuKmhVwiOlwiJmxvcGFyO1wiLFwi8J2VnVwiOlwiJmxvcGY7XCIsXCLiqK1cIjpcIiZsb3BsdXM7XCIsXCLiqLRcIjpcIiZsb3RpbWVzO1wiLFwi4oiXXCI6XCImbG93YXN0O1wiLFwi4peKXCI6XCImbG96ZW5nZTtcIixcIihcIjpcIiZscGFyO1wiLFwi4qaTXCI6XCImbHBhcmx0O1wiLFwi4qWtXCI6XCImbHJoYXJkO1wiLFwi4oCOXCI6XCImbHJtO1wiLFwi4oq/XCI6XCImbHJ0cmk7XCIsXCLigLlcIjpcIiZsc2FxdW87XCIsXCLwnZOBXCI6XCImbHNjcjtcIixcIuKqjVwiOlwiJmxzaW1lO1wiLFwi4qqPXCI6XCImbHNpbWc7XCIsXCLigJpcIjpcIiZzYnF1bztcIixcIsWCXCI6XCImbHN0cm9rO1wiLFwi4qqmXCI6XCImbHRjYztcIixcIuKpuVwiOlwiJmx0Y2lyO1wiLFwi4ouJXCI6XCImbHRpbWVzO1wiLFwi4qW2XCI6XCImbHRsYXJyO1wiLFwi4qm7XCI6XCImbHRxdWVzdDtcIixcIuKmllwiOlwiJmx0clBhcjtcIixcIuKXg1wiOlwiJnRyaWFuZ2xlbGVmdDtcIixcIuKlilwiOlwiJmx1cmRzaGFyO1wiLFwi4qWmXCI6XCImbHVydWhhcjtcIixcIuKJqO+4gFwiOlwiJmx2bkU7XCIsXCLiiLpcIjpcIiZtRERvdDtcIixcIsKvXCI6XCImc3RybnM7XCIsXCLimYJcIjpcIiZtYWxlO1wiLFwi4pygXCI6XCImbWFsdGVzZTtcIixcIuKWrlwiOlwiJm1hcmtlcjtcIixcIuKoqVwiOlwiJm1jb21tYTtcIixcItC8XCI6XCImbWN5O1wiLFwi4oCUXCI6XCImbWRhc2g7XCIsXCLwnZSqXCI6XCImbWZyO1wiLFwi4oSnXCI6XCImbWhvO1wiLFwiwrVcIjpcIiZtaWNybztcIixcIuKrsFwiOlwiJm1pZGNpcjtcIixcIuKIklwiOlwiJm1pbnVzO1wiLFwi4qiqXCI6XCImbWludXNkdTtcIixcIuKrm1wiOlwiJm1sY3A7XCIsXCLiiqdcIjpcIiZtb2RlbHM7XCIsXCLwnZWeXCI6XCImbW9wZjtcIixcIvCdk4JcIjpcIiZtc2NyO1wiLFwizrxcIjpcIiZtdTtcIixcIuKKuFwiOlwiJm11bWFwO1wiLFwi4ouZzLhcIjpcIiZuR2c7XCIsXCLiiavig5JcIjpcIiZuR3Q7XCIsXCLih41cIjpcIiZubEFycjtcIixcIuKHjlwiOlwiJm5oQXJyO1wiLFwi4ouYzLhcIjpcIiZuTGw7XCIsXCLiiarig5JcIjpcIiZuTHQ7XCIsXCLih49cIjpcIiZuckFycjtcIixcIuKKr1wiOlwiJm5WRGFzaDtcIixcIuKKrlwiOlwiJm5WZGFzaDtcIixcIsWEXCI6XCImbmFjdXRlO1wiLFwi4oig4oOSXCI6XCImbmFuZztcIixcIuKpsMy4XCI6XCImbmFwRTtcIixcIuKJi8y4XCI6XCImbmFwaWQ7XCIsXCLFiVwiOlwiJm5hcG9zO1wiLFwi4pmuXCI6XCImbmF0dXJhbDtcIixcIuKpg1wiOlwiJm5jYXA7XCIsXCLFiFwiOlwiJm5jYXJvbjtcIixcIsWGXCI6XCImbmNlZGlsO1wiLFwi4qmtzLhcIjpcIiZuY29uZ2RvdDtcIixcIuKpglwiOlwiJm5jdXA7XCIsXCLQvVwiOlwiJm5jeTtcIixcIuKAk1wiOlwiJm5kYXNoO1wiLFwi4oeXXCI6XCImbmVBcnI7XCIsXCLipKRcIjpcIiZuZWFyaGs7XCIsXCLiiZDMuFwiOlwiJm5lZG90O1wiLFwi4qSoXCI6XCImdG9lYTtcIixcIvCdlKtcIjpcIiZuZnI7XCIsXCLihq5cIjpcIiZubGVmdHJpZ2h0YXJyb3c7XCIsXCLiq7JcIjpcIiZuaHBhcjtcIixcIuKLvFwiOlwiJm5pcztcIixcIuKLulwiOlwiJm5pc2Q7XCIsXCLRmlwiOlwiJm5qY3k7XCIsXCLiiabMuFwiOlwiJm5sZXFxO1wiLFwi4oaaXCI6XCImbmxlZnRhcnJvdztcIixcIuKApVwiOlwiJm5sZHI7XCIsXCLwnZWfXCI6XCImbm9wZjtcIixcIsKsXCI6XCImbm90O1wiLFwi4ou5zLhcIjpcIiZub3RpbkU7XCIsXCLii7XMuFwiOlwiJm5vdGluZG90O1wiLFwi4ou3XCI6XCImbm90aW52YjtcIixcIuKLtlwiOlwiJm5vdGludmM7XCIsXCLii75cIjpcIiZub3RuaXZiO1wiLFwi4ou9XCI6XCImbm90bml2YztcIixcIuKrveKDpVwiOlwiJm5wYXJzbDtcIixcIuKIgsy4XCI6XCImbnBhcnQ7XCIsXCLiqJRcIjpcIiZucG9saW50O1wiLFwi4oabXCI6XCImbnJpZ2h0YXJyb3c7XCIsXCLipLPMuFwiOlwiJm5yYXJyYztcIixcIuKGncy4XCI6XCImbnJhcnJ3O1wiLFwi8J2Tg1wiOlwiJm5zY3I7XCIsXCLiioRcIjpcIiZuc3ViO1wiLFwi4quFzLhcIjpcIiZuc3Vic2V0ZXFxO1wiLFwi4oqFXCI6XCImbnN1cDtcIixcIuKrhsy4XCI6XCImbnN1cHNldGVxcTtcIixcIsOxXCI6XCImbnRpbGRlO1wiLFwizr1cIjpcIiZudTtcIixcIiNcIjpcIiZudW07XCIsXCLihJZcIjpcIiZudW1lcm87XCIsXCLigIdcIjpcIiZudW1zcDtcIixcIuKKrVwiOlwiJm52RGFzaDtcIixcIuKkhFwiOlwiJm52SGFycjtcIixcIuKJjeKDklwiOlwiJm52YXA7XCIsXCLiiqxcIjpcIiZudmRhc2g7XCIsXCLiiaXig5JcIjpcIiZudmdlO1wiLFwiPuKDklwiOlwiJm52Z3Q7XCIsXCLip55cIjpcIiZudmluZmluO1wiLFwi4qSCXCI6XCImbnZsQXJyO1wiLFwi4omk4oOSXCI6XCImbnZsZTtcIixcIjzig5JcIjpcIiZudmx0O1wiLFwi4oq04oOSXCI6XCImbnZsdHJpZTtcIixcIuKkg1wiOlwiJm52ckFycjtcIixcIuKKteKDklwiOlwiJm52cnRyaWU7XCIsXCLiiLzig5JcIjpcIiZudnNpbTtcIixcIuKHllwiOlwiJm53QXJyO1wiLFwi4qSjXCI6XCImbndhcmhrO1wiLFwi4qSnXCI6XCImbnduZWFyO1wiLFwiw7NcIjpcIiZvYWN1dGU7XCIsXCLDtFwiOlwiJm9jaXJjO1wiLFwi0L5cIjpcIiZvY3k7XCIsXCLFkVwiOlwiJm9kYmxhYztcIixcIuKouFwiOlwiJm9kaXY7XCIsXCLiprxcIjpcIiZvZHNvbGQ7XCIsXCLFk1wiOlwiJm9lbGlnO1wiLFwi4qa/XCI6XCImb2ZjaXI7XCIsXCLwnZSsXCI6XCImb2ZyO1wiLFwiy5tcIjpcIiZvZ29uO1wiLFwiw7JcIjpcIiZvZ3JhdmU7XCIsXCLip4FcIjpcIiZvZ3Q7XCIsXCLiprVcIjpcIiZvaGJhcjtcIixcIuKmvlwiOlwiJm9sY2lyO1wiLFwi4qa7XCI6XCImb2xjcm9zcztcIixcIuKngFwiOlwiJm9sdDtcIixcIsWNXCI6XCImb21hY3I7XCIsXCLPiVwiOlwiJm9tZWdhO1wiLFwizr9cIjpcIiZvbWljcm9uO1wiLFwi4qa2XCI6XCImb21pZDtcIixcIvCdlaBcIjpcIiZvb3BmO1wiLFwi4qa3XCI6XCImb3BhcjtcIixcIuKmuVwiOlwiJm9wZXJwO1wiLFwi4oioXCI6XCImdmVlO1wiLFwi4qmdXCI6XCImb3JkO1wiLFwi4oS0XCI6XCImb3NjcjtcIixcIsKqXCI6XCImb3JkZjtcIixcIsK6XCI6XCImb3JkbTtcIixcIuKKtlwiOlwiJm9yaWdvZjtcIixcIuKpllwiOlwiJm9yb3I7XCIsXCLiqZdcIjpcIiZvcnNsb3BlO1wiLFwi4qmbXCI6XCImb3J2O1wiLFwiw7hcIjpcIiZvc2xhc2g7XCIsXCLiiphcIjpcIiZvc29sO1wiLFwiw7VcIjpcIiZvdGlsZGU7XCIsXCLiqLZcIjpcIiZvdGltZXNhcztcIixcIsO2XCI6XCImb3VtbDtcIixcIuKMvVwiOlwiJm92YmFyO1wiLFwiwrZcIjpcIiZwYXJhO1wiLFwi4quzXCI6XCImcGFyc2ltO1wiLFwi4qu9XCI6XCImcGFyc2w7XCIsXCLQv1wiOlwiJnBjeTtcIixcIiVcIjpcIiZwZXJjbnQ7XCIsXCIuXCI6XCImcGVyaW9kO1wiLFwi4oCwXCI6XCImcGVybWlsO1wiLFwi4oCxXCI6XCImcGVydGVuaztcIixcIvCdlK1cIjpcIiZwZnI7XCIsXCLPhlwiOlwiJnBoaTtcIixcIs+VXCI6XCImdmFycGhpO1wiLFwi4piOXCI6XCImcGhvbmU7XCIsXCLPgFwiOlwiJnBpO1wiLFwiz5ZcIjpcIiZ2YXJwaTtcIixcIuKEjlwiOlwiJnBsYW5ja2g7XCIsXCIrXCI6XCImcGx1cztcIixcIuKoo1wiOlwiJnBsdXNhY2lyO1wiLFwi4qiiXCI6XCImcGx1c2NpcjtcIixcIuKopVwiOlwiJnBsdXNkdTtcIixcIuKpslwiOlwiJnBsdXNlO1wiLFwi4qimXCI6XCImcGx1c3NpbTtcIixcIuKop1wiOlwiJnBsdXN0d287XCIsXCLiqJVcIjpcIiZwb2ludGludDtcIixcIvCdlaFcIjpcIiZwb3BmO1wiLFwiwqNcIjpcIiZwb3VuZDtcIixcIuKqs1wiOlwiJnByRTtcIixcIuKqt1wiOlwiJnByZWNhcHByb3g7XCIsXCLiqrlcIjpcIiZwcm5hcDtcIixcIuKqtVwiOlwiJnBybkU7XCIsXCLii6hcIjpcIiZwcm5zaW07XCIsXCLigLJcIjpcIiZwcmltZTtcIixcIuKMrlwiOlwiJnByb2ZhbGFyO1wiLFwi4oySXCI6XCImcHJvZmxpbmU7XCIsXCLijJNcIjpcIiZwcm9mc3VyZjtcIixcIuKKsFwiOlwiJnBydXJlbDtcIixcIvCdk4VcIjpcIiZwc2NyO1wiLFwiz4hcIjpcIiZwc2k7XCIsXCLigIhcIjpcIiZwdW5jc3A7XCIsXCLwnZSuXCI6XCImcWZyO1wiLFwi8J2VolwiOlwiJnFvcGY7XCIsXCLigZdcIjpcIiZxcHJpbWU7XCIsXCLwnZOGXCI6XCImcXNjcjtcIixcIuKollwiOlwiJnF1YXRpbnQ7XCIsXCI/XCI6XCImcXVlc3Q7XCIsXCLipJxcIjpcIiZyQXRhaWw7XCIsXCLipaRcIjpcIiZySGFyO1wiLFwi4oi9zLFcIjpcIiZyYWNlO1wiLFwixZVcIjpcIiZyYWN1dGU7XCIsXCLiprNcIjpcIiZyYWVtcHR5djtcIixcIuKmklwiOlwiJnJhbmdkO1wiLFwi4qalXCI6XCImcmFuZ2U7XCIsXCLCu1wiOlwiJnJhcXVvO1wiLFwi4qW1XCI6XCImcmFycmFwO1wiLFwi4qSgXCI6XCImcmFycmJmcztcIixcIuKks1wiOlwiJnJhcnJjO1wiLFwi4qSeXCI6XCImcmFycmZzO1wiLFwi4qWFXCI6XCImcmFycnBsO1wiLFwi4qW0XCI6XCImcmFycnNpbTtcIixcIuKGo1wiOlwiJnJpZ2h0YXJyb3d0YWlsO1wiLFwi4oadXCI6XCImcmlnaHRzcXVpZ2Fycm93O1wiLFwi4qSaXCI6XCImcmF0YWlsO1wiLFwi4oi2XCI6XCImcmF0aW87XCIsXCLinbNcIjpcIiZyYmJyaztcIixcIn1cIjpcIiZyY3ViO1wiLFwiXVwiOlwiJnJzcWI7XCIsXCLipoxcIjpcIiZyYnJrZTtcIixcIuKmjlwiOlwiJnJicmtzbGQ7XCIsXCLippBcIjpcIiZyYnJrc2x1O1wiLFwixZlcIjpcIiZyY2Fyb247XCIsXCLFl1wiOlwiJnJjZWRpbDtcIixcItGAXCI6XCImcmN5O1wiLFwi4qS3XCI6XCImcmRjYTtcIixcIuKlqVwiOlwiJnJkbGRoYXI7XCIsXCLihrNcIjpcIiZyZHNoO1wiLFwi4patXCI6XCImcmVjdDtcIixcIuKlvVwiOlwiJnJmaXNodDtcIixcIvCdlK9cIjpcIiZyZnI7XCIsXCLipaxcIjpcIiZyaGFydWw7XCIsXCLPgVwiOlwiJnJobztcIixcIs+xXCI6XCImdmFycmhvO1wiLFwi4oeJXCI6XCImcnJhcnI7XCIsXCLii4xcIjpcIiZydGhyZWU7XCIsXCLLmlwiOlwiJnJpbmc7XCIsXCLigI9cIjpcIiZybG07XCIsXCLijrFcIjpcIiZybW91c3RhY2hlO1wiLFwi4quuXCI6XCImcm5taWQ7XCIsXCLin61cIjpcIiZyb2FuZztcIixcIuKHvlwiOlwiJnJvYXJyO1wiLFwi4qaGXCI6XCImcm9wYXI7XCIsXCLwnZWjXCI6XCImcm9wZjtcIixcIuKorlwiOlwiJnJvcGx1cztcIixcIuKotVwiOlwiJnJvdGltZXM7XCIsXCIpXCI6XCImcnBhcjtcIixcIuKmlFwiOlwiJnJwYXJndDtcIixcIuKoklwiOlwiJnJwcG9saW50O1wiLFwi4oC6XCI6XCImcnNhcXVvO1wiLFwi8J2Th1wiOlwiJnJzY3I7XCIsXCLii4pcIjpcIiZydGltZXM7XCIsXCLilrlcIjpcIiZ0cmlhbmdsZXJpZ2h0O1wiLFwi4qeOXCI6XCImcnRyaWx0cmk7XCIsXCLipahcIjpcIiZydWx1aGFyO1wiLFwi4oSeXCI6XCImcng7XCIsXCLFm1wiOlwiJnNhY3V0ZTtcIixcIuKqtFwiOlwiJnNjRTtcIixcIuKquFwiOlwiJnN1Y2NhcHByb3g7XCIsXCLFoVwiOlwiJnNjYXJvbjtcIixcIsWfXCI6XCImc2NlZGlsO1wiLFwixZ1cIjpcIiZzY2lyYztcIixcIuKqtlwiOlwiJnN1Y2NuZXFxO1wiLFwi4qq6XCI6XCImc3VjY25hcHByb3g7XCIsXCLii6lcIjpcIiZzdWNjbnNpbTtcIixcIuKok1wiOlwiJnNjcG9saW50O1wiLFwi0YFcIjpcIiZzY3k7XCIsXCLii4VcIjpcIiZzZG90O1wiLFwi4qmmXCI6XCImc2RvdGU7XCIsXCLih5hcIjpcIiZzZUFycjtcIixcIsKnXCI6XCImc2VjdDtcIixcIjtcIjpcIiZzZW1pO1wiLFwi4qSpXCI6XCImdG9zYTtcIixcIuKctlwiOlwiJnNleHQ7XCIsXCLwnZSwXCI6XCImc2ZyO1wiLFwi4pmvXCI6XCImc2hhcnA7XCIsXCLRiVwiOlwiJnNoY2hjeTtcIixcItGIXCI6XCImc2hjeTtcIixcIsKtXCI6XCImc2h5O1wiLFwiz4NcIjpcIiZzaWdtYTtcIixcIs+CXCI6XCImdmFyc2lnbWE7XCIsXCLiqapcIjpcIiZzaW1kb3Q7XCIsXCLiqp5cIjpcIiZzaW1nO1wiLFwi4qqgXCI6XCImc2ltZ0U7XCIsXCLiqp1cIjpcIiZzaW1sO1wiLFwi4qqfXCI6XCImc2ltbEU7XCIsXCLiiYZcIjpcIiZzaW1uZTtcIixcIuKopFwiOlwiJnNpbXBsdXM7XCIsXCLipbJcIjpcIiZzaW1yYXJyO1wiLFwi4qizXCI6XCImc21hc2hwO1wiLFwi4qekXCI6XCImc21lcGFyc2w7XCIsXCLijKNcIjpcIiZzc21pbGU7XCIsXCLiqqpcIjpcIiZzbXQ7XCIsXCLiqqxcIjpcIiZzbXRlO1wiLFwi4qqs77iAXCI6XCImc210ZXM7XCIsXCLRjFwiOlwiJnNvZnRjeTtcIixcIi9cIjpcIiZzb2w7XCIsXCLip4RcIjpcIiZzb2xiO1wiLFwi4oy/XCI6XCImc29sYmFyO1wiLFwi8J2VpFwiOlwiJnNvcGY7XCIsXCLimaBcIjpcIiZzcGFkZXN1aXQ7XCIsXCLiipPvuIBcIjpcIiZzcWNhcHM7XCIsXCLiipTvuIBcIjpcIiZzcWN1cHM7XCIsXCLwnZOIXCI6XCImc3NjcjtcIixcIuKYhlwiOlwiJnN0YXI7XCIsXCLiioJcIjpcIiZzdWJzZXQ7XCIsXCLiq4VcIjpcIiZzdWJzZXRlcXE7XCIsXCLiqr1cIjpcIiZzdWJkb3Q7XCIsXCLiq4NcIjpcIiZzdWJlZG90O1wiLFwi4quBXCI6XCImc3VibXVsdDtcIixcIuKri1wiOlwiJnN1YnNldG5lcXE7XCIsXCLiiopcIjpcIiZzdWJzZXRuZXE7XCIsXCLiqr9cIjpcIiZzdWJwbHVzO1wiLFwi4qW5XCI6XCImc3VicmFycjtcIixcIuKrh1wiOlwiJnN1YnNpbTtcIixcIuKrlVwiOlwiJnN1YnN1YjtcIixcIuKrk1wiOlwiJnN1YnN1cDtcIixcIuKZqlwiOlwiJnN1bmc7XCIsXCLCuVwiOlwiJnN1cDE7XCIsXCLCslwiOlwiJnN1cDI7XCIsXCLCs1wiOlwiJnN1cDM7XCIsXCLiq4ZcIjpcIiZzdXBzZXRlcXE7XCIsXCLiqr5cIjpcIiZzdXBkb3Q7XCIsXCLiq5hcIjpcIiZzdXBkc3ViO1wiLFwi4quEXCI6XCImc3VwZWRvdDtcIixcIuKfiVwiOlwiJnN1cGhzb2w7XCIsXCLiq5dcIjpcIiZzdXBoc3ViO1wiLFwi4qW7XCI6XCImc3VwbGFycjtcIixcIuKrglwiOlwiJnN1cG11bHQ7XCIsXCLiq4xcIjpcIiZzdXBzZXRuZXFxO1wiLFwi4oqLXCI6XCImc3Vwc2V0bmVxO1wiLFwi4quAXCI6XCImc3VwcGx1cztcIixcIuKriFwiOlwiJnN1cHNpbTtcIixcIuKrlFwiOlwiJnN1cHN1YjtcIixcIuKrllwiOlwiJnN1cHN1cDtcIixcIuKHmVwiOlwiJnN3QXJyO1wiLFwi4qSqXCI6XCImc3dud2FyO1wiLFwiw59cIjpcIiZzemxpZztcIixcIuKMllwiOlwiJnRhcmdldDtcIixcIs+EXCI6XCImdGF1O1wiLFwixaVcIjpcIiZ0Y2Fyb247XCIsXCLFo1wiOlwiJnRjZWRpbDtcIixcItGCXCI6XCImdGN5O1wiLFwi4oyVXCI6XCImdGVscmVjO1wiLFwi8J2UsVwiOlwiJnRmcjtcIixcIs64XCI6XCImdGhldGE7XCIsXCLPkVwiOlwiJnZhcnRoZXRhO1wiLFwiw75cIjpcIiZ0aG9ybjtcIixcIsOXXCI6XCImdGltZXM7XCIsXCLiqLFcIjpcIiZ0aW1lc2JhcjtcIixcIuKosFwiOlwiJnRpbWVzZDtcIixcIuKMtlwiOlwiJnRvcGJvdDtcIixcIuKrsVwiOlwiJnRvcGNpcjtcIixcIvCdlaVcIjpcIiZ0b3BmO1wiLFwi4quaXCI6XCImdG9wZm9yaztcIixcIuKAtFwiOlwiJnRwcmltZTtcIixcIuKWtVwiOlwiJnV0cmk7XCIsXCLiiZxcIjpcIiZ0cmllO1wiLFwi4pesXCI6XCImdHJpZG90O1wiLFwi4qi6XCI6XCImdHJpbWludXM7XCIsXCLiqLlcIjpcIiZ0cmlwbHVzO1wiLFwi4qeNXCI6XCImdHJpc2I7XCIsXCLiqLtcIjpcIiZ0cml0aW1lO1wiLFwi4o+iXCI6XCImdHJwZXppdW07XCIsXCLwnZOJXCI6XCImdHNjcjtcIixcItGGXCI6XCImdHNjeTtcIixcItGbXCI6XCImdHNoY3k7XCIsXCLFp1wiOlwiJnRzdHJvaztcIixcIuKlo1wiOlwiJnVIYXI7XCIsXCLDulwiOlwiJnVhY3V0ZTtcIixcItGeXCI6XCImdWJyY3k7XCIsXCLFrVwiOlwiJnVicmV2ZTtcIixcIsO7XCI6XCImdWNpcmM7XCIsXCLRg1wiOlwiJnVjeTtcIixcIsWxXCI6XCImdWRibGFjO1wiLFwi4qW+XCI6XCImdWZpc2h0O1wiLFwi8J2UslwiOlwiJnVmcjtcIixcIsO5XCI6XCImdWdyYXZlO1wiLFwi4paAXCI6XCImdWhibGs7XCIsXCLijJxcIjpcIiZ1bGNvcm5lcjtcIixcIuKMj1wiOlwiJnVsY3JvcDtcIixcIuKXuFwiOlwiJnVsdHJpO1wiLFwixatcIjpcIiZ1bWFjcjtcIixcIsWzXCI6XCImdW9nb247XCIsXCLwnZWmXCI6XCImdW9wZjtcIixcIs+FXCI6XCImdXBzaWxvbjtcIixcIuKHiFwiOlwiJnV1YXJyO1wiLFwi4oydXCI6XCImdXJjb3JuZXI7XCIsXCLijI5cIjpcIiZ1cmNyb3A7XCIsXCLFr1wiOlwiJnVyaW5nO1wiLFwi4pe5XCI6XCImdXJ0cmk7XCIsXCLwnZOKXCI6XCImdXNjcjtcIixcIuKLsFwiOlwiJnV0ZG90O1wiLFwixalcIjpcIiZ1dGlsZGU7XCIsXCLDvFwiOlwiJnV1bWw7XCIsXCLipqdcIjpcIiZ1d2FuZ2xlO1wiLFwi4quoXCI6XCImdkJhcjtcIixcIuKrqVwiOlwiJnZCYXJ2O1wiLFwi4qacXCI6XCImdmFuZ3J0O1wiLFwi4oqK77iAXCI6XCImdnN1Ym5lO1wiLFwi4quL77iAXCI6XCImdnN1Ym5FO1wiLFwi4oqL77iAXCI6XCImdnN1cG5lO1wiLFwi4quM77iAXCI6XCImdnN1cG5FO1wiLFwi0LJcIjpcIiZ2Y3k7XCIsXCLiirtcIjpcIiZ2ZWViYXI7XCIsXCLiiZpcIjpcIiZ2ZWVlcTtcIixcIuKLrlwiOlwiJnZlbGxpcDtcIixcIvCdlLNcIjpcIiZ2ZnI7XCIsXCLwnZWnXCI6XCImdm9wZjtcIixcIvCdk4tcIjpcIiZ2c2NyO1wiLFwi4qaaXCI6XCImdnppZ3phZztcIixcIsW1XCI6XCImd2NpcmM7XCIsXCLiqZ9cIjpcIiZ3ZWRiYXI7XCIsXCLiiZlcIjpcIiZ3ZWRnZXE7XCIsXCLihJhcIjpcIiZ3cDtcIixcIvCdlLRcIjpcIiZ3ZnI7XCIsXCLwnZWoXCI6XCImd29wZjtcIixcIvCdk4xcIjpcIiZ3c2NyO1wiLFwi8J2UtVwiOlwiJnhmcjtcIixcIs6+XCI6XCImeGk7XCIsXCLii7tcIjpcIiZ4bmlzO1wiLFwi8J2VqVwiOlwiJnhvcGY7XCIsXCLwnZONXCI6XCImeHNjcjtcIixcIsO9XCI6XCImeWFjdXRlO1wiLFwi0Y9cIjpcIiZ5YWN5O1wiLFwixbdcIjpcIiZ5Y2lyYztcIixcItGLXCI6XCImeWN5O1wiLFwiwqVcIjpcIiZ5ZW47XCIsXCLwnZS2XCI6XCImeWZyO1wiLFwi0ZdcIjpcIiZ5aWN5O1wiLFwi8J2VqlwiOlwiJnlvcGY7XCIsXCLwnZOOXCI6XCImeXNjcjtcIixcItGOXCI6XCImeXVjeTtcIixcIsO/XCI6XCImeXVtbDtcIixcIsW6XCI6XCImemFjdXRlO1wiLFwixb5cIjpcIiZ6Y2Fyb247XCIsXCLQt1wiOlwiJnpjeTtcIixcIsW8XCI6XCImemRvdDtcIixcIs62XCI6XCImemV0YTtcIixcIvCdlLdcIjpcIiZ6ZnI7XCIsXCLQtlwiOlwiJnpoY3k7XCIsXCLih51cIjpcIiZ6aWdyYXJyO1wiLFwi8J2Vq1wiOlwiJnpvcGY7XCIsXCLwnZOPXCI6XCImenNjcjtcIixcIuKAjVwiOlwiJnp3ajtcIixcIuKAjFwiOlwiJnp3bmo7XCJ9fX07IiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLm51bWVyaWNVbmljb2RlTWFwPXswOjY1NTMzLDEyODo4MzY0LDEzMDo4MjE4LDEzMTo0MDIsMTMyOjgyMjIsMTMzOjgyMzAsMTM0OjgyMjQsMTM1OjgyMjUsMTM2OjcxMCwxMzc6ODI0MCwxMzg6MzUyLDEzOTo4MjQ5LDE0MDozMzgsMTQyOjM4MSwxNDU6ODIxNiwxNDY6ODIxNywxNDc6ODIyMCwxNDg6ODIyMSwxNDk6ODIyNiwxNTA6ODIxMSwxNTE6ODIxMiwxNTI6NzMyLDE1Mzo4NDgyLDE1NDozNTMsMTU1OjgyNTAsMTU2OjMzOSwxNTg6MzgyLDE1OTozNzZ9OyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5mcm9tQ29kZVBvaW50PVN0cmluZy5mcm9tQ29kZVBvaW50fHxmdW5jdGlvbihhc3RyYWxDb2RlUG9pbnQpe3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IoKGFzdHJhbENvZGVQb2ludC02NTUzNikvMTAyNCkrNTUyOTYsKGFzdHJhbENvZGVQb2ludC02NTUzNiklMTAyNCs1NjMyMCl9O2V4cG9ydHMuZ2V0Q29kZVBvaW50PVN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXQ/ZnVuY3Rpb24oaW5wdXQscG9zaXRpb24pe3JldHVybiBpbnB1dC5jb2RlUG9pbnRBdChwb3NpdGlvbil9OmZ1bmN0aW9uKGlucHV0LHBvc2l0aW9uKXtyZXR1cm4oaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbiktNTUyOTYpKjEwMjQraW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbisxKS01NjMyMCs2NTUzNn07ZXhwb3J0cy5oaWdoU3Vycm9nYXRlRnJvbT01NTI5NjtleHBvcnRzLmhpZ2hTdXJyb2dhdGVUbz01NjMxOTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgaWYgKCFjb250ZW50LmxvY2FscyB8fCBtb2R1bGUuaG90LmludmFsaWRhdGUpIHtcbiAgICB2YXIgaXNFcXVhbExvY2FscyA9IGZ1bmN0aW9uIGlzRXF1YWxMb2NhbHMoYSwgYiwgaXNOYW1lZEV4cG9ydCkge1xuICBpZiAoIWEgJiYgYiB8fCBhICYmICFiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwO1xuICBmb3IgKHAgaW4gYSkge1xuICAgIGlmIChpc05hbWVkRXhwb3J0ICYmIHAgPT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYVtwXSAhPT0gYltwXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKHAgaW4gYikge1xuICAgIGlmIChpc05hbWVkRXhwb3J0ICYmIHAgPT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoIWFbcF0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuICAgIHZhciBpc05hbWVkRXhwb3J0ID0gIWNvbnRlbnQubG9jYWxzO1xuICAgIHZhciBvbGRMb2NhbHMgPSBpc05hbWVkRXhwb3J0ID8gbmFtZWRFeHBvcnQgOiBjb250ZW50LmxvY2FscztcblxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFxuICAgICAgXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIixcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFpc0VxdWFsTG9jYWxzKG9sZExvY2FscywgaXNOYW1lZEV4cG9ydCA/IG5hbWVkRXhwb3J0IDogY29udGVudC5sb2NhbHMsIGlzTmFtZWRFeHBvcnQpKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlLmhvdC5pbnZhbGlkYXRlKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBvbGRMb2NhbHMgPSBpc05hbWVkRXhwb3J0ID8gbmFtZWRFeHBvcnQgOiBjb250ZW50LmxvY2FscztcblxuICAgICAgICAgICAgICB1cGRhdGUoY29udGVudCk7XG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkge1xuICAgIHVwZGF0ZSgpO1xuICB9KTtcbn1cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuLi91dGlscy9sb2cuanNcIjtcblxudmFyIFdlYlNvY2tldENsaWVudCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBmdW5jdGlvbiBXZWJTb2NrZXRDbGllbnQodXJsKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdlYlNvY2tldENsaWVudCk7XG5cbiAgICB0aGlzLmNsaWVudCA9IG5ldyBXZWJTb2NrZXQodXJsKTtcblxuICAgIHRoaXMuY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihlcnJvcik7XG4gICAgfTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGZcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoV2ViU29ja2V0Q2xpZW50LCBbe1xuICAgIGtleTogXCJvbk9wZW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25PcGVuKGYpIHtcbiAgICAgIHRoaXMuY2xpZW50Lm9ub3BlbiA9IGY7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBmXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJvbkNsb3NlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2xvc2UoZikge1xuICAgICAgdGhpcy5jbGllbnQub25jbG9zZSA9IGY7XG4gICAgfSAvLyBjYWxsIGYgd2l0aCB0aGUgbWVzc2FnZSBzdHJpbmcgYXMgdGhlIGZpcnN0IGFyZ3VtZW50XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gZlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwib25NZXNzYWdlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uTWVzc2FnZShmKSB7XG4gICAgICB0aGlzLmNsaWVudC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBmKGUuZGF0YSk7XG4gICAgICB9O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXZWJTb2NrZXRDbGllbnQ7XG59KCk7XG5cbmV4cG9ydCB7IFdlYlNvY2tldENsaWVudCBhcyBkZWZhdWx0IH07IiwiLyogZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSwgX193ZWJwYWNrX2hhc2hfXyAqL1xuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ3ZWJwYWNrL21vZHVsZVwiIC8+XG5pbXBvcnQgd2VicGFja0hvdExvZyBmcm9tIFwid2VicGFjay9ob3QvbG9nLmpzXCI7XG5pbXBvcnQgc3RyaXBBbnNpIGZyb20gXCIuL21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qc1wiO1xuaW1wb3J0IHBhcnNlVVJMIGZyb20gXCIuL3V0aWxzL3BhcnNlVVJMLmpzXCI7XG5pbXBvcnQgc29ja2V0IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuaW1wb3J0IHsgZm9ybWF0UHJvYmxlbSwgc2hvdywgaGlkZSB9IGZyb20gXCIuL292ZXJsYXkuanNcIjtcbmltcG9ydCB7IGxvZywgc2V0TG9nTGV2ZWwgfSBmcm9tIFwiLi91dGlscy9sb2cuanNcIjtcbmltcG9ydCBzZW5kTWVzc2FnZSBmcm9tIFwiLi91dGlscy9zZW5kTWVzc2FnZS5qc1wiO1xuaW1wb3J0IHJlbG9hZEFwcCBmcm9tIFwiLi91dGlscy9yZWxvYWRBcHAuanNcIjtcbmltcG9ydCBjcmVhdGVTb2NrZXRVUkwgZnJvbSBcIi4vdXRpbHMvY3JlYXRlU29ja2V0VVJMLmpzXCI7XG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaG90XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGxpdmVSZWxvYWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvZ3Jlc3NcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IHsgd2FybmluZ3M/OiBib29sZWFuLCBlcnJvcnM/OiBib29sZWFuIH19IG92ZXJsYXlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbbG9nZ2luZ11cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcmVjb25uZWN0XVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gU3RhdHVzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzVW5sb2FkaW5nXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3VycmVudEhhc2hcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbcHJldmlvdXNIYXNoXVxuICovXG5cbi8qKlxuICogQHR5cGUge1N0YXR1c31cbiAqL1xuXG52YXIgc3RhdHVzID0ge1xuICBpc1VubG9hZGluZzogZmFsc2UsXG4gIC8vIFRPRE8gV29ya2Fyb3VuZCBmb3Igd2VicGFjayB2NCwgYF9fd2VicGFja19oYXNoX19gIGlzIG5vdCByZXBsYWNlZCB3aXRob3V0IEhvdE1vZHVsZVJlcGxhY2VtZW50XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgY3VycmVudEhhc2g6IHR5cGVvZiBfX3dlYnBhY2tfaGFzaF9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX2hhc2hfXyA6IFwiXCJcbn07XG4vKiogQHR5cGUge09wdGlvbnN9ICovXG5cbnZhciBvcHRpb25zID0ge1xuICBob3Q6IGZhbHNlLFxuICBsaXZlUmVsb2FkOiBmYWxzZSxcbiAgcHJvZ3Jlc3M6IGZhbHNlLFxuICBvdmVybGF5OiBmYWxzZVxufTtcbnZhciBwYXJzZWRSZXNvdXJjZVF1ZXJ5ID0gcGFyc2VVUkwoX19yZXNvdXJjZVF1ZXJ5KTtcblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnkuaG90ID09PSBcInRydWVcIikge1xuICBvcHRpb25zLmhvdCA9IHRydWU7XG4gIGxvZy5pbmZvKFwiSG90IE1vZHVsZSBSZXBsYWNlbWVudCBlbmFibGVkLlwiKTtcbn1cblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnlbXCJsaXZlLXJlbG9hZFwiXSA9PT0gXCJ0cnVlXCIpIHtcbiAgb3B0aW9ucy5saXZlUmVsb2FkID0gdHJ1ZTtcbiAgbG9nLmluZm8oXCJMaXZlIFJlbG9hZGluZyBlbmFibGVkLlwiKTtcbn1cblxuaWYgKHBhcnNlZFJlc291cmNlUXVlcnkubG9nZ2luZykge1xuICBvcHRpb25zLmxvZ2dpbmcgPSBwYXJzZWRSZXNvdXJjZVF1ZXJ5LmxvZ2dpbmc7XG59XG5cbmlmICh0eXBlb2YgcGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgb3B0aW9ucy5yZWNvbm5lY3QgPSBOdW1iZXIocGFyc2VkUmVzb3VyY2VRdWVyeS5yZWNvbm5lY3QpO1xufVxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV2ZWxcbiAqL1xuXG5cbmZ1bmN0aW9uIHNldEFsbExvZ0xldmVsKGxldmVsKSB7XG4gIC8vIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIEhNUiBsb2dnZXIgb3BlcmF0ZSBzZXBhcmF0ZWx5IGZyb20gZGV2IHNlcnZlciBsb2dnZXJcbiAgd2VicGFja0hvdExvZy5zZXRMb2dMZXZlbChsZXZlbCA9PT0gXCJ2ZXJib3NlXCIgfHwgbGV2ZWwgPT09IFwibG9nXCIgPyBcImluZm9cIiA6IGxldmVsKTtcbiAgc2V0TG9nTGV2ZWwobGV2ZWwpO1xufVxuXG5pZiAob3B0aW9ucy5sb2dnaW5nKSB7XG4gIHNldEFsbExvZ0xldmVsKG9wdGlvbnMubG9nZ2luZyk7XG59XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gIHN0YXR1cy5pc1VubG9hZGluZyA9IHRydWU7XG59KTtcbnZhciBvblNvY2tldE1lc3NhZ2UgPSB7XG4gIGhvdDogZnVuY3Rpb24gaG90KCkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LmhvdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb3B0aW9ucy5ob3QgPSB0cnVlO1xuICAgIGxvZy5pbmZvKFwiSG90IE1vZHVsZSBSZXBsYWNlbWVudCBlbmFibGVkLlwiKTtcbiAgfSxcbiAgbGl2ZVJlbG9hZDogZnVuY3Rpb24gbGl2ZVJlbG9hZCgpIHtcbiAgICBpZiAocGFyc2VkUmVzb3VyY2VRdWVyeVtcImxpdmUtcmVsb2FkXCJdID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLmxpdmVSZWxvYWQgPSB0cnVlO1xuICAgIGxvZy5pbmZvKFwiTGl2ZSBSZWxvYWRpbmcgZW5hYmxlZC5cIik7XG4gIH0sXG4gIGludmFsaWQ6IGZ1bmN0aW9uIGludmFsaWQoKSB7XG4gICAgbG9nLmluZm8oXCJBcHAgdXBkYXRlZC4gUmVjb21waWxpbmcuLi5cIik7IC8vIEZpeGVzICMxMDQyLiBvdmVybGF5IGRvZXNuJ3QgY2xlYXIgaWYgZXJyb3JzIGFyZSBmaXhlZCBidXQgd2FybmluZ3MgcmVtYWluLlxuXG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgaGlkZSgpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKFwiSW52YWxpZFwiKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhhc2hcbiAgICovXG4gIGhhc2g6IGZ1bmN0aW9uIGhhc2goX2hhc2gpIHtcbiAgICBzdGF0dXMucHJldmlvdXNIYXNoID0gc3RhdHVzLmN1cnJlbnRIYXNoO1xuICAgIHN0YXR1cy5jdXJyZW50SGFzaCA9IF9oYXNoO1xuICB9LFxuICBsb2dnaW5nOiBzZXRBbGxMb2dMZXZlbCxcblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgKi9cbiAgb3ZlcmxheTogZnVuY3Rpb24gb3ZlcmxheSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLm92ZXJsYXkgPSB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAqL1xuICByZWNvbm5lY3Q6IGZ1bmN0aW9uIHJlY29ubmVjdCh2YWx1ZSkge1xuICAgIGlmIChwYXJzZWRSZXNvdXJjZVF1ZXJ5LnJlY29ubmVjdCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgb3B0aW9ucy5yZWNvbm5lY3QgPSB2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgKi9cbiAgcHJvZ3Jlc3M6IGZ1bmN0aW9uIHByb2dyZXNzKHZhbHVlKSB7XG4gICAgb3B0aW9ucy5wcm9ncmVzcyA9IHZhbHVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3sgcGx1Z2luTmFtZT86IHN0cmluZywgcGVyY2VudDogbnVtYmVyLCBtc2c6IHN0cmluZyB9fSBkYXRhXG4gICAqL1xuICBcInByb2dyZXNzLXVwZGF0ZVwiOiBmdW5jdGlvbiBwcm9ncmVzc1VwZGF0ZShkYXRhKSB7XG4gICAgaWYgKG9wdGlvbnMucHJvZ3Jlc3MpIHtcbiAgICAgIGxvZy5pbmZvKFwiXCIuY29uY2F0KGRhdGEucGx1Z2luTmFtZSA/IFwiW1wiLmNvbmNhdChkYXRhLnBsdWdpbk5hbWUsIFwiXSBcIikgOiBcIlwiKS5jb25jYXQoZGF0YS5wZXJjZW50LCBcIiUgLSBcIikuY29uY2F0KGRhdGEubXNnLCBcIi5cIikpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKFwiUHJvZ3Jlc3NcIiwgZGF0YSk7XG4gIH0sXG4gIFwic3RpbGwtb2tcIjogZnVuY3Rpb24gc3RpbGxPaygpIHtcbiAgICBsb2cuaW5mbyhcIk5vdGhpbmcgY2hhbmdlZC5cIik7XG5cbiAgICBpZiAob3B0aW9ucy5vdmVybGF5KSB7XG4gICAgICBoaWRlKCk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoXCJTdGlsbE9rXCIpO1xuICB9LFxuICBvazogZnVuY3Rpb24gb2soKSB7XG4gICAgc2VuZE1lc3NhZ2UoXCJPa1wiKTtcblxuICAgIGlmIChvcHRpb25zLm92ZXJsYXkpIHtcbiAgICAgIGhpZGUoKTtcbiAgICB9XG5cbiAgICByZWxvYWRBcHAob3B0aW9ucywgc3RhdHVzKTtcbiAgfSxcbiAgLy8gVE9ETzogcmVtb3ZlIGluIHY1IGluIGZhdm9yIG9mICdzdGF0aWMtY2hhbmdlZCdcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwiY29udGVudC1jaGFuZ2VkXCI6IGZ1bmN0aW9uIGNvbnRlbnRDaGFuZ2VkKGZpbGUpIHtcbiAgICBsb2cuaW5mbyhcIlwiLmNvbmNhdChmaWxlID8gXCJcXFwiXCIuY29uY2F0KGZpbGUsIFwiXFxcIlwiKSA6IFwiQ29udGVudFwiLCBcIiBmcm9tIHN0YXRpYyBkaXJlY3Rvcnkgd2FzIGNoYW5nZWQuIFJlbG9hZGluZy4uLlwiKSk7XG4gICAgc2VsZi5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVcbiAgICovXG4gIFwic3RhdGljLWNoYW5nZWRcIjogZnVuY3Rpb24gc3RhdGljQ2hhbmdlZChmaWxlKSB7XG4gICAgbG9nLmluZm8oXCJcIi5jb25jYXQoZmlsZSA/IFwiXFxcIlwiLmNvbmNhdChmaWxlLCBcIlxcXCJcIikgOiBcIkNvbnRlbnRcIiwgXCIgZnJvbSBzdGF0aWMgZGlyZWN0b3J5IHdhcyBjaGFuZ2VkLiBSZWxvYWRpbmcuLi5cIikpO1xuICAgIHNlbGYubG9jYXRpb24ucmVsb2FkKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXJyb3JbXX0gd2FybmluZ3NcbiAgICogQHBhcmFtIHthbnl9IHBhcmFtc1xuICAgKi9cbiAgd2FybmluZ3M6IGZ1bmN0aW9uIHdhcm5pbmdzKF93YXJuaW5ncywgcGFyYW1zKSB7XG4gICAgbG9nLndhcm4oXCJXYXJuaW5ncyB3aGlsZSBjb21waWxpbmcuXCIpO1xuXG4gICAgdmFyIHByaW50YWJsZVdhcm5pbmdzID0gX3dhcm5pbmdzLm1hcChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHZhciBfZm9ybWF0UHJvYmxlbSA9IGZvcm1hdFByb2JsZW0oXCJ3YXJuaW5nXCIsIGVycm9yKSxcbiAgICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtLmJvZHk7XG5cbiAgICAgIHJldHVybiBcIlwiLmNvbmNhdChoZWFkZXIsIFwiXFxuXCIpLmNvbmNhdChzdHJpcEFuc2koYm9keSkpO1xuICAgIH0pO1xuXG4gICAgc2VuZE1lc3NhZ2UoXCJXYXJuaW5nc1wiLCBwcmludGFibGVXYXJuaW5ncyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZVdhcm5pbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb2cud2FybihwcmludGFibGVXYXJuaW5nc1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIG5lZWRTaG93T3ZlcmxheUZvcldhcm5pbmdzID0gdHlwZW9mIG9wdGlvbnMub3ZlcmxheSA9PT0gXCJib29sZWFuXCIgPyBvcHRpb25zLm92ZXJsYXkgOiBvcHRpb25zLm92ZXJsYXkgJiYgb3B0aW9ucy5vdmVybGF5Lndhcm5pbmdzO1xuXG4gICAgaWYgKG5lZWRTaG93T3ZlcmxheUZvcldhcm5pbmdzKSB7XG4gICAgICBzaG93KFwid2FybmluZ1wiLCBfd2FybmluZ3MpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMgJiYgcGFyYW1zLnByZXZlbnRSZWxvYWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZWxvYWRBcHAob3B0aW9ucywgc3RhdHVzKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFcnJvcltdfSBlcnJvcnNcbiAgICovXG4gIGVycm9yczogZnVuY3Rpb24gZXJyb3JzKF9lcnJvcnMpIHtcbiAgICBsb2cuZXJyb3IoXCJFcnJvcnMgd2hpbGUgY29tcGlsaW5nLiBSZWxvYWQgcHJldmVudGVkLlwiKTtcblxuICAgIHZhciBwcmludGFibGVFcnJvcnMgPSBfZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHZhciBfZm9ybWF0UHJvYmxlbTIgPSBmb3JtYXRQcm9ibGVtKFwiZXJyb3JcIiwgZXJyb3IpLFxuICAgICAgICAgIGhlYWRlciA9IF9mb3JtYXRQcm9ibGVtMi5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtMi5ib2R5O1xuXG4gICAgICByZXR1cm4gXCJcIi5jb25jYXQoaGVhZGVyLCBcIlxcblwiKS5jb25jYXQoc3RyaXBBbnNpKGJvZHkpKTtcbiAgICB9KTtcblxuICAgIHNlbmRNZXNzYWdlKFwiRXJyb3JzXCIsIHByaW50YWJsZUVycm9ycyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaW50YWJsZUVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbG9nLmVycm9yKHByaW50YWJsZUVycm9yc1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIG5lZWRTaG93T3ZlcmxheUZvckVycm9ycyA9IHR5cGVvZiBvcHRpb25zLm92ZXJsYXkgPT09IFwiYm9vbGVhblwiID8gb3B0aW9ucy5vdmVybGF5IDogb3B0aW9ucy5vdmVybGF5ICYmIG9wdGlvbnMub3ZlcmxheS5lcnJvcnM7XG5cbiAgICBpZiAobmVlZFNob3dPdmVybGF5Rm9yRXJyb3JzKSB7XG4gICAgICBzaG93KFwiZXJyb3JcIiwgX2Vycm9ycyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICAgKi9cbiAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKF9lcnJvcikge1xuICAgIGxvZy5lcnJvcihfZXJyb3IpO1xuICB9LFxuICBjbG9zZTogZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgbG9nLmluZm8oXCJEaXNjb25uZWN0ZWQhXCIpO1xuXG4gICAgaWYgKG9wdGlvbnMub3ZlcmxheSkge1xuICAgICAgaGlkZSgpO1xuICAgIH1cblxuICAgIHNlbmRNZXNzYWdlKFwiQ2xvc2VcIik7XG4gIH1cbn07XG52YXIgc29ja2V0VVJMID0gY3JlYXRlU29ja2V0VVJMKHBhcnNlZFJlc291cmNlUXVlcnkpO1xuc29ja2V0KHNvY2tldFVSTCwgb25Tb2NrZXRNZXNzYWdlLCBvcHRpb25zLnJlY29ubmVjdCk7IiwiLyoqKioqKi8gKGZ1bmN0aW9uKCkgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdFwidXNlIHN0cmljdFwiO1xuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIFwiLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvbG9nZ2VyL1N5bmNCYWlsSG9va0Zha2UuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cblxuLyoqXG4gKiBDbGllbnQgc3R1YiBmb3IgdGFwYWJsZSBTeW5jQmFpbEhvb2tcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsaWVudFRhcGFibGVTeW5jQmFpbEhvb2soKSB7XG4gIHJldHVybiB7XG4gICAgY2FsbDogZnVuY3Rpb24gY2FsbCgpIHt9XG4gIH07XG59O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyWyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG52YXIgTG9nVHlwZSA9IE9iamVjdC5mcmVlemUoe1xuICBlcnJvcjpcbiAgLyoqIEB0eXBlIHtcImVycm9yXCJ9ICovXG4gIFwiZXJyb3JcIixcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgd2FybjpcbiAgLyoqIEB0eXBlIHtcIndhcm5cIn0gKi9cbiAgXCJ3YXJuXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIGluZm86XG4gIC8qKiBAdHlwZSB7XCJpbmZvXCJ9ICovXG4gIFwiaW5mb1wiLFxuICAvLyBtZXNzYWdlLCBjIHN0eWxlIGFyZ3VtZW50c1xuICBsb2c6XG4gIC8qKiBAdHlwZSB7XCJsb2dcIn0gKi9cbiAgXCJsb2dcIixcbiAgLy8gbWVzc2FnZSwgYyBzdHlsZSBhcmd1bWVudHNcbiAgZGVidWc6XG4gIC8qKiBAdHlwZSB7XCJkZWJ1Z1wifSAqL1xuICBcImRlYnVnXCIsXG4gIC8vIG1lc3NhZ2UsIGMgc3R5bGUgYXJndW1lbnRzXG4gIHRyYWNlOlxuICAvKiogQHR5cGUge1widHJhY2VcIn0gKi9cbiAgXCJ0cmFjZVwiLFxuICAvLyBubyBhcmd1bWVudHNcbiAgZ3JvdXA6XG4gIC8qKiBAdHlwZSB7XCJncm91cFwifSAqL1xuICBcImdyb3VwXCIsXG4gIC8vIFtsYWJlbF1cbiAgZ3JvdXBDb2xsYXBzZWQ6XG4gIC8qKiBAdHlwZSB7XCJncm91cENvbGxhcHNlZFwifSAqL1xuICBcImdyb3VwQ29sbGFwc2VkXCIsXG4gIC8vIFtsYWJlbF1cbiAgZ3JvdXBFbmQ6XG4gIC8qKiBAdHlwZSB7XCJncm91cEVuZFwifSAqL1xuICBcImdyb3VwRW5kXCIsXG4gIC8vIFtsYWJlbF1cbiAgcHJvZmlsZTpcbiAgLyoqIEB0eXBlIHtcInByb2ZpbGVcIn0gKi9cbiAgXCJwcm9maWxlXCIsXG4gIC8vIFtwcm9maWxlTmFtZV1cbiAgcHJvZmlsZUVuZDpcbiAgLyoqIEB0eXBlIHtcInByb2ZpbGVFbmRcIn0gKi9cbiAgXCJwcm9maWxlRW5kXCIsXG4gIC8vIFtwcm9maWxlTmFtZV1cbiAgdGltZTpcbiAgLyoqIEB0eXBlIHtcInRpbWVcIn0gKi9cbiAgXCJ0aW1lXCIsXG4gIC8vIG5hbWUsIHRpbWUgYXMgW3NlY29uZHMsIG5hbm9zZWNvbmRzXVxuICBjbGVhcjpcbiAgLyoqIEB0eXBlIHtcImNsZWFyXCJ9ICovXG4gIFwiY2xlYXJcIixcbiAgLy8gbm8gYXJndW1lbnRzXG4gIHN0YXR1czpcbiAgLyoqIEB0eXBlIHtcInN0YXR1c1wifSAqL1xuICBcInN0YXR1c1wiIC8vIG1lc3NhZ2UsIGFyZ3VtZW50c1xuXG59KTtcbmV4cG9ydHMuTG9nVHlwZSA9IExvZ1R5cGU7XG4vKiogQHR5cGVkZWYge3R5cGVvZiBMb2dUeXBlW2tleW9mIHR5cGVvZiBMb2dUeXBlXX0gTG9nVHlwZUVudW0gKi9cblxudmFyIExPR19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHJhdyBsb2cgbWV0aG9kXCIpO1xudmFyIFRJTUVSU19TWU1CT0wgPSAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KShcIndlYnBhY2sgbG9nZ2VyIHRpbWVzXCIpO1xudmFyIFRJTUVSU19BR0dSRUdBVEVTX1NZTUJPTCA9ICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pKFwid2VicGFjayBsb2dnZXIgYWdncmVnYXRlZCB0aW1lc1wiKTtcblxudmFyIFdlYnBhY2tMb2dnZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbihMb2dUeXBlRW51bSwgYW55W109KTogdm9pZH0gbG9nIGxvZyBmdW5jdGlvblxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKHN0cmluZyB8IGZ1bmN0aW9uKCk6IHN0cmluZyk6IFdlYnBhY2tMb2dnZXJ9IGdldENoaWxkTG9nZ2VyIGZ1bmN0aW9uIHRvIGNyZWF0ZSBjaGlsZCBsb2dnZXJcbiAgICovXG4gIGZ1bmN0aW9uIFdlYnBhY2tMb2dnZXIobG9nLCBnZXRDaGlsZExvZ2dlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXZWJwYWNrTG9nZ2VyKTtcblxuICAgIHRoaXNbTE9HX1NZTUJPTF0gPSBsb2c7XG4gICAgdGhpcy5nZXRDaGlsZExvZ2dlciA9IGdldENoaWxkTG9nZ2VyO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFdlYnBhY2tMb2dnZXIsIFt7XG4gICAga2V5OiBcImVycm9yXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5lcnJvciwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIndhcm5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gd2FybigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS53YXJuLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaW5mb1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbmZvKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICAgIGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmluZm8sIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJsb2dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gbG9nKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjQgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW40KSwgX2tleTQgPSAwOyBfa2V5NCA8IF9sZW40OyBfa2V5NCsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTRdID0gYXJndW1lbnRzW19rZXk0XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmxvZywgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRlYnVnXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjUgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW41KSwgX2tleTUgPSAwOyBfa2V5NSA8IF9sZW41OyBfa2V5NSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTVdID0gYXJndW1lbnRzW19rZXk1XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmRlYnVnLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYXNzZXJ0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2VydChhc3NlcnRpb24pIHtcbiAgICAgIGlmICghYXNzZXJ0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW42ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNiA+IDEgPyBfbGVuNiAtIDEgOiAwKSwgX2tleTYgPSAxOyBfa2V5NiA8IF9sZW42OyBfa2V5NisrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5NiAtIDFdID0gYXJndW1lbnRzW19rZXk2XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5lcnJvciwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyYWNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRyYWNlKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRyYWNlLCBbXCJUcmFjZVwiXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmNsZWFyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic3RhdHVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN0YXR1cygpIHtcbiAgICAgIGZvciAodmFyIF9sZW43ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuNyksIF9rZXk3ID0gMDsgX2tleTcgPCBfbGVuNzsgX2tleTcrKykge1xuICAgICAgICBhcmdzW19rZXk3XSA9IGFyZ3VtZW50c1tfa2V5N107XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5zdGF0dXMsIGFyZ3MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJncm91cFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBncm91cCgpIHtcbiAgICAgIGZvciAodmFyIF9sZW44ID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuOCksIF9rZXk4ID0gMDsgX2tleTggPCBfbGVuODsgX2tleTgrKykge1xuICAgICAgICBhcmdzW19rZXk4XSA9IGFyZ3VtZW50c1tfa2V5OF07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdyb3VwQ29sbGFwc2VkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdyb3VwQ29sbGFwc2VkKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjkgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW45KSwgX2tleTkgPSAwOyBfa2V5OSA8IF9sZW45OyBfa2V5OSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleTldID0gYXJndW1lbnRzW19rZXk5XTtcbiAgICAgIH1cblxuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLmdyb3VwQ29sbGFwc2VkLCBhcmdzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ3JvdXBFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ3JvdXBFbmQoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMTAgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4xMCksIF9rZXkxMCA9IDA7IF9rZXkxMCA8IF9sZW4xMDsgX2tleTEwKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MTBdID0gYXJndW1lbnRzW19rZXkxMF07XG4gICAgICB9XG5cbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5ncm91cEVuZCwgYXJncyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInByb2ZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJvZmlsZShsYWJlbCkge1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnByb2ZpbGUsIFtsYWJlbF0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJwcm9maWxlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2ZpbGVFbmQobGFiZWwpIHtcbiAgICAgIHRoaXNbTE9HX1NZTUJPTF0oTG9nVHlwZS5wcm9maWxlRW5kLCBbbGFiZWxdKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidGltZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0aW1lKGxhYmVsKSB7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdID0gdGhpc1tUSU1FUlNfU1lNQk9MXSB8fCBuZXcgTWFwKCk7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLnNldChsYWJlbCwgcHJvY2Vzcy5ocnRpbWUoKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVMb2dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUxvZyhsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVMb2coKVwiKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVFbmRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUVuZChsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVFbmQoKVwiKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW0xPR19TWU1CT0xdKExvZ1R5cGUudGltZSwgW2xhYmVsXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KHRpbWUpKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRpbWVBZ2dyZWdhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdGltZUFnZ3JlZ2F0ZShsYWJlbCkge1xuICAgICAgdmFyIHByZXYgPSB0aGlzW1RJTUVSU19TWU1CT0xdICYmIHRoaXNbVElNRVJTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKCFwcmV2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHN1Y2ggbGFiZWwgJ1wiLmNvbmNhdChsYWJlbCwgXCInIGZvciBXZWJwYWNrTG9nZ2VyLnRpbWVBZ2dyZWdhdGUoKVwiKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lID0gcHJvY2Vzcy5ocnRpbWUocHJldik7XG4gICAgICB0aGlzW1RJTUVSU19TWU1CT0xdLmRlbGV0ZShsYWJlbCk7XG4gICAgICB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gfHwgbmV3IE1hcCgpO1xuICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcblxuICAgICAgaWYgKGN1cnJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodGltZVsxXSArIGN1cnJlbnRbMV0gPiAxZTkpIHtcbiAgICAgICAgICB0aW1lWzBdICs9IGN1cnJlbnRbMF0gKyAxO1xuICAgICAgICAgIHRpbWVbMV0gPSB0aW1lWzFdIC0gMWU5ICsgY3VycmVudFsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aW1lWzBdICs9IGN1cnJlbnRbMF07XG4gICAgICAgICAgdGltZVsxXSArPSBjdXJyZW50WzFdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5zZXQobGFiZWwsIHRpbWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ0aW1lQWdncmVnYXRlRW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRpbWVBZ2dyZWdhdGVFbmQobGFiZWwpIHtcbiAgICAgIGlmICh0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgdmFyIHRpbWUgPSB0aGlzW1RJTUVSU19BR0dSRUdBVEVTX1NZTUJPTF0uZ2V0KGxhYmVsKTtcbiAgICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICAgIHRoaXNbVElNRVJTX0FHR1JFR0FURVNfU1lNQk9MXS5kZWxldGUobGFiZWwpO1xuICAgICAgdGhpc1tMT0dfU1lNQk9MXShMb2dUeXBlLnRpbWUsIFtsYWJlbF0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheSh0aW1lKSkpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXZWJwYWNrTG9nZ2VyO1xufSgpO1xuXG5leHBvcnRzLkxvZ2dlciA9IFdlYnBhY2tMb2dnZXI7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvY3JlYXRlQ29uc29sZUxvZ2dlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbCA6IGZ1bmN0aW9uIChpKSB7IHJldHVybiBpOyB9KSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyWyh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sIDogZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGk7IH0pLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9Mb2dnZXIuanNcIiksXG4gICAgTG9nVHlwZSA9IF9yZXF1aXJlLkxvZ1R5cGU7XG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJJdGVtVHlwZXN9IEZpbHRlckl0ZW1UeXBlcyAqL1xuXG4vKiogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2RlY2xhcmF0aW9ucy9XZWJwYWNrT3B0aW9uc1wiKS5GaWx0ZXJUeXBlc30gRmlsdGVyVHlwZXMgKi9cblxuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuL0xvZ2dlclwiKS5Mb2dUeXBlRW51bX0gTG9nVHlwZUVudW0gKi9cblxuLyoqIEB0eXBlZGVmIHtmdW5jdGlvbihzdHJpbmcpOiBib29sZWFufSBGaWx0ZXJGdW5jdGlvbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IExvZ2dlckNvbnNvbGVcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oKTogdm9pZH0gY2xlYXJcbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oKTogdm9pZH0gdHJhY2VcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSBpbmZvXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gbG9nXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZH0gd2FyblxuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWR9IGVycm9yXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGRlYnVnXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwQ29sbGFwc2VkXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IGdyb3VwRW5kXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHN0YXR1c1xuICogQHByb3BlcnR5IHsoLi4uYXJnczogYW55W10pID0+IHZvaWQ9fSBwcm9maWxlXG4gKiBAcHJvcGVydHkgeyguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD19IHByb2ZpbGVFbmRcbiAqIEBwcm9wZXJ0eSB7KC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPX0gbG9nVGltZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTG9nZ2VyT3B0aW9uc1xuICogQHByb3BlcnR5IHtmYWxzZXx0cnVlfFwibm9uZVwifFwiZXJyb3JcInxcIndhcm5cInxcImluZm9cInxcImxvZ1wifFwidmVyYm9zZVwifSBsZXZlbCBsb2dsZXZlbFxuICogQHByb3BlcnR5IHtGaWx0ZXJUeXBlc3xib29sZWFufSBkZWJ1ZyBmaWx0ZXIgZm9yIGRlYnVnIGxvZ2dpbmdcbiAqIEBwcm9wZXJ0eSB7TG9nZ2VyQ29uc29sZX0gY29uc29sZSB0aGUgY29uc29sZSB0byBsb2cgdG9cbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7RmlsdGVySXRlbVR5cGVzfSBpdGVtIGFuIGlucHV0IGl0ZW1cbiAqIEByZXR1cm5zIHtGaWx0ZXJGdW5jdGlvbn0gZmlsdGVyIGZ1bmN0aW9uXG4gKi9cblxuXG52YXIgZmlsdGVyVG9GdW5jdGlvbiA9IGZ1bmN0aW9uIGZpbHRlclRvRnVuY3Rpb24oaXRlbSkge1xuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIltcXFxcXFxcXC9dXCIuY29uY2F0KGl0ZW0ucmVwbGFjZSggLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICAgL1stW1xcXXt9KCkqKz8uXFxcXF4kfF0vZywgXCJcXFxcJCZcIiksIFwiKFtcXFxcXFxcXC9dfCR8IXxcXFxcPylcIikpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiByZWdFeHAudGVzdChpZGVudCk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChpdGVtICYmIHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBpdGVtLnRlc3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaWRlbnQpIHtcbiAgICAgIHJldHVybiBpdGVtLnRlc3QoaWRlbnQpO1xuICAgIH07XG4gIH1cblxuICBpZiAodHlwZW9mIGl0ZW0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9O1xuICB9XG59O1xuLyoqXG4gKiBAZW51bSB7bnVtYmVyfVxuICovXG5cblxudmFyIExvZ0xldmVsID0ge1xuICBub25lOiA2LFxuICBmYWxzZTogNixcbiAgZXJyb3I6IDUsXG4gIHdhcm46IDQsXG4gIGluZm86IDMsXG4gIGxvZzogMixcbiAgdHJ1ZTogMixcbiAgdmVyYm9zZTogMVxufTtcbi8qKlxuICogQHBhcmFtIHtMb2dnZXJPcHRpb25zfSBvcHRpb25zIG9wdGlvbnMgb2JqZWN0XG4gKiBAcmV0dXJucyB7ZnVuY3Rpb24oc3RyaW5nLCBMb2dUeXBlRW51bSwgYW55W10pOiB2b2lkfSBsb2dnaW5nIGZ1bmN0aW9uXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgX3JlZiRsZXZlbCA9IF9yZWYubGV2ZWwsXG4gICAgICBsZXZlbCA9IF9yZWYkbGV2ZWwgPT09IHZvaWQgMCA/IFwiaW5mb1wiIDogX3JlZiRsZXZlbCxcbiAgICAgIF9yZWYkZGVidWcgPSBfcmVmLmRlYnVnLFxuICAgICAgZGVidWcgPSBfcmVmJGRlYnVnID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkZGVidWcsXG4gICAgICBjb25zb2xlID0gX3JlZi5jb25zb2xlO1xuICB2YXIgZGVidWdGaWx0ZXJzID0gdHlwZW9mIGRlYnVnID09PSBcImJvb2xlYW5cIiA/IFtmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlYnVnO1xuICB9XSA6XG4gIC8qKiBAdHlwZSB7RmlsdGVySXRlbVR5cGVzW119ICovXG4gIFtdLmNvbmNhdChkZWJ1ZykubWFwKGZpbHRlclRvRnVuY3Rpb24pO1xuICAvKiogQHR5cGUge251bWJlcn0gKi9cblxuICB2YXIgbG9nbGV2ZWwgPSBMb2dMZXZlbFtcIlwiLmNvbmNhdChsZXZlbCldIHx8IDA7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBuYW1lIG9mIHRoZSBsb2dnZXJcbiAgICogQHBhcmFtIHtMb2dUeXBlRW51bX0gdHlwZSB0eXBlIG9mIHRoZSBsb2cgZW50cnlcbiAgICogQHBhcmFtIHthbnlbXX0gYXJncyBhcmd1bWVudHMgb2YgdGhlIGxvZyBlbnRyeVxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG5cbiAgdmFyIGxvZ2dlciA9IGZ1bmN0aW9uIGxvZ2dlcihuYW1lLCB0eXBlLCBhcmdzKSB7XG4gICAgdmFyIGxhYmVsZWRBcmdzID0gZnVuY3Rpb24gbGFiZWxlZEFyZ3MoKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzKSkge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgcmV0dXJuIFtcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncy5zbGljZSgxKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbXCJbXCIuY29uY2F0KG5hbWUsIFwiXVwiKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGRlYnVnID0gZGVidWdGaWx0ZXJzLnNvbWUoZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmKG5hbWUpO1xuICAgIH0pO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIExvZ1R5cGUuZGVidWc6XG4gICAgICAgIGlmICghZGVidWcpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5kZWJ1ZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5sb2c6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5pbmZvOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwuaW5mbykgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLmluZm8uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS53YXJuOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwud2FybikgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5lcnJvcjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmVycm9yKSByZXR1cm47XG4gICAgICAgIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS50cmFjZTpcbiAgICAgICAgaWYgKCFkZWJ1ZykgcmV0dXJuO1xuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBDb2xsYXBzZWQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcblxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwudmVyYm9zZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgICAgY29uc29sZS5ncm91cENvbGxhcHNlZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgIC8vIGZhbGxzIHRocm91Z2hcblxuICAgICAgY2FzZSBMb2dUeXBlLmdyb3VwOlxuICAgICAgICBpZiAoIWRlYnVnICYmIGxvZ2xldmVsID4gTG9nTGV2ZWwubG9nKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUuZ3JvdXAgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLmdyb3VwLmFwcGx5KGNvbnNvbGUsIF90b0NvbnN1bWFibGVBcnJheShsYWJlbGVkQXJncygpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUuZ3JvdXBFbmQ6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5ncm91cEVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUudGltZTpcbiAgICAgICAge1xuICAgICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5sb2cpIHJldHVybjtcbiAgICAgICAgICB2YXIgbXMgPSBhcmdzWzFdICogMTAwMCArIGFyZ3NbMl0gLyAxMDAwMDAwO1xuICAgICAgICAgIHZhciBtc2cgPSBcIltcIi5jb25jYXQobmFtZSwgXCJdIFwiKS5jb25jYXQoYXJnc1swXSwgXCI6IFwiKS5jb25jYXQobXMsIFwiIG1zXCIpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmxvZ1RpbWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2dUaW1lKG1zZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgY2FzZSBMb2dUeXBlLnByb2ZpbGU6XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnByb2ZpbGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLXVuc3VwcG9ydGVkLWZlYXR1cmVzL25vZGUtYnVpbHRpbnNcbiAgICAgICAgICBjb25zb2xlLnByb2ZpbGUuYXBwbHkoY29uc29sZSwgX3RvQ29uc3VtYWJsZUFycmF5KGxhYmVsZWRBcmdzKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIExvZ1R5cGUucHJvZmlsZUVuZDpcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUucHJvZmlsZUVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tdW5zdXBwb3J0ZWQtZmVhdHVyZXMvbm9kZS1idWlsdGluc1xuICAgICAgICAgIGNvbnNvbGUucHJvZmlsZUVuZC5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5jbGVhcjpcbiAgICAgICAgaWYgKCFkZWJ1ZyAmJiBsb2dsZXZlbCA+IExvZ0xldmVsLmxvZykgcmV0dXJuOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLmNsZWFyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby11bnN1cHBvcnRlZC1mZWF0dXJlcy9ub2RlLWJ1aWx0aW5zXG4gICAgICAgICAgY29uc29sZS5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTG9nVHlwZS5zdGF0dXM6XG4gICAgICAgIGlmICghZGVidWcgJiYgbG9nbGV2ZWwgPiBMb2dMZXZlbC5pbmZvKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnN0YXR1cyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLnN0YXR1cy5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mby5hcHBseShjb25zb2xlLCBfdG9Db25zdW1hYmxlQXJyYXkobGFiZWxlZEFyZ3MoKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIExvZ1R5cGUgXCIuY29uY2F0KHR5cGUpKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxvZ2dlcjtcbn07XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svbGliL2xvZ2dpbmcvcnVudGltZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9ydW50aW1lLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG5cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbnZhciBTeW5jQmFpbEhvb2sgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISB0YXBhYmxlL2xpYi9TeW5jQmFpbEhvb2sgKi8gXCIuL2NsaWVudC1zcmMvbW9kdWxlcy9sb2dnZXIvU3luY0JhaWxIb29rRmFrZS5qc1wiKTtcblxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9Mb2dnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL0xvZ2dlci5qc1wiKSxcbiAgICBMb2dnZXIgPSBfcmVxdWlyZS5Mb2dnZXI7XG5cbnZhciBjcmVhdGVDb25zb2xlTG9nZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9jcmVhdGVDb25zb2xlTG9nZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9saWIvbG9nZ2luZy9jcmVhdGVDb25zb2xlTG9nZ2VyLmpzXCIpO1xuLyoqIEB0eXBlIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9ICovXG5cblxudmFyIGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyA9IHtcbiAgbGV2ZWw6IFwiaW5mb1wiLFxuICBkZWJ1ZzogZmFsc2UsXG4gIGNvbnNvbGU6IGNvbnNvbGVcbn07XG52YXIgY3VycmVudERlZmF1bHRMb2dnZXIgPSBjcmVhdGVDb25zb2xlTG9nZ2VyKGN1cnJlbnREZWZhdWx0TG9nZ2VyT3B0aW9ucyk7XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIG5hbWUgb2YgdGhlIGxvZ2dlclxuICogQHJldHVybnMge0xvZ2dlcn0gYSBsb2dnZXJcbiAqL1xuXG5leHBvcnRzLmdldExvZ2dlciA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBuZXcgTG9nZ2VyKGZ1bmN0aW9uICh0eXBlLCBhcmdzKSB7XG4gICAgaWYgKGV4cG9ydHMuaG9va3MubG9nLmNhbGwobmFtZSwgdHlwZSwgYXJncykgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3VycmVudERlZmF1bHRMb2dnZXIobmFtZSwgdHlwZSwgYXJncyk7XG4gICAgfVxuICB9LCBmdW5jdGlvbiAoY2hpbGROYW1lKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZ2V0TG9nZ2VyKFwiXCIuY29uY2F0KG5hbWUsIFwiL1wiKS5jb25jYXQoY2hpbGROYW1lKSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIHtjcmVhdGVDb25zb2xlTG9nZ2VyLkxvZ2dlck9wdGlvbnN9IG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cblxuZXhwb3J0cy5jb25maWd1cmVEZWZhdWx0TG9nZ2VyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgX2V4dGVuZHMoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zLCBvcHRpb25zKTtcblxuICBjdXJyZW50RGVmYXVsdExvZ2dlciA9IGNyZWF0ZUNvbnNvbGVMb2dnZXIoY3VycmVudERlZmF1bHRMb2dnZXJPcHRpb25zKTtcbn07XG5cbmV4cG9ydHMuaG9va3MgPSB7XG4gIGxvZzogbmV3IFN5bmNCYWlsSG9vayhbXCJvcmlnaW5cIiwgXCJ0eXBlXCIsIFwiYXJnc1wiXSlcbn07XG5cbi8qKiovIH0pXG5cbi8qKioqKiovIFx0fSk7XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcbi8qKioqKiovIFx0XHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcbi8qKioqKiovIFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG4vKioqKioqLyBcdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcbi8qKioqKiovIFx0XHRcdFx0fVxuLyoqKioqKi8gXHRcdFx0fVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH1cbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovIFx0XHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuLyoqKioqKi8gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IHt9O1xuLy8gVGhpcyBlbnRyeSBuZWVkIHRvIGJlIHdyYXBwZWQgaW4gYW4gSUlGRSBiZWNhdXNlIGl0IG5lZWQgdG8gYmUgaXNvbGF0ZWQgYWdhaW5zdCBvdGhlciBtb2R1bGVzIGluIHRoZSBjaHVuay5cbiFmdW5jdGlvbigpIHtcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vY2xpZW50LXNyYy9tb2R1bGVzL2xvZ2dlci9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiByZWV4cG9ydCBkZWZhdWx0IGV4cG9ydCBmcm9tIG5hbWVkIG1vZHVsZSAqLyB3ZWJwYWNrX2xpYl9sb2dnaW5nX3J1bnRpbWVfanNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXzsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgd2VicGFja19saWJfbG9nZ2luZ19ydW50aW1lX2pzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISB3ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanMgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2xpYi9sb2dnaW5nL3J1bnRpbWUuanNcIik7XG5cbn0oKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fID0gZXhwb3J0cztcbmZvcih2YXIgaSBpbiBfX3dlYnBhY2tfZXhwb3J0c19fKSBfX3dlYnBhY2tfZXhwb3J0X3RhcmdldF9fW2ldID0gX193ZWJwYWNrX2V4cG9ydHNfX1tpXTtcbmlmKF9fd2VicGFja19leHBvcnRzX18uX19lc01vZHVsZSkgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18sIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gfSkoKVxuOyIsIi8qKioqKiovIChmdW5jdGlvbigpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHRcInVzZSBzdHJpY3RcIjtcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoZnVuY3Rpb24oX191bnVzZWRfd2VicGFja19fX3dlYnBhY2tfbW9kdWxlX18sIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBleHBvcnQgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbi8qIGhhcm1vbnkgZXhwb3J0ICovICAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBzdHJpcEFuc2k7IH1cbi8qIGhhcm1vbnkgZXhwb3J0ICovIH0pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIGFuc2lfcmVnZXhfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIGFuc2ktcmVnZXggKi8gXCIuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL25vZGVfbW9kdWxlcy9hbnNpLXJlZ2V4L2luZGV4LmpzXCIpO1xuXG5mdW5jdGlvbiBzdHJpcEFuc2koc3RyaW5nKSB7XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIGBzdHJpbmdgLCBnb3QgYFwiLmNvbmNhdCh0eXBlb2Ygc3RyaW5nLCBcImBcIikpO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKCgwLGFuc2lfcmVnZXhfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcImRlZmF1bHRcIl0pKCksICcnKTtcbn1cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9ub2RlX21vZHVsZXMvYW5zaS1yZWdleC9pbmRleC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvbm9kZV9tb2R1bGVzL2Fuc2ktcmVnZXgvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX19fd2VicGFja19tb2R1bGVfXywgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGV4cG9ydCAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywge1xuLyogaGFybW9ueSBleHBvcnQgKi8gICBcImRlZmF1bHRcIjogZnVuY3Rpb24oKSB7IHJldHVybiAvKiBiaW5kaW5nICovIGFuc2lSZWdleDsgfVxuLyogaGFybW9ueSBleHBvcnQgKi8gfSk7XG5mdW5jdGlvbiBhbnNpUmVnZXgoKSB7XG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIF9yZWYkb25seUZpcnN0ID0gX3JlZi5vbmx5Rmlyc3QsXG4gICAgICBvbmx5Rmlyc3QgPSBfcmVmJG9ubHlGaXJzdCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJG9ubHlGaXJzdDtcblxuICB2YXIgcGF0dGVybiA9IFtcIltcXFxcdTAwMUJcXFxcdTAwOUJdW1tcXFxcXSgpIzs/XSooPzooPzooPzooPzo7Wy1hLXpBLVpcXFxcZFxcXFwvIyYuOj0/JUB+X10rKSp8W2EtekEtWlxcXFxkXSsoPzo7Wy1hLXpBLVpcXFxcZFxcXFwvIyYuOj0/JUB+X10qKSopP1xcXFx1MDAwNylcIiwgJyg/Oig/OlxcXFxkezEsNH0oPzo7XFxcXGR7MCw0fSkqKT9bXFxcXGRBLVBSLVRaY2YtbnRxcnk9Pjx+XSkpJ10uam9pbignfCcpO1xuICByZXR1cm4gbmV3IFJlZ0V4cChwYXR0ZXJuLCBvbmx5Rmlyc3QgPyB1bmRlZmluZWQgOiAnZycpO1xufVxuXG4vKioqLyB9KVxuXG4vKioqKioqLyBcdH0pO1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG4vKioqKioqLyBcdFx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG4vKioqKioqLyBcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuLyoqKioqKi8gXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG4vKioqKioqLyBcdFx0XHRcdH1cbi8qKioqKiovIFx0XHRcdH1cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QgKi9cbi8qKioqKiovIFx0IWZ1bmN0aW9uKCkge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0oKTtcbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbi8vIFRoaXMgZW50cnkgbmVlZCB0byBiZSB3cmFwcGVkIGluIGFuIElJRkUgYmVjYXVzZSBpdCBuZWVkIHRvIGJlIGlzb2xhdGVkIGFnYWluc3Qgb3RoZXIgbW9kdWxlcyBpbiB0aGUgY2h1bmsuXG4hZnVuY3Rpb24oKSB7XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jbGllbnQtc3JjL21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yKF9fd2VicGFja19leHBvcnRzX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIHN0cmlwX2Fuc2lfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIHN0cmlwLWFuc2kgKi8gXCIuL25vZGVfbW9kdWxlcy9zdHJpcC1hbnNpL2luZGV4LmpzXCIpO1xuXG4vKiBoYXJtb255IGRlZmF1bHQgZXhwb3J0ICovIF9fd2VicGFja19leHBvcnRzX19bXCJkZWZhdWx0XCJdID0gKHN0cmlwX2Fuc2lfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tcImRlZmF1bHRcIl0pO1xufSgpO1xudmFyIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X18gPSBleHBvcnRzO1xuZm9yKHZhciBpIGluIF9fd2VicGFja19leHBvcnRzX18pIF9fd2VicGFja19leHBvcnRfdGFyZ2V0X19baV0gPSBfX3dlYnBhY2tfZXhwb3J0c19fW2ldO1xuaWYoX193ZWJwYWNrX2V4cG9ydHNfXy5fX2VzTW9kdWxlKSBPYmplY3QuZGVmaW5lUHJvcGVydHkoX193ZWJwYWNrX2V4cG9ydF90YXJnZXRfXywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyB9KSgpXG47IiwiLy8gVGhlIGVycm9yIG92ZXJsYXkgaXMgaW5zcGlyZWQgKGFuZCBtb3N0bHkgY29waWVkKSBmcm9tIENyZWF0ZSBSZWFjdCBBcHAgKGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9va2luY3ViYXRvci9jcmVhdGUtcmVhY3QtYXBwKVxuLy8gVGhleSwgaW4gdHVybiwgZ290IGluc3BpcmVkIGJ5IHdlYnBhY2staG90LW1pZGRsZXdhcmUgKGh0dHBzOi8vZ2l0aHViLmNvbS9nbGVuamFtaW4vd2VicGFjay1ob3QtbWlkZGxld2FyZSkuXG5pbXBvcnQgYW5zaUhUTUwgZnJvbSBcImFuc2ktaHRtbC1jb21tdW5pdHlcIjtcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCJodG1sLWVudGl0aWVzXCI7XG52YXIgY29sb3JzID0ge1xuICByZXNldDogW1widHJhbnNwYXJlbnRcIiwgXCJ0cmFuc3BhcmVudFwiXSxcbiAgYmxhY2s6IFwiMTgxODE4XCIsXG4gIHJlZDogXCJFMzYwNDlcIixcbiAgZ3JlZW46IFwiQjNDQjc0XCIsXG4gIHllbGxvdzogXCJGRkQwODBcIixcbiAgYmx1ZTogXCI3Q0FGQzJcIixcbiAgbWFnZW50YTogXCI3RkFDQ0FcIixcbiAgY3lhbjogXCJDM0MyRUZcIixcbiAgbGlnaHRncmV5OiBcIkVCRTdFM1wiLFxuICBkYXJrZ3JleTogXCI2RDc4OTFcIlxufTtcbi8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuXG52YXIgaWZyYW1lQ29udGFpbmVyRWxlbWVudDtcbi8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuXG52YXIgY29udGFpbmVyRWxlbWVudDtcbi8qKiBAdHlwZSB7QXJyYXk8KGVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50KSA9PiB2b2lkPn0gKi9cblxudmFyIG9uTG9hZFF1ZXVlID0gW107XG5hbnNpSFRNTC5zZXRDb2xvcnMoY29sb3JzKTtcblxuZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyKCkge1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5pZCA9IFwid2VicGFjay1kZXYtc2VydmVyLWNsaWVudC1vdmVybGF5XCI7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3JjID0gXCJhYm91dDpibGFua1wiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnRvcCA9IDA7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUucmlnaHQgPSAwO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmJvdHRvbSA9IDA7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwMHZ3XCI7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDB2aFwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xuICBpZnJhbWVDb250YWluZXJFbGVtZW50LnN0eWxlLnpJbmRleCA9IDk5OTk5OTk5OTk7XG5cbiAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29udGFpbmVyRWxlbWVudCA9XG4gICAgLyoqIEB0eXBlIHtEb2N1bWVudH0gKi9cblxuICAgIC8qKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9ICovXG4gICAgaWZyYW1lQ29udGFpbmVyRWxlbWVudC5jb250ZW50RG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250YWluZXJFbGVtZW50LmlkID0gXCJ3ZWJwYWNrLWRldi1zZXJ2ZXItY2xpZW50LW92ZXJsYXktZGl2XCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUubGVmdCA9IDA7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS50b3AgPSAwO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUucmlnaHQgPSAwO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYm90dG9tID0gMDtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLndpZHRoID0gXCIxMDB2d1wiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDB2aFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuODUpXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI0U4RThFOFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUuZm9udEZhbWlseSA9IFwiTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2VcIjtcbiAgICBjb250YWluZXJFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCJsYXJnZVwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUucGFkZGluZyA9IFwiMnJlbVwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUubGluZUhlaWdodCA9IFwiMS4yXCI7XG4gICAgY29udGFpbmVyRWxlbWVudC5zdHlsZS53aGl0ZVNwYWNlID0gXCJwcmUtd3JhcFwiO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICB2YXIgaGVhZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGhlYWRlckVsZW1lbnQuaW5uZXJUZXh0ID0gXCJDb21waWxlZCB3aXRoIHByb2JsZW1zOlwiO1xuICAgIHZhciBjbG9zZUJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5pbm5lclRleHQgPSBcIlhcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSBcImJvbGRcIjtcbiAgICBjbG9zZUJ1dHRvbkVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgIGNsb3NlQnV0dG9uRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwicmlnaHRcIjsgLy8gQHRzLWlnbm9yZVxuXG4gICAgY2xvc2VCdXR0b25FbGVtZW50LnN0eWxlLnN0eWxlRmxvYXQgPSBcInJpZ2h0XCI7XG4gICAgY2xvc2VCdXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBoaWRlKCk7XG4gICAgfSk7XG4gICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChoZWFkZXJFbGVtZW50KTtcbiAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uRWxlbWVudCk7XG4gICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAvKiogQHR5cGUge0RvY3VtZW50fSAqL1xuXG4gICAgLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cbiAgICBpZnJhbWVDb250YWluZXJFbGVtZW50LmNvbnRlbnREb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIG9uTG9hZFF1ZXVlLmZvckVhY2goZnVuY3Rpb24gKG9uTG9hZCkge1xuICAgICAgb25Mb2FkKFxuICAgICAgLyoqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH0gKi9cbiAgICAgIGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIH0pO1xuICAgIG9uTG9hZFF1ZXVlID0gW107XG4gICAgLyoqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH0gKi9cblxuICAgIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQub25sb2FkID0gbnVsbDtcbiAgfTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZUNvbnRhaW5lckVsZW1lbnQpO1xufVxuLyoqXG4gKiBAcGFyYW0geyhlbGVtZW50OiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZH0gY2FsbGJhY2tcbiAqL1xuXG5cbmZ1bmN0aW9uIGVuc3VyZU92ZXJsYXlFeGlzdHMoY2FsbGJhY2spIHtcbiAgaWYgKGNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAvLyBFdmVyeXRoaW5nIGlzIHJlYWR5LCBjYWxsIHRoZSBjYWxsYmFjayByaWdodCBhd2F5LlxuICAgIGNhbGxiYWNrKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIG9uTG9hZFF1ZXVlLnB1c2goY2FsbGJhY2spO1xuXG4gIGlmIChpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY3JlYXRlQ29udGFpbmVyKCk7XG59IC8vIFN1Y2Nlc3NmdWwgY29tcGlsYXRpb24uXG5cblxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgaWYgKCFpZnJhbWVDb250YWluZXJFbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIENsZWFuIHVwIGFuZCByZXNldCBpbnRlcm5hbCBzdGF0ZS5cblxuXG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lQ29udGFpbmVyRWxlbWVudCk7XG4gIGlmcmFtZUNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuICBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcbn1cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7c3RyaW5nICB8IHsgZmlsZT86IHN0cmluZywgbW9kdWxlTmFtZT86IHN0cmluZywgbG9jPzogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nIH19IGl0ZW1cbiAqIEByZXR1cm5zIHt7IGhlYWRlcjogc3RyaW5nLCBib2R5OiBzdHJpbmcgfX1cbiAqL1xuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb2JsZW0odHlwZSwgaXRlbSkge1xuICB2YXIgaGVhZGVyID0gdHlwZSA9PT0gXCJ3YXJuaW5nXCIgPyBcIldBUk5JTkdcIiA6IFwiRVJST1JcIjtcbiAgdmFyIGJvZHkgPSBcIlwiO1xuXG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGJvZHkgKz0gaXRlbTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZmlsZSA9IGl0ZW0uZmlsZSB8fCBcIlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcblxuICAgIHZhciBtb2R1bGVOYW1lID0gaXRlbS5tb2R1bGVOYW1lID8gaXRlbS5tb2R1bGVOYW1lLmluZGV4T2YoXCIhXCIpICE9PSAtMSA/IFwiXCIuY29uY2F0KGl0ZW0ubW9kdWxlTmFtZS5yZXBsYWNlKC9eKFxcc3xcXFMpKiEvLCBcIlwiKSwgXCIgKFwiKS5jb25jYXQoaXRlbS5tb2R1bGVOYW1lLCBcIilcIikgOiBcIlwiLmNvbmNhdChpdGVtLm1vZHVsZU5hbWUpIDogXCJcIjtcbiAgICB2YXIgbG9jID0gaXRlbS5sb2M7XG4gICAgaGVhZGVyICs9IFwiXCIuY29uY2F0KG1vZHVsZU5hbWUgfHwgZmlsZSA/IFwiIGluIFwiLmNvbmNhdChtb2R1bGVOYW1lID8gXCJcIi5jb25jYXQobW9kdWxlTmFtZSkuY29uY2F0KGZpbGUgPyBcIiAoXCIuY29uY2F0KGZpbGUsIFwiKVwiKSA6IFwiXCIpIDogZmlsZSkuY29uY2F0KGxvYyA/IFwiIFwiLmNvbmNhdChsb2MpIDogXCJcIikgOiBcIlwiKTtcbiAgICBib2R5ICs9IGl0ZW0ubWVzc2FnZSB8fCBcIlwiO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXI6IGhlYWRlcixcbiAgICBib2R5OiBib2R5XG4gIH07XG59IC8vIENvbXBpbGF0aW9uIHdpdGggZXJyb3JzIChlLmcuIHN5bnRheCBlcnJvciBvciBtaXNzaW5nIG1vZHVsZXMpLlxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0FycmF5PHN0cmluZyAgfCB7IGZpbGU/OiBzdHJpbmcsIG1vZHVsZU5hbWU/OiBzdHJpbmcsIGxvYz86IHN0cmluZywgbWVzc2FnZT86IHN0cmluZyB9Pn0gbWVzc2FnZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIHNob3codHlwZSwgbWVzc2FnZXMpIHtcbiAgZW5zdXJlT3ZlcmxheUV4aXN0cyhmdW5jdGlvbiAoKSB7XG4gICAgbWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgdmFyIGVudHJ5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB2YXIgdHlwZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgICAgdmFyIF9mb3JtYXRQcm9ibGVtID0gZm9ybWF0UHJvYmxlbSh0eXBlLCBtZXNzYWdlKSxcbiAgICAgICAgICBoZWFkZXIgPSBfZm9ybWF0UHJvYmxlbS5oZWFkZXIsXG4gICAgICAgICAgYm9keSA9IF9mb3JtYXRQcm9ibGVtLmJvZHk7XG5cbiAgICAgIHR5cGVFbGVtZW50LmlubmVyVGV4dCA9IGhlYWRlcjtcbiAgICAgIHR5cGVFbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjXCIuY29uY2F0KGNvbG9ycy5yZWQpOyAvLyBNYWtlIGl0IGxvb2sgc2ltaWxhciB0byBvdXIgdGVybWluYWwuXG5cbiAgICAgIHZhciB0ZXh0ID0gYW5zaUhUTUwoZW5jb2RlKGJvZHkpKTtcbiAgICAgIHZhciBtZXNzYWdlVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbWVzc2FnZVRleHROb2RlLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQodHlwZUVsZW1lbnQpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgIGVudHJ5RWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlVGV4dE5vZGUpO1xuICAgICAgZW50cnlFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICBlbnRyeUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgIC8qKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9ICovXG5cbiAgICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoZW50cnlFbGVtZW50KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IGZvcm1hdFByb2JsZW0sIHNob3csIGhpZGUgfTsiLCIvKiBnbG9iYWwgX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gKi9cbmltcG9ydCBXZWJTb2NrZXRDbGllbnQgZnJvbSBcIi4vY2xpZW50cy9XZWJTb2NrZXRDbGllbnQuanNcIjtcbmltcG9ydCB7IGxvZyB9IGZyb20gXCIuL3V0aWxzL2xvZy5qc1wiOyAvLyB0aGlzIFdlYnNvY2tldENsaWVudCBpcyBoZXJlIGFzIGEgZGVmYXVsdCBmYWxsYmFjaywgaW4gY2FzZSB0aGUgY2xpZW50IGlzIG5vdCBpbmplY3RlZFxuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxudmFyIENsaWVudCA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxudHlwZW9mIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fICE9PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIF9fd2VicGFja19kZXZfc2VydmVyX2NsaWVudF9fLmRlZmF1bHQgIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfZGV2X3NlcnZlcl9jbGllbnRfXy5kZWZhdWx0IDogX193ZWJwYWNrX2Rldl9zZXJ2ZXJfY2xpZW50X18gOiBXZWJTb2NrZXRDbGllbnQ7XG4vKiBlc2xpbnQtZW5hYmxlIGNhbWVsY2FzZSAqL1xuXG52YXIgcmV0cmllcyA9IDA7XG52YXIgbWF4UmV0cmllcyA9IDEwO1xudmFyIGNsaWVudCA9IG51bGw7XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7eyBbaGFuZGxlcjogc3RyaW5nXTogKGRhdGE/OiBhbnksIHBhcmFtcz86IGFueSkgPT4gYW55IH19IGhhbmRsZXJzXG4gKiBAcGFyYW0ge251bWJlcn0gW3JlY29ubmVjdF1cbiAqL1xuXG52YXIgc29ja2V0ID0gZnVuY3Rpb24gaW5pdFNvY2tldCh1cmwsIGhhbmRsZXJzLCByZWNvbm5lY3QpIHtcbiAgY2xpZW50ID0gbmV3IENsaWVudCh1cmwpO1xuICBjbGllbnQub25PcGVuKGZ1bmN0aW9uICgpIHtcbiAgICByZXRyaWVzID0gMDtcblxuICAgIGlmICh0eXBlb2YgcmVjb25uZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBtYXhSZXRyaWVzID0gcmVjb25uZWN0O1xuICAgIH1cbiAgfSk7XG4gIGNsaWVudC5vbkNsb3NlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocmV0cmllcyA9PT0gMCkge1xuICAgICAgaGFuZGxlcnMuY2xvc2UoKTtcbiAgICB9IC8vIFRyeSB0byByZWNvbm5lY3QuXG5cblxuICAgIGNsaWVudCA9IG51bGw7IC8vIEFmdGVyIDEwIHJldHJpZXMgc3RvcCB0cnlpbmcsIHRvIHByZXZlbnQgbG9nc3BhbS5cblxuICAgIGlmIChyZXRyaWVzIDwgbWF4UmV0cmllcykge1xuICAgICAgLy8gRXhwb25lbnRpYWxseSBpbmNyZWFzZSB0aW1lb3V0IHRvIHJlY29ubmVjdC5cbiAgICAgIC8vIFJlc3BlY3RmdWxseSBjb3BpZWQgZnJvbSB0aGUgcGFja2FnZSBgZ290YC5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcbiAgICAgIHZhciByZXRyeUluTXMgPSAxMDAwICogTWF0aC5wb3coMiwgcmV0cmllcykgKyBNYXRoLnJhbmRvbSgpICogMTAwO1xuICAgICAgcmV0cmllcyArPSAxO1xuICAgICAgbG9nLmluZm8oXCJUcnlpbmcgdG8gcmVjb25uZWN0Li4uXCIpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNvY2tldCh1cmwsIGhhbmRsZXJzLCByZWNvbm5lY3QpO1xuICAgICAgfSwgcmV0cnlJbk1zKTtcbiAgICB9XG4gIH0pO1xuICBjbGllbnQub25NZXNzYWdlKFxuICAvKipcbiAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICovXG4gIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGRhdGEpO1xuXG4gICAgaWYgKGhhbmRsZXJzW21lc3NhZ2UudHlwZV0pIHtcbiAgICAgIGhhbmRsZXJzW21lc3NhZ2UudHlwZV0obWVzc2FnZS5kYXRhLCBtZXNzYWdlLnBhcmFtcyk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNvY2tldDsiLCIvKipcbiAqIEBwYXJhbSB7eyBwcm90b2NvbD86IHN0cmluZywgYXV0aD86IHN0cmluZywgaG9zdG5hbWU/OiBzdHJpbmcsIHBvcnQ/OiBzdHJpbmcsIHBhdGhuYW1lPzogc3RyaW5nLCBzZWFyY2g/OiBzdHJpbmcsIGhhc2g/OiBzdHJpbmcsIHNsYXNoZXM/OiBib29sZWFuIH19IG9ialVSTFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZm9ybWF0KG9ialVSTCkge1xuICB2YXIgcHJvdG9jb2wgPSBvYmpVUkwucHJvdG9jb2wgfHwgXCJcIjtcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gXCI6XCIpIHtcbiAgICBwcm90b2NvbCArPSBcIjpcIjtcbiAgfVxuXG4gIHZhciBhdXRoID0gb2JqVVJMLmF1dGggfHwgXCJcIjtcblxuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksIFwiOlwiKTtcbiAgICBhdXRoICs9IFwiQFwiO1xuICB9XG5cbiAgdmFyIGhvc3QgPSBcIlwiO1xuXG4gIGlmIChvYmpVUkwuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArIChvYmpVUkwuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgPT09IC0xID8gb2JqVVJMLmhvc3RuYW1lIDogXCJbXCIuY29uY2F0KG9ialVSTC5ob3N0bmFtZSwgXCJdXCIpKTtcblxuICAgIGlmIChvYmpVUkwucG9ydCkge1xuICAgICAgaG9zdCArPSBcIjpcIi5jb25jYXQob2JqVVJMLnBvcnQpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwYXRobmFtZSA9IG9ialVSTC5wYXRobmFtZSB8fCBcIlwiO1xuXG4gIGlmIChvYmpVUkwuc2xhc2hlcykge1xuICAgIGhvc3QgPSBcIi8vXCIuY29uY2F0KGhvc3QgfHwgXCJcIik7XG5cbiAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSBcIi9cIikge1xuICAgICAgcGF0aG5hbWUgPSBcIi9cIi5jb25jYXQocGF0aG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSBcIlwiO1xuICB9XG5cbiAgdmFyIHNlYXJjaCA9IG9ialVSTC5zZWFyY2ggfHwgXCJcIjtcblxuICBpZiAoc2VhcmNoICYmIHNlYXJjaC5jaGFyQXQoMCkgIT09IFwiP1wiKSB7XG4gICAgc2VhcmNoID0gXCI/XCIuY29uY2F0KHNlYXJjaCk7XG4gIH1cblxuICB2YXIgaGFzaCA9IG9ialVSTC5oYXNoIHx8IFwiXCI7XG5cbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09IFwiI1wiKSB7XG4gICAgaGFzaCA9IFwiI1wiLmNvbmNhdChoYXNoKTtcbiAgfVxuXG4gIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZSgvWz8jXS9nLFxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1hdGNoXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcbiAgfSk7XG4gIHNlYXJjaCA9IHNlYXJjaC5yZXBsYWNlKFwiI1wiLCBcIiUyM1wiKTtcbiAgcmV0dXJuIFwiXCIuY29uY2F0KHByb3RvY29sKS5jb25jYXQoaG9zdCkuY29uY2F0KHBhdGhuYW1lKS5jb25jYXQoc2VhcmNoKS5jb25jYXQoaGFzaCk7XG59XG4vKipcbiAqIEBwYXJhbSB7VVJMICYgeyBmcm9tQ3VycmVudFNjcmlwdD86IGJvb2xlYW4gfX0gcGFyc2VkVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlU29ja2V0VVJMKHBhcnNlZFVSTCkge1xuICB2YXIgaG9zdG5hbWUgPSBwYXJzZWRVUkwuaG9zdG5hbWU7IC8vIE5vZGUuanMgbW9kdWxlIHBhcnNlcyBpdCBhcyBgOjpgXG4gIC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxTdHJpbmddKWAgcGFyc2VzIGl0IGFzICdbOjpdJ1xuXG4gIHZhciBpc0luQWRkckFueSA9IGhvc3RuYW1lID09PSBcIjAuMC4wLjBcIiB8fCBob3N0bmFtZSA9PT0gXCI6OlwiIHx8IGhvc3RuYW1lID09PSBcIls6Ol1cIjsgLy8gd2h5IGRvIHdlIG5lZWQgdGhpcyBjaGVjaz9cbiAgLy8gaG9zdG5hbWUgbi9hIGZvciBmaWxlIHByb3RvY29sIChleGFtcGxlLCB3aGVuIHVzaW5nIGVsZWN0cm9uLCBpb25pYylcbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrLWRldi1zZXJ2ZXIvcHVsbC8zODRcblxuICBpZiAoaXNJbkFkZHJBbnkgJiYgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSAmJiBzZWxmLmxvY2F0aW9uLnByb3RvY29sLmluZGV4T2YoXCJodHRwXCIpID09PSAwKSB7XG4gICAgaG9zdG5hbWUgPSBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lO1xuICB9XG5cbiAgdmFyIHNvY2tldFVSTFByb3RvY29sID0gcGFyc2VkVVJMLnByb3RvY29sIHx8IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7IC8vIFdoZW4gaHR0cHMgaXMgdXNlZCBpbiB0aGUgYXBwLCBzZWN1cmUgd2ViIHNvY2tldHMgYXJlIGFsd2F5cyBuZWNlc3NhcnkgYmVjYXVzZSB0aGUgYnJvd3NlciBkb2Vzbid0IGFjY2VwdCBub24tc2VjdXJlIHdlYiBzb2NrZXRzLlxuXG4gIGlmIChzb2NrZXRVUkxQcm90b2NvbCA9PT0gXCJhdXRvOlwiIHx8IGhvc3RuYW1lICYmIGlzSW5BZGRyQW55ICYmIHNlbGYubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpIHtcbiAgICBzb2NrZXRVUkxQcm90b2NvbCA9IHNlbGYubG9jYXRpb24ucHJvdG9jb2w7XG4gIH1cblxuICBzb2NrZXRVUkxQcm90b2NvbCA9IHNvY2tldFVSTFByb3RvY29sLnJlcGxhY2UoL14oPzpodHRwfC4rLWV4dGVuc2lvbnxmaWxlKS9pLCBcIndzXCIpO1xuICB2YXIgc29ja2V0VVJMQXV0aCA9IFwiXCI7IC8vIGBuZXcgVVJMKHVybFN0cmluZywgW2Jhc2VVUkxzdHJpbmddKWAgZG9lc24ndCBoYXZlIGBhdXRoYCBwcm9wZXJ0eVxuICAvLyBQYXJzZSBhdXRoZW50aWNhdGlvbiBjcmVkZW50aWFscyBpbiBjYXNlIHdlIG5lZWQgdGhlbVxuXG4gIGlmIChwYXJzZWRVUkwudXNlcm5hbWUpIHtcbiAgICBzb2NrZXRVUkxBdXRoID0gcGFyc2VkVVJMLnVzZXJuYW1lOyAvLyBTaW5jZSBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uIGRvZXMgbm90IGFsbG93IGVtcHR5IHVzZXJuYW1lLFxuICAgIC8vIHdlIG9ubHkgaW5jbHVkZSBwYXNzd29yZCBpZiB0aGUgdXNlcm5hbWUgaXMgbm90IGVtcHR5LlxuXG4gICAgaWYgKHBhcnNlZFVSTC5wYXNzd29yZCkge1xuICAgICAgLy8gUmVzdWx0OiA8dXNlcm5hbWU+OjxwYXNzd29yZD5cbiAgICAgIHNvY2tldFVSTEF1dGggPSBzb2NrZXRVUkxBdXRoLmNvbmNhdChcIjpcIiwgcGFyc2VkVVJMLnBhc3N3b3JkKTtcbiAgICB9XG4gIH0gLy8gSW4gY2FzZSB0aGUgaG9zdCBpcyBhIHJhdyBJUHY2IGFkZHJlc3MsIGl0IGNhbiBiZSBlbmNsb3NlZCBpblxuICAvLyB0aGUgYnJhY2tldHMgYXMgdGhlIGJyYWNrZXRzIGFyZSBuZWVkZWQgaW4gdGhlIGZpbmFsIFVSTCBzdHJpbmcuXG4gIC8vIE5lZWQgdG8gcmVtb3ZlIHRob3NlIGFzIHVybC5mb3JtYXQgYmxpbmRseSBhZGRzIGl0cyBvd24gc2V0IG9mIGJyYWNrZXRzXG4gIC8vIGlmIHRoZSBob3N0IHN0cmluZyBjb250YWlucyBjb2xvbnMuIFRoYXQgd291bGQgbGVhZCB0byBub24td29ya2luZ1xuICAvLyBkb3VibGUgYnJhY2tldHMgKGUuZy4gW1s6Ol1dKSBob3N0XG4gIC8vXG4gIC8vIEFsbCBvZiB0aGVzZSB3ZWIgc29ja2V0IHVybCBwYXJhbXMgYXJlIG9wdGlvbmFsbHkgcGFzc2VkIGluIHRocm91Z2ggcmVzb3VyY2VRdWVyeSxcbiAgLy8gc28gd2UgbmVlZCB0byBmYWxsIGJhY2sgdG8gdGhlIGRlZmF1bHQgaWYgdGhleSBhcmUgbm90IHByb3ZpZGVkXG5cblxuICB2YXIgc29ja2V0VVJMSG9zdG5hbWUgPSAoaG9zdG5hbWUgfHwgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSB8fCBcImxvY2FsaG9zdFwiKS5yZXBsYWNlKC9eXFxbKC4qKVxcXSQvLCBcIiQxXCIpO1xuICB2YXIgc29ja2V0VVJMUG9ydCA9IHBhcnNlZFVSTC5wb3J0O1xuXG4gIGlmICghc29ja2V0VVJMUG9ydCB8fCBzb2NrZXRVUkxQb3J0ID09PSBcIjBcIikge1xuICAgIHNvY2tldFVSTFBvcnQgPSBzZWxmLmxvY2F0aW9uLnBvcnQ7XG4gIH0gLy8gSWYgcGF0aCBpcyBwcm92aWRlZCBpdCdsbCBiZSBwYXNzZWQgaW4gdmlhIHRoZSByZXNvdXJjZVF1ZXJ5IGFzIGFcbiAgLy8gcXVlcnkgcGFyYW0gc28gaXQgaGFzIHRvIGJlIHBhcnNlZCBvdXQgb2YgdGhlIHF1ZXJ5c3RyaW5nIGluIG9yZGVyIGZvciB0aGVcbiAgLy8gY2xpZW50IHRvIG9wZW4gdGhlIHNvY2tldCB0byB0aGUgY29ycmVjdCBsb2NhdGlvbi5cblxuXG4gIHZhciBzb2NrZXRVUkxQYXRobmFtZSA9IFwiL3dzXCI7XG5cbiAgaWYgKHBhcnNlZFVSTC5wYXRobmFtZSAmJiAhcGFyc2VkVVJMLmZyb21DdXJyZW50U2NyaXB0KSB7XG4gICAgc29ja2V0VVJMUGF0aG5hbWUgPSBwYXJzZWRVUkwucGF0aG5hbWU7XG4gIH1cblxuICByZXR1cm4gZm9ybWF0KHtcbiAgICBwcm90b2NvbDogc29ja2V0VVJMUHJvdG9jb2wsXG4gICAgYXV0aDogc29ja2V0VVJMQXV0aCxcbiAgICBob3N0bmFtZTogc29ja2V0VVJMSG9zdG5hbWUsXG4gICAgcG9ydDogc29ja2V0VVJMUG9ydCxcbiAgICBwYXRobmFtZTogc29ja2V0VVJMUGF0aG5hbWUsXG4gICAgc2xhc2hlczogdHJ1ZVxuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU29ja2V0VVJMOyIsIi8qKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSgpIHtcbiAgLy8gYGRvY3VtZW50LmN1cnJlbnRTY3JpcHRgIGlzIHRoZSBtb3N0IGFjY3VyYXRlIHdheSB0byBmaW5kIHRoZSBjdXJyZW50IHNjcmlwdCxcbiAgLy8gYnV0IGlzIG5vdCBzdXBwb3J0ZWQgaW4gYWxsIGJyb3dzZXJzLlxuICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcInNyY1wiKTtcbiAgfSAvLyBGYWxsYmFjayB0byBnZXR0aW5nIGFsbCBzY3JpcHRzIHJ1bm5pbmcgaW4gdGhlIGRvY3VtZW50LlxuXG5cbiAgdmFyIHNjcmlwdEVsZW1lbnRzID0gZG9jdW1lbnQuc2NyaXB0cyB8fCBbXTtcbiAgdmFyIHNjcmlwdEVsZW1lbnRzV2l0aFNyYyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChzY3JpcHRFbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0pO1xuXG4gIGlmIChzY3JpcHRFbGVtZW50c1dpdGhTcmMubGVuZ3RoID4gMCkge1xuICAgIHZhciBjdXJyZW50U2NyaXB0ID0gc2NyaXB0RWxlbWVudHNXaXRoU3JjW3NjcmlwdEVsZW1lbnRzV2l0aFNyYy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gIH0gLy8gRmFpbCBhcyB0aGVyZSB3YXMgbm8gc2NyaXB0IHRvIHVzZS5cblxuXG4gIHRocm93IG5ldyBFcnJvcihcIlt3ZWJwYWNrLWRldi1zZXJ2ZXJdIEZhaWxlZCB0byBnZXQgY3VycmVudCBzY3JpcHQgc291cmNlLlwiKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZTsiLCJpbXBvcnQgbG9nZ2VyIGZyb20gXCIuLi9tb2R1bGVzL2xvZ2dlci9pbmRleC5qc1wiO1xudmFyIG5hbWUgPSBcIndlYnBhY2stZGV2LXNlcnZlclwiOyAvLyBkZWZhdWx0IGxldmVsIGlzIHNldCBvbiB0aGUgY2xpZW50IHNpZGUsIHNvIGl0IGRvZXMgbm90IG5lZWRcbi8vIHRvIGJlIHNldCBieSB0aGUgQ0xJIG9yIEFQSVxuXG52YXIgZGVmYXVsdExldmVsID0gXCJpbmZvXCI7IC8vIG9wdGlvbnMgbmV3IG9wdGlvbnMsIG1lcmdlIHdpdGggb2xkIG9wdGlvbnNcblxuLyoqXG4gKiBAcGFyYW0ge2ZhbHNlIHwgdHJ1ZSB8IFwibm9uZVwiIHwgXCJlcnJvclwiIHwgXCJ3YXJuXCIgfCBcImluZm9cIiB8IFwibG9nXCIgfCBcInZlcmJvc2VcIn0gbGV2ZWxcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5cbmZ1bmN0aW9uIHNldExvZ0xldmVsKGxldmVsKSB7XG4gIGxvZ2dlci5jb25maWd1cmVEZWZhdWx0TG9nZ2VyKHtcbiAgICBsZXZlbDogbGV2ZWxcbiAgfSk7XG59XG5cbnNldExvZ0xldmVsKGRlZmF1bHRMZXZlbCk7XG52YXIgbG9nID0gbG9nZ2VyLmdldExvZ2dlcihuYW1lKTtcbmV4cG9ydCB7IGxvZywgc2V0TG9nTGV2ZWwgfTsiLCJpbXBvcnQgZ2V0Q3VycmVudFNjcmlwdFNvdXJjZSBmcm9tIFwiLi9nZXRDdXJyZW50U2NyaXB0U291cmNlLmpzXCI7XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZVF1ZXJ5XG4gKiBAcmV0dXJucyB7eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBib29sZWFuIH19XG4gKi9cblxuZnVuY3Rpb24gcGFyc2VVUkwocmVzb3VyY2VRdWVyeSkge1xuICAvKiogQHR5cGUge3sgW2tleTogc3RyaW5nXTogc3RyaW5nIH19ICovXG4gIHZhciBvcHRpb25zID0ge307XG5cbiAgaWYgKHR5cGVvZiByZXNvdXJjZVF1ZXJ5ID09PSBcInN0cmluZ1wiICYmIHJlc291cmNlUXVlcnkgIT09IFwiXCIpIHtcbiAgICB2YXIgc2VhcmNoUGFyYW1zID0gcmVzb3VyY2VRdWVyeS5zdWJzdHIoMSkuc3BsaXQoXCImXCIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWFyY2hQYXJhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwYWlyID0gc2VhcmNoUGFyYW1zW2ldLnNwbGl0KFwiPVwiKTtcbiAgICAgIG9wdGlvbnNbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEVsc2UsIGdldCB0aGUgdXJsIGZyb20gdGhlIDxzY3JpcHQ+IHRoaXMgZmlsZSB3YXMgY2FsbGVkIHdpdGguXG4gICAgdmFyIHNjcmlwdFNvdXJjZSA9IGdldEN1cnJlbnRTY3JpcHRTb3VyY2UoKTtcbiAgICB2YXIgc2NyaXB0U291cmNlVVJMO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIFRoZSBwbGFjZWhvbGRlciBgYmFzZVVSTGAgd2l0aCBgd2luZG93LmxvY2F0aW9uLmhyZWZgLFxuICAgICAgLy8gaXMgdG8gYWxsb3cgcGFyc2luZyBvZiBwYXRoLXJlbGF0aXZlIG9yIHByb3RvY29sLXJlbGF0aXZlIFVSTHMsXG4gICAgICAvLyBhbmQgd2lsbCBoYXZlIG5vIGVmZmVjdCBpZiBgc2NyaXB0U291cmNlYCBpcyBhIGZ1bGx5IHZhbGlkIFVSTC5cbiAgICAgIHNjcmlwdFNvdXJjZVVSTCA9IG5ldyBVUkwoc2NyaXB0U291cmNlLCBzZWxmLmxvY2F0aW9uLmhyZWYpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7Ly8gVVJMIHBhcnNpbmcgZmFpbGVkLCBkbyBub3RoaW5nLlxuICAgICAgLy8gV2Ugd2lsbCBzdGlsbCBwcm9jZWVkIHRvIHNlZSBpZiB3ZSBjYW4gcmVjb3ZlciB1c2luZyBgcmVzb3VyY2VRdWVyeWBcbiAgICB9XG5cbiAgICBpZiAoc2NyaXB0U291cmNlVVJMKSB7XG4gICAgICBvcHRpb25zID0gc2NyaXB0U291cmNlVVJMO1xuICAgICAgb3B0aW9ucy5mcm9tQ3VycmVudFNjcmlwdCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlVVJMOyIsImltcG9ydCBob3RFbWl0dGVyIGZyb20gXCJ3ZWJwYWNrL2hvdC9lbWl0dGVyLmpzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiLi9sb2cuanNcIjtcbi8qKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vaW5kZXhcIikuT3B0aW9uc30gT3B0aW9uc1xuLyoqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9pbmRleFwiKS5TdGF0dXN9IFN0YXR1c1xuXG4vKipcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9uc1xuICogQHBhcmFtIHtTdGF0dXN9IHN0YXR1c1xuICovXG5cbmZ1bmN0aW9uIHJlbG9hZEFwcChfcmVmLCBzdGF0dXMpIHtcbiAgdmFyIGhvdCA9IF9yZWYuaG90LFxuICAgICAgbGl2ZVJlbG9hZCA9IF9yZWYubGl2ZVJlbG9hZDtcblxuICBpZiAoc3RhdHVzLmlzVW5sb2FkaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRIYXNoID0gc3RhdHVzLmN1cnJlbnRIYXNoLFxuICAgICAgcHJldmlvdXNIYXNoID0gc3RhdHVzLnByZXZpb3VzSGFzaDtcbiAgdmFyIGlzSW5pdGlhbCA9IGN1cnJlbnRIYXNoLmluZGV4T2YoXG4gIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICBwcmV2aW91c0hhc2gpID49IDA7XG5cbiAgaWYgKGlzSW5pdGlhbCkge1xuICAgIHJldHVybjtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtXaW5kb3d9IHJvb3RXaW5kb3dcbiAgICogQHBhcmFtIHtudW1iZXJ9IGludGVydmFsSWRcbiAgICovXG5cblxuICBmdW5jdGlvbiBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICBsb2cuaW5mbyhcIkFwcCB1cGRhdGVkLiBSZWxvYWRpbmcuLi5cIik7XG4gICAgcm9vdFdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSBzZWxmLmxvY2F0aW9uLnNlYXJjaC50b0xvd2VyQ2FzZSgpO1xuICB2YXIgYWxsb3dUb0hvdCA9IHNlYXJjaC5pbmRleE9mKFwid2VicGFjay1kZXYtc2VydmVyLWhvdD1mYWxzZVwiKSA9PT0gLTE7XG4gIHZhciBhbGxvd1RvTGl2ZVJlbG9hZCA9IHNlYXJjaC5pbmRleE9mKFwid2VicGFjay1kZXYtc2VydmVyLWxpdmUtcmVsb2FkPWZhbHNlXCIpID09PSAtMTtcblxuICBpZiAoaG90ICYmIGFsbG93VG9Ib3QpIHtcbiAgICBsb2cuaW5mbyhcIkFwcCBob3QgdXBkYXRlLi4uXCIpO1xuICAgIGhvdEVtaXR0ZXIuZW1pdChcIndlYnBhY2tIb3RVcGRhdGVcIiwgc3RhdHVzLmN1cnJlbnRIYXNoKTtcblxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLndpbmRvdykge1xuICAgICAgLy8gYnJvYWRjYXN0IHVwZGF0ZSB0byB3aW5kb3dcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoXCJ3ZWJwYWNrSG90VXBkYXRlXCIuY29uY2F0KHN0YXR1cy5jdXJyZW50SGFzaCksIFwiKlwiKTtcbiAgICB9XG4gIH0gLy8gYWxsb3cgcmVmcmVzaGluZyB0aGUgcGFnZSBvbmx5IGlmIGxpdmVSZWxvYWQgaXNuJ3QgZGlzYWJsZWRcbiAgZWxzZSBpZiAobGl2ZVJlbG9hZCAmJiBhbGxvd1RvTGl2ZVJlbG9hZCkge1xuICAgIHZhciByb290V2luZG93ID0gc2VsZjsgLy8gdXNlIHBhcmVudCB3aW5kb3cgZm9yIHJlbG9hZCAoaW4gY2FzZSB3ZSdyZSBpbiBhbiBpZnJhbWUgd2l0aCBubyB2YWxpZCBzcmMpXG5cbiAgICB2YXIgaW50ZXJ2YWxJZCA9IHNlbGYuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHJvb3RXaW5kb3cubG9jYXRpb24ucHJvdG9jb2wgIT09IFwiYWJvdXQ6XCIpIHtcbiAgICAgICAgLy8gcmVsb2FkIGltbWVkaWF0ZWx5IGlmIHByb3RvY29sIGlzIHZhbGlkXG4gICAgICAgIGFwcGx5UmVsb2FkKHJvb3RXaW5kb3csIGludGVydmFsSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdFdpbmRvdyA9IHJvb3RXaW5kb3cucGFyZW50O1xuXG4gICAgICAgIGlmIChyb290V2luZG93LnBhcmVudCA9PT0gcm9vdFdpbmRvdykge1xuICAgICAgICAgIC8vIGlmIHBhcmVudCBlcXVhbHMgY3VycmVudCB3aW5kb3cgd2UndmUgcmVhY2hlZCB0aGUgcm9vdCB3aGljaCB3b3VsZCBjb250aW51ZSBmb3JldmVyLCBzbyB0cmlnZ2VyIGEgcmVsb2FkIGFueXdheXNcbiAgICAgICAgICBhcHBseVJlbG9hZChyb290V2luZG93LCBpbnRlcnZhbElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlbG9hZEFwcDsiLCIvKiBnbG9iYWwgX19yZXNvdXJjZVF1ZXJ5IFdvcmtlckdsb2JhbFNjb3BlICovXG4vLyBTZW5kIG1lc3NhZ2VzIHRvIHRoZSBvdXRzaWRlLCBzbyBwbHVnaW5zIGNhbiBjb25zdW1lIGl0LlxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge2FueX0gW2RhdGFdXG4gKi9cbmZ1bmN0aW9uIHNlbmRNc2codHlwZSwgZGF0YSkge1xuICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSkpKSB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiBcIndlYnBhY2tcIi5jb25jYXQodHlwZSksXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSwgXCIqXCIpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNlbmRNc2c7IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8qIGdsb2JhbHMgX193ZWJwYWNrX2hhc2hfXyAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcblx0LyoqIEB0eXBlIHt1bmRlZmluZWR8c3RyaW5nfSAqL1xuXHR2YXIgbGFzdEhhc2g7XG5cdHZhciB1cFRvRGF0ZSA9IGZ1bmN0aW9uIHVwVG9EYXRlKCkge1xuXHRcdHJldHVybiAvKiogQHR5cGUge3N0cmluZ30gKi8gKGxhc3RIYXNoKS5pbmRleE9mKF9fd2VicGFja19oYXNoX18pID49IDA7XG5cdH07XG5cdHZhciBsb2cgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5cdHZhciBjaGVjayA9IGZ1bmN0aW9uIGNoZWNrKCkge1xuXHRcdG1vZHVsZS5ob3Rcblx0XHRcdC5jaGVjayh0cnVlKVxuXHRcdFx0LnRoZW4oZnVuY3Rpb24gKHVwZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdGlmICghdXBkYXRlZE1vZHVsZXMpIHtcblx0XHRcdFx0XHRsb2coXG5cdFx0XHRcdFx0XHRcIndhcm5pbmdcIixcblx0XHRcdFx0XHRcdFwiW0hNUl0gQ2Fubm90IGZpbmQgdXBkYXRlLiBcIiArXG5cdFx0XHRcdFx0XHRcdCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiXG5cdFx0XHRcdFx0XHRcdFx0PyBcIk5lZWQgdG8gZG8gYSBmdWxsIHJlbG9hZCFcIlxuXHRcdFx0XHRcdFx0XHRcdDogXCJQbGVhc2UgcmVsb2FkIG1hbnVhbGx5IVwiKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0bG9nKFxuXHRcdFx0XHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcdFx0XHRcIltITVJdIChQcm9iYWJseSBiZWNhdXNlIG9mIHJlc3RhcnRpbmcgdGhlIHdlYnBhY2stZGV2LXNlcnZlcilcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF1cFRvRGF0ZSgpKSB7XG5cdFx0XHRcdFx0Y2hlY2soKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlcXVpcmUoXCIuL2xvZy1hcHBseS1yZXN1bHRcIikodXBkYXRlZE1vZHVsZXMsIHVwZGF0ZWRNb2R1bGVzKTtcblxuXHRcdFx0XHRpZiAodXBUb0RhdGUoKSkge1xuXHRcdFx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBBcHAgaXMgdXAgdG8gZGF0ZS5cIik7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0gbW9kdWxlLmhvdC5zdGF0dXMoKTtcblx0XHRcdFx0aWYgKFtcImFib3J0XCIsIFwiZmFpbFwiXS5pbmRleE9mKHN0YXR1cykgPj0gMCkge1xuXHRcdFx0XHRcdGxvZyhcblx0XHRcdFx0XHRcdFwid2FybmluZ1wiLFxuXHRcdFx0XHRcdFx0XCJbSE1SXSBDYW5ub3QgYXBwbHkgdXBkYXRlLiBcIiArXG5cdFx0XHRcdFx0XHRcdCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiXG5cdFx0XHRcdFx0XHRcdFx0PyBcIk5lZWQgdG8gZG8gYSBmdWxsIHJlbG9hZCFcIlxuXHRcdFx0XHRcdFx0XHRcdDogXCJQbGVhc2UgcmVsb2FkIG1hbnVhbGx5IVwiKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0bG9nKFwid2FybmluZ1wiLCBcIltITVJdIFwiICsgbG9nLmZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHRcdGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSBVcGRhdGUgZmFpbGVkOiBcIiArIGxvZy5mb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH07XG5cdHZhciBob3RFbWl0dGVyID0gcmVxdWlyZShcIi4vZW1pdHRlclwiKTtcblx0aG90RW1pdHRlci5vbihcIndlYnBhY2tIb3RVcGRhdGVcIiwgZnVuY3Rpb24gKGN1cnJlbnRIYXNoKSB7XG5cdFx0bGFzdEhhc2ggPSBjdXJyZW50SGFzaDtcblx0XHRpZiAoIXVwVG9EYXRlKCkgJiYgbW9kdWxlLmhvdC5zdGF0dXMoKSA9PT0gXCJpZGxlXCIpIHtcblx0XHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBDaGVja2luZyBmb3IgdXBkYXRlcyBvbiB0aGUgc2VydmVyLi4uXCIpO1xuXHRcdFx0Y2hlY2soKTtcblx0XHR9XG5cdH0pO1xuXHRsb2coXCJpbmZvXCIsIFwiW0hNUl0gV2FpdGluZyBmb3IgdXBkYXRlIHNpZ25hbCBmcm9tIFdEUy4uLlwiKTtcbn0gZWxzZSB7XG5cdHRocm93IG5ldyBFcnJvcihcIltITVJdIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgZGlzYWJsZWQuXCIpO1xufVxuIiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbi8qKlxuICogQHBhcmFtIHsoc3RyaW5nIHwgbnVtYmVyKVtdfSB1cGRhdGVkTW9kdWxlcyB1cGRhdGVkIG1vZHVsZXNcbiAqIEBwYXJhbSB7KHN0cmluZyB8IG51bWJlcilbXSB8IG51bGx9IHJlbmV3ZWRNb2R1bGVzIHJlbmV3ZWQgbW9kdWxlc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cGRhdGVkTW9kdWxlcywgcmVuZXdlZE1vZHVsZXMpIHtcblx0dmFyIHVuYWNjZXB0ZWRNb2R1bGVzID0gdXBkYXRlZE1vZHVsZXMuZmlsdGVyKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdHJldHVybiByZW5ld2VkTW9kdWxlcyAmJiByZW5ld2VkTW9kdWxlcy5pbmRleE9mKG1vZHVsZUlkKSA8IDA7XG5cdH0pO1xuXHR2YXIgbG9nID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuXG5cdGlmICh1bmFjY2VwdGVkTW9kdWxlcy5sZW5ndGggPiAwKSB7XG5cdFx0bG9nKFxuXHRcdFx0XCJ3YXJuaW5nXCIsXG5cdFx0XHRcIltITVJdIFRoZSBmb2xsb3dpbmcgbW9kdWxlcyBjb3VsZG4ndCBiZSBob3QgdXBkYXRlZDogKFRoZXkgd291bGQgbmVlZCBhIGZ1bGwgcmVsb2FkISlcIlxuXHRcdCk7XG5cdFx0dW5hY2NlcHRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdGxvZyhcIndhcm5pbmdcIiwgXCJbSE1SXSAgLSBcIiArIG1vZHVsZUlkKTtcblx0XHR9KTtcblx0fVxuXG5cdGlmICghcmVuZXdlZE1vZHVsZXMgfHwgcmVuZXdlZE1vZHVsZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdIE5vdGhpbmcgaG90IHVwZGF0ZWQuXCIpO1xuXHR9IGVsc2Uge1xuXHRcdGxvZyhcImluZm9cIiwgXCJbSE1SXSBVcGRhdGVkIG1vZHVsZXM6XCIpO1xuXHRcdHJlbmV3ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRpZiAodHlwZW9mIG1vZHVsZUlkID09PSBcInN0cmluZ1wiICYmIG1vZHVsZUlkLmluZGV4T2YoXCIhXCIpICE9PSAtMSkge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBtb2R1bGVJZC5zcGxpdChcIiFcIik7XG5cdFx0XHRcdGxvZy5ncm91cENvbGxhcHNlZChcImluZm9cIiwgXCJbSE1SXSAgLSBcIiArIHBhcnRzLnBvcCgpKTtcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdFx0XHRsb2cuZ3JvdXBFbmQoXCJpbmZvXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bG9nKFwiaW5mb1wiLCBcIltITVJdICAtIFwiICsgbW9kdWxlSWQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHZhciBudW1iZXJJZHMgPSByZW5ld2VkTW9kdWxlcy5ldmVyeShmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdHJldHVybiB0eXBlb2YgbW9kdWxlSWQgPT09IFwibnVtYmVyXCI7XG5cdFx0fSk7XG5cdFx0aWYgKG51bWJlcklkcylcblx0XHRcdGxvZyhcblx0XHRcdFx0XCJpbmZvXCIsXG5cdFx0XHRcdCdbSE1SXSBDb25zaWRlciB1c2luZyB0aGUgb3B0aW1pemF0aW9uLm1vZHVsZUlkczogXCJuYW1lZFwiIGZvciBtb2R1bGUgbmFtZXMuJ1xuXHRcdFx0KTtcblx0fVxufTtcbiIsIi8qKiBAdHlwZWRlZiB7XCJpbmZvXCIgfCBcIndhcm5pbmdcIiB8IFwiZXJyb3JcIn0gTG9nTGV2ZWwgKi9cblxuLyoqIEB0eXBlIHtMb2dMZXZlbH0gKi9cbnZhciBsb2dMZXZlbCA9IFwiaW5mb1wiO1xuXG5mdW5jdGlvbiBkdW1teSgpIHt9XG5cbi8qKlxuICogQHBhcmFtIHtMb2dMZXZlbH0gbGV2ZWwgbG9nIGxldmVsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSwgaWYgc2hvdWxkIGxvZ1xuICovXG5mdW5jdGlvbiBzaG91bGRMb2cobGV2ZWwpIHtcblx0dmFyIHNob3VsZExvZyA9XG5cdFx0KGxvZ0xldmVsID09PSBcImluZm9cIiAmJiBsZXZlbCA9PT0gXCJpbmZvXCIpIHx8XG5cdFx0KFtcImluZm9cIiwgXCJ3YXJuaW5nXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwid2FybmluZ1wiKSB8fFxuXHRcdChbXCJpbmZvXCIsIFwid2FybmluZ1wiLCBcImVycm9yXCJdLmluZGV4T2YobG9nTGV2ZWwpID49IDAgJiYgbGV2ZWwgPT09IFwiZXJyb3JcIik7XG5cdHJldHVybiBzaG91bGRMb2c7XG59XG5cbi8qKlxuICogQHBhcmFtIHsobXNnPzogc3RyaW5nKSA9PiB2b2lkfSBsb2dGbiBsb2cgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsobGV2ZWw6IExvZ0xldmVsLCBtc2c/OiBzdHJpbmcpID0+IHZvaWR9IGZ1bmN0aW9uIHRoYXQgbG9ncyB3aGVuIGxvZyBsZXZlbCBpcyBzdWZmaWNpZW50XG4gKi9cbmZ1bmN0aW9uIGxvZ0dyb3VwKGxvZ0ZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAobGV2ZWwsIG1zZykge1xuXHRcdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0XHRsb2dGbihtc2cpO1xuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0xvZ0xldmVsfSBsZXZlbCBsb2cgbGV2ZWxcbiAqIEBwYXJhbSB7c3RyaW5nfEVycm9yfSBtc2cgbWVzc2FnZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsZXZlbCwgbXNnKSB7XG5cdGlmIChzaG91bGRMb2cobGV2ZWwpKSB7XG5cdFx0aWYgKGxldmVsID09PSBcImluZm9cIikge1xuXHRcdFx0Y29uc29sZS5sb2cobXNnKTtcblx0XHR9IGVsc2UgaWYgKGxldmVsID09PSBcIndhcm5pbmdcIikge1xuXHRcdFx0Y29uc29sZS53YXJuKG1zZyk7XG5cdFx0fSBlbHNlIGlmIChsZXZlbCA9PT0gXCJlcnJvclwiKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKG1zZyk7XG5cdFx0fVxuXHR9XG59O1xuXG52YXIgZ3JvdXAgPSBjb25zb2xlLmdyb3VwIHx8IGR1bW15O1xudmFyIGdyb3VwQ29sbGFwc2VkID0gY29uc29sZS5ncm91cENvbGxhcHNlZCB8fCBkdW1teTtcbnZhciBncm91cEVuZCA9IGNvbnNvbGUuZ3JvdXBFbmQgfHwgZHVtbXk7XG5cbm1vZHVsZS5leHBvcnRzLmdyb3VwID0gbG9nR3JvdXAoZ3JvdXApO1xuXG5tb2R1bGUuZXhwb3J0cy5ncm91cENvbGxhcHNlZCA9IGxvZ0dyb3VwKGdyb3VwQ29sbGFwc2VkKTtcblxubW9kdWxlLmV4cG9ydHMuZ3JvdXBFbmQgPSBsb2dHcm91cChncm91cEVuZCk7XG5cbi8qKlxuICogQHBhcmFtIHtMb2dMZXZlbH0gbGV2ZWwgbG9nIGxldmVsXG4gKi9cbm1vZHVsZS5leHBvcnRzLnNldExvZ0xldmVsID0gZnVuY3Rpb24gKGxldmVsKSB7XG5cdGxvZ0xldmVsID0gbGV2ZWw7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7RXJyb3J9IGVyciBlcnJvclxuICogQHJldHVybnMge3N0cmluZ30gZm9ybWF0dGVkIGVycm9yXG4gKi9cbm1vZHVsZS5leHBvcnRzLmZvcm1hdEVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHR2YXIgbWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuXHR2YXIgc3RhY2sgPSBlcnIuc3RhY2s7XG5cdGlmICghc3RhY2spIHtcblx0XHRyZXR1cm4gbWVzc2FnZTtcblx0fSBlbHNlIGlmIChzdGFjay5pbmRleE9mKG1lc3NhZ2UpIDwgMCkge1xuXHRcdHJldHVybiBtZXNzYWdlICsgXCJcXG5cIiArIHN0YWNrO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBzdGFjaztcblx0fVxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0dmFyIGV4ZWNPcHRpb25zID0geyBpZDogbW9kdWxlSWQsIG1vZHVsZTogbW9kdWxlLCBmYWN0b3J5OiBfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSwgcmVxdWlyZTogX193ZWJwYWNrX3JlcXVpcmVfXyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7IGhhbmRsZXIoZXhlY09wdGlvbnMpOyB9KTtcblx0bW9kdWxlID0gZXhlY09wdGlvbnMubW9kdWxlO1xuXHRleGVjT3B0aW9ucy5mYWN0b3J5LmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGV4ZWNPcHRpb25zLnJlcXVpcmUpO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX187XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGV4ZWN1dGlvbiBpbnRlcmNlcHRvclxuX193ZWJwYWNrX3JlcXVpcmVfXy5pID0gW107XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5odSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYgPSAoKSA9PiAoXCJtYWluLlwiICsgX193ZWJwYWNrX3JlcXVpcmVfXy5oKCkgKyBcIi5ob3QtdXBkYXRlLmpzb25cIik7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZDFkMDI2NjVmYjA5NTY2NTJjMTFcIikiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJqYXZhc2NyaXB0LWxvdHRvOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIGN1cnJlbnRNb2R1bGVEYXRhID0ge307XG52YXIgaW5zdGFsbGVkTW9kdWxlcyA9IF9fd2VicGFja19yZXF1aXJlX18uYztcblxuLy8gbW9kdWxlIGFuZCByZXF1aXJlIGNyZWF0aW9uXG52YXIgY3VycmVudENoaWxkTW9kdWxlO1xudmFyIGN1cnJlbnRQYXJlbnRzID0gW107XG5cbi8vIHN0YXR1c1xudmFyIHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycyA9IFtdO1xudmFyIGN1cnJlbnRTdGF0dXMgPSBcImlkbGVcIjtcblxuLy8gd2hpbGUgZG93bmxvYWRpbmdcbnZhciBibG9ja2luZ1Byb21pc2VzID0gMDtcbnZhciBibG9ja2luZ1Byb21pc2VzV2FpdGluZyA9IFtdO1xuXG4vLyBUaGUgdXBkYXRlIGluZm9cbnZhciBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycztcbnZhciBxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXM7XG5cbl9fd2VicGFja19yZXF1aXJlX18uaG1yRCA9IGN1cnJlbnRNb2R1bGVEYXRhO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmkucHVzaChmdW5jdGlvbiAob3B0aW9ucykge1xuXHR2YXIgbW9kdWxlID0gb3B0aW9ucy5tb2R1bGU7XG5cdHZhciByZXF1aXJlID0gY3JlYXRlUmVxdWlyZShvcHRpb25zLnJlcXVpcmUsIG9wdGlvbnMuaWQpO1xuXHRtb2R1bGUuaG90ID0gY3JlYXRlTW9kdWxlSG90T2JqZWN0KG9wdGlvbnMuaWQsIG1vZHVsZSk7XG5cdG1vZHVsZS5wYXJlbnRzID0gY3VycmVudFBhcmVudHM7XG5cdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRjdXJyZW50UGFyZW50cyA9IFtdO1xuXHRvcHRpb25zLnJlcXVpcmUgPSByZXF1aXJlO1xufSk7XG5cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQyA9IHt9O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJID0ge307XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlcXVpcmUocmVxdWlyZSwgbW9kdWxlSWQpIHtcblx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cdGlmICghbWUpIHJldHVybiByZXF1aXJlO1xuXHR2YXIgZm4gPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuXHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG5cdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuXHRcdFx0XHR2YXIgcGFyZW50cyA9IGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cztcblx0XHRcdFx0aWYgKHBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG5cdFx0XHRcdFx0cGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuXHRcdFx0XHRjdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG5cdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuXHRcdFx0XHRcdHJlcXVlc3QgK1xuXHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG5cdFx0XHRcdFx0bW9kdWxlSWRcblx0XHRcdCk7XG5cdFx0XHRjdXJyZW50UGFyZW50cyA9IFtdO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVxdWlyZShyZXF1ZXN0KTtcblx0fTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHJlcXVpcmVbbmFtZV07XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0cmVxdWlyZVtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cdGZvciAodmFyIG5hbWUgaW4gcmVxdWlyZSkge1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVxdWlyZSwgbmFtZSkgJiYgbmFtZSAhPT0gXCJlXCIpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKG5hbWUpKTtcblx0XHR9XG5cdH1cblx0Zm4uZSA9IGZ1bmN0aW9uIChjaHVua0lkLCBmZXRjaFByaW9yaXR5KSB7XG5cdFx0cmV0dXJuIHRyYWNrQmxvY2tpbmdQcm9taXNlKHJlcXVpcmUuZShjaHVua0lkLCBmZXRjaFByaW9yaXR5KSk7XG5cdH07XG5cdHJldHVybiBmbjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTW9kdWxlSG90T2JqZWN0KG1vZHVsZUlkLCBtZSkge1xuXHR2YXIgX21haW4gPSBjdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkO1xuXHR2YXIgaG90ID0ge1xuXHRcdC8vIHByaXZhdGUgc3R1ZmZcblx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9hY2NlcHRlZEVycm9ySGFuZGxlcnM6IHt9LFxuXHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG5cdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG5cdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG5cdFx0X3NlbGZJbnZhbGlkYXRlZDogZmFsc2UsXG5cdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG5cdFx0X21haW46IF9tYWluLFxuXHRcdF9yZXF1aXJlU2VsZjogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBtZS5wYXJlbnRzLnNsaWNlKCk7XG5cdFx0XHRjdXJyZW50Q2hpbGRNb2R1bGUgPSBfbWFpbiA/IHVuZGVmaW5lZCA6IG1vZHVsZUlkO1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG5cdFx0fSxcblxuXHRcdC8vIE1vZHVsZSBBUElcblx0XHRhY3RpdmU6IHRydWUsXG5cdFx0YWNjZXB0OiBmdW5jdGlvbiAoZGVwLCBjYWxsYmFjaywgZXJyb3JIYW5kbGVyKSB7XG5cdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiICYmIGRlcCAhPT0gbnVsbCkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcFtpXV0gPSBlcnJvckhhbmRsZXI7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBdID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZGVjbGluZTogZnVuY3Rpb24gKGRlcCkge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiICYmIGRlcCAhPT0gbnVsbClcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG5cdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcblx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcblx0XHR9LFxuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcblx0XHR9LFxuXHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcblx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblx0XHRpbnZhbGlkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9zZWxmSW52YWxpZGF0ZWQgPSB0cnVlO1xuXHRcdFx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0XHRcdGNhc2UgXCJpZGxlXCI6XG5cdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXRTdGF0dXMoXCJyZWFkeVwiKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRcdGNhc2UgXCJjaGVja1wiOlxuXHRcdFx0XHRjYXNlIFwiZGlzcG9zZVwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbHlcIjpcblx0XHRcdFx0XHQocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzIHx8IFtdKS5wdXNoKFxuXHRcdFx0XHRcdFx0bW9kdWxlSWRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGlnbm9yZSByZXF1ZXN0cyBpbiBlcnJvciBzdGF0ZXNcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gTWFuYWdlbWVudCBBUElcblx0XHRjaGVjazogaG90Q2hlY2ssXG5cdFx0YXBwbHk6IGhvdEFwcGx5LFxuXHRcdHN0YXR1czogZnVuY3Rpb24gKGwpIHtcblx0XHRcdGlmICghbCkgcmV0dXJuIGN1cnJlbnRTdGF0dXM7XG5cdFx0XHRyZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMucHVzaChsKTtcblx0XHR9LFxuXHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRyZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMucHVzaChsKTtcblx0XHR9LFxuXHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHR2YXIgaWR4ID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG5cdFx0XHRpZiAoaWR4ID49IDApIHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcblx0XHR9LFxuXG5cdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG5cdFx0ZGF0YTogY3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG5cdH07XG5cdGN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcblx0cmV0dXJuIGhvdDtcbn1cblxuZnVuY3Rpb24gc2V0U3RhdHVzKG5ld1N0YXR1cykge1xuXHRjdXJyZW50U3RhdHVzID0gbmV3U3RhdHVzO1xuXHR2YXIgcmVzdWx0cyA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuXHRcdHJlc3VsdHNbaV0gPSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChyZXN1bHRzKS50aGVuKGZ1bmN0aW9uICgpIHt9KTtcbn1cblxuZnVuY3Rpb24gdW5ibG9jaygpIHtcblx0aWYgKC0tYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkge1xuXHRcdHNldFN0YXR1cyhcInJlYWR5XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGJsb2NraW5nUHJvbWlzZXMgPT09IDApIHtcblx0XHRcdFx0dmFyIGxpc3QgPSBibG9ja2luZ1Byb21pc2VzV2FpdGluZztcblx0XHRcdFx0YmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0bGlzdFtpXSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdHJhY2tCbG9ja2luZ1Byb21pc2UocHJvbWlzZSkge1xuXHRzd2l0Y2ggKGN1cnJlbnRTdGF0dXMpIHtcblx0XHRjYXNlIFwicmVhZHlcIjpcblx0XHRcdHNldFN0YXR1cyhcInByZXBhcmVcIik7XG5cdFx0LyogZmFsbHRocm91Z2ggKi9cblx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0YmxvY2tpbmdQcm9taXNlcysrO1xuXHRcdFx0cHJvbWlzZS50aGVuKHVuYmxvY2ssIHVuYmxvY2spO1xuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHdhaXRGb3JCbG9ja2luZ1Byb21pc2VzKGZuKSB7XG5cdGlmIChibG9ja2luZ1Byb21pc2VzID09PSAwKSByZXR1cm4gZm4oKTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cdFx0YmxvY2tpbmdQcm9taXNlc1dhaXRpbmcucHVzaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXNvbHZlKGZuKCkpO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gaG90Q2hlY2soYXBwbHlPblVwZGF0ZSkge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcblx0fVxuXHRyZXR1cm4gc2V0U3RhdHVzKFwiY2hlY2tcIilcblx0XHQudGhlbihfX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHVwZGF0ZSkge1xuXHRcdFx0aWYgKCF1cGRhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhhcHBseUludmFsaWRhdGVkTW9kdWxlcygpID8gXCJyZWFkeVwiIDogXCJpZGxlXCIpLnRoZW4oXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicHJlcGFyZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHVwZGF0ZWRNb2R1bGVzID0gW107XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cblx0XHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKFxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1yQykucmVkdWNlKGZ1bmN0aW9uIChcblx0XHRcdFx0XHRcdHByb21pc2VzLFxuXHRcdFx0XHRcdFx0a2V5XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckNba2V5XShcblx0XHRcdFx0XHRcdFx0dXBkYXRlLmMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5yLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUubSxcblx0XHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGVkTW9kdWxlc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHJldHVybiBwcm9taXNlcztcblx0XHRcdFx0XHR9LCBbXSlcblx0XHRcdFx0KS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0aWYgKGFwcGx5T25VcGRhdGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGludGVybmFsQXBwbHkoYXBwbHlPblVwZGF0ZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicmVhZHlcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHVwZGF0ZWRNb2R1bGVzO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcbn1cblxuZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1cyAoc3RhdGU6IFwiICtcblx0XHRcdFx0XHRjdXJyZW50U3RhdHVzICtcblx0XHRcdFx0XHRcIilcIlxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gaW50ZXJuYWxBcHBseShvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCk7XG5cblx0dmFyIHJlc3VsdHMgPSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycy5tYXAoZnVuY3Rpb24gKGhhbmRsZXIpIHtcblx0XHRyZXR1cm4gaGFuZGxlcihvcHRpb25zKTtcblx0fSk7XG5cdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gdW5kZWZpbmVkO1xuXG5cdHZhciBlcnJvcnMgPSByZXN1bHRzXG5cdFx0Lm1hcChmdW5jdGlvbiAocikge1xuXHRcdFx0cmV0dXJuIHIuZXJyb3I7XG5cdFx0fSlcblx0XHQuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuXHRcdHJldHVybiBzZXRTdGF0dXMoXCJhYm9ydFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuXHR2YXIgZGlzcG9zZVByb21pc2UgPSBzZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuXG5cdHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5kaXNwb3NlKSByZXN1bHQuZGlzcG9zZSgpO1xuXHR9KTtcblxuXHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG5cdHZhciBhcHBseVByb21pc2UgPSBzZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuXHR2YXIgZXJyb3I7XG5cdHZhciByZXBvcnRFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcblx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcblx0fTtcblxuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cdHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5hcHBseSkge1xuXHRcdFx0dmFyIG1vZHVsZXMgPSByZXN1bHQuYXBwbHkocmVwb3J0RXJyb3IpO1xuXHRcdFx0aWYgKG1vZHVsZXMpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gobW9kdWxlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChbZGlzcG9zZVByb21pc2UsIGFwcGx5UHJvbWlzZV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG5cdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiZmFpbFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChsaXN0KSB7XG5cdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRcdGlmIChsaXN0LmluZGV4T2YobW9kdWxlSWQpIDwgMCkgbGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBsaXN0O1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNldFN0YXR1cyhcImlkbGVcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSB7XG5cdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRpZiAoIWN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzKSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHVuZGVmaW5lZDtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgfHwge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbnZhciBjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0O1xudmFyIHdhaXRpbmdVcGRhdGVSZXNvbHZlcyA9IHt9O1xuZnVuY3Rpb24gbG9hZFVwZGF0ZUNodW5rKGNodW5rSWQsIHVwZGF0ZWRNb2R1bGVzTGlzdCkge1xuXHRjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0ID0gdXBkYXRlZE1vZHVsZXNMaXN0O1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHJlc29sdmU7XG5cdFx0Ly8gc3RhcnQgdXBkYXRlIGNodW5rIGxvYWRpbmdcblx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy5odShjaHVua0lkKTtcblx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0aWYod2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKSB7XG5cdFx0XHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHVuZGVmaW5lZFxuXHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgaG90IHVwZGF0ZSBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCk7XG5cdH0pO1xufVxuXG5zZWxmW1wid2VicGFja0hvdFVwZGF0ZWphdmFzY3JpcHRfbG90dG9cIl0gPSAoY2h1bmtJZCwgbW9yZU1vZHVsZXMsIHJ1bnRpbWUpID0+IHtcblx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdGlmKGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QpIGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QucHVzaChtb2R1bGVJZCk7XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIGN1cnJlbnRVcGRhdGVSdW50aW1lLnB1c2gocnVudGltZSk7XG5cdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSgpO1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0fVxufTtcblxudmFyIGN1cnJlbnRVcGRhdGVDaHVua3M7XG52YXIgY3VycmVudFVwZGF0ZTtcbnZhciBjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcztcbnZhciBjdXJyZW50VXBkYXRlUnVudGltZTtcbmZ1bmN0aW9uIGFwcGx5SGFuZGxlcihvcHRpb25zKSB7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXI7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB1bmRlZmluZWQ7XG5cdGZ1bmN0aW9uIGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyh1cGRhdGVNb2R1bGVJZCkge1xuXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG5cdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbiAoaWQpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNoYWluOiBbaWRdLFxuXHRcdFx0XHRpZDogaWRcblx0XHRcdH07XG5cdFx0fSk7XG5cdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcblx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcblx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcblx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcblx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQhbW9kdWxlIHx8XG5cdFx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgJiYgIW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZClcblx0XHRcdClcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuXHRcdFx0XHR2YXIgcGFyZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW3BhcmVudElkXTtcblx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcblx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG5cdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcblx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuXHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuXHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG5cdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG5cdFx0XHRcdHF1ZXVlLnB1c2goe1xuXHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG5cdFx0XHRcdFx0aWQ6IHBhcmVudElkXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG5cdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG5cdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcblx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IGJbaV07XG5cdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG5cdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cblx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcblx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuXHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKG1vZHVsZSkge1xuXHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgbW9kdWxlLmlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG5cdFx0KTtcblx0fTtcblxuXHRmb3IgKHZhciBtb2R1bGVJZCBpbiBjdXJyZW50VXBkYXRlKSB7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlLCBtb2R1bGVJZCkpIHtcblx0XHRcdHZhciBuZXdNb2R1bGVGYWN0b3J5ID0gY3VycmVudFVwZGF0ZVttb2R1bGVJZF07XG5cdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG5cdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0aWYgKG5ld01vZHVsZUZhY3RvcnkpIHtcblx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRNb2R1bGVFZmZlY3RzKG1vZHVsZUlkKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc3VsdCA9IHtcblx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuXHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcblx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG5cdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcblx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcblx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuXHRcdFx0fVxuXHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuXHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcblx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcblx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRlcnJvcjogYWJvcnRFcnJvclxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRvQXBwbHkpIHtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBuZXdNb2R1bGVGYWN0b3J5O1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuXHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ocmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcblx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG5cdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Y3VycmVudFVwZGF0ZSA9IHVuZGVmaW5lZDtcblxuXHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG5cdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcblx0Zm9yICh2YXIgaiA9IDA7IGogPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBqKyspIHtcblx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tqXTtcblx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdGlmIChcblx0XHRcdG1vZHVsZSAmJlxuXHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCB8fCBtb2R1bGUuaG90Ll9tYWluKSAmJlxuXHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuXHRcdFx0YXBwbGllZFVwZGF0ZVtvdXRkYXRlZE1vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlICYmXG5cdFx0XHQvLyB3aGVuIGNhbGxlZCBpbnZhbGlkYXRlIHNlbGYtYWNjZXB0aW5nIGlzIG5vdCBwb3NzaWJsZVxuXHRcdFx0IW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZFxuXHRcdCkge1xuXHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuXHRcdFx0XHRtb2R1bGU6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdHJlcXVpcmU6IG1vZHVsZS5ob3QuX3JlcXVpcmVTZWxmLFxuXHRcdFx0XHRlcnJvckhhbmRsZXI6IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuXG5cdHJldHVybiB7XG5cdFx0ZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MuZm9yRWFjaChmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0fSk7XG5cdFx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IHVuZGVmaW5lZDtcblxuXHRcdFx0dmFyIGlkeDtcblx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG5cdFx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXHRcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cblx0XHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuXHRcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcblx0XHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdGRpc3Bvc2VIYW5kbGVyc1tqXS5jYWxsKG51bGwsIGRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1yRFttb2R1bGVJZF0gPSBkYXRhO1xuXG5cdFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG5cdFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG5cdFx0XHRcdGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXG5cdFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcblx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0dmFyIGNoaWxkID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZS5jaGlsZHJlbltqXV07XG5cdFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG5cdFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcblx0XHRcdFx0XHRpZiAoaWR4ID49IDApIHtcblx0XHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG5cdFx0XHR2YXIgZGVwZW5kZW5jeTtcblx0XHRcdGZvciAodmFyIG91dGRhdGVkTW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhvdXRkYXRlZERlcGVuZGVuY2llcywgb3V0ZGF0ZWRNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuXHRcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG5cdFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuXHRcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGFwcGx5OiBmdW5jdGlvbiAocmVwb3J0RXJyb3IpIHtcblx0XHRcdC8vIGluc2VydCBuZXcgY29kZVxuXHRcdFx0Zm9yICh2YXIgdXBkYXRlTW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGFwcGxpZWRVcGRhdGUsIHVwZGF0ZU1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVt1cGRhdGVNb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW3VwZGF0ZU1vZHVsZUlkXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBydW4gbmV3IHJ1bnRpbWUgbW9kdWxlc1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50VXBkYXRlUnVudGltZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlUnVudGltZVtpXShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcblx0XHRcdGZvciAodmFyIG91dGRhdGVkTW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhvdXRkYXRlZERlcGVuZGVuY2llcywgb3V0ZGF0ZWRNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG5cdFx0XHRcdFx0XHR2YXIgZXJyb3JIYW5kbGVycyA9IFtdO1xuXHRcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHR2YXIgYWNjZXB0Q2FsbGJhY2sgPVxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JIYW5kbGVyID1cblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwZW5kZW5jeV07XG5cdFx0XHRcdFx0XHRcdGlmIChhY2NlcHRDYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihhY2NlcHRDYWxsYmFjaykgIT09IC0xKSBjb250aW51ZTtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChhY2NlcHRDYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3JIYW5kbGVycy5wdXNoKGVycm9ySGFuZGxlcik7XG5cdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzLnB1c2goZGVwZW5kZW5jeSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGZvciAodmFyIGsgPSAwOyBrIDwgY2FsbGJhY2tzLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzW2tdLmNhbGwobnVsbCwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGVycm9ySGFuZGxlcnNba10gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyc1trXShlcnIsIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycjIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG5cdFx0XHRmb3IgKHZhciBvID0gMDsgbyA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IG8rKykge1xuXHRcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tvXTtcblx0XHRcdFx0dmFyIG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aXRlbS5yZXF1aXJlKG1vZHVsZUlkKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIsIHtcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlOiBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG5cdFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycjIpO1xuXHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvdXRkYXRlZE1vZHVsZXM7XG5cdFx0fVxuXHR9O1xufVxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJLmpzb25wID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBhcHBseUhhbmRsZXJzKSB7XG5cdGlmICghY3VycmVudFVwZGF0ZSkge1xuXHRcdGN1cnJlbnRVcGRhdGUgPSB7fTtcblx0XHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gW107XG5cdFx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdH1cblx0aWYgKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG5cdFx0Y3VycmVudFVwZGF0ZVttb2R1bGVJZF0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdO1xuXHR9XG59O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDLmpzb25wID0gZnVuY3Rpb24gKFxuXHRjaHVua0lkcyxcblx0cmVtb3ZlZENodW5rcyxcblx0cmVtb3ZlZE1vZHVsZXMsXG5cdHByb21pc2VzLFxuXHRhcHBseUhhbmRsZXJzLFxuXHR1cGRhdGVkTW9kdWxlc0xpc3Rcbikge1xuXHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0Y3VycmVudFVwZGF0ZUNodW5rcyA9IHt9O1xuXHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IHJlbW92ZWRDaHVua3M7XG5cdGN1cnJlbnRVcGRhdGUgPSByZW1vdmVkTW9kdWxlcy5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwga2V5KSB7XG5cdFx0b2JqW2tleV0gPSBmYWxzZTtcblx0XHRyZXR1cm4gb2JqO1xuXHR9LCB7fSk7XG5cdGN1cnJlbnRVcGRhdGVSdW50aW1lID0gW107XG5cdGNodW5rSWRzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRpZiAoXG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJlxuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSB1bmRlZmluZWRcblx0XHQpIHtcblx0XHRcdHByb21pc2VzLnB1c2gobG9hZFVwZGF0ZUNodW5rKGNodW5rSWQsIHVwZGF0ZWRNb2R1bGVzTGlzdCkpO1xuXHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5mKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mLmpzb25wSG1yID0gZnVuY3Rpb24gKGNodW5rSWQsIHByb21pc2VzKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3MgJiZcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGVDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRcdCFjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdXG5cdFx0XHQpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkpO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0gPSAoKSA9PiB7XG5cdGlmICh0eXBlb2YgZmV0Y2ggPT09IFwidW5kZWZpbmVkXCIpIHRocm93IG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydDogbmVlZCBmZXRjaCBBUElcIik7XG5cdHJldHVybiBmZXRjaChfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYoKSkudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwNCkgcmV0dXJuOyAvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG5cdFx0aWYoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggdXBkYXRlIG1hbmlmZXN0IFwiICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0fSk7XG59O1xuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvaW5kZXguanM/cHJvdG9jb2w9d3MlM0EmaG9zdG5hbWU9MC4wLjAuMCZwb3J0PTkwMDAmcGF0aG5hbWU9JTJGd3MmbG9nZ2luZz1pbmZvJnJlY29ubmVjdD0xMFwiKTtcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9kZXYtc2VydmVyLmpzXCIpO1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc3RlcDItaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiTlVNQkVSX0RFTElNSVRFUiIsIkxPVFRPX1JVTEUiLCJSRVNUQVJUX0tFWSIsIklOUFVUX1FVRVJZX1BSRUZJWCIsIklOUFVUX01FU1NBR0VTIiwiT2JqZWN0IiwiZnJlZXplIiwicGF5bWVudEFtb3VudCIsIndpbm5pbmdMb3R0b051bWJlcnMiLCJib251c051bWJlciIsInJlc3RhcnQiLCJlbmQiLCJPVVRQVVRfTUVTU0FHRVMiLCJwdXJjaGFzZWRMb3R0b1RpY2tldHMiLCJsb3R0b1RpY2tldHMiLCJkaXZpZGVyIiwibW9uZXlVbml0IiwiY291bnRVbml0IiwicHJvZml0VW5pdCIsInJlc3RhcnRHYW1lIiwiZW5kR2FtZSIsIkVSUk9SX1BSRUZJWCIsIkVSUk9SX01FU1NBR0VTIiwiaXNVbmRlZmluZWRJbnB1dFZhbHVlIiwiaW5WYWxpZFdJbm5pbmdOdW1iZXJzRm9ybSIsImFscmVhZHlJbkxvdHRvTnVtYmVyIiwibm90SW50ZWdlciIsImluRGl2aXNpYmxlQnlQcmljZSIsInByaWNlIiwidG9Mb2NhbGVTdHJpbmciLCJpblZhbGlkTnVtYmVyc09mVGlja2V0cyIsIm51bWJlcnNPZlRpY2tldHMiLCJtaW4iLCJtYXgiLCJpbnZhbGlkTG90dG9OdW1iZXJDb3VudCIsImxlbmd0aCIsImR1cGxpY2F0ZWRMb3R0b051bWJlciIsImludmFsaWRMb3R0b051bWJlclJhbmdlIiwicmFuZ2UiLCJzdGFydCIsImludmFsaWRSZXN0YXJ0SW5wdXRGb3JtIiwiUkFORE9NX05VTUJFUl9SVUxFIiwiUkFOS19IQVNfQk9OVVMiLCJXSU5OSU5HX1JVTEUiLCJNYXAiLCJtYXRjaGVkQ291bnQiLCJpc0JvbnVzIiwibW9uZXkiLCJjaGVja0RlZmluZWRJbnB1dFZhbHVlIiwiaXNCb251c051bWJlclVuaXF1ZSIsIkxvdHRvTnVtYmVyIiwiQm9udXMiLCJib251c051bWJlcklucHV0IiwibG90dG9OdW1iZXJzIiwiaW5jbHVkZXMiLCJOdW1iZXIiLCJudW1iZXIiLCJFcnJvciIsImlzTm90RHVwbGljYXRlZExvdHRvTnVtYmVyIiwiaXNWYWxpZExvdHRvTnVtYmVyQ291bnQiLCJMb3R0byIsIm51bWJlcnMiLCJtYXAiLCJSYW5kb21OdW1iZXIiLCJpc0RpdmlzaWJsZUJ5UHJpY2UiLCJpc0ludGVnZXIiLCJpc1ZhbGlkTnVtYmVyc09mVGlja2V0cyIsIkxvdHRvTWFjaGluZSIsInBheW1lbnRBbW91bnRJbnB1dCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIkFycmF5IiwiZnJvbSIsInBpY2tVbmlxdWVOdW1iZXJzSW5SYW5nZSIsImlzTG90dG9OdW1iZXJJblJhbmdlIiwiV2lubmluZ0xvdHRvIiwiTG90dG9SZXN1bHRzSGVscGVyIiwid2lubmluZ0xvdHRvIiwidW5kZWZpbmVkIiwiYm9udXMiLCJyZXN1bHRzIiwibG90dG9OdW1iZXJzSW5wdXQiLCJsb3R0b1RpY2tldCIsImNvbXBhcmVMb3R0byIsIlN0YXRpc3RpY3MiLCJtYXRjaGluZ1Jlc3VsdHMiLCJ0b3RhbFByaXplcyIsInByb2ZpdFJhdGUiLCJzdGF0aXN0aWNzUmVzdWx0IiwiaW5pdGlhbFN0YXRpc3RpY3NSZXN1bHQiLCJmb3JFYWNoIiwiXyIsImtleSIsInJlZHVjZSIsImFjYyIsInJhbmsiLCJyZXN1bHQiLCJ2YWx1ZSIsImlzQm9udXNNYXRjaFJlcXVpcmVkIiwiZ2V0IiwiaXNNYXRjaGluZ0NvdW50IiwiaXNNYXRjaGluZ09ubHlDb3VudCIsImlzTWF0Y2hpbmdCb251c0FuZENvdW50IiwicHVzaCIsInRvRml4ZWQiLCJpc1ZhbGlkV2lubmluZ051bWJlcnNGb3JtIiwiaXNNYXRjaGluZ051bWJlciIsImZpbHRlciIsInNwbGl0IiwiV2ViTG90dG9HYW1lQ29udHJvbGxlciIsIndlYiIsInNvcnQiLCJhIiwiYiIsImZpcnN0TnVtYmVyIiwibGFzdE51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIlNldCIsInNpemUiLCJyYW5kb21OdW1iZXIiLCJwaWNrTnVtYmVySW5SYW5nZSIsImFkZCIsImlucHV0VmFsdWUiLCJ0aWNrZXRzIiwibnVtYmVySW5wdXQiLCJudW1iZXJzT2ZEZWxpbWl0ZXIiLCJtYXRjaEFsbCIsImlzVmFsaWROdW1iZXJEZWxpbWl0ZXIiLCJpc1ZhbGlkUmVzdGFydElucHV0Rm9ybSIsInJlc3RhcnRJbnB1dCIsInJlZ2V4IiwiUmVnRXhwIiwidGVzdCIsIlNURVBfUFJFRklYIiwiR0FNRV9TVEVQIiwicGF5bWVudCIsIndpbm5pbmciLCJzdGF0aXN0aWNzIiwiSHRtbFRleHRJbmplY3RvcldpdGhDb25zdGFudHMiLCJpbmplY3RvclRleHQiLCJwcml2YXRlX2luamVjdFBheW1lbnRBbW91bnRJbnB1dCIsInByaXZhdGVfaW5qZWN0SW5wdXRGb3JXaW5uaW5nTG90dG9OdW1iZXJzIiwicHJpdmF0ZV9pbmplY3RCb251c0lucHV0IiwicHJpdmF0ZV9pbmplY3RQYXltZW50QW1vdW50UnVsZSIsInByaXZhdGVfaW5qZWN0V2lubmluZ0NyaXRlcmlhUnVsZSIsInBhcmVudERpdkVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtYXhQYXltZW50IiwiYXR0cmlidXRlcyIsImlkIiwic3RlcCIsInR5cGUiLCJuYW1lIiwibWF4TGVuZ3RoIiwidG9TdHJpbmciLCJwbGFjZWhvbGRlciIsInJlcXVpcmVkIiwicGF5bWVudEFtb3VudElucHV0RWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJlbnRyaWVzIiwic2V0QXR0cmlidXRlIiwiaW5zZXJ0QmVmb3JlIiwiZmlyc3RDaGlsZCIsInByaXZhdGVfbWFrZUxvdHRvTnVtYmVySW5wdXRBbmRMYWJlbCIsImZyYWdtZW50IiwibnVtYmVySW5wdXRBdHRyaWJ1dGVzIiwiaW5kZXgiLCJsYWJlbEVsZW1lbnQiLCJudW1iZXJJbnB1dEVsZW1lbnQiLCJpbnB1dEVsZW1lbnRJZCIsImNsYXNzTmFtZSIsInRleHRDb250ZW50IiwicmVwbGFjZSIsImFwcGVuZENoaWxkIiwiaW5wdXRHcm91cEVsZW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiYm9udXNGb3JtRWxlbWVudCIsImJvbnVzSW5wdXQiLCJwcml2YXRlX2dldFBheW1lbnRBbW91bnRSdWxlSHRtbCIsInBhcmVudEVsZW1lbnQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJwcml2YXRlX2dldFdpbm5pbmdDcml0ZXJpYVJ1bGVIdG1sIiwid2lubmluZ0NyaXRlcmlhUnVsZUh0bWwiLCJIdG1sVGV4dEluamVjdG9yV2l0aEdhbWVSZXN1bHRzIiwiaW5qZWN0b3JMb3R0b1RpY2tldHMiLCJpc3N1ZWRMb3R0b3NFbGVtZW50IiwibG90dG9zQ291bnRFbGVtZW50IiwidGlja2V0IiwicHJpdmF0ZV9tYWtlRWxlbWVudEZvcklzc3VlZExvdHRvIiwicmVwbGFjZUNoaWxkcmVuIiwiaW5qZWN0U3RhdGlzdGljc1RhYmxlIiwicmF0ZVN0YXRpc3RpY3NFbGVtZW50IiwicHJpdmF0ZV9yZW1vdmVQcmV2aW91c1RhYmxlIiwicHJpdmF0ZV9nZXRUYWJsZUh0bWwiLCJpbmplY3RQcm9maXRSYXRlIiwicHJvZml0UmF0ZUVsZW1lbnQiLCJwcml2YXRlX2dldFRhYmxlVHJBcnJheSIsImpvaW4iLCJ0YXJnZXRUYWJsZUVsZW1lbnQiLCJyZW1vdmUiLCJsaSIsInRleHRBYm91dExvdHRvTnVtYmVycyIsInByZXYiLCJjdXJyZW50Iiwib3RoZXJDaGlsZHJlbk9mTGkiLCJzdHJpbmciLCJjaGlsZHJlbkh0bWwiLCJjaGFuZ2VDbGFzc0Fib3V0R2FtZVN0ZXAiLCJoYW5kbGVFcnJvck1lc3NhZ2UiLCJyZWNvdmVyeUluaXRpYWxTdGF0ZUV4Y2VwdFBheW1lbnQiLCJMb3R0b01hY2hpbmVHZW5lcmF0b3IiLCJsb3R0b1Jlc3VsdHNIZWxwZXIiLCIkcGF5bWVudEZvcm1FbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwicGF5bWVudEFtb3VudElucHV0RWwiLCJlbGVtZW50cyIsImVycm9yTWVzc2FnZUVsZW1lbnQiLCJnZW5lcmF0ZUxvdHRvTWFjaGluZSIsImVycm9yIiwiU3RhdGlzdGljc1BvcHVwQ29udHJvbGxlciIsInBvcHVwRWxlbWVudCIsImJ0bkNsb3NlUG9wdXBFbGVtZW50IiwiYnRuUmVzdGFydEVsZW1lbnQiLCJsb3R0b0FuYWx5dGljcyIsIiRlbGVtZW50IiwiY2xhc3NMaXN0Iiwic3RvcFByb3BhZ2F0aW9uIiwicmVzZXQiLCJXaW5uaW5nTG90dG9BbmRCb251c0dlbmVyYXRvciIsImxvdHRvTnVtYmVyVmFsdWVzIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0IiwiYm9udXNOdW1iZXJWYWx1ZXMiLCJnZW5lcmF0ZVdpbm5pbmdMb3R0byIsImdlbmVyYXRlQm9udXMiLCJjYWxjdWxhdGVNYXRjaGluZ1Jlc3VsdHMiLCIkd2lubmluZ0NyaXRlcmlhRm9ybUVsZW1lbnQiLCJzY3JvbGxUb3AiLCJlbGVtZW50IiwidGV4dCIsIm1lc3NhZ2UiLCJhcHBJbm5lckVsZW1lbnQiLCJjb250YWlucyJdLCJzb3VyY2VSb290IjoiIn0=