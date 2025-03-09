import { $, $all } from '../util/web/selector.js';
import WinningLotto from '../domain/WinningLotto.js';
import Lotto from '../domain/Lotto.js';
import { parseWinningNumber, parseBonusNumber } from '../input/parseInput.js';
import { calculateMatchingResult } from '../service/MatchingService.js';
import { calculateProfitRate } from '../service/ProfitService.js';
import { showModal } from '../util/web/modal.js';
import { resetError, showError } from '../util/web/errorHandler.js';
import validateBonusNumber from '../validation/validateBonusNumber.js';
import validateWinningNumber from '../validation/validateWinningNumber.js';
import setupModalControl from './setupModalControl.js';
import updateMatchingResult from './view/updateMatchingResult.js';

export const submitWinningNumberForm = (lottoArray) => {
  $('.winning-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const winningLotto = handleWinningNumber();

    const matchingResult = calculateMatchingResult(winningLotto, lottoArray);
    const profitRate = calculateProfitRate(matchingResult, lottoArray.length);

    updateMatchingResult(matchingResult, profitRate);
    showModal($('.modal'));
    setupModalControl();
  });
};

const handleWinningNumber = () => {
  const errorUI = $('.winning-form__error-message');
  resetError(errorUI);

  try {
    const { winningNumbers, bonusNumber } = getWinningNumbers();
    const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber);
    return winningLotto;
  } catch (error) {
    showError(errorUI, error.message);
  }
};

const getWinningNumbers = () => {
  const winningNumberInput = Array.from($all('.winning-form__numbers input'))
    .map((input) => input.value.trim())
    .filter((value) => value !== ''); // 값이 없는 경우 필터링됨

  const bonusNumberInput = $('.winning-form__bonus-number').value.trim();

  if (winningNumberInput.length !== 6) {
    throw new Error('🚨 6개의 당첨 번호를 입력해야 합니다.');
  }

  validateWinningNumber(winningNumberInput);
  const winningNumbers = parseWinningNumber(winningNumberInput);

  if (!bonusNumberInput) {
    throw new Error('🚨 보너스 번호를 입력해야 합니다.');
  }

  validateBonusNumber(winningNumbers, bonusNumberInput);
  const bonusNumber = parseBonusNumber(bonusNumberInput);

  return { winningNumbers, bonusNumber };
};
