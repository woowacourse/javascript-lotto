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
import {
  bindPurchaseEvent,
  bindResultEvent,
  bindModalBackdropClick,
  bindModalCloseEvent,
  bindResetEvent,
} from "./view/eventView.js";

export const playLottoGameWeb = () => {
  const modalContainer = document.getElementById("modal-container");
  let purchaseAmount = 0;
  let generatedLottos = [];

  // 구입 버튼 눌렀을 때 이벤트
  const handlePurchase = (e) => {
    try {
      e.preventDefault();
      const amount = parseStringToNumber(getPurchaseAmountInput());
      validatePurchaseAmount(amount);
      purchaseAmount = amount;

      const purchaseCount = amount / 1000;
      generatedLottos = generateLottos(
        Array.from({ length: purchaseCount }, generateRandomNumbers),
      );

      renderPurchaseCount(purchaseCount);
      renderLottoList(generatedLottos);
      document
        .getElementById("purchase-result-section")
        .classList.add("visible-flex");
      document
        .getElementById("winning-input-section")
        .classList.add("visible-flex");
    } catch (e) {
      alert(e.message);
    }
  };

  // 결과 확인버튼 눌렀을 때 이벤트
  const handleResult = (e) => {
    try {
      e.preventDefault();
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
      modalContainer.classList.add("visible-flex");
    } catch (e) {
      alert(e.message);
    }
  };

  // 모달이 열려있을 때 모달 바깥영역을 눌렀을 떄 이벤트
  const handleModalBackdrop = (e) => {
    if (e.target === modalContainer) {
      modalContainer.classList.remove("visible-flex");
    }
  };

  // 모달이 열려있을 때 X버튼 눌렀을 때 이벤트
  const handleModalClose = () => {
    modalContainer.classList.remove("visible-flex");
  };

  // 다시 시작하기 버튼 눌렀을 때 이벤트
  const handleReset = () => {
    resetGame();
    purchaseAmount = 0;
    generatedLottos = [];
    modalContainer.classList.remove("visible-flex");
  };

  bindPurchaseEvent(handlePurchase);
  bindResultEvent(handleResult);
  bindModalBackdropClick(handleModalBackdrop);
  bindModalCloseEvent(handleModalClose);
  bindResetEvent(handleReset);
};
