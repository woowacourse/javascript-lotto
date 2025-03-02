import { lottoState } from "../webView/lottoState.js";
import NumbersValidator from "../domain/\bvalidator/NumbersValidator.js";
import BonusNumberValidator from "../domain/\bvalidator/BonusNumberValidator.js";
import { setTagsDisabled } from "../util/webUtil.js";
import domRefs from "../webView/dom.js";

domRefs.$winningForm.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const { winningNumbers, bonusNumber } = getWinningAndBonus();

    winningAndBonusValidate(winningNumbers, bonusNumber);
    setTagsDisabled(Array.from(domRefs.$paper_winning_number_inputs), true);
    setTagsDisabled([domRefs.$paper_bonus_number_input], true);

    const statistics = lottoState.lottoMachine.getStatistics(
      winningNumbers,
      bonusNumber
    );

    displayResult(statistics);

    domRefs.$modal.showModal();
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

function getWinningAndBonus() {
  const winningNumbers = Array.from(domRefs.$paper_winning_number_inputs).map(
    (winningInput) => Number(winningInput.value)
  );
  const bonusNumber = Number(domRefs.$paper_bonus_number_input.value);
  return { winningNumbers, bonusNumber };
}

function winningAndBonusValidate(winningNumbers, bonusNumber) {
  NumbersValidator.validateNumbers(winningNumbers);
  BonusNumberValidator.validateBonusNumber(winningNumbers, bonusNumber);
}

function displayResult(statistics) {
  const counts = Object.values(statistics);

  Array.from(domRefs.$matchCounts).forEach(($matchCount, index) => {
    $matchCount.textContent = counts[index] + "개";
  });

  const rate = lottoState.lottoMachine.getWinningRate(statistics);
  domRefs.$winningRate.innerHTML = `당신의 총 수익률은 ${rate.toFixed(
    2
  )}%입니다.`;
}
