import { $ } from './utils/querySelector.js';
import { SELECTOR } from './constants.js';

export const $deposit = $(SELECTOR.DEPOSIT);
export const $depositInput = $(SELECTOR.DEPOSIT_INPUT);
export const $depositAddButton = $(SELECTOR.DEPOSIT_BUTTON);
export const $depositPresenter = $(SELECTOR.DEPOSIT_PRESENTER);
export const $result = $(SELECTOR.RESULT);
export const $resultItemCount = $(SELECTOR.RESULT_TEXT);
export const $resultNumbersToggleButton = $(
  SELECTOR.RESULT_NUMBERS_TOGGLE
);
export const $resultItemList = $(SELECTOR.RESULT_ITEM_LIST);
export const $correctNumberInputWrapper = $(SELECTOR.CORRECT_NUMBER_INPUT_WRAPPER);
export const $modal = $(SELECTOR.MODAL);
export const $modalOpenButton = $(SELECTOR.MODAL_OPEN_BUTTON);
export const $modalCloseButton = $(SELECTOR.MODAL_CLOSE_BUTTON);
export const $modalTbody = $(SELECTOR.MODAL_TBODY);
export const $profitRate = $(SELECTOR.PROFIT_RATE);
export const $restartButton = $(SELECTOR.RESTART_BUTTON);
export const $correctNumber = $(SELECTOR.CORRECT_NUMBER);
export const $autoPurchaseButton = $(SELECTOR.AUTO_PURCHASE_BUTTON);