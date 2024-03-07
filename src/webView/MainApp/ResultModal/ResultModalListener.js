import WinningResultService from '@src/domain/service/WinningResultService';
import WinningRewardService from '@src/domain/service/WinningRewardService';
import LottoNumber from '../../../domain/entity/LottoNumber';

const SELECTOR = {
  WINNING_NUMBERS_INPUTS: '.winning-numbers-inputs',
  BONUS_NUMBER_INPUT: '.bonus-number-inputs__input',
  RESULT_MODAL: '.result-modal-body',
  RESULT_MODAL_BACKDROPS: '.result-modal-backdrop',
  TABLE_PURCHASE_COUNTS: '.result-modal-table__count',
  RETURN_RATE: '.result-modal__return-rate',
  PURCHASED_LOTTO_LIST: '.purchased-lotto__list',
};
const CLASSNAME_HIDDEN = 'hidden';
const EMOJI_BLANK_LENGTH = 4;

const Private = {
  getReturnRate(winningResult, purchaseCount) {
    return new WinningRewardService(winningResult, purchaseCount).getReturnRate();
  },

  getLottoNumbers() {
    const lottoList = document.querySelector(SELECTOR.PURCHASED_LOTTO_LIST);
    const commaStringToNumbers = (string) =>
      string
        .slice(EMOJI_BLANK_LENGTH)
        .split(', ')
        .map((numStr) => LottoNumber.fromString(numStr).getNumber());
    return [...lottoList.children].map((el) => commaStringToNumbers(el.innerText));
  },

  getWinningNumbers() {
    const winningNumberInputs = document.querySelector(SELECTOR.WINNING_NUMBERS_INPUTS);
    const bonusNumberInput = document.querySelector(SELECTOR.BONUS_NUMBER_INPUT);

    const winningNumbers = [...winningNumberInputs.children].map((el) =>
      LottoNumber.fromString(el.value).getNumber(),
    );
    const bonusNumber = LottoNumber.fromString(bonusNumberInput.value).getNumber();
    return { numbers: winningNumbers, bonusNumber };
  },

  getWinningResults() {
    return new WinningResultService(
      Private.getLottoNumbers(),
      Private.getWinningNumbers(),
    ).getWinningResults();
  },
};

const OutputView = {
  openResultModal() {
    document.querySelector(SELECTOR.RESULT_MODAL).classList.remove(CLASSNAME_HIDDEN);
    document.querySelector(SELECTOR.RESULT_MODAL_BACKDROPS).classList.remove(CLASSNAME_HIDDEN);
  },

  printWinningResult(winningResult) {
    const resultSpans = document.querySelectorAll(SELECTOR.TABLE_PURCHASE_COUNTS);
    const counts = Object.entries(winningResult)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([result, count]) => count);

    for (let i = 0; i < 5; i += 1) {
      resultSpans[i].textContent = String(counts[i]);
    }
  },
  printReturnRate(winningResult, purchaseCount) {
    const returnRate = Private.getReturnRate(winningResult, purchaseCount);
    document.querySelector(SELECTOR.RETURN_RATE).textContent = returnRate.toFixed(1);
  },

  printError(message) {
    document.querySelector('result-button').printErrorMessage(message);
  },
  removeErrorMessage() {
    document.querySelector('result-button').removeErrorMessage();
  },
};

const ResultModalListener = {
  resultButtonListener(event) {
    event.preventDefault();

    let winningResults;
    try {
      winningResults = Private.getWinningResults();
    } catch (error) {
      OutputView.printError(error.message);
      return;
    }
    OutputView.removeErrorMessage();
    OutputView.openResultModal();
    OutputView.printWinningResult(winningResults);
    OutputView.printReturnRate(winningResults, Private.getLottoNumbers().length);
  },
};

export default ResultModalListener;
