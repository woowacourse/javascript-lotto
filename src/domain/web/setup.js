import { WebApp } from "../../WebApp";
import { handleModal } from "./modal";

const resetLotto = () => {
  // 모달 off
  const prizeResultModal = document.querySelector("modal");
  prizeResultModal.style.display = "none";

  // input 초기화
  const inputFields = document.querySelectorAll("input");
  inputFields.forEach((input) => {
    input.value = "";
  });

  // 사용자의 lotto 결과 초기화
  const lottoContents = document.querySelector(".lotto-contents");
  lottoContents.innerHTML = "";

  // "결과 확인하기" 버튼 클릭 비활성화
  const restartButton = document.querySelector(".result-contents");
  restartButton.removeEventListener("click", handleModal);

  // result table 결과 초기화
  const resultTable = document.querySelector(".result-table");
  const tableBody = document.createElement("tbody");
  tableBody.className = "body";
  resultTable.innerHTML = "";
  resultTable.appendChild(tableBody);

  // result text 결과 초기화
  const resultText = document.querySelectorAll(".prize-contents p");
  if (resultText[1]) {
    resultText[1].remove();
  }

  // lotto 입력창 숨감
  const winningLottoContents = document.querySelector(".winningLotto-contents");
  winningLottoContents.style.display = "none";

  // 제출 버튼 숨김
  const resultContents = document.querySelector(".result-contents");
  resultContents.style.display = "none";
};

const initLotto = () => {
  // resetButton 활성화
  const restartButton = document.querySelector(".restart-button");
  restartButton.addEventListener("click", () => {
    resetLotto();
    WebApp();
  });
};

export { initLotto };
