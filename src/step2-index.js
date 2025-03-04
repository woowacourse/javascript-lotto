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
  const price = Number(elements.purchaseInput.value);
  console.log("price", price, "price type", typeof price);
  if (!validUI.isValidPrice(price)) return;
  state.generatedLottos = LottoGenerator.getGenerateLottos(price);

  updateUI.updatePurchaseMessage(price);
  showUI.showGeneratedLottos(state.generatedLottos);

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
  console.log("price", Number(elements.purchaseInput.value));
  const ROI = lottoPrize.calculateROI(Number(elements.purchaseInput.value));

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
  removeUI.removeInputValue(elements.purchaseInput);
  removeUI.removeInputValue(elements.bonusNumberInput);
  removeUI.removeGeneratedLottosLists();
  removeUI.removePrizeResultCountElements();

  initWinningNumbers(state.winningNumbers);
}
