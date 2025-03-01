/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { PURCHASE } from "./config/const.js";
import LottoComparer from "./domain/LottoComparer.js";
import LottoGenerator from "./domain/LottoGenerator.js";
import LottoPrize from "./domain/LottoPrize.js";

let price;
let generatedLottos;
let winningNumbers = [];
let bonusNumber;
let prizeResult;
let ROI;

document.addEventListener("DOMContentLoaded", () => {
  const purchaseButton = document.querySelector("#purchase-button");
  purchaseButton.addEventListener("click", purchase);
  const resultButton = document.querySelector("#result-button");
  resultButton.addEventListener("click", checkResult);
  const modalCloseButton = document.querySelector("#close-button");
  modalCloseButton.addEventListener("click", closeModal);
});

function purchase() {
  const purchaseInput = document.querySelector("#purchase-input");
  price = Number(purchaseInput.value);
  generatedLottos = LottoGenerator.getGenerateLottos(price);
  console.log(generatedLottos);

  const lottoCountSpan = document.querySelector("#lotto-count-message");
  lottoCountSpan.textContent = `총 ${Number(
    price / PURCHASE.UNIT
  )}개를 구매하였습니다.`;

  purchaseInput.value = "";

  const ul = document.querySelector("#generated-lottos");
  generatedLottos.forEach((lotto) => {
    const li = document.createElement("li");
    li.textContent = `🎟️ ${lotto.join(", ")}`;
    ul.appendChild(li);
  });

  const resultSection = document.querySelector("#result-section");
  resultSection.style.display = "block";
}

function checkResult() {
  for (let i = 1; i <= 6; i++) {
    const winningNumberInput = document.querySelector(`#winning-number-${i}`);
    const number = winningNumberInput.value;
    winningNumbers.push(Number(number));
  }
  const bonusNumberInput = document.querySelector("#bonus-number");
  bonusNumber = Number(bonusNumberInput.value);
  console.log(winningNumbers);
  console.log(bonusNumber);

  const lottoComparer = new LottoComparer(winningNumbers, bonusNumber);
  const compareResult = lottoComparer.lottoCompareResult(generatedLottos);
  console.log(compareResult);
  const lottoPrize = new LottoPrize();
  lottoPrize.calculateTotalPrizeCount(compareResult);
  prizeResult = lottoPrize.prizeResult;
  ROI = lottoPrize.calculateROI(price);

  for (const key in lottoPrize.prizeResult) {
    const div = document.querySelector(`#${key}`);
    const span = document.createElement("td");
    span.textContent = lottoPrize.prizeResult[key] + "개";
    div.appendChild(span);
  }

  console.log(lottoPrize.prizeResult);
  console.log("ROI:" + ROI);

  const ROISpan = document.querySelector("#ROI");
  ROISpan.textContent = `당신의 총 수입률은 총 ${ROI}%입니다.`;

  const modal = document.querySelector("#modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.querySelector("#modal");
  modal.style.display = "none";
}
