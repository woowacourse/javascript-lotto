/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import { SETTINGS } from "./constants/index.js";
import LottoController from "./controller/LottoController.js";
import purchaseAmountValidator from "./validators/purchaseAmountValidator.js";

const lottoController = new LottoController();

// 구매
const purchaseInput = document.getElementById("input");
const purchaseButton = document.getElementById("check");
const lottoCountMessage = document.getElementById("lotto-count");
const lottoContainer = document.querySelector(".lotto-container");

// 로또
const winningNumberInputs = [
  document.getElementById("winning-number-input-1"),
  document.getElementById("winning-number-input-2"),
  document.getElementById("winning-number-input-3"),
  document.getElementById("winning-number-input-4"),
  document.getElementById("winning-number-input-5"),
  document.getElementById("winning-number-input-6")
];
const bonusInput = document.getElementById("bonus-input");
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

  lottoController.generateTickets(purchaseAmount);
  printLottoTickets(lottoController.lottoTickets);
  document.getElementById("winning-number-and-bonus").style.visibility = "visible";
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

const checkAllValid = () => {
  for (const input of winningNumberInputs) {
    const value = input.value.trim();
    if (value === "" || isNaN(Number(value))) {
      winningResultButton.disabled = true;
      return;
    }
  }

  const bonusValue = bonusInput.value.trim();
  if (bonusValue === "" || isNaN(Number(bonusValue))) {
    winningResultButton.disabled = true;
    return;
  }

  winningResultButton.disabled = false;
};

[...winningNumberInputs, bonusInput].forEach((input) => {
  input.addEventListener("input", checkAllValid);
});

winningResultButton.addEventListener("click", () => {
  const winningNumbers = winningNumberInputs.map(input => Number(input.value.trim()));
  const bonusNumber = Number(bonusInput.value.trim());

  try {
    lottoController.matchLottoNumbers(winningNumbers, bonusNumber);
    const results = lottoController.calculateAndDisplayResults();
    updateModalContent(results);
    modal.showModal();
    modal.showModal();
  } catch (error) {
    alert(error.message);
    winningResultButton.disabled = true;
  }
});

const updateModalContent = (results) => {
  const resultRows = document.querySelectorAll(".modal-result-content");

  resultRows[0].children[2].textContent = `${results.rankCounts.fifth}개`;
  resultRows[1].children[2].textContent = `${results.rankCounts.fourth}개`;
  resultRows[2].children[2].textContent = `${results.rankCounts.third}개`;
  resultRows[3].children[2].textContent = `${results.rankCounts.second}개`;
  resultRows[4].children[2].textContent = `${results.rankCounts.first}개`;

  const winningResultP = document.querySelector(".winning-result p");
  winningResultP.textContent = `당신의 총 수익률은 ${results.profitRate}%입니다.`;
};

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
  document.getElementById("winning-number-and-bonus").style.visibility = "hidden";
  purchaseInput.value = "";
  lottoCountMessage.textContent = "";
  lottoContainer.innerHTML = "";
  winningNumberInputs.forEach((input) => input.value = "");
  bonusInput.value = "";
});
