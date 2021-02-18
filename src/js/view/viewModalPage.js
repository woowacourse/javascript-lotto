import { $ } from '../utils/querySelector.js';

const $modal = $('.modal');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};
