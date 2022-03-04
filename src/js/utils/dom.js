export const $ = selector => document.querySelector(selector);
export const $body = $('body');
export const $app = $('#app');
export const $modal = $('#modal');
export const $lottoPriceInput = $('.lotto-price-input');
export const $boughtLottoListContainer = $('.bought-lotto-list-container');
export const $winningNumberContainer = $('.winning-number-container');
export const $lottoPriceSubmitButton = $('.lotto-price-submit-button');

export const DOM = {
  hasClass: function (element, className) {
    return element.classList.contains(className);
  },
  toggleClass: function (element, className) {
    return element.classList.toggle(className);
  },
};
