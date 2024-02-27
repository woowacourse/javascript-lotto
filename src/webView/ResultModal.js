import MESSAGE from '../constant/Message';
import WinningResultService from '../domain/service/WinningResultService';
import WinningRewardService from '../domain/service/WinningRewardService';

const CLASSNAME_HIDDEN = 'hidden';

const Private = {
  openResultModal() {
    document.querySelector('.result-modal').classList.remove(CLASSNAME_HIDDEN);
    document.querySelector('.result-modal-backdrop').classList.remove(CLASSNAME_HIDDEN);
  },

  closeResultModal() {
    document.querySelector('.result-modal').classList.add(CLASSNAME_HIDDEN);
    document.querySelector('.result-modal-backdrop').classList.add(CLASSNAME_HIDDEN);
  },

  printWinningResult(winningResult) {
    const resultSpans = document.querySelectorAll('.result-modal-table__count');
    const counts = Object.entries(winningResult)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([_, count]) => count);

    for (let i = 0; i < 5; i += 1) {
      resultSpans[i].textContent = String(counts[i]);
    }
  },
  getReturnRate(winningResult, purchaseCount) {
    return new WinningRewardService(winningResult, purchaseCount).getReturnRate();
  },
  printReturnRate(winningResult, purchaseCount) {
    const returnRate = this.getReturnRate(winningResult, purchaseCount);
    document.querySelector('.result-modal__return-rate').textContent = returnRate.toFixed(1);
  },

  getLottoNumbers() {
    const lottoList = document.querySelector('.purchased-lotto__list');
    const commaStringToNumbers = (string) =>
      string
        .slice(4)
        .split(', ')
        .map((numStr) => Number(numStr));
    return [...lottoList.children].map((el) => commaStringToNumbers(el.innerText));
  },

  getWinningNumbers() {
    const SELECTOR_WINNING_NUMBERS_INPUTS = '.winning-numbers-inputs';
    const SELECTOR_BONUS_NUMBER_INPUT = '.bonus-number-inputs__input';

    const winningNumberInputs = document.querySelector(SELECTOR_WINNING_NUMBERS_INPUTS);
    const bonusNumberInput = document.querySelector(SELECTOR_BONUS_NUMBER_INPUT);

    const winningNumbers = [...winningNumberInputs.children].map((el) => Number(el.value));
    const bonusNumber = Number(bonusNumberInput.value);
    return { numbers: winningNumbers, bonusNumber };
  },

  getWinningResults() {
    return new WinningResultService(
      Private.getLottoNumbers(),
      Private.getWinningNumbers(),
    ).getWinningResults();
  },
};

const ResultModal = {
  resultButtonListener(event) {
    event.preventDefault();

    const winningResults = Private.getWinningResults();
    Private.openResultModal();
    Private.printWinningResult(winningResults);
    Private.printReturnRate(winningResults, Private.getLottoNumbers().length);
  },
  closeModalListener(event) {
    event.preventDefault();
    Private.closeResultModal();
  },
};

export default ResultModal;
