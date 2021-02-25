import {
  $modalClose,
  $modal,
  $lottoNumbersToggleButton,
  $priceSubmitForm,
  $winningNumberForm,
  $restartButton,
} from "./elements.js";
import { onModalClose } from "./utils.js";
import LottoController from "./lotto/LottoController.js";
import LottoView from "./lotto/LottoView.js";

const lottoController = new LottoController();
const lottoView = new LottoView();

$priceSubmitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  lottoController.onSubmitPrice(e.target.elements["price-input"].value);
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
  lottoView.resetLottoView();
  onModalClose($modal);
});
