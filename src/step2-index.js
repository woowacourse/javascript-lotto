import LottoGame from "./LottoGame.js";
import LottoUI from "./LottoUI.js";

const lottoUi = new LottoUI();
const lottoGame = new LottoGame(lottoUi);

document.querySelector("#purchase-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const priceInput = document.querySelector("#purchase-input").value;
  lottoGame.purchaseLotto(priceInput);
});

document.querySelector(".show-result-btn").addEventListener("click", (event) => {
  event.preventDefault();
  lottoGame.showWinningResult();
});

document.querySelector(".close-btn").addEventListener('click', () => {
  lottoUi.closeResultModal();
});

document.querySelector(".restart-btn").addEventListener("click", () => {
  lottoGame.resetGame();
});
