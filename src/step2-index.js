/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import loadComponent from "./ui/loadComponent.js";
import { parseStringToNumber } from "./utils/parser";
import {
  validateBonusNumber,
  validateLottoNumbers,
  validatePurchaseAmount,
} from "./utils/validator.js";
import {
  getBonusNumberInput,
  getPurchaseAmountInput,
  getWinningNumbersInput,
} from "./view/webInputView.js";
import { generateLottos } from "./generateLottos";
import { generateRandomNumbers } from "./generateRandomNumbers.js";
import {
  renderLottoList,
  renderPurchaseCount,
  renderStatistics,
  resetGame,
} from "./view/webOutputView";
import WinningLotto from "./WinningLotto";
import { getReturnRate } from "./utils/getReturnRate.js";
import { getPrizeList } from "./getPrizeList.js";

const BASE_URL = import.meta.env.BASE_URL;

loadComponent("main", `${BASE_URL}src/ui/html/main.html`).then(() => {
  const modalContainer = document.getElementById("modal-container");
  const modalCloseButton = document.getElementById("modal-close-button");
  document.querySelector("#modal-close-button img").src = `${BASE_URL}close-button.svg`;
  let purchaseAmount = 0;
  let generatedLottos = [];

  // 구입 버튼 눌렀을 때 이벤트
  document
    .querySelector("#purchase-input-section button")
    .addEventListener("click", () => {
      try {
        const amount = parseStringToNumber(getPurchaseAmountInput());
        validatePurchaseAmount(amount);
        purchaseAmount = amount;

        const purchaseCount = amount / 1000;
        generatedLottos = generateLottos(
          Array.from({ length: purchaseCount }, generateRandomNumbers),
        );

        renderPurchaseCount(purchaseCount);
        renderLottoList(generatedLottos);
      } catch (e) {
        alert(e.message);
      }
    });

  // 결과 확인버튼 눌렀을 때 이벤트
  document
    .querySelector("#winning-input-section button")
    .addEventListener("click", () => {
      try {
        const winningNumbers = getWinningNumbersInput().map((number) =>
          parseStringToNumber(number),
        );
        const bonusNumber = parseStringToNumber(getBonusNumberInput());
        validateLottoNumbers(winningNumbers);
        validateBonusNumber(bonusNumber, winningNumbers);

        const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
        const prizeList = getPrizeList(generatedLottos, winningLotto);
        const profitRate = getReturnRate(prizeList, purchaseAmount);
        renderStatistics(prizeList, profitRate);
        modalContainer.style.display = "flex";
      } catch (e) {
        alert(e.message);
      }
    });

  // 모달이 열려있을 때 모달 바깥영역을 눌렀을 떄 이벤트
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      modalContainer.style.display = "none";
    }
  });

  // 모달이 열려있을 때 X버튼 눌렀을 때 이벤트
  modalCloseButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  // 다시 시작하기 버튼 눌렀을 때 이벤트
  document
    .querySelector("#modal-statistics-section button")
    .addEventListener("click", () => {
      resetGame();
      purchaseAmount = 0;
      generatedLottos = [];
      modalContainer.style.display = "none";
    });
});
