export const $ = selector => document.querySelector(selector);
export const $body = $('body');
export const $app = $('#app');
export const $modal = $('#modal');

export const DOM = {
  hasClass: function (element, className) {
    return element.classList.contains(className);
  },
  toggleClass: function (element, className) {
    return element.classList.toggle(className);
  },
};
