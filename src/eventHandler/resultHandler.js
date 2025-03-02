import { lottoState } from "../webView/lottoState.js";
import NumbersValidator from "../domain/\bvalidator/NumbersValidator.js";
import BonusNumberValidator from "../domain/\bvalidator/BonusNumberValidator.js";
import { setTagsDisabled } from "../util/webUtil.js";
import domRefs from "../webView/dom.js";
import { addModalRestartEventHandler } from "./restartHandler.js";
import { addModalCloseEventHandler } from "./modalHandler.js";

const $winningForm = document.querySelector(".paper_winning_form");
const $matchCounts = document.querySelectorAll(".modal_match_count");
const $winningRate = document.querySelector(".modal_winning_rate");

export function addResultEventHandler() {
  $winningForm.addEventListener("submit", resultHandler);
}

export function removeResultEventHandler() {
  $winningForm.removeEventListener("submit", resultHandler);
}

function resultHandler(e) {
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

    addModalRestartEventHandler();
    addModalCloseEventHandler();
    removeResultEventHandler();
  } catch (error) {
    alert(error.message);
  }
}

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

  Array.from($matchCounts).forEach(($matchCount, index) => {
    $matchCount.textContent = counts[index] + "개";
  });

  const rate = lottoState.lottoMachine.getWinningRate(statistics);
  $winningRate.innerHTML = `당신의 총 수익률은 ${rate.toFixed(2)}%입니다.`;
}
