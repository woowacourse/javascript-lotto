import { app } from "../index.js";
import Lotto from "../Model/Lotto.js";
import { $, $$ } from "../Util/querySelector.js";
import { isValidMoney } from "../Util/validator.js";
import {
  printPurchaseMountLabel,
  printLottoHorizontal,
  printLottoVertical,
} from "../View/receiptView.js";
import { onPurchaseResultShow } from "./viewController.js";

// const $showResultButton = $('.open-result-modal-button');
// const $modalClose = $('.modal-close');
// const $modal = $('.modal');
// const $lottoNumbersToggleButton = $(".lotto-numbers-toggle-button");

export const handlePurchaseMountSubmit = () => {
  const money = $("#purchase-mount-input").value;

  if (isValidMoney(money)) {
    app.lottoCount = money / 1000;

    for (let i = 0; i < app.lottoCount; i++) {
      app.lottos.push(new Lotto());
    }

    // printPurchaseMountLabel(app.lottoCount);
    printPurchaseMountLabel(app.lottoCount);
    console.log(app.lottos);

    printLottoHorizontal(app.lottoCount);
    onPurchaseResultShow();
  }
};

export const handleToggleButton = (event) => {
  if (event.target.checked) {
    printLottoVertical(app.lottos);
  } else {
    printLottoHorizontal(app.lottoCount);
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
