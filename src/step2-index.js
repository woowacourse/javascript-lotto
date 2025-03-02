/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import { SETTINGS } from "./constants/index.js";
import LottoController from "./controller/LottoController.js";
import purchaseAmountValidator from "./validators/purchaseAmountValidator.js";

// 구매
const purchaseInput = document.getElementById("input");
const purchaseButton = document.getElementById("check");
const lottoCountMessage = document.getElementById("lotto-count");
const lottoContainer = document.querySelector(".lotto-container");

// 로또
const winningNumberButton = document.getElementById("winning-number");
const bonusButton = document.getElementById("bonus");
const winningResultButton = document.getElementById("winning-result-button");

// 모달
const modal = document.querySelector("dialog");
const modalCloseButton = document.getElementById("modal-close-button");
const modalRestartButton = document.getElementById("restart-button");

purchaseButton.addEventListener("click", () => {
  const purchaseAmount = Number(purchaseInput.value.trim());

  purchaseAmountValidator(purchaseAmount);

  const numberOfTickets = Math.floor(purchaseAmount / SETTINGS.priceUnit);
  lottoCountMessage.textContent = `총 ${numberOfTickets}개를 구매하였습니다.`;

  LottoController.purchaseAmount = purchaseAmount;
  LottoController.generateTickets();
  printLottoTickets(LottoController.lottoTickets);
  document.getElementById("winning-number-and-bonus").style.display = "block";
});

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

// winningNumberButton.addEventListener("click",  () => {
//   LottoController.generateTickets();
// });

//
// bonusButton.addEventListener("click", async () => {
//   await LottoController.getBonusNumber();
// });
//
// winningResultButton.addEventListener("click", async () => {
//   await LottoController.calculateAndDisplayResults();
// });


document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "winning-result-button") {
    modal.showModal();
  }
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});

modalCloseButton.addEventListener("click", () => {
  modal.close();
});

modalRestartButton.addEventListener("click", () => {
  modal.close();
  purchaseInput.value = "";
  lottoCountMessage.textContent = "";
  lottoContainer.innerHTML = "";
});
