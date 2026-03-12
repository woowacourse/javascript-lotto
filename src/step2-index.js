import { LOTTO_PRICE } from "./constants/lottoInfo";
import LottoController from "./controller/LottoController";
import Validator from "./utils/Validator";
import { renderLottoTicket } from "./view/web/LottoPurchaseView";
import { renderLottoResult } from "./view/web/LottoResultView";
import { renderWinningInput } from "./view/web/LottoWinningView";

const lottoController = new LottoController();

const purchaseForm = document.querySelector("#purchase-form");
const winningWrapper = document.querySelector("#winning-input-wrapper");
const winningForm = document.querySelector("#winning-form");
const resultModal = document.querySelector("#result-modal");

const handlePurchase = (event) => {
  event.preventDefault();

  try {
    const purchasePriceInput = document.querySelector("#purchase-price");
    const purchasedPrice = Number(purchasePriceInput.value);

    Validator.validatePrice(purchasedPrice);

    const lottoCount = purchasedPrice / LOTTO_PRICE;
    const purchasedLottos = lottoController.issueLottos(lottoCount);

    renderLottoTicket(purchasedLottos);
    renderWinningInput();

    purchaseForm.reset();
  } catch (error) {
    alert(error.message);
  }
};

const handleWinningResult = (event) => {
  event.preventDefault();

  try {
    const formData = new FormData(winningForm);
    const winningNumbers = formData.getAll("winning-number").map(Number);
    const bonusNumber = Number(formData.get("bonus-number"));

    Validator.validateWinningNums(winningNumbers);
    Validator.validateBonusNum(winningNumbers, bonusNumber);

    lottoController.updateWinningResult(winningNumbers, bonusNumber);
    const { rankCount, profitRate } = lottoController.getWinningResult();
    renderLottoResult(rankCount, profitRate);

    winningForm.reset();
  } catch (error) {
    alert(error.message);
  }
};

const handleRestart = () => {
  document.querySelector("#lotto-count-text").innerHTML = "";
  document.querySelector("#lotto-list").innerHTML = "";
  winningWrapper.classList.add("hidden");

  resultModal.close();
};

purchaseForm.addEventListener("submit", handlePurchase);

winningForm.addEventListener("submit", (e) => {
  handleWinningResult(e);
});

resultModal.addEventListener("click", (e) => {
  if (e.target.id === "modal-close-btn") {
    resultModal.close();
  }
  if (e.target.id === "restart-button") {
    handleRestart();
  }
});
