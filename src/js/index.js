import {
  $showResultButton,
  $modalClose,
  $modal,
  $lottoNumbersToggleButton,
  $priceSubmitForm,
  $priceInput,
  $winningNumberForm,
} from "./elements.js";
import { onModalClose } from "./utils.js";
import LottoController from "./lotto/LottoController.js";

const lottoController = new LottoController();

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
