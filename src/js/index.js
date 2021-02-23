import LottoModel from "./lotto/model.js"
import LottoView from "./lotto/view.js"
import LottoController from "./lotto/controller.js"

const lotto = new LottoController(new LottoModel(), new LottoView())
lotto.init()

/* const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $lottoNumbersToggleButton = document.querySelector(
  ".lotto-numbers-toggle-button"
);

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose); */
