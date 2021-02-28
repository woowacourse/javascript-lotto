import { $ } from './utils/querySelector.js';
import { SELECTOR } from './constants.js';

export const $purchaseForm = $(SELECTOR.PURCHASE_FORM);
export const $costInput = $(SELECTOR.COST_INPUT);
export const $costAddButton = $(SELECTOR.COST_ADD_BUTTON);
export const $purchaseResult = $(SELECTOR.PURCHASE_RESULT);
export const $purchaseItemCount = $(SELECTOR.PURCHASE_ITEM_COUNT);
export const $lottoNumbersToggleButton = $(
  SELECTOR.LOTTO_NUMBERS_TOGGLE_BUTTON
);
export const $purchaseItemList = $(SELECTOR.PURCHASE_ITEM_LIST);
export const $correctNumberWrapper = $(SELECTOR.CORRECT_NUMBER_WRAPPER);
export const $resultModalOpenButton = $(SELECTOR.RESULT_MODAL_OPEN_BUTTON);
export const $modalClose = $(SELECTOR.MODAL_CLOSE);
export const $modal = $(SELECTOR.MODAL);
export const $resultTbody = $(SELECTOR.RESULT_TBODY);
export const $profitRate = $(SELECTOR.PROFIT_RATE);
export const $restartButton = $(SELECTOR.RESTART_BUTTON);
export const $winningNumberInputForm = $(SELECTOR.WINNING_NUMBER_INPUT_FORM);
export const $deposit = $(SELECTOR.DEPOSIT);
export const $autoPurchaseButton = $(SELECTOR.AUTO_PURCHASE_BUTTON);