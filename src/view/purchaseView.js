import { purchaseAmountValidator } from "../validators/index.js";
import { SETTINGS } from "../constants/index.js";

const purchaseInput = document.getElementById("input");
const purchaseButton = document.getElementById("check");
const lottoCountMessage = document.getElementById("lotto-count");
const lottoContainer = document.querySelector(".lotto-container");
const winningNumberAndBonusSection = document.getElementById("winning-number-and-bonus")

const initPurchaseUI = (lottoController) => {
  purchaseButton.addEventListener("click", () => {
    try {
      const purchaseAmount = Number(purchaseInput.value.trim());

      purchaseAmountValidator(purchaseAmount);

      const numberOfTickets = Math.floor(purchaseAmount / SETTINGS.priceUnit);
      lottoCountMessage.textContent = `총 ${numberOfTickets}개를 구매하였습니다.`;

      lottoController.generateTickets(purchaseAmount);
      printLottoTickets(lottoController.lottoTickets);
      document.getElementById("winning-number-and-bonus").style.visibility = "visible";
    } catch (e) {
      alert(e.message);
    }
  });
}

purchaseInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    purchaseButton.click();
  }
});

const printLottoTickets = (lottoTickets) => {
  lottoContainer.innerHTML = "";

  lottoTickets.forEach((ticket) => {
    const lottoElement = document.createElement("div");
    lottoElement.classList.add("lotto");
    lottoElement.innerHTML = `
      <span class="lotto-img">🎟️</span>
      <span class="lotto-numbers">${ticket.join(", ")}</span>
    `;

    lottoContainer.appendChild(lottoElement);
  });
};

const resetPurchaseUI = () => {
  winningNumberAndBonusSection.style.visibility = "hidden";
  purchaseInput.value = "";
  lottoCountMessage.textContent = "";
  lottoContainer.innerHTML = "";
}

export { initPurchaseUI, resetPurchaseUI };
