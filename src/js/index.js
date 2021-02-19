import { hideElement } from "./utils.js";
import {
  $showResultButton,
  $modalClose,
  $modal,
  $lottoNumbersToggleButton,
  $confirmation,
  $priceInput,
  $priceSubmitButton,
} from "./elements.js";
import LottoController from "./lotto/LottoController.js";

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

const lottoController = new LottoController();

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$priceSubmitButton.addEventListener("click", () => {
  lottoController.onClickPriceSubmitButton($priceInput.value);
});
$lottoNumbersToggleButton.addEventListener(
  "change",
  lottoController.onChangeLottoNumbersToggleButton
);
