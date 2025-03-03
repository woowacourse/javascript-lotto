/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoComparer from "./domain/LottoComparer.js";
import LottoGenerator from "./domain/LottoGenerator.js";
import LottoPrize from "./domain/LottoPrize.js";
import { elements } from "./ui/querySelector.js";
import {
  updateUI,
  showUI,
  removeUI,
  validUI,
  displayUI,
  initWinningNumbers,
} from "./ui/utilsUI.js";

const state = {
  price: 0,
  generatedLottos: [],
  winningNumbers: [],
};

document.addEventListener("DOMContentLoaded", () => {
  elements.purchaseButton.addEventListener("click", purchase);
  elements.resultButton.addEventListener("click", checkResult);
  elements.modalCloseButton.addEventListener("click", closeModal);
  elements.restartButton.addEventListener("click", restartLotto);
});

function purchase() {
  state.price = Number(elements.purchaseInput.value);
  if (!validUI.isValidPrice(state.price)) return;
  state.generatedLottos = LottoGenerator.getGenerateLottos(state.price);

  updateUI.updatePurchaseMessage(state.price);
  showUI.showGeneratedLottos(state.generatedLottos);

  removeUI.removeInputValue(elements.purchaseInput);
  displayUI.displayBlock(elements.generateSection);
  displayUI.displayBlock(elements.resultSection);
}

function checkResult() {
  state.winningNumbers = Array.from(elements.winningNumberInputs, (input) =>
    Number(input.value)
  );
  const bonusNumber = Number(elements.bonusNumberInput.value);

  if (
    !validUI.isValidWinningNumbers(state.winningNumbers) ||
    !validUI.isValidBonusNumber(state.winningNumbers, bonusNumber)
  )
    return;

  const lottoComparer = new LottoComparer(state.winningNumbers, bonusNumber);
  const compareResult = lottoComparer.lottoCompareResult(state.generatedLottos);

  const lottoPrize = new LottoPrize();
  lottoPrize.calculateTotalPrizeCount(compareResult);
  const ROI = lottoPrize.calculateROI(state.price);

  updateUI.updatePrizeResult(lottoPrize);
  updateUI.updateROI(ROI);

  displayUI.displayBlock(elements.modal);
}

function closeModal() {
  displayUI.displayNone(elements.modal);
  removeUI.removePrizeResultCountElements();
  initWinningNumbers(state.winningNumbers);
}

function restartLotto() {
  displayUI.displayNone(elements.modal);
  displayUI.displayNone(elements.generateSection);
  displayUI.displayNone(elements.resultSection);

  elements.winningNumberInputs.forEach((input) => {
    removeUI.removeInputValue(input);
  });
  removeUI.removeInputValue(elements.bonusNumberInput);
  removeUI.removeGeneratedLottosLists();
  removeUI.removePrizeResultCountElements();

  initWinningNumbers(state.winningNumbers);
}
