/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoManager from "./domain/LottoManager";
import LottoPrize from "./domain/LottoPrize";
import { getPrice, getWinningLotto } from "./ui/input";
import { printLottoCount, printLottoResult, printLottos } from "./ui/output";

const handleModal = () => {
  const prizeResultModal = document.querySelector("modal");
  const modalOpenStatus = window.getComputedStyle(prizeResultModal).display;
  console.log("status :", modalOpenStatus);
  if (modalOpenStatus === "none") {
    prizeResultModal.style.display = "flex";
  } else if (modalOpenStatus === "flex") {
    prizeResultModal.style.display = "none";
  }
};

const allowModalOpen = () => {
  const prizeResultModal = document.querySelector("modal");
  prizeResultModal.style.display = "flex";

  const prizeResultButton = document.querySelector(".result-contents");
  const closeButton = document.querySelector("modal .close-button");

  prizeResultButton.addEventListener("click", handleModal);
  closeButton.addEventListener("click", handleModal);
};

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
  console.log(resultText, resultText[1]);
  if (resultText[1]) {
    resultText[1].remove();
  }
};

const initLotto = () => {
  // resetButton 활성화
  const restartButton = document.querySelector(".restart-button");
  restartButton.addEventListener("click", () => {
    resetLotto();
    run();
  });
};

initLotto();
const run = async () => {
  const price = await getPrice();
  printLottoCount(price);
  const lottos = LottoManager.generateLottos(price);
  printLottos(lottos);

  const { winningNumbers, bonusNumber } = await getWinningLotto();

  const lottoPrize = new LottoPrize(lottos);
  const prizeResult = lottoPrize.calculateWinnings(winningNumbers, bonusNumber);
  const ROI = lottoPrize.calculateROI(price, prizeResult);

  allowModalOpen();
  printLottoResult(prizeResult, ROI);
};

run();
