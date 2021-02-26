import {
  $modal,
  $modalClose,
  $priceSubmitForm,
  $lottoNumbersToggleButton,
  $winningNumberForm,
  $restartButton,
  $manualPurchaseButton,
  $manualPurchaseForm,
  $manualPurchaseDetail,
  $autoPurchaseButton,
} from "./elements.js";
import { onModalClose, showElement } from "./utils.js";
import LottoModel from "./lotto/LottoModel.js";
import LottoView from "./lotto/LottoView.js";
import LottoController from "./lotto/LottoController.js";
import LottoPurchaseController from "./lotto/LottoPurchaseController.js";
import LottoConfirmationController from "./lotto/LottoConfirmationController.js";

const lottoModel = new LottoModel();
const lottoView = new LottoView();

const lottoController = new LottoController(lottoModel, lottoView);
const lottoPurchaseController = new LottoPurchaseController(
  lottoModel,
  lottoView
);
const lottoConfirmationController = new LottoConfirmationController(
  lottoModel,
  lottoView
);

// lottoController관련 handlers
$priceSubmitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  lottoController.onSubmitPrice(e.target.elements["price-input"].value);
});

$lottoNumbersToggleButton.addEventListener(
  "change",
  lottoController.onToggleLottoNumbers.bind(lottoController)
);

// lottoPurchaseController관련 handlers
$manualPurchaseButton.addEventListener("click", () => {
  showElement($manualPurchaseDetail);
});

$manualPurchaseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  lottoPurchaseController.onSubmitManualPurchaseNumber(
    Array.from(e.target.elements["manual-purchase-number"]).map((v) =>
      Number(v.value)
    )
  );
});

$autoPurchaseButton.addEventListener("click", () => {
  lottoPurchaseController.onClickAutoPurchaseButton();
});

// confirmationController관련 handlers
$winningNumberForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const winningNumber = Array.from(
    e.target.elements["winning-number"]
  ).map((v) => Number(v.value));
  const bonusNumber = Number(e.target.elements["bonus-number"].value);

  lottoController.onSubmitResultNumber(winningNumber, bonusNumber);
  lottoConfirmationController.onSubmitResultNumber(winningNumber, bonusNumber);
});

$modalClose.addEventListener("click", () => onModalClose($modal));

$restartButton.addEventListener("click", () => {
  lottoConfirmationController.onClickRestartButton();
});
