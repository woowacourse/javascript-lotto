import { WebApp } from "../../WebApp";
import { handleModal } from "./modal";

const hideLayout = (layout) => {
  layout.classList.add("hide-layout");
  layout.classList.remove("show-layout");
  layout.classList.remove("reset-layout");
};

const showLayout = (layout) => {
  layout.style.display = "flex";
  layout.classList.add("show-layout");
  layout.classList.remove("hide-layout");
  layout.classList.remove("reset-layout");
};

const resetLayout = (layout) => {
  layout.classList.add("reset-layout");
  layout.classList.remove("hide-layout");
  layout.classList.remove("show-layout");
};

const resetLotto = () => {
  // 모달 off
  const prizeResultModal = document.querySelector("modal");
  resetLayout(prizeResultModal);

  // form 태그 안의 input 초기화
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.reset();
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
  resetLayout(winningLottoContents);

  // 제출 버튼 숨김
  const resultContents = document.querySelector(".result-contents");
  resetLayout(resultContents);

  // input창 disabled 처리 풀기
  const priceInput = document.querySelector(".input-contents input");
  priceInput.disabled = false;
  priceInput.style.backgroundColor = "white";
  priceInput.style.color = "black";
  const priceButton = document.querySelector(".input-contents button");
  priceButton.disabled = false;
  priceButton.style.backgroundColor = "#4e5ba6";
  priceButton.style.cursor = "pointer";

  // body 스크롤 활성화
  document.body.style.overflow = "auto";
};

const focusInput = (className) => {
  setTimeout(() => {
    document.querySelector(className).focus();
  }, 400);
};

const initLotto = () => {
  resetLotto();
  // resetButton 활성화
  document.querySelector(".restart-button").addEventListener("click", () => {
    resetLotto();
    focusInput(".input-contents input");
    WebApp();
  });
};

const disableInputPrice = () => {
  const priceInput = document.querySelector(".input-contents input");
  priceInput.disabled = true;
  priceInput.style.backgroundColor = "lightgray";
  priceInput.style.color = "gray";
  const priceButton = document.querySelector(".input-contents button");
  priceButton.disabled = true;
  priceButton.style.backgroundColor = "gray";
  priceButton.style.cursor = "default";
};

export { initLotto, disableInputPrice, focusInput, hideLayout, showLayout };
