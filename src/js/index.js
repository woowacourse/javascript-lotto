import {
  $modalClose,
  $modal,
  $lottoNumbersToggleButton,
  $priceSubmitForm,
  $winningNumberForm,
  $restartButton,
  $manualPurchaseButton,
  $manualPurchaseForm,
  $autoPurchaseButton,
  $manualPurchaseDetail,
} from "./elements.js";
import { onModalClose, showElement } from "./utils.js";
import LottoController from "./lotto/LottoController.js";

const lottoController = new LottoController();

$priceSubmitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  lottoController.onSubmitPrice(e.target.elements["price-input"].value);
});

$manualPurchaseButton.addEventListener("click", () => {
  showElement($manualPurchaseDetail);
});

$manualPurchaseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  lottoController.onSubmitManualPurchaseNumber(
    Array.from(e.target.elements["manual-purchase-number"]).map((v) =>
      Number(v.value)
    )
  );
});

$autoPurchaseButton.addEventListener("click", () => {
  lottoController.onClickAutoPurchaseButton();
});

$lottoNumbersToggleButton.addEventListener(
  "change",
  lottoController.onToggleLottoNumbers.bind(lottoController)
);

$winningNumberForm.addEventListener("submit", (e) => {
  e.preventDefault();

  lottoController.onSubmitResultNumber(
    Array.from(e.target.elements["winning-number"]).map((v) => Number(v.value)),
    Number(e.target.elements["bonus-number"].value)
  );
});

$modalClose.addEventListener("click", () => onModalClose($modal));

$restartButton.addEventListener("click", () => {
  lottoController.onClickRestartButton();
});
