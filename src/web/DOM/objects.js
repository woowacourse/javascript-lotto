import { $ } from '../../utils/querySelector';

const purchaseAmountForm = $('#purchase-amount-form');
const purchaseAmountInput = $('#purchase-amount-input');
const purchaseButton = $('#purchase-amount-submit-button');
const purchaseResult = $('#purchase-result');
const purchaseLottoList = $('#purchased-lotto-list');

const winningNumbersForm = $('#winning-numbers-form');
const winningNumbersButton = $('#winning-numbers-submit-button');
const winningNumbersResult = $('#winning-numbers-result');

const lottoResultModalSection = $('#lotto-result-modal-section');
const lottoResultModal = $('#lotto-result-modal-overlay');

export {
  purchaseResult,
  purchaseAmountForm,
  purchaseAmountInput,
  purchaseButton,
  purchaseLottoList,
  winningNumbersForm,
  winningNumbersButton,
  winningNumbersResult,
  lottoResultModalSection,
  lottoResultModal,
};
