/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import { generateLotto } from "./domain/LottoGenerator.js";
import { printLottoTickets } from "./view/Output.js";

// 구매
const purchaseInput = document.getElementById("input");
const purchaseButton = document.getElementById("check");
const lottoCountMessage = document.getElementById("lotto-count");

purchaseButton.addEventListener("click", (e) => {
  const purchaseAmount = purchaseInput.value;

  if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
    alert("0보다 큰 숫자를 입력해주세요.");
    return;
  }

  const numberOfTickets = Math.floor(purchaseAmount / 1000);
  lottoCountMessage.textContent = `총 ${numberOfTickets}개를 구매하였습니다.`;

  const lottoTickets = generateLotto(purchaseAmount);
  printLottoTickets(lottoTickets);
});


// 모달
const activeModalButton = document.getElementById("winning-result-button");
const modal = document.querySelector("dialog");
const modalCloseButton = document.getElementById("modal-close-button");
const modalResetButton = document.getElementById("modal-result-button");

activeModalButton.addEventListener("click", (e) => {
  modal.showModal();
});

modalCloseButton.addEventListener("click", (e) => {
  modal.close();
});

modalResetButton.addEventListener("click", (e) => {
  modal.close();
});


