import { $ } from './utils/querySelector.js';
import { SELECTOR } from './constants.js'; 

export const $costSubmitForm = $(SELECTOR.COST_SUBMIT_FORM);
export const $costInput = $(SELECTOR.COST_INPUT);
export const $purchaseResult = $(SELECTOR.PURCHASE_RESULT);
export const $purchaseItemCount = $(SELECTOR.PURCHASE_ITEM_COUNT);
export const $lottoNumbersToggleButton = $(SELECTOR.LOTTO_NUMBERS_TOGGLE_BUTTON);
export const $purchaseItemList = $(SELECTOR.PURCHASE_ITEM_LIST);
export const $correctNumberWrapper = $(SELECTOR.CORRECT_NUMBER_WRAPPER);
export const $modalClose = $(SELECTOR.MODAL_CLOSE);
export const $modal = $(SELECTOR.MODAL);
export const $resultTbody = $(SELECTOR.RESULT_TBODY);
export const $profitRate = $(SELECTOR.PROFIT_RATE);
export const $restartButton = $(SELECTOR.RESTART_BUTTON);
export const $correctNumberInputForm = $(SELECTOR.CORRECT_NUMBER_INPUT_FORM);
export const $$correctNumberInputs = $(SELECTOR.CORRECT_NUMBER, $correctNumberWrapper);
