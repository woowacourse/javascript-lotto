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

$priceSubmitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  lottoController.onSubmitPrice(e.target.elements["price-input"].value);
});

$lottoNumbersToggleButton.addEventListener("change", (e) =>
  lottoController.onToggleLottoNumbers(e)
);

$winningNumberForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = e.target.elements;

  lottoController.onSubmitResultNumber(
    Array.from(inputs["winning-number"]).map((v) => Number(v.value)),
    Number(inputs["bonus-number"].value)
  );
});

$restartButton.addEventListener("click", () => lottoController.onRestart());

$modalClose.addEventListener("click", () => onModalClose($modal));
