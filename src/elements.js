import { $ } from './utils/querySelector.js';

const $costInput = $('#cost-input');
const $costSubmitButton = $('#cost-submit-button');
const $purchaseResult = $('#purchase-result');
const $purchaseControl = $('#purchase-control');
const $purchaseItemList = $('#purchase-item-list');

const $showResultButton = $('.open-result-modal-button');
const $modalClose = $('.modal-close');
const $modal = $('.modal');

const getLottoNumbersToggleButton = () => $('#lotto-numbers-toggle-button');

export {
  $costInput,
  $costSubmitButton,
  getLottoNumbersToggleButton,
  $purchaseResult,
  $purchaseControl,
  $purchaseItemList,
  $showResultButton,
  $modalClose,
  $modal,
};
