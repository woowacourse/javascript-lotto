import { printLottoTickets } from "./ticketView.js";
import { purchaseAmountValidator } from "../validators/index.js";
import { SETTINGS } from "../constants/index.js";

const purchaseInput = document.getElementById("input");
const purchaseButton = document.getElementById("check");
const lottoCountMessage = document.getElementById("lotto-count");
const winningNumberAndBonusSection = document.getElementById("winning-number-and-bonus")

purchaseInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    purchaseButton.click();
  }
});

const initPurchaseUI = (lottoController) => {
  purchaseButton.addEventListener("click", () => {
    try {
      const purchaseAmount = Number(purchaseInput.value.trim());

      purchaseAmountValidator(purchaseAmount);

      const numberOfTickets = Math.floor(purchaseAmount / SETTINGS.priceUnit);
      lottoCountMessage.textContent = `총 ${numberOfTickets}개를 구매하였습니다.`;

      lottoController.generateTickets(purchaseAmount);
      printLottoTickets(lottoController.lottoTickets);
      winningNumberAndBonusSection.style.visibility = "visible";
    } catch (e) {
      alert(e.message);
    }
  });
}

const resetPurchaseUI = () => {
  winningNumberAndBonusSection.style.visibility = "hidden";
  purchaseInput.value = "";
  lottoCountMessage.textContent = "";
}

export { initPurchaseUI, resetPurchaseUI };
