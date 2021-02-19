import {
  $showResultButton,
  $modalClose,
  $modal,
  $lottoNumbersToggleButton,
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
$priceSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  lottoController.onSubmitPrice($priceInput.value);
});
$priceInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "enter") {
    lottoController.onSubmitPrice(e.target.value);
  }
});
$lottoNumbersToggleButton.addEventListener(
  "change",
  lottoController.onToggleLottoNumbers.bind(lottoController)
);
