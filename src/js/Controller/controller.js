import { $, $$ } from "../Util/querySelector.js";
import { isValidMoney } from "../Util/validator.js";

// const $showResultButton = $('.open-result-modal-button');
// const $modalClose = $('.modal-close');
// const $modal = $('.modal');
const $lottoNumbersToggleButton = $(".lotto-numbers-toggle-button");
const $lottoReceiptArea = $$(".mt-9");
const $purchaseMountInput = $("#purchase-mount-input");

export const onLottoReceiptShow = () => {
  $lottoReceiptArea.forEach((element) => {
    element.classList.remove("hidden");
  });
};

export const onLottoReceiptHidden = () => {
  $lottoReceiptArea.forEach((element) => {
    element.classList.add("hidden");
  });
};

export const handlePurchaseMountSubmit = (e) => {
  const money = $purchaseMountInput.value;

  if (isValidMoney(money)) {
    console.log(money);
    onLottoReceiptShow();
  }
};

// const onModalShow = () => {
//  $modal.classList.add('open')
// }

// const onModalClose = () => {
//  $modal.classList.remove('open')
// }

// $showResultButton.addEventListener('click', onModalShow)
// $modalClose.addEventListener('click', onModalClose)
