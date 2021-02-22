import {
  $showResultButton,
  $modalClose,
  $modal,
  $lottoNumbersToggleButton,
  $priceSubmitForm,
  $priceInput,
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
$priceSubmitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  lottoController.onSubmitPrice(e.target.elements["price-input"].value);
});
$lottoNumbersToggleButton.addEventListener(
  "change",
  lottoController.onToggleLottoNumbers.bind(lottoController)
);
