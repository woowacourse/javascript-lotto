import $ from '../lib/utils/dom.js';

const $modal = $('.modal');

const modalShowHandler = () => {
  $modal.classList.add('open');
};

const modalCloseHandler = () => {
  $modal.classList.remove('open');
};

export { modalShowHandler, modalCloseHandler };
