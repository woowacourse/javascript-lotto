const $ = (selector) => {
  const selected = document.querySelectorAll(selector);

  return selected.length === 1 ? selected[0] : selected;
};

export const $confirmation = $("#confirmation");
export const $priceInput = $("#price-input");
export const $lottoList = $("#lotto-list");
export const $lottoListLabel = $("#lotto-list-label");
export const $lottoTickets = $("#lotto-tickets");
export const $priceSubmitForm = $("#price-submit-form");
export const $modalClose = $("#modal-close");
export const $modal = $("#modal");
export const $showResultButton = $("#open-result-modal-button");
export const $lottoNumbersToggleButton = $("#lotto-numbers-toggle-button");
export const $winningNumberForm = $("#winning-number-form");
export const $prizeTable = $("#prize-table");
export const $earningRate = $("#earning-rate");
export const $restartButton = $("#restart-button");
export const $winningNumberInputs = $(".winning-number");
export const $bonusNumberInput = $("#bonus-number");
